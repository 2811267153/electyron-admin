<template>
  <div id="observe">
    <div class="serve-bar">
      <e-tree></e-tree>
    </div>
    <div class="serve-container">
      <p class="title">调度台管理</p>

      <div class="nav-info">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="调度台名称">
            <el-input v-model="form.user" placeholder="请输入调度台名称"></el-input>
          </el-form-item>
          <el-form-item label="调度号码">
            <el-input v-model="form.user" placeholder="请输入调度号码"></el-input>
          </el-form-item>
          <el-form-item label="调度台状态">
            <el-select v-model="form.stauts" placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="danger" @click="onSubmit">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="addForm-btn">   <el-button type="primary" @click="addForms(null, '添加话机')">添加调度台</el-button></div>
      </div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="addForm" ref="addForm" :rules="rules">
          <el-form-item class="width" label="调度台名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入调度台名称"></el-input>
          </el-form-item>
          <el-form-item label="所属区域" :label-width="formLabelWidth" prop="area">
            <el-cascader
                v-model="addForm.area"
                :options="areaList"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"></el-cascader>
          </el-form-item>
          <el-form-item label="管理账户" :label-width="formLabelWidth" prop="account">
            <el-select v-model="addForm.account" placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调度号码" :label-width="formLabelWidth" prop="number">
            <el-input class="width" v-model="addForm.number"> </el-input>
          </el-form-item>
          <el-form-item  label="坐标" :label-width="formLabelWidth">
              <el-input class="width"   v-model="addForm.coordinate.x" placeholder="请输入经度"></el-input>
              <el-input class="width"   v-model="addForm.coordinate.y" placeholder="请输入纬度"></el-input>

          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="addForm.remark"> </el-input>

          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
        </div>
      </el-dialog>


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
            label="调度台名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="area"
            label="所属区域">
        </el-table-column>
        <el-table-column
            prop="number"
            label="调度号码">
        </el-table-column>
        <el-table-column
            prop="number"
            label="坐标">
          <template scope="scope">
            <span>{{scope.row.coordinate.x}}{{scope.row.coordinate.y}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="number"
            label="状态">
          <template scope="scope">
            <el-tag v-if="scope.row.account === '启用'" type="success">启用'</el-tag>
            <el-tag v-else type="danger">停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="number"
            label="操作">
          <template scope="scope">
            <div class="operate">
              <el-link style="margin-right: 20px" @click="addForms(scope.row, '编辑')" type="info">编辑</el-link>
              <el-link style="margin-right: 20px" @click="removeIt(scope.row)" type="info">删除</el-link>
              <el-link style="margin-right: 20px" type="info">调度组</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import eTree from '../../../components/eTree.vue';

export default {
  name: "observeOnDispatcher",
  components: {
    eTree
  },
  data() {
    return {
      title: '添加话机',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        stauts: ''
      },
      list: [],
      addForm: {
        name: '',
        area: '',
        account: '',
        number: '',
        coordinate: {
          x: '',
          y: ''
        },
        // stauts: 1,
        remark: ''
      },
      options: [
        {label: '启用', value: '启用'},
        {label: '停用', value: '停用'},
      ],
      areaList: [
        {label: '湖北', value: '湖北', children: [{label: '武汉', value: '武汉'},{label: '武汉', value: '武汉'},{label: '武汉', value: '武汉'},{label: '武汉', value: '武汉'}]},
      ],
      rules: {
        name: [
          { required: true, message: '请输入调度台名称', trigger: 'blur' }],
        area: [
          { required: true, message: '请输入调度台名称', trigger: 'blur' }],
        account: [
          { required: true, message: '请输入调度台名称', trigger: 'blur' }],
        number: [
          { required: true, message: '请输入调度台名称', trigger: 'blur' }],
      },
    }
  },
  methods: {
    onSubmit(){

    },
    handleChange(value) {
      console.log(value);
    },
    submitForm(addForm) {
      console.log(this.$refs[addForm])

      this.$refs[addForm].validate((valid) => {
        if (valid) {
          this.list.push(this.addForm)
          this.dialogFormVisible = false
          window.localStorage.setItem("observe", JSON.stringify(this.list))
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

    addForms(row, title){
      this.dialogFormVisible = true
      this.title = title
      if(title === '编辑'){
        this.addForm = row
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
  },
  created() {
    this.list = JSON.parse(window.localStorage.getItem('observe'))
  }
}
</script>

<style scoped>
#observe{
  display: flex;
  justify-content: space-between;

}
.serve-bar {
  width: 300px;
}
.serve-container{
  flex: 1;
  margin: 0 20px;
  border: 1px solid #cccccc;
}
.serve-container .title{
  background-color: #f2f2f2;
  padding: 10px 15px;
}
.nav-info {
  margin: 20px 0;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
}
.width{
  display: inline-block;
  width: 45%;
  margin-right: 20px;
}

</style>
