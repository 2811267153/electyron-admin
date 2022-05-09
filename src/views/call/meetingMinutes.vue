<template>
  <div>
    <div class="nav-form">
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="form.user" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="find">查询</el-button>
          <el-button @click="clear">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="list"
      border
      :header-cell-style="{background:'#ccc', color: '#fff',}"
      style="width: 100%">
      <el-table-column
        align="center"
        label="序号"
        prop="date">
        <template scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column  align="center"
        prop="conferenceName"
        label="会议名称">
      </el-table-column>
      <el-table-column  align="center"
        prop="conferenceName"
        label="开始时间">
      </el-table-column>
      <el-table-column  align="center"
        prop="conferenceName"
        label="结束时间">
      </el-table-column>
      <el-table-column
        prop="member"  align="center"
        label="会议成员">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getRecord} from "@/newwork/conferencr";

export default {
  name: "meetingMinutes",
  data(){
    return {
      form: {},
      addForm: {},
      list: [],
      dialogFormVisible: true,
      title: '新增',
      formLabelWidth: '120px'
    }
  },
  methods: {
    find(){},
    clear(){},
    getRecord(form){
      getRecord(form).then(res => {
        console.log(res)
        if(res.data.code ===200){
          this.list = res.data.data.records
        }
      }).catch(e => this.$message.error(e))
    }
  },
  created() {
    this.form = this.$store.state.formPage
    this.getRecord(this.form)
  }
}
</script>

<style scoped>

</style>
