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
        <el-table
          :data="list"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="序号"
            width="50">
            <template scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog :title="title" width="1000px" :visible.sync="dialogFormVisible">
      <el-form :model="addForm">
        <div class="width">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="域地址" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="所属组织" :label-width="formLabelWidth">
            <treeselect v-model="addForm.deptId" :multiple="false " :options="treeArr"
                        :normalizer="normalizer" />
          </el-form-item>
        </div>
        <div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="分组成员" :label-width="formLabelWidth">
                <el-tree :props="defaultProps"
                         default-expand-all
                         :expand-on-click-node="false"
                         accordion
                         @node-click="handleNodeClick"
                         :node-key="treeArr.deptId"
                         ref="tree" @treeClick="treeClick" :data="treeArr" />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-transfer v-model="value" :data="userList" :props="{
                key: 'id',
                label: 'deptName'
              }"></el-transfer>
            </el-col>
          </el-row>

        </div>
        <div class="width">
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="排序" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <my-footer />

  </div>
</template>

<script>
import eTree from "../../components/eTree.vue";
import myElHeader from "@/components/myElHeader";
import myFooter from "@/components/myFooter";
import { getOrganizeList, getUserAll } from "@/newwork/system-colltroner";
import { fn } from "@/uti";
import { getGroupData } from "@/newwork/call-router";
import treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "callGrouping",
  components: {
    myElHeader,
    myFooter,
    eTree,
    treeselect
  },
  data() {
    return {
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.deptId,
          children: node.children,
          label: node.deptName
        };
      },
      defaultProps: {
        children: "children",
        label: "deptName"
      },
      value: [],
      form: {},
      addForm: {
        deptId: null,
        directoryIdList: "", //分组列表,
        displayBench: "", //      控制台显示(0：显示 1：不显示)
        groupName: "", // 分组名称
        orderNum: ""   //    排序
      },
      treeArr: [],
      list: [],
      userList: [],
      title: "添加分组",
      dialogFormVisible: true,
      formLabelWidth: "120px",
      props: {
        key: "id",
        label: "deptName"
      }
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
    handleNodeClick(a, b) {
      console.log(a);
      const form = {};
      form.deptId = a.deptId;
      getUserAll(form).then(res => {
        console.log(res);
        this.userList = res.data.data.records;
      });
    },
    getGroupData(form) {
      getGroupData(form).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.list = res.data.data.records;
        }
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
