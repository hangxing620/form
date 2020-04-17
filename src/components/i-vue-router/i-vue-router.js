let Vue;

class VueRouter {
  constructor(options) {
    // 配置
    this.$options = options;
    // 映射路由
    this.routeMap = {};
    // 使用 Vue 的双向数据绑定
    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }

  // 绑定事件
  init() {
    // 绑定事件
    this.bindEvents();
    // 路由映射
    this.createRouteMap(this.$options);
    // 初始化 route-link 和 route-view 组件
    this.initComponent();
  }

  // 绑定 load 和 hashchange 事件，监听 hash 路由
  bindEvents() {
    window.addEventListener('load', this.onHashChange.bind(this), false);
    window.addEventListener('hashchange', this.onHashChange.bind(this), false);
  }

  // 路由映射表
  createRouteMap(options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item
    })
  }

  // 注册 route-link 和 route-view 组件
  initComponent() {
    Vue.component('route-link', {
      props: {
        to: String
      },
      render(h) {
        return h('a', {
          attrs: {
            href: '#' + this.to
          }
        }, [
          this.$slots.default
        ])
      }
    });
    Vue.component('router-view', {
      render: h => {
        var component = this.routeMap[this.app.current].component;
        return h(component);
      }
    })
  }

  // 设置当前路径
  onHashChange() {
    this.app.current = window.location.hash.slice(1) || '/';
  }
}


VueRouter.install  = function(_vue) {
  Vue = _vue;

  Vue.mixin({
    // 利用Vue 的钩子 全局注册一次
    beforeCreate() {
      if (this.$options.router) {
        // router 实例对象
        Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    },
  })
}