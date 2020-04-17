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
            v-for="(item, idx) in beautys"
            :key="item.name + idx" 
            @click="handleClickBeautyDetail(item, idx)"           
          >
            <img
              class="item-content--image"
              v-lazy="item.image"
              @click.stop="handleClickShowBigImage(item.image)"
            />
            <div class="item-content--name">
              {{item.name}}
            </div>
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
      page: 0,
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
    handleClickShowBigImage(link) {
      this.$createDialog({
        type: 'alert',
        confirmBtn: {
          text: 'OK',
          active: true
        }
      }, (h) => {
        return [          
          h('img', {              
            'class': {
              'big-image': true
            },
            attrs: {
              src: link
            },
            slot: 'content'
          })
        ]
      }).show()
    },
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

.big-image {
  width: 680px;
  display: block;
}

.beauty-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #f2f2f2;
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
  width: 100%;
}

.item {
  display: flex;
  margin: 20px;
  padding: 16px;
  color: grey;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #ffff;
  border-radius: 10px;
}

.item-content--image {
  flex: 0 0 180px;
  display: block;
  width: 180px;
  border-radius: 4px;
  margin-right: 20px;
}

.item-content--name {
  flex: 1;
  font-size: 28px;
  font-weight: bolder;
  padding-top: 10px;
  color: #251433;
  line-height: 38px;
  display: flex;
  align-items: center;
}
</style>