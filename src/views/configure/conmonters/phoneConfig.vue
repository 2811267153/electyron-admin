<template>
  <div class="phone">
    <div class="phone-r">
      <div class="nav-form">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item label="分机名称" prop="directoryName">
            <el-input v-model="form.directoryName"></el-input>
          </el-form-item>
          <el-form-item label="域地址" prop="domain">
            <el-input v-model="form.domain"></el-input>
          </el-form-item>
          <el-form-item label="计费方式" prop="billingType">
            <el-select v-model="form.billingType" placeholder="中继类型">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in billingType"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="find">查询</el-button>
            <el-button @click="clear">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="addForms(null, '添加话机')"
        >添加话机
        </el-button
        >
      </div>

      <el-table
        :row-class-name="tableRowClassName"
        :data="list"
        style="width: 100%"
        v-if="list.length !== 0"
      >
        <el-table-column prop="date" label="序号" width="100">
          <template scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="directoryName" label="分机名称"></el-table-column>
        <el-table-column prop="directoryNumber" label="鉴权号码">
        </el-table-column>
        <el-table-column prop="diaplan" label="拨号地址">
        </el-table-column>
        <el-table-column prop="deptName" label="部门">

        </el-table-column>
        <el-table-column prop="groupName" label="中继组">

        </el-table-column>
        <el-table-column prop="domain" label="域地址"></el-table-column>
        <el-table-column prop="balance" label="余额"></el-table-column>
        <el-table-column prop="expire" label="超时时长"></el-table-column>
        <el-table-column prop="overdraft" label="计费方式">
          <template scope="scope">
            <div v-if="scope.row.billingType === 1">后付费</div>
            <div v-else>先付费</div>
          </template>
        </el-table-column>
        <el-table-column prop="bussiness" label="业务类型"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template scope="scope">
            <el-link
              class="a-link"
              type="info"
              @click="addForms(scope.row, '编辑')"
            >编辑
            </el-link
            >
            <el-link class="a-link" type="info" @click="removeIt(scope.row)"
            >删除
            </el-link
            >
            <el-link class="a-link" type="info" @click="recharge(scope.row)"
            >充值
            </el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <my-empty v-else />

    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <div class="width">
          <el-form-item

            label="分机名称"
            :label-width="formLabelWidth"
            prop="directoryName"
          >
            <el-input
              v-model="addForm.directoryName"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="计费账号"
            :label-width="formLabelWidth"
            prop="accountUser"
          >
            <el-input
              @change="accountUserChange"
              v-model="addForm.accountUser"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>

        </div>

        <div class="width">
          <el-form-item
            label="计费方式"
            :label-width="formLabelWidth"
            prop="billingType"
          >
            <el-select v-model="addForm.billingType">
              <el-option
                v-for="item in billingType"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="支持的业务类型"
            :label-width="formLabelWidth"
            prop="bussiness"
          >
