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
            <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in policyType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="重试策略">
          <el-select v-model="from.relay" placeholder="中继类型">
            <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in retryStrategyType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!--          <el-button type="primary" @click="onSubmit">查询</el-button>-->
          <!--          <el-button @click="onSubmit">重置</el-button>-->
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="showAddForm(null, '添加中继组')"
      >添加中继组
      </el-button
      >
    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addFrom" ref="addForm" :rules="rules">
        <div class="width">
          <el-form-item
              label="中继组名称"
              :label-width="formLabelWidth"
              prop="groupName"
          >
            <el-input v-model="addFrom.groupName" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
              label="重试策略"
              :label-width="formLabelWidth"
              prop="strategyRetry"
          >
            <el-select v-model="addFrom.strategyRetry" placeholder="请选择">
              <el-option
                  v-for="item in retryStrategyType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
              label="策略类型"
              :label-width="formLabelWidth"
              prop="strategyType"
          >
            <el-select v-model="addFrom.strategyType" placeholder="请选择">
              <el-option
                  v-for="item in policyType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item style="margin-top: 20px" label="中继数组"  :label-width="formLabelWidth">
          <ul>
            <li v-for="(item, i) in tableData">
              <el-select v-model="tableData[i].gatewayId">
                <el-option
                    v-for="item in pbxList"
                    :key="item.value"
                    :label="item.gatewayName"
                    placeholder="请选择网关"
                    :value="item.id">
                </el-option>
              </el-select>
              <el-input class="li-input" v-model="tableData[i].weight" placeholder="请输入内容"></el-input>
            </li>
          </ul>
        </el-form-item>
        <el-form-item
            label="备注"
            :label-width="formLabelWidth"
        >
          <el-input
              v-model="addFrom.remark"
              placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()"
        >确 定
        </el-button
        >
      </div>
    </el-dialog>

    <el-table border :data="list" style="width: 80%">
      <el-table-column align="center" prop="index" label="序号" width="50">
        <template scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" prop="groupName" label="中继名称">
        <template scope="scope">
          {{ scope.row.groupName }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="pbxGwgroupGatewayList" label="策略类型">
        <template scope="scope">
          <span v-if="scope.strategyType === 0">无响应重试</span>
          <span v-else>强制重试</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="pbxGwgroupGatewayList" label="重试策略">
        <template scope="scope">
          <span v-if="scope.strategyRetry === 0">无响应重试</span>
          <span v-else>强制重试</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="retryStrategy" label="关联网关" width="300px">
        <template scope="scope">
          <div class="table" v-for="(item, i) in scope.row.pbxGatewayList">
            <p>
              <span>{{ scope.row.pbxGatewayList[i].gatewayName }}</span> --<span>{{ scope.row.pbxGwgroupGatewayList[i].createTime }}</span>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="remark" label="操作">
        <template scope="scope">
          <el-link
              style="margin-right: 20px"
              @click="showAddForm(scope.row, '编辑')"
              type="info"
          >编辑
          </el-link
          >
          <el-link @click="removeIt(scope.row)" style="margin-right: 20px" type="info">删除</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="remark" label="备注">
        <template scope="scope">
          {{ scope.row.remark || '暂无备注' }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {addGwgroup, deleteGwgroup, getGwgroup,  getPbxAll} from "@/newwork/ground-colltroner";

export default {
  name: 'trunkGroup',
  data() {
    return {
      from: {},
      title: '添加中继组',
      dialogFormVisible: false,
      pbxList: [],
      addFrom: {
        groupName: '', //中继名称
        strategyRetry: '', //重试策略，
        strategyType: '', // 策略类型
        pbxGwgroupGatewayList: '', //中继数组
        totalWeight: 0, //总的权重值，为组内中继之和
        pageNum: 1,
        pageSize: 10,
      },
      list: [],
      startTime: '',
      formLabelWidth: '120px',
      policyType: [
        {label: '循环呼叫', value: 0},
        {label: '随机呼叫', value: 1}
      ],
      retryStrategyType: [
        {label: '无响应重试', value: 0},
        {label: '强制重试', value: 1}
      ],
      rules: {
        groupName: [
          {required: true, message: '请输入中继组名称', trigger: 'blur'}
        ],
        strategyRetry: [
          {required: true, message: '请输入超时时间', trigger: 'blur'}
        ],
        strategyType: [
          {required: true, message: '请选择策略类型', trigger: 'blur'}
        ],
        retryStrategy: [
          {required: true, message: '请输入重试策略', trigger: 'blur'}
        ],
        startTime: [{required: true, message: '请选择工作时间', trigger: 'blur'}]
      },
      value: '',
      tableData: [{gatewayId: '', weight: ''},{gatewayId: '', weight: ''}]
    }
  },
  methods: {
    getGwgroup(form){
      getGwgroup(form).then(res => {
        this.list = res.data.data.records
      }).catch(e => {
        this.$message.error(e)
      })
    },
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex
    },

    showAddForm(row, title) {
      this.dialogFormVisible = true
      this.title = title
      if (title === '编辑') {
        this.addFrom = row
      }else {
       this.addFrom = {
         groupName: '', //中继名称
         strategyRetry: '', //重试策略，
         strategyType: '', // 策略类型
         pbxGwgroupGatewayList: '', //中继数组
         totalWeight: '', //总的权重值，为组内中继之和
         pageNum: 1,
         pageSize: 10,
       }
      }
    },
    submitForm() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          const totalWeight = []
          this.tableData.forEach(item => {
            if(item.gatewayId.length !== 0 && item.weight !== 0){
              totalWeight.push(parseInt(item.weight))
              this.dialogFormVisible = false
            }else {
              this.$message.error('请确保中继数组内已填写')
            }
          })
          let s = 0
          totalWeight.forEach((item, i) => {
            s += parseInt(item)
            this.addFrom.totalWeight = s
          })
          console.log(this.addFrom.totalWeight )
          if(this.addFrom.totalWeight.length !== 0){
            //添加中继数组
            addGwgroup(this.addFrom).then(res => {
              if(res.data.code === 200){
                this.$message.success('提交完成')
                this.getGwgroup(this.form)
              }else {
                this.$message.error(res.data.msg)
              }
            }).catch(e => {
              this.$message.error(e)
            })
          }
        } else {
          this.$message.error('提交失败， 请重试')
          return false
        }
      })
    },
    resetForm() {
      this.$refs['addForm'].resetFields()
    },
    removeIt(row) {
      deleteGwgroup(row.id).then(res => {
        console.log(row)
        console.log(res)
        if(res.data.code === 200){
          this.$message.success('提交完成')
          this.getGwgroup(this.from)
        }else {
          this.$message.error(res.data.msg)
        }
      }).catch(e => {
        this.$message.error(e)
      })
    },

  },

  created() {
    this.getGwgroup(this.form)
  },
  watch: {
    dialogFormVisible(val ){
      if(val){
        console.log(val)
        getPbxAll().then(res => {
          this.pbxList = res.data.data.records
        })
      }
    },
    tableData: {
      handler: function (val){
        this.addFrom.pbxGwgroupGatewayList = val
      },
      deep: true
    },
    totalWeight(val){
      if(val.length !== 0){
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

#trunk .width {
  display: flex;
  justify-content: space-between;
}

.width {
  display: flex;
  justify-content: space-between;
}

.width > * {
  flex: 1;
}
ul {
  width: 80%;
  flex-direction: column;
}
ul li {
  display: flex;
  list-style: none;
  margin-bottom: 20px;
  margin-right: 20px;
}
.li-input{
  width: 50%;
  margin-left: 20px;
}
.table p{
  background-color: transparent;
}
</style>
