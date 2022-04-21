<template>
  <div id="networkManagement">
    <div class="container">
      <p>网关管理</p>
    </div>
    <div class="nav-form">
      <el-form :inline="true" :model="from" class="demo-form-inline">
        <el-form-item label="网管名称">
          <el-input v-model="from.user" placeholder="审网管名称批人"></el-input>
        </el-form-item>
        <el-form-item label="物理地址">
          <el-input v-model="from.address" placeholder="物理地址"></el-input>
        </el-form-item>
        <el-form-item label="协议类型">
          <el-select v-model="from.protocol" placeholder="协议类型">
            <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in protocolType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="中继类型">
          <el-select v-model="from.relay" placeholder="中继类型">
            <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in relayType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="录音支持">
          <el-select v-model="from.recording">
            <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in recording"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网管状态">
          <el-select v-model="from.networkStat">
            <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in networkStat"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!--          <el-button type="primary" @click="onSubmit">查询</el-button>-->
          <!--          <el-button @click="onSubmit">重置</el-button>-->
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="showAddForm(null, '添加网管')"
      >添加网管
      </el-button
      >
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addFrom" ref="formName" :rules="rules">
        <div class="width">
          <el-form-item
              label="网管名称"
              :label-width="formLabelWidth"
              prop="gatewayName"
          >
            <el-input v-model="addFrom.gatewayName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="accountUser" label="计费账号" :label-width="formLabelWidth">
            <el-input v-model="addFrom.accountUser"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
              label="域地址"
              :label-width="formLabelWidth"
              prop="realm"
          >
            <el-input
                v-model="addFrom.realm"
                autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
              label="代理地址"
              :label-width="formLabelWidth"
              prop="proxyIp"
          >
            <el-input
                v-model="addFrom.proxyIp"
                autocomplete="off"
            ></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
              label="支持编码"
              :label-width="formLabelWidth"
              prop="codecs"
          >
            <el-input
                v-model="addFrom.codecs"
                autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
              label="dtmfMode"
              :label-width="formLabelWidth"
              prop="dtmfMode"
          >
            <el-input
                v-model="addFrom.dtmfMode"
                autocomplete="off"
            ></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
              label="超时时长"
              :label-width="formLabelWidth"
              prop="expires"
          >
            <el-input
                v-model="addFrom.expires"
                autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
              label="中继IP"
              :label-width="formLabelWidth"
              prop="gatewayIp"
          >
            <el-input
                v-model="addFrom.gatewayIp"
                autocomplete="off"
            ></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
              label="中继端口"
              :label-width="formLabelWidth"
              prop="gatewayPort"
          >
            <el-input
                v-model="addFrom.gatewayPort"
                autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
              label="profileId"
              :label-width="formLabelWidth"
              prop="profileId"
          >
            <el-input
                v-model="addFrom.profileId"
                autocomplete="off"
            ></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
              label="中继类型"
              :label-width="formLabelWidth"
              prop="gatewayType"
          >
            <el-select v-model="addFrom.gatewayType" placeholder="中继类型">
              <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in relayType"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
              label="最大并发数"
              :label-width="formLabelWidth"
              prop="maxCall"
          >
            <el-input v-model="addFrom.maxCall"/>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
              label="注册用户"
              :label-width="formLabelWidth"
              prop="username"
          >
            <el-input v-model="addFrom.username"/>
          </el-form-item>
          <el-form-item
              label="密码"
              :label-width="formLabelWidth"
              prop="password"
          >
            <el-input v-model="addFrom.password"/>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
              label="是否注册"
              :label-width="formLabelWidth"
              prop="register"
          >
            <el-radio-group v-model="addFrom.register">
              <el-radio :label="0">不注册</el-radio>
              <el-radio :label="1">注册</el-radio>
            </el-radio-group>
          </el-form-item>

        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addFrom')"
        >确 定
        </el-button
        >
      </div>
    </el-dialog>

    <el-table :data="list" style="width: 100%" border>
      <el-table-column align="center" prop="date" label="序号" width="50px">
        <template scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" prop="gatewayName" label="网管名称"></el-table-column>
      <el-table-column align="center" prop="accountUser" label="计费账号"></el-table-column>
      <el-table-column align="center" prop="realm" label="域地址"></el-table-column>
      <el-table-column align="center" prop="proxyIp" label="代理地址"></el-table-column>
      <el-table-column align="center" prop="codecs" label="支持编码"></el-table-column>
      <el-table-column align="center" prop="dtmfMode" label="dtmfMode"></el-table-column>
      <el-table-column align="center" prop="expires" label="超时时长"></el-table-column>
      <el-table-column align="center" prop="gatewayIp" label="中继IP"></el-table-column>
      <el-table-column align="center" prop="gatewayPort" label="中继端口"></el-table-column>
      <el-table-column align="center" prop="profileId" label="profileId"></el-table-column>
      <el-table-column align="center" prop="gatewayType" label="中继类型">
        <template scope="scope">
          <a v-if="scope.row.gatewayType === 0">入中继</a>
          <a v-else-if="scope.row.gatewayType === 1">出中继</a>
          <a v-else-if="scope.row.gatewayType === 2">双向中继</a>
          <a v-else>未知</a>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="maxCall" label="最大并发数"></el-table-column>
      <el-table-column align="center" prop="username" label="注册用户"></el-table-column>
      <el-table-column align="register" prop="username" label="是否注册">
        <template scope="scope">
          <div v-if="scope.row.register === 1"> 注册</div>
          <div v-else> 不注册</div>
        </template>
      </el-table-column>
      <el-table-column prop="recording" label="操作">
        <template scope="scope">
          <div class="operate">
            <el-link
                class="a-link"
                @click="showAddForm(scope.row, '编辑')"
                type="info"
            >编辑
            </el-link
            >
            <el-link class="a-link" @click="removeIt(scope.row)" type="info"
            >删除
            </el-link
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {deletePbx, getPbxAdd, getPbxAll, upDatePbx} from "@/newwork/ground-colltroner";

