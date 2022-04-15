<template>
  <div>
    <div class="nav">
      <div class="nav-l">
        <button>刷新</button>
        <button @click="showAddForm(null, '新增')">新增</button>
      </div>
      <div class="nav-r">
        <button>返回</button>
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
        <el-form-item label="创建时间" :label-width="formLabelWidth" prop="creatTime">
          <el-input v-model="creatTimes" autocomplete="off" readonly></el-input>
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

    <el-table :data="resultList" style="width: 100%">
      <el-table-column prop="id" label="序号" width="50">
        <template scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="name" label="字典类型名称" width="300"></el-table-column>
      <!--      <el-table-column prop="mark" label="数据标示"></el-table-column>-->
      <!--      <el-table-column prop="value" label="标示码"></el-table-column>-->
      <el-table-column prop="creatTime" label="更新时间"></el-table-column>
      <el-table-column prop="code" label="字典类型编码" width="300"></el-table-column>
      <!--      <el-table-column prop="mark" label="数据标示"></el-table-column>-->
      <!--      <el-table-column prop="code" label="标示码"></el-table-column>-->
      <el-table-column prop="sort" label="状态">
        <template scope="scope">
          <el-tag v-if="scope.row.status === 1">启用</el-tag>
          <el-tag v-else type="danger">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="操作">
        <template scope="scope">
          <div class="operate">
            <a @click="showAddForm(scope.row, '修改')">修改</a>
            <a @click="removeIt(scope.row)">删除</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
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

export default {
  name: 'dataManage',
  data() {
    return {
      title: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      resultList: [],
      addForm: {
        name: '',
        creatTime: '',  //创建时间
        status: 1, // 状态
        code: '',    //字典编码
        del: '',
        id: '',
        pageNum: 1, //pageNum
        pageSize: 10,  //分页大小
      },
      rules: {
        name: [{required: true, message: '请输入字典类型名称', trigger: 'blur'}],
        mark: [{required: true, message: '请输入标示码', trigger: 'blur'}],
        code: [{required: true, message: '请输入字典类型编码', trigger: 'blur'}],
      }
    }
  },
  methods: {
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
    aa(form) {
      console.log(form)
      const data = {}
      data.id = form.id
      data.code = form.code
      data.name = form.name
      data.status = form.status
      upDateDictionaryList(data).then(res => {
        console.log(data)
        console.log(res, 'ssssssssss')
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
      console.log(this.addForm)
      // this.resultCopy = this.resultList
      type === '修改' ? (this.addForm = row) : (this.addForm = {})
    },
    dictionaryList(addForm) {
      addDictionaryList(addForm).then(res => {
        this.resultList = res.data.data['records']
      }).catch(e => {
        this.$message.error('网络请求失败请重试')
      })
    },
  },
  created() {
    this.dictionaryList(this.addForm)
  },
  computed: {
    creatTimes() {
      return (this.addForm.creatTime = getNowFormatDate())
    },
    ids() {
      // return this.addForm.id = randomWord(false, 13, 16)
    }
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

.nav button {
  padding: 10px 15px;
  border-radius: 10px;
  background-color: #f2f2f2;
  margin: 0 10px;
  border: none;
  outline: none;
}
</style>
