const Controller = require("egg").Controller;
const axios = require("axios");
class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    let user = await ctx.service.user.findAll();
    ctx.body = {
      success: true,
      data: user,
      code: 200,
    };
  }

  async register() {
    const ctx = this.ctx;
    const user = ctx.request.body;
    const res = await this.app.mysql.insert("users", user);
    ctx.body = {
      success: true,
      data: res,
      code: 200,
    };
  }

  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const user = await app.mysql.get("users", { username });
    if (user && user.password === password) {
      //用户存在生成token
      const token = app.jwt.sign(
        {
          name: user.username,
        },
        app.config.jwt.secret
      );

      ctx.body = {
        success: true,
        data: user,
        token,
        code: 200,
      };
    } else if (user && user.password != password) {
      ctx.body = {
        success: false,
        message: "密码错误",
      };
    } else {
      ctx.body = {
        success: false,
        message: "账号不存在",
      };
    }
  }
}

module.exports = UserController;
