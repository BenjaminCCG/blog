const Controller = require('egg').Controller;

class CommentController extends Controller{
    async getCommentById(){
        const {ctx,app} = this;
        const {article_id,pageNum,pageSize} = ctx.request.body;
        let res = await app.mysql.select('comment',{
            where:{article_id},
            orders: [['create_time','desc']],
            limit:pageSize,
            offset:pageNum*pageSize-pageSize
        });
        // let res = await app.mysql.query(`select * from comment where article_id = ${article_id} order by create_time desc limit ${(pageNum - 1) * pageSize+','+pageSize}`);
        let page = await app.mysql.query('select count(id) as total from comment where article_id = '+article_id)
        page = JSON.parse(JSON.stringify(page))[0].total;
        let hasNextPage = page - pageSize * pageNum > 0 ? true : false;
        ctx.body = {
            success:true,
            code:200,
            body:{
                list:res,
                hasNextPage
            }
        }
    }

    async addComment(){
        const {ctx,app} = this;
        const {content,article_id} = ctx.request.body;
        let res = await app.mysql.insert('comment',{content,article_id});
        let result = await app.mysql.get('comment',{id:res.insertId})
        ctx.body = {
            success:true,
            code:200,
            data:result
        }
    }
}

module.exports = CommentController