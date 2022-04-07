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
          <el-select v-model="from.recording" placeholder="活动区域">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item in recording"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网管状态">
          <el-select v-model="from.networkStat" placeholder="活动区域">
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
        >添加网管</el-button
      >
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addFrom" ref="formName" :rules="rules">
        <div class="width">
          <el-form-item
            label="网管名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="addFrom.name" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
            label="域地址"
            :label-width="formLabelWidth"
            prop="hostAddress"
          >
            <el-input
              v-model="addFrom.hostAddress"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="代理地址"
            :label-width="formLabelWidth"
            prop="proxyAddress"
          >
            <el-input
              v-model="addFrom.proxyAddress"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
            label="协议类型"
            :label-width="formLabelWidth"
            prop="protocol"
          >
            <el-select v-model="addFrom.protocol" placeholder="协议类型">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in protocolType"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="中继类型"
            :label-width="formLabelWidth"
            prop="relay"
          >
            <el-select v-model="addFrom.relay" placeholder="中继类型">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in relayType"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
            label="替换后号码"
            :label-width="formLabelWidth"
            prop="behindNum"
          >
            <el-input v-model="addFrom.behindNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="最大并发数"
            :label-width="formLabelWidth"
            prop="maxComplicating"
          >
            <el-input v-model="addFrom.maxComplicating" />
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="转发媒体" :label-width="formLabelWidth">
            <el-radio-group v-model="addFrom.mediaForwarding">
              <el-radio :label="3">转发</el-radio>
              <el-radio :label="6">不转发</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="支持录音" :label-width="formLabelWidth">
            <el-radio-group v-model="addFrom.recording">
              <el-radio :label="3">支持</el-radio>
              <el-radio :label="6">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
            label="失效时间"
            :label-width="formLabelWidth"
            prop="failureTime"
          >
            <el-input v-model="addFrom.failureTime" />
          </el-form-item>

          <el-form-item
            label="重连时间"
            :label-width="formLabelWidth"
            prop="reconnection"
          >
            <el-input v-model="addFrom.reconnection" />
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-radio-group v-model="addFrom.type">
              <el-radio :label="3">需要注册</el-radio>
              <el-radio :label="6">不需要注册</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="状态"
            :label-width="formLabelWidth"
            prop="status"
          >
            <el-radio-group v-model="addFrom.status">
              <el-radio :label="3">启用</el-radio>
              <el-radio :label="6">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
            label="用户名"
            :label-width="formLabelWidth"
            prop="userName"
          >
            <el-input v-model="addFrom.userName" />
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="passwords"
          >
            <el-input v-model="addFrom.passwords" />
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
            label="备注"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-input v-model="addFrom.remark" />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addFrom')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="date" label="序号" width="180">
        <template scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="name" label="网管名称"> </el-table-column>
      <el-table-column prop="hostAddress" label="域地址"> </el-table-column>
      <el-table-column prop="proxyAddress" label="代理地址"> </el-table-column>
      <el-table-column prop="protocol" label="协议类型"> </el-table-column>
      <el-table-column prop="relay" label="中继类型"> </el-table-column>
      <el-table-column prop="recording" label="是否支持录音">
        <template scope="scope">
          <a v-if="scope.row.recording === 3">启用</a>
          <a v-else>停用</a>
        </template>
      </el-table-column>
      <el-table-column prop="recording" label="状态">
        <template scope="scope">
          <a v-if="scope.row.status === 3"> 启用</a>
          <a v-else> 停用</a>
        </template>
      </el-table-column>
      <el-table-column prop="recording" label="操作">
        <template scope="scope">
          <div class="operate">
            <el-link
              class="a-link"
              @click="showAddForm(scope.row, '编辑')"
              type="info"
              >编辑</el-link
            >
            <el-link class="a-link" @click="removeIt(scope.row)" type="info"
              >删除</el-link
            >
            <el-link class="a-link" type="info">重新加载</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
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
        networkStat: ''
      },
      list: [],
      addFrom: {
        name: '', //网管名称
        hostAddress: '', //域地址
        proxyAddress: '', //代理地址
        protocol: '', //协议类型
        relay: '', //中继类型
        behindNum: '', //替换后号码
        maxComplicating: '', //最大并发
        mediaForwarding: 3, //媒体转发
        recording: 3, //是否支持录音
        failureTime: '', //失效时间
        reconnection: '', //重连时间
        type: 3,
        status: 3,
        userName: '', //用户名
        passwords: '', //密码
        remark: ''
      },

      protocolType: [
        { label: 'SIP', value: 'SIP' },
        { label: 'H.323', value: 'H.323' }
      ],
      relayType: [
        { label: '入中继', value: '入中继' },
        { label: '出中继', value: '出中继' },
        { label: '双向中继', value: '双向中继' }
      ],
      networkStat: [
        { label: '开启', value: '开启' },
        { label: '关闭', value: '关闭' }
      ],
      recording: [
        { label: '开启', value: '开启' },
        { label: '关闭', value: '关闭' }
      ],
      rules: {
        name: [{ required: true, message: '网管名称', trigger: 'blur' }],
        hostAddress: [
          { required: true, message: '请选择域地址', trigger: 'blur' }
        ],
        protocol: [
          { required: true, message: '请选择协议类型', trigger: 'blur' }
        ],
        relay: [{ required: true, message: '请选择中继类型', trigger: 'blur' }],
        behindNum: [
          { required: true, message: '请输入替换后号码', trigger: 'blur' }
        ],
        failureTime: [
          { required: true, message: '请输入失效时间', trigger: 'blur' }
        ],
        passwords: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        remark: [{ required: false, message: '请输入用户名', trigger: 'blur' }],
        reconnection: [
          { required: false, message: '请输入用户名', trigger: 'blur' }
        ],
        proxyAddress: [
          { required: false, message: '请输入用户名', trigger: 'blur' }
        ],
        status: [{ required: false, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['formName'].validate((valid) => {
        if (valid) {
          this.$message({
            message: '提交完成',
            type: 'success'
          })
          this.list.push(this.addFrom)
          window.localStorage.setItem('network', JSON.stringify(this.list))
          this.dialogFormVisible = false
          // this.resetForm('formName')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs['formName'].resetFields()
    },
    showAddForm(row, title) {
      this.dialogFormVisible = true
      this.title = title
      if (title === '编辑') {
        this.addFrom = row
        console.log(row)
      } else if (title === '查看') {
        this.addForm = row
        this.isReadOnly = true
      } else {
        // this.resetForm("formName")
      }
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
    },

    removeIt(row) {
      this.list.map((item, i) => {
        if (row === item) {
          this.list.splice(i, 1)
        }
      })
    }
  },
  created() {
    this.list = JSON.parse(window.localStorage.getItem('network')) || []
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
  justify-content: space-between;
}

.width > * {
  flex: 1;
}
</style>
