<template>
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
                 :width="$store.state.dialogWidth" :visible.sync="listDialogFormVisible">
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
          </div>
          <div class="width">
            <el-form-item
              label="地区类型"
              :label-width="formLabelWidth"
              prop="ratePrefix"
            >
              <el-select style="width: 100%;" v-model="addListFrom.area" placeholder="请选择">
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
              label="费率"
              :label-width="formLabelWidth"
              required
              style="width: 100%"
            >
              <div class="flex">
                <el-form-item prop="rate">
                  <el-input v-model="addListFrom.rate" placeholder="请输入计费金额(元)"></el-input>
                </el-form-item>
                <el-form-item label="计费周期" class="l-20" prop="billingPeriod">
                  <el-input v-model="addListFrom.billingPeriod" placeholder="请输入计费时间(秒)"></el-input>
                </el-form-item>
              </div>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="footers">
            <p>注意: 费率默认以元为单位, 计费周期为60(s)秒</p>
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
                v-if="rateItemList.length !== 0" :header-cell-style="{background:'#ccc', color: '#fff'}">
        <el-table-column align="center" prop="date" label="序号">
          <template scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column align="center" prop="rateName" label="费率名称">
        </el-table-column>
        <el-table-column align="center" prop="rate" label="费率(元)">
        </el-table-column>
        <el-table-column align="center" prop="billingPeriod" label="费率区间（秒）">
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

</template>

<script>
import { addRateItemList, deleteRateItem, getRateItemList, upDaterateItem } from "@/newwork/ground-colltroner";
import myElHeader from "@/components/myElHeader";
import myEmpty from "@/newwork/myEmpty";
import { isValidNumber } from "@/util/validate";

export default {
  name: "rateList",
  data() {
    const validateNum = (rule, value, callback) => {
      if (!isValidNumber(value)) {
        callback(new Error("ip地址输入有误,请确认"));
      } else {
        callback();
      }
    };
    return {
      formLabelWidth: "120px",
      listDialogFormVisible: false,
      listTitle: "添加费率组",
      addListFrom: {
        rateName: "",  //费率名称
        billingPeriod: "60",//计费周期单位为秒
        rateGroupId: "", //费率组ID
        ratePrefix: "", //费率前缀
        rate: "", //费率
        area: "home"
      },
      row: {},
      list: [],
      form: {},
      rateItemList: [],
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
      }
    };
  },
  components: {
    myEmpty,
    myElHeader
  },
  methods: {
    onSubmits() {
      this.listDialogFormVisible = true;
      this.listTitle = "添加费率";
    },
    black() {
      this.$router.go(-1);
    },
    //添加费率列表
    submitForms() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          if (this.listTitle === "添加费率") {
            addRateItemList(this.addListFrom).then(res => {
              this.resetForm();
              if (res.data.code === 200) {
                this.$message.success("提交完成");
                this.listDialogFormVisible = false;
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
    getRateItemList(form) {
      getRateItemList(form).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          console.log(res);
          this.rateItemList = res.data.data.records;
        } else {
          console.log(res);
        }
      }).catch(e => {
        this.$message.error(e);
      });
    },

    //编辑费率

    upDataForm(row) {
      this.addListFrom = row;
      this.listTitle = "编辑费率";
      this.listDialogFormVisible = true;
    },
    //删除费率组
    removeIt(row) {
      deleteRateItem(row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("提交完成");
          //由于上边已经给form表单设置过id了 这里直接使用就ok
          this.getRateItemList(this.form);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    resetForm(type) {
      type === "form" ? this.$refs.form.resetFields() : this.$refs.formName.resetFields();
    }

  },
  created() {
    console.log(this.$route.query.rateGroupId);
    this.addListFrom.rateGroupId = this.$route.query.rateGroupId;
    this.form.rateGroupId = this.$route.query.rateGroupId;
    console.log(this.$route.query);
    this.getRateItemList(this.form);
  }
};
</script>

<style scoped>

.scope {
  text-align: right;
}

.flex {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.flex > * {
  flex: 1;
}

.footers {
  display: flex;
  justify-content: space-between;
}

.l-20 {
  margin-left: 20px !important;
}
</style>
