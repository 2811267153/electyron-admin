<template>
  <!--  用户管理-->
  <div id="my-manage">
    <div class="container-l">
      <e-tree />
    </div>
    <div id="container-main">
      <div class="container-nav">
        <div class="container-form">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="用户名称">
              <el-input v-model="form.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.number" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="用户状态">
              <el-select v-model="form.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-select v-model="form.createTime" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <el-select v-model="form.createTime" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button @click="onClear">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button  type="primary" @click="show">新增</el-button>
        </div>

        <el-table
          :row-class-name="tableRowClassName"
          @row-click="rowClick"
          ref="multipleTable"
          :data="resultList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="序号" width="120">
            <template scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="account" label="账号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="number" label="手机号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="department"
            label="所属部门"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="starts" label="状态" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="starts" label="操作" show-overflow-tooltip>
            <template class="link">
              <a @click="operate('info')" class="link-item">修改</a>
              <a @click="operate('err')" class="link-item err">删除</a>
              <a @click="operate('warning')" class="link-item warning"
                >重置密码</a
              >
            </template>
          </el-table-column>
        </el-table>

        <!--
              新增悬浮窗
          -->
        <el-dialog
          :title="type !== '' ? '修改' : '新增'"
          :visible.sync="isShow"
          width="40%"
        >
          <el-form ref="addForm" :model="addForm" id="form" :rules="rules">
            <el-form-item
              class="form-item"
              label="用户名称"
              :label-width="formLabelWidth"
              prop="nickName"
            >
              <el-input v-model="addForm.nickName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              class="form-item"
              label="用户角色"
              :label-width="formLabelWidth"
              prop="roleId"
            >
              <el-select
                class="form-item"
                v-model="addForm.roleId"
                placeholder="请选择用户角色"
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in roleList"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              class="form-item"
              label="所属部门"
              :label-width="formLabelWidth"
              prop="deptId"
            >
              <el-cascader
                  v-model="addForm.deptId"
                  :options="deptIdList"
                  :props="{ expandTrigger: 'hover' }"></el-cascader>
            </el-form-item>
            <el-form-item
              class="form-item"
              label="用户性别"
              :label-width="formLabelWidth"
            >
              <el-select v-model="addForm.sex" placeholder="请选择用户性别">
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
              :label-width="formLabelWidth"
              prop="username"
            >
              <el-input v-model="addForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              class="form-item"
              label="密码"
              :label-width="formLabelWidth"
              prop="password"
            >
              <el-input
                v-model="addForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              class="form-item"
              label="手机号"
              :label-width="formLabelWidth"
            >
              <el-input v-model="addForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              class="form-item"
              label="邮箱"
              :label-width="formLabelWidth"
            >
              <el-input
                type="email"
                v-model="addForm.email"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShow = false">取 消</el-button>
            <el-button
              v-if="type"
              type="primary"
              @click="upDataAddForms('addForm')"
              >确 定</el-button
            >
            <el-button v-else type="primary" @click="addForms('addForm')"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import eTree from '@/components/eTree'
