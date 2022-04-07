<template>
  <div class="phone">
    <div class="phone-l">
      <p>所属区域</p>
      <div class="el-tree">
        <e-tree></e-tree>
      </div>
    </div>
    <div class="phone-r">
      <div class="nav">
        <div class="na-l">
          <el-button type="primary" @click="addForms(null, '添加话机')">添加话机</el-button>
        </div>
        <div class="na-l">
          <el-button type="primary">刷新</el-button>
          <el-button type="danger">删除</el-button>
        </div>
      </div>
      <div class="minor-nav">话机列表 <span>SIP服务器 </span></div>
      <div class="nav mover-nav">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="话机名称">
            <el-input v-model="form.name" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="SIP号">
            <el-input v-model="form.SIP" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="话机类型" >
            <el-input v-model="form.type" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="话机状态">
            <el-input v-model="form.stats" placeholder="审批人"></el-input>
          </el-form-item>
        </el-form>

        <div class="btn-info">
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">重置</el-button>
        </div>
      </div>
      <el-table
          :row-class-name="tableRowClassName"
          :data="list"
          style="width: 100%">
        <el-table-column
            prop="date"
            label="序号"
            width="180">
          <template scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="话机名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="SIP"
            label="SIP号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="type"
            label="话机类型">
        </el-table-column>
        <el-table-column
            prop="area"
            label="所属地区">
        </el-table-column>
        <el-table-column
            prop="balance"
            label="余额">
        </el-table-column>
        <el-table-column
            prop="overdraft"
            label="透支余额">
        </el-table-column>
        <el-table-column
            prop="address"
            label="操作">
          <template scope="scope">
            <el-link class="a-link" type="info" @click="addForms(scope.row, '编辑')">编辑</el-link>
            <el-link class="a-link" type="info" @click="removeIt(scope.row)">删除</el-link>
            <el-link class="a-link" type="info" @click="recharge(scope.row)">充值</el-link>
          </template>
        </el-table-column>
        <el-table-column
            prop="remark"
            label="备注">
        </el-table-column>
      </el-table>

    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm" >
        <el-form-item class="width" label="话机名称" :label-width="formLabelWidth"  prop="name">
          <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入话机名称"> </el-input>
        </el-form-item>
        <el-form-item label="话机类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="addForm.type" placeholder="话机类型" >
            <el-option v-for="item in type" :key="item.id" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属地区" :label-width="formLabelWidth" prop="type">
          <el-select v-model="addForm.area" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="width" label="SIP号" :label-width="formLabelWidth"  prop="SIP">
          <el-input v-model="addForm.SIP" autocomplete="off" placeholder="请输入SIP号"></el-input>
        </el-form-item>
        <el-form-item class="width" label="登录密码" :label-width="formLabelWidth" prop="password">
          <el-input
              placeholder="请输入内容"
              v-model="addForm.password"
              clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <template>
            <div class="flex">
              <el-form-item label="余额" :label-width="formLabelWidth">
                <el-input
                    placeholder="请输入内容"
                    v-model="addForm.balance"
                    clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="透支余额" :label-width="formLabelWidth">
                <el-input
                    placeholder="请输入内容"
                    v-model="addForm.overdraft"
                    clearable>
                </el-input>
              </el-form-item>
            </div>
          </template>
        </el-form-item>
        <el-form-item>
          <template scope="scope">
            <div class="flex">
              <el-form-item label="录音状态" :label-width="formLabelWidth">
                <el-radio-group v-model="addForm.recordingStatus">
                  <el-radio :label="1">备选项</el-radio>
                  <el-radio :label="2">备选项</el-radio>
                  <el-radio :label="3">备选项</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="外网呼叫" :label-width="formLabelWidth">
                <el-radio-group v-model="addForm.extranetCall">
                  <el-radio :label="1">备选项</el-radio>
                  <el-radio :label="2">备选项</el-radio>
                  <el-radio :label="3">备选项</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </template>
        </el-form-item>
        <el-form-item>
          <template>
            <div class="flex">
              <el-form-item label="外呼计费模式" :label-width="formLabelWidth">
                <el-select v-model="addForm.billingModel" placeholder="请选择">
                  <el-option
                      v-for="item in billingModel"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="外呼计费套餐" :label-width="formLabelWidth">
                <el-select v-model="addForm.combo" placeholder="请选择">
                  <el-option
                      v-for="item in combo"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="传递强显号码" :label-width="formLabelWidth">
          <el-radio-group v-model="addForm.mandatoryShow">
            <el-radio :label="1">备选项</el-radio>
            <el-radio :label="2">备选项</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="强显号码" :label-width="formLabelWidth">
          <el-input style="display: inline-block; width: 40%; margin-right: 10px" v-model="addForm.mandatoryShowNum" placeholder="请输入号码"></el-input>
        </el-form-item>
        <el-form-item label="坐标" :label-width="formLabelWidth">
          <template scope="scope">
            <el-input type="number" style="display: inline-block; width: 40%; margin-right: 10px" v-model="addForm.enforceNumber" placeholder="请输入经度"></el-input>

            <el-input type="number" style="display: inline-block; width: 40%; margin-right: 10px" v-model="addForm.coordinateNumber" placeholder="请输入纬度"></el-input>
            <el-button style="margin-left:20px " type="primary">主要按钮</el-button>
          </template>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.remark" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="title === '新增'" @click="">取 hfht消</el-button>
        <el-button v-else @click="submitForm('addFrom')">取 sss消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
        title="充值提示"
        :visible.sync="showBar"
        width="30%"
        center>
      <p class="title"><b>充值提醒：</b> <span>你将要为 {{rechargeInfo.name}} ({{rechargeInfo.SIP}})进行充值</span></p>
      <el-input v-model="rechargeInfo.value" placeholder="请输入金额"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showBar = false">取 消</el-button>
    <el-button type="primary" @click="submit(rechargeInfo) ">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

