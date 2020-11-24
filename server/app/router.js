'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/user', controller.user.index);
  router.post('/user/register',controller.user.register)
  router.post('/user/login',controller.user.login)
  router.get('/article',controller.article.index)
  router.post('/article/add',controller.article.add)
  router.post('/article/saveavatar', controller.article.saveAvatar);
  router.get('/article/read/:id', controller.article.read);
  router.post('/article/likeup', controller.article.likeup);
};