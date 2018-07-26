const expect = require('expect');
const { Users } = require('./users');



describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Mike',
                room: 'Node Course'
            },
            {
                id: '2',
                name: 'Jen',
                room: 'React Course'
            },
            {
                id: '3',
                name: 'Julie',
                room: 'Node Course'
            }
        ];

    });

    it('should add new user', () => {
        var users = new Users();
        var user = { id: '101', name: 'TestMe', room: 'Testing Room' };
        var resUser = users.addUser(user);
        expect(users.users).toEqual([resUser]);
    });

    it('should remove a user',()=>{
        var removedUser = users.removeUser(users.users[0].id);
        expect(users.users.length).toBe(2);


    });

    it('should not remove a user',()=>{
        var removedUser = users.removeUser('-1');
        expect(users.users.length).toBe(3);

    });

    it('should find user',()=>{
        var foundUser = users.getUser(users.users[0].id);
        expect(foundUser).toEqual(users.users[0]);
    });

    it('should not find user',()=>{
        var notFoundUser = users.getUser(-1);
        expect(notFoundUser).toBeFalsy();

    });
    
    it('should return names for node course',()=>{
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike','Julie']);
    });

    it('should return names for react course',()=>{
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen']);
    });
});