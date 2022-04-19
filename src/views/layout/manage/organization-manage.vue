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
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="deptName">
          <el-input class="input" v-model="addForm.deptName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典编码" :label-width="formLabelWidth" prop="code">
          <el-input class="input" v-model="addForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" :label-width="formLabelWidth" prop="orderNum">
          <el-input type="number" class="input" v-model="addForm.orderNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" :label-width="formLabelWidth" prop="parentId">
          <el-input ref="input" class="input" v-model="addForm.parentId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio-group v-model="addForm.status">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>


    <el-table
        :data="list"
        border
        style="width: 80%">
      <el-table-column
          prop="deptName"
          label="序号"
          align="center"
          width="180">
        <template scope="scope">{{scope.$index +  1}}</template>
      </el-table-column>
      <el-table-column
          prop="deptName"
          label="组织名称"
          align="center"
          width="180">
      </el-table-column>
      <el-table-column
          prop="organization"
          label="上级单位"
          align="center"
          width="180">
      </el-table-column>
      <el-table-column
          prop="createBy"
          label="创建者"
          align="center"
          width="180">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          width="300">
      </el-table-column>
      <el-table-column
          prop="desc"
          align="center"
          label="状态">
        <template scope="scope">
          <div v-if="scope.row.status === 0"><el-tag type="success">开启</el-tag></div>
          <div v-else><el-tag type="error">关闭</el-tag></div>
        </template>
      </el-table-column>
      <el-table-column
          prop="desc"
          align="center"
          label="操作">
        <template scope="scope">
          <div class="operate">
            <a @click="addForms(scope.row, '下属单位.')">新增</a><a @click="removeIt(scope.row)">删除</a><a @click="addForms(scope.row, '修改')">修改</a>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-tree
        :data="toTreeList"
        accordion>
    </el-tree>
  </div>
</template>

<script>
import {addOrganize, getOrganizeId, getOrganizeList} from "@/newwork/system-colltroner";
import {convert, filterArray, getNode, getNowFormatDate} from "@/uti";

export default {
  name: "serve-manage",
  data: function () {
    return {
      title: '新增',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        pageNum: 1,
        pageSize: 10
      },
      addForm: {
        code: '', //字典编码
        deptName: '',  //部门名字
        orderNum: '', //显示顺序
        parentId: '', //父级单位
        status: 0 //状态
      },
      list: [],
      stats: [
        {label: '启用', value: '启用'},
        {label: '禁用', value: '禁用'}
      ],

      rules: {
        deptName: [
          { required: true, message: '此项为必填项， 请确认', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '此项为必填项， 请确认', trigger: 'blur' },
        ],
        orderNum: [
          { required: true, message: '此项为必填项， 请确认', trigger: 'blur' },
        ],
        ancestors: [
          { required: true, message: '此项为必填项， 请确认', trigger: 'blur' },
        ],
        parentId: [
          { required: true, message: '此项为必填项， 请确认', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    getOrganizeList(form){
      getOrganizeList(form).then(res => {
        console.log(res)
        this.list = res.data.data
      }).catch(e => {
        console.log(e)
      })
    },

    addForms(row, title){
      this.title = title
      this.dialogFormVisible = true
      this.resultCopy = this.resultList
      title === '修改' ? this.addForm = row : 'aa'
      //判断属否是添加下属单位 如果是  获取 本单位名称 不可更改
      title === '下属单位' ? getOrganizeId(row.deptId).then(res => {
        console.log(res)
        this.addForm.parentId = res.data.data.deptId
        this.$refs.input.disabled = true
      }).catch(e => {this.$message.error(e)}) : ''

    },
    submitForm(addForm){
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          addOrganize(this.addForm).then(res => {
            console.log(res)
          }).catch(e => {
            console.log(e)
          })
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


    this.getOrganizeList(this.form)
  },
  computed: {
    createTime(){
      return this.addForm.createTime = getNowFormatDate()
    },

    toTreeList(){
      return  convert(this.list)
    },
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
