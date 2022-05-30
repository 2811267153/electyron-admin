<template>
  <!--  角色管理-->
  <div class="warps roleManage">
    <el-header>
      <my-el-header />
    </el-header>
    <div class="container">
      <div class="form-nav">
        <div class="nav-l">
          <el-form ref="form" label-width="40px" :inline="true" :rules="form_rules" :model="navForm">
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
          <el-button type="primary" @click="addForms(null, '添加角色')">添加角色</el-button>
        </div>
      </div>
      <el-dialog :width="$store.state.dialogWidth" title="数据权限" :visible.sync="dialogFormVisibles"
                 :close-on-click-modal="false">
        <el-form :model="dataScopeForm">
          <div class="width">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input disabled v-model="dataScopeForm.roleName" placeholder="请输入内容" />
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item label="数据权限" :label-width="formLabelWidth">
              <el-select v-model="dataScopeForm.dataScope" style="width: 100%">
                <el-option :label="item.label" :value="item.value" v-for="item in dataScopeType"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item v-if="dataScopeForm.dataScope === 2" label="数据权限" :label-width="formLabelWidth" required>
            <el-tree
              props="permission"
              :data="formatList"
              :default-checked-keys="defaultMenuIds"
              :props="defaultProps"
              node-key="deptId"
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
      <el-dialog :title="title" :visible.sync="dialogFormVisible" destroy-on-close :close-on-click-modal="false">
        <el-form :model="addForm" ref="addForm" :rules="rules">
          <div class="width">
            <el-form-item
              label="角色名称"
              :label-width="formLabelWidth"
              prop="roleName"
            >
              <el-input v-model="addForm.roleName" autocomplete="off" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item
              label="显示顺序"
              :label-width="formLabelWidth"
              prop="orderNum"
            >
              <el-input v-model="addForm.orderNum" autocomplete="off" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item
              label="角色编码"
              :label-width="formLabelWidth"
              prop="roleCode"
            >
              <el-input v-model="addForm.roleCode" autocomplete="off" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <el-form-item
            label="菜单权限"
            :label-width="formLabelWidth"
            prop="roleCode"
          >
            <el-tree
              ref="tree"
              props="permission"
              :data="menuIds"
              :default-checked-keys="defaultMenuIds"
              :props="menuProps"
              node-key="menuId"
              check-strictly
              @check-change="getChange"
              accordion
              :check-on-click-node="true"
              show-checkbox
              @check="menuChange">
            </el-tree>
          </el-form-item>

          <div class="width">
            <el-form-item label="权限状态" :label-width="formLabelWidth">
              <el-radio-group v-model="addForm.status">
                <el-radio :label="0">启用</el-radio>
                <el-radio :label="1">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="addForm.desc" autocomplete="off" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
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
        :header-cell-style="{background:'#ccc', color: '#fff',}"
        height="calc(100vh - 400px)"
        style="width: 100%; margin-top: 20px">
        <el-table-column
          prop="date"
          align="center"
          label="序号"
          width="50">
          <template scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="roleName"
          align="center"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="createTime"
          align="center"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="createTime"
          align="center"
          label="数据权限">
          <template scope="scope">
            <el-link @click="distribution(scope.row)" type="info">数据权限</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="状态">
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
          align="center"
          prop="address"
          fixed="right"
          :width="$store.state.tableMixWidth"
          label="操作">
          <template scope="scope">
            <div class="operate">
              <el-link type="info" @click="addForms(scope.row, '编辑')">编辑</el-link>

              <template>
                <el-popconfirm
                  title="确认要删除吗？"
                  @confirm="removeIt(scope.row, '删除')"
                >
                  <el-link slot="reference" class="link-item">删除</el-link>
                </el-popconfirm>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <my-empty v-else></my-empty>
    </div>
    <my-footer v-on:next="next" @prev="prev" :form="navForm" @change="change" @pageCheng="pageCheng"></my-footer>
  </div>
</template>

<script>
import {
  addRole,
  deleteRoleList,
  distribution,
  getMenuAll,
  getOrganizeList,
  getRoleList,
  upDataRoleList
} from "@/newwork/system-colltroner";
import { fn, menuToTree, treeToArray } from "@/uti";
import myEmpty from "@/newwork/myEmpty";
import { isValidNumber } from "@/util/validate";
import myFooter from "@/components/myFooter";
import myElHeader from "@/components/myElHeader";


