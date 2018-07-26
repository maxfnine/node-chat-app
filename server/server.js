const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection',(socket)=>{
console.log('client connected to server');



socket.on('createEmail',(data)=>{
console.log('New Email created',JSON.stringify(data));

});

socket.on('join',(data,callback)=>{

    if(!isRealString(data.name) || !isRealString(data.room))
    {
        callback('Name and room are required.')
    }
    socket.join(data.room);
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(data.room).emit('newMessage',generateMessage('Admin',`${data.name} has connected`));
    callback();
});

socket.on('createMessage',(data,callback)=>{
    console.log('createMessage',JSON.stringify(data,undefined,2));   
    io.emit('newMessage',generateMessage(data.from,data.text));
    callback();
});

socket.on('createLocationMessage',(data)=>{
io.emit('newLocationMessage',generateLocationMessage('Admin',data.latitude, data.longitude));
});

socket.on('disconnect', function () {
    console.log('A client disconnected');
 });
});



server.listen(port,()=>{
    console.log(`Server started on port: ${port}`);
})
