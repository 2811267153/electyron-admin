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
                placeholder="审批人"
            ></el-input>
          </el-form-item>
          <el-form-item label="IP">
            <el-input v-model="form.deviceName" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-select v-model="form.stauts" placeholder="请选择">
              <el-option
                  v-for="item in stautsData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="date"
          label="日期"
          width="180">
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
export default {
  name: 'record-mange',
  data(){
    return {
      form: {
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
/*#record {*/
/*  display: flex;*/
/*  justify-content: space-between;*/
/*}*/

.container {
  flex: 1;
  border: 1px solid #ccc;
  margin: 0 20px 20px;
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
