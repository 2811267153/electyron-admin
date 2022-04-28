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
        <el-form :model="form" ref="addForm">
          <el-form-item label="菜单名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.menuName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜单类型" :label-width="formLabelWidth">
            <el-select v-model="addForm.menuType" placeholder="请选择活动区域">
              <el-option v-for="item in menuType" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显示顺序" :label-width="formLabelWidth">
            <el-input v-model="addForm.orderNum"/>
          </el-form-item>
          <el-form-item label="父菜单ID" :label-width="formLabelWidth">
            <el-input v-model="addForm.parentId"/>
          </el-form-item>
          <el-form-item label="路由地址" :label-width="formLabelWidth">
            <el-input v-model="addForm.path"/>
          </el-form-item>
          <el-form-item label="权限标识" :label-width="formLabelWidth">
            <el-input v-model="addForm.perms"/>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-radio-group v-model="addForm.status">
              <el-radio :label="0">备选项</el-radio>
              <el-radio :label="1">备选项</el-radio>
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
      dialogFormVisible: true,
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
        {label: 'M', value: 0},
        {label: 'F', value: 1}
      ],
      statusType: [
        {label: '开启', value: 0},
        {label: '关闭', value: 1},
      ]
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
    },
    showForm(type) {
      this.title = type
      console.log(type)
      this.dialogFormVisible = true
      if (type === '新增') {
        this.addForm = this.$options.data().addForm
        this.addForm.parentId = this.row.menuId
      }else {
        this.addForm = this.row
      }
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
