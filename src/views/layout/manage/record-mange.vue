<template>
  <div>
    <div class="record">
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
        <el-form-item label="名称" prop="realName">
          <el-input
            v-model="form.realName" placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="操作" prop="operation">
          <el-input v-model="form.operation" placeholder="请输入内容" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">查询</el-button>
          <el-button  @click="clear">重置</el-button>
        </el-form-item>
      </el-form>


      <el-table
        :header-cell-style="{background:'#ccc', color: '#fff'}"
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
    <my-footer v-on:next = "next" @prev="prev" :form="form" @change="change"></my-footer>
  </div>
</template>

<script>
import {getLog} from "@/newwork/system-colltroner";
import myFooter from "@/components/myFooter";
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
    this.getLog(this.form)
  },
  components: {
    myFooter
  },
  methods: {
    next(){
      this.form.pageNum ++
      console.log(this.form);
      this.getLog(this.form)
    },
    prev(){
      this.form.pageNum --
      this.getLog(this.form)
    },
    change(e){
      console.log(e);
      this.form.pageNum = e
      this.getLog(this.form)
    },

    getLog(form){
      console.log(form)
      getLog(form).then(res => {
        console.log(res)
        this.$bus.$emit('total', res.data.data.total)
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

    submit(){
      this.getLog(this.form)
    }
  },
  mounted() {
    this.$bus.$on('pageChange',() => {
      this.getLog(this.form)
    })
  }
}
</script>

<style scoped>

.record{
  width: 100%;
  padding: 20px;
  margin-left: 20px;
  margin-top: 20px;
  box-shadow: 0 0 15px #ccc;
  background-color: #fff;
  border-radius: 10px;
  height: 78vh;
}
</style>
