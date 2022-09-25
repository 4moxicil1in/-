const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath:process.env.NODE_ENV==='production'?'':'./',
  outputDir:process.env.NODE_ENV==='production'?'dist':'devDist',
  //构建项目生成的目录
  transpileDependencies: true,
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      // sass: {
      //   // @/ 是 src/ 的别名
      //   // 所以这里假设你有 `src/variables.sass` 这个文件
      //   // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
      //   additionalData: `@import "~@/main.sass"`
      // },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        additionalData: `@import "~@/styles/main.scss";`,
      },
    },
  },
  devServer: {
    // open:true,//运行项目后自动打开
    host:"0.0.0.0",//在局域网内可以让外部访问
    port:8080,//运行的自定义接口
    proxy: {
      [process.env.VUE_APP_FLAG]: {
        target: process.env.VUE_APP_APIURL ,
        ws: true,//是否开启webstock（？
        changeOrigin: true,//是否开启跨域
        pathRewrite:{
          [`^${process.env.VUE_APP_FLAG}`]:''//  查找开头为 /api的字符替换为空字符串
        }  //  /api/getCode => /getCode => http://old.web-jshtml.cn/vue3/api/getCode
      },
      },
    },
    lintOnSave: false,
  });
