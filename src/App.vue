<template>
  <div id="app">
    <Nav class="nav" :style="{background:navColor}" />
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
  data() {
    return {
      navColor:' '
    }
  },
  components:{
    Nav
  },
  mounted() {
    // window.addEventListener("scroll",this.homeScroll)
  },
  methods: {
    // homeScroll:function(){
    //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    //   if(scrollTop > 300){
    //     this.navColor = '#fff'
    //   }
    //   console.log(scrollTop) 
    // }
  }
}
</script>

<style lang="less">
*{
  margin:0;
  padding: 0;
  text-decoration: none;
  list-style:none;
}
#app {
  font-family: "helvetica neue",arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
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
