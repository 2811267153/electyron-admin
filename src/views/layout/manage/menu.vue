<template>
  <div class="menu">
    <el-tree
        :data="path"
        :props="defaultProps"
        node-key="menuId"
        @node-click="meunClick"
        :expand-on-click-node="false"
        :default-expanded-keys="defaultShowNodes"
        accordion>
      <div class="custom-tree-node" slot-scope="{node, data}">
        <div class="tree">
          <a>
            {{ data.menuName }}
          </a>
          <p class="tree-path">
            {{ data.path }}
          </p>
          <div class="item-r">
            <el-link type="primary" class="link" @click="currentShow(0)">新增</el-link>
            <el-link type="primary" class="link" @click="currentShow(1)">编辑</el-link>
          </div>
        </div>
      </div>
    </el-tree>


    <div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="addForm" ref="addForm" :rules="rules">
          <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="menuName">
            <el-input v-model="addForm.menuName" autocomplete="off" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="菜单类型" :label-width="formLabelWidth" prop="menuType">
            <el-select v-model="addForm.menuType"  style="width: 100%;">
              <el-option v-for="item in menuType" :value="item.value" placeholder="请输入内容" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显示顺序" :label-width="formLabelWidth" prop="orderNum">
            <el-input v-model="addForm.orderNum" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="父菜单ID" :label-width="formLabelWidth" prop="parentId">
            <el-input v-model="addForm.parentId" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="路由地址" :label-width="formLabelWidth" prop="path">
            <el-input v-model="addForm.path" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="权限标识" :label-width="formLabelWidth" prop="perms">
            <el-input v-model="addForm.perms" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
            <el-radio-group v-model="addForm.status">
              <el-radio :label="0">开启</el-radio>
              <el-radio :label="1">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="form-bottom">
            <el-button @click="removeIt">删除</el-button>
            <div>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addMenuAll, delMenu, getMenuAll, upDataMenu } from "@/newwork/system-colltroner";
import {fn, menuToTree} from "@/uti";

export default {
  name: "menu-path",
  data() {
    return {
      title: '新增',
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {},
      path: [],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      addForm: {
        menuName: '',
        menuType: '',
        orderNum: '',
        parentId: '',
        path: '',
        perms: '',
        status: 0,
      },
      showTitle: ['新增','编辑'],
      showIndex: '',
      row: {},
      defaultShowNodes: [],
      menuType: [
        {label: '菜单', value: 'M'},
        {label: '按钮', value: 'F'}
      ],
      statusType: [
        {label: '开启', value: 0},
        {label: '关闭', value: 1},
      ],
      rules: {
        menuName: [  { required: true, message: '该选项不可为空, 请确认', trigger: 'blur' },],
        menuType: [  { required: true, message: '该选项不可为空, 请确认', trigger: 'blur' },],
        orderNum: [  { required: true, message: '该选项不可为空, 请确认', trigger: 'blur' },],
        parentId: [  { required: true, message: '该选项不可为空, 请确认', trigger: 'blur' },],
        path: [  { required: true, message: '改选行不可为空, 请确认', trigger: 'blur' }, ],
        perms: [  { required: true, message: '改选行不可为空, 请确认', trigger: 'blur' },],
        status: [  { required: false, message: '改选行不可为空, 请确认', trigger: 'blur' },],
      }
    }
  },
  created() {
    this.getMenuAll(this.form)
  },
  methods: {
    getMenuAll(form) {
      getMenuAll(form).then(res => {
        this.list = res.data.data
        this.path = menuToTree(res.data.data)
      }).catch(e => {
        console.log(e)
        this.$message.error(e)
      })
    },
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.title === '新增' ? addMenuAll(this.addForm).then(res => {
                console.log(res)
                if (res.data.code === 200) {
                  this.$message.success('提交完成')
                  this.dialogFormVisible = false
                  this.getMenuAll()
                } else {
                  this.$message.error(res.data.msg)
                }
              }) :
              upDataMenu(this.addForm).then(res => {
                console.log(res)
                if (res.data.code === 200) {
                  this.getMenuAll()
                  this.dialogFormVisible = false
                  this.$message.success('提交完成')
                } else {
                  this.$message.error(res.data.msg)
                }
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    meunClick(data) {
      this.row = data
      this.showForm(this.showTitle[this.showIndex])
    },
    showForm(type) {
      this.dialogFormVisible = true
      this.title = type
      if (type === '编辑') {
        console.log('aa');
        this.addForm = this.row
      }else {
        this.addForm = this.$options.data().addForm
        this.addForm.parentId = this.row.menuId
      }
    },
    currentShow(index){
      this.showIndex = index
    },
    removeIt(e){
      console.log(e);
      e.stopPropagation()
      delMenu(this.row.menuId).then(res => {
        if(res.data.code === 200){
          this.getMenuAll(this.form)
          this.dialogFormVisible = false
          this.$message.success('提交完成')
        }else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  computed: {
    // pathRes(){
    //   return (this.path)
    // }
  },
  watch: {
    path: {
      handler() {
        console.log(this.path)
        this.path.forEach(item => {
          this.defaultShowNodes.push(item.menuId)
        })
      },
      deep: true
    }
  }
}
</script>

<style>
.custom-tree-node {
  width: 100%;
}
.menu{
  width: 100%;
  padding: 20px;
  margin-left: 20px;
  margin-top: 20px;
  box-shadow: 0 0 15px #ccc;
  background-color: #fff;
  border-radius: 10px;
  height: 78vh;
}

.tree {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tree .link {
  margin-right: 20px;
}
.form-bottom{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tree-path{
  width: 20%;
}
</style>
