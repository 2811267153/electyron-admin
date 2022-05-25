<template>
  <div class="warps">
    <my-el-header />
    <div class="container">
      <div class="form-nav">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="会议终端名称">
            <el-input v-model="form.user"></el-input>
          </el-form-item>
          <el-form-item label="设备IP">
            <el-input v-model="form.ip" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
        <div class="nav-btn">
          <el-button
            type="primary"
            @click="showAddForm(null, '添加会议终端')"
          >{{ title }}
          </el-button
          >
        </div>
      </div>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="index" label="序号" width="180">
          <template scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="会议终端名称" width="200">
        </el-table-column>
        <el-table-column prop="ip" label="设备IP" width="200">
        </el-table-column>
        <el-table-column prop="ip" label="所属区域" width="300">
          <template scope="scope"
          >{{ scope.row.area[0] }}{{ scope.row.area[1] }}
          </template
          >
        </el-table-column>
        <el-table-column prop="SIP" label="SIP号码" width="300">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template scope="scope">
            <el-link
              class="a-link"
              type="info"
              @click="showAddForm(scope.row, '编辑')"
            >编辑
            </el-link
            >

            <el-link class="a-link" type="info" @click="removeIt(scope.row)"
            >删除
            </el-link
            >

            <el-link
              class="a-link"
              type="info"
              @click="showAddForm(scope.row, '查看')"
            >查看
            </el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :width="$store.state.dialogWidth" :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" ref="addFrom" :rules="rules">
        <div class="width">
          <el-form-item
            label="会议终端名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="SIP号码"
            :label-width="formLabelWidth"
            prop="SIP"
          >
            <el-input v-model="addForm.SIP" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="设备IP" :label-width="formLabelWidth" prop="ip">
            <el-input v-model="addForm.ip" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="端口" :label-width="formLabelWidth">
            <el-input v-model="addForm.host" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item
            label="所属区域"
            :label-width="formLabelWidth"
            prop="area"
          >
            <el-cascader
              v-model="addForm.area"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
          </el-form-item>
        </div>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')"
        >确 定
        </el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import eTree from "../../components/eTree.vue";
import myElHeader from "@/components/myElHeader";

export default {
  name: "terminal",
  components: {
    eTree,
    myElHeader
  },
  data() {
    return {
      formLabelWidth: "120px",
      dialogFormVisible: false,
      title: "添加会议终端",

      form: {},
      list: [],
      addForm: {
        name: "",
        ip: "",
        host: "",
        area: "",
        remark: ""
      },
      options: [
        {
          label: "湖北",
          value: "湖北",
          children: [
            { label: "武汉", value: "武汉" },
            { label: "十堰", value: "十堰" },
            { label: "襄阳", value: "襄阳" },
            { label: "随州", value: "随州" }
          ]
        }
      ],
      rules: {
        name: [{ required: true, message: "请输入话机名称", trigger: "blur" }],
        ip: [{ required: true, message: "请输入IP地址", trigger: "blur" }],
        area: [{ required: true, message: "请输入所属区域", trigger: "blur" }],
        SIP: [{ required: true, message: "请输入SIP", trigger: "blur" }]

      }
    };
  },
  methods: {
    submitForm(addForm) {
      this.$refs["addFrom"].validate((valid) => {
        if (valid) {
          this.list.push(this.addForm);
          this.$message({
            message: "提交完成",
            type: "success"
          });
          this.dialogFormVisible = false;
          window.localStorage.setItem("terminal", JSON.stringify(this.list));
        } else {
          this.$message({
            message: "提交失败， 请重试",
            type: "error"
          });
          return false;
        }
      });
    },
    showAddForm(row, title) {
      this.dialogFormVisible = true;
      this.title = title;
      if (title === "编辑") {
        this.addForm = row;
      } else if (title === "查看") {
        this.addForm = row;
        this.isReadOnly = true;
      } else {
        this.resetForm();
      }
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },

    removeIt(row) {
      this.list.map((item, i) => {
        if (row === item) {
          this.list.splice(i, 1);
        }
      });
    }
  },
  created() {
    this.list = JSON.parse(window.localStorage.getItem("terminal")) || [];
  }
};
</script>

<style scoped>
.width {
  width: 50%;
}

.a-link {
  margin-right: 20px;
}
</style>
