<template>
  <div class="configure">
    <div class="form-nav">
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" :rules="rule">
        <el-form-item label="网卡名称" prop="fifoName">
          <el-input v-model="form.fifoName"></el-input>
        </el-form-item>
        <el-form-item label="端口" prop="profileSipPort">
          <el-input v-model="form.profileSipPort"></el-input>
        </el-form-item>
        <el-form-item label="服务接口名称" prop="netName">
          <el-input v-model="form.netName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="find">查询</el-button>
          <el-button @click="resetForm('clear')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary"  @click="addForms(null, '新增')">新增配置</el-button>
    </div>

    <el-table
        :data="list"
        style="width: 100%">
      <el-table-column
          prop="date"
          label="序号">
        <template scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column
          prop="profileName"
          label="服务接口名称">
      </el-table-column>
      <el-table-column
          prop="netName"
          label="网卡名称">
      </el-table-column>
      <el-table-column
          prop="profileRtpIp"
          label="IP">
      </el-table-column>
      <el-table-column
          prop="profileSipPort"
          label="端口">
      </el-table-column>
      <el-table-column
          prop="template"
          label="模板">
      </el-table-column>
      <el-table-column
          prop="netMac"
          label="网卡的mac地址">
      </el-table-column>
      <el-table-column
          prop="netMac"
          label="状态">
        <template scope="scope">
          <a v-if="scope.row.status === 0">启用</a>
          <a v-else>禁用</a>
        </template>
      </el-table-column>
      <el-table-column
          prop="address"
          label="操作">
        <template scope="scope">
          <el-link @click="addForms(scope.row, '编辑')" style="margin-right: 20px">编辑</el-link>
          <el-link @click="del(scope.row.id)" style="margin-right: 20px">删除</el-link>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="rules">
        <el-form-item label="服务接口名称" :label-width="formLabelWidth" prop="profileName">
          <el-input v-model="addForm.profileName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网卡名称" :label-width="formLabelWidth" prop="netName">
          <el-input v-model="addForm.netName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网卡地址" :label-width="formLabelWidth" prop="netMac">
          <el-input v-model="addForm.netMac" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="IP" :label-width="formLabelWidth" prop="profileSipIp">
          <el-input v-model="addForm.profileSipIp" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="端口" :label-width="formLabelWidth" prop="profileSipPort">
          <el-input v-model="addForm.profileSipPort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="配置文件" :label-width="formLabelWidth" prop="template">
          <el-select v-model="addForm.template" placeholder="请选择活动区域">
            <el-option :label="item.label" :value="item.value" v-for="item in templateType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio-group v-model="addForm.status">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addFroFile, delProFile, getProfile, upDataProFile} from "@/newwork/ground-colltroner";

export default {
  name: "configure",
  data(){
    return{
      form: { },
      list: [],
      dialogFormVisible: false,
      title: '新增',
      formLabelWidth: "120px",
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
      ],
      rules: {
        netMac: [
          { required: true, message: '该选项为必填项，请确认', trigger: 'change' }
        ],
        netName: [
          { required: true, message: '该选项为必填项，请确认', trigger: 'change' }
        ],
        profileName: [
          { required: true, message: '该选项为必填项，请确认', trigger: 'change' }
        ],
        profileSipIp: [
          { required: true, message: '该选项为必填项，请确认', trigger: 'change' }
        ],
        profileSipPort: [
          { required: true, message: '该选项为必填项，请确认', trigger: 'change' }
        ],
        template: [
          { required: true, message: '该选项为必填项，请确认', trigger: 'change' }
        ],
      },
      rule: {
        profileName: [
          { required: true, message: '该选项为必填项，请确认', trigger: 'change' }
        ],
        profileSipPort: [
          { required: true, message: '该选项为必填项，请确认', trigger: 'change' }
        ],
        netName: [
          { required: true, message: '该选项为必填项，请确认', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    find(){
      this.getProfile(this.form)
    },
    getProfile(form){
      getProfile(form).then(res => {
        console.log(res)
        this.$store.dispatch('total', res.data.data.total)
        if(res.data.code === 200) {
          this.list = res.data.data
        }else {
          this.$message.error(res.data.msg)
        }
      })
    },
    resetForm(type) {
      type === 'clear' ? this.$refs.form.resetFields() : this.$refs.addForm.resetFields();
    },
    addForms(row, title){
      this.title = title
      this.dialogFormVisible = true
      title === '编辑' ? this.addForm = row : ''
    },
    del(id){
      delProFile(id).then(res => {
        console.log(res)
        if(res.data.code === 200){
          this.getProfile(this.form)
          this.$message.success('提交完成')
        }else {
          this.$message.error(res.data.msg)
        }
      }).catch(e => this.$message.error(e))
    },
    submitForm(){
      this.title === '新增' ? this.addDataForm() : this.upDataForm()
    },
    addDataForm(){
      addFroFile(this.addForm).then(res => {
        console.log(res)
        if(res.data.code === 200){
          this.dialogFormVisible = false
          this.getProfile(this.form)
          this.$message.success('提交完成')
        }else {
          this.$message.error(res.data.msg)
        }
      })
    },
    upDataForm(){
      upDataProFile(this.addForm).then(res => {
        console.log(res)
        if(res.data.code === 200){
          this.getProfile(this.form)
          this.$message.success('提交完成')
          this.dialogFormVisible = false
        }else {
          this.$message.error(res.data.msg)
        }
      })
    },
  },
  created() {
    this.form = this.$store.state.formPage
    this.getProfile(this.form)
  },
  watch: {
    dialogFormVisible(){
      this.resetForm()
      this.getProfile(this.form)
    }
  },
  mounted() {
    this.$bus.$on('pageChange', () => {
      this.form = this.$store.state.formPage
      this.getProfile(this.form)
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
