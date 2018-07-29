const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
console.log('client connected to server');



socket.on('createEmail',(data)=>{
console.log('New Email created',JSON.stringify(data));

});

socket.on('join',(data,callback)=>{

    if(!isRealString(data.name) || !isRealString(data.room))
    {
       return callback('Name and room are required.')
    }
    socket.join(data.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,data.name,data.room);

    io.to(data.room).emit('updateUserList',users.getUserList(data.room));
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(data.room).emit('newMessage',generateMessage('Admin',`${data.name} has connected`));
    callback();
});

socket.on('createMessage',(data,callback)=>{
   var user = users.getUser(socket.id);
   if(user && isRealString(data.text))
   {
       io.to(user.room).emit('newMessage',generateMessage(user.name,data.text));
    
   }
    callback();
});

socket.on('createLocationMessage',(data)=>{
var user = users.getUser(socket.id);
if(user)
{
    io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,data.latitude, data.longitude));
}

});

socket.on('disconnect', function () {
   var user = users.removeUser(socket.id);
   if(user)
   {
       io.to(user.room).emit('updateUserList',users.getUserList(user.room));
       io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
   }
 });
});



server.listen(port,()=>{
    console.log(`Server started on port: ${port}`);
})
