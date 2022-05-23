<template>
  <div id="user">
    <div class="login-info">
      <div class="width">
        <div style="height: 300px; color: white">
          <el-steps direction="vertical" :active="index" :align-center="true">
            <el-step title="开始"></el-step>
            <el-step title="填写账号"></el-step>
            <el-step title="输入密码">></el-step>
            <el-step title="提交">></el-step>
          </el-steps>
        </div>
      </div>
    </div>
    <div class="login-other">
      <h2>欢迎使用调度管理系统！</h2>
      <el-form class="el-from" ref="form" label-width="120">
        <el-form-item label="账号">
          <el-input v-model="username" @focus="focus(2)"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="password" @focus="focus(3)"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import getLogin from "@/newwork/user";
import { setCookie } from "@/auth";

export default {
  name: "login",
  data() {
    return {
      isErr: false,
      settingShow: false,
      username: "admin",
      password: "123456",
      isClearNumShow: false,
      isPadShow: false,
      index: 0
    };
  },
  methods: {
    loginInput(type) {
      if (type === "text") {
        this.form.number.length !== 0 ? this.form.isClearNumShow = true : this.isClearNumShow = false;
      } else {
        this.$refs.psd.type = "password";
        this.form.pad.length !== 0 ? this.form.isPadShow = true : this.isPadShow = false;
      }
    },
    clear(type) {
      if (type === "text") {
        this.form.number = "";
        this.form.isClearNumShow = false;
      } else {
        this.form.pad = "";
        this.form.isPadShow = false;
      }
    },

    onSubmit() {
      this.index = 4;
      getLogin(this.username, this.password).then(res => {
        if (res.data.code === 200) {
          const sysMenuList = res.data.data.user.sysMenuList;
          const sysDept = res.data.data.user.sysDept;
          const sysRole = res.data.data.user.sysRole;

          this.$store.dispatch("sysMenuList", sysMenuList);
          this.$store.dispatch("userInfo", res.data.data.user);
          this.$store.dispatch("sysDept", sysDept);
          this.$store.dispatch("sysRole", sysRole);
          setCookie(res.data.data.JSESSIONID);
          this.$router.push({ path: "/home" }).catch(e => console.log(e));
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.$message.error(e);
      });
    },

    isShow() {
      this.isErr = !this.isErr;
    },
    focus(index) {
      this.index = index;
    }
  }
};
</script>

<style>
#user {
  width: 100vw;
  height: 100vh;
  background-size: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-info {
  background: linear-gradient(to bottom right, #FAFCB1, #3f86f2);
  height: 100%;
  line-height: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 40%;
  align-items: center;
}

.width {
  width: 50%;
}

.login-other {
  padding-left: 50px;
  flex: 1;
  text-align: left;
}

.login-other h2 {
  margin: 20px 0;
  font-size: 27px;
}

.el-from {
  width: 60%;
}

.is-vertical {
  color: #fff;
}
</style>
