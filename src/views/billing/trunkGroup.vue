<template>
  <div id="trunk">
    <div class="container">
      <p>中继组</p>
    </div>
    <div class="nav-form">
      <el-form :inline="true" :model="from" class="demo-form-inline">
        <el-form-item label="中继名称">
          <el-input v-model="from.user" placeholder="审网管名称批人"></el-input>
        </el-form-item>
        <el-form-item label="策略类型">
          <el-select v-model="from.protocol" placeholder="协议类型">
            <el-option :label="item.label" :value="item.value" v-for="item in policyType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="重试策略">
          <el-select v-model="from.relay" placeholder="中继类型">
            <el-option :label="item.label" :value="item.value" v-for="item in retryStrategyType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!--          <el-button type="primary" @click="onSubmit">查询</el-button>-->
          <!--          <el-button @click="onSubmit">重置</el-button>-->
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="showAddForm(null, '添加中继组')">添加中继组</el-button>
    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addFrom" ref="formName" :rules="rules">
        <div class="width">
          <el-form-item label="活动名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addFrom.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item slot='from-item-r' label="中继超时（s）" :label-width="formLabelWidth" prop="overtimeTime">
            <el-input v-model="addFrom.overtimeTime" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="策略类型" :label-width="formLabelWidth" prop="policy">
            <el-select v-model="addFrom.policy" placeholder="请选择">
              <el-option
                  v-for="item in policyType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="重试策略" :label-width="formLabelWidth" prop="retryStrategy">
            <el-select v-model="addFrom.retryStrategy" placeholder="请选择">
              <el-option
                  v-for="item in retryStrategyType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-table
            :data="listTable"
            style="width: 100%">
          <el-table-column
              prop=""
              label="序号">
            <template scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
              prop="network"
              label="网关">
            <template scope="scope">
              <el-select v-model="scope.row.network" placeholder="请选择">
                <el-option
                    v-for="item in networkData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
              prop="workTime"
              width="500"
              label="工作时间">
            <template scope="scope">

              <div style="display: flex; justify-content: space-between">
                <el-time-select
                    placeholder="起始时间"
                    v-model="scope.row.startTime"
                    :picker-options="{
              start: '00:00',
              step: '08:00',
              end: '24:00'
            }">
                </el-time-select>
                <el-time-select
                    placeholder="结束时间"
                    v-model="scope.row.endTime"
                    :picker-options="{
              start: '00:00:00',
              step: '08:00:00',
              end: '24:00:00',
              minTime: scope.row.startTime
            }">
                </el-time-select>
              </div>
            </template>
          </el-table-column>

          <el-table-column
              prop="priority"
              label="优先级">
          </el-table-column>
        </el-table>
        <el-form-item style="margin: 10px 20px 0" label="备注"  :label-width="formLabelWidth">
          <el-input v-model="addFrom.remark" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('formName')">确 定</el-button>
      </div>

    </el-dialog>

    <el-table
        :data="list"
        style="width: 100%">
      <el-table-column
          prop="index"
          label="序号"
          width="50">
        <template scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="中继名称"
          width="100">
        <template scope="scope">
          {{scope.row[0].name}}
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="策略类型"
          width="100">
        <template scope="scope">
          {{scope.row[0].policy}}
        </template>
      </el-table-column>
      <el-table-column
          prop="retryStrategy"
          label="重试策略"
          width="100">
        <template scope="scope">
          {{scope.row[0].retryStrategy}}
        </template>
      </el-table-column>
      <el-table-column
          prop="retryStrategy"
          label="关联网关">
        <template scope="scope">
          <span style="margin:0 10px">{{scope.row[1].network}}: </span>
          <span style="margin:0 10px">{{scope.row[1].startTime}}</span>
          <span style="margin:0 10px">--</span>
          <span style="margin:0 10px">{{scope.row[1].endTime}}</span>

        </template>
      </el-table-column>
      <el-table-column
          prop="remark"
          label="操作">
        <template scope="scope">
          <el-link style="margin-right: 20px" @click="showAddForm(scope.row, '编辑')" type="info">编辑</el-link>
          <el-link style="margin-right: 20px" type="info">删除</el-link>
        </template>
      </el-table-column>
      <el-table-column
          prop="remark"
          label="备注">
        <template scope="scope">
          {{scope.row[0].remark || '暂无备注'}}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>

export default {
  name: "trunkGroup",
  data() {
    return {
      from: {},
      title: '添加中继组',
      dialogFormVisible: false,
      addFrom: {
        name: '', //中继名称
        policy: '',// 策略类型
        overtimeTime: '',//超时时间
        retryStrategy: '',//重试策略，
        remark: '',// 备注
      },
      list: [],
      startTime: '',
      formLabelWidth: '120px',
      policyType: [
        {label: '循环呼叫', value: '循环呼叫'},
        {label: '随机呼叫', value: '随机呼叫'},
      ],
      retryStrategyType: [
        {label: '无响应重试', value: '无响应重试'},
        {label: '强制重试', value: '强制重试'},
      ],
      networkData: [
        {label: '1233', value: '23595'},
        {label: '265', value: '265'},
        {label: '788', value: '788'},
        {label: '455', value: '455'},
      ],
      listTable: [
        {
          network: '',
          data: '',
          priority: '',
          endTime: '', //结束时间
          startTime: ''//开始时间
        }
      ], // 表数据
      rules: {
        name: [
          {required: true, message: '请输入中继组名称', trigger: 'blur'}
        ],
        overtimeTime: [
          {required: true, message: '请输入超时时间', trigger: 'blur'}
        ],
        policy: [
          {required: true, message: '请选择策略类型', trigger: 'blur'}
        ],
        retryStrategy: [
          {required: true, message: '请输入重试策略', trigger: 'blur'}
        ],
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
          this.list.push([this.addFrom, ...this.listTable])
          console.log(this.list)
          window.localStorage.setItem('network', JSON.stringify(this.list))
          this.dialogFormVisible = false
        } else {
          this.$message({
            message: '提交失败， 请重试',
            type: 'error'
          })
          return false;
        }
      });
    },

    resetForm() {
      this.$refs['formName'].resetFields();
    },
    showAddForm(row, title) {
      this.dialogFormVisible = true
      this.title = title
      if (title === '编辑') {
        this.addFrom = row[0]
        this.listTable = [row[1]]
      }else {

        this.addFrom ={}
        // this.listTable
      }
    },
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex;
    },

    removeIt(row) {
      this.list.map((item, i) => {
        if (row === item) {
          this.list.splice(i, 1)
        }
      })
    },
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

#trunk .width {
  display: flex;
  justify-content: space-between;
}

.width {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.width > * {
  flex: 1;
}


</style>
