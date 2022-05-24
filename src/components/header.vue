<template>
  <div id="header">
    <div class="header app-header">
      <div class="logo-info">
        <div class="logo"></div>
        <h1 v-if="$route.path !== '/index'">金数GDD1000 融合通信管理平台</h1>
      </div>
      <div><span class="icon iconfont icon-yonghu-yuan tubiao"></span>
        <el-dropdown trigger="click">
      <span class="el-dropdown-link tubiao">
         {{ userInfo.nickName }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="infoClick(i)" v-for="(item, i) in userInfoNav"><i
              :class="'icon iconfont ' + item.icon"></i><span>{{ item.title }}</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="header-nav">
      <el-container>
        <el-aside width="200px">
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
                  v-if="!item.meta.isHide"
                  v-for="(item, index) in routes.children"
                >
                  <template slot="title">
                    <i :class="item.meta.icon"></i> <span>{{ item.meta.title }}</span>
                  </template>
                  <el-menu-item-group
                    :route="path"
                    style="width: 200px"
                    v-for="path in item.children"
                  >
                    <div v-if="path.meta ">
                      <el-menu-item class="menu-item" :index="path.path + ''">{{ path.meta.title }}</el-menu-item>
                    </div>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </div>

        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import { delLogin } from "@/newwork/user";
import jsCookie from "js-cookie";

export default {
  name: "headers",
  data() {
    return {
      home: false,
      formPage: {},
      userInfoNav: [
        { "icon": "icon-icon7", title: "个人中心" },
        { "icon": "icon-tuichu", title: "退出" }
      ]
    };
  },
  methods: {
    loginOut() {
      delLogin().then(res => {
        if (res.data.code === 200) {
          this.$message.success("已成功退出");
          jsCookie.remove("JSESSIONID");
          this.$router.push("/user");
        }
      }).catch(e => {
        this.$message.error(e);
      });
    },
    infoClick(i) {
      if (i === 0) {
        this.$router.push("/account");
      } else {
        this.loginOut();
      }
    }
  },
  created() {
    console.log(this.$route);
  },
  computed: {
    routes() {
      console.log(this.$router.options.routes[1]);
      return this.$router.options.routes[1];
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    total() {
      return this.$store.state.total;
    }
  }
};
</script>

<style>

.header {
  padding: 0 30px 0 10px;
  display: flex;
  height: 80px;
  justify-content: space-between;
  align-items: center;
}

.sub-menu-warp {
  text-align: left;
}


.el-aside {
  background-color: rgb(84, 92, 100);
}

.logo {
  height: 80px;
  width: 200px;
  background: no-repeat center/80% url("/src/assets/logo.png");;
}

.header-nav {
  background-color: #545c64;
  height: calc(100vh - 80px);
}

.header h1 {
  font-weight: 600;
  font-size: 30px;
}

.logo-info {
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

.total span {
  display: inline-block;
  background-color: #409EFF;
  padding: 5px;
  border-radius: 5px;
  color: #fff;
}

.header .icon {
  font-size: 29px;
  background-color: #ccc;
  color: white;
  border-radius: 20px;
  margin-right: 10px;
}

.header span {
  vertical-align: middle;
}

.tubiao {
  cursor: default;
}
</style>
