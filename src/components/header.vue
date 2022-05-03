<template>
  <div id="headerd">
    <div class="header app-header">
      <div class="logo-info">
        <div class="logo"></div>
        <h1>金数GDP1000  融合通信管理平台</h1>
      </div>
      <p><span @click="loginOut">当前用户:</span> {{ userInfo.nickName }}</p>
      <!--      <p>  <span>用户</span>: {{userInfo.data.user.username || ''}} <el-button @click="loginOut" class="login-out">退出</el-button></p>-->
    </div>
    <div class="header-nav">
      <div class="main-sub">
        <div class="sub-menu-warp">
          <el-col>
            <el-menu
                :router="true"
                :unique-opened="true"
                :default-active="this.$route.path"
                class="el-menu-vertical-demo"
                text-color="#fff"
                background-color="#545c64"
                active-text-color="#ff7800"
            >
              <el-submenu
                  popper-class="aa"
                  :index="item.name + '' "
                  style="width: 200px"
                  :key="index"
                  v-for="(item, index) in routes.children"
              >
                <template slot="title">
                  <span>{{ item.meta.title }}</span>
                </template>
                <el-menu-item-group
                    :route="path"
                    style="width: 200px"
                    v-for="path in item.children"
                >
                  <div v-if="path.meta">
                    <el-menu-item class="menu-item"  :index="path.path + ''">{{ path.meta.title   }} </el-menu-item>
                  </div>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </div>
      </div>
      <div class="content">
        <div class="content-nav">
          <el-breadcrumb class="nav-bar" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a :href="this.$route.path">{{ $route.meta.title }}</a></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="container-header" style="text-align: left">
          <router-view/>
        </div>
        <div class="footer">
          <div class="total">共查询到:  <span> {{$store.state.total}} </span> 条相关数据</div>
          <el-pagination
              background
              :page-size="14"
              layout="prev, pager, next"
              @next-click="next"
              @current-change="pageChange"
              @prev-click="prev"
              :total="total">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {delLogin} from "@/newwork/user";
import jsCookie from "js-cookie";

export default {
  name: 'headers',
  data() {
    return {}
  },
  methods: {
    currentChange() {
      this.$bus.$emit('pageChange', this.pageSize,)
    },

    loginOut() {
      delLogin().then(res => {
        console.log(res)
        if(res.data.code === 200){
          this.$message.success('正在跳转登录页面')
          jsCookie.remove('JSESSIONID')
          this.$router.push('/user')
        }
      }).catch(e => {
        this.$message.error(e)
      })
    },
    prev(){
      return this.$store.state.formPage.pageNum --
    },
    next(){
      return this.$store.state.formPage.pageNum ++
    },
    pageChange(e){
      const formPage = {}
      formPage.pageNum = e
      formPage.pageSize = 14
      this.$store.dispatch('formPage', formPage)
      this.$bus.$emit('pageChange',)
    }

  },

  computed: {
    routes() {
      return this.$router.options.routes[1]
    },
    userInfo() {
      return this.$store.state.userInfo
    },
    total() {
      return this.$store.state.total
    }
  },
}
</script>

<style>
.header {
  padding: 0 30px 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-submenu li{
  background-color: rgb(67, 74, 80) !important;
}

.main-sub {
  height: calc(100vh - 80px);
  overflow: hidden;
  width: 200px;
}
.logo{
  height: 80px;
  width: 200px;
  background: no-repeat center/80% url("/src/assets/logo.png");;
}
.header-nav {
  background-color: #545c64;
}

.header h1{
  font-weight: 600;
  font-size: 30px;
}
.logo-info{
  flex: 1;
  display: flex;
  align-items: center;
}
.app-header {
  height: 80px;
}

.header-nav {
  display: flex;
}

.header-nav .content-nav {
  margin-top: 20px;
  margin-left: 20px;
  padding: 20px;
  width: calc(100vw - 240px);
  box-shadow: 0 0 15px #ccc;
  border-radius: 10px;
  background-color: #fff;
}

.content {
  border-top: 1px solid #f2f2f2;
  background-color: #f2f2f2;
  padding-right: 20px;
  overflow: scroll;
  height: calc(100vh - 80px);

}

.container-header {
  width: calc(100vw - 240px);
  padding: 20px;
  margin-left: 20px;
  margin-top: 20px;
  box-shadow: 0 0 15px #ccc;
  background-color: #fff;
  border-radius: 10px;
  height: 80%;
  overflow: auto;
}

.footer {
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 15px #ccc;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 15px;
  margin-left: 20px;
  margin-top: 20px;
}
.total {
  height: 28px;
  background-color: #f4f4f5;
  border-radius: 5px;
  padding: 5px 10px;
  text-align: center;
  font-size: 13px;
}
.total span{
  display: inline-block;
  background-color: #409EFF;
  padding: 5px;
  border-radius: 5px;
  color: #fff;
}

</style>
