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
      <div class="warps">
        <my-el-header />
        <div class="container">
          <div>
            <div class="form-nav">
              <div></div>
              <div class="scope">
                <el-button type="primary" @click="onSubmits">添加费率</el-button>
                <el-button type="primary" @click="black">返回</el-button>
              </div>
            </div>
          </div>
          <el-dialog destroy-on-close :close-on-click-modal="false" :title="listTitle"
                     :visible.sync="listDialogFormVisible">
            <el-form :model="addListFrom" ref="formName" :rules="addRules">
              <div class="width">
                <el-form-item
                  label="费率名称"
                  :label-width="formLabelWidth"
                  prop="rateName"
                >
                  <el-input v-model="addListFrom.rateName" placeholder="请输入内容" autocomplete="off"></el-input>
                </el-form-item>
              </div>
              <div class="width">
                <el-form-item
                  label="费率组"
                  :label-width="formLabelWidth"
                  name="rateGroup"
                  required
                >
                  <el-input v-model="row.groupName" placeholder="请输入内容" disabled></el-input>
                </el-form-item>
              </div>
              <div class="width">
                <el-form-item
                  label="费率前缀"
                  :label-width="formLabelWidth"
                  prop="ratePrefix"

                >
                  <el-input
                    class="input"
                    v-model="addListFrom.ratePrefix"
                    autocomplete="off" placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="地区类型"
                  :label-width="formLabelWidth"
                  prop="ratePrefix"

                >
                  <el-select v-model="addForm.area" placeholder="请选择">
                    <el-option
                      v-for="item in area"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="width">
                <el-form-item
                  label="计费方式"
                  :label-width="formLabelWidth"
                  required
                >
                  <div class="flex">
                    <el-form-item prop="rate">
                      <el-input style="margin-right: 20px" v-model="addListFrom.rate" placeholder="请输入单位(分)"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-left: 20px" prop="billingPeriod">
                      <el-input v-model="addListFrom.billingPeriod" placeholder="请输入计费时间(秒)"></el-input>
                    </el-form-item>
                  </div>
                </el-form-item>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <div class="footers">
                <p>注意: 费率默认已分为单位, 计费时间为60(s)秒</p>
                <div class="footers">
                  <el-button @click="listDialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitForms('编辑')"
                  >确 定
                  </el-button
                  >
                </div>
              </div>
            </div>
          </el-dialog>
          <el-table height="800" :data="rateItemList" style="width: 100%; margin-top: 20px"
                    v-if="list.length !== 0" :header-cell-style="{background:'#ccc', color: '#fff'}">
            <el-table-column align="center" prop="date" label="序号">
              <template scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column align="center" prop="rateName" label="费率名称">
            </el-table-column>
            <el-table-column align="center" prop="rate" label="费率">
            </el-table-column>
            <el-table-column align="center" prop="billingPeriod" label="费率区间">
            </el-table-column>
            <el-table-column align="center" prop="ratePrefix" label="费率前缀">
            </el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="area" align="center" label="操作" fixed="right">
              <template scope="scope">
                <div class="operate">
                  <el-link type="info" @click="upDataForm(scope.row)">编辑</el-link>
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
          <my-empty v-else />
        </div>
      </div>
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
      addListFrom: {
        rateName: "",  //费率名称
        billingPeriod: "",//计费周期单位为秒
        rateGroupId: "", //费率组ID
        ratePrefix: "", //费率前缀
        rate: "" //费率
      },
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
    getRateItemList(form) {
      getRateItemList(form).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.rateItemList = res.data.data.records;
        } else {
          console.log(res);
        }
      }).catch(e => {
        this.$message.error(e);
      });
    },
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
    //添加费率列表
    submitForms() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          if (this.listTitle === "添加费率") {
            addRateItemList(this.addListFrom).then(res => {
              this.resetForm();
              if (res.data.code === 200) {
                this.$message.success("添加完成");
                this.dialogFormVisible = false;
                this.getRateItemList(this.form);
              } else {
                this.$message.error(res.data.msg);
              }
            }).catch(e => {
              this.$message.error(e);
            });
          } else {
            upDaterateItem(this.addListFrom).then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.getRateItemList(this.form);
                this.listDialogFormVisible = false;
                this.$message.success("提交完成");

              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        } else {
          return false;
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
    //编辑费率

    upDataForm(row) {
      this.addListFrom = row;
      this.listTitle = "编辑费率";
      this.listDialogFormVisible = true;
    },
    //删除费率组
    removeIt(row) {
      this.toggle ? deleteRate(row.id).then(res => {
        if (res.data.code == 200) {
          this.$message.success("提交完成");
          this.getRateList(this.form);
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => this.$message.error(e)) : deleteRateItem(row.id).then(res => {
        if (res.data.code === 200) {

          this.$message.success("提交完成");
          //由于上边已经给form表单设置过id了 这里直接使用就ok
          this.getRateItemList(this.form);
        } else {
          this.$message.error(res.data.msg);
        }
      });
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
  computed: {
    createId() {
      return (this.addForm.id = (Math.random() * 1000000).toFixed(0));
    }
  },
  created() {
    this.getRateList(this.form);
    this.getRateItemList(this.form);
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
  color: #cccccc;
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
