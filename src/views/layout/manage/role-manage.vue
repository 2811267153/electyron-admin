<template>
  <!--  角色管理-->
  <div class="role">
    <el-header>
      <div class="content-nav">
        <el-breadcrumb class="nav-bar" separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a>{{ $route.meta.title }}</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-header>
    <div class="container">
      <div class="nav">
        <div class="nav-l">
          <el-form ref="form" label-width="80px" :inline="true" :rules="form_rules"  :model="navForm">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="navForm.roleName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
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
          <el-button type="primary" @click="addForms(null, '新增')">新增</el-button>
        </div>
      </div>

      <el-dialog title="数据权限" :visible.sync="dialogFormVisibles">
        <el-form :model="dataScopeForm">
          <el-form-item label="角色ID" :label-width="formLabelWidth">
            <el-input v-model="dataScopeForm.roleName" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="数据权限" :label-width="formLabelWidth">
            <el-select v-model="dataScopeForm.dataScope">
              <el-option :label="item.label" :value="item.value" v-for="item in dataScopeType"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单权限" :label-width="formLabelWidth" required>
            <el-tree
              props="permission"
              :data="menuIds"
              :default-checked-keys="defaultMenuIds"
              :props="defaultProps"
              node-key="menuId"
              accordion
              :check-on-click-node="true"
              show-checkbox
              @check="checkChange">
            </el-tree>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibles = false">取 消</el-button>
          <el-button type="primary" @click="submitDataScopeForm(dataScopeForm)">确 定</el-button>
        </div>
      </el-dialog>


      <el-dialog :title="title" :visible.sync="dialogFormVisible" destroy-on-close>
        <el-form :model="addForm" ref="addForm" :rules="rules">
          <el-form-item
              label="角色名称"
              :label-width="formLabelWidth"
              prop="roleName"
          >
            <el-input v-model="addForm.roleName" autocomplete="off" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item
              label="显示顺序"
              :label-width="formLabelWidth"
              prop="orderNum"
          >
            <el-input v-model="addForm.orderNum" autocomplete="off" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item
              label="角色编码"
              :label-width="formLabelWidth"
              prop="roleCode"
          >
            <el-input v-model="addForm.roleCode" autocomplete="off" placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item label="权限状态" :label-width="formLabelWidth">
            <el-radio-group v-model="addForm.status">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="addForm.desc" autocomplete="off" placeholder="请输入内容"></el-input>
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
          max-height="800px"
          v-if="list.length !== 0"
          :data="list"
          :header-cell-style="{background:'#f2f2f2'}"
          height="500px"
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
              启用
            </p>
            <p v-else>
              禁用
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
          <template scope="scope">
            <el-link @click="distribution(scope.row)" type="info">数据权限</el-link>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="address"
            label="操作">
          <template scope="scope">
            <el-link style="margin-right: 20px" type="info" @click="addForms(scope.row, '编辑')">编辑</el-link>
            <el-link style="margin-right: 20px" type="info" @click="removeIt(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <my-empty v-else></my-empty>
    </div>
    <my-footer v-on:next = "next" @prev="prev" :form="navForm" @change="change"></my-footer>
  </div>
</template>

<script>
import {
  addRole,
  getRoleList,
  getMenuAll,
  deleteRoleList,
  getDistribution,
  distribution, upDataRoleList
} from "@/newwork/system-colltroner";
import {menuToTree, treeToArray} from "@/uti";
import {deleteRate} from "@/newwork/ground-colltroner";
import myEmpty from "@/newwork/myEmpty";
import {isValidNumber} from "@/util/validate";
import myFooter from "@/components/myFooter";


