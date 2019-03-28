<template>
  <div class="home">
    <div class="header-box">
      <div class="header-banner">
        <div class="banner-img"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
    
  }
}
</script>
<style lang="less" scoped>
.home{
  width: 100%;
  height: auto;
  .header-box{
    width: 100%;
    height: 560px;
    .header-banner{
      width: 100%;
      height: 100%;
      .banner-img{
        width: 100%;
        height: 100%;
        background: url(https://hbfile.b0.upaiyun.com/img/home/banner/031537c507ec8cbb6c9e912a8694117baabcc39ca28db) center no-repeat;
        opacity: 1;
        background-size: cover;
      }
    }
  }
}
</style>

