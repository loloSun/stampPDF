<template>
  <div class="home">
    <div class="header-box">
      <div class="banner-img" :style="{backgroundPosition:'center ' + imgPosition + 'px'}"></div>
      <!-- 背景图遮罩 -->
      <div class="banner-mask"></div>
      <div class="banner-content">
        <div class="title">花瓣，陪你做生活的设计师</div>
        <div class="search-box">
          <form action="">
            <input type="text" placeholder="搜索你喜欢的">
            <router-link to="" class="search-btn"></router-link>
          </form>
          <div class="hot-search">
            <span>热门搜索：</span>
            <router-link to="">时间轴</router-link>
            <span>,</span>
            <router-link to="">红色系</router-link>
          </div>
        </div>
        <div class="author">
          <div class="author-box">
            <span>图片：</span>
            <router-link to="">阿西瓜</router-link>
          </div>
        </div>
      </div>
      <div class="header-ad"></div>
    </div>
    <div class="content">
      <!-- 正在关注 -->
      <div class="cut-off-line">
        <span>大家正在关注</span>
      </div>
      <div class="looking">
        <!-- <div class="looking-item">
          img
        </div> -->
        <router-link to="" v-for="(item,index) in lookingitem" :key="index" class="looking-item">
          <div class="looking-item-content">
            <!-- <div class="looking-img"> -->
              <img :src="item.img" alt="" />
            <!-- </div> -->
            <span>{{item.span}}</span>
          </div>
        </router-link>
      </div>
      <!-- 为您推荐 -->
      <div class="cut-off-line">
        <span>为您推荐</span>
      </div>
      <div class="recommend">
        <div class="recommend-row">
          <ul v-for="(item,index) in recommendList" :key="index" :class="{'active':index%2 != 1}" class="recommend-ul">
            <li class="recommend-item">
              <router-link to="">
                <img :src="item.content1.img" alt="" :style="{width:'100%'}">
              </router-link>
            </li>
            <li class="recommend-item">
              <div class="info-box">
                <div class="info-box-top"></div>
                <h2>
                  <router-link to="">{{item.content1.h2}}</router-link>
                </h2>
                <p>
                  <span>{{item.content1.p1}}</span>
                  <span>{{item.content1.p2}}</span>
                </p>
                <span class="span">来自
                  <router-link to="">{{item.content1.span}}</router-link>
                </span>
              </div>
              <div class="info-left-icon"></div>
              <div class="info-box p-right">
                <div class="info-box-top info-box-top-right"></div>
                <h2>
                  <router-link to="">{{item.content1.h2}}</router-link>
                </h2>
                <p>
                  <span>{{item.content1.p1}}</span>
                  <span>{{item.content1.p2}}</span>
                </p>
                <span class="span">来自
                  <router-link to="">{{item.content1.span}}</router-link>
                </span>
              </div>
              <div class="info-right-icon"></div>
            </li>
            <li class="recommend-item">
              <router-link to="">
                <img :src="item.content2.img" alt="" :style="{width:'100%'}">
              </router-link>
            </li>
            <li class="recommend-item">
              <router-link to="">
                <img :src="item.content3.img" alt="" :style="{width:'100%'}">
              </router-link>
              <div class="last-item">
                <div class="last-item-top info-box-top "></div>
                <h2>
                  <router-link to="">{{item.content3.h2}}</router-link>
                </h2>
                <p>
                  <span>{{item.content3.p1}}</span>
                  <span>{{item.content3.p2}}</span>
                </p>
                <span class="span">来自
                  <router-link to="">{{item.content3.span}}</router-link>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      imgPosition:0,
      lookingitem:[
        {
          img:require("../assets/lookingitem1.jpg"),
          span:""
        },{
          img:require("../assets/lookingitem1.jpg"),
          span:'猫'
        },{
          img:require("../assets/lookingitem3.jpg"),
          span:''
        },{
          img:require("../assets/lookingitem3.jpg"),
          span:''
        },{
          img:require("../assets/lookingitem3.jpg"),
          span:''
        },{
          img:require("../assets/lookingitem3.jpg"),
          span:''
        },{
          img:require("../assets/lookingitem3.jpg"),
          span:''
        }
      ],
      recommendList:[
        {
          
          content1:{
            img:require("../assets/tuijian1.png"),
            h2:"「字体设计」",
            p1:"****采集",
            p2:"****粉丝",
            span:"阿西瓜"
          },
          content2:{
            img:require("../assets/tuijian2.png"),
            h2:"「字体设计」",
            p1:"****采集",
            p2:"****粉丝",
            span:"阿西瓜"
          },
          content3:{
            img:"https://hbimg.huabanimg.com/fa77207849bf056b8900c580bb3303bd1507b38037136b-hb1yEv_sq320",
            h2:"TAKE｜ 反 复 前 行",
            p1:"****采集",
            p2:"****粉丝",
            span:"阿西瓜"
          }
        }
      ]
    }
  },
  mounted() {
    window.addEventListener("scroll",this.homeScroll)
  },
  methods: {
    homeScroll:function(){
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var scroll = scrollTop - this.imgPosition;
      this.imgPosition = scrollTop/2;
      if(this.imgPosition > '280'){
        this.imgPosition = '280'
      }
    }
  },
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
    position: relative;
    .banner-img{
      width: 100%;
      height: 100%;
      background-image: url(../assets/homebanner.jpg);
      background-repeat: no-repeat;
      opacity: 1;
      background-size: cover;
    }
    .banner-mask{
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(0,0,0,.2);
      top:0;
      left: 0;
      // z-index: 10;
    }
    .banner-content{
      width: 100%;
      height: 500px;
      position: absolute;
      top:0;
      left: 0;
      text-align: center;
      .title{
        margin: 118px auto 40px;
        width: 540px;
        height: 54px;
        line-height: 54px;
        color: #fff;
        font-family: "sy-sans";
        font-size: 44px;
        font-weight: 200;
        text-align: center;
        text-shadow: 0 10px 30px rgba(0,0,0,.3), 0 2px 10px rgba(0,0,0,.2);
      }
      .search-box{
        text-align: center;
        display: inline-block;
        form{
          position: relative;
          input{
            // margin: 0 auto;
            padding: 0 10px;
            width: 536px;
            height: 40px;
            border: 1px solid rgba(255,255,255,.95);
            border-radius: 2px;
            background-color: rgba(255,255,255,.95);
            color: #444;
            box-shadow: 0 16px 32px 0 rgba(0,0,0,.07), 0 1px 3px 0 rgba(0,0,0,.02), 0 0 0 1px rgba(0,0,0,.1);
            box-sizing: border-box;
          }
          .search-btn{
            position: absolute;
            // display: block;
            top: 0;
            right: 0;
            width: 40px;
            height: 40px;
            background: url(https://huaban.com/img/new_index/icon_search.svg) 9px 9px no-repeat;
            cursor: pointer;
            color: #222;
            // outline: 0;
          }
        }
        .hot-search{
          margin-top: 10px;
          color: rgba(255,255,255,.7);
          text-shadow: 0 10px 30px rgba(0,0,0,.3), 0 2px 10px rgba(0,0,0,.2);
          a{
            display: inline-block;
            padding-right: 5px;
            color: #fff;
            cursor: pointer;
            text-shadow: 0 10px 30px rgba(0,0,0,.3), 0 2px 10px rgba(0,0,0,.2);
          }
        }
        
      }
      .author{
        position: absolute;
        left: 0;
        bottom: 20px;
        width: 100%;
        text-align: right;
        color:#fff;
        @media screen and (max-width: 1528px) and (min-width: 1276px){
          .author-box{
            width: 1248px;
          }
        }
        @media screen and (max-width: 1275px){
            .author-box{
                width: 996px;
            }
        }
        a{
          color: rgba(255,255,255,.85);
        }
        
      }
    }
    .header-ad{
      position: absolute;
      bottom:0;
      z-index: 1000;
      background: url(../assets/headerAD.jpg) center center no-repeat;
      display: block;
      height: 60px;
      width: 100%;
      background-size: auto 60px;
    }
  }
  @media screen and (min-width: 1529px){
        .content {
            width: 1500px;
        }
    }
    @media screen and (max-width: 1528px) and (min-width: 1276px){
        .content{
            width: 1248px;
        }
    }
    @media screen and (max-width: 1275px){
        .content{
            width: 996px;
        }
    }
  .content{
    margin:auto;
    .cut-off-line{
      position: relative;
      padding: 20px 0;
      text-align: center;
      span{
        font-size: 16px;
        color: #999;
      }
    }
    .cut-off-line::before{
      display: block;
      position: absolute;
      top: 28px;
      left: 0;
      width: 44%;
      content: "";
      border-top: 1px solid #ededed;
    }
    .cut-off-line::after{
      display: block;
      position: absolute;
      top: 28px;
      right: 0;
      width: 44%;
      content: "";
      border-top: 1px solid #ededed;
    }
    .looking{
      margin-top: 0;
      height: 178px;
      margin: 16px -16px 0 0;
      overflow: hidden;
      .looking-item{
        position: relative;
        display: block;
        float: left;
        margin: 0 16px 16px 0;
        width: 236px;
        height: 170px;
        border-radius: 4px;
        overflow: hidden;

        // background: pink;
        .looking-item-content{
          width: 100%;
          height: 100%;
          position: relative;
          // .looking-img{
          // width: 100%;
          img{
            width: 100%;
            // height: 100px;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
          }
        // }
          span{
            position: absolute;
          }
        }
        
      }
    }
    .recommend{
      width: 100%;
      .recommend-row{
        width: 100%;
        height: auto;
        .recommend-ul{
          width: 100%;
          margin-bottom: 4px;
          display: flex;
          justify-content: space-between;
          overflow: hidden;
          .recommend-item{
            display: inline-block;
            float: left;
            width: 308px;
            height: 308px;
            // margin-right: 4px;
            box-sizing: border-box;
            position: relative;
            .info-box{
              width: 100%;
              height: 152px;
              margin-bottom: 4px;
              position: relative;
              padding: 10px 16px;
              background: #fafafa;
              box-sizing: border-box;
              .info-box-top{
                position: absolute;
                padding: 0 20px 5px 0;
                width: 80px;
                height: 40px;
                background-position: 0 0;
                border-bottom: 1px solid #ededed;
                background: url(../assets/box_title_sprite.svg) -140px 0 no-repeat;
              }
              h2{
                line-height: 20px;
                margin-top: 54px;
                font-weight: 400;
                font-size: 20px;
                margin: 50px 0 3px 0;
                a{
                  display: inline-block;
                  height: 20px;
                  overflow: hidden;
                  color: #222;
                }
              }
              p{
                font-size: 12px;
                line-height: 1.35em;
                span{
                  color:#bbb;
                  margin-right: 10px;
                }
              }
              .span{
                display: inline-block;
                margin-top: 10px;
                color: #999;
                a{
                  margin-left: 5px;
                  color: #9e7e6b;
                }
              }
            }
            .info-left-icon{
              position: absolute;
              width: 14px;
              height: 28px;
              background: url(../assets/info_tra.svg) no-repeat;
              top: 21%;
              left: -14px;
              background-position: 0 0;
              z-index: 1;
            }
            .p-right{
              text-align: right;
              .info-box-top-right{
                right: 16px;
                padding: 0 0 5px 20px;
              }
            }
            .info-right-icon{
              position: absolute;
              width: 14px;
              height: 28px;
              background: url(../assets/info_tra.svg) no-repeat;
              top: 74%;
              right: -14px;
              background-position: 0 -51px;
              z-index: 1;
            }
            .last-item{
              display: block;
              position: absolute;
              left: 30px;
              bottom: 20px;
              // background: rgba(0,0,0,.4);
              width: auto;
              height: 56px;
              overflow: inherit;
              padding: 8px 16px;
              text-align: left;
              color:#bbb;
              .last-item-top{
                position: absolute;
                left: -30px;
                width: 30px;
                height: 56px;
                padding: 0;
                top: 0;
                background-color: rgba(50,50,50,.4);
                background-position: -236px 7px;
                border: 0 none;
                background: url(../assets/box_title_sprite.svg) -140px 0 no-repeat;
              }
              h2{
                font-size: 18px;
                font-weight: 400;
                a{
                  color:#fff;
                }
              }
              p{
                font-size: 12px;
                line-height: 1.35em;
                span{
                  margin: 0 10px 0 0;
                }
              }
              .span{
                display: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>

