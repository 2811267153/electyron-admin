<template>
  <div class="warps">
    <my-el-header/>
    <div class="container">
      <div class="form-nav">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" :rules="rule">
          <el-form-item label="网卡名称" prop="fifoName">
            <el-input v-model="form.fifoName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="端口" prop="profileSipPort">
            <el-input v-model="form.profileSipPort" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="服务接口名称" prop="netName">
            <el-input v-model="form.netName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="find">查询</el-button>
            <el-button @click="resetForm('clear')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="addForms(null, '新增')">新增配置</el-button>
      </div>

      <el-table
          :data="list"
          height="calc(100vh - 100px - 100px - 100px - 100px)"
          :header-cell-style="{background:'#ccc', color: '#fff',}"
          style="width: 100%;margin-top: 20px">
        <el-table-column
            align="center"
            prop="date"
            label="序号">
          <template scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="profileName"
            label="服务接口名称">
        </el-table-column>
        <el-table-column
            align="center"
            prop="netName"
            label="网卡名称">
        </el-table-column>
        <el-table-column
            align="center"
            prop="profileSipIp"
            label="IP">
        </el-table-column>
        <el-table-column
            align="center"
            prop="profileSipPort"
            label="端口">
        </el-table-column>
        <el-table-column
            align="center"
            prop="template"
            label="模板">
        </el-table-column>
        <el-table-column
            align="center"
            prop="netMac"
            label="网卡的mac地址">
        </el-table-column>
        <el-table-column
            align="center"
            prop="netMac"
            label="状态">
          <template scope="scope">
            <a v-if="scope.row.status === 0">启用</a>
            <a v-else>禁用</a>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="address"
            fixed="right"
            label="操作">
          <template scope="scope">
            <el-link @click="addForms(scope.row, '编辑')" style="margin-right: 20px">编辑</el-link>
            <el-link @click="del(scope.row.id)" style="margin-right: 20px">删除</el-link>
          </template>
        </el-table-column>
      </el-table>


      <el-dialog destroy-on-close :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="addForm" ref="addForm" :rules="rules">
          <el-form-item label="服务接口名称" :label-width="formLabelWidth" prop="profileName">
            <el-input v-model="addForm.profileName" autocomplete="off" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="网卡名称" :label-width="formLabelWidth" prop="netName">
            <el-select @change="change" v-model="addForm.netName" placeholder="请选择">
              <el-option
                  v-for="item in netNameList"
                  :key="item.value"
                  :label="item.netName"
                  :value="item.netName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="网卡地址" :label-width="formLabelWidth" prop="netMac">
            <el-input v-model="addForm.netMac" disabled autocomplete="off" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="IP" :label-width="formLabelWidth" prop="profileSipIp">
            <el-input v-model="addForm.profileSipIp" disabled autocomplete="off" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="端口" :label-width="formLabelWidth" prop="profileSipPort">
            <el-input v-model="addForm.profileSipPort" autocomplete="off" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="配置文件" :label-width="formLabelWidth" prop="template">
            <el-select v-model="addForm.template" placeholder="请选择活动区域">
              <el-option :label="item.label" :value="item.value" v-for="item in templateType"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-radio-group v-model="addForm.status">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <my-footer v-on:next = "next" @prev="prev" :form="form" @change="formChange"  @pageCheng="pageCheng"></my-footer>

  </div>
</template>

