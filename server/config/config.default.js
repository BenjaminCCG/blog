/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1605419523420_7599';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '49.235.69.89',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'ContainerT01',
      // 数据库名
      database: 'wpdata',
    },
  };

  config.security= {
    csrf : {
      enable: false,
    },
    domainWhiteList: [ '*' ]
 }
 config.middleware = [ 'errorHandler' ];
 config.errorHandler = {
  enable: false, // 中间件开启配置
};
config.jwt = {
  secret: '123456',
};
config.cors = {
  origin: '*',
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
};
config.uploadDir = 'app/public/avatar/upload';
  return {
    ...config,
    ...userConfig,
  };
};
