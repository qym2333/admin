/**
 * outputDir: 指定打包目录
 * publicPath: 判断环境 切换访问域名
 */

module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/uploads': {
        target: 'http://server:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
