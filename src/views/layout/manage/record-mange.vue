<template>
  <!--日志-->
  <div id="record">
    <div class="container">
      <p class="title">日志</p>
      <div class="nav-form">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="账户姓名">
            <el-input
                v-model="form.serialNumber"
                placeholder="账户姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="IP">
            <el-input v-model="form.deviceName" placeholder="IP"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <div class="block">
              <span class="demonstration">默认</span>
              <el-date-picker
                  value-format="yyyy-MM-DD HH:mm:ss"
                  v-model="time"
                  @change="change"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-table
        border
        :data="tableData"
        style="width: 100%">
      <el-table-column
          align="center"
          prop="date"
          width="50"
          label="序号">
        <template scope="scope">{{scope.$index}}</template>
      </el-table-column>
      <el-table-column
          align="center"
          prop="createTime"
          label="时间">
      </el-table-column>
      <el-table-column
          prop="realName"
          align="center"
          width="200"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="ipAddress"
          align="center"
          width="200"
          label="IP地址">
      </el-table-column>
      <el-table-column
          prop="targetPage"
          align="center"
          width="200"
          label="目标页面">
      </el-table-column>
      <el-table-column
          prop="operation"
          align="center"
          width="200"
          label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getLog} from "@/newwork/system-colltroner";
export default {
  name: 'record-mange',
  data(){
    return {
      form: {
        createTime: '',
        pageNum: 1,
        pageSize: 10,
        serialNumber: '',
        IP: '',
        endTime: ''
      },
      tableData: [],
      addForm: {
      },
      time: ''
    }

  },
  created() {
    this.getLog(this.form)
  },
  methods: {
    getLog(form){
      console.log(form)
      getLog(form).then(res => {
        console.log(res)
        this.tableData = res.data.data.records
      }).catch(e => {
        console.log(e)
      })
    },
    change(){
     this.form.createTime = this.time[0]
     this.form.endTime = this.time[1]
    },
    submit(){
      this.getLog(this.form)
    }
  }
}
</script>

<style scoped>
/*#record {*/
/*  display: flex;*/
/*  justify-content: space-between;*/
/*}*/

.container {
  flex: 1;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}
.container p {
  background-color: #f2f2f2;
  padding: 10px 15px;
}

.nav-form {
  margin: 15px;
  display: flex;
  justify-content: space-between;
}

</style>
