
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
// 无敌天坑-不要在这写代码，cnm
// 报错问题大部分是VUE2与VUE3写法不兼容导致的，不要盲目看示例代码，百度：错误+黑马优购，前人多半经历过
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import store from '@/store/store.js'

import { $http } from '@escook/request-miniprogram'
uni.$http = $http

// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}

//封装的展示消息提示的方法
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

export function createApp() {
  const app = createSSRApp(App)
  app.use(store) // 将 store 挂载到 Vue 实例上
  return {
    app,
  }
}
// #endif