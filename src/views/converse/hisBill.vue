<template>
  <div class="warps">
    <my-el-header/>
    <div class="container">
      <div class="nav-form">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="计费账户">
            <el-input v-model="form.name" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="被叫号码">
            <el-input v-model="form.mobilePhone" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-input v-model="form.startingTime" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-input v-model="form.endTime" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="find">查询</el-button>
            <el-button type="primary" @click="clear">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        height="calc(100vh - 100px - 100px - 100px - 100px)"
        :data="list"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="序号"
        width="50px">
          <template scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column
          prop="blegCallerIdName"
          label="计费账户">
        </el-table-column>
        <el-table-column
          prop="blegCalleeIdNumber"
          label="被叫号码">
        </el-table-column>
        <el-table-column
          prop="blegContext"
          label="服务接口">
        </el-table-column>
        <el-table-column
          prop="name"
          label="呼出时间">
        </el-table-column>
        <el-table-column
          prop="name"
          label="应答时间">
        </el-table-column>
        <el-table-column
          prop="name"
          label="呼出时长">
        </el-table-column>
        <el-table-column
          prop="name"
          label="计费时长">
        </el-table-column>
        <el-table-column
          prop="name"
          label="挂机原因">
        </el-table-column>
        <el-table-column
          prop="blegReadCodec"
          label="网管">
        </el-table-column>
        <el-table-column
          prop="name"
          label="外呼前缀">
        </el-table-column>
        <el-table-column
          prop="name"
          label="录音">
        </el-table-column>
        <el-table-column
          prop="name"
          label="计费状态">
        </el-table-column>
        <el-table-column
          prop="name"
          label="费用">
        </el-table-column>
      </el-table>
    </div>
    <my-footer v-on:next="next" @prev="prev" :form="form" @change="change"  @pageCheng="pageCheng"></my-footer>
  </div>
</template>

<script>
import myElHeader from "@/components/myElHeader";
import myFooter from "@/components/myFooter";
import { getPbxList } from "@/newwork/conferencr";

export default {
  name: "history",
  components: {
    myElHeader,
    myFooter
  },

  data() {
    return {
      form: {
        mobilePhone: '',
        startingTime: '',
        endTime: ""
      },
      list: []
    }

  },
  methods: {
    find(){
      this.getPbxList(this.form)
    },
    clear(){
      this.form = this.$options.data().form
      this.getPbxList(this.form)
    },
    pageCheng(e){
      this.form = this.$options.data().form
      this.form.pageSize = e
      this.getPbxList(this.form)
    },
    getPbxList(form){
      getPbxList(form).then(res => {
        console.log(res);
        if(res.data.code === 200){
          this.$bus.$emit("total", res.data.data.total);
          this.list = res.data.data.records
        }
      })
    },
    next() {
      this.form.pageNum++;
      this.getPbxList(this.form);
    },
    prev() {
      this.form.pageNum--;
      this.getPbxList(this.form);
    },
    change(e) {
      this.form.pageNum = e;
      this.getPbxList(this.form);
    },
  },
  created() {
    this.getPbxList(this.form)
  },
  mounted() {
    this.$bus.$on('pageCheng', (data) => {
      this.form = this.$options.data().form
      this.form.pageSize = data
      this.getPbxList(this.form)
    })
  },
  destroyed(){
    this.$bus.$off('pageChang')
  },
}
</script>

<style scoped>
.nav-form {
  margin: 15px;
  height: 40px;
  display: flex;
  justify-content: space-between;
}

#networkManagement .width {
  display: flex;
  justify-content: space-between;
}

.width > * {
  flex: 1;
}
</style>
