<template>
  <div id="dialPlan">
    <div class="container">
      <el-form :inline="true" :model="form" class="demo-form-inline" ref="form" rules="rules">
        <el-form-item label="方案名称" prop="diaplanName">
          <el-input v-model="form.diaplanName" placeholder="审批人"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="find">查询</el-button>
          <el-button @click="clearSubmit">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="showAddForm(null, '添加方案')"
      >添加
      </el-button
      >
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" ref="formName" :rules="rules">
        <div class="width">
          <el-form-item
              label="拨号方案名称"
              :label-width="formLabelWidth"
              prop="diaplanName"
          >
            <el-input v-model="addForm.diaplanName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="中继组" :label-width="formLabelWidth" prop="diaplanGatewayGroup">
            <el-select v-model="addForm.diaplanGatewayGroup">
              <el-option
                  :label="item.groupName"
                  v-for="item in trunkGroup"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

        </div>
        <div class="width">
          <el-form-item label="费率组" :label-width="formLabelWidth" prop="diaplanRateGroup">
            <el-select v-model="addForm.diaplanRateGroup" placeholder="请选择" @change="change">
              <el-option
                  v-for="item in rateList"
                  :key="item.id"
                  :label="item.groupName"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="呼出前缀" :label-width="formLabelWidth" prop="diaplanPrefix">
            <el-input :disabled="true" v-model="addForm.diaplanPrefix"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('formName')"
        >确 定
        </el-button
        >
      </div>
    </el-dialog>
    <el-table :data="list" border style="width: 100%; margin-top: 20px"  v-if="list.length !==0">
      <el-table-column prop="date" align="center" label="序号" width="180">
        <template scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="diaplanName" align="center" label="方案名称">
      </el-table-column>
      <el-table-column prop="trunk" align="center" label="中继组">
        <template scope="scope">
          {{ scope.row.pbxGwgroup.groupName }}
        </template>
      </el-table-column>
      <el-table-column prop="diaplanPrefix" align="center" label="呼出前缀">
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="更新时间">
      </el-table-column>
      <el-table-column align="center" prop="stauts" label="操作">
        <template scope="scope">
          <el-link
              style="margin-right: 20px"
              @click="showAddForm(scope.row, '编辑')"
              type="info"
          >编辑
          </el-link
          >
          <el-link style="margin-right: 20px" @click="removeIt(scope.row)" type="info">删除</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center">
      </el-table-column>
    </el-table>

    <my-empty v-else/>
  </div>
</template>

<script>
import {
  addDiaPlanList, delDiaPlan,
  diaPlanList,
  getGwgroup,
  getRateItemList,
  getRateList,
  upDateDiaPlan
} from "@/newwork/ground-colltroner";
import myEmpty from "@/newwork/myEmpty";


export default {
  name: 'dialPlan',
  components: {
    myEmpty
  },

  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        pageNum: 1,
        pageSize: 10,
        diaplanGatewayGroup: '',
        diaplanName: '',
        diaplanPrefix: '',
      },
      title: '',
      list: [],
      addForm: {
        diaplanGatewayGroup: '', //中继组ID
        diaplanName: '', //拨号计划名称
        diaplanPrefix: '',  //呼出前缀
        diaplanRateGroup: '', //费率组
      },
      rateGroupId: '',//获取费率组ID
      trunkGroup: [],
      rateList: [],
      rateItemList: [],
      rules: {
        diaplanName: [{required: true, message: '此项为必填项， 请确认', trigger: 'blur'}],
        diaplanGatewayGroup: [{required: true, message: '此项为必填项， 请确认', trigger: 'blur'}],
        diaplanRateGroup: [{required: true, message: '此项为必填项， 请确认', trigger: 'blur'}],
        diaplanPrefix: [{required: true, message: '此项为必填项， 请确认', trigger: 'blur'}]
      }
    }
  },
  methods: {
    getDaiPlan(form) {
      diaPlanList(form).then(res => {
        console.log(res)
        this.$store.dispatch('total', res.data.data.total)
        this.list = res.data.data.records
      }).catch(e => {
        console.log(e)
      })
    },

    //搜索
    find() {
      this.getDaiPlan(this.form)
    },
    //重置
    clearSubmit() {
      this.resetForm()
      this.getDaiPlan(this.form)
    },
    showAddForm(row, title) {
      this.dialogFormVisible = true
      this.title = title
      if (title === '编辑') {
        this.addForm = row
      } else {
        this.addForm = this.$options.data().addForm
      }
    },

    /**
     *
     * 提交和更新表单
     * @param formName
     */
    resetForm(formName) {
      this.$refs.form.resetFields();
    },


    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /**
           * 添加拨号方案
           */
          if (this.title !== '编辑') {
            addDiaPlanList(this.addForm).then(res => {
              console.log(res)
              if (res.data.code === 200) {
                this.$message.success('提交完成')
                this.getDaiPlan(this.form)

              } else {
                this.$message.error(res.data.msg)
              }
              this.dialogFormVisible = false
            }).catch(e => {
              console.log(e)
              this.$message.error(e)
            })
          } else {
            upDateDiaPlan(this.addForm).then(res => {
              if (res.data.code === 200) {
                this.$message.success('提交完成')
                this.getDaiPlan(this.form)
              } else {
                this.$message.error(res.data.msg)
              }
            }).catch(e => this.$message.error(e))
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
    change(e) {
      //获取费率组下的所有费率
      this.rateGroupId = e
      const data = {}
      data.rateGroupId = e
      getRateItemList(data).then(res => {
        if (res.data.code === 200) {
          res.data.data.records.forEach((item, i) => {
            this.addForm.diaplanPrefix = item.ratePrefix + ','
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    removeIt(row) {
      delDiaPlan(row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success('提交完成')
          this.getDaiPlan(this.form);
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(e => {
        this.$message.error(e)
      })

    }
  },
  created() {
    this.form = this.$store.state.formPage
    this.getDaiPlan(this.form)
  },
  computed: {
    diaplanPrefix(){
      return this.addForm.diaplanRateGroup
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (val === true) {
        getGwgroup(this.form)
        {
          getGwgroup(this.form).then(res => {
            this.trunkGroup = res.data.data.records
          }).catch(e => {
            this.$message.error(e)
          })
        }
        getRateList(this.form).then(res => {
          if (res.data.code === 200) {
            this.rateList = res.data.data.records
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(e => this.$message.error(e))
      }
    },
    diaplanPrefix(){
      this.addForm.diaplanPrefix = ''
    }
  },
  mounted() {
    this.$bus.$on('pageChange', () => {
      this.form = this.$store.state.formPage
      this.getDaiPlan(this.form)
    })
  }
}
</script>

<style scoped>
#dialPlan > p {
  border: 1px solid #ccc;
  margin: 10px 0;
  padding: 10px 15px;
  background-color: #f2f2f2;
}

.container {
  display: flex;
  justify-content: space-between;
  height: 40px;
}

.width {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  width: 100% !important;
}

.width > * {
  flex: 1;
}
</style>
