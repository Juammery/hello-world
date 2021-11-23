module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: "dist",
  lintOnSave: true,
  runtimeCompiler: true,
  chainWebpack: () => {},
  configureWebpack: {
    externals: {
      UE: "UE"
    }
  },
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        //  target: 'http://31.0.161.35',
        // target: 'http://183.131.134.242:10025',
        // target: "http://47.101.145.49:81/api",
        // target: "http://192.168.10.39:9999/",
        // target: "http://192.168.10.88:81/api",
        // target: "http://192.168.137.1:9999/",
        // target: "http://192.168.10.30:9999",
        target: "http://user.xuhuiyijianshiv3.xuhuixcx.com/api",
        // target: "http://31.0.161.35:84/api",
        // target: "http://192.168.10.39:9999",
        // target: "http://192.168.10.229:9999",
        // target: "http://127.0.0.1:9999",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    },
    before: app => {}
  }
};
