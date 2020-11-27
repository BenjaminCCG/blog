<template>
  <div>
    <div class="header_bg">
      <el-row class="container" type="flex" justify="center">
        <el-col :span="24">
          <div class="pc_box">
            <el-menu mode="horizontal" background-color="transparent" text-color="#fff">
              <template v-for="(item,idx) in menuList">
                <el-submenu :index="String(idx)" :key="idx" v-if="item.children">
                  <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </template>
                  <el-menu-item class="subitem" :index="idx+'-'+i" v-for="(it,i) in item.children" :key="i" @click="$router.push(it.to+'/'+it.type)">{{it.name}}</el-menu-item>
                </el-submenu>
                <el-menu-item :index="String(idx)" :key="idx" v-else @click="$router.push(item.to)">
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </el-menu-item>
              </template>
            </el-menu>
            <div>
              <weather class="weather" />
            </div>
          </div>
          <div class="mobile_box">
            <i class="el-icon-menu" style="color:#fff;font-size:18px" @click="isOpen=!isOpen"></i>
            <weather />
            <el-menu class="mobile_menu"  @select="isOpen=!isOpen" text-color="#fff" v-show="!isOpen" theme="dark"  :unique-opened="true">
              <template v-for="(item,idx) in menuList">
                <el-menu-item :index="String(idx)" :key="idx" v-if="!item.children" @click="$router.push(item.to)">
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </el-menu-item>
              </template>
            </el-menu>
          </div>
        </el-col>
      </el-row>
      <div class="benjamin" id="ityped"></div>
      <div class="myself">
        <img src="@/assets/image/header.jpg" alt="">
        <p>Our lives are defined by opportunities.Even the ones we miss.</p>
        <p>我们的生命，因为各种各样的机遇而变得有意义, 甚至那些我们错过的。</p>
      </div>
    </div>
  </div>
</template>

<script>
import weather from "./weather";
import { init } from 'ityped'
export default {
  data() {
    return {
      menuList: [
        {
          name: '首页',
          to: '/home',
          icon: 'el-icon-s-home'
        },
        {
          name: '分类',
          icon: 'el-icon-s-platform',
          children: [
            {
              name: '技术分享',
              to: '/classify',
              type: 1
            },
            {
              name: '生活杂谈',
              to: '/classify',
              type: 2
            }
          ]
        },
        {
          name: '赞赏',
          to: '/appreciate',
          icon: 'el-icon-coin'
        },
        {
          name: '留言板',
          to: '/board',
          icon: 'el-icon-edit-outline'
        },
        {
          name: '关于',
          to: '/about',
          icon: 'el-icon-s-custom'
        },

      ],
      isOpen: true
    }
  },
  methods: {
    typedInit() {
      const ityped = document.getElementById('ityped');
      init(ityped, { strings: ['Hello', 'I am Benjamin'], loop: false })
    }
  },
  components: {
    weather
  },
  mounted() {
    this.typedInit()
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: benjamin;
  src: url("http://ccodecloud.xyz/static/my_font.ttf");
}
.header_bg {
  background: url("../assets/image/headbg.jpg") 20% center no-repeat;
  width: 100%;
  height: 650px;
  .el-row {
    background: rgba(40, 42, 44, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    .el-col {
      width: 80%;
      margin: 0 auto;

      .el-menu--horizontal {
        border: none;
        .is-active {
          color: #fff !important;
        }
      }
      .el-menu-item,
      .el-submenu {
        height: 38px;
        line-height: 38px;
        padding: 0 14px;
        border: none;
        &/deep/.el-submenu__title {
          height: 38px;
          line-height: 38px;
          background: transparent;
          padding: 0;
          color: #fff;
          border: none;
          &:hover {
            background-color: rgba(73, 69, 107, 0.7) !important;
          }
          .el-icon-arrow-down:before {
            display: none;
          }
        }
        i {
          color: #fff;
        }
        &:hover {
          background-color: rgba(73, 69, 107, 0.7) !important;
        }
        .is-active {
          background-color: rgba(73, 69, 107, 0.7) !important;
          border: none;
          color: #fff;
        }
      }
    }
  }
  .benjamin {
    position: absolute;
    left: 50%;
    top: 200px;
    transform: translateX(-50%);
    font-family: benjamin;
    font-weight: bold;
    font-size: 100px;
    text-align: center;
    color: #000;
  }
  .myself {
    position: relative;
    top: 440px;
    width: 70%;
    margin: 0 auto;
    background: rgba(230, 244, 249, 0.8);
    border-radius: 5px;
    padding: 40px 0;
    text-align: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover {
        transform: rotate(180deg);
      }
    }
    p {
      background-image: -webkit-linear-gradient(right, #df2050, #48456d);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bold;
      font-size: 20px;
      margin-top: 10px;
    }
  }
}
.pc_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mobile_box {
  // position: relative;
  display: none;
  .mobile_menu {
    width: 100%;
    position: absolute;
    left: 0;
    top: 100%;
    box-sizing: border-box;
    z-index: 999;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12), 0 0 8px 0 rgba(0, 0, 0, 0.04);
    background: #48456c;
    color: #fff;
    border-right: none;
    .el-submenu {
      padding: 0 !important;
    }
    // .el-menu-item,
    // .el-submenu {
    //   background: rgb(73, 69, 107);
    // }
  }
}
@media screen and (max-width: 768px) {
  .header_bg {
    height: 300px;
    .pc_box {
      display: none;
    }
    .myself {
      display: none;
    }
  }

  .mobile_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 0;
     .mobile_menu{
       background: rgba(40, 42, 44, 0.6);
     }
  }
  .header_bg {
    background-position: 40% 70%;
    height: 300px;
    .benjamin {
      top: 100px;
      font-size: 60px;
    }
    .myself {
      display: none;
    }
  }
}
</style>