<!--            <el-select v-model="addForm.bussiness">-->
<!--              <el-option :label="item.label" :value="item.value" v-for="item in bussiness"></el-option>-->
<!--            </el-select>-->
            <el-select
              v-model="bussinessList"
              multiple
              @change="change"
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="item in bussiness"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
            label="鉴权号码"
            :label-width="formLabelWidth"
            prop="directoryNumber"
          >
            <el-input
              :disabled="true"
              v-model="addForm.directoryNumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="鉴权密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input
              v-model="addForm.password"
              clearable
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="账户余额" :label-width="formLabelWidth" prop="balance">
            <el-input v-model="addForm.balance"></el-input>
          </el-form-item>

          <el-form-item label="域地址" :label-width="formLabelWidth" prop="domain">
            <el-input v-model="addForm.domain"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="使能状态" :label-width="formLabelWidth" prop="disable">
            <el-select v-model="addForm.disable" placeholder="请选择">
              <el-option
                v-for="item in disable"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门名称" :label-width="formLabelWidth" prop="deptId">
            <my-tree ref="myTree" :options="deptIdList" @getValue="getSelectedValue"></my-tree>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="拨号方案" :label-width="formLabelWidth" prop="diaplan">
            <el-select v-model="addForm.diaplan" placeholder="请选择">
              <el-option
                v-for="item in diaPlanList"
                :key="item.value"
                :label="item.diaplanName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="费率组" :label-width="formLabelWidth" prop="rateGroup">
            <el-select v-model="addForm.rateGroup" placeholder="请选择">
              <el-option
                v-for="item in rateGroup"
                :key="item.value"
                :label="item.groupName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="超时时长" :label-width="formLabelWidth" prop="expire">
            <el-input
              style="display: inline-block; width: 40%; margin-right: 10px"
              v-model="addForm.expire"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源类型" :label-width="formLabelWidth" prop="type">
            <el-select v-model="addForm.type" placeholder="请选择">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="经度" :label-width="formLabelWidth" prop="latitude">
            <el-input
              v-model="addForm.latitude"
            ></el-input>
          </el-form-item>
          <el-form-item label="纬度" :label-width="formLabelWidth" prop="longitude">
            <el-input v-model="addForm.longitude"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm('addForm')"
        >确 定
        </el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="充值提示" :visible.sync="showBar" width="30%" center>
      <p class="title">
        <b>充值提醒：</b>
        <span
        >你将要为 {{ rechargeInfo.directoryNumber }}进行充值</span
        >
      </p>
      <el-input
        v-model="chongZhi.balance"
        placeholder="请输入金额"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showBar = false">取 消</el-button>
        <el-button type="primary" @click="submit(rechargeInfo)"
        >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import eTree from "../../../components/eTree.vue";
import { getOrganizeList } from "@/newwork/system-colltroner";
import { diaPlanList, getRateList } from "@/newwork/ground-colltroner";
import { fn } from "@/uti";
import { addDirectory, deleteDirectory, getDirectory, recharge, upDateDirectory } from "@/newwork/directory";
import myEmpty from "@/newwork/myEmpty";
import { isValidIP, isValidNumber } from "@/util/validate";
import myTree from "@/components/myTree";

