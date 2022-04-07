<template>
  <!--  字典管理-->
  <div>
    <router-view/>
    <div v-if="$route.path =='/layout/dicManage'">


      <div id="manage" class="nav">
        <div class="nav-l">
          <button>刷新</button>
          <button @click="showAddForm(null, '新增')">新增</button>
        </div>
        <div class="nav-r">
          <input type="text" name="" id="" v-model="searchInp">
          <button><i class="icon iconfont icon-search"></i></button>

          <router-link class="nav-item" :to="{name: 'dataManage'}">数据值管理</router-link>
        </div>
      </div>

      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form ref="addForm" :model="addForm" :rules="riles">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="desc">
            <el-input v-model="addForm.desc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="标示码" :label-width="formLabelWidth" prop="mark">
            <el-input v-model="addForm.mark" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="创建时间" :label-width="formLabelWidth">
            <el-input v-model="creatTime" autocomplete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">

            <el-radio v-model="addForm.status" label="1">开启</el-radio>
            <el-radio v-model="addForm.status" label="2">关闭</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="black">取 消</el-button>
          <el-button type="primary" @click="submitAddForm('addForm')">确 定</el-button>
        </div>
      </el-dialog>


      <el-table
          :data="resultList"
          style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column
            prop="desc"
            label="描述">
        </el-table-column>
        <el-table-column
            prop="mark"
            label="状态码">
        </el-table-column>
        <el-table-column
            prop="status"
            label="标示码">
        </el-table-column>
        <el-table-column
            prop="creatTime"
            label="创建时间">
        </el-table-column>
        <el-table-column
            prop="mark"
            label="操作">
          <template scope="scope">
            <div class="operate">
              <a @click="showAddForm(scope.row, '修改')">修改</a><a @click="removeIt(scope.row)">删除</a><a>编辑</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
import {getNowFormatDate} from "@/uti";

export default {
  name: "serve-manage",
  data() {
    return {
      isShow: false,
      title: '新增',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      searchInp: '',
      resultCopy: [],
      resultList: [],
      addForm: {
        name: '',
        desc: '',
        mark: '',
        creatTime: '',
        status: '1',
      },
      riles: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
        ],
        desc: [
          {required: true, message: '请输入新增描述', trigger: 'blur'}
        ],
        mark: [
          {required: true, message: '请输入标示码', trigger: 'blur'}
        ],
      }
    }
  },
  computed: {
    creatTime() {
      return this.addForm.creatTime = getNowFormatDate()
    }
  },
  methods: {
    submitAddForm(addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          this.resultList.push(this.addForm)
          window.localStorage.setItem('dicManage', JSON.stringify(this.resultList))
          this.dialogFormVisible = false
          this.$message({
            message: '提交完成',
            type: 'success'
          })
        } else {
          this.$message({
            message: '提交失败， 请重试',
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
    black() {
      this.dialogFormVisible = false
      this.resultList = this.resultCopy
    },
    removeIt(item) {
      this.resultList.map((i, index) => {
        console.log(i)
        if (i === item) {
          this.resultList.splice(index, 1)
          window.localStorage.setItem('dicManage', JSON.stringify(this.resultList))
        }

      })

    }
  },
  created() {
    this.resultList = JSON.parse(window.localStorage.getItem('dicManage'))
  }
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
}

.nav-l, .nav-r {
  width: 50%;
}

.nav-item {
  color: #000;
  display: inline-block;
  padding: 10px 20px;
  background-color: #cccccc;
  text-decoration: none;
  border-radius: 10px;
  font-size: 13px;
}

.nav button {
  border: none;
  outline: none;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 0 20px;
  background-color: #cccccc;
}

.nav input {
  outline: none;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  height: 35px;
}

.operate a {
  margin: 0 10px;
  cursor: pointer;
}
</style>
