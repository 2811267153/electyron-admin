<template>
  <div id="rate">
    <div class="rate-true" v-if="toggle">
      <p>{{ this.$route.meta.title }}</p>
      <div class="container">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="审批人">
            <el-input v-model="form.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="clearSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="showAddForm(null, '编辑')">添加费率组</el-button>
      </div>

      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="addForm" :rules="rules" ref="addForm">
          <el-form-item label="活动名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="ID" :label-width="formLabelWidth">
            <el-input v-model="createId" :readonly="true" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="addForm.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </div>
      </el-dialog>

      <el-table
          :data="list"
          stripe
          style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
          <template scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="费率组名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="操作">
          <template scope="scope">
            <el-link class="a-link" type="info" @click="showAddForm(scope.row, '编辑')">编辑</el-link>
            <el-link class="a-link" type="info" @click="removeIt(scope.row)">删除</el-link>
            <el-link class="a-link" type="info" @click="isToggle">查看费率组列表</el-link>
          </template>
        </el-table-column>
        <el-table-column
            prop="remark"
            label="备注">
        </el-table-column>
      </el-table>

    </div>


    <!--    查看费率组列表-->
    <!--      如果toggle == false 则显示  不然显示 首标题-->
    <div class="rate-list" v-else>
      <p>费率组列表</p>
      <div class="container">
        <div class="nav-form">

          <el-form :inline="true" :model="listFrom" class="demo-form-inline">
            <el-form-item label="号码前缀">
              <el-input v-model="listFrom.numberPrefix" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="费率名称">
              <el-input v-model="listFrom.billingName" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="地区类型">
              <el-select v-model="listFrom.region">
                <el-option :label="item.label" :value="item.value" v-for="item in region"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button @click="clearSubmit">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="onSubmits">添加费率</el-button>
        </div>
      </div>


      <el-dialog :listTitle="listTitle" :visible.sync="listDialogFormVisible">
        <el-form :model="addListFrom" ref="formName" :rules="addRules">
          <el-form-item label="费率名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addListFrom.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="费率组" :label-width="formLabelWidth" name="rateGroup">
            <el-select v-model="addListFrom.rateGroup" placeholder="请选择活动区域">
              <el-option :label="item.label" :value="item.value" v-for="item in rateGroup"></el-option>
            </el-select>
          </el-form-item>
          <div class="width">

            <el-form-item label="号码前缀" :label-width="formLabelWidth" prop="numberPrefix">
              <el-input class="input" v-model="addListFrom.numberPrefix" autocomplete="off"></el-input>

            </el-form-item>
            <el-form-item label="地区类型" :label-width="formLabelWidth">
              <el-radio-group v-model="addListFrom.area">
                <el-radio :label="3">分机</el-radio>
                <el-radio :label="6">国外</el-radio>
                <el-radio :label="9">国内</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <el-form-item label="计费方式" :label-width="formLabelWidth" prop="billingMethod">
            <el-table
                ref="singleTable"
                :border="true"
                :data="billingData"
                highlight-current-row
                v-model="addListFrom.billingMethod"
                @current-change="handleCurrentChange"
                style="width: 100%">
              <el-table-column
                  type="index"
                  width="120">
              </el-table-column>
              <el-table-column
                  property="unit"
                  label="计费单元(秒)">
              </el-table-column>
              <el-table-column
                  property="cost"
                  label="计费费用(元)">
              </el-table-column>
              <el-table-column
                  property="count"
                  label="计费次数">
              </el-table-column>
              <el-table-column
                  property="priority"
                  label="优先级">
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item style="margin-top: 20px" label="备注" :label-width="formLabelWidth">
            <el-input v-model="addListFrom.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="listDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForms(formName)">确 定</el-button>
        </div>
      </el-dialog>
      <el-table
          :data="addList"
          style="width: 100%">
        <el-table-column
            prop="date"
            label="序号"
            width="180">
          <template scope="scope">{{scope.$index}}</template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="费率名称"
            width="180">
        </el-table-column>

        <el-table-column
            prop="numberPrefix"
            label="号码前缀"
            width="180">
        </el-table-column>
        <el-table-column
            prop="area"
            label="地区类型"
            width="180">
        </el-table-column>
        <el-table-column
            prop="area"
            label="费率">
          <template scope="scope">
            {{scope.row.billingMethod.cost}}/{{scope.row.billingMethod.unit}},
          </template>
        </el-table-column>
        <el-table-column
            prop="area"
            label="操作"
            width="180">
          <el-link class="a-link" type="info" @click="">编辑</el-link>
          <el-link class="a-link" type="info" @click="">删除</el-link>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "rate",
  data() {
    return {
      title: '添加费率组',
      form: {},
      addForm: {
        id: '',
        list: [],
      },

      dialogFormVisible: false,
      formLabelWidth: '120px',
      toggle: true  ,

      //添加费率页面数据
      addList: [],
      listFrom: {
        numberPrefix: '',
        billingName: '',
      },
      listTitle: '添加费率',
      listDialogFormVisible: false,
      addListFrom: {
        name: '',
        rateGroup: '',
        numberPrefix: '',
        area: '',
        billingMethod: '',
        remark: ''
      },

      region: [
        {label: '分机', value: '分机'},
        {label: '国外', value: '国外'},
        {label: '国内', value: '国内'},
      ],
      rateGroup: [
        {label: '基本功能费率', value: '基本功能费率'},
      ],
      rules: {
        name: [
          {required: true, message: '请输入费率组名称', trigger: 'blur'},
        ],
      },
      addRules: {
        name: [
          {required: true, message: '请输入费率组名称', trigger: 'blur'},
        ], rateGroup: [
          {required: true, message: '请输入费率组名称', trigger: 'blur'},
        ],numberPrefix: [
          {required: true, message: '请输入费率组名称', trigger: 'blur'},
        ],area: [
          {required: false, message: '请输入费率组名称', trigger: 'blur'},
        ],billingData: [
          {required: true, message: '请输入费率组名称', trigger: 'blur'},
        ],remark: [
          {required: false, message: '请输入费率组名称', trigger: 'blur'},
        ],
      },
      billingData: [
        {unit: '15', cost: '0.03', count: 3, priority: 1},
        {unit: '30', cost: '0.05', count: 1, priority: 2},
        {unit: '60', cost: '0.08', count: 100, priority: 3},
      ]
    }
  },
  methods: {
    onSubmit() {
    },
    clearSubmit() {
      this.listFrom = {}
    },
    onSubmits(){
      this.listDialogFormVisible = true
    },
    isToggle(){
      this.toggle = false
    },
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$message({
            message: '提交完成',
            type: 'success'
          })
          this.list.push(this.addForm)
          window.localStorage.setItem('rate', JSON.stringify(this.list))
          this.dialogFormVisible = false
        }
      })

    },
    submitForms(formName) {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          // alert('submit!')
          this.addList.push(this.addListFrom)
        } else {
          console.log('error submit!!');
          this.$message({
            message: '提交失败， 请重试',
            type: 'error'
          })
          return false;
        }
      });
    },
    handleCurrentChange(val) {

      this.addListFrom.billingMethod = val
    },
    showAddForm(row, title) {
      this.title = title
      this.dialogFormVisible = true

    },
    removeIt(row) {
      this.list.map((item, i) => {
        if (row === item) {
          this.list.splice(i, 1)
        }
      })
    }
  },
  computed: {
    createId() {
      return this.addForm.id = (Math.random() * 1000000).toFixed(0)
    }
  },
  created() {
    this.list = JSON.parse(window.localStorage.getItem('rate')) || []
  }
}
</script>

<style scoped>
#rate > div[class] > p {
  border: 1px solid #ccc;
  padding: 10px 15px;
  background-color: #f2f2f2;
}

.container {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  height: 40px;
}

.a-link {
  margin-right: 20px;
}

.nav-form {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.width {
  display: flex;
}

.width .input {
  width: 193px;
}
</style>
