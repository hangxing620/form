<template>
  <div id="app">
    <div>
      <router-link to='/table'>table</router-link>
    </div>
    <div>
      <router-link to='/display'>diplay</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
