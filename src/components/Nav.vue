<template>
    <div id="nav">
        <div class="navbox">
            <div class="navleft">
                <router-link to="/" class="logo"></router-link>
                <router-link to="/home" class="nav-item">首页</router-link>
                <router-link to="/find" class="nav-item">发现</router-link>
                <router-link to="/newest" class="nav-item">最新</router-link>
                <div class="nav-more"></div>
                <a class="line"></a>
                <router-link to="/find" class="nav-item">活动</router-link>
                <router-link to="/find" class="nav-item">美素</router-link>
                <router-link to="/find" class="nav-item">设计服务</router-link>
                <router-link to="/find" class="nav-item">花瓣LLVE</router-link>
                <router-link to="/find" class="nav-item">美物</router-link>
            </div>
            <div class="navright">
                <div class="login-nav">
                    <router-link to="" class="login btn">
                        <span>登录</span>
                    </router-link>
                    <router-link to="" class="register btn">
                        <span>注册</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
#nav{
    width: 100%;
    height: 48px;
    background: 0;
    @media screen and (max-width: 1528px) and (min-width: 1276px){
        .navbox{
            width: 1248px;
        }
    }
    @media screen and (max-width: 1275px){
        .navbox{
            width: 996px;
        }
    }
    .navbox{
        margin:0 auto;
        height: 100%;
        // background: yellow;
        text-align: center;
        .navleft{
            width: auto;
            // height: 100%;
            margin-top:10px;
            // background: pink;
            float: left;
            a{
                float: left;
                cursor: pointer;
            }
            .logo{
                width: 80px;
                height: 28px;
                background: url(https://huaban.com/img/logo_wt.svg) center no-repeat;
                margin-right: 20px;
            }
            .nav-item{
                margin-right: 25px;
                line-height: 28px;
                color:rgba(255,255,255,.85);
            }
            .nav-item.router-link-active{
                border-bottom: 1px solid white;
            }
            .nav-more{
                float: left;
                margin-right: 20px;
                width: 24px;
                height: 28px;
                background: url(https://huaban.com/img/menu_sprite.svg?20150302) -50px -558px no-repeat;
                cursor: pointer;
            }
            .line{
                float: left;
                margin: 2.5px 20px 2.5px -5px;
                background-color: #ddd;
                width: 1px;
                height: 20px;
            }
        }
        .navright{
            float: right;
            height: 100%;
            margin-left: 20px;
            line-height: 48px;
            a{
                float: left;
                color:#fff;
                margin-top: 6px;
            }
            .btn{
                border-radius: 2px;
                font-size: 14px;
                cursor: pointer;
                text-align: center;
            }
            .login{
                border: 1px solid rgba(255,255,255,.8);
                background: 0;
                padding: 0 15px;
                height: 32px;
                line-height: 32px;
                margin-right: 10px;
            }
            .register{
                height: 34px;
                border: 1px solid #ec414d;
                background: #ec414d;
                box-sizing: border-box;
                padding: 0 15px;
                line-height: 32px;
            }
        }
    }
}
</style>