export default {
  name: "role-manage",
  data() {
    const validateNum = (rule, value, callback) => {
      if (!isValidNumber(value)) {
        callback(new Error("ip地址输入有误,请确认"));
      } else {
        callback();
      }
    };
    return {
      menuIds: [],//菜单列表
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogFormVisibles: false,
      title: "新增",
      navForm: {
        pageSize: 14,
        pageNum: 1,
        orderNum: "", //显示顺序
        roleCode: "", //角色编码
        roleName: "", //角色名称
        status: ""
      },
      formatList: [],  //部门列表
      defaultMenuIds: [], // '默认选中的ID'
      timer: {},
      addForm: {
        menuIds: [],
        pageSize: 14,
        pageNum: 1,
        orderNum: "", //显示顺序
        roleCode: "", //角色编码
        roleName: "", //角色名称
        status: 0
      },
      total: 0,
      selectMenuList: [],
      dataScopeForm: {
        dataScope: ""
      },
      list: [],
      rules: {
        roleName: [{ required: true, message: "此项为必填项，请确认", trigger: "blur" }],
        orderNum: [{ required: true, message: "此项为必填项，请确认", trigger: "blur" },
          { validator: validateNum, message: "请输入合法的数字", trigger: "blur" }
        ],
        roleCode: [{ required: true, message: "此项为必填项，请确认", trigger: "blur" }],
        permission: [
          { required: true, message: "此项为必填项，请确认", trigger: "blur" }
        ],
        status: [
          { required: true, message: "此项为必填项，请确认", trigger: "blur" }
        ]
      },
      form_rules: {
        roleName: [{ required: false, message: "此项为必填项，请确认", trigger: "blur" }],
        status: [
          { required: false, message: "此项为必填项，请确认", trigger: "blur" }
        ]
      },
      isVacancy: true,
      defaultProps: {
        children: "children",
        label: "deptName"
      },
      menuProps: {
        children: "children",
        label: "menuName"
      },
      status: [
        { label: "启用", value: 0 },
        { label: "停用", value: 1 }
      ],
      dataScopeType: [
        { label: "本人", value: 5 },
        { label: "本部门数据权限", value: 3 },
        { label: "本部门及一下数据权限", value: 4 },
        { label: "全部数据权限", value: 1 },
        { label: "自定义数据权限", value: 2 }
      ],
      defaultExpand: [] //默认展开的菜单
    };
  },
  watch: {
    dialogFormVisibles(val) {
      if (val) {
        //判断 当前所处的位置是否为编辑
        console.log(this.dataScopeForm);
        this.dataScopeForm.sysDeptList.forEach(item => {
          this.defaultMenuIds.push(item.deptId);
        });
        this.dataScopeForm.deptIds = this.defaultMenuIds;
      } else {
        this.defaultMenuIds = [];
      }
    },
    dialogFormVisible(val) {
      if (!val) {
        this.addForm = this.$options.data().addForm;
      } else {
        if (this.title === "编辑") {
          this.defaultMenuIds = [];
          console.log(this.addForm.sysMenuList);
          this.addForm.sysMenuList.forEach(item => {
            this.defaultMenuIds.push(item.menuId);
          });
        } else {
          this.defaultMenuIds = [];
        }
      }
    }
  },
  methods: {
    next() {
      this.navForm.pageNum--;
      this.getRoleList(this.navForm);
    },
    prev() {
      this.navForm.pageNum++;
      this.getRoleList(this.navForm);
    },
    change(e) {
      this.navForm.pageNum = e;
      this.getRoleList(this.navForm);
    },
    pageCheng(e) {
      this.navForm = this.$options.data().navForm;
      this.navForm.pageSize = e;
      this.getRoleList(this.navForm);
    },
    //提交数据权限

    distribution(row) {
      this.dialogFormVisibles = true;
      //获取部门列表
      this.getOrganizeList();
      this.dataScopeForm.roleId = row.roleId;
      this.dataScopeForm = row;
    },
    getOrganizeList() {
      getOrganizeList().then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.formatList = fn(res.data.data);
        }
      });
    },
    //提交数据权限
    submitDataScopeForm(dataScopeForm) {
      distribution(dataScopeForm).then(res => {
        if (res.data.code === 200) {
          this.$message.success("提交完成");
          this.getRoleList(this.navForm);
          this.dialogFormVisibles = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //菜单权限更改
    menuChange(data, context) {
      this.addForm.menuIds = context.checkedKeys;
      this.changeAddForm();
    },
    addForms(row, title) {
      this.dialogFormVisible = true;
      this.title = title;
      if (this.title === "添加角色") {
        this.addForm = this.$options.data().addForm;
      } else {
        this.addForm = row;
        const { sysMenuList } = row;
        console.log(sysMenuList);
        /**
         *
         * uid里面保存的是 row里面的详细菜单的ID
         * @type {*[]}
         */
        const uid = [];
        row.sysMenuList.forEach(item => {
          uid.push(item.menuId);
        });
        this.addForm.menuIds = uid;
      }

      //获取菜单列表
      getMenuAll().then(res => {
        this.menuIds = menuToTree(res.data.data);
      }).catch(e => {
        this.$message.error(e);
      });

    },
    find() {
      this.getRoleList(this.navForm);
    },
    clearForm() {
      this.navForm = this.$options.data().navForm;
      this.getRoleList(this.navForm);
    },
    removeIt(row) {
      deleteRoleList(row.roleId).then(res => {
        if (res.data.code === 200) {
          this.$message.success("提交完成");
          this.getRoleList(this.navForm);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        // this.changeAddForm()
        if (valid) {
          if (this.title === "新增") {
            addRole(this.addForm).then(res => {
              if (res.data.code === 200) {
                this.$message.success("提交完成");
                this.getRoleList(this.navForm);
                this.resetForm();
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.msg);
              }
            }).catch(e => this.$message.error(e));
          } else {
            upDataRoleList(this.addForm).then((res => {
              if (res.data.code === 200) {
                this.$message.success("提交完成");
                this.getRoleList(this.navForm);
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.msg);
              }
            }));
          }
        } else {
          return false;
        }
      });
    },
    getChange(data, check) {
      if (data.parentId !== null) {
        if (check === true) {
          // 如果选中，设置父节点为选中
          this.$refs.tree.setChecked(data.parentId, true);
        } else {
          // 如果取消选中，检查父节点是否该取消选中（可能仍有子节点为选中状态）
          let parentNode = this.$refs.tree.getNode(data.parentId);
          let parentHasCheckedChild = false;
          for (
            var i = 0, parentChildLen = parentNode.childNodes.length;
            i < parentChildLen;
            i++
          ) {
            if (parentNode.childNodes[i].checked === true) {
              parentHasCheckedChild = true;
              break;
            }
          }
          if (!parentHasCheckedChild)
            this.$refs.tree.setChecked(data.parentId, false);
        }
      }
      // 子节点操作，如果取消选中，取消子节点选中
      if (data.children != null && check === false) {
        for (let j = 0, len = data.children.length; j < len; j++) {
          let childNode = this.$refs.tree.getNode(data.children[j].id);
          if (childNode.checked === true) {
            this.$refs.tree.setChecked(childNode.data.id, false);
          }
        }
      }
    },
    resetForm(string) {
      string === "form" ? this.$refs.form.resetFields() : this.$refs.addForm.resetFields();
      this.getRoleList(this.navForm);
    },

    checkChange(a, context) {
      this.dataScopeForm.deptIds = [];
      const menuId = treeToArray(context.checkedNodes);

      //添加 角色权限列表
      console.log(menuId);
      menuId.forEach(item => this.dataScopeForm.deptIds.push(item.deptId));
      this.changeAddForm();
    },
    /**
     *
     * 查询 表单是否 添加菜单权限
     */
    changeAddForm() {
      // console.log(this.addForm);
      // this.addForm.sysDeptList.length === 0 ? this.isVacancy = true : this.isVacancy = false

      if (this.addForm.hasOwnProperty("sysDeptList") && this.addForm.sysDeptList.length === 0) {
        this.isVacancy = true;
      } else {
        this.isVacancy = false;
      }
    },
    getRoleList(form) {
      getRoleList(form).then(res => {
        this.$bus.$emit("total", res.data.data.total);
        this.list = (res.data.data.records);
      }).catch(e => {
        this.$message.error(e);
      });
    }
  },
  created() {
    this.getRoleList(this.navForm);
  },
  components: {
    myEmpty,
    myFooter,
    myElHeader
  }
};
</script>

<style scoped>
.role {
  display: flex;
  height: calc(100vh - 160px);
  justify-content: space-between;
  flex-direction: column;
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

.container {
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0 0 15px #ccc;
  background-color: #fff;
  border-radius: 10px;
  flex: 1;
}
</style>
