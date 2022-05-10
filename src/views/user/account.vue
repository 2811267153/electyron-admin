<template>
<div id="account">
  <div class="arco-card-body">
    <el-row >
      <el-col :span="12" >
        <div class="body-l">
          <h2>基本资料</h2>
          <ul class="user-info">
            <li><div><span>{{ userInfo.nickName }}</span></div></li>
            <li class="info-row"><span>用户名称:</span> <span>{{userInfo.username}}</span></li>
            <li class="info-row"><span>用户昵称:</span><span> {{userInfo.nickName}}</span></li>
            <li class="info-row"><span>邮箱:</span> <span>{{userInfo.email}}</span></li>
            <li class="info-row"><span>手机号: </span><span>{{userInfo.phone}}</span></li>
            <li class="info-row"><span>性别:</span><span> {{userInfo.sex}}</span></li>
            <li class="info-row"><span>登录时间: </span><span>{{userInfo.loginDate}}</span></li>
            <li class="info-row"><span>所属部门:</span> <span>{{userInfo.deptId}}</span></li>
          </ul>
        </div>
      </el-col>
      <el-col :span="12"><div class="grid-content bg-purple-dark">{{ userInfo }}</div></el-col>
    </el-row>
  </div>
</div>
</template>

<script>
export default {
  name: "account",
  computed: {
    userInfo(){
      return this.$store.state.userInfo
    }
  }
}
</script>

<style scoped>
.body-l h2{
  /*display: flex;*/
  font-weight: 400;
  font-size: 16px;
}
.body-l{
  padding: 20px;
  border: 1px solid #ccc;
}
.user-info li{
  list-style: none;
}
.user-info li > div {
  text-align: center;
  border-radius: 10px;
  margin: 10px 0;
  padding: 20px 10px;
}
.user-info li > div span{
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
  border-radius: 5px;
  margin: 10px 0;
  padding: 0 10px;
  background-color: #f2f2f2;
  justify-content: space-between;
}
</style>