<script>
import { addFroFile, delProFile, getProfile, getProfileInfo, upDataProFile } from "@/newwork/ground-colltroner";
import { isValidPost } from "@/util/validate";
import myFooter from "@/components/myFooter";
import myElHeader from "@/components/myElHeader";
export default {
  name: "configure",
  data() {
    const validatePost = (rule, value, callback) => {
      if (!isValidPost(value)) {
        callback(new Error("ip地址输入有误,请确认"));
      } else {
        callback();
      }
    };
    return {
      form: {
        profileName: "",
        profileSipPort: "",
        netName: ""
      },
      list: [],
      dialogFormVisible: false,
      title: "新增",
      formLabelWidth: "120px",
      currentNetName: {},
      addForm: {
        netMac: "", //网卡地址
        netName: "",//网卡名称
        profileName: "",  //服务接口名称
        profileSipIp: "", //IP
        profileSipPort: "", //端口
        status: 0,
        template: "" //配置文件模板:internal/external(internal为内部注册，external为对外中继通道接口)
      },
      netNameList: [],
      templateType: [
        { label: "内部注册", value: "internal" },
        { label: "对外中继通道接口", value: "external" }
      ],
      rules: {
        netMac: [
          { required: false, message: "该选项为必填项，请确认", trigger: "change" }
        ],
        netName: [
          { required: true, message: "该选项为必填项，请确认", trigger: "change" }
        ],
        profileName: [
          { required: true, message: "该选项为必填项，请确认", trigger: "change" }
        ],
        profileSipIp: [
          { required: false, message: "该选项为必填项，请确认", trigger: "change" }

        ],
        profileSipPort: [
          { required: true, message: "该选项为必填项，请确认", trigger: "change" },
          { validator: validatePost, message: "IP输入有误, 请确认", trigger: "blur" }
        ],
        template: [
          { required: true, message: "该选项为必填项，请确认", trigger: "change" }
        ]
      },
      rule: {
        profileName: [
          { required: false, message: "该选项为必填项，请确认", trigger: "change" }
        ],
        profileSipPort: [
          { required: false, message: "该选项为必填项，请确认", trigger: "change" }
        ],
        netName: [
          { required: false, message: "该选项为必填项，请确认", trigger: "change" }
        ]
      }
    };
  },
  components: {
    myFooter,
    myElHeader
  },
  methods: {
    pageCheng(e){
      this.form = this.$options.data().form
      this.form.pageSize = e
      this.getProfile(this.form)
    },
    find() {
      this.getProfileInfo(this.form);
    },
    next(){
      this.form.pageNum ++
      this.getProfile(this.form)
    },
    prev(){
      this.form.pageNum --
      this.getProfile(this.form)
    },
    formChange(e){
      this.form.pageNum = e
      this.getProfile(this.form)
    },
    clear(){
      this.form = this.$options.data().form
      this.getProfile(this.form)
    },
    change(e) {
      console.log(e);
      this.netNameList.forEach(item => {
        if (item.netName === e) {
          this.currentNetName = item;
        }
      });
      this.addForm.netMac = this.currentNetName.netMac;
      this.addForm.profileSipIp = this.currentNetName.profileSipIp;
    },

    getProfileInfo(form) {
      getProfileInfo(form).then(res => {
        this.$bus.$emit("total", res.data.data.total);
        if (res.data.code === 200) {
          this.list = res.data.data.records;
          console.log(this.list);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    resetForm(type) {
      type === "clear" ? this.$refs.form.resetFields() : this.$refs.addForm.resetFields();
    },
    addForms(row, title) {
      this.title = title;
      this.dialogFormVisible = true;
      title === "编辑" ? this.addForm = row : "";
    },
    del(id) {
      delProFile(id).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.getProfileInfo(this.form);
          this.$message.success("提交完成");
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => this.$message.error(e));
    },
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.title === "新增" ? this.addDataForm() : this.upDataForm();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addDataForm() {
      addFroFile(this.addForm).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.dialogFormVisible = false;
          this.getProfileInfo(this.form);
          this.$message.success("提交完成");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getProfile() {
      getProfile().then(res => {
        console.log(res);
        this.netNameList = res.data.data;
      });
    },
    upDataForm() {
      upDataProFile(this.addForm).then(res => {
        if (res.data.code === 200) {
          this.getProfileInfo(this.form);
          this.$message.success("提交完成");
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  },
  created() {
    this.getProfileInfo(this.form);
    this.getProfile();
  },
  watch: {
    dialogFormVisible(val) {
      this.resetForm();
      this.getProfileInfo(this.form);
    }
  },
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
.configure{
  width: 100%;
  padding: 20px;
  margin-left: 20px;
  margin-top: 20px;
  box-shadow: 0 0 15px #ccc;
  background-color: #fff;
  border-radius: 10px;
  height: 71vh;
  overflow: auto;
}
</style>