export default {
  name: 'networkManagement',
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      title: '添加网管',
      from: {
        user: '',
        address: '',
        protocol: '',
        relay: '',
        recording: '',
        networkStat: '',
        pageNum: 1,
        pageSize: 10,
      },
      list: [],
      addFrom: {
        accountUser: '', //计费账号
        codecs: '', //支持编码
        dtmfMode: '', //dtmfMode
        expires: '', //超时时长
        gatewayIp: '', //中继IP
        gatewayName: '', //网管名称
        gatewayPort: '', //中继端口
        gatewayType: '', //中继类型
        maxCall: '', //最大呼叫线数
        password: '', //密码
        profileId: '', //profileId
        proxyIp: '', //代理IP
        realm: '', //域地址
        register: 1, //是否注册 0不注册/ 1 注册
        username: '', //注册用户名


      },

      protocolType: [
        {label: 'SIP', value: 'SIP'},
        {label: 'H.323', value: 'H.323'}
      ],
      relayType: [
        {label: '入中继', value: '0'},
        {label: '出中继', value: '1'},
        {label: '双向中继', value: '2'}
      ],
      networkStat: [
        {label: '开启', value: '开启'},
        {label: '关闭', value: '关闭'}
      ],
      recording: [
        {label: '开启', value: '开启'},
        {label: '关闭', value: '关闭'}
      ],
      rules: {
        accountUser: [{required: true, message: '该选项为必填项， 请确认', trigger: 'blur'}],
        codecs: [
          {required: true, message: '该选项为必填项， 请确认', trigger: 'blur'}
        ],
        dtmfMode: [
          {required: true, message: '该选项为必填项， 请确认', trigger: 'blur'}
        ],
        expires: [{required: true, message: '该选项为必填项， 请确认', trigger: 'blur'}],
        gatewayIp: [
          {required: true, message: '该选项为必填项， 请确认', trigger: 'blur'}
        ],
        gatewayName: [
          {required: true, message: '该选项为必填项， 请确认', trigger: 'blur'}
        ],
        gatewayPort: [{required: true, message: '该选项为必填项， 请确认', trigger: 'blur'}],
        gatewayType: [
          {required: true, message: '该选项为必填项， 请确认', trigger: 'blur'}
        ],
        maxCall: [{required: false, message: '该选项为必填项， 请确认', trigger: 'blur'}],
        password: [
          {required: true, message: '该选项为必填项， 请确认', trigger: 'blur'}
        ],
        profileId: [
          {required: true, message: '该选项为必填项， 请确认', trigger: 'blur'}
        ],
        proxyIp: [{required: true, message: '该选项为必填项， 请确认', trigger: 'blur'}],
        realm: [{required: true, message: '该选项为必填项， 请确认', trigger: 'blur'}],
        register: [{required: true, message: '该选项为必填项， 请确认', trigger: 'blur'}],
        username: [{required: true, message: '该选项为必填项， 请确认', trigger: 'blur'}],
      }
    }
  },
  methods: {
    getPbxAll(form) {
      getPbxAll(form).then(res => {
        this.list = res.data.data.records
      }).catch(e => {
        this.$message.error(e)
      })
    },
    submitForm() {
      this.$refs['formName'].validate((valid) => {
        if (valid) {
          if (this.title === '添加网管') {
            getPbxAdd(this.addFrom).then(res => {
              console.log(res)
              if (res.data.code === 200) {
                this.$message.success('添加完成')
                this.getPbxAll(this.from)
                this.dialogFormVisible = false
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            console.log(this.addFrom)
            upDatePbx(this.addFrom).then(res => {
              if (res.data.code === 200) {
                this.$message.success('添加完成')
                this.getPbxAll(this.from)
                this.dialogFormVisible = false
              } else {
                this.$message.error(res.data.msg)
              }
            })
          }
          // this.resetForm('formName')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs['formName'].resetFields();
    },
    showAddForm(row, title) {
      this.dialogFormVisible = true
      this.title = title
      if (title === '编辑') {
        this.addFrom = row
      } else if (title === '查看') {
        this.addForm = row
        this.isReadOnly = true
      } else {
        // this.resetForm("formName")
      }
    },
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex
    },

    removeIt(row) {
      console.log(row)
      deletePbx(row.id).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message.success('删除完成')
          this.getPbxAll(this.form)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(e => {
        this.$message.error(e)
      })
    },
  },
  created() {
    this.getPbxAll(this.form)
  },
  watch: {
    dialogFormVisible(val) {
      if (val === false) {
        console.log('--------')
        this.resetForm()
      }
    }
  }

}
</script>

<style scoped>
.container {
  border: 1px solid #ccc;
  margin: 0 20px;
}

.container p {
  background-color: #f2f2f2;
  padding: 10px 15px;
}

.nav-form {
  margin: 15px;
  height: 40px;
  display: flex;
  justify-content: space-between;
}

#networkManagement .width {
  display: flex;
  width: 60%;
  justify-content: space-between;
}

.width > * {
  flex: 1;
}
</style>