export default {
  name: 'role-manage',
  data() {
    const validateNum = (rule, value, callback) => {
      if(!isValidNumber(value)){
        callback(new Error('ip地址输入有误,请确认'))
      }else {
        callback()
      }
    }
    return {
      menuIds: [],//菜单列表
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogFormVisibles: false,
      title: '新增',
      navForm: {
        pageSize: 14,
        pageNum: 1,
        orderNum: '', //显示顺序
        roleCode: '', //角色编码
        roleName: '', //角色名称
        status: '',
      },
      defaultMenuIds: [], // '默认选中的ID'
      timer: {},
      addForm: {
        menuIds: [],
        pageSize: 14,
        pageNum: 1,
        orderNum: '', //显示顺序
        roleCode: '', //角色编码
        roleName: '', //角色名称
        status: 0,
      },
      total: 0,
      selectMenuList: [],
      dataScopeForm: {
        dataScope: ''
      },
      list: [],
      rules: {
        roleName: [{required: true, message: '此项为必填项，请确认', trigger: 'blur'},],
        orderNum: [{required: true, message: '此项为必填项，请确认', trigger: 'blur'},
          {validator: validateNum, message: '请输入合法的数字', trigger: 'blur'}
        ],
        roleCode: [{required: true, message: '此项为必填项，请确认', trigger: 'blur'},],
        permission: [
          {required: true, message: '此项为必填项，请确认', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '此项为必填项，请确认', trigger: 'blur'}
        ]
      },
      form_rules:{
        roleName: [{required: false, message: '此项为必填项，请确认', trigger: 'blur'},],
        status: [
          {required: false, message: '此项为必填项，请确认', trigger: 'blur'}
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
      ],
      dataScopeType: [
        {label: '全部数据权限', value: 1},
        {label: '自定义数据权限', value: 2},
        {label: '本部门数据权限', value: 3},
        {label: '本部门及一下数据权限', value: 4},
        {label: '本人', value: 5},
      ]


    }
  },
  watch: {
    dialogFormVisibles(val) {
      if (val) {
        getMenuAll().then(res => {
          this.menuIds = menuToTree(res.data.data)
        }).catch(e => {
          this.$message.error(e)
        })
        //判断 当前所处的位置是否为编辑
        if(this.title === '新增'){
          this.dataScopeForm.sysMenuList.forEach(item => {
            this.defaultMenuIds.push(item.menuId)
            console.log(this.defaultMenuIds);
          })
          this.dataScopeForm.menuIds = this.defaultMenuIds
        }
      }else {
        this.defaultMenuIds = []
      }}
  },
  methods: {
    next(){
      this.navForm.pageNum --
      this.getRoleList(this.navForm)
    },
    prev(){
      this.navForm.pageNum ++
      this.getRoleList(this.navForm)
    },
    change(e){

      this.navForm.pageNum = e
      this.getRoleList(this.navForm)
    },
    distribution(row) {
      this.dialogFormVisibles = true
      this.dataScopeForm.roleId = row.roleId
      this.dataScopeForm = row
    },
    submitDataScopeForm(dataScopeForm){
      distribution(dataScopeForm).then(res => {
        console.log(res);
        if(res.data.code === 200){
          this.$message.success('提交完成')
          this.getRoleList(this.navForm)
          this.dialogFormVisibles = false
        }else {
          this.$message.error(res.data.msg)
        }
      })
    },
    addForms(row, title) {
      this.dialogFormVisible = true
      this.title = title
      this.title === '新增' ? this.addForm = this.$options.data().addForm : this.addForm = row
    },
    find() {
      this.getRoleList(this.navForm)
    },
    clearForm() {
      this.navForm = this.$options.data().navForm
      this.getRoleList(this.navForm)
    },
    removeIt(row) {
      deleteRoleList(row.roleId).then(res => {
        if (res.data.code === 200) {
          this.$message.success('提交完成')
          this.getRoleList(this.navForm)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        this.changeAddForm()
        if (valid && !this.isVacancy) {
          if (this.title === '新增') {
            addRole(this.addForm).then(res => {
              if (res.data.code === 200) {
                this.$message.success('提交完成')
                this.getRoleList(this.navForm)
                this.resetForm()
                this.dialogFormVisible = false
              } else {
                this.$message.error(res.data.msg)
              }
            }).catch(e => this.$message.error(e))
          } else {
            upDataRoleList(this.addForm).then((res => {
              if(res.data.code === 200){
                this.$message.success('提交完成')
                this.getRoleList(this.navForm)
                this.dialogFormVisible = false
              }else {
                this.$message.error(res.data.msg)
              }
            }))
          }
        } else {
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
      const menuId = treeToArray(context.checkedNodes)

      //添加 角色权限列表
      menuId.forEach(item =>  this.addForm.menuIds.push(item.menuId))
    this.changeAddForm()
    },
    /**
     *
     * 查询 表单是否 添加菜单权限
     */
    changeAddForm(){
      this.addForm.menuIds.length === 0 ? this.isVacancy = true : this.isVacancy = false
    },
    getRoleList(form) {
      getRoleList(form).then(res => {
        this.$bus.$emit('total', res.data.data.total)
        this.list = res.data.data.records
      }).catch(e => {
        this.$message.error(e)
      })
    }
  },
  created() {
    this.getRoleList(this.navForm)
  },


  components: {
    myEmpty,
    myFooter
  },
}
</script>

<style >
.el-header{
  padding: 0 !important;
}
.role{
  display: flex;
  height: calc(100vh - 160px);
  justify-content: space-between;
  flex-direction: column;
}
.content-nav {
  padding: 20px;
  box-shadow: 0 0 15px #ccc;
  border-radius: 10px;
  background-color: #fff;
}
.el-table::before{
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
}
.nav {
  display: flex;
  justify-content: space-between;
  height: 40px;
  overflow: hidden;
}

.nav-l {
  height: 40px;
  display: flex;
}
.container{
  margin-top: 20px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 15px #ccc;
  background-color: #fff;
  border-radius: 10px;
  flex: 1;
}
</style>
