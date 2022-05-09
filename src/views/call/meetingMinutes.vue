<template>
  <div>
    <div class="feDetail" v-if="!isDetail">
      <div class="">
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
          <template scope="scope">{{scope.row.conferenceCreateTime | createTime}}</template>
        </el-table-column>
        <el-table-column  align="center"
                          prop="conferenceName"
                          label="结束时间">
          <template scope="scope">{{scope.row.conferenceDestroyTime | endTime}}</template>
        </el-table-column>
        <el-table-column
          prop="member"  align="center"
          label="会议成员">
        </el-table-column>
        <el-table-column
          prop="member"  align="center"
          label="操作">
          <template scope="scope"> <el-link @click="info(scope.row.conferenceUniqueId)">查看详情</el-link> </template>
        </el-table-column>
      </el-table>
    </div>


    <div class="detail" v-else>
      <div class="nav-form"><el-button @click="black" type="primary">返回</el-button></div>

      <el-table
        :data="detailList"
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
                          prop="conferenceDomain"
                          label="域">
        </el-table-column>
        <el-table-column  align="center"
                          prop="conferenceProfileName"
                          label="会议文件名">
        </el-table-column>
        <el-table-column
          prop="createTime"  align="center"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="action"  align="center"
          label="创建人">
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
import { getRecord, getRecordDetail } from "@/newwork/conferencr";
import { formatDate } from "@/uti";
export default {
  name: "meetingMinutes",
  data(){
    return {
      form: {},
      addForm: {},
      list: [],
      dialogFormVisible: true,
      title: '新增',
      formLabelWidth: '120px',
      isDetail: false,
      detailList: [],
    }
  },
  methods: {
    find(){},
    clear(){},
    getRecord(form){
      getRecord(form).then(res => {
        this.$store.dispatch('total', res.data.data.total)
        if(res.data.code ===200){
          this.list = res.data.data.records
        }
      }).catch(e => this.$message.error(e))
    },
    info(id){
      const data = {}
      data.conferenceUniqueId = id
      getRecordDetail(data).then(res => {
        this.detailList = res.data.data
      })
      this.isDetail = true
    },
    black(){
      this.isDetail = false
    }
  },
  filters: {
    createTime(time) {
        return formatDate(time / 1000)
    },
    endTime(time) {
        return formatDate(time / 1000)
    }
  },
  created() {
    this.form = this.$store.state.formPage
    this.getRecord(this.form)
  },
  mounted() {
    this.$bus.$on('pageChange', () => {
      this.form =this.$store.state.formPage
      this.getRecord(this.form)
    })
  }
}
</script>

<style scoped>
.nav-form {
  text-align: right;
  height: 63px;
}
</style>
