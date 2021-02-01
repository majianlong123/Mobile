module.exports = {
  // publicPath: process.env === 'production' ? '' : '/personal',
  publicPath: process.env.NODE_ENV === 'development' ? '' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  lintOnSave: true,
  runtimeCompiler: false,
  transpileDependencies: [/\/node_modules\/vue-echarts\//, /\/node_modules\/resize-detector\//],
  productionSourceMap: false,
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/varibles/index.scss";'
      }
    }
  },
  // 代理跨域
  devServer: {
    proxy: 'https://www.lyqianlian.com/'
  }
}
