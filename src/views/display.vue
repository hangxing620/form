<template>
  <div>
    <h3>动态渲染 .vue 文件的组件—— Display</h3>

    <i-display :code="code"></i-display>
  </div>
</template>
<script>
  import iDisplay from '@/components/display/display.vue';
  import defaultCode from './display-test/default-code.js';

  export default {
    components: { iDisplay },
    data () {
      return {
        code: defaultCode
      }
    }
  }
</script>

<style>
  .beauty-list {
    max-width: 1024px;
    margin: 0 auto;
  }

  .beauty-list img {
    max-width: 260px;
  }

  .beauty-list span {
    font-size: 24px;
    font-weight: bolder;
    color: #dcdcdc;
  }
</style>