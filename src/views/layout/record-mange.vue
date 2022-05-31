<template>
  <div class="warps">
    <my-el-header title="日志" />
    <div class="container">
      <div class="form-nav">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item label="名称" prop="realName">
            <el-input
              v-model="form.realName" placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="操作" prop="operation">
            <el-input v-model="form.operation" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">查询</el-button>
            <el-button @click="clear">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :header-cell-style="{background:'#ccc', color: '#fff'}"
        :data="tableData"
        height="calc(100vh - 100px - 100px - 100px - 100px)"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="date"
          width="50"
          label="序号">
          <template scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="realName"
          align="center"
          width="200"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="ipAddress"
          align="center"
          label="IP地址">
        </el-table-column>
        <el-table-column
          prop="targetPage"
          align="center"
          label="目标页面">
        </el-table-column>
        <el-table-column
          prop="operation"
          align="center"
          label="操作">
        </el-table-column>
      </el-table>
    </div>
    <my-footer v-on:next="next" @prev="prev" :form="form" @change="change" @pageCheng="pageCheng"></my-footer>
  </div>

</template>

<script>
import { getLog } from "@/newwork/system-colltroner";
import myFooter from "@/components/myFooter";
import myElHeader from "@/components/myElHeader";

export default {
  name: "record-mange",
  data() {

    return {
      form: {
        realName: "",
        operation: ""
      },
      tableData: [],
      addForm: {},
      time: "",
      rules: {
        realName: [
          { required: false, message: "请输入活动名称", trigger: "blur" }
        ],
        operation: [
          { required: false, message: "请输入活动名称", trigger: "blur" }
        ]
      }
    };

  },
  created() {
    this.getLog(this.form);
  },
  components: {
    myFooter,
    myElHeader
  },
  methods: {
    next() {
      this.form.pageNum++;
      this.getLog(this.form);
    },
    prev() {
      this.form.pageNum--;
      this.getLog(this.form);
    },
    change(e) {
      this.form.pageNum = e;
      this.getLog(this.form);
    },
    pageCheng(e) {
      this.form = this.$options.data().form;
      this.form.pageSize = e;
      this.getLog(this.form);
    },
    getLog(form) {
      getLog(form).then(res => {
        this.$bus.$emit("total", res.data.data.total);
        this.tableData = res.data.data.records;
      }).catch(e => {
        console.log(e);
      });
    },
    clear() {
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.resetFields();
      this.getLog(this.form);
    },

    submit() {
      this.getLog(this.form);
    }
  }
};
</script>

<style scoped>

</style>
