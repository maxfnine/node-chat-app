var socket = io();
socket.on('connect',function(){
    console.log('connected to server');
    socket.emit('createEmail',{to:'maxfnine@gmail.com',text:'this is a text'});
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newEmail',function(data){
console.log('New Email arrived :',JSON.stringify(data));
});

socket.on('newMessage',function(data){
    console.log('newMessage',JSON.stringify(data,undefined,2));   
})
