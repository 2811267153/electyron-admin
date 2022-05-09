<template>
  <div id="rate">
    <div class="rate-true" v-if="toggle">
      <p>{{ this.$route.meta.title }}</p>
      <div class="container">
        <el-form :inline="true" :model="form" class="demo-form-inline" :rules="addFroms" ref="form">
          <el-form-item label="费率组" prop="diaplanRateGroup">
            <el-input v-model="form.diaplanRateGroup" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="find">查询</el-button>
            <el-button @click="clear">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="showAddForm(null, '添加费率组')"
        >添加费率组
        </el-button
        >
      </div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="addForm" :rules="addFroms" ref="formName">
          <el-form-item
              label="添加费率组名称"
              :label-width="formLabelWidth"
              prop="groupName"
          >
            <el-input v-model="addForm.groupName" autocomplete="off" placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="addForm.remark" autocomplete="off" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>

      <el-table :data="list" :header-cell-style="{background:'#ccc', color: '#fff',}" style="width: 100%" border v-if="list.length !== 0">
        <el-table-column align="center" prop="date" label="序号" width="180">
          <template scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="groupName" label="费率组名称">
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
      <el-empty v-else>
      </el-empty>

    </div>

    <!--    查看费率组列表-->
    <!--      如果toggle == false 则显示  不然显示 首标题-->
    <div class="rate-list" v-else>
      <p>费率组列表</p>

      <div class="container">
        <div class="nav-form">
          <div></div>
          <div>
            <el-button type="primary" @click="onSubmits">添加费率</el-button>
            <el-button type="primary" @click="black">返回</el-button>
          </div>
        </div>
      </div>


      <el-dialog :title="listTitle" :visible.sync="listDialogFormVisible">
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
            <el-input v-model="row.groupName" disabled></el-input>
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
              <el-form-item prop="rate">
                <el-input style="margin-right: 20px" v-model="addListFrom.rate" placeholder="请输入费率"></el-input>
              </el-form-item>
              <el-form-item style="margin-left: 20px" prop="billingPeriod">
                <el-input v-model="addListFrom.billingPeriod" placeholder="请输入计费周期"></el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="footers">
            <p>注意: 费率默认已分为单位, 计费时间为60(s)秒</p>
            <div class="footers">
              <el-button @click="listDialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForms('编辑')"
              >确 定
              </el-button
              >
            </div>
          </div>
        </div>
      </el-dialog>
      <el-table :data="rateItemList" border style="width: 100%; margin-top: 20px" v-if="list.length !== 0">
        <el-table-column align="center" prop="date" label="序号">
          <template scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column align="center" prop="rateName" label="费率名称">
        </el-table-column>
        <el-table-column align="center" prop="rate" label="费率">
        </el-table-column>
        <el-table-column align="center" prop="billingPeriod" label="费率区间">
        </el-table-column>
        <el-table-column align="center" prop="ratePrefix" label="费率前缀">
        </el-table-column>

        <el-table-column align="center" prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column prop="area" label="操作">
          <template scope="scope">
            <el-link class="a-link" type="info" @click="upDataForm(scope.row)">编辑</el-link>
            <el-link class="a-link" type="info" @click="removeIt(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>

      <my-empty v-else/>
    </div>
  </div>
</template>

<script>

import {
  addRateItemList,
  addRateList,
  deleteRate, deleteRateItem,
  getRateItemList,
  getRateList, putRateList, upDaterateItem
} from "@/newwork/ground-colltroner";
import myEmpty from "@/newwork/myEmpty";
import {isValidNumber} from "@/util/validate";

