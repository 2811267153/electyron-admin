const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: "localhost", //如果是真机测试，就使用这个IP
    port: 8080,
    proxy: {
      'dispatch': {
        target: 'http://192.168.2.103:9527/dispatch',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/dispatch':'/'
        }
      }
    }
  }
})
