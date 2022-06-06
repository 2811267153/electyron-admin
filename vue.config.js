const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  devServer: {
    open: true,
    host: "localhost", //如果是真机测试，就使用这个IP
    port: 8080,
    proxy: {
      "dispatch": {
        target: "http://123.60.212.9:9528/dispatch",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/dispatch": "/"
        }
      }
    }
  }
});
