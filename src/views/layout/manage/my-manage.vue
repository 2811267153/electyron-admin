<template>
  <!--  用户管理-->
  <div id="my-manage">
    <div class="container-l">
      <e-tree @treeClick="treeClick" :data="treeArr"/>
    </div>
    <div id="container-main">
      <div class="container-nav">
        <div class="container-form">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="用户名称">
              <el-input v-model="form.nickName" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.phone" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="用户状态">
              <el-select v-model="form.status" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                  v-model="timer"
                  type="daterange"
                  format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button @click="onClear">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="show(null, '新增')">新增</el-button>
        </div>

        <el-table
            :row-class-name="tableRowClassName"
            @row-click="rowClick"
            ref="multipleTable"
            :data="resultList"
            tooltip-effect="dark"
            style="width: 100%"
            v-if="resultList.length !== 0"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" width="120">
            <template scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="nickName" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="email" label="email" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" show-overflow-tooltip>
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
            <template scope="scope">
              <p>
                <el-tag v-if="scope.row.status === 0" type="success">启用</el-tag>
                <el-tag v-else type="error">停用</el-tag>
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="starts" label="操作" show-overflow-tooltip>
            <template scope="scope" class="link">
              <a @click="show(scope.row, '修改')" class="link-item">修改</a>
              <a @click="show(scope.row, '删除')"  class="link-item err">删除</a>
            </template>
          </el-table-column>
        </el-table>

        <!--
              新增悬浮窗
          -->
        <el-dialog
            :title="title"
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
                  v-model="deptId"
                  :options="getterDeptIdList"
                  :props="defaultProps"></el-cascader>
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
                type="email"
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
              <el-input v-model="addForm.phone" autocomplete="off"></el-input>
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
            >确 定
            </el-button
            >
            <el-button v-else type="primary" @click="addForms('addForm')"
            >确 定
            </el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import eTree from '@/components/eTree'
import {
  addUser,
  deleteRoleList,
  getUserAll,
  getOrganizeList,
  upDataRoleList,
  getOrganizeId, deleteUser
} from "@/newwork/system-colltroner";
import {fn} from "@/uti";

export default {
  name: 'serve-manage',
  components: {
    eTree
  },
  data() {
    return {
      form: {
        pageSize: 10,
        pageNum: 1
      },
      addForm: {
        deptId: '',//部门
        email: '', //email
        nickName: '',//昵称
        password: '',//密码
        phone: '', //手机
        roleId: 3, // '角色id'
        sex: 0,  //男 / 女
        status: 0,//状态
        pageSize: 10,
        pageNum: 1,
        username: '', //账号
      },
      row: {},
      type: '',
      title: '新增',
      deptIdList: [],
      isShow: false,
      resultList: [],
      departmentList: [],
      deptId: '',
      formLabelWidth: '120px',
      roleList: [
        {label: '系统管理员', value: 0},
        {label: '审核员', value: 1},
        {label: '录入员', value: 2}
      ],
      timer: {},
      treeArr: [],
      sexList: [
        {label: '男', value: 0},
        {label: '女', value: 1}
      ],
      rules: {
        nickName: [
          {required: true, message: '此项为必填项，请确认', trigger: 'change'}
        ],
        roleId: [
          {required: true, message: '此项为必填项，请确认', trigger: 'change'}
        ],
        deptId: [
          {required: true, message: '此项为必填项，请确认', trigger: 'change'}
        ],
        username: [
          {required: true, message: '此项为必填项，请确认', trigger: 'change'}
        ],
        password: [
          {required: true, message: '此项为必填项，请确认', trigger: 'change'}
        ],
        phone: [
          {required: true, message: '此项为必填项，请确认', trigger: 'change'}
        ]
      },
    }
  },

  methods: {
    onSubmit() {
    },
    treeClick(a){
      this.form.deptIds = a.deptId
      this.getUserAll(this.form)
    },
    addForms(addForm) {
      //点击确定之后 遍历数据 确保必填项不为空
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          if (this.title === '新增') {
            addUser(this.addForm).then(res => {
              if (res.data.code === 200) {
                this.getUserAll(this.form)
                this.$message.success('提交完成')
              } else {
                this.$message.error(res.data.msg)
              }
            }).catch(e => {
              this.$message.error(e)
            })
            this.isShow = false
            this.$message({
              message: '提交完成',
              type: 'success'
            })
          } else {
            upDataRoleList(this.addForm).then(res => {
              if (res.data.code === 200) {
                this.getUserAll(this.form)
                this.$message.success('提交完成')
              } else {
                this.$message.error('提交失败，请重试')
              }
            })
          }
        } else{
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
    show(row, title) {
      if(title === '新增'){
        this.title = title
        this.isShow = true
        getOrganizeList(this.form).then(res => {
          this.deptIdList = res.data.data
        }).catch(e => {
          this.$message.error(e)
        })
        this.addForm = {
          status: 0
        }
      }
      if(title === '修改'){
      this.title = title
        this.addForm = row
        this.isShow = true
      }else if(title === '删除'){
        deleteUser(row.userId).then(res => {
          console.log(row.userId)
          if(res.data.code === 200){
            this.$message.success('删除完成!')
            this.getUserAll(this.form)
          }else {
            this.$message.error(res.data.msg)
          }
        }).catch(e => {
          this.$message.error(e)
        })
      }
    },

    rowClick(row) {
      this.row = row
      const index = row.index
    },
    tableRowClassName({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex
    },
    getUserAll() {
      getUserAll().then(res => {
        this.resultList = res.data.data.records
        const total = res.data.data.total
        this.$store.dispatch('total', total)
        //更具用户id获取他在 公司的职位
        this.resultList.forEach((item, i) => {
          if(item.hasOwnProperty('deptId')){
            getOrganizeId(item.deptId).then(res => this.$set( this.resultList[i], 'department', res.data.data.deptName))
          }
        })
      }).catch(e =>  this.$message.error(e))
    }
  },
  created() {
    this.getUserAll(this.form)
    getOrganizeList().then(res =>  this.treeArr = fn(res.data.data))
  },
  computed: {
    getterDeptIdList() {
      return fn(this.deptIdList)
    },

    defaultProps() {
      return {
        children: 'children',
        label: 'deptName',
        value: 'deptId',
        expandTrigger: 'hover'
      }
    },
  },


  watch: {
    deptId(val) {
      this.addForm.deptId = this.deptId[this.deptId.length - 1]
    },
    timer(val){
      console.log(val)
      this.addForm.createTime = val[0]
      this.addForm.endTime = val[1]
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

.container-form {
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
