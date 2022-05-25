<template>
  <div>
    <div v-show="toggle">
      <div class="warps">
        <my-el-header />
        <div class="container">
          <div class="form-nav">
            <el-form :inline="true" :model="form" class="demo-form-inline" :rules="addFroms" ref="form">
              <el-form-item label="费率组" prop="diaplanRateGroup">
                <el-input v-model="form.diaplanRateGroup" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="find">查询</el-button>
                <el-button @click="clear">重置</el-button>
              </el-form-item>
            </el-form>
            <el-button type="primary" @click="showAddForm(null, '添加费率组')"
            >添加费率组
            </el-button
            >
          </div>
          <el-dialog :width="$store.state.dialogWidth" destroy-on-close :title="title" :close-on-click-modal="false"
                     :visible.sync="dialogFormVisible">
            <el-form ref="addForm" :model="addForm" :rules="addFroms">
              <el-form-item
                label="添加费率组名称"
                :label-width="formLabelWidth"
                prop="groupName"
              >
                <el-input v-model="addForm.groupName" autocomplete="off" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="addForm.remark" autocomplete="off" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
          </el-dialog>
          <el-table height="calc(100vh - 100px - 100px - 100px - 100px)" :data="list"
                    :header-cell-style="{background:'#ccc', color: '#fff',}" style="width: 100%"
                    v-if="list.length !== 0">
            <el-table-column align="center" prop="date" label="序号" width="50">
              <template scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="groupName" label="费率组名称">
            </el-table-column>
            <el-table-column align="center" prop="remark" label="备注"></el-table-column>
            <el-table-column align="center" prop="address" label="操作" min-width="200px">
              <template scope="scope">
                <div class="operate">
                  <el-link type="info" @click="showAddForm(scope.row, '编辑')">编辑</el-link>
                  <el-link type="info" @click="isToggle(scope.row)">查看费率组列表</el-link>
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
          <el-empty v-else>
          </el-empty>
        </div>
        <my-footer v-on:next="next" @prev="prev" :form="form" @change="change" @pageCheng="pageCheng"></my-footer>
      </div>
    </div>
    <div v-show="!toggle">
    </div>
  </div>
</template>

<script>

import {
  addRateItemList,
  addRateList,
  deleteRate,
  deleteRateItem,
  getRateItemList,
  getRateList,
  putRateList,
  upDaterateItem
} from "@/newwork/ground-colltroner";
import myEmpty from "@/newwork/myEmpty";
import { isValidNumber } from "@/util/validate";
import myFooter from "@/components/myFooter";
import myElHeader from "@/components/myElHeader";

export default {
  name: "rate",
  components: {
    myEmpty,
    myFooter,
    myElHeader
  },

  data() {
    const validateNum = (rule, value, callback) => {
      if (!isValidNumber(value)) {
        callback(new Error("ip地址输入有误,请确认"));
      } else {
        callback();
      }
    };
    return {
      title: "添加费率组",
      form: {
        rateGroupId: ""
      },
      /**
       *
       * 费率组表单
       */
      addForm: {
        groupName: ""  //费率名称
      },
      list: [],  //保存费率组列表
      rateItemList: [], //保存费率列表
      dialogFormVisible: false,
      formLabelWidth: "140px",
      toggle: true,
      shows: "",  //设置费率编辑状态
      rateGroupId: "",
      /**
       * 费率添加表单
       */
      addList: [],
      listFrom: {
        numberPrefix: "",
        billingName: ""
      },
      listTitle: "添加费率",
      listDialogFormVisible: false,

      row: {},
      area: [
        { label: "国外", value: "abroad" },
        { label: "国内", value: "home" }
      ],
      addRules: {
        rateName: [
          { required: true, message: "该选项为必填项，请曲确认", trigger: "blur" }
        ],
        ratePrefix: [
          { required: true, message: "该选项为必填项，请曲确认", trigger: "blur" }
        ],
        rate: [
          { required: true, message: "该选项为必填项，请曲确认", trigger: "blur" },
          { validator: validateNum, message: "请输入合法的数字", trigger: "blur" }
        ],
        billingPeriod: [
          { required: true, message: "该选项为必填项，请曲确认", trigger: "blur" },
          { validator: validateNum, message: "请输入合法的数字", trigger: "blur" }

        ]
      },
      addFroms: {
        groupName: [
          { required: true, message: "该选项为必填项，请曲确认", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    pageCheng(e) {
      this.form = this.$options.data().form;
      this.form.pageSize = e;
      this.getRateList(this.form);
    },
    next() {
      this.form.pageNum++;
      this.getRateList(this.form);
    },
    prev() {
      this.form.pageNum--;
      this.getRateList(this.form);
    },
    change(e) {
      this.form.pageNum = e;
      this.getRateList(this.form);
    },
    find() {
      this.getRateList(this.form);
    },
    black() {
      this.toggle = true;
    },
    clear() {
      this.form = this.$options.data().form;
      this.getRateList(this.form);
    },
    getRateList(form) {
      getRateList(form).then(res => {
        this.$bus.$emit("total", res.data.data.total);
        this.list = res.data.data.records;
      }).catch(e => {
        this.$message.error(e);
      });
    },
    /**
     *
     * 获取费率组列表
     * @param form
     */
    onSubmits() {
      this.listDialogFormVisible = true;
      this.listTitle = "添加费率";
    },
    isToggle(row) {
      this.toggle = false;
      this.row = row;
      console.log(row);
      this.form.rateGroupId = row.id;
      this.getRateItemList(this.form);
    },
    /**
     *
     * 添加费率
     */
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          if (this.title === "添加费率组") {
            addRateList(this.addForm).then(res => {
              console.log(res);
              this.getRateList(this.form);
              this.addForm = this.$options.data().addForm;
              location.reload();
            });
            this.getRateList(this.form);
            this.dialogFormVisible = false;
          } else {
            putRateList(this.addForm).then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.getRateList();
                this.$message.success("提交完成");
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        }
      });
    },
    showAddForm(row, title) {
      this.title = title;
      if (title === "编辑") {
        this.addForm = row;
      }
      this.dialogFormVisible = true;
    },
    //  清除表单
    resetForm(type) {
      type === "form" ? this.$refs.form.resetFields() : this.$refs.formName.resetFields();
    }
  },
  watch: {
    listDialogFormVisible(val) {
      if (val !== true) {
        this.getRateItemList(this.form);
        this.resetForm();
      }
    },
    toggle(val) {
      if (val === true) {
        this.rateItemList = [];
      } else {
        this.addListFrom.rateGroupId = this.row.id;
      }
    }
  },
  created() {
    this.getRateList(this.form);
  }
};
</script>

<style scoped>
.a-link {
  margin-right: 10px;
}

.footers {
  display: flex;
  justify-content: space-between;
}

.footers p {
  color: #000;
  line-height: 40px;
}

.scope {
  text-align: right;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.flex > * {
  flex: 1;
}
</style>
