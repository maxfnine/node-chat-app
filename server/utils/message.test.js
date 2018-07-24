const expect = require('expect');
const { generateMessage } = require('./message');
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'FROM';
        var text = 'TEXT';
        var res = generateMessage(from, text);
        expect(res).toInclude({ text, from });
        expect(res.createdAt).toBeA('number');
    })
});
