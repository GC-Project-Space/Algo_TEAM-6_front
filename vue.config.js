const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    "/api": {
      target: "http://localhost:8080",
      ws: true,
      changeOrigin: true,
      secure: false,
      logLevel: "debug"
    }
  }
})
