<template>
  <div id="observe">
    <div class="observe">
      <div class="serve-bar">
        <e-tree @treeClick="treeClick" :data="treeArr"/>
      </div>
      <div class="serve-container">
        <div class="container">
          <el-form :inline="true" :model="form" class="demo-form-inline" :rules="form" ref="form">
            <el-form-item label="费率组" prop="diaplanRateGroup">
              <el-input v-model="form.diaplanRateGroup" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="find">查询</el-button>
              <el-button @click="clear">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="showAddForm(null, '添加调度台')"
          >添加费率组
          </el-button
          >
        </div>

        <el-dialog :title="title" :visible.sync="dialogFormVisible">
          <el-form :model="addForm" ref="addForm" :rules="rules">
            <div class="width">
              <el-form-item
                label="调度台名称"
                :label-width="formLabelWidth"
                prop="dispatchName"
              >
                <el-input
                  v-model="addForm.dispatchName"
                  autocomplete="off"
                  placeholder="请输入调度台名称"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="所属区域"
                :label-width="formLabelWidth"
                prop="area"
              >
                <treeselect v-model="addForm.parentId" :multiple="false" :options="treeArr" :normalizer="normalizer" />
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item
                label="域"
                :label-width="formLabelWidth"
                prop="account"
              >
                <el-select v-model="addForm.domain" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="调度号码"
                :label-width="formLabelWidth"
                prop="fifoId"
              >
                <el-input class="width" v-model="addForm.fifoId"  style="width: 100%"> </el-input>
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item
                label="用户"
                :label-width="formLabelWidth"
                prop="account"
              >
                <el-select v-model="addForm.userId" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="调度号码"
                :label-width="formLabelWidth"
                prop="fifoId"
              >
                <el-input class="width" v-model="addForm.fifoId"  style="width: 100%"> </el-input>
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item label="经度" :label-width="formLabelWidth" >
                <el-input
                  class="width"
                  v-model="addForm.coordinate.x"
                  placeholder="请输入经度"
                ></el-input>
              </el-form-item>
              <el-form-item label="纬度" :label-width="formLabelWidth" >
                <el-input
                  class="width"
                  v-model="addForm.coordinate.x"
                  placeholder="纬度"
                ></el-input>
              </el-form-item>
            </div>
            <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
              <el-input v-model="addForm.remark"> </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('addForm')"
            >确 定</el-button
            >
          </div>
        </el-dialog>

        <el-table
          :row-class-name="tableRowClassName"
          :data="list"
          style="width: 100%"
        >
          <el-table-column prop="date" label="序号" width="180">
            <template scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="调度台名称" width="180">
          </el-table-column>
          <el-table-column prop="area" label="所属区域"> </el-table-column>
          <el-table-column prop="number" label="调度号码"> </el-table-column>
          <el-table-column prop="number" label="坐标">
            <template scope="scope">
            <span
            >{{ scope.row.coordinate.x }}{{ scope.row.coordinate.y }}</span
            >
            </template>
          </el-table-column>
          <el-table-column prop="number" label="状态">
            <template scope="scope">
              <el-tag v-if="scope.row.account === '启用'" type="success"
              >启用'</el-tag
              >
              <el-tag v-else type="danger">停用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="操作">
            <template scope="scope">
              <div class="operate">
                <el-link
                  style="margin-right: 20px"
                  @click="addForms(scope.row, '编辑')"
                  type="info"
                >编辑</el-link
                >
                <el-link
                  style="margin-right: 20px"
                  @click="removeIt(scope.row)"
                  type="info"
                >删除</el-link
                >
                <el-link style="margin-right: 20px" type="info">调度组</el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <my-footer v-on:next = "next" @prev="prev" :form="form" @change="change"></my-footer>
  </div>
</template>

<script>
import eTree from '../../../components/eTree.vue'
import { getOrganizeList } from "@/newwork/system-colltroner";
import { fn } from "@/uti";
import myFooter from "@/components/myFooter";
import { getDeskList } from "@/newwork/ground-colltroner";
import treeselect from "@riophae/vue-treeselect";
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'


export default {
  name: 'observeOnDispatcher',
  components: {
    eTree,
    myFooter,
    treeselect
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
        deptId: '',
        dispatchName: '',
        domain: '',
        fifoId: '',
        userId: '', //用户ID(多选,用逗号隔开)
        coordinate: {
          x: '',
          y: ''
        },
        // stauts: 1,
        remark: ''
      },
      treeArr: [],
      options: [
        { label: '启用', value: '启用' },
        { label: '停用', value: '停用' }
      ],
      rules: {
        deptId: [
          { required: true, message: '请输入调度台名称', trigger: 'blur' }
        ],
        dispatchName: [
          { required: true, message: '请输入调度台名称', trigger: 'blur' }
        ],
        domain: [
          { required: true, message: '请输入调度台名称', trigger: 'blur' }
        ],
        fifoId: [
          { required: true, message: '请输入调度台名称', trigger: 'blur' }
        ],
        userId: [
          { required: true, message: '请输入调度台名称', trigger: 'blur' }
        ],
        remark: [
          { required: false, message: '请输入调度台名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    find() {},
    next(){
      this.form.pageNum ++
      this.getRateList(this.form)
    },
    prev(){
      this.form.pageNum --
      this.getRateList(this.form)
    },
    change(e){
      this.form.pageNum = e
      this.getRateList(this.form)
    },
    treeClick(a) {
      this.form =this.$options.data().form
      console.log(a);
      a.deptId === '100' ? this.form.deptId = '' :   this.form.deptId = a.deptId;
      console.log(this.form)
      this.getUserAll(this.form);
    },
    clear(){
      this.form = this.$options.data().form
    },
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          window.localStorage.setItem('observe', JSON.stringify(this.list))
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
    },
    normalizer(node){
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.deptId,
        children: node.children,
        label: node.deptName
      }
    },
    showAddForm(row, title) {
      this.dialogFormVisible = true
      this.title = title
      if (title === '编辑') {
        this.addForm = row
      }else {
        console.log('aa')
        this.resetForm()
      }
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
    },
    removeIt(row) {
      this.list.map((item, i) => {
        if (row === item) {
          this.list.splice(i, 1)
        }
      })
    },
    recharge(row) {
      this.showBar = true
      this.rechargeInfo = row
    },
    getDeskList(form){
      getDeskList(form).then(res => {
        console.log(res);
        if(res.data.code === 200){

          this.list = res.data.data
        }
      })
    }
  },
  created() {
    this.getDeskList(this.form)
    getOrganizeList().then(res => {
      this.treeArr = fn(res.data.data);
    });
  },
}
</script>

<style scoped>
#observe{

}
.observe {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  margin-left: 20px;
  margin-top: 20px;
  box-shadow: 0 0 15px #ccc;
  background-color: #fff;
  border-radius: 10px;
  height: 71vh;
  overflow: auto;
}
.serve-bar {
  width: 300px;
}
.serve-container {
  flex: 1;
}
.serve-container .title {
  background-color: #f2f2f2;
  padding: 10px 15px;
}
.container {
  display: flex;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 20px;
  background-color: #fff;
}
.width{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.width > * {
  flex: 1;
}
</style>
