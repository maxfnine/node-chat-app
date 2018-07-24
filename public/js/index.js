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
    var li = jQuery(`<li></li>`);
    li.text(`${data.from} : ${data.text}`);
    jQuery('#messages').append(li);
})

// socket.emit('createMessage',{from:'TEST',text:'TEXT'},function(){
//     console.log("got it!");
    
// });

jQuery('#message-form').on('submit',function(event){
event.preventDefault();
socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
},function(){
    console.log('callback called!');
    
});
});

