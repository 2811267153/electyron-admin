<template>
  <div>
    <div class="nav-form">
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="form.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="find">查询</el-button>
          <el-button @click="clear">重置</el-button>
        </el-form-item>
      </el-form>

      <el-button type="primary">新增</el-button>
    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>

            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-input value="swusg"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getRecord} from "@/newwork/conferencr";

export default {
  name: "meetingMinutes",
  data(){
    return {
      form: {},
      addForm: {},
      list: [],
      dialogFormVisible: true,
      title: '新增',
      formLabelWidth: '120px'
    }
  },
  methods: {
    find(){},
    clear(){},
    getRecord(form){
      getRecord(form).then(res => {
        console.log(res)
        if(res.data.code ===200){
          this.list = res.data
        }
      }).catch(e => this.$message.error(e))
    }
  },
  created() {
    this.form = this.$store.state.formPage
    this.getRecord(this.form)
  }
}
</script>

<style scoped>
.nav-form{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}
.nav-form form{
  height: 40px;
}
</style>