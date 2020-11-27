'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/user', controller.user.index);
  router.post('/user/register',controller.user.register)
  router.post('/user/login',controller.user.login)
  router.post('/article',controller.article.index)
  router.post('/article/add',controller.article.add)
  router.post('/article/saveavatar', controller.article.saveAvatar);
  router.get('/article/read/:id', controller.article.read);
  router.get('/likeup', controller.article.likeup);
  router.get('/likecount', controller.article.likeCount);
  router.post('/comment/getComment', controller.comment.getCommentById);
  router.post('/comment/addComment', controller.comment.addComment);
  router.post('/article/editArticle', controller.article.editArticle);
  router.post('/article/deleteArticle', controller.article.deleteArticle);
};