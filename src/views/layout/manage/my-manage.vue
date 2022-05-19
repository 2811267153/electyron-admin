<template>
  <div id="my-manage">
    <my-el-header />
    <div class="container">
      <el-row class="main">
        <div class="container-l">
          <e-tree @treeClick="treeClick" :data="treeArr" />
        </div>
        <div class="container-r">
          <div class="container-nav">
            <div class="container-form">
              <el-form :inline="true" ref="form" :model="form" :rules="form_rules" class="demo-form-inline">
                <el-form-item label="用户名称" prop="nickName">
                  <el-input placeholder="请输入内容" v-model="form.nickName"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input placeholder="请输入内容" v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="用户状态" prop="status">
                  <el-select v-model="form.status">
                    <el-option label="开启" :value=0></el-option>
                    <el-option label="关闭" :value=1></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                  <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
              </el-form>
              <el-button type="primary" @click="show(null, '新增')">新增</el-button>
            </div>
            <el-table
              height="calc(100vh - 100px - 100px - 100px - 100px)"
              :data="resultList" v-if="resultList.length !== 0" @row-click="rowClick"
              :row-class-name="tableRowClassName"
              :header-cell-style="{background:'#ccc', color: '#fff'}"
              style="width: 100%; margin-top: 20px">
              <el-table-column align="center" label="序号" width="50">
                <template scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column align="center" prop="nickName" label="姓名">
              </el-table-column>
              <el-table-column align="center" prop="username" label="账号"></el-table-column>
              <el-table-column align="center" prop="phone" label="手机号">
              </el-table-column>
              <el-table-column
                align="center"
                prop="department"
                label="所属部门"
              >
                <template scope="scope">{{ scope.row.sysDept.deptName }}</template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="createTime"
                label="创建时间"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column prop="starts" label="状态" align="center">
                <template scope="scope">
                  <p>
                    <a v-if="scope.row.status === 0">启用</a>
                    <a v-else>停用</a>
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="starts" label="操作" align="center" fixed="right" min-width="200px">
                <template scope="scope">
                  <div class="operate">
                    <a @click="show(scope.row, '修改')" class="link-item">修改</a>
                    <el-tooltip class="item" effect="dark" content="重置后默认密码为123456" placement="top">
                      <a @click="resetPad(scope.row)" class="link-item">重置</a>
                    </el-tooltip>
                    <template>
                      <el-popconfirm
                        title="确认要删除吗？"
                        @confirm="show(scope.row, '删除')"
                      >
                        <el-link slot="reference" class="link-item">删除</el-link>
                      </el-popconfirm>
                    </template>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <my-empty v-else />
            <!--
                  新增悬浮窗
              -->
            <el-dialog
              :destroy-on-close="true"
              :title="title"
              :visible.sync="isShow"
              width="40%"
              :close-on-click-modal="false"
            >
              <el-form ref="addForm" :model="addForm" id="form" :rules="rules">
                <el-form-item
                  class="form-item"
                  label="用户名称"
                  :label-width="formLabelWidth"
                  prop="nickName"
                >
                  <el-input placeholder="请输入内容" v-model="addForm.nickName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                  class="form-item"
                  label="用户角色"
                  :label-width="formLabelWidth"
                  prop="roleId"
                >
                  <el-select
                    v-if="title === '新增'"
                    style="width: 100%"
                    v-model="addForm.roleId "
                    placeholder="请选择用户角色"
                  >
                    <el-option
                      :label="item.roleName"
                      :value="item.roleId"
                      v-for="item in roleList"
                    ></el-option>
                  </el-select>
                  <el-select
                    v-else
                    style="width: 100%"
                    class="form-item"
                    v-model="addForm.roleId "
                    :placeholder="addForm.department"
                  >
                    <el-option
                      :label="item.roleName"
                      :value="item.roleId"
                      v-for="item in roleList"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="form-item"
                  label="所属部门"
                  prop="deptId"
                  :label-width="formLabelWidth"
                >
                  <my-tree ref="myTree" style="width: 100%" :options="treeArr" @getValue="getSelectedValue"></my-tree>
                </el-form-item>
                <el-form-item
                  class="form-item"
                  label="用户性别"
                  :label-width="formLabelWidth"
                  prop="sex"
                >
                  <el-select v-model="addForm.sex" placeholder="请选择用户性别" style="width: 100%">
                    <el-option
                      :label="item.label"
                      :value="item.value"
                      v-for="item in sexList"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="form-item"
                  label="账号"
                  type="email"
                  placeholder="请输入内容"
                  :label-width="formLabelWidth"
                  prop="username"
                >
                  <el-input v-model="addForm.username" autocomplete="off">
                  </el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-radio-group v-model="addForm.status">
                    <el-radio :label="0">启用</el-radio>
                    <el-radio :label="1">停用</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item
                  class="form-item"
                  label="手机号"
                  prop="phone"
                  :label-width="formLabelWidth"
                >
                  <el-input placeholder="请输入内容" v-model="addForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                  v-if="title !== '修改'"
                  class="form-item"
                  label="密码"
                  :label-width="formLabelWidth"
                  prop="password"
                >
                  <el-input
                    placeholder="请输入内容"
                    v-model="addForm.password"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  class="form-item"
                  label="邮箱"
                  :label-width="formLabelWidth"
                  prop="email"
                >
                  <el-input
                    placeholder="请输入内容"
                    type="email"
                    v-model="addForm.email"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取 消</el-button>
                <el-button type="primary" @click="addForms('addForm')"
                >确 定
                </el-button
                >
              </div>
            </el-dialog>
          </div>
        </div>
      </el-row>
    </div>
    <my-footer v-on:next="next" @prev="prev" :form="form" @change="change" @pageCheng="pageCheng"></my-footer>

  </div>


