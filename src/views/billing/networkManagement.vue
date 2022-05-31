<template>
  <div class="warps">
    <my-el-header title="网关管理" />
    <div class="container" id="networkManagement">
      <div class="form-nav">
        <el-form :model="forms" :hide-required-asterisk="true" :show-message="false" :inline="true"
                 class="demo-form-inline" ref="form" :rules="rule">
          <el-form-item :span="5" label="网关名称" prop="gatewayName">
            <el-input placeholder="请输入内容" v-model="forms.gatewayName"></el-input>
          </el-form-item>
          <el-form-item :span="1000000" label="中继IP" prop="gatewayIp">
            <el-input placeholder="请输入内容" v-model="forms.gatewayIp"></el-input>
          </el-form-item>
          <el-form-item label="中继类型" prop="gatewayType">
            <el-select v-model="forms.gatewayType" placeholder="协议类型">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in relayType"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="find">查询</el-button>
            <el-button @click="clear()">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="showAddForm(null, '添加网关')"
        >添加网关
        </el-button
        >
      </div>
      <el-dialog :width="$store.state.dialogWidth" :close-on-click-modal="false" :title="title"
                 :visible.sync="dialogFormVisible" destroy-on-close>
        <el-form :model="addFrom" ref="formName" :rules="rules">
          <div class="width">
            <el-form-item
              label="网关名称"
              :label-width="formLabelWidth"
              prop="gatewayName"
            >
              <el-input placeholder="请输入内容" v-model="addFrom.gatewayName" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item
              label="中继类型"
              :label-width="formLabelWidth"
              prop="gatewayType"
            >
              <el-select v-model="addFrom.gatewayType" placeholder="中继类型" style="width: 100%">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in relayType"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div v-if="addFrom.gatewayType !== 1" class="width">
            <el-form-item prop="accountUser" label="计费账号" :label-width="formLabelWidth">
              <el-input placeholder="请输入内容"
                        v-model="addFrom.accountUser"></el-input>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item
              label="中继IP"

              :label-width="formLabelWidth"
              prop="gatewayIp"
            >
              <el-input @change="gatewayIpCahnge"
                        placeholder="请输入内容"
                        v-model="addFrom.gatewayIp"
                        autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="中继端口"
              :label-width="formLabelWidth"
              prop="gatewayPort"
            >
              <el-input placeholder="请输入内容"
                        v-model="addFrom.gatewayPort"
                        autocomplete="off"
              ></el-input>
            </el-form-item>

          </div>
          <div class="width">
            <el-form-item
              label="代理地址"
              :label-width="formLabelWidth"
              prop="proxyIp"
            >
              <el-input placeholder="请输入内容"
                        v-model="addFrom.proxyIp"
                        autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item
              label="服务接口"
              :label-width="formLabelWidth"
              prop="profileId"
            >
              <el-select v-model="addFrom.profileId" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in profileIdList"
                  :key="item.id"
                  :label="item.profileName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="width">
            <el-form-item
              label="是否注册"
              :label-width="formLabelWidth"
              prop="register"
            >
              <el-radio-group v-model="addFrom.register">
                <el-radio :label="1">注册</el-radio>
                <el-radio :label="0">不注册</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div v-if="addFrom.register === 1" class="width">
            <el-form-item
              label="注册用户"
              :label-width="formLabelWidth"
              prop="username"
            >
              <el-input v-model="addFrom.username" placeholder="请输入内容" />
            </el-form-item>
            <el-form-item
              label="密码"
              :label-width="formLabelWidth"
              prop="password"
            >
              <el-input v-model="addFrom.password" placeholder="请输入内容" />
            </el-form-item>
          </div>

          <div class="width" v-if="title === '添加网关'">
            <el-form-item

              label="支持编码"
              :label-width="formLabelWidth"
              prop="codecs"
            >
              <el-select v-model="codecs"
                         @change="codecsBlur"
                         multiple
                         style="width: 100%"
                         collapse-tags>
                <el-option
                  v-for="item in dictionaryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item
              label="二次拨号方式"
              :label-width="formLabelWidth"
              required
            >
              <el-select v-model="addFrom.dtmfMode" style="width: 100%">
                <el-option
                  v-for="item in dtmfModeData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="width" v-if="title === '添加网关'">
            <el-form-item
              label="超时时长"
              :label-width="formLabelWidth"
              prop="expires"
            >
              <el-input placeholder="请输入内容"
                        v-model="addFrom.expires"
                        autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>

          <div class="width">
            <el-form-item
              label="最大并发数"
              :label-width="formLabelWidth"
              prop="maxCall"
            >
              <el-input placeholder="请输入内容" v-model="addFrom.maxCall" />
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addFrom')"
          >确 定
          </el-button
          >
        </div>
      </el-dialog>

      <div class="table-warp">
        <div class="table">
          <el-table :header-cell-style="{background:'#ccc', color: '#fff',}"
                    height="calc(100vh - 100px - 100px - 100px - 100px)" :data="list" style="width: 100%">
            <el-table-column align="center" prop="date" label="序号" width="50px">
              <template scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column align="center" prop="gatewayName" label="网关名称"></el-table-column>
            <el-table-column align="center" prop="accountUser" label="计费账号"></el-table-column>
            <el-table-column align="center" prop="expires" label="超时时长(s)"></el-table-column>
            <el-table-column align="center" prop="gatewayIp" label="中继IP"></el-table-column>
            <el-table-column align="center" prop="gatewayPort" label="中继端口"></el-table-column>
            <el-table-column align="center" prop="gatewayType" label="中继类型">
              <template scope="scope">
                <a v-if="scope.row.gatewayType === 0">入中继</a>
                <a v-else-if="scope.row.gatewayType === 1">出中继</a>
                <a v-else-if="scope.row.gatewayType === 2">双向中继</a>
                <a v-else>未知</a>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="username" label="是否注册">
              <template scope="scope">
                <div v-if="scope.row.register === 1"> 注册</div>
                <div v-else> 不注册</div>
              </template>
            </el-table-column>
            <el-table-column prop="recording" align="center" fixed="right" label="操作"
                             :width="$store.state.tableMixWidth">
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

    </div>
    <my-footer v-on:next="next" @prev="prev" :form="forms" @change="change" @pageCheng="pageCheng"></my-footer>
  </div>

