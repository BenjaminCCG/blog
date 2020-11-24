const Service = require('egg').Service;

class UserService extends Service{
    async findAll(){
        const user = await this.app.mysql.query('select * from users');
        return user;
    }
}

module.exports = UserService;