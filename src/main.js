import Vue from 'vue'
import './cube-ui'
import VueMeta from 'vue-meta'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import store from './store/index.js'
import router from './router'
import lazyDefault from '@/assets/images/common/lazy-default.jpg'
import errorDefault from '@/assets/images/common/default.jpg'
import Alert from '@/components/alert/alert.js'

Vue.use(VueMeta)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: lazyDefault,
  error: errorDefault,
  attempt: 1
})

Vue.config.productionTip = false

Vue.prototype.$Alert = Alert

Vue.mixin({
  methods: {
    /**
     * 图片预加载 并行下载 | 串行下载
     * https://www.photo-mark.com/notes/image-preloading/
     */
    preLoadImage(imageArray, index) {
      index = index || 0;
      if (imageArray && imageArray.length > index) {
        let image = new Image();
        image.onload = () => {
          this.preLoadImage(imageArray, index + 1);
        }
        image.src = imageArray[index]['image']
      }
    },
    // preLoadImage(imageArray) {
    //   let imageSrcList = []
    //   for (let i = 0; i < imageArray.length; i++) {
    //     imageSrcList[i] = new Image()
    //     imageSrcList[i].src = imageArray[i]['image']
    //   }
    // }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
