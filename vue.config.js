const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./", // 默认'/'，部署应用包时的基本 URL
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录

  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@apis", resolve("src/apis"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@constants", resolve("src/constants"))
      .set("@pages", resolve("src/pages"))
      .set("@router", resolve("src/router"))
      .set("@static", resolve("src/static"))
      .set("@store", resolve("src/store"))
      .set("@styles", resolve("src/styles"))
      .set("@utils", resolve("src/utils"))

    return config;
  },

  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
          @import "@styles/scss/variables.scss";
          @import "@styles/scss/mixins.scss";
          @import "@styles/scss/function.scss";

          @import "~@styles/normalize.css";
        `
      }
    }
  }
};