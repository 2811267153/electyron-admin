<template>
  <!--  角色管理-->
  <div>
    <div class="container">
      <div class="nav">
        <div class="nav-l">
          <el-form ref="form" label-width="80px" :inline="true" :model="navForm">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="navForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="roleCode">
              <el-select v-model="navForm.status" placeholder="请选择">
                <el-option
                    v-for="item in status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="find">查询</el-button>
          <el-button @click="clearForm">重置</el-button>
        </div>
        <div class="nav-r">
          <el-button type="primary" @click="addForms">新增</el-button>
        </div>
      </div>

      <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
        <el-form :model="addForm" ref="addForm" :rules="rules">
          <el-form-item
              label="角色名称"
              :label-width="formLabelWidth"
              prop="roleName"
          >
            <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
              label="显示顺序"
              :label-width="formLabelWidth"
              prop="orderNum"
          >
            <el-input v-model="addForm.orderNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
              label="角色编码"
              :label-width="formLabelWidth"
              prop="roleCode"
          >
            <el-input v-model="addForm.roleCode" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="菜单权限" :label-width="formLabelWidth" required>
            <el-tree
                props="permission"
                :data="menuIds"
                :props="defaultProps"
                accordion
                :check-on-click-node="true"
                show-checkbox
                @check="checkChange">
            </el-tree>
          </el-form-item>
          <el-form-item label="权限状态" :label-width="formLabelWidth">
            <el-radio-group v-model="addForm.status">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="addForm.desc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm"
          >确 定
          </el-button
          >
        </div>
      </el-dialog>

      <el-table
          v-if="list.length !== 0"
          :data="list"
          border
          style="width: 100%; margin-top: 20px">
        <el-table-column
            prop="date"
            align="center"
            label="序号"
            width="180">
          <template scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
            prop="roleName"
            align="center"
            label="角色名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            align="center"
            label="状态"
            width="180">
          <template scope="scope">
            <p v-if="scope.row.status === 0">
              <el-tag type="success">启用</el-tag>
            </p>
            <p v-else>
              <el-tag type="error">禁用</el-tag>
            </p>
          </template>
        </el-table-column>
        <el-table-column
            prop="createTime"
            align="center"
            label="创建时间"
            width="300">
        </el-table-column>
        <el-table-column
            prop="createTime"
            align="center"
            label="数据权限"
            width="180">
          <template>
            <el-link type="info">数据权限</el-link>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="address"
            label="操作">
          <template scope="scope">
            <el-link style="margin-right: 20px" type="info" @click="removeIt(scope.row)">删除</el-link>
            <el-link style="margin-right: 20px" type="info" @click="">修改</el-link>
          </template>
        </el-table-column>
      </el-table>
      <my-empty v-else></my-empty>
    </div>

  </div>
</template>

<script>
import {addRole, getRoleList, getMenuAll} from "@/newwork/system-colltroner";
import {menuToTree, treeToArray} from "@/uti";
import {deleteRate} from "@/newwork/ground-colltroner";
import myEmpty from "@/newwork/myEmpty";


export default {
  name: 'role-manage',
  data() {
    return {
      menuIds: [],//菜单列表
      formLabelWidth: '120px',
      dialogFormVisible: false,
      navForm: {
        menuIds: [],
        pageSize: 14,
        pageNum: 1,
        orderNum: '', //显示顺序
        roleCode: '', //角色编码
        roleName: '', //角色名称
        status: '',
      },
      timer: {},
      addForm: {
        menuIds: [],
        pageSize: 14,
        pageNum: 1,
        orderNum: '', //显示顺序
        roleCode: '', //角色编码
        roleName: '', //角色名称
        status: 0
      },
      total: 0,
      selectMenuList: [],
      list: [],
      rules: {
        roleName: [{required: true, message: '此项为必填项，请确认', trigger: 'change'}],
        orderNum: [{required: true, message: '此项为必填项，请确认', trigger: 'change'}],
        roleCode: [{required: true, message: '此项为必填项，请确认', trigger: 'change'}],
        permission: [
          {required: true, message: '此项为必填项，请确认', trigger: 'change'}
        ],
        status: [
          {required: true, message: '此项为必填项，请确认', trigger: 'change'}
        ]
      },
      isVacancy: true,
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      status: [
        {label: '启用', value: 0},
        {label: '停用', value: 1},
      ]

    }
  },
  watch: {
    dialogFormVisible(val) {
      if (val) {
        getMenuAll().then(res => {
          this.menuIds = menuToTree(res.data.data)
        }).catch(e => {
          this.$message.error(e)
        })
      }
    }
  },
  methods: {
    addForms() {
      this.dialogFormVisible = true
    },
    find(){
      this.getRoleList(this.navForm)
    },
    clearForm(){
      this.resetForm('form')
    },
    removeIt(row){
      console.log(row)
      deleteRate(row.roleId).then(res => {
        if(res.data.code === 200 ){
          this.$message.success('提交完成')
          this.getRoleList(this.navForm)
        }else {
          this.$message.error(res.data.msg)
        }
      })
    },
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid && !this.isVacancy) {
          addRole(this.addForm).then(res => {
            if(res.data.code === 200){
              this.$message.success('提交完成')
              this.getRoleList(this.navForm)
              this.resetForm()
              this.dialogFormVisible = false
            }else {
              this.$message.error(res.data.msg)
            }
          }).catch(e => this.$message.error(e))
        } else {
          this.$message.error('提交失败， 请重试')
          return false;
        }
      });
    },
    resetForm(string) {
      string === 'form' ? this.$refs.form.resetFields() : this.$refs.addForm.resetFields();
      this.getRoleList(this.navForm)
    },

    checkChange(a, context) {
      this.addForm.menuIds = []
      const menuId =treeToArray(context.checkedNodes)
      menuId.forEach((item, i ) => {
        this.addForm.menuIds.push(item.menuId)
      })
      this.addForm.menuIds.length === 0 ? this.isVacancy = true : this.isVacancy = false
      console.log(this.addForm.menuIds)
    },
    getRoleList(form) {
      getRoleList(form).then(res => {
        console.log(res)
        this.total = res.data.data.total
        this.$store.dispatch('total', this.total)
        const formPage = {}
        formPage.pageNum = 1;
        formPage.pageSize = 14
        this.$store.dispatch('formPage', formPage)

        this.list = res.data.data.records
      }).catch(e => {
        this.$message.error(e)
      })
    }
  },
  created() {
    this.getRoleList(this.navForm)
  },
  mounted() {
    this.$bus.$on('pageChange', () => {
      this.getRoleList(this.$store.state.formPage)
    })
  },
  components: {
    myEmpty
  }
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
}

.nav-l {
  height: 40px;
  display: flex;
}

</style>
