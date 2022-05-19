<template>
  <div id="account">
    <div class="arco-card-body">
      <el-row>
        <el-col :span="12">
          <div class="body-l">
            <h2>基本资料</h2>
            <ul class="user-info">
              <li>
                <div><span>{{ userInfo.nickName }}</span></div>
              </li>
              <li class="info-row"><span>用户名称:</span> <span>{{ userInfo.username }}</span></li>
              <li class="info-row"><span>用户昵称:</span><span> {{ userInfo.nickName }}</span></li>
              <li class="info-row"><span>邮箱:</span> <span>{{ userInfo.email }}</span></li>
              <li class="info-row"><span>手机号: </span><span>{{ userInfo.phone }}</span></li>
              <li class="info-row"><span>性别:</span><span>{{ userInfo.sex === 1 ? '男' : '女' }} </span></li>
              <li class="info-row"><span>登录时间: </span><span>{{ userInfo.loginDate }}</span></li>
              <li class="info-row"><span>所属部门:</span> <span>{{ dept }}</span></li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="body-r">
            <span>个人信息</span>
            <div class="border-card">
              <div>
              <span :class="{active : currentIndex === i}" @click="activeClick(i)" v-for="(item, i) in borderCard">
                <i :class="'icon iconfont '+ item.icon"></i>{{ item.label }}
              </span>
              </div>
              <div class="operate" v-if="currentIndex === 0 ">
                <el-form ref="form" :model="form" :rules="rules">
                  <el-form-item label="用户名" :label-width="labelWidth" prop="username">
                    <el-input v-model="form.nickName"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" :label-width="labelWidth" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" :label-width="labelWidth" prop="email">
                    <el-input v-model="form.email"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" :label-width="labelWidth" prop="sex">
                    <el-radio-group v-model="form.sex">
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item align="right">
                    <template name="">
                      <el-button type="primary" @click="submitForm()">保存</el-button>
                    </template>
                  </el-form-item>
                </el-form>
              </div>
              <div class="operate" v-else>
                <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                  <el-form-item label="新密码" prop="password">
                    <el-input v-model="form.password"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="verifyPassword">
                    <el-input v-model="form.verifyPassword"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm()">保存</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import { getOrganizeId, upDataPassword, upDataUser } from "@/newwork/system-colltroner";
import { removeCookie } from "@/auth";

export default {
  name: "account",
  computed: {},
  data() {
    return {
      labelWidth: "100px",
      userInfo: [],
      currentIndex: 0,
      dept: "",
      borderCard: [
        { "label": "基本资料", icon: "icon-dingdanliebiao" },
        { "label": "修改密码", icon: "icon-mimaxiugai" }
      ],
      form: {
        sex: 1
      },
      rules: {
        username: [
          { required: true, message: "该项为必填项,请确认", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "该项为必填项,请确认", trigger: "blur" }
        ],
        email: [
          { required: true, message: "该项为必填项,请确认", trigger: "blur" }
        ],
        sex: [
          { required: true, message: "该项为必填项,请确认", trigger: "blur" }
        ],
        password: [
          { required: true, message: "该项为必填项,请确认", trigger: "blur" }
        ],
        verifyPassword: [
          { required: true, message: "该项为必填项,请确认", trigger: "blur" }
        ]

      }
    };
  },
  created() {
    this.userInfo = this.$store.state.userInfo;
    this.form = this.$store.state.userInfo;
    this.getOrganizeId(this.userInfo.deptId);
  },
  methods: {
    getOrganizeId(id) {
      getOrganizeId(id).then(res => {
        this.dept = res.data.data.deptName;
      });
    },
    submitForm(){
     this.currentIndex === 1 ? this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.form.password === this.form.verifyPassword){
            const data = {}
            data.userId = this.userInfo.userId
            data.password = this.form.password
            upDataPassword(data).then(res => {
              if(res.data.code === 200){
                this.$message.success('提交完成')
                this.resetForm()
                removeCookie()
                location.reload()
              }else {
                this.$message.error(res.data.msg)
              }
            })
          }
        } else {
          return false;
        }
      }) :
       this.$refs.form.validate((valid) => {
         if (valid) {
           upDataUser(this.form).then(res => {
             if(res.data.code === 200){
               this.$message.success('修改完成，请重新登录')
               this.resetForm()
               removeCookie()
               location.reload()
             }
           })
         } else {
           console.log('error submit!!');
           return false;
         }
       })
    },
    activeClick(i) {
      this.currentIndex = i;
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  }
};
</script>

<style scoped>

#account{
  width: 100%;
  padding: 20px;
  margin-left: 20px;
  margin-top: 20px;
  box-shadow: 0 0 15px #ccc;
  background-color: #fff;
  border-radius: 10px;
  height: 80vh;
  text-align: left;
}
.body-l h2 {
  /*display: flex;*/
  font-weight: 400;
  font-size: 16px;
}
.arco-card-body{
  min-width: 1044px;
}

.body-l {
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px #cccccc;
}

.user-info li {
  list-style: none;
}

.user-info li > div {
  text-align: center;
  border-radius: 10px;
  margin: 10px 0;
  padding: 20px 10px;
}

.user-info li > div span {
  display: inline-block;
  font-size: 30px;
  width: 80px;
  color: white;
  height: 80px;
  line-height: 80px;
  overflow: hidden;
  border-radius: 50px;
  background-color: #ccc;
}

.info-row {
  display: flex;
  line-height: 40px;
  margin: 10px 0;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
}

.border-card {
  margin: 20px 0;
}

.border-card > div {
  border: 1px solid #ccc;
  height: auto;
}

.body-r {
  padding: 20px;
  margin-left: 30px;
  height: 100%;
  border-radius: 5px;
  box-shadow: 0 0 5px #cccccc;
}

.body-r span {
  display: inline-block;
  cursor: pointer;
  padding: 10px 15px;
}

.body-r span i {
  font-size: 20px;
  margin: 0 5px;
  vertical-align: top;
}

.active {
  color: #409EFF;
  border-radius: 5px;
}

.operate {
  padding: 30px;
}
</style>