</template>

<script>
import eTree from "@/components/eTree";
import {
  addUser,
  getUserAll,
  getOrganizeList, deleteUser, upDataUser, getRoleList, upDataPassword
} from "@/newwork/system-colltroner";
import { fn } from "@/uti";
import myEmpty from "@/newwork/myEmpty";
import { isValidPhone } from "@/util/validate";
import myTree from "@/components/myTree";
import myFooter from "@/components/myFooter";
import myElHeader from "@/components/myElHeader";

export default {
  name: "serve-manage",
  components: {
    eTree,
    myEmpty,
    myTree,
    myFooter,
    myElHeader
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!isValidPhone(value)) {
        callback(new Error("手机号格式输入有误,请确认"));
      } else {
        callback();
      }
    };

    return {
      form: {
        nickName: "",
        phone: "",
        status: "",
        pageNum: 1,
        pageSize: 10
      },
      addForm: {
        deptId: "",//部门
        email: "", //email
        nickName: "",//昵称
        password: "",//密码
        phone: "", //手机
        roleId: "", // '角色id'
        sex: "",  //男 / 女
        status: 0,//状态
        pageSize: 10,
        pageNum: 1,
        username: "" //账号
      },
      row: {},
      type: "",
      title: "新增",
      deptIdList: [],
      isShow: false,
      resultList: [],
      departmentList: [],
      deptId: "",
      formLabelWidth: "120px",
      roleList: [],
      timer: {},
      treeArr: [],
      sexList: [
        { label: "男", value: 0 },
        { label: "女", value: 1 }
      ],
      rules: {
        nickName: [
          { required: true, message: "此项为必填项，请确认", trigger: "blur" }
        ],
        roleId: [
          { required: true, message: "此项为必填项，请确认", trigger: "blur" }
        ],
        email: [
          { required: false, message: "此项为必填项，请确认", trigger: "blur" }
          // {validator: validateEmail, message: '邮箱格式输入有误,请确认', trigger: 'change'}
        ],
        deptId: [
          { required: true, message: "此项为必填项，请确认", trigger: "blur" }
        ],
        username: [
          { required: true, message: "此项为必填项，请确认", trigger: "blur" }
        ],
        password: [
          { required: true, message: "此项为必填项，请确认", trigger: "blur" }
        ],

        phone: [
          { required: true, message: "此项为必填项，请确认", trigger: "blur" }
          // {validator: validatePhone, message: '手机号格式输入有误,请确认', trigger: 'change'}
        ],
        status: [
          { required: false, message: "此项为必填项，请确认", trigger: "blur" }
        ],
        sex: [
          { required: false, message: "此项为必填项，请确认", trigger: "blur" }
        ]
      },
      form_rules: {
        nickName: [
          { required: false, message: "此项为必填项，请确认", trigger: "blur" }
        ],
        phone: [
          { required: false, message: "此项为必填项，请确认", trigger: "blur" },
          { validator: validatePhone, message: "手机号格式输入有误,请确认", trigger: "blur" }
        ],
        status: [
          { required: false, message: "此项为必填项，请确认", trigger: "blur" }
        ]
      }

    };
  },

  methods: {
    getSelectedValue(value) {
      this.addForm.deptId = value.deptId;
    },
    onSubmit() {
      this.getUserAll(this.form);
    },
    treeClick(a) {
      this.form = this.$options.data().form;
      console.log(a);
      console.log(a);
      a.deptId === "1" ? this.form.deptId = "" : this.form.deptId = a.deptId;
      console.log(this.form);
      this.getUserAll(this.form);
    },
    next() {
      this.form.pageNum++;
      console.log(this.form);
      this.getUserAll(this.form);
    },
    prev() {
      this.form.pageNum--;
      this.getUserAll(this.form);
    },
    change(e) {
      console.log(e);
      this.form.pageNum = e;
      this.getUserAll(this.form);
    },
    reset(row) {
      const data = {};
      data.password = "123456";
      data.userId = row.userId;
      upDataPassword(data).then(res => {
        if (res.data.code === 200) {
          this.$message.success("提交完成");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    addForms() {
      //点击确定之后 遍历数据 确保必填项不为空
      this.$refs.addForm.validate((valid) => {
        if (valid && this.addForm.deptId.length !== 0) {
          if (this.title === "新增") {
            addUser(this.addForm).then(res => {
              if (res.data.code === 200) {
                this.getUserAll(this.$store.state.formPage);
                this.$message.success("提交完成");
              } else {
                this.$message.error(res.data.msg);
              }
            }).catch(e => {
              this.$message.error(e);
            });
            this.isShow = false;
          } else {
            upDataUser(this.addForm).then(res => {
              if (res.data.code === 200) {
                this.getUserAll(this.$store.state.formPage);
                this.$message.success("提交完成");
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetPad(row) {
      const data = {};
      data.userId = row.userId;
      console.log(row);
      data.password = "123456";
      upDataPassword(data).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success("提交完成");
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => this.$message.error(e));
    },
    pageCheng(data){
      this.form.pageSize = data
      this.getUserAll(this.form)
    },
    onClear() {
      this.form.deptId = "";
      this.resetForm();
      this.getUserAll(this.form);
    },

    show(row, title) {
      getOrganizeList(this.form).then(res => {
        this.deptIdList = res.data.data;
      }).catch(e => {
        this.$message.error(e);
      });
      getRoleList().then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.roleList = res.data.data.records;
        }
      });
      this.title = title;
      if (this.title === "新增") {
        this.isShow = true;
        this.addForm = this.$options.data().addForm;
        this.$refs.addForm.clearValidate();
        this.$nextTick(() => {
          this.$refs.myTree.valueName = this.addForm.deptId;
        });
      } else if (title === "修改") {
        this.addForm = row;
        this.isShow = true;
        this.$nextTick(() => {
          this.$refs.myTree.valueName = this.addForm.sysDept.deptName;
        });
      } else if (title === "删除") {
        deleteUser(row.userId).then(res => {
          if (res.data.code === 200) {
            this.$message.success("删除完成!");
            this.getUserAll(this.$store.state.formPage);
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(e => {
          this.$message.error(e);
        });
      }
    },
    resetForm(form) {
      if (form === "form") {
        this.form = this.$options.data().form;
        this.form.deptId = "";
      } else {
        this.$refs.addForm.resetFields();
      }
      this.getUserAll(this.form);
    },

    rowClick(row) {
      this.row = row;
    },
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    getUserAll(formPage) {
      getUserAll(formPage).then(res => {
        this.$bus.$emit("total", res.data.data.total);
        this.resultList = res.data.data.records;
      });
    }
  },
  created() {
    this.getUserAll(this.form);
    getOrganizeList().then(res => {
      this.treeArr = fn(res.data.data);
    });
  },
  computed: {
    getterDeptIdList() {
      return fn(this.deptIdList);
    },
    defaultProps() {
      return {
        children: "children",
        label: "deptName",
        value: "deptId",
        expandTrigger: "hover"
      };
    }
  },


  watch: {
    timer(val) {
      this.addForm.createTime = val[0];
      this.addForm.endTime = val[1];
    },
    isShow(val, newVal) {
      if (!val) {
        this.addForm = this.$options.data().addForm;
      }
    }
  }
};
</script>

<style scoped>
#my-manage {
  display: flex;
  height: calc(100vh - 160px);
  justify-content: space-between;
  flex-direction: column;
}

.main {
  overflow: hidden;
  display: flex;
}

.container-l {
  width: 200px;
  flex-shrink: 0;
}

.container-r {
  width: calc(100vw - 200px - 90px - 200px);
}

.container-form {
  display: flex;
  height: 40px;
  justify-content: space-between;
}

#form {
  display: flex;
  flex-wrap: wrap;
}

.link-item {
  margin-right: 20px;
  cursor: pointer;
}

.form-item {
  width: 48%;
}

.err {
  color: red;
}

</style>
