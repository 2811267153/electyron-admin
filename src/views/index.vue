<template>
  <el-container id="index">
    <el-header class="header" height="80">
      <div class="nav">
        <div class="logo-info">
          <div class="logo"></div>
          <h1>金数GDD1000 融合通信管理平台</h1>
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
    </el-header>
    <el-container>
      <el-aside width="200px">
        <nav-menu></nav-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import navMenu from "@/components/nav-menu";
import { delLogin } from "@/newwork/user";
import cache from "@/util/cache";

export default {
  name: "index",
  data() {
    return {
      userInfoNav: [
        { "icon": "icon-icon7", title: "个人中心" },
        { "icon": "icon-tuichu", title: "退出" }
      ]

    };
  },
  methods: {
    infoClick(i) {
      if (i === 0) {
        this.$router.push("/account");
      } else {
        this.loginOut();
      }
    },
    loginOut() {
      delLogin().then(res => {
        if (res.data.code === 200) {
          this.$message.success("已成功退出");
          cache.delCache("token");
          this.$router.push("/login");
        }
      }).catch(e => {
        this.$message.error(e);
      });
    }
  },
  components: {
    navMenu
  },
  computed: {
    userInfo() {
      return this.$store.state.login.userInfo;
    }
  },
  created() {
    console.log(this.$store.state.login.userInfo);
  }
};
</script>

<style scoped>
#index {
  background-color: #f2f2f2;
  height: 100%;
  overflow: hidden;
  width: 100%;
  color: #000;
}

.header {
  padding: 0 30px 0 10px;
  background-color: #fff;
}

.header .nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 60px;
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
