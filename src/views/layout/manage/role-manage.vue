<template>
  <!--  角色管理-->
  <div>
    <div class="nav">
      <div class="nav-l">
        <el-form label-width="80px" :inline="true" :model="navForm">
          <el-form-item label="角色名称">
            <el-input v-model="navForm.name"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-input v-model="navForm.permission"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
                v-model="navForm.startCreateTime"
                type="date"
                placeholder="选择开始日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
                v-model="navForm.endCreateTime"
                type="date"
                placeholder="选择结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
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
        <el-button type="primary" @click="dialogFormVisible = false"
        >确 定
        </el-button
        >
      </div>
    </el-dialog>

    <el-table
        :data="list"
        border
        style="width: 80%; margin-top: 20px">
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
          <el-link style="margin-right: 20px" type="info" @click="">删除</el-link>
          <el-link style="margin-right: 20px" type="info" @click="">修改</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {addRole, getRoleList, getMenuAll} from "@/newwork/system-colltroner";
import {menuToTree, treeToArray} from "@/uti";

export default {
  name: 'role-manage',
  data() {
    return {
      menuIds: [],//菜单列表
      formLabelWidth: '120px',
      dialogFormVisible: false,
      navForm: {
        menuIds: [],
        pageSize: 10,
        pageNum: 1,
        orderNum: '', //显示顺序
        roleCode: '', //角色编码
        roleName: '', //角色名称
        status: 0
      },
      timer: {},
      addForm: {
        menuIds: [],
        pageSize: 10,
        pageNum: 1,
        orderNum: '', //显示顺序
        roleCode: '', //角色编码
        roleName: '', //角色名称
        status: 0
      },
      selectMenuList: [],
      list: [],
      rules: {
        roleName: [{required: true, message: '此项为必填项，请确认', trigger: 'change'}],
        orderNum: [{required: true, message: '此项为必填项，请确认', trigger: 'change'}],
        roleCode: [{required: true, message: '此项为必填项，请确认', trigger: 'change'}],
        permission: [
          {required: true, message: '此项为必填项，请确认', trigger: 'change'}
        ]
      },
      defaultProps: {
        children: 'children',
        label: 'menuName'
      }
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (val) {
        getMenuAll().then(res => {
          console.log(res)
          this.menuIds = menuToTree(res.data.data)
        }).catch(e => {
          console.log(e)
        })
      }
    }
  },
  methods: {
    addForms() {
      this.dialogFormVisible = true
    },
    check(a, context) {

    },
    checkChange(a, context) {
      const c =(context.checkedNodes)
      console.log((c))
    },
    getRoleList(form) {
      getRoleList(form).then(res => {
        console.log(res)
        this.list = res.data.data.records
      }).catch(e => {
        this.$message.error(e)
      })
    }
  },
  created() {
    this.getRoleList(this.navForm)
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
