<template>
  <div id="dialPlan">
    <p>{{ this.$route.meta.title }}</p>
    <div class="container">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="方案名称">
          <el-input v-model="form.name" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="呼出前缀">
          <el-input v-model="form.prefix" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.trunk" placeholder="活动区域">
            <el-option
                :label="item.label"
                v-for="item in trunkGroup"
                :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方案状态">
          <el-select v-model="form.program" placeholder="活动区域">
            <el-option
                :label="item.label"
                v-for="item in programStatus"
                :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
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
        <el-form-item
            label="方案名称"
            :label-width="formLabelWidth"
            prop="name"
        >
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <div class="width">
          <el-form-item label="中继组" label-width="100px" prop="prefix">
            <el-select v-model="addForm.diaplanPrefix">
              <el-option
                  :label="item.groupName"
                  v-for="item in trunkGroup"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="addForm.stauts">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-form-item
            label="呼出前缀"
            :label-width="formLabelWidth"
            prop="prefix"
        >
          <el-input v-model="addForm.prefix" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="并发数" :label-width="formLabelWidth">
          <el-input v-model="addForm.concurrency" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('formName')"
        >确 定
        </el-button
        >
      </div>
    </el-dialog>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="date" label="序号" width="180">
        <template scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="diaplanName" label="方案名称" width="180">
      </el-table-column>
      <el-table-column prop="trunk" label="中继组" width="180">
      </el-table-column>
      <el-table-column prop="diaplanPrefix" label="呼出前缀" width="180">
      </el-table-column>
      <el-table-column prop="stauts" label="状态" width="180">
        <template scope="scope">
          <el-tag v-if="scope.row.stauts === 1" type="success">启用</el-tag>
          <el-tag v-else type="danger">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="stauts" label="操作">
        <template scope="scope">
          <el-link style="margin-right: 20px" type="info">应用到</el-link>
          <el-link
              style="margin-right: 20px"
              @click="showAddForm(scope.row, '编辑')"
              type="info"
          >编辑
          </el-link
          >
          <el-link style="margin-right: 20px" type="info">删除</el-link>
          <el-link style="margin-right: 20px" type="info">添加规则</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {addDiaPlanList, diaPlanList, getGwgroup} from "@/newwork/ground-colltroner";

export default {
  name: 'dialPlan',
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        pageNum: 1,
        pageSize: 10,
        diaplanGatewayGroup: '',
        diaplanName: '',
        diaplanPrefix: ''
      },
      title: '',
      list: [],
      addForm: {
        diaplanGatewayGroup: '', //绑定的路由组
        diaplanName: '', //拨号计划名称
        diaplanPrefix: '',  //呼出前缀
      },
      trunkGroup: [],
      programStatus: [
        {label: '启用', value: '启用'},
        {label: '停用', value: '停用'}
      ],
      rules: {
        diaplanGatewayGroup: [{required: true, message: '此项为必填项， 请确认', trigger: 'blur'}],
        diaplanName: [{required: true, message: '此项为必填项， 请确认', trigger: 'blur'}],
        diaplanPrefix: [{required: true, message: '此项为必填项， 请确认', trigger: 'blur'}]
      }
    }
  },
  methods: {
    getDaiPlan(form) {
      diaPlanList(form).then(res => {
        console.log(res)
        this.list = res.data.data.records
      }).catch(e => {
        console.log(e)
      })
    },

    //搜索
    onSubmit() {
    },
    //重置
    clearSubmit() {
    },
    showAddForm(row, title) {
      this.dialogFormVisible = true
      this.title = title
      if (title === '编辑') {
        this.addForm = row
      } else if (title === '查看') {
        this.addForm = row
        this.isReadOnly = true
      } else {
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /**
           * 添加拨号方案
           */
          addDiaPlanList(this.addForm).then(res => {
            console.log(res)
          }).catch(e => {
            console.log(e)
          })
          this.$message({
            message: '提交完成',
            type: 'success'
          })
        } else {
          this.$message({
            message: '提交失败， 请重试',
            type: 'error'
          })
          return false
        }
      })
    }
  },
  created() {
    this.getDaiPlan(this.form)
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
      }
    }
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
}

.width > * {
  flex: 1;
}
</style>
