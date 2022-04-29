<template>
  <div class="configure">
    <div class="form-nav">
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" :rules="rule">
        <el-form-item label="网卡名称" prop="fifoName">
          <el-input v-model="form.netName"></el-input>
        </el-form-item>
        <el-form-item label="端口" prop="fifoAgent">
          <el-input v-model="form.profileSipPort"></el-input>
        </el-form-item>
        <el-form-item label="服务接口名称" prop="fifoRouterIn">
          <el-input v-model="form.netName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="find">查询</el-button>
          <el-button @click="resetForm('clear')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary"  @click="addForms(null, '新增')">新增队列</el-button>
    </div>

    <el-table
        :data="list"
        style="width: 100%">
      <el-table-column
          prop="date"
          label="序号">
        <template scope="scope">{{scope.$index}}</template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getProfile} from "@/newwork/ground-colltroner";

export default {
  name: "configure",
  data(){
    return{
      form: { },
      list: [],
      addForm: {
        netMac: '', //网卡地址
        netName: '' ,//网卡名称
        profileName: '',  //服务接口名称
        profileSipIp: '', //IP
        profileSipPort: '', //端口
        status: 0,
        template: '' , //配置文件模板:internal/external(internal为内部注册，external为对外中继通道接口)
      },
      templateType: [
        {label: '内部注册(internal)', value: 'internal'},
        {label: '对外中继通道接口(external)', value: 'external'}
      ]
    }
  },
  methods: {
    find(){

    },
    getProfile(form){
      getProfile(form).then(res => {
        console.log(res)
        if(res.data.code === 200) {
          this.list = res.data.data.records
        }else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  created() {
    this.form = this.$store.state.formPage
    this.getProfile(this.form)
  }
}
</script>

<style scoped>
.form-nav{
  display: flex;
  height: 40px;
  justify-content: space-between;
}
.table{
  margin-top: 20px;
}
.width{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.width > * {
  flex: 1;
}

</style>
