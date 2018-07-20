var socket = io();
socket.on('connect',function(){
    console.log('connected to server');
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newEmail',function(data){
console.log('New Email arrived :',JSON.stringify(data,undefined,2));
});

socket.on('newMessage',function(data){
    console.log('newMessage',JSON.stringify(data,undefined,2));   
})

