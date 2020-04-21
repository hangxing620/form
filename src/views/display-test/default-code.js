const code =
`<template>
    <div>
        <input v-model="message">
        {{ message }}
    </div>
</template>
<script>
    export default {
        data () {
            return {
                message: ''
            }
        }
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
`;

export default code;