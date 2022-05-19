<template>
  <div class="warps">
    <my-el-header>
      <el-button @click.native="resetConfigure" type="primary" icon="el-icon-edit" size="small">重置话机配置</el-button>
    </my-el-header>
    <div class="container">
      <div class="phone-r">
        <div class="nav-form">
          <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
            <el-form-item label="分机名称" prop="directoryName">
              <el-input v-model="form.directoryName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="域地址" prop="domain">
              <el-input v-model="form.domain" placeholder="请输入内容"></el-input>
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
          :header-cell-style="{background:'#ccc', color: '#fff',}"
          :data="list"
          style="width: 100%"
          height="calc(100vh - 100px - 100px - 100px - 100px)"
          v-if="list.length !== 0"
        >
          <el-table-column prop="date" align="center" label="序号" width="50px">
            <template scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="directoryName" label="分机名称"></el-table-column>
          <el-table-column align="center" prop="directoryNumber" label="鉴权号码">
          </el-table-column>
          <el-table-column align="center" prop="diaplan" label="拨号地址">
          </el-table-column>
          <el-table-column align="center" prop="deptName" label="部门">
          </el-table-column>
          <el-table-column align="center" prop="groupName" label="中继组">
          </el-table-column>
          <el-table-column align="center" prop="domain" label="域地址"></el-table-column>
          <el-table-column align="center" prop="balance" label="余额"></el-table-column>
          <el-table-column align="center" prop="expire" label="超时时长"></el-table-column>
          <el-table-column align="center" prop="overdraft" label="计费方式">
            <template scope="scope">
              <div v-if="scope.row.billingType === 1">后付费</div>
              <div v-else>先付费</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="bussiness" label="业务类型"></el-table-column>
          <el-table-column align="center" prop="address" label="操作" fixed="right" min-width="130px">
            <template scope="scope">
              <div class="operate">
                <el-link type="info" @click="addForms(scope.row, '编辑')">编辑</el-link >
                <el-link type="info" @click="recharge(scope.row)">充值 </el-link>
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

      <el-dialog :title="title" :close-on-click-modal='false' :visible.sync="dialogFormVisible" destroy-on-close>
        <el-form :model="addForm" :rules="rules" ref="addForm">
          <div class="width">
            <el-form-item
              label="分机名称"
              :label-width="formLabelWidth"
              prop="directoryName"
            >
              <el-input
                placeholder="请输入内容"
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
                placeholder="请输入内容"
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
              <el-select v-model="addForm.billingType" style="width: 100%">
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
                style="width: 100%"
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
                placeholder="请输入内容"
                v-model="addForm.password"
                clearable
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item label="账户余额" :label-width="formLabelWidth" prop="balance">
              <el-input v-model="addForm.balance" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="域地址" :label-width="formLabelWidth" prop="domain">
              <el-input v-model="addForm.domain" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item label="使能状态" :label-width="formLabelWidth" prop="disable">
              <el-select v-model="addForm.disable" placeholder="请选择" style="width: 100%">
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
<!--              <my-tree ref="myTree" style="width: 100%" :options="deptIdList" @getValue="getSelectedValue"></my-tree>-->
              <treeselect v-model="deptIds" :multiple="false" :options="deptIdList" :normalizer="normalizer" placeholder="请输入内容"/>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item label="拨号方案" :label-width="formLabelWidth" prop="diaplan">
              <el-select v-model="addForm.diaplan" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in diaPlanList"
                  :key="item.value"
                  :label="item.diaplanName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="费率组" :label-width="formLabelWidth" prop="rateGroup">
              <el-select v-model="addForm.rateGroup" placeholder="请选择" style="width: 100%">
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
                style="display: inline-block; margin-right: 10px"
                placeholder="请输入内容"
                v-model="addForm.expire"
              ></el-input>
            </el-form-item>
            <el-form-item label="资源类型" :label-width="formLabelWidth" prop="type">
              <el-select v-model="addForm.type" placeholder="请选择" style="width: 100%">
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
                placeholder="请输入内容"
                v-model="addForm.latitude"
              ></el-input>
            </el-form-item>
            <el-form-item label="纬度" :label-width="formLabelWidth" prop="longitude">
              <el-input v-model="addForm.longitude" placeholder="请输入内容"></el-input>
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
    <my-footer v-on:next="next" @prev="prev" :form="form" @change="footerChange" @pageCheng="pageCheng"></my-footer>
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
import myFooter from "@/components/myFooter";
import myElHeader from "@/components/myElHeader";
import { delPbxConfigure } from "@/newwork/conferencr";
import treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "phoneConfig",
  components: {
    eTree,
    myEmpty,
    myTree,
    myFooter,
    myElHeader,
    treeselect
  },
  computed: {
    getterDeptIdList() {
      return fn(this.deptIdList);
    },
    deptIds() {
    //   get(){
    //     if(this.addForm.deptId === 0){
    //       console.log(this.addForm);
    //      return  this.addForm.deptId = this.addForm.deptName
    //     }
    //   },
    //   set(value){
    //    return  this.addForm.deptId = value
    //   }
    // }

      return this.addForm.deptId
    }
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
        deptId: null, // 部门ID
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
  methods: {
    next() {
      this.form.pageNum++;
      console.log(this.form);
      this.getDirectory(this.form);
    },
    pageCheng(e) {
      this.form = this.$options.data().form;
      this.form.pageSize = e;
      this.getDirectory();
    },
    prev() {
      this.form.pageNum--;
      this.getDirectory(this.form);
    },
    footerChange(e) {
      console.log(e);
      this.form.pageNum = e;
      this.getDirectory(this.form);
    },
    find() {
      this.getDirectory(this.form);
    },
    getSelectedValue(value) {
      this.addForm.deptId = value.deptId;
    },
    clear() {
      this.form = this.$options.form;
      this.getDirectory(this.form);
    },
    change() {
      this.addForm.bussiness = this.bussinessList.join(",");
    },
    accountUserChange() {
      this.addForm.directoryNumber = this.addForm.accountUser;
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
          return false;
        }
      });
    },
    addForms(row, title) {
      this.dialogFormVisible = true;
      this.title = title;
      if (title === "编辑" && this.dialogFormVisible === true) {
        this.addForm = row;
        this.$nextTick(() => {
          this.bussinessList = this.addForm.bussiness.split(",");
        });
      } else {
        this.addForm = this.$options.data().addForm;
        this.$nextTick(() => {
          this.bussinessList = [];
        });
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
        this.$bus.$emit("total", res.data.data.total);
        if (res.data.code === 200) {
          this.list = res.data.data.records;
        }
      }).catch(e => this.$message.error(e));
    },

    //重置Pbx配置
    resetConfigure() {
      delPbxConfigure("sofia").then(res => {
        console.log(res);
      });
    }

  },

  created() {
    this.getDirectory(this.form);
  },

  mounted() {
    this.$bus.$on("pageCheng", (data) => {
      this.form = this.$options.data().form;
      this.form.pageSize = data;
      this.getDirectory(this.form);
    });
  },
  destroyed() {
    this.$bus.$off("pageChang");
  },
  watch: {
    dialogFormVisible(val, newVal) {
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
  },
};
</script>

<style scoped>
.phone {

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
