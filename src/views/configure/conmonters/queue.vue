<template>
  <div class="queue">
    <div class="form-nav">
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" :rules="rule">
        <el-form-item label="队列名称" prop="fifoName">
          <el-input v-model="form.fifoName"></el-input>
        </el-form-item>
        <el-form-item label="队列号码" prop="fifoAgent">
          <el-input v-model="form.fifoAgent"></el-input>
        </el-form-item>
        <el-form-item label="入路由号码" prop="fifoRouterIn">
          <el-input v-model="form.fifoRouterIn"></el-input>
        </el-form-item>
        <el-form-item label="agent等待时间" prop="memberTimeout">
          <el-input v-model="form.memberTimeout"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="find">查询</el-button>
          <el-button @click="resetForm('clear')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary"  @click="addForms(null, '新增')">新增队列</el-button>
    </div>


    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="rules">
        <div class="width">
          <el-form-item label="队列名称" :label-width="formLabelWidth" prop="fifoName">
            <el-input v-model="addForm.fifoName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="队列号码" :label-width="formLabelWidth" prop="fifoAgent">
            <el-input v-model="addForm.fifoAgent" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="入路由号码" :label-width="formLabelWidth" prop="fifoRouterIn">
            <el-input v-model="addForm.fifoRouterIn" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出路由号码" :label-width="formLabelWidth" prop="fifoRouterOut">
            <el-input v-model="addForm.fifoRouterOut" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="队列等待音" :label-width="formLabelWidth" prop="fifoWaitMusic">
            <el-input v-model="addForm.fifoWaitMusic" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="最大注册数" :label-width="formLabelWidth" prop="memberSimultaneous">
            <el-input v-model="addForm.memberSimultaneous" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="等待时间" :label-width="formLabelWidth" prop="memberTimeout">
            <el-input v-model="addForm.memberTimeout" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="接听电话间隔" :label-width="formLabelWidth" prop="wrapupTime">
            <el-input v-model="addForm.wrapupTime" autocomplete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
        class="table"
        :data="list"
        border
        v-if="list.length !== 0"
        style="width: 100%">
      <el-table-column
          align="center"
          prop="date"
          label="序号">
        <template scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column
          prop="fifoName"
          align="center"
          label="队列名称">
      </el-table-column>
      <el-table-column
          align="center"
          prop="fifoAgent"
          label="队列号码">
      </el-table-column>
      <el-table-column
          align="center"
          prop="fifoRouterIn"
          label="入路由点号码">
      </el-table-column>
      <el-table-column
          align="center"
          prop="fifoRouterOut"
          label="出路由点号码">
      </el-table-column>
      <el-table-column
          align="center"
          prop="memberSimultaneous"
          label="最大注册数">
      </el-table-column>
      <el-table-column
          align="center"
          prop="memberSimultaneous"
          label="队列等待音">
      </el-table-column>
      <el-table-column
          align="center"
          prop="memberTimeout"
          label="等待时间">
      </el-table-column>
      <el-table-column
          align="center"
          prop="wrapupTime"
          label="时间间隔">
      </el-table-column>
      <el-table-column
          align="center"
          prop="wrapupTime"
          label="操作">
        <template scope="scope">
          <el-link @click="addForms(scope.row, '编辑')" style="margin-left: 20px">编辑</el-link>
          <el-link @click="del(scope.row)" style="margin-left: 20px">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <my-empty v-else/>

  </div>
</template>

<script>
import {addFifo, delFifo, getFifo, upDataFifo} from "@/newwork/directory";
import myEmpty from "@/newwork/myEmpty";

export default {
  name: "queue",
  data(){
    return {
      form: {
        fifoName: '', //队列名称
        fifoAgent: '',//队列名称
        fifoRouterIn: '',  //fifoRouterIn
        memberTimeout: '', //	agent等待时间
      },
      addForm: {
        domain: '', //域
        fifoAgent: '', //号码
        fifoName: '', //队列名称
        fifoRouterIn: '', //入路由点号码
        fifoRouterOut: '', //出路由点号码
        fifoWaitMusic: '', //队列等待音
        memberSimultaneous: '', //agent最大同时注册数量至少为1
        memberTimeout: '', //agent等待时间
        wrapupTime : '', //接听下一路电话的间隔
      },
      list: [],
      dialogFormVisible: true,
      title: '新增',
      formLabelWidth: '120px',
      rules: {
        fifoName: [
          { required: true, message: '该选项不可为空,请确认', trigger: 'blur' },
        ],
        fifoAgent: [
          { required: true, message: '该选项不可为空,请确认', trigger: 'blur' },
        ],
        fifoRouterIn: [
          { required: true, message: '该选项不可为空,请确认', trigger: 'blur' },
        ],
        fifoRouterOut: [
          { required: true, message: '该选项不可为空,请确认', trigger: 'blur' },
        ],
        fifoWaitMusic: [
          { required: true, message: '该选项不可为空,请确认', trigger: 'blur' },
        ],
        memberSimultaneous: [
          { required: true, message: '该选项不可为空,请确认', trigger: 'blur' },
        ],
        memberTimeout: [
          { required: true, message: '该选项不可为空,请确认', trigger: 'blur' },
        ],
        wrapupTime: [
          { required: true, message: '该选项不可为空,请确认', trigger: 'blur' },
        ],
      },
      rule: {
        fifoName: [
          { required: false, message: '该选项不可为空,请确认', trigger: 'blur' },
        ],
        fifoAgent: [
          { required: false, message: '该选项不可为空,请确认', trigger: 'blur' },
        ],
        fifoRouterIn: [
          { required: false, message: '该选项不可为空,请确认', trigger: 'blur' },
        ],
        memberTimeout: [
          { required: false, message: '该选项不可为空,请确认', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    addForms(row, type){
      this.title = type
      type === '新增' ? this.resetForm() : this.addForm = row
      this.getFifo(this.form)
      this.dialogFormVisible = true
    },
    resetForm(type) {
     type === 'clear' ? this.$refs.form.resetFields(): this.$refs.addForm.resetFields();
      this.getFifo(this.form)
    },
    find(){
      this.getFifo(this.form)
    },
    submitForm(){
      this.title === '新增' ? addFifo(this.addForm).then(res => {
        console.log(res)
        if(res.data.code === 200){
          this.getFifo(this.form)
          this.$message.success('提交完成')
          this.dialogFormVisible = false
        }else {
          this.$message.error(res.data.msg)
        }
      }) : upDataFifo(this.addForm).then(res => {
        console.log(res )
        if(res.data.code === 200){
          this.getFifo(this.form)
          this.$message.success('提交完成')
          this.dialogFormVisible = false

        }else {
          this.$message.error(res.data.msg)
        }
      })
    },
    del(row){
      delFifo(row.id).then(res => {
        console.log(res)
        if(res.data.code === 200){
          this.$message.success('提交完成')
          this.getFifo(this.form)
        }else {
          this.$message.error(res.data.msg)
        }
      })
    },
    getFifo(form){
      getFifo(form).then(res => {
        console.log(res)
        if(res.data.code === 200){
          this.list = res.data.data.records
        }else {
          this.$message.error(res.data.msg)
        }
      }).catch(e => this.$message.error(e))
    }
  },
  created() {
    this.form = this.$store.state.formPage
    this.getFifo(this.form)
  },
  components: {
    myEmpty
  },
  mounted() {
    this.$bus.$on('pageChange', () => {
      this.form = this.$store.state.formPage
      this.getFifo(this.form)
    })
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
