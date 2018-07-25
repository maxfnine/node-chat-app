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
   var formattedTime = moment(data.createdAt).format('HH:mm');
    var li = jQuery(`<li></li>`);
    li.text(`${data.from} ${formattedTime}: ${data.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(data){
    var formattedTime = moment(data.createdAt).format('HH:mm');
    var li = jQuery(`<li></li>`);
    var a = jQuery(`<a target="_blank">My current location</a>`);
    li.text(`${data.from}  ${formattedTime}: `);
    a.attr('href',data.url);
    li.append(a);

    
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (event) {
    event.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        text: messageTextBox.val('');
    });
});

var locationButton = jQuery("#send-location");
locationButton.on('click',function(){
if(!navigator.geolocation)
{
    return alert('Geolocation is not supported by your browser')
}
locationButton.attr('disabled','disabled').text('Sending location...');

navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
socket.emit('createLocationMessage',{
    latitude:position.coords.latitude,
    longitude:position.coords.longitude
});

},function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location1');
})
});

