<template>
  <div class="warps">
    <my-el-header title="调度队列">
      <!--      <el-button @click.nav.native="resetConfigure" type="primary" icon="el-icon-edit" size="small">重置队列配置</el-button>-->
    </my-el-header>
    <div class="container">
      <div class="form-nav">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" :rules="rule">
          <el-form-item label="队列名称" prop="fifoName">
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
        <el-button type="primary" @click="addForms(null, '添加队列')">添加队列</el-button>
      </div>
      <el-dialog :width="$store.state.dialogWidth" :close-on-click-modal="false" :title="title" destroy-on-close
                 ref="addForm"
                 :visible.sync="dialogFormVisible">
        <el-form :model="addForm" ref="addForm" :rules="rules">
          <div class="width">
            <el-form-item label="队列名称" :label-width="formLabelWidth" prop="fifoName">
              <el-input v-model="addForm.fifoName" autocomplete="off" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item label="队列号码" :label-width="formLabelWidth" prop="fifoAgent">
              <el-input v-model="addForm.fifoAgent" autocomplete="off" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item label="入路由号码" :label-width="formLabelWidth" prop="fifoRouterIn">
              <el-select v-model="addForm.fifoRouterIn" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in fifoRouterInList"
                  :key="item.id"
                  :label="item.directoryNumber"
                  :value="item.directoryNumber">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出路由号码" :label-width="formLabelWidth" prop="fifoRouterOut">
              <el-select v-model="addForm.fifoRouterOut" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in fifoRouterOutList"
                  :key="item.id"
                  :label="item.directoryNumber"
                  :value="item.directoryNumber">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item label="所属部门" :label-width="formLabelWidth" prop="fifoEmergency">
              <treeselect v-model="addForm.deptId" :multiple="false" :options="treeArr" :normalizer="normalizer"
                          placeholder="请输入内容" />
            </el-form-item>

            <el-form-item label="域地址" :label-width="formLabelWidth" prop="fifoEmergency">
              <el-input v-model="addForm.domain" placeholder="请输入内容"></el-input>
            </el-form-item>

          </div>

          <div class="width">
            <el-form-item label="队列等待音" :label-width="formLabelWidth" prop="fifoWaitMusic">
              <el-select v-model="addForm.fifoWaitMusic" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in fifoWaitMusicList"
                  :key="item.id"
                  :label="item.fileName"
                  :value="item.fileName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="等待时间" :label-width="formLabelWidth" prop="memberTimeout">
              <el-input v-model="addForm.memberTimeout" autocomplete="off" placeholder="请输入内容"></el-input>
            </el-form-item>

          </div>
          <div class="width">
            <el-form-item label="最大注册数" :label-width="formLabelWidth" prop="memberSimultaneous">
              <el-input v-model="addForm.memberSimultaneous" autocomplete="off" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item label="接听电话间隔" :label-width="formLabelWidth" prop="wrapupTime">
              <el-input v-model="addForm.wrapupTime" autocomplete="off" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item label="紧急号码" :label-width="formLabelWidth" prop="fifoEmergency">
              <el-select v-model="addForm.fifoEmergency" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in fifoEmergencyList"
                  :key="item.id"
                  :label="item.directoryNumber"
                  :value="item.directoryNumber">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="夜服号码" :label-width="formLabelWidth" prop="fifoEmergency">
              <el-input v-model="addForm.fifoNight" placeholder="请输入内容"></el-input>
            </el-form-item>

          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
      <el-table
        height="calc(100vh - 100px - 100px - 100px - 100px)"
        :header-cell-style="{background:'#ccc', color: '#fff',}"
        class="table"
        :data="list"
        v-if="list.length !== 0"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="date"
          label="序号">
          <template scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="fifoName"
          align="center"
          label="队列名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="fifoAgent"
          label="调度队列">
        </el-table-column>
        <el-table-column
          align="center"
          prop="fifoRouterIn"
          label="入路由点号码">
        </el-table-column>
        <el-table-column
          align="center"
          prop="fifoRouterOut"
          label="出路由点号码">
        </el-table-column>
        <el-table-column
          align="center"
          prop="memberSimultaneous"
          label="最大注册数">
        </el-table-column>
        <el-table-column
          align="center"
          prop="memberSimultaneous"
          label="队列等待音">
        </el-table-column>
        <el-table-column
          align="center"
          prop="memberTimeout"
          label="等待时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="wrapupTime"
          label="时间间隔">
        </el-table-column>
        <el-table-column
          align="center"
          prop="wrapupTime"
          fixed="right"
          :width="$store.state.tableMixWidth"
          label="操作">
          <template scope="scope">
            <div class="operate">
              <el-link @click="addForms(scope.row, '编辑')" style="margin-right: 20px">编辑</el-link>
              <template>
                <el-popconfirm title="确认要删除吗？" @confirm="del(scope.row)">
                  <el-link slot="reference">删除
                  </el-link>
                </el-popconfirm>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <my-empty v-else />
    </div>
    <my-footer v-on:next="next" @prev="prev" :form="form" @change="change" @pageCheng="pageCheng"></my-footer>
  </div>
