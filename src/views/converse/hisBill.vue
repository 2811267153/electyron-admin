<template>
  <div id="history">
    <div class="container">
      <p>{{ $route.meta.title }}</p>
    </div>
    <div class="nav-form">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="计费账户">
          <el-input v-model="form.name" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="被叫号码">
          <el-input v-model="form.mobilePhone" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-input v-model="form.startingTime" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="form.endTime" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="date"
          label="序号">
        <template scope="scope">{{scope.$index}}</template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="计费账户"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="被叫号码"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="计费账户"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="呼出时间"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="应答时间"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="呼出时长"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="计费时长"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="挂机原因"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="网管"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="外呼前缀">
      </el-table-column>
      <el-table-column
          prop="name"
          label="录音">
      </el-table-column>
      <el-table-column
          prop="name"
          label="计费状态">
      </el-table-column>
      <el-table-column
          prop="name"
          label="费用">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "history",
  data() {
    return {
      form: {
        mobilePhone: '',
        startingTime: '',
        endTime: ""
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style scoped>
.container {
  border: 1px solid #ccc;
  margin: 0 20px;
}

.container p {
  background-color: #f2f2f2;
  padding: 10px 15px;
}

.nav-form {
  margin: 15px;
  height: 40px;
  display: flex;
  justify-content: space-between;
}

#networkManagement .width {
  display: flex;
  justify-content: space-between;
}

.width > * {
  flex: 1;
}
</style>
