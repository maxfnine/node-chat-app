const expect = require('expect');
const { generateMessage,generateLocationMessage } = require('./message');
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'FROM';
        var text = 'TEXT';
        var res = generateMessage(from, text);
        expect(res).toInclude({ text, from });
        expect(res.createdAt).toBeA('number');
    })
});

describe('generateLocationMessage',()=>{
it('should generate correct location message',()=>{
    var from = 'FROM';
    var latitude = 10;
    var longitude = 20;
    var url = 'https://www.google.com/maps?q=10,20';
    var res = generateLocationMessage(from,latitude,longitude);
    expect(res).toInclude({from,url});
    expect(res.createdAt).toBeA('number');

})
});
