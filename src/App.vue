<template>
  <div id="app">
    <Nav class="nav" />
    <router-view></router-view>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
  </div>
</template>
<script>
import Nav from '@/components/Nav.vue'
export default {
  components:{
    Nav
  }
}
</script>

<style lang="less">
*{
  margin:0;
  padding: 0;
  text-decoration: none;
}
#app {
  font-family: "helvetica neue",arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 14px;
  color: #444;
}
.nav{
  position: fixed;
  top:0;
  left: 0;
  z-index: 1000;
}

</style>
