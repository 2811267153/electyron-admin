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
        <el-button type="primary" @click="showAddForm(null, '编辑')"
        >添加费率组
        </el-button
        >
      </div>

      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="addForm" :rules="addRules" ref="addForm">
          <el-form-item
              label="活动名称"
              :label-width="formLabelWidth"
              prop="groupName"
          >
            <el-input v-model="addForm.groupName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="addForm.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>

      <el-table :data="list" stripe style="width: 50%" border>
        <el-table-column align="center" prop="date" label="日期" width="180">
          <template scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="groupName" label="费率组名称" width="180">
        </el-table-column>
        <el-table-column align="center" prop="address" label="操作">
          <template scope="scope">
            <el-link
                class="a-link"
                type="info"
                @click="showAddForm(scope.row, '编辑')"
            >编辑
            </el-link
            >
            <el-link class="a-link" type="info" @click="removeIt(scope.row)"
            >删除
            </el-link
            >
            <el-link class="a-link" type="info" @click="isToggle(scope.row)"
            >查看费率组列表
            </el-link
            >
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" label="备注"></el-table-column>
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
              <el-input
                  v-model="listFrom.numberPrefix"
                  placeholder="审批人"
              ></el-input>
            </el-form-item>
            <el-form-item label="费率名称">
              <el-input
                  v-model="listFrom.billingName"
                  placeholder="审批人"
              ></el-input>
            </el-form-item>
            <el-form-item label="地区类型">
              <el-select v-model="listFrom.region">
                <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="item in region"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button @click="clearSubmit">重置</el-button>
            </el-form-item>
          </el-form>
          <div>
            <el-button type="primary" @click="onSubmits">添加费率</el-button>
            <el-button type="primary" @click="black">返回</el-button></div>
        </div>
      </div>

      <el-dialog :listTitle="listTitle" :visible.sync="listDialogFormVisible">
        <el-form :model="addListFrom" ref="formName" :rules="addRules">
          <el-form-item
              label="费率名称"
              :label-width="formLabelWidth"
              prop="rateName"
          >
            <el-input v-model="addListFrom.rateName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
              label="费率组"
              :label-width="formLabelWidth"
              name="rateGroup"
              required
          >
            <el-select
                v-model="addListFrom.rateGroupId"
            >
              <el-option
                  :label="item.groupName"
                  :value="item.id"
                  v-for="item in list"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="width">
            <el-form-item
                label="费率前缀"
                :label-width="formLabelWidth"
                prop="ratePrefix"
            >
              <el-input
                  class="input"
                  v-model="addListFrom.ratePrefix"
                  autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item
              label="计费方式"
              :label-width="formLabelWidth"
              required
          >
            <div class="width">
              <el-form-item prop="rate"> <el-input style="margin-right: 20px" v-model="addListFrom.rate" placeholder="请输入费率"></el-input></el-form-item>

              <el-form-item style="margin-left: 20px" prop="billingPeriod"><el-input v-model="addListFrom.billingPeriod" placeholder="请输入计费单位"></el-input></el-form-item>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="listDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForms('formName')"
          >确 定
          </el-button
          >
        </div>
      </el-dialog>
      <el-table :data="rateItemList" border style="width: 50%;">
        <el-table-column align="center" prop="date" label="序号">
          <template scope="scope">{{ scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column align="center" prop="groupName" label="费率名称">
        </el-table-column>

        <el-table-column align="center" prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column prop="area" label="操作">
          <el-link class="a-link" type="info" @click="">编辑</el-link>
          <el-link class="a-link" type="info" @click="">删除</el-link>
        </el-table-column>
      </el-table>


      <el-pagination
          class='pagination'
          background
          layout="prev, pager, next"
          :total="1000">
      </el-pagination>
    </div>


    <el-empty>
      <el-button type="primary">按钮</el-button>
    </el-empty>
  </div>
</template>

<script>

import {addRateItemList, addRateList, getRateItemList, getRateList} from "@/newwork/ground-colltroner";

export default {
  name: 'rate',
  data() {
    return {
      title: '添加费率组',
      form: {},
      /**
       *
       * 费率组表单
       */
      addForm: {
        groupName: '',  //费率名称
      },
      list: [],  //保存费率组列表
      rateItemList: [], //保存费率列表
      dialogFormVisible: false,
      formLabelWidth: '120px',
      toggle: false,

      /**
       * 费率添加表单
       */
      addList: [],
      listFrom: {
        numberPrefix: '',
        billingName: ''
      },
      listTitle: '添加费率',
      listDialogFormVisible: false,
      addListFrom: {
        rateName: '',  //费率名称
        billingPeriod: '',//计费周期单位为秒
        rateGroupId: '', //费率组ID
        ratePrefix: '', //费率前缀
        rate: '', //费率
      },

      region: [
        {label: '分机', value: '分机'},
        {label: '国外', value: '国外'},
        {label: '国内', value: '国内'}
      ],

      addRules: {
        rateName: [
          {required: true, message: '该选项为必填项，请曲确认', trigger: 'blur'}
        ],
        ratePrefix: [
          {required: true, message: '该选项为必填项，请曲确认', trigger: 'blur'}
        ],
        rate: [
          {required: true, message: '该选项为必填项，请曲确认', trigger: 'blur'}
        ],
        billingPeriod: [
          {required: true, message: '该选项为必填项，请曲确认', trigger: 'blur'}
        ],

      },
      billingData: [
        {},
        {unit: '30', cost: '0.05', count: 1, priority: 2},
        {unit: '60', cost: '0.08', count: 100, priority: 3}
      ]
    }
  },
  methods: {
    onSubmit() {
    },
    black(){
      this.toggle = true
    },
    clearSubmit() {
      this.listFrom = {}
    },
    getRateList(form) {
      getRateList(form).then(res => {
        this.list = res.data.data.records
      }).catch(e => {
        this.$message.error(e)
      })
    },

    /**
     *
     * 获取费率组列表
     * @param form
     */
    getRateItemList(form){
      getRateItemList(form).then(res => {
        console.log(res)
        if(res.data.code === 200){
          this.rateItemList = res.data.data.records
        }else {
          console.log(res)
        }
      }).catch(e => {
        this.$message.error(e)
      })
    },
    onSubmits() {
      this.listDialogFormVisible = true
    },
    isToggle(row) {
      this.toggle = false
      this.form = row
      this.getRateItemList(this.form)
    },
    /**
     *
     * 添加费率
     */
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          addRateList(this.addForm).then(res => {
            console.log(res)
          })
          this.list.push(this.addForm)
          this.dialogFormVisible = false
        }
      })
    },
    submitForms(formName) {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          addRateItemList(this.addListFrom).then(res => {
            console.log(res)
            if(res.data.code === 200){
              this.$message.success('添加完成')
            }else {
              this.$message.error(res.data.msg())
            }
          }).catch(e => {
            console.log(e)
            this.$message.error(e)
          })
        } else {
          this.$message({
            message: '提交失败， 请重试',
            type: 'error'
          })
          return false
        }
      })
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
      return (this.addForm.id = (Math.random() * 1000000).toFixed(0))
    }
  },
  created() {
    this.getRateList(this.form)
    this.getRateItemList(this.form)
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
.pagination{
  margin-top: 20px;
}
.width {
  display: flex;
}

.width .input {
  width: 193px;
}
</style>
