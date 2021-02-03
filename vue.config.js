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