</template>

<script>
import { deletePbx, getPbxAdd, getPbxAll, getProfileInfo, upDatePbx } from "@/newwork/ground-colltroner";
import { addDictionaryList, getDictionaryAll } from "@/newwork/system-colltroner";
import { isValidIP, isValidNumber, isValidPost } from "@/util/validate";
import myFooter from "@/components/myFooter";
import myElHeader from "@/components/myElHeader";


export default {
  name: "networkManagement",
  data() {

    /**
     *
     * 验证ip地址
     * @param rule  验证规则
     * @param value 需要验证的内容
     * @param callback  返回的验证结果
     */
    const validateIP = (rule, value, callback) => {
      if (!isValidIP(value)) {
        callback(new Error("ip地址输入有误,请确认"));
      } else {
        callback();
      }
    };
    const validatePost = (rule, value, callback) => {
      if (!isValidPost(value)) {
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
      dialogFormVisible: false,
      formLabelWidth: "120px",
      title: "添加网关",
      forms: {},
      list: [],
      dtmfModeData: [],
      dictionaryList: [],//'字典列表'
      profileIdList: [], // 服务端口ID
      codecs: [],
      addFrom: {
        accountUser: "", //计费账号
        codecs: "", //支持编码
        dtmfMode: "", //dtmfMode
        expires: "60", //超时时长
        gatewayIp: "", //中继IP
        gatewayName: "", //网关名称
        gatewayPort: "", //中继端口
        gatewayType: "", //中继类型
        maxCall: "20", //最大呼叫线数
        password: "", //密码
        profileId: "", //profileId
        proxyIp: "", //代理IP
        realm: "", //域地址
        register: 0, //是否注册 0不注册/ 1 注册
        username: "" //注册用户名
      },
      codecsList: [],
      relayType: [
        { label: "入中继", value: 0 },
        { label: "出中继", value: 1 },
        { label: "双向中继", value: 2 }
      ],
      networkStat: [
        { label: "开启", value: "开启" },
        { label: "关闭", value: "关闭" }
      ],
      registerTypr: [
        { label: "注册", value: 1 },
        { label: "不注册", value: 0 }
      ],
      rule: {
        gatewayName: [
          { required: false, message: "该选项为必填项， 请确认", trigger: "blur" }
        ],
        gatewayIp: [
          { required: false, message: "该选项为必填项， 请确认", trigger: "blur" }
        ],
        gatewayType: [
          { required: false, message: "该选项为必填项， 请确认", trigger: "blur" }
        ]
      },
      rules: {
        accountUser: [{ required: true, message: "该选项为必填项， 请确认", trigger: "blur" }],
        codecs: [
          { required: true, message: "该选项为必填项， 请确认", trigger: "blur" }
        ],
        dtmfMode: [
          { required: true, message: "该选项为必填项， 请确认", trigger: "blur" }
        ],
        expires: [
          { required: true, message: "该选项为必填项， 请确认", trigger: "blur" },
          { validator: validateNum, message: "请输入合法的数字", trigger: "blur" }
        ],
        gatewayIp: [
          { required: true, message: "该选项为必填项， 请确认", trigger: "blur" },
          { validator: validateIP, message: "IP输入有误, 请确认", trigger: "blur" }
        ],
        gatewayName: [
          { required: true, message: "该选项为必填项， 请确认", trigger: "blur" }
        ],
        gatewayPort: [{ required: true, message: "该选项为必填项， 请确认", trigger: "blur" },
          { validator: validatePost, message: "端口号输入有误, 请确认", trigger: "blur" }
        ],
        gatewayType: [
          { required: true, message: "该选项为必填项， 请确认", trigger: "blur" }
        ],
        maxCall: [{ required: true, message: "该选项为必填项， 请确认", trigger: "blur" }],
        password: [
          { required: true, message: "该选项为必填项， 请确认", trigger: "blur" }
        ],
        profileId: [
          { required: true, message: "该选项为必填项， 请确认", trigger: "blur" }
        ],
        proxyIp: [{ required: false, message: "该选项为必填项， 请确认", trigger: "change" },
          { validator: validateIP, message: "IP输入有误, 请确认", trigger: "blur" }],
        realm: [{ required: true, message: "该选项为必填项， 请确认", trigger: "change" }, {
          validator: validateIP,
          message: "IP输入有误, 请确认",
          trigger: "blur"
        }],
        register: [{ required: true, message: "该选项为必填项， 请确认", trigger: "blur" }],
        username: [{ required: true, message: "该选项为必填项， 请确认", trigger: "blur" }]
      }
    };
  },
  components: {
    myFooter,
    myElHeader
  },
  methods: {
    next() {
      this.forms.pageNum++;
      this.getPbxAll(this.forms);
    },
    prev() {
      this.forms.pageNum--;
      this.getPbxAll(this.forms);
    },
    change(e) {
      this.forms.pageNum = e;
      this.getPbxAll(this.forms);
    },
    pageCheng(e) {
      this.forms = this.$options.data().forms;
      this.forms.pageSize = e;
      this.getPbxAll(this.forms);
    },
    gatewayIpCahnge() {
      this.addFrom.realm = this.addFrom.gatewayIp;
    },
    clear() {
      this.forms = this.$options.data().forms;
      this.getPbxAll(this.forms);
    },
    find() {
      this.getPbxAll(this.forms);
    },

    getPbxAll(form) {
      getPbxAll(form).then(res => {
        if (res.data.code === 200) {
          this.$bus.$emit("total", res.data.data.total);
          this.list = res.data.data.records;
        }
      }).catch(e => {
        this.$message.error(e);
      });
    },
    submitForm() {
      this.$refs["formName"].validate((valid) => {
        if (valid) {
          if (this.title === "添加网关") {
            getPbxAdd(this.addFrom).then(res => {
              if (res.data.code === 200) {
                this.$message.success("添加完成");
                this.getPbxAll(this.from);
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            upDatePbx(this.addFrom).then(res => {
              if (res.data.code === 200) {
                this.$message.success("添加完成");
                this.getPbxAll(this.from);
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
          // this.resetForm('formName')
        } else {
          console.log("error submit!!");
        }
      });
    },
    resetForm(type) {
      type === "form" ? this.$refs["form"].resetFields() : this.$refs["formName"].resetFields();
    },
    showAddForm(row, title) {
      this.dialogFormVisible = true;
      this.title = title;
      if (title === "编辑") {
        this.addFrom = row;
      } else if (title === "查看") {
        this.addForm = row;
        this.isReadOnly = true;
      } else {
        // this.resetForm("formName")
      }
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },

    removeIt(row) {
      deletePbx(row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("删除完成");
          this.getPbxAll(this.forms);
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.$message.error(e);
      });
    },
    getProfileInfo() {
      getProfileInfo().then(res => {
        if (res.data.code === 200) {
          this.profileIdList = res.data.data.records;
          this.addFrom.profileId = this.profileIdList[0].id;
        }
      });
    },
    codecsBlur() {
      this.addFrom.codecs = this.codecs.join(",");
    },
    /**
     * 获取网关对象, 保存code
     *
     * @param dictionaryTypeList
     */
    filterGateway(dictionaryTypeList) {
      let _data = {};
      let _dtmfModeData = {};

      dictionaryTypeList.forEach(item => {
        if (item.name === "网关编码") {
          _data.id = item.id;
          _data.code = item.code;
          getDictionaryAll(_data).then(res => {
            this.dictionaryList = res.data.data;
            this.dictionaryList.forEach(item => {
              this.codecs.push(item.name);
            });
            this.codecsBlur();

            // this.codecs = this.dictionaryList;
          });
        }
        if (item.name === "二次拨号方式") {
          _dtmfModeData.code = item.code;
          getDictionaryAll(_dtmfModeData).then(res => {
            this.dtmfModeData = res.data.data;
            this.addFrom.dtmfMode = this.dtmfModeData[0].id;
          });
        }
      });
    }
  },
  created() {

    this.getPbxAll(this.forms);
    this.getProfileInfo();
  },
  watch: {
    dialogFormVisible(val) {
      if (val === false) {
        this.addFrom = this.$options.data().addFrom;
      } else {
        let dictionaryTypeList = [];
        this.codecs = [];
        //获取编码
        addDictionaryList().then(res => {
          dictionaryTypeList = res.data.data.records;
          // this.addFrom.codecs = this.codecsBlur();
          console.log(dictionaryTypeList);
          //过滤网关ID
          this.filterGateway(dictionaryTypeList);
        });
      }
    }
  }
};
</script>

<style>

#networkManagement .container p {
  background-color: #f2f2f2;
  padding: 10px 15px;
}

.nav-form {
  margin: 15px;
  height: 40px;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
}

.nav-form form {
  height: 40px;
}

#networkManagement .width {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

#networkManagement .width > div {
  flex: 1;
}

#networkManagement .operate {
  padding: 0;
}
</style>
