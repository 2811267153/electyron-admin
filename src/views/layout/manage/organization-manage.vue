<template>
<!--  组织管理-->
  <div id="management">
    <el-form ref="form" :model="form" label-width="80px"  :inline="true">
      <el-form-item label="组织名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="组织状态" >
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option :label="item.label" :value="item.value" v-for="item in stats"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary" @click="addForms(null, '新增')">新增</el-button>
    </el-form>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="addForm" :model="addForm" :rules="rules">
        <el-form-item label="组织名称" :label-width="formLabelWidth" prop="name">
          <el-input v-if="title === '新增'" class="input" v-model="addForm.name" autocomplete="off"></el-input>
          <el-input  v-else class="input" v-model="addForm.organizationName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label="上级组织" :label-width="formLabelWidth">
          <el-select v-if="title === '新增'" class="input" v-model="addForm.organization = '新增单位无法选择上级'" placeholder="" disabled>
          </el-select>
          <el-select v-else class="input" v-model="addForm.organization = this.addForm.name" placeholder="" disabled>
          </el-select>
        </el-form-item>
        <el-form-item  label="创建时间" :label-width="formLabelWidth">
          <el-select class="input" v-model="createTime" placeholder="新增单位无法选择上级" disabled>
          </el-select>
        </el-form-item>
        <el-form-item  label="备注" :label-width="formLabelWidth" prop="desc">
          <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              class="desc"
              v-model="addForm.desc">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>


    <el-table
        :data="list"
        style="width: 100%">
      <el-table-column
          prop=""
          label="组织名称"
          width="180">
        <template scope="scope">

          <div v-if="scope.row.organizationName == null"> {{scope.row.name}}</div>
          <div v-else> {{scope.row.organizationName}}</div>
        </template>
      </el-table-column>

      <el-table-column
          prop="organization"
          label="上级单位"
          width="180">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="创建时间"
          width="300">
      </el-table-column>
      <el-table-column
          prop="desc"
          label="备注">
      </el-table-column>
      <el-table-column
          prop="desc"
          label="备注">
        <template scope="scope">
          <div class="operate">
            <a>新增</a><a @click="removeIt(scope.row)">删除</a><a @click="addForms(scope.row, '修改')">修改</a>
          </div>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import {getNowFormatDate} from "@/uti";

export default {
  name: "serve-manage",
  data: function () {
    return {
      title: '新增',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        area: '',
      },
      addForm: {
        name: '',
        organization: '',
        desc: '',
        createTime: '',
        organizationName: null,
      },
      list: [],
      stats: [
        {label: '启用', value: '启用'},
        {label: '禁用', value: '禁用'}
      ],

      rules: {
        name: [
          { required: true, message: '请输入组织名称', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    addForms(row, title){
      this.title = title
      this.dialogFormVisible = true
      this.resultCopy = this.resultList
      title === '修改' ? this.addForm = row : this.addForm = {}
    },
    submitForm(addForm){
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          this.list.push(this.addForm)
          window.localStorage.setItem('organizationManage', JSON.stringify(this.list))
          this.dialogFormVisible = false
          this.$message({
            message: '提交完成',
            type: 'success'
          })
        } else {
          console.log('error submit!!');
          this.$message({
            message: '提交失败, 请重试',
            type: 'error'
          })
        }
      });
    },
    removeIt(item){
      this.list.map((items, i) => {
        if(item === items){
          this.list.splice(i, 1)
        }
      })
    }
  },
  created() {
    this.list = JSON.parse(window.localStorage.getItem('organizationManage')) || []
  },
  computed: {
    createTime(){
      return this.addForm.createTime = getNowFormatDate()
    }
  }
}
</script>

<style scoped>
.input{
  width: 30%;
}
.desc {
  height: 100px;
}
.operate a{
  margin: 0 10px;
}
</style>
