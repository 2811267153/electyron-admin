<template>
  <div id="headerd">
    <div class="header app-header">
      <el-page-header @back="goBack" content="详情页面" />
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
                style="width: 200px"
                :index="item.name"
                v-if="item.hasOwnProperty('meta')"
                v-for="item in routes"
              >
                <template slot="title">
                  <span v-for="title in item"> {{ title.title }}</span>
                </template>
                <el-menu-item-group
                  :route="path"
                  :index="item.path"
                  v-for="path in item.children"
                >
                  <div v-if="path.meta">
                    <el-menu-item class="menu-item" :index="path.path">{{
                      path.meta.title
                    }}</el-menu-item>
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
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="container" style="text-align: left">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headers',
  methods: {
    goBack() {
      this.$emit('goBack')
    }
    // select(index,indexPath){
    //   console.log(index,indexPath)
    // }
  },
  created() {
    console.log(this.$router.options.routes)
  },
  computed: {
    routes() {
      return this.$router.options.routes
    }
  }
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
  width: 220px;
  background-color: rgb(84, 92, 100);
  height: calc(100vh - 80px);
  overflow: hidden;
}
.app-header {
  height: 80px;
  box-shadow: 0 1px 5px #ccc;
}
.header-nav {
  display: flex;
}
.header-nav .content-nav {
  margin-top: 20px;
  margin-left: 20px;
  padding: 20px;
  width: calc(100vw - 220px);
  border: 1px solid #ccc;
}

.container {
  width: calc(100vw - 220px);

  padding: 20px;
  margin-left: 20px;
  margin-top: 20px;
  border: 1px solid #ccc;
  overflow: hidden;
}
</style>