import eTree from '../../../components/eTree.vue';

export default {
  name: "phoneConfig",
  components: {
    eTree
  },
  data() {
    return {

      title: '添加话机',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      showBar: false,
      form: {
        name: '',
        SIP: '',
        type: '',
        stats: '',
      },
      rechargeInfo: {
        value: null
      },
      addForm: {
        name: '', //话机名称
        type: '', // 话机类型，
        area: '',  //地区
        SIP: '', //sip
        password: '', // 密码
        balance: '', //余额
        overdraft: '', //透支余额
        // stats: '', //录音状态
        recordingStatus: '', //录音状态
        extranetCall: '', //外呼计费套餐
        billingModel: '', //外呼计费模式
        combo: '', //外呼计费套餐
        mandatoryShow: '',
        mandatoryShowNum: '',
        enforceNumber: '', //经度
        coordinateNumber: '', //纬度
        remark: '',  //备注
      },
      list: [],
      type: [
        {label: '数字对讲', value: '数字对讲'},
        {label: '数字话机', value: '数字话机'},
        {label: '4G数字话机', value: '4G数字话机'},
        {label: '5G可视话机', value: '5G可视话机'},
        {label: 'APP软电话', value: 'APP软电话'},
        {label: 'APP广播', value: 'APP广播'},
      ],
      billingModel: [
        {label: '1 + 1', value: '1 + 1'},
        {label: '6 + 6', value: '6 + 6'},
        {label: '12 + 12', value: '12 + 12'},
        {label: '60 + 60', value: '60 + 60'},
      ],
      combo: [
        {label: '基本套餐', value: '基本套餐'},
        {label: '白金套餐', value: '白金套餐'},
        {label: '黄金套餐', value: '黄金套餐'},
      ],
      rules: {
        name: [{ required: true, message: '请输入话机名称', trigger: 'blur' },
          { max: 100, message: '长度在100个字符以内', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择话机类型', trigger: 'blur' },],
        area: [{ required: true, message: '请选择活动地址', trigger: 'blur' },],
        SIP: [{ required: true, message: '请输入SIP号码', trigger: 'blur' },],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },],


      }
    }
  },
  methods: {
    submitForm(addForm) {
      this.$refs[addForm].validate((valid) => {
          if(this.title === '新增'){
            if (valid) {
              this.$message({
                message: '提交完成',
                type: 'success'
              })
              this.dialogFormVisible = false
              this.list.push(this.addForm)
              window.localStorage.setItem(('phone'),  JSON.stringify(this.list))
            } else {
              this.$message({
                message: '提交失败， 请重试',
                type: 'error'
              })
            }
          }else {
            if (valid) {
              this.$message({
                message: '提交完成',
                type: 'success'
              })
              this.dialogFormVisible = false
              this.list[addForm.index]=(this.addForm)
              this.addForm = {}
              window.localStorage.setItem(('phone'),  JSON.stringify(this.list))
            } else {
              this.$message({
                message: '提交失败， 请重试',
                type: 'error'
              })
            }
          }
      });
    },
    addForms(row, title){
      this.dialogFormVisible = true
      this.title = title
      if(title === '编辑'){
        this.addForm = row
      }else {
        this.addForm = {}
      }
    },
    tableRowClassName({row, rowIndex}){
      row.index = rowIndex;
    },
    removeIt(row){
      this.list.map((item, i) => {
        if (row === item){
          this.list.splice(i, 1)
        }
      })
    },
    recharge(row){
      this.showBar = true
      this.rechargeInfo = row
    },
    submit(rechargeInfo){
      console.log(rechargeInfo);
      rechargeInfo.value !== null ? this.list[rechargeInfo.index].balance =parseInt(rechargeInfo.balance) + parseInt(rechargeInfo.value) : ''
      this.$message({
        message: '充值完成',
        type: 'success'
      })
      this.showBar = false
    }
  },

  created() {
    this.list = JSON.parse(window.localStorage.getItem('phone'))
  }
}

</script>

<style scoped>
.phone {
  display: flex;
  justify-content: space-between;
}

.phone .phone-l {
  width: 300px;
}

.minor-nav {
  padding: 15px 10px;
  background-color: #ccc;
  margin: 10px 0;
  border-radius: 5px;
}

.phone-r {
  flex: 1;
  padding: 20px 25px;
  margin-left: 10px;
  border-left: 2px solid #cccccc;
}

.phone-r .nav {
  justify-content: space-between;
  display: flex;
}

.mover-nav {
  justify-content: space-evenly;
}
.flex {
  display: flex;
  margin-right: 20px;
}
.width{
  width: 50%;
}
.a-link{
  margin-right: 20px;
}
.title{
  margin: 20px 0;
}
.title span{
  padding: 5px 10px;
  background-color: #F56C6C;
  color: white;
}

</style>
