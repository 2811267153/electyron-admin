<template>
  <div class="warps">
    <my-el-header title="分组管理" />
    <div class="container">
      <div class="container-l">
        <e-tree @treeClick="treeClick" :data="treeArr" />
      </div>
      <div class="container-r">
        <div class="form-nav">
          <el-form :inline="true" :close-on-click-modal="false" :model="form" class="demo-form-inline" :rules="form"
                   ref="form">
            <el-form-item label="分组名称" prop="diaplanRateGroup">
              <el-input v-model="form.routerName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="分组状态" prop="diaplanRateGroup">
              <el-input v-model="form.desType" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="find">查询</el-button>
              <el-button @click="clear">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="showAddForm(null, '添加呼叫路由')"
          >添加分组
          </el-button
          >
        </div>
      </div>
    </div>
    <my-footer />
  </div>
</template>

<script>
import eTree from "../../components/eTree.vue";
import myElHeader from "@/components/myElHeader";
import myFooter from "@/components/myFooter";
import { getOrganizeList } from "@/newwork/system-colltroner";
import { fn } from "@/uti";
import { getGroupData } from "@/newwork/call-router";

export default {
  name: "callGrouping",
  components: {
    myElHeader,
    myFooter,
    eTree
  },
  data() {
    return {
      form: {},
      treeArr: []
    };
  },
  methods: {
    find() {
    },
    clear() {
      this.form = this.$options.data().form;
    },
    showAddForm() {

    },
    treeClick() {
    },
    getGroupData(form) {
      getGroupData(form).then(res => {
        console.log(res);
      });
    }
  },
  created() {
    getOrganizeList().then(res => {
      this.treeArr = fn(res.data.data);
    });
    this.getGroupData(this.form);
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 20px;
  background-color: #fff;
  flex-direction: row;
}

.container-r {
  flex: 1;
}
</style>