export default {
  name: "phoneConfig",
  components: {
    eTree,
    myEmpty,
    myTree
  },
  computed: {
    getterDeptIdList() {
      return fn(this.deptIdList);
    },
    bussinessss() {
      if (this.addForm.bussiness.length !== 0) {
        return parseInt(this.addForm.bussiness);
      } else {
        this.addForm.bussiness = "";
      }
    },

  },
  data() {
    const validateIP = (rule, value, callback) => {
      if (!isValidIP(value)) {
        callback(new Error("ip地址输入有误,请确认"));
      } else {
        callback();
      }
    };
    const validateNum = (rule, value, callback) => {
      if (!isValidNumber(value)) {
        callback(new Error("ip地址输入有误,请确认"));
      } else {
        callback();
      }
    };

    return {
      title: "添加话机",
      dialogFormVisible: false,
      formLabelWidth: "150px",
      showBar: false,
      form: {
        directoryName: "",
        domain: "",
        billingType: ""
      },
      deptId: "",//部门ID列表§
      diaPlanList: [],//拨号方案
      rechargeInfo: {
        value: null
      },
      bussinessList: [],
      chongZhi: {},
      addForm: {
        domain: "", //域地址
        accountUser: "", //计费账号
        balance: "", // balance
        billingType: "", //计费方式（1、为后付费。2、预付费）
        bussiness: "", //支持的业务类型（语音、视频、广播）
        deptId: "", // 部门ID
        diaplan: "", //拨号方案
        directoryName: "", //分机名称
        // stats: '', //录音状态
        directoryNumber: "", //电话号码
        disable: "", //使能状态（0为正常，1为disable）
        // domain: '研发部门', //部门名称
        endpointId: "45", //模块ID
        expire: "", //超时时长
        latitude: "",  //纬度
        longitude: "", //经度
        password: "", //鉴权密码
        rateGroup: "", //费率组
        type: "" //资源类型:0为系统分机1:为广播终端2：视频流3:视频会议终端4、入队列路由点5、出路由点号码6:广播路由点7:临时会议路由点8:固定会议路由点
      },
      list: [],
      deptIdList: [], //获取的部门列表
      rateGroup: [],//费率组
      typeList: [
        { label: "系统分机", value: 0 },
        { label: "广告终端", value: 1 },
        { label: "视频流", value: 2 },
        { label: "视频会议终端", value: 3 },
        { label: "入队列路由点", value: 4 },
        { label: "出路由点号码", value: 5 },
        { label: "广播路由点", value: 6 },
        { label: "临时会议路由点", value: 7 },
        { label: "固定会议路由点", value: 8 }
      ],
      billingType: [
        { label: "预付费", value: 1 },
        { label: "后付费", value: 2 }
      ],
      relayType: [
        { label: "开启", value: "开启" },
        { label: "关闭", value: "关闭" }
      ],
      rules: {
        accountUser: [{ required: true, message: "该项为必填项目,请确认", trigger: "blur" }],
        directoryName: [{ required: true, message: "该项为必填项目,请确认", trigger: "blur" }],
        billingType: [{ required: true, message: "该项为必填项目,请确认", trigger: "blur" }],
        bussiness: [{ required: true, message: "该项为必填项目,请确认", trigger: "blur" }],
        directoryNumber: [{ required: true, message: "该项为必填项目,请确认", trigger: "blur" },
          { validator: validateNum, message: "请输入合法的数字", trigger: "blur" }
        ],
        password: [{ required: true, message: "该项为必填项目,请确认", trigger: "blur" }],
        balance: [{ required: true, message: "该项为必填项目,请确认", trigger: "blur" },
          { validator: validateNum, message: "请输入合法的数字", trigger: "blur" }],
        domain: [
          { required: true, message: "该项为必填项目,请确认", trigger: "blur" },
          { validator: validateIP, message: "IP输入有误, 请确认", trigger: "blur" }
        ],
        disable: [{ required: true, message: "该项为必填项目,请确认", trigger: "blur" }],
        deptId: [{ required: true, message: "该项为必填项目,请确认", trigger: "blur" }],
        diaplan: [{ required: true, message: "该项为必填项目,请确认", trigger: "blur" }],
        rateGroup: [{ required: true, message: "该项为必填项目,请确认", trigger: "blur" }],
        expire: [{ required: true, message: "该项为必填项目,请确认", trigger: "blur" },
          { validator: validateNum, message: "请输入合法的数字", trigger: "blur" }
        ],
        type: [{ required: true, message: "该项为必填项目,请确认", trigger: "blur" }],
        latitude: [{ required: false, message: "该项为必填项目,请确认", trigger: "blur" }],
        longitude: [{ required: false, message: "该项为必填项目,请确认", trigger: "blur" }]
      },
      bussiness: [
        { label: "语音", value: "语音" },
        { label: "视频", value: "视频" },
        { label: "广播", value: "广播" }
      ],
      disable: [
        { label: "正常", value: 0 },
        { label: "disable", value: 1 }
      ]
    };
  },
  mounted() {
    this.$bus.$on("pageChange", () => {
      this.form = this.$store.state.formPage;
      this.getDirectory(this.form);
    });
  },
  methods: {
    find() {
      this.getDirectory(this.form);
    },
    getSelectedValue(value) {
      this.addForm.deptId = value.deptId;
    },
    clear() {
      this.resetForm();
      this.getDirectory(this.form);
    },
    change(){
      this.addForm.bussiness = this.bussinessList.join(',')
    },
    accountUserChange(){
      console.log('-------');
      this.addForm.directoryNumber = this.addForm.accountUser
    },
    submitForm() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          if (this.title !== "编辑") {
            addDirectory(this.addForm).then(res => {
              if (res.data.code === 200) {
                this.$message.success("提交完成");
                this.getDirectory(this.form);
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.msg);
              }
            }).catch(e => this.$message.error(e));
          } else {
            upDateDirectory(this.addForm).then(res => {
              if (res.data.code === 200) {
                this.getDirectory(this.form);
                this.$message.success("提交完成");
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        } else {
          this.$message.error("提交失败， 请重试");
        }
      });
    },
    addForms(row, title) {
      this.dialogFormVisible = true;
      this.title = title;
      if (title === "编辑" && this.dialogFormVisible === true) {
        this.addForm = row;
        this.$nextTick(() => {
          this.$refs.myTree.valueName = this.addForm.deptName
          this.bussinessList =  this.addForm.bussiness.split(',')
        })
      } else {
        this.addForm = this.$options.data().addForm;
        this.$nextTick(() => {
          this.$refs.myTree.valueName = this.addForm.deptName
          this.bussinessList =  []
        })
      }
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    removeIt(row) {
      deleteDirectory(row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("提交完成");
          this.getDirectory(this.form);
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => this.$message.error(e));
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    // string === 'form' ? this.$refs.form.resetFields() :
    recharge(row) {
      this.showBar = true;
      this.rechargeInfo = row;
      this.chongZhi.id = row.id;
    },
    submit() {
      recharge(this.chongZhi).then(res => {
        if (res.data.code === 200) {
          this.getDirectory(this.form);
          this.$message.success("充值完成");
          this.chongZhi = {};
        } else {
          this.$message.error(res.data.data);
        }
      }).catch(e => this.$message.error(e));
      this.showBar = false;
    },
    getDiaPlanList(form) {
      diaPlanList(form).then(res => {
        if (res.data.code === 200) {
          this.list = res.data.data.records;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => this.$message.error(e));
    },
    getDirectory(form) {
      getDirectory(form).then(res => {
        this.$store.dispatch("total", res.data.data.total);
        if (res.data.code === 200) {
          this.list = res.data.data.records;
        }
      }).catch(e => this.$message.error(e));
    }

  },

  created() {
    this.form = this.$store.state.formPage;
    this.getDirectory(this.form);
  },
  watch: {
    dialogFormVisible(val, newVal) {
      console.log(val, '-------------');
      console.log(newVal, '************');
      if (val) {
        getOrganizeList().then(res => {
          this.deptIdList = fn(res.data.data);
        }).catch(e => this.$message.error(e));

        /**
         *
         * 拨号方案
         */
        diaPlanList().then(res => {
          this.diaPlanList = res.data.data.records;
        }).catch(e => this.$message.error(e));


      } else {
        this.resetForm();
        this.deptIdList = [];
        this.getDirectory(this.form);
      }
      /**
       *
       * 费率组
       */
      getRateList().then(res => {
        this.rateGroup = res.data.data.records;
      }).catch(e => this.$message.error(e));
    },
    deptId(val) {
      this.addForm.deptId = val[val.length - 1];
    }
  }

};
</script>

<style scoped>
.phone {
  display: flex;
  justify-content: space-between;
}

.phone-r {
  flex: 1;
}

.width {
  flex: 1;
}

.a-link {
  margin-right: 20px;
}

.title {
  margin: 20px 0;
}

.title span {
  padding: 5px 10px;
  background-color: #f56c6c;
  color: white;
}

.phone-r .container p {
  background-color: #f2f2f2;
  padding: 10px 15px;
}

.nav-form {
  margin: 15px;
  height: 40px;
  display: flex;
  justify-content: space-between;
}

.width {
  display: flex;
  width: 100%;
}

.width > * {
  flex: 1;
}
</style>