</template>

<script>
import { addFifo, delFifo, fifoRouterIn, fifoRouterOut, getDirectory, getFifo, upDataFifo } from "@/newwork/directory";
import myEmpty from "@/newwork/myEmpty";
import { getOrganizeList } from "@/newwork/system-colltroner";
import { fn } from "@/uti";
import myTree from "@/components/myTree";
import myFooter from "@/components/myFooter";
import myElHeader from "@/components/myElHeader";
import { delPbxConfigure } from "@/newwork/conferencr";
import treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getFileList } from "@/newwork/ground-colltroner";

export default {
  name: "queue",
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
      form: {
        fifoName: "", //队列名称
        fifoAgent: "",//队列名称
        fifoRouterIn: "",  //fifoRouterIn
        memberTimeout: "" //	agent等待时间
      },
      treeArr: [],
      fifoWaitMusicList: [],
      addForm: {
        domain: "", //域
        fifoAgent: "", //号码
        fifoName: "", //队列名称
        fifoRouterIn: "", //入路由点号码
        fifoRouterOut: "", //出路由点号码
        fifoWaitMusic: "", //队列等待音
        memberSimultaneous: "", //agent最大同时注册数量至少为1
        memberTimeout: "", //agent等待时间
        wrapupTime: "", //接听下一路电话的间隔
        fifoEmergency: "", //紧急呼叫号码
        fifoNight: "",
        deptId: null

      },
      fifoRouterInList: [],  //入路由号码列表
      fifoRouterOutList: [], //出路由号码列表
      fifoEmergencyList: [], //紧急呼叫号码
      fileData: "", //提交的音乐
      list: [],
      dialogFormVisible: false,
      title: "新增",
      formLabelWidth: "120px",
      rules: {
        fifoName: [
          { required: true, message: "该选项不可为空,请确认", trigger: "blur" }
        ],
        fifoAgent: [
          { required: true, message: "该选项不可为空,请确认", trigger: "blur" }
        ],
        fifoRouterIn: [
          { required: true, message: "该选项不可为空,请确认", trigger: "blur" }
        ],
        fifoRouterOut: [
          { required: true, message: "该选项不可为空,请确认", trigger: "blur" }
        ],
        fifoWaitMusic: [
          { required: true, message: "该选项不可为空,请确认", trigger: "blur" }
        ],
        memberSimultaneous: [
          { required: true, message: "该选项不可为空,请确认", trigger: "blur" }
        ],
        memberTimeout: [
          { required: true, message: "该选项不可为空,请确认", trigger: "blur" }
        ],
        wrapupTime: [
          { required: true, message: "该选项不可为空,请确认", trigger: "blur" }
        ],
        fifoEmergency: [
          { required: true, message: "该选项不可为空,请确认", trigger: "blur" }
        ],
        domain: [
          { required: true, message: "该选项不可为空,请确认", trigger: "blur" }
        ]
      },
      rule: {
        fifoName: [
          { required: false, message: "该选项不可为空,请确认", trigger: "blur" }
        ],
        fifoAgent: [
          { required: false, message: "该选项不可为空,请确认", trigger: "blur" }
        ],
        fifoRouterIn: [
          { required: false, message: "该选项不可为空,请确认", trigger: "blur" }
        ],
        memberTimeout: [
          { required: false, message: "该选项不可为空,请确认", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getSelectedValue(value) {
      this.addForm.deptId = value.deptId;
    },
    pageCheng(e) {
      this.form = this.$options.data().form;
      this.form.pageSize = e;
      this.getFifo(this.form);
    },

    next() {
      this.form.pageNum++;
      console.log(this.form);
      this.getFifo(this.form);
    },
    prev() {
      this.form.pageNum--;
      this.getFifo(this.form);
    },
    change(e) {
      console.log(e);
      this.form.pageNum = e;
      this.getFifo(this.form);
    },
    addForms(row, type) {
      this.title = type;
      this.getFifo(this.form);
      this.dialogFormVisible = true;
      if (type === "添加队列") {
        this.addForm = this.$options.data().addForm;
      } else {
        this.addForm = row;
      }
    },
    resetForm(type) {
      type === "clear" ? this.$refs.form.resetFields() : this.$refs.addForm.resetFields();
      this.getFifo(this.form);
    },
    find() {
      this.getFifo(this.form);
    },
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.title === "添加队列" ? addFifo(this.addForm).then(res => {
            if (res.data.code === 200) {
              this.getFifo(this.form);
              this.$message.success("提交完成");
              this.dialogFormVisible = false;
            } else {
              this.$message.error(res.data.msg);
            }
          }) : upDataFifo(this.addForm).then(res => {
            if (res.data.code === 200) {
              this.getFifo(this.form);
              this.$message.success("提交完成");
              this.dialogFormVisible = false;

            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });

    },
    del(row) {
      delFifo(row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("提交完成");
          this.getFifo(this.form);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getFifo(form) {
      getFifo(form).then(res => {
        if (res.data.code === 200) {
          this.$bus.$emit("total", res.data.data.total);
          this.list = res.data.data.records;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => this.$message.error(e));
    },
    //出 入 队列

    /**
     * @param type === 1 为 紧急呼叫的结果 === 4 为入路由的结果 === 5 为出路由的结果
     */

    getDirectory(type) {
      const data = {};
      data.type = type;
      if (type === 4) {
        fifoRouterIn(data).then(res => {
          this.fifoRouterInList = res.data.data;
        });
      } else if (type === 5) {
        fifoRouterOut(data).then(res => {
          this.fifoRouterOutList = res.data.data;
        });
      } else {
        getDirectory(data).then(res => {
          this.fifoEmergencyList = res.data.data.records;
        });
      }
    },

    getOrganizeList() {
      getOrganizeList().then(res => {
        this.treeArr = fn(res.data.data);
      });
    },
    resetConfigure() {
      delPbxConfigure("fifo").then(res => {
        if (res.data.code === 200) {
          this.$message.success("提交完成");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getFileList() {
      getFileList().then(res => {
        if (res.data.code === 200) {
          this.fifoWaitMusicList = res.data.data;
        }
      });
    }

  },
  created() {
    this.getFifo(this.form);
    this.getOrganizeList();
    this.getFileList();
  },
  components: {
    myEmpty,
    myTree,
    myFooter,
    myElHeader,
    treeselect
  },
  destroyed() {
    this.$bus.$off("pageChang");
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.addForm = this.$options.data().addForm;
      } else {
        //出, 入队列
        this.getDirectory(4);
        this.getDirectory(5);
        this.getDirectory(0);
        //查找字典
      }
    }
  },
  computed: {
    deptId: {
      get() {
        return this.addForm.deptId + "";
      },
      set(val) {
        this.addForm.deptId = val;
      }
    }
  }
};
</script>

<style scoped>
.form-nav {
  display: flex;
  height: 40px;
  justify-content: space-between;
}

.table {
  margin-top: 20px;
}

.width {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.width > * {
  flex: 1;
}
</style>
