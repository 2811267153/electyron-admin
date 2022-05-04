<template>
  <!--日志-->
  <div id="record">
    <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
    <el-form-item label="名称" prop="realName">
      <el-input
          v-model="form.realName"
      ></el-input>
    </el-form-item>
    <el-form-item label="操作" prop="operation">
      <el-input v-model="form.operation" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">查询</el-button>
      <el-button  @click="clear">重置</el-button>
    </el-form-item>
  </el-form>


    <el-table
        border
        :data="tableData"
        style="width: 100%">
      <el-table-column
          align="center"
          prop="date"
          width="50"
          label="序号">
        <template scope="scope">{{scope.$index + 1}}</template>
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
        realName: '',
        operation: '',
      },
      tableData: [],
      addForm: {
      },
      time: '',
      rules: {
        realName: [
          { required: false, message: '请输入活动名称', trigger: 'blur' },
        ],
        operation: [
          { required: false, message: '请输入活动名称', trigger: 'blur' },
        ],
      }
    }

  },
  created() {
    this.form = this.$store.state.formPage
    this.getLog(this.form)
  },
  methods: {
    getLog(form){
      console.log(form)
      getLog(form).then(res => {
        console.log(res)
        this.$store.dispatch('total', res.data.data.total)
        this.tableData = res.data.data.records
      }).catch(e => {
        console.log(e)
      })
    },
    clear(){
      this.resetForm()
    },
    resetForm() {
      this.$refs.form.resetFields();
      this.getLog(this.form)
    },
    change(){
     this.form.createTime = this.time[0]
     this.form.endTime = this.time[1]
    },
    submit(){
      this.getLog(this.form)
    }
  },
  mounted() {
    this.$bus.$on('pageChange',() => {
      this.form = this.$store.state.formPage
      this.getLog(this.form)
    })
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
