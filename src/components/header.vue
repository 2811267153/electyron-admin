<template>
  <div id="headerd">
    <div class="header app-header">
      <div></div>
      <p><span>当前用户:</span> {{ userInfo.nickName }}</p>
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
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ff7800"
            >
              <el-submenu
                  popper-class="aa"
                  :index="item.name"
                  style="width: 200px"
                  v-for="item in routes.children"
              >
                <template slot="title">
                  <span>{{ item.meta.title }}</span>
                </template>
                <el-menu-item-group
                    :route="path"
                    :index="item.path"
                    style="width: 200px"
                    v-for="path in item.children"
                >
                  <div v-if="path.meta">
                    <el-menu-item class="menu-item" :index="path.path">{{
                        path.meta.title
                      }}
                    </el-menu-item>
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
        <div class="container" style="text-align: left">
          <router-view/>
        </div>
        <div class="footer">
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
    pageChange(){
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

<style scoped>
.header {
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-sub {
  height: calc(100vh - 80px);
  overflow: hidden;
  width: 200px;
}

.header-nav {
  background-color: #545c64;
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
}

.container {
  width: calc(100vw - 240px);
  padding: 20px;
  margin-left: 20px;
  margin-top: 20px;
  box-shadow: 0 0 15px #ccc;
  overflow: hidden;
  background-color: #fff;
  border-radius: 10px;
  height: 79vh;
}

.footer {
  text-align: right;
  box-shadow: 0 0 15px #ccc;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 15px;
  margin-left: 20px;
  margin-top: 20px;
}
</style>
