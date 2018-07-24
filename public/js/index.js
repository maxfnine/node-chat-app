var socket = io();
socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newEmail', function (data) {
    console.log('New Email arrived :', JSON.stringify(data, undefined, 2));
});

socket.on('newMessage', function (data) {
    console.log('newMessage', JSON.stringify(data, undefined, 2));
    var li = jQuery(`<li></li>`);
    li.text(`${data.from} : ${data.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(data){
    var li = jQuery(`<li></li>`);
    var a = jQuery(`<a target="_blank">My current location</a>`);
    li.text(`${data.from}: `);
    a.attr('href',data.url);
    li.append(a);

    
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (event) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
        console.log('callback called!');
    });
});

var locationButton = jQuery("#send-location");
locationButton.on('click',function(){
if(!navigator.geolocation)
{
    return alert('Geolocation is not supported by your browser')
}

navigator.geolocation.getCurrentPosition(function(position){
socket.emit('createLocationMessage',{
    latitude:position.coords.latitude,
    longitude:position.coords.longitude
});

},function(){
    alert('Unable to fetch location1');
})
});

