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
            <el-option :label="item.label" v-for="item in trunkGroup" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方案状态">
          <el-select v-model="form.program" placeholder="活动区域">
            <el-option :label="item.label" v-for="item in programStatus" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="clearSubmit">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="showAddForm(null, '添加方案')">添加</el-button>

    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" ref="formName" :rules="rules">
        <el-form-item label="活动名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <div class="width">
          <el-form-item label="中继组" label-width="100px" prop="prefix">
            <el-select v-model="addForm.trunk">
              <el-option :label="item.label" v-for="item in trunkGroup" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="addForm.stauts">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-form-item label="呼出前缀" :label-width="formLabelWidth" prop="prefix">
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
        <el-button type="primary" @click="submitForm('formName')">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
        :data="list"
        style="width: 100%">
      <el-table-column
          prop="date"
          label="日期"
          width="180">

        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="方案名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="trunk"
          label="中继组"
          width="180">
      </el-table-column>
      <el-table-column
          prop="prefix"
          label="呼出前缀"
          width="180">
      </el-table-column>
      <el-table-column
          prop="stauts"
          label="状态"
          width="180">
        <template scope="scope">
          <el-tag v-if="scope.row.stauts === 1" type="success">启用</el-tag>
          <el-tag v-else type="danger">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          align="center"

          prop="stauts"
          label="操作">

        <template scope="scope">
          <el-link style="margin-right: 20px;" type="info">应用到</el-link>
          <el-link style="margin-right: 20px;"  @click="showAddForm(scope.row, '编辑')"  type="info">编辑</el-link>
          <el-link style="margin-right: 20px;" type="info">删除</el-link>
          <el-link style="margin-right: 20px;" type="info">添加规则</el-link>
        </template>
      </el-table-column>
      <el-table-column
          prop="remark"
          label="备注"
          width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "dialPlan",
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        trunk: '',
        name: '',
        program: '',
        prefix: '',
      },
      title: '',
      list: [],
      addForm: {
        trunk: '',
        name: '',
        program: '',
        prefix: '',
        concurrency: '',
        remark: '',
        stauts: 1,
      },
      trunkGroup: [
        {label: 'test1', value: 'test1'},
        {label: 'test2', value: 'test2'},
        {label: 'test3', value: 'test3'},
      ],
      programStatus: [
        {label: '启用', value: '启用'},
        {label: '停用', value: '停用'},
      ],
      rules: {
        name: [
          {required: true, message: '请输入方案名称', trigger: 'blur'},
        ],
        trunk: [
          {required: true, message: '请选择中继组', trigger: 'blur'},
        ],
        prefix: [
          {required: true, message: '请输入呼出前缀', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
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
          this.list.push(this.addForm)
          this.dialogFormVisible = false
          window.localStorage.setItem("dianPlan", JSON.stringify(this.list))
          this.$message({
            message: '提交完成',
            type: 'success'
          })

        } else {
          this.$message({
            message: '提交失败， 请重试',
            type: 'error'
          })
          return false;
        }
      });
    },
  }, created() {
    this.list = JSON.parse(window.localStorage.getItem('dianPlan')) || []
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
.width > *{
  flex: 1;

}
</style>
