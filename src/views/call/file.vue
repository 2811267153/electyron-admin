<template>
  <div class="warps">
    <my-el-header title="文件管理" />
    <div class="container">
      <div class="form-nav">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" :rules="rule">
          <el-form-item label="文件名" prop="fifoName">
            <el-input v-model="form.fifoName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="队列号码" prop="fifoAgent">
            <el-input v-model="form.fifoAgent" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="入路由号码" prop="fifoRouterIn">
            <el-input v-model="form.fifoRouterIn" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="agent等待时间" prop="memberTimeout">
            <el-input v-model="form.memberTimeout" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="find">查询</el-button>
            <el-button @click="resetForm('clear')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="addForm(null, '添加队列')">添加队列</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import myElHeader from "@/components/myElHeader";

export default {
  name: "file",
  components: {
    myElHeader
  },
  data() {
    return {
      form: {}
    };
  },
  methods: {
    find() {
    },
    resetForm() {
      this.form = this.$options.data().form;
    },
    addForm() {

    }
  }
};
</script>

<style scoped>

</style>
