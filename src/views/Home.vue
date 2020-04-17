<template>
  <div class="home">
    <div class="beauty-wrapper">
      <router-link to="/beauty">beauty美女</router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'Home',
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {
    // this.createAlert()
  },
  methods: {
    createAlert() {
      const AlertComponent = Vue.extend({
        render: (h) => {
          return h('div', 'hello, baibai')
        },
        data() {
          return {
            message: 'hello, baibai'
          }
        }
      })

      const component = new AlertComponent().$mount();

      document.body.appendChild(component.$el);
    }
  }
};
</script>


<style lang="stylus">
.beauty-wrapper
  text-align: center
  font-size: 16px
  font-weight: bolder
  color: #f2f2f2
  padding-top: 20px
  a
    color: #673ab7
</style>