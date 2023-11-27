const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/sass/variables.scss";`
      },
      sass: {
        additionalData: `@import "~@/assets/sass/variables.scss";`
      }
    }
  }
})
