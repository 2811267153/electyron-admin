<template>
  <div class="warps">
    <my-el-header title="调度台" />
    <div class="container">
      <div class="container-l">
        <e-tree @treeClick="treeClick" :data="treeArr" />
      </div>
      <div class="serve-container">
        <div class="form-nav">
          <el-form :inline="true" :close-on-click-modal="false" :model="form" class="demo-form-inline" :rules="form"
                   ref="form">
            <el-form-item label="调度台名称" prop="diaplanRateGroup">
              <el-input v-model="form.dispatchName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="队列号码" prop="diaplanRateGroup">
              <el-input v-model="form.fifoId" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="用户" prop="diaplanRateGroup">
              <el-input v-model="form.nickName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="find">查询</el-button>
              <el-button @click="clear">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="showAddForm(null, '添加调度台')"
          >添加调度台
          </el-button
          >
        </div>

        <el-dialog :width="$store.state.dialogWidth" destroy-on-close :title="title" :close-on-click-modal="false"
                   :visible.sync="dialogFormVisible">
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
            </div>
            <div class="width">
              <el-form-item
                label="所属部门"
                :label-width="formLabelWidth"
                prop="deptId"
              >
                <treeselect v-model="addForm.deptId" :multiple="false" :options="treeArr" placeholder="请选择"
                            noOptionsText="暂无数据" :normalizer="normalizer" />
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item
                label="域"
                :label-width="formLabelWidth"
                prop="domain"
              >
                <el-input v-model="addForm.domain" placeholder="请输入" />
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item
                label="队列号码"
                :label-width="formLabelWidth"
                prop="fifoId"
              >
                <el-select v-model="addForm.fifoId" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in fifoIdList"
                    :key="item.id"
                    :label="item.fifoName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item
                label="用户"
                :label-width="formLabelWidth"
                prop="userId"
              >
                <el-select @change="blur" v-model="userId" placeholder="请选择" style="width: 100%" multiple>
                  <el-option
                    v-for="item in userList"
                    :key="item.userId"
                    :label="item.nickName"
                    :value="item.userId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                <el-input v-model="addForm.remark"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('addForm')"
            >确 定
            </el-button
            >
          </div>
        </el-dialog>

        <el-table
          :row-class-name="tableRowClassName"
          :data="list"
          :header-cell-style="{background:'#ccc', color: '#fff'}"
          height="calc(100vh - 100px - 100px - 100px - 100px)"
          style="width: 100%"
        >
          <el-table-column prop="date" label="序号" width="50px" align="center">
            <template scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="dispatchName" align="center" label="调度台名称">
          </el-table-column>
          <el-table-column prop="domain" align="center" label="域">
            <template scope="scope">
              <span v-if="scope.row">{{ scope.row.domain }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fifoId" align="center" label="队列号码"></el-table-column>
          <el-table-column prop="userId" align="center" label="用户">
            <template scope="scope"><span v-for="item in scope.row.userList">{{ item.nickName }}</span></template>
          </el-table-column>
          <el-table-column prop="number" align="center" label="坐标" min-width="130px">
            <template scope="scope">
              <p>经度：{{ scope.row.latitude }}</p>
              <p>纬度：{{ scope.row.longitude }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="number" align="center" label="操作" fixed="right" :width="$store.state.tableMixWidth">
            <template scope="scope">
              <div class="operate">
                <el-link
                  @click="showAddForm(scope.row, '编辑')"
                  type="info"
                >编辑
                </el-link
                >
                <template>
                  <el-popconfirm title="确认要删除吗？" @confirm="removeIt(scope.row)">
                    <el-link type="info" slot="reference">删除
                    </el-link>
                  </el-popconfirm>
                </template>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <my-footer v-on:next="next" @prev="prev" :form="form" @pageCheng="pageCheng"></my-footer>
  </div>
</template>

<script>
import eTree from "../../components/eTree.vue";
import { getOrganizeList, getUserAll } from "@/newwork/system-colltroner";
import { fn } from "@/uti";
import myFooter from "@/components/myFooter";
import { addDeskList, getDeskList, putDeskList } from "@/newwork/ground-colltroner";
import treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import myElHeader from "@/components/myElHeader";
import { delFifo, unGetFilo } from "@/newwork/directory";


export default {
  name: "observeOnDispatcher",
  components: {
    eTree,
    myFooter,
    treeselect,
    myElHeader
  },
  data() {
    return {
      title: "添加调度台",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        dispatchName: "",
        fifoId: "",
        nickName: ""
      },

      userList: "", //用户列表,
      fifoIdList: "",//队列号码
      list: [],
      userId: [], //用户选择的列表
      addForm: {
        deptId: undefined,
        dispatchName: "",
        domain: "",
        fifoId: "",
        userId: "", //用户ID(多选,用逗号隔开)
        latitude: "",
        longitude: "",
        // stauts: 1,
        remark: ""
      },
      treeArr: [],
      options: [
        { label: "启用", value: "启用" },
        { label: "停用", value: "停用" }
      ],
      rules: {
        deptId: [
          { required: true, message: "该选项为必填项， 请确认", trigger: "blur" }
        ],
        dispatchName: [
          { required: true, message: "该选项为必填项， 请确认", trigger: "blur" }
        ],
        domain: [
          { required: true, message: "该选项为必填项， 请确认", trigger: "blur" }
        ],
        fifoId: [
          { required: true, message: "该选项为必填项， 请确认", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "该选项为必填项， 请确认", trigger: "blur" }
        ],
        remark: [
          { required: false, message: "该选项为必填项， 请确认", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    find() {
      this.getDeskList(this.form);
    },
    next() {
      this.form.pageNum++;
      this.getRateList(this.form);
    },
    prev() {
      this.form.pageNum--;
      this.getRateList(this.form);
    },
    pageCheng(e) {
      this.form = this.$options.data().form;
      this.form.pageSize = e;
      this.getDeskList(this.form);
    },
    change(e) {
      this.form.pageNum = e;
      this.getRateList(this.form);
    },
    blur() {
      this.addForm.userId = this.userId.join(",");
      console.log(this.userId);
    },
    treeClick(a) {
      this.form = this.$options.data().form;
      a.deptId === "100" ? this.form.deptId = "" : this.form.deptId = a.deptId;
      console.log(this.form);
      this.getDeskList(this.form);
    },
    clear() {
      this.form = this.$options.data().form;
      this.getDeskList(this.form);
    },
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.title === "添加调度台" ? this.addDesk() : this.upDataDesk();
        } else {
          return false;
        }
      });
    },
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
    addDesk() {
      addDeskList(this.addForm).then(res => {
        if (res.data.code === 200) {
          this.$message.success("提交完成");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    upDataDesk() {
      putDeskList(this.addForm).then(res => {
        if (res.data.code === 200) {
          this.$message.success("提交完成");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    showAddForm(row, title) {
      this.dialogFormVisible = true;
      this.title = title;
      if (title === "编辑") {
        this.addForm = row;
        this.addForm.userList.forEach(item => {
          this.userId.push(item.userId);
        });
        this.blur();
        // this.addForm.userId = this.userId.forEach(item => {
        //   console.log(item);
        //
        // });
        // for (let i = 0; i < this.userId.length; i++) {
        //   this.addForm.userId = this.userId[i].id
        // }
      }
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    removeIt(row) {
      delFifo(row.id).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success("提交完成");
        } else {
          this.$message.error(res.data.msg);
        }
      });
      this.list.map((item, i) => {

        if (row === item) {
          this.list.splice(i, 1);
        }
      });
    },
    recharge(row) {
      this.showBar = true;
      this.rechargeInfo = row;
    },
    getDeskList(form) {
      getDeskList(form).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.list = res.data.data.records;
          this.$bus.$emit("total", res.data.data.total);
        }
      });
    },
    getUserList() {
      getUserAll().then(res => {
        console.log(res);
        this.userList = res.data.data.records;
      });
    },
    //获取未绑定的队列
    getFifo() {
      unGetFilo().then(res => {
        if (res.data.code === 200) {
          this.fifoIdList = res.data.data;
        }
      });
    }
  },

  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.addForm = this.$options.data().addForm;
        this.userId = [];
      }
    }
  },
  created() {
    this.getDeskList(this.form);
    this.getFifo();
    this.getUserList();
    getOrganizeList().then(res => {
      this.treeArr = fn(res.data.data);
    });
  }
};
</script>

<style scoped>
.operate {
  padding: 0;
}

.serve-container {
  width: calc(100vw - 200px - 200px - 20px);
}

.container {
  display: flex;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 20px;
  background-color: #fff;
  flex-direction: row;
}

.width {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.width > * {
  flex: 1;
}
</style>
