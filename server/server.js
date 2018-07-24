const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection',(socket)=>{
console.log('New client connected');

socket.on('createEmail',(data)=>{
console.log('New Email created',JSON.stringify(data));

});

socket.on('createMessage',(data)=>{
    console.log('createMessage',JSON.stringify(data,undefined,2));   
    io.emit('newMessage',{
        from:data.from,
        text:data.text,
        createAt: new Date().getTime()
    });
});

socket.on('disconnect', function () {
    console.log('A client disconnected');
 });
});



server.listen(port,()=>{
    console.log(`Server started on port: ${port}`);
})
