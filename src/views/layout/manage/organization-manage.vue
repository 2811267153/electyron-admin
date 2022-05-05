<template>
<!--  组织管理-->
  <div id="management">
    <el-form ref="form" :model="form" label-width="80px"  :inline="true">
      <el-form-item label="组织名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="组织状态" >
        <el-select v-model="form.region">
          <el-option :label="item.label" :value="item.value" v-for="item in stats"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary">搜索</el-button>
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
    <el-dialog :title="title" :visible.sync="dialogFormVisibles">
      <el-form ref="addForm" :model="addForm" :rules="rules">
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="deptName">
          <el-input class="input" v-model="addForm.deptName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典编码" :label-width="formLabelWidth" prop="code">
          <el-input class="input" v-model="addForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" :label-width="formLabelWidth" prop="orderNum">
          <el-input class="input" v-model="addForm.orderNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" :label-width="formLabelWidth" prop="parentId">
          <el-input ref="input" class="input" v-model="parentName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="display: none" label="上级部门" :label-width="formLabelWidth" prop="parentId">
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
        <el-button @click="dialogFormVisibles = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-tree
        @node-click="handleNodeClick"
        :data="toTreeList"
        :expand-on-click-node="false"
        :render-content="renderContent"
        :node-key="list.deptId"
        :props="defaultProps"
        accordion>
    </el-tree>
  </div>
</template>

<script>
import {addOrganize, delOrganizeList, getOrganizeId, getOrganizeList} from "@/newwork/system-colltroner";
import { fn, getNowFormatDate} from "@/uti";
import {isValidNumber} from "@/util/validate";

export default {
  name: "serve-manage",
  data: function () {
    const validateNum = (rule, value, callback) => {
      if(!isValidNumber(value)){
        callback(new Error('ip地址输入有误,请确认'))
      }else {
        callback()
      }
    }
    return {
      title: '新增',
      dialogFormVisible: false,
      dialogFormVisibles: false,
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
      clickCount: 0,

      parentName: '', //父级单位
      row: [],  //获取当前 点击的那一行
      list: [],
      stats: [
        {label: '启用', value: '启用'},
        {label: '禁用', value: '禁用'}
      ],
      defaultProps:{
        children: 'children',
        label: 'deptName',
      },

      rules: {
        deptName: [
          { required: true, message: '此项为必填项， 请确认', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '此项为必填项， 请确认', trigger: 'blur' },
          {validator: validateNum, message: '请输入合法的数字', trigger: 'blur'}
        ],
        orderNum: [
          { required: true, message: '此项为必填项， 请确认', trigger: 'blur' },
          {validator: validateNum, message: '请输入合法的数字', trigger: 'blur'}
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
    handleNodeClick(data){
      this.row  = data
      this.parentName = this.row.deptName
      this.addForm.parentId = this.row.deptId
    },
    getOrganizeList(form){
      getOrganizeList(form).then(res => {
        this.list = res.data.data
      }).catch(e => {
        console.log(e)
      })
    },
    itemClick(e){
      this.dialogFormVisibles = true
    },
    renderContent(h, data){
      return h('p',{
        class: 'tree-item'
      },[
        h('span',{
          class: 'job-name',

        }, data.data.deptName),

        h('p', {}, [
          h('span', data.data.createTime),
        ]),
        h('p', {}, [
          h("el-link",{
            class: 'a',
            props:{
              type:'primary'
            },
            on: {
              click: this.itemClick
            }
          },'新增'),
          h("el-link",{
            props:{
              type:'primary'
            },
            on: {
              click: this.removeIt
            }
          },'删除'),
        ])
      ])
    },
    addForms(row, title){
      this.title = title
      this.dialogFormVisibles = true
      this.resultCopy = this.resultList
      title === '修改' ? this.addForm = row : 'aa'
      //判断属否是添加下属单位 如果是  获取 本单位名称 不可更改
      title === '下属单位' ? getOrganizeId(row.deptId).then(res => {

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
    removeIt(){
      delOrganizeList(this.row.deptId).then(res => {
        console.log(res )
        if(res.data.code === 200){
          this.$message.success('删除成功!')
          this.getOrganizeList(this.form)
        }else {}
        this.$message.error(res.data.msg)
      })
    },

  },
  created() {
    this.getOrganizeList(this.form)
  },
  computed: {
    createTime(){
      return this.addForm.createTime = getNowFormatDate()
    },

    toTreeList(){
      return  fn(this.list)
    },
  }
}
</script>

<style>
.input{
  width: 30%;
}

.operate a{
  margin: 0 10px;
}
.treeitem, .el-tree-node__content{
  height: 40px !important;
  padding: 0 10px;
  line-height: 40px;
}
.tree-item{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.a{
  margin-right: 20px;
}
.createTime {
  text-align: center;
  flex: 1;
}
.job-name{
  width: 150px;
}
.none {
  display: none;
}
.blick{
  display: block;
}
</style>
