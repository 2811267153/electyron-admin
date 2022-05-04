<template>
  <div>
    <div v-if="$route.path == '/layout/dataManage'">
      <div class="nav">
        <div class="nav-l">

          <el-form :model="form" inline :rules="rule" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="字典类型名称" prop="name" label-width="180">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="字典编码" prop="mark">
              <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="字典状态" prop="status">
              <el-select v-model="form.status">
                <el-option
                    v-for="item in status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">查找</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>

        </div>
        <div class="nav-l">
          <el-button type="primary"  @click="showAddForm(null, '新增')">新增</el-button>
        </div>
      </div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form ref="addForm" :model="addForm" :rules="rules">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="字典类型编码" :label-width="formLabelWidth" prop="code">
            <el-input v-model="addForm.code" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-radio-group v-model="addForm.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAddForm('addForm')"
          >确 定
          </el-button
          >
        </div>
      </el-dialog>

      <el-table :data="resultList" style="width: 100%"  v-if="resultList.length !== 0">
        <el-table-column prop="id" label="序号" width="50">
          <template scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="name" label="字典类型名称" width="300"></el-table-column>
        <el-table-column prop="code" label="字典类型编码" width="300"></el-table-column>
        <el-table-column prop="createTime" label="更新时间"></el-table-column>
        <el-table-column prop="sort" label="状态">
          <template scope="scope">
            <el-tag v-if="scope.row.status === 1">启用</el-tag>
            <el-tag v-else type="danger">停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="操作">
          <template scope="scope">
            <div class="operate">
              <el-link type="info" @click="showAddForm(scope.row, '修改')">修改</el-link>
              <el-link type="info" @click="removeIt(scope.row)">删除</el-link >
              <el-link type="info" @click="toPath(scope.row)">查看字典</el-link >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <my-empty v-else/>
    </div>
    <router-view/>

  </div>
</template>

<script>
import {getNowFormatDate, randomWord} from '@/uti'

import {
  addDictionaryList,
  addDictionaryTYpe,
  removeDateDictionaryList,
  upDateDictionaryList
} from "@/newwork/system-colltroner";
import myEmpty from "@/newwork/myEmpty";

export default {
  name: 'dataManage',
  components: {
    myEmpty
  },

  data() {
    return {
      title: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      resultList: [],
      addForm: {
        name: '',
        status: '0', // 状态
        code: '',    //字典编码
        pageNum: 1, //pageNum
        pageSize: 10,  //分页大小
      },
      form: {

      },
      rules: {
        name: [{required: true, message: '请输入字典类型名称', trigger: 'blur'}],
        mark: [{required: true, message: '请输入标示码', trigger: 'blur'}],
        code: [{required: true, message: '请输入字典类型编码', trigger: 'blur'}],
      },
      rule: {
        name: [{required: false, message: '请输入字典类型名称', trigger: 'blur'}],
        mark: [{required: false, message: '请输入标示码', trigger: 'blur'}],
        status: [{required: false, message: '请输入字典类型编码', trigger: 'blur'}],
      },
      status: [
        {label: '启用', value: 0},
        {label: '停用', value: 1},
      ]
    }
  },
  methods: {
    submitForm(){
      this.form.pageNum = this.$store.state.formPage.pageNum
      this.form.pageSize = this.$store.state.formPage.pageSize
      this.dictionaryList(this.form)
    },
    submitAddForm(addForm) {

      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.title === '新增' ? addDictionaryTYpe(this.addForm).then(res => {
            this.dictionaryList()
              }) :      //当前打开的是新增的弹框吗 是就执行第一个不然就执行第二个
             this.aa(this.addForm)

          this.dialogFormVisible = false
          this.$message({
            message: '提交完成',
            type: 'success'
          })
          this.dialogFormVisible = false
        } else {
          this.$message({
            message: '提交失败',
            type: 'error'
          })
        }
      })
    },

    resetForm(string) {
      string === 'form' ? this.$refs.form.resetFields() : this.$refs.addForm.resetFields();
      this.dictionaryList(this.$store.state.formPage)
    },
    toPath(row){
      this.$router.push({path: '/layout/dicManage', query: {
          id: row.id,
          name: row.name,
          code: row.code
        }})
      this.$store.dispatch('dictionaryData', row)
    },
    aa(form) {
      console.log(form)
      const data = {}
      data.id = form.id
      data.code = form.code
      data.name = form.name
      data.status = form.status
      upDateDictionaryList(data).then(res => {
        console.log(data)
        console.log(res)
      }).catch(e => {
        console.log(e)
        this.$message.error(e)
      })
    },
    removeIt(row){
      console.log(row.id)
      removeDateDictionaryList(row.id).then(res => {

        this.dictionaryList(this.addForm)
      }).catch(e => {
        this.$message.error(e)
      })
    },
    showAddForm(row, type) {
      this.title = type
      this.dialogFormVisible = true
      this.addForm = row
      type === '修改' ? (this.addForm = row) : (this.addForm = {})
    },
    dictionaryList(addForm) {
      console.log(addForm)
      addDictionaryList(addForm).then(res => {
        this.resultList = res.data.data['records']
        this.$store.dispatch('total', res.data.data.total)
      }).catch(e => {
        this.$message.error(e)
      })
    },
  },
  created() {
    this.dictionaryList(this.$store.state.formPage)
  },
  mounted() {
    this.$bus.$on('pageChange', () => {
      this.dictionaryList(this.$store.state.formPage)
    })
  },
  computed: {
    creatTimes() {
      return (this.addForm.creatTime = getNowFormatDate())
    },

  }
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
}

.operate a {
  margin: 0 10px;
}

</style>
