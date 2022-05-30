<template>
  <div class="warps">
    <my-el-header />
    <div class="container">
      <div class="form-nav">
        <el-form :inline="true" :close-on-click-modal="false" :model="form" class="demo-form-inline" :rules="form"
                 ref="form">
          <el-form-item label="路由名称" prop="diaplanRateGroup">
            <el-input v-model="form.routerName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="呼叫类型 " prop="diaplanRateGroup">
            <el-input v-model="form.fifoId" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="diaplanRateGroup">
            <el-input v-model="form.desType" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="diaplanRateGroup">
            <el-input v-model="form.callType" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="find">查询</el-button>
            <el-button @click="clear">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="showAddForm(null, '添加呼叫路由')"
        >添加呼叫路由
        </el-button
        >
      </div>
    </div>
    <my-footer />
  </div>
</template>

<script>
import myElHeader from "@/components/myElHeader";
import myFooter from "@/components/myFooter";

export default {
  name: "callRouting",
  components: {
    myElHeader,
    myFooter
  },
  data() {
    return {
      form: {},
      addForm: {
        routerName: "",
        fifoId: "",
        desType: "",
        callType: ""
      },
      title: "添加呼叫路由"
    };
  },
  methods: {
    find() {

    },
    clear() {
      this.form = this.$options.data().form;
    },
    showAddForm(row, title) {
      this.title = title;

    }
  }
};
</script>

<style scoped>

</style>
