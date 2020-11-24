const Controller = require('egg').Controller;
const fs = require('fs')
const pump = require('pump')
class ArticleController extends Controller{
    async index(){
        const {ctx,app} = this;
        let res = await app.mysql.select('article');
        ctx.body = {
            success:true,
            code:200,
            data:res
        }
    }

    async add(){
        const {ctx,app} = this;
        const article = ctx.request.body;
        const res = app.mysql.insert('article',article);
        ctx.body = {
            success:true,
            code:200,
            data:res
        }
    }

    async read(){
        const {ctx,app} = this;
        const id = ctx.params.id;
        const res = await app.mysql.get(`article`,{id});
        await app.mysql.query("update article set views = views + 1 where id = " + id)
        ctx.body = {
            success:true,
            code:200,
            data:res
        }
    }

    async likeup(){
      const {ctx,app} = this;
      // const {uid,aid} = ctx.request.body;
      const res = await app.mysql.query(`select * from users left OUTER JOIN article on users.id = article.user_id;`)
      ctx.body = res;
    }
    async saveAvatar() {
        const  ctx  = this.ctx;
        const parts = ctx.multipart({ autoFields: true })
        let files = {};
        let stream;
        while ((stream = await parts()) != null) {
          if(!stream.filename){
            break;
          }
          const fieldname = stream.fieldname; // file表单的名字
          // 上传图片的目录ctx.service.user
          const dir = await ctx.service.tool.getUploadFile(stream.filename);
          const target = dir.uploadDir;
          const writeStream = fs.createWriteStream(target);
       
          await pump(stream, writeStream);
       
          files = Object.assign(files, {
            [fieldname]: dir.saveDir
          });
        }
       
        if(Object.keys(files).length > 0){
          ctx.body = {
            code: 200,
            message: '图片上传成功',
            data: files
          }
        }else{
          ctx.body = {
            code: 500,
            message: '图片上传失败',
            data: {}
          }
        }
      }
}

module.exports = ArticleController;