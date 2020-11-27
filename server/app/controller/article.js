const Controller = require("egg").Controller;
const fs = require("fs");
const pump = require("pump");
class ArticleController extends Controller {
  async index() {
    const { ctx, app } = this;
    const { pageSize, pageNum, type } = ctx.request.body;
    // let res = await app.mysql.select('article',{
    //   where:{type},
    //   limit:pageSize,
    //   offset:pageNum*pageSize-pageSize
    // });
    let res = await app.mysql
      .query(`select a.*,count(b.id) as comment_num from article a left join comment b on b.article_id = a.id 
        ${type ? "where type = " + type : ""} group by a.id,a.title  order by create_time desc  ${pageNum && pageSize? "limit " + (pageNum - 1) * pageSize + "," + pageSize
        : "" } ` );

    let page = await app.mysql.query(`select count(id) as total from article`);
    page = JSON.parse(JSON.stringify(page))[0].total;
    let hasNextPage = page - pageSize * pageNum > 0 ? true : false;
    ctx.body = {
      success: true,
      code: 200,
      body: {
        list: res,
        hasNextPage,
        pageNum,
        total: page,
      },
    };
  }

  async add() {
    const { ctx, app } = this;
    const article = ctx.request.body;
    const res = app.mysql.insert("article", article);
    ctx.body = {
      success: true,
      code: 200,
      data: res,
    };
  }

  async read() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    let res = await app.mysql.query(
      `select a.*,count(b.id) as comment_num from article a left join comment b on a.id = b.article_id where a.id = ${id} group by a.title`
    );
    res = JSON.parse(JSON.stringify(res))[0];
    await app.mysql.query(
      "update article set views = views + 1 where id = " + id
    );
    ctx.body = {
      success: true,
      code: 200,
      data: res,
    };
  }

  async editArticle() {
    const { ctx, app } = this;
    const article = ctx.request.body;
    const res = await app.mysql.update("article", article);
    ctx.body = {
      success: true,
      code: 200,
      data: res,
    };
  }

  async deleteArticle() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;
    const res = await app.mysql.delete("article", { id });
    await app.mysql.delete("comment", { article_id: id });
    ctx.body = {
      success: true,
      code: 200,
      data: res,
    };
  }

  async likeup() {
    const { ctx, app } = this;
    let res = await app.mysql.query(
      "update likes set likes_num = likes_num + 1 where id = 1"
    );
    ctx.body = {
      success: true,
      code: 200,
      data: null,
    };
  }
  async likeCount() {
    const { ctx, app } = this;
    let res = await app.mysql.get("likes", { id: 1 });
    ctx.body = {
      success: true,
      code: 200,
      data: res,
    };
  }
  async saveAvatar() {
    const ctx = this.ctx;
    const parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      const fieldname = stream.fieldname; // file表单的名字
      // 上传图片的目录ctx.service.user
      const dir = await ctx.service.tool.getUploadFile(stream.filename);
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir,
      });
    }

    if (Object.keys(files).length > 0) {
      ctx.body = {
        code: 200,
        message: "图片上传成功",
        data: files,
      };
    } else {
      ctx.body = {
        code: 500,
        message: "图片上传失败",
        data: {},
      };
    }
  }
}

module.exports = ArticleController;
