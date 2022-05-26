<template>
  <div class="warps">
    <my-el-header />
    <div class="container">
      <div class="nav-form">
        <el-form :inline="true" ref="form" :rules="rule" :model="form" class="demo-form-inline">
          <el-form-item label="中继名称" prop="groupName">
            <el-input v-model="form.groupName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="策略类型" prop="strategyRetry">
            <el-select v-model="form.strategyRetry" placeholder="策略类型" style="width: 100%">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in policyType"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="重试策略" prop="strategyType">
            <el-select v-model="form.strategyType" placeholder="重试策略" style="width: 100%">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in retryStrategyType"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="find">查询</el-button>
            <el-button @click="clear">重置</el-button>
          </el-form-item><!---->
        </el-form>
        <el-button type="primary" @click="showAddForm(null, '添加中继组')"
        >添加中继组
        </el-button
        >
      </div>
      <el-dialog :width="$store.state.dialogWidth" :close-on-click-modal="false" :title="title"
                 :visible.sync="dialogFormVisible" destroy-on-close>
        <el-form :model="addFrom" ref="addForm" :rules="rules">
          <div class="width">
            <el-form-item
              label="中继组名称"
              :label-width="formLabelWidth"
              prop="groupName"
            >
              <el-input v-model="addFrom.groupName" autocomplete="off" placeholder="请输入内容"></el-input>
            </el-form-item>


          </div>
          <div class="width">
            <el-form-item label="支持前缀" :label-width="formLabelWidth" prop="groupPrefix" placeholder="请输入内容">
              <el-input v-model="addFrom.groupPrefix" placeholder='请填入数字，用","隔开，例如10,20,30'></el-input>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item
              label="重试策略"
              :label-width="formLabelWidth"
              prop="strategyRetry"
            >
              <el-select v-model="addFrom.strategyRetry" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in retryStrategyType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item
              label="策略类型"
              :label-width="formLabelWidth"
              prop="strategyType"
            >
              <el-select v-model="addFrom.strategyType" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in policyType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item :label="'中继组' + (index + 1)" :label-width="formLabelWidth"
                        :key="addFrom.pbxGwgroupGatewayList.key"
                        v-for="(pbxGwgroupGatewayList, index) in addFrom.pbxGwgroupGatewayList"
                        :prop="'pbxGwgroupGatewayList.' + index + '.gatewayId'"
                        :rules="rules.groupPrefix">
            <div class="width">
              <el-select v-model="pbxGwgroupGatewayList.gatewayId" placeholder="请选择">
                <el-option
                  v-for="item in pbxList"
                  :key="item.id"
                  :label="item.gatewayName"
                  :value="item.id">
                </el-option>
              </el-select>
              <div style="padding: 0 20px">
                <el-input class="el-input" v-model="pbxGwgroupGatewayList.weight" placeholder="请输入内容"></el-input>
              </div>
              <div style="text-align: right">
                <el-tooltip style="height: 40px; vertical-align: top" @click.native="addGateway" class="item"
                            effect="dark" content="添加中继" placement="bottom">
                  <el-button class="ablout"><i class="icon iconfont icon-jia"></i></el-button>
                </el-tooltip>
                <el-tooltip style="margin-left: 40px; vertical-align: top; height: 40px;"
                            @click.native="removeClick(pbxGwgroupGatewayList)" class="item" effect="dark" content="删除中继"
                            placement="bottom">
                  <el-button class="ablout"><i class="icon iconfont icon-shanchu2"></i></el-button>
                </el-tooltip>

              </div>
            </div>
          </el-form-item>
          <div class="width">
            <el-form-item
              label="备注"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="addFrom.remark"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()"
          >确 定
          </el-button
          >
        </div>
      </el-dialog>
      <el-table height="calc(100vh - 100px - 100px - 100px - 100px)"
                :header-cell-style="{background:'#ccc', color: '#fff',}" :data="list" style="width: 100%"
                v-if="list.length !== 0">
        <el-table-column align="center" prop="index" label="序号" width="50">
          <template scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column align="center" prop="groupName" label="中继名称">
          <template scope="scope">
            {{ scope.row.groupName }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="pbxGwgroupGatewayList" label="策略类型">
          <template scope="scope">
            <span v-if="scope.strategyType === 0">循环呼叫</span>
            <span v-else>随机呼叫</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="pbxGwgroupGatewayList" label="重试策略">
          <template scope="scope">
            <span v-if="scope.strategyRetry === 0">无响应重试</span>
            <span v-else>强制重试</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="retryStrategy" label="关联网关">
          <template scope="scope">
            <div v-if="scope.row.pbxGwgroupGatewayList.length > 2">
              <div class="table" v-for="(item, i) in scope.row.pbxGwgroupGatewayList.slice(0, 1)">
                <p>
                  <span>{{ scope.row.pbxGwgroupGatewayList[i].gatewayName }}</span>
                  --<span>{{ scope.row.pbxGwgroupGatewayList[i].weight }}</span>
                </p>
              </div>
              <span>sjwkuys</span>
            </div>
            <div v-else>
              <div class="table" v-for="(item, i) in scope.row.pbxGwgroupGatewayList">
                <p>
                  <span>{{ scope.row.pbxGwgroupGatewayList[i].gatewayName }}</span>
                  --<span>{{ scope.row.pbxGwgroupGatewayList[i].weight }}</span>
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" label="操作" fixed="right" min-width="100px">
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
                  <el-link type="info" slot="reference">删除</el-link>
                </el-popconfirm>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" label="备注">
          <template scope="scope">
            {{ scope.row.remark || "暂无备注" }}
          </template>
        </el-table-column>
      </el-table>
      <my-empty v-else />
    </div>
    <my-footer v-on:next="next" @prev="prev" :form="form" @change="change" @pageCheng="pageCheng"></my-footer>
  </div>
</template>

<script>
import { addGwgroup, deleteGwgroup, getGwgroup, getPbxAll, upDateGwgroup } from "@/newwork/ground-colltroner";
import myEmpty from "@/newwork/myEmpty";
import { isValidNumber } from "@/util/validate";
import myFooter from "@/components/myFooter";
import myElHeader from "@/components/myElHeader";

export default {
  name: "trunkGroup",
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
      form: {
        groupName: "",
        strategyRetry: "",
        strategyType: ""
      },
      title: "添加中继组",
      dialogFormVisible: false,
      edit: false,
      pbxList: [],
      addFrom: {
        groupPrefix: "",
        groupName: "", //中继名称
        strategyRetry: "", //重试策略，
        strategyType: "", // 策略类型
        pbxGwgroupGatewayList: "", //中继数组
        totalWeight: 0, //总的权重值，为组内中继之和
        pageNum: 1,
        pageSize: 10
      },
      list: [],
      startTime: "",
      formLabelWidth: "120px",
      policyType: [
        { label: "循环呼叫", value: 0 },
        { label: "随机呼叫", value: 1 }
      ],
      retryStrategyType: [
        { label: "无响应重试", value: 0 },
        { label: "强制重试", value: 1 }
      ],
      rules: {
        groupName: [
          { required: true, message: "该项为必填项,请确认", trigger: "blur" }
        ],
        groupPrefix: [
          { required: true, message: "该项为必填项,请确认", trigger: "blur" },
          { validator: validateNum, message: "请输入合法的数字", trigger: "blur" }
        ],
        strategyRetry: [
          { required: true, message: "该项为必填项,请确认", trigger: "blur" }
        ],
        strategyType: [
          { required: true, message: "该项为必填项,请确认", trigger: "blur" }
        ],
        retryStrategy: [
          { required: true, message: "该项为必填项,请确认", trigger: "blur" }
        ]
      },
      rule: {
        groupName: [
          { required: false, message: "该项为必填项,请确认", trigger: "blur" }
        ],
        strategyRetry: [
          { required: false, message: "该项为必填项,请确认", trigger: "blur" }
        ],
        strategyType: [
          { required: false, message: "该项为必填项,请确认", trigger: "blur" }
        ]
      },
      value: "",
      tableData: [],
      gateway: { gatewayId: "", weight: "" }
    };
  },
  methods: {
    getGwgroup(form) {
      getGwgroup(form).then(res => {
        if (res.data.data.total) {
          this.$bus.$emit("total", res.data.data.total);
        }
        this.list = res.data.data.records;
      }).catch(e => {
      });
    },

    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },

    showAddForm(row, title) {
      this.dialogFormVisible = true;
      this.title = title;
      if (title === "编辑") {
        this.addFrom = row;
      } else {
        this.addFrom = this.$options.data().addFrom;
        //添加中继
        this.gateway = this.$options.data().gateway;
        this.tableData.push(this.gateway);
      }
    },
    find() {
      this.getGwgroup(this.form);
    },
    clear() {
      this.resetForm("form");
      this.getGwgroup(this.form);
    },
    removeClick(i) {
      let index = this.addFrom.pbxGwgroupGatewayList.indexOf(i);
      if (index !== -1 && this.addFrom.pbxGwgroupGatewayList.length > 1) {
        this.addFrom.pbxGwgroupGatewayList.splice(index, 1);
      }
    },
    pageCheng(e) {
      this.form = this.$options.data().form;
      this.form.pageSize = e;
      this.getGwgroup(this.form);
    },
    addGateway() {
      this.addFrom.pbxGwgroupGatewayList.push({
        gatewayId: "",
        weight: "",
        key: Date.now()
      });
    },
    submitForm() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          this.title === "添加中继组" ? addGwgroup(this.addFrom).then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.$message.success("提交完成");
                this.dialogFormVisible = false;
                this.getGwgroup(this.form);
              } else {
                this.$message.error(res.data.msg);
              }
            }).catch(e => {
              this.$message.error(e);
            }) :
            upDateGwgroup(this.addFrom).then(res => {
              if (res.data.code === 200) {
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

    /**
     *
     * 范爷
     * @param type
     */


    next() {
      this.form.pageNum++;
      console.log(this.form);
      this.getGwgroup(this.form);
    },
    prev() {
      this.form.pageNum--;
      this.getGwgroup(this.form);
    },
    change(e) {
      console.log(e);
      this.form.pageNum = e;
      this.getGwgroup(this.form);
    },


    resetForm(type) {
      type = "form" ? this.$refs["form"].resetFields() : this.$refs["addForm"].resetFields();
    },
    removeIt(row) {
      deleteGwgroup(row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("提交完成");
          this.getGwgroup(this.from);
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.$message.error(e);
      });
    },
    upEdit() {
      this.edit = !this.edit;
      // this.tableData.gatewayId = this.addFrom.pbxGatewayList
    }

  },

  created() {
    this.getGwgroup(this.form);
  },
  mounted() {
    this.$bus.$on("pageCheng", (data) => {
      this.form = this.$options.data().form;
      this.form.pageSize = data;
      this.getGwgroup(this.form);
    });
  },
  destroyed() {
    this.$bus.$off("pageChang");
  },
  watch: {
    dialogFormVisible(val) {
      console.log(val);
      if (val === true) {
        getPbxAll().then(res => {
          this.pbxList = res.data.data.records;
        });
      } else {
        this.tableData = this.$options.data().tableData;
        this.edit = false;
        this.getGwgroup(this.form);
      }
    },
    tableData: {
      handler: function(val) {
        this.addFrom.pbxGwgroupGatewayList = val;
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.nav-form {
  margin: 15px;
  height: 40px;
  display: flex;
  justify-content: space-between;
}

#trunk .width {
  display: flex;
  justify-content: space-between;
}

.demo-form-inline {
  height: 40px;
}

.width {
  display: flex;
  width: 100%;
  justify-content: space-between;
  max-height: 63px;
}

.el-input {
  display: inline-block;
}

.width > * {
  flex: 1;
}

ul {
  width: 80%;
  flex-direction: column;
}

ul li {
  display: flex;
  list-style: none;
  margin: 10px 0;
}

.li-input {
  width: 50%;
  margin-left: 20px;
}

.table p {
  background-color: transparent;
}

.tables {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tables p {
  width: 100%;
}

.tables > div {
  text-align: center;
  flex: 1;
}

.tables p {
  border: 1px solid #f3f3f3;
}

.li-input {
  margin: 0 10px;
}

.ablout .icon {
  text-align: center;
  margin: 0;
  vertical-align: middle;
  margin-top: -50%;
}

</style>
