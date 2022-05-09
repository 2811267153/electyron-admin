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
          <el-link type="info">
            {{ data.menuName }}
          </el-link>
          <div class="item-r">
            <el-link class="link" @click="showForm('新增')">新增</el-link>
            <el-link class="link" @click="showForm('编辑')">编辑</el-link>
            <el-link>删除</el-link>
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
            <el-select v-model="addForm.menuType">
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
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {addMenuAll, getMenuAll, upDataMenu} from "@/newwork/system-colltroner";
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
      row: {},
      defaultShowNodes: [],
      menuType: [
        {label: '菜单(M)', value: 0},
        {label: '按钮(F)', value: 1}
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
    meunClick(a) {
      this.row = a
      console.log(this.row);
      this.showForm()
    },
    showForm(type) {
      if(type === null) {
        this.dialogFormVisible = false
      }else {
        this.dialogFormVisible = true
        this.title = type
        console.log(this.row);
        if (this.title === '编辑') {
          this.addForm = this.row
        }else {
          this.addForm = this.$options.data().addForm
          this.addForm.parentId = this.row.menuId
        }
      }}
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

<style scoped>
.custom-tree-node {
  width: 100%;
}

.tree {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tree .link {
  margin-right: 20px;
}
</style>
