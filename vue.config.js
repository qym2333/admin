module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/', // 对应自己的接口
        changeOrigin: true, // 是否允许跨越
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
