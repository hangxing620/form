import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    beautyItem: {}
  },
  getters: {
    beautyItem: state => state.beautyItem
  },
  mutations: {
    setBeautyItem(state, item) {
      state.beautyItem = item
    }
  }
});

export default store;