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
        <el-form-item label="ID" :label-width="formLabelWidth" prop="id">
          <el-input v-model="addForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据标示" :label-width="formLabelWidth" prop="mark">
          <el-input v-model="addForm.mark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="代码值" :label-width="formLabelWidth" prop="value">
          <el-input v-model="addForm.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
          <el-input v-model="addForm.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
          <el-input v-model="creatTime" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio-group v-model="addForm.stats">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
        :data="resultList"
        style="width: 100%">
      <el-table-column
          prop="id"
          label="ID"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="mark"
          label="数据标示">
      </el-table-column>
      <el-table-column
          prop="value"
          label="代码值">
      </el-table-column>
      <el-table-column
          prop="sort"
          label="排序">
      </el-table-column>
      <el-table-column
          prop="upDataTime"
          label="更新时间">
      </el-table-column>
      <el-table-column
          prop="sort"
          label="状态">
        <template scope="scope">
          <el-tag v-if="scope.row.stats === 1">启用</el-tag>
          <el-tag v-else type="danger">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="sort"
          label="操作">
        <template scope="scope">
          <div class="operate">
            <a @click="showAddForm(scope.row, '修改')">修改</a>
            <a @click="">删除</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getNowFormatDate} from "@/uti";

export default {
  name: "dataManage",
  data() {
    return {
      title: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      resultList: [],
      addForm: {
        id: '',
        name: '',
        mark: '',
        value: '',
        sort: '',
        stats: 1,
        upDataTime: ''
      },
      rules: {
        id: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        mark: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        value: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        sort: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],

      }
    }
  },
  methods: {
    submitAddForm(addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          this.resultList.push(this.addForm)
          window.localStorage.setItem('dataManage', JSON.stringify(this.resultList))
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
      });
    },

    showAddForm(row, type) {
      this.title = type
      this.dialogFormVisible = true
      this.resultCopy = this.resultList
      type === '修改' ? this.addForm = row : this.addForm = {}
    },
  },
  created() {
    this.resultList = JSON.parse(window.localStorage.getItem('dataManage'))
  },
  computed: {
    creatTime(){
      return this.addForm.upDataTime = getNowFormatDate()
    }
  }
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
}
.operate a{
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