export default {
  name: 'rate',
  components: {
    myEmpty
  },

  data() {
    const validateNum = (rule, value, callback) => {
      if(!isValidNumber(value)){
        callback(new Error('ip地址输入有误,请确认'))
      }else {
        callback()
      }
    }
    return {
      title: '添加费率组',
      form: {
        rateGroupId: '',
      },
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
      formLabelWidth: '140px',
      toggle: true,
      shows: '',  //设置费率编辑状态
      rateGroupId: '',
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
      row: {},
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
          {required: true, message: '该选项为必填项，请曲确认', trigger: 'blur'},
          {validator: validateNum, message: '请输入合法的数字', trigger: 'blur'}
        ],
        billingPeriod: [
          {required: true, message: '该选项为必填项，请曲确认', trigger: 'blur'},
          {validator: validateNum, message: '请输入合法的数字', trigger: 'blur'}

        ],
      },
      addFroms: {
        groupName: [
          {required: true, message: '该选项为必填项，请曲确认', trigger: 'blur'}
        ],
      }
    }
  },
  mounted() {
    this.$bus.$on('pageChange', () => {
      this.form = this.$store.state.formPage
      this.getRateList(this.form)
    })
  },
  methods: {
    find() {
      this.getRateList(this.form)
    },
    black() {
      this.toggle = true
    },
    clear() {
      this.resetForm('form')
      this.getRateList(this.form)
    },
    getRateList(form) {
      getRateList(form).then(res => {
        this.$store.dispatch('total', res.data.data.total)
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
    getRateItemList(form) {
      getRateItemList(form).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.rateItemList = res.data.data.records
        } else {
          console.log(res)
        }
      }).catch(e => {
        this.$message.error(e)
      })
    },
    onSubmits() {
      this.listDialogFormVisible = true
      this.listTitle = '添加费率'
    },
    isToggle(row) {
      this.toggle = false
      this.row = row
      console.log(row)
      this.form.rateGroupId = row.id
      this.getRateItemList(this.form)
    },
    /**
     *
     * 添加费率
     */
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          if (this.title === '添加费率组') {
            addRateList(this.addForm).then(res => {
              console.log(res)
              this.getRateList(this.form)
              this.addForm = this.$options.data().addForm
              location.reload()
            })
            this.getRateList(this.form)
            this.dialogFormVisible = false
          } else {
            putRateList(this.addForm).then(res => {
              console.log(res)
              if (res.data.code === 200) {
                this.getRateList()
                this.$message.success('提交完成')
                this.dialogFormVisible = false
              } else {
                this.$message.error(res.data.msg)
              }
            })
          }
        }
      })
    },
    //添加费率列表
    submitForms() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          if (this.listTitle === '添加费率') {
            addRateItemList(this.addListFrom).then(res => {
              this.resetForm()
              if (res.data.code === 200) {
                this.$message.success('添加完成')
                this.dialogFormVisible = false
                this.getRateItemList(this.form)
              } else {
                this.$message.error(res.data.msg)
              }
            }).catch(e => {
              this.$message.error(e)
            })
          } else {
            upDaterateItem(this.addListFrom).then(res => {
              console.log(res)
              if (res.data.code === 200) {
                this.getRateItemList(this.form)
                this.listDialogFormVisible = false
                this.$message.success('提交完成')

              } else {
                this.$message.error(res.data.msg)
              }
            })
          }
        } else {
          this.$message({
            message: '提交失败， 请重试',
            type: 'error'
          })
          return false
        }
      })
    },
    showAddForm(row, title) {
      this.title = title
      if (title === '编辑') {
        this.addForm = row
      }
      this.dialogFormVisible = true
    },
    //编辑费率

    upDataForm(row) {
      this.addListFrom = row
      this.listTitle = '编辑费率'
      this.listDialogFormVisible = true
    },
    //删除费率组
    removeIt(row) {
      this.toggle ? deleteRate(row.id).then(res => {
        if (res.data.code == 200) {
          this.$message.success('提交完成')
          this.getRateList(this.form)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(e => this.$message.error(e)) : deleteRateItem(row.id).then(res => {
        if (res.data.code === 200) {

          this.$message.success('提交完成')
          //由于上边已经给form表单设置过id了 这里直接使用就ok
          this.getRateItemList(this.form)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },

    //  清除表单
    resetForm(type) {
     type ==='form' ?  this.$refs.form.resetFields() : this.$refs.formName.resetFields();
    }
  },
  watch: {
    listDialogFormVisible(val) {
      if (val !== true) {
        this.getRateItemList(this.form)
        this.resetForm()
      }
    },
    toggle(val) {
      if (val === true) {
        this.rateItemList = []
      } else {
        this.addListFrom.rateGroupId = this.row.id
      }
    },
  },
  computed: {
    createId() {
      return (this.addForm.id = (Math.random() * 1000000).toFixed(0))
    }
  },
  created() {
    this.form = this.$store.state.formPage
    this.getRateList(this.form)
    this.getRateItemList(this.form)
  }
}
</script>

<style scoped>
#rate > div[class] > p {
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #f2f2f2;
}

.container {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  height: 40px;
  background-color: #fff;
}

.a-link {
  margin-right: 20px;
}

.footers {
  display: flex;
  justify-content: space-between;
}
.footers p{
  color: #cccccc;
}
.nav-form {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.pagination {
  margin-top: 20px;
}

.width {
  display: flex;
  width: 100%;
}

.width .input {
  width: 193px;
}
</style>
