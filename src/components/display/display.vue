<template>
  <div ref="display"></div>
</template>

<script>
import Vue from 'vue';
import randomStr from '../../utils/random_str.js'

export default {
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      html: '',
      js: '',
      css: '',
      component: null,
      id: randomStr()
    }
  },
  methods: {
    // 使用正则，基于 <> 和 </> 的特性进行分割
    getSource (source, type) {
      const regex = new RegExp(`<${type}[^>]*>`);
      let openingTag = source.match(regex)

      if (!openingTag) return '';
      else openingTag = openingTag[0]
      
      return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`))
    },
    /**
     * new Function 用法
     * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function
     * 
     * new Function ([arg1[, arg2[, ...argN]],] functionBody)
     * 
     * example:
     *  const sum = new Function('a', 'b', 'return a + b');
     *  console.log(sum(2, 6)); // 8
     * 
     *  return a + b 被当作语句执行了
     */
    splitCode () {
      const script = this.getSource(this.code, 'script').replace(/export default/, 'return ')
      const style = this.getSource(this.code, 'style')
      const template = '<div id="app">' + this.getSource(this.code, 'template') + '</div>';

      this.js = script
      this.css = style
      this.html = template
    },
    renderCode () {
      this.splitCode()

      if (this.html !== '' && this.js !== '') {
        const parseStrToFunc = new Function(this.js)()

        parseStrToFunc.template = this.html
        const Component = Vue.extend( parseStrToFunc )

        this.component = new Component().$mount()

        this.$refs.display.appendChild(this.component.$el);

        if (this.css !== '') {
          const style = document.createElement('style')
          style.type = 'text/css'
          style.id = this.id
          style.innerHTML = this.css
          document.getElementsByTagName('head')[0].appendChild(style);
        }
      }
    },
    destroyCode () {
      const $target = document.getElementById(this.id);
      if ($target) $target.parentNode.removeChild($target);

      if (this.component) {
        this.$refs.display.removeChild(this.component.$el);
        this.component.$destroy()
        this.component = null
      }

    }
  },
  mounted() {
    this.renderCode()
  },
  beforeDestroy() {
    this.destroyCode()
  },
  watch: {
    code () {
      this.destroyCode()
      this.renderCode()
    }
  },
}
</script>