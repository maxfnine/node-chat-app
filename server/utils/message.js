var moment=require('moment');
var generateMessage = (from,text)=>({
from,
text,
createdAt: moment().valueOf()
});

var generateLocationMessage=(from,latitude,longitude)=>({
    from,url:`https://www.google.com/maps?q=${latitude},${longitude}`,createdAt: moment().valueOf()
});

module.exports={
    generateMessage,
    generateLocationMessage
};