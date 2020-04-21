<template>
  <div class="beuty-item--container"
    v-if="beautyItem.images"
  >
    <button class="beauty--button" @click="handleDownloadImages">下载</button>
    <div
      class="image-item"
      v-for="(item, idx) in beautyItem.images"
      :key="idx"
    >
      <img class="image-item__src" v-lazy="item.image">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Axios from 'axios'

export default {
  metaInfo() {
    return {
      title: this.beautyItem.name
    }
  },
  name: 'BeautyItem',
  computed: {
    ...mapGetters([
      'beautyItem'
    ])
  },
  created() {
    if (!this.beautyItem.name) {
      this.$router.push('/')
    }
  },
  methods: {
    handleDownloadImages() {
      Axios.post("/api/beautys/images", {
        images: this.beautyItem.images,
        name: this.beautyItem.name
      })
        .then(res => {
          console.log(res.data);
        })
        .catch(e => console.log(e))
    }
  },
}
</script>

<style>
  .beuty-item--container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    background-color: #ffffff;
    z-index: 10;
  }

  .beauty--button {
    position: fixed;
    bottom: 16px;
    right: 16px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: rgb(214, 53, 219);
    border: 6px solid #fff;
    color: #fff;
    text-align: center;  
    font-size: 14px;
    font-weight: 900;  
  }

  .image-item {
    width: 100%;
    font-size: 0;
  }

  .image-item__src {
    width: 100%;
    /* display: block; */
  }
</style>