import {addUser} from "@/newwork/system-colltroner";
export default {
  name: 'serve-manage',
  components: {
    eTree
  },
  data() {
    return {
      form: {},
      addForm: {
        avatar: '', //头像
        deptId: '',//部门
        email: '', //email
        nickName: '',//昵称
        password: '',//密码
        phone: '', //手机
        roleId: '', // '角色id'
        sex: '',  //男 / 女
        status: '' ,//状态
        username: '', //账号
        // name: '',
        // role: '',
        // department: '',
        // account: '',
        // number: '',
      },
      row: {},
      type: '',
      deptIdList: [
        {
          value: '湖北省',
          label: '湖北省',
          children: [{
            value: '武汉市',
            label: '武汉市',
            children: [{
              value: '洪山区',
              label: '洪山区',
              children: [{
                value: '阳关1路',
                label: '阳关1路'
              }, {
                value: '阳关2路',
                label: '阳关2路'
              }
              ]
            }, {
              value: '蔡甸区',
              label: '蔡甸区',
              children: [{
                value: '阳关1路',
                label: '阳关1路'
              }, {
                value: '阳关2路',
                label: '阳关2路'
              }
              ]
            }, {
              value: '黄陂区',
              label: '黄陂区',
              children: [{
                value: '阳关1路',
                label: '阳关1路'
              }, {
                value: '阳关2路',
                label: '阳关2路'
              }
              ]
            }, {
              value: '江夏区',
              label: '江夏区',
              children: [{
                value: '阳关1路',
                label: '阳关1路'
              }, {
                value: '阳关2路',
                label: '阳关2路'
              }
              ]
            }]
          }, {
            value: '随州市',
            label: '随州市',
            children: [{
              value: '江夏区',
              label: '江夏区'
            }, {
              value: '黄陂区',
              label: '黄陂区'
            }
            ]
          },
            {
            value: '十堰市',
            label: '十堰市',
            children: [{
              value: '蔡甸区',
              label: '蔡甸区'
            }, {
              value: '张湾区',
              label: '张湾区'
            },{
              value: '郧阳区',
              label: '郧阳区'
            }
            ]
          },
            {
            value: '孝感市',
            label: '孝感市',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }
            ]
          },
            {
            value: '荆门市',
            label: '荆门市',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }
            ]
          }]
        }
      ],
      isShow: false,
      resultList: [],
      formLabelWidth: '120px',
      roleList: [
        { label: '系统管理员', value: '系统管理员' },
        { label: '审核员', value: '审核员' },
        { label: '录入员', value: '录入员' }
      ],
      sexList: [
        { label: '男', value: '男' },
        { label: '女', value: '女' }
      ],
      rules: {
        nickName: [
          { required: true, message: '此项为必填项，请确认', trigger: 'change' }
        ],
        roleId: [
          { required: true, message: '此项为必填项，请确认', trigger: 'change' }
        ],
        deptId: [
          { required: true, message: '此项为必填项，请确认', trigger: 'change' }
        ],
        username: [
          { required: true, message: '此项为必填项，请确认', trigger: 'change' }
        ],
        password: [
          { required: true, message: '此项为必填项，请确认', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {},
    defaultProps(){
      label
    },
    addForms(addForm) {
      //点击确定之后 遍历数据 确保必填项不为空
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          this.resultList.push(this.addForm)
          addUser(this.addForm).then(res => {
            console.log(res)
          }).catch(e => {
            this.$message.error(e)
          })
          this.isShow = false
          this.$message({
            message: '提交完成',
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    upDataAddForms(a, b) {
      console.log(a, b)
    },
    onClear() {
      this.form = {}
    },
    show() {
      this.isShow = true
    },
    operate(type) {
      //根据传过来的参数 确定需要渲染的数据类型是什么
      if (type === 'info') {
        this.isShow = true

        this.type = 'info'
      } else if (type === 'err') {
        this.warnings = true
        this.type = 'err'
      } else {
        this.warnings = true
        this.type = 'warning'
      }
    },
    rowClick(row, a) {
      this.row = row
      const index = row.index
      console.log(index)
    },
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex
    }
  },
  created() {
    this.resultList = JSON.parse(window.localStorage.getItem('myManageList')) || []
  },
  watch: {
    isShow(val) {
      // val == false || this.type = ''
      if (val === false) {
        this.type = ''
      } else {
        this.addForm = this.row
      }
    }
  }
}
</script>

<style scoped>
#my-manage {
  display: flex;
}
.container-l {
  width: 300px;
}
.container-form{
  display: flex;
  height: 40px;
  justify-content: space-between;
}
#container-main {
  padding-left: 30px;
  flex: 1;
}
#form {
  display: flex;
  flex-wrap: wrap;
}
#form > .form-item {
  width: 48%;
}
.link-item {
  margin: 0 10px;
  cursor: pointer;
}
.err {
  color: red;
}
.warning {
  color: gold;
}
</style>
