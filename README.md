# form-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 关闭eslint 和 devServer.proxy(代理)

```js
module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://192.168.31.176:5000'
      }
    }
  },
  runtimeCompiler: true
}
```

### 瀑布流布局

```txt
<template>
  <div class="beauty-container">
    <cube-scroll
      ref="scroll"
      :data="beautys"
      :options="options"
      @pulling-up="onPullingUp"
    >
      <div class="waterfalls">
        <div class="ul">
          <div
            class="item"
            v-for="(item, idx) in waterleftBeautys"
            :key="item.name + idx"
            @click="handleClickBeautyDetail(item, idx)"
          >
            <a class="item-content">
              <img class="item-content--image" :src="item.image"/>
              <div class="item-content--name">
                {{item.name}}
              </div>
            </a>
          </div>
        </div>
        <div class="ul">
          <div
            class="item"
            v-for="(item, idx) in waterrightBeautys"
            :key="item.name + idx"
            @click="handleClickBeautyDetail(item, idx)"
          >
            <a class="item-content">
              <img class="item-content--image" :src="item.image"/>
              <div class="item-content--name">
                {{item.name}}
              </div>
            </a>
          </div>
        </div>   
        
      </div>
      
    </cube-scroll>
  </div>
</template>

<script>
import Axios from "axios";
import { mapMutations } from 'vuex'
import Emitter from '../utils/emitter.js'

export default {
  name: 'Home',
  mixins: [ Emitter ],
  components: {},
  data() {
    return {
      beautys: [],
      waterleftBeautys: [],
      waterrightBeautys: [],
      leftHeight: 0,
      rightHeight: 0,
      pageSize: 40,
      page: 1,
      options: {
        pullUpLoad: true
      }
    };
  },
  created() {
    this.fetchBeautysData();

    this.$on('on-download-image-success', (item) => {
      this.imageLoaded(item)
      // this.debounce(this.refreshScroll, 100)
    })

    this.$on('on-preload-image-success', () => {
      // this.debounce(this.refreshScroll, 100)
      this.refreshScroll()
    })
  },
  methods: {
    onPullingUp() {
      this.page += 1
      this.fetchBeautysData()
    },
    refreshScroll () {
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 50)
    },
    debounce (fn, wait) {
      let timeout = null;
      return function () {
        if (timeout !== null) {
          clearTimeout(timeout)
        }
        timeout = setTimeout(fn.call(this), wait);
      }
    },
    handleClickBeautyDetail(item, index) {
      // this.broadcast('BeautyItem', 'on-fetch-data', item)
      this.preLoadImage(item.images);
      this.setBeautyItem(item)
      this.$router.push(`/beauty/${index}`)
    },
    fetchBeautysData() {
      Axios.get("/api/beautys", {
        params: {
          page: this.page,
          pageSize: this.pageSize
        }
      }).then(res => {
        if (res.data.result === "success") {
          let list = res.data.beautylist
          this.preLoadImage(list)
          this.beautys = this.beautys.concat(list)
        }
      });
    },    
    ...mapMutations([
      'setBeautyItem'
    ]),
    imageLoaded (data) {
      if (this.leftHeight <= this.rightHeight) {
        this.leftHeight += data.height
        this.waterleftBeautys.push(data.item)
      } else {
        this.rightHeight += data.height
        this.waterrightBeautys.push(data.item)
      }
    },
    /**
     * 图片预加载 并行下载 | 串行下载
     * https://www.photo-mark.com/notes/image-preloading/
     */
    preLoadImage(imageArray, index) {
      index = index || 0;
      if (imageArray && imageArray.length > index) {
        let image = new Image();
        image.onload = () => {

          this.$emit('on-download-image-success', {
            height: image.height,
            item: imageArray[index]
          })
          
          if (index === (imageArray.length - 1)) {
            this.$emit('on-preload-image-success')
          }

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
};
</script>


<style>
/* // 1、column-count 把div中的文本分为多少列

// 2、column-width 规定列宽

// 3、column-gap 规定列间隙

// 4、break-inside: avoid; ←在制作手机站瀑布流时候，会出现图片错乱，请使用这个属性：避免元素内部断行并产生新列； */
.beauty-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
}
.waterfalls{
  margin: 0 -5px;
  box-sizing: border-box;
  overflow: hidden;
}


.waterfalls .ul {
  width: 50%;
  float: left;
  box-sizing: border-box;
  padding: 0 5px;
}

.item {
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  padding: 10px;
  height: auto;
  font-size: 20px;
  color: grey;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid lightslategrey;
  margin-bottom: 10px;
}

.item-content--image {
  width: 100%;
  border-radius: 4px;
}

.item-content--name {
  font-size: 12px;
  padding-top: 10px;
  color: #251433;
}
</style>
```


### git commit 规则

`<type>(<scope>): <subject>`

```txt
# type
# 用于说明 commit 的类别，只允许使用下面7个标识

feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动

# scope
# 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。


# subject
# 是 commit 目的的简短描述，不超过50个字符

1.以动词开头，使用第一人称现在时，比如change，而不是changed或changes
2.第一个字母小写
3.结尾不加句号（.）


```
