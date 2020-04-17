module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://192.168.31.176:5000'
      }
    }
  }
}
