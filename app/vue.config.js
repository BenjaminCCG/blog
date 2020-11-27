const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
  configureWebpack: {
    externals: {
      BMap: "BMap",
    },
    plugins: [
      // 压缩代码
      new CompressionPlugin({
        test: /\.js$|\.html$|.\css/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false, // true 不删除源文件 false 删除源文件
      }),
    ],
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
