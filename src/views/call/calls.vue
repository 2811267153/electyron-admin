<template>
  <div class="warps">
    <my-el-header title="呼叫转移" />
    <div class="container">
      <div class="form-nav">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="关联号码">
            <el-input v-model="form.associatedNumber"></el-input>
          </el-form-item>
          <el-form-item label="转移类型">
            <el-select v-model="form.transferType" placeholder="请选择">
              <el-option
                v-for="item in transferType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转移参数">
            <el-input v-model="form.transferParameter"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button @click="">重置</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="showAddForm(null, '添加呼叫转移')"
          >添加呼叫转移
          </el-button
          >
        </div>
      </div>
      <el-dialog :width="$store.state.dialogWidth" :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="addForm" :rules="rules" ref="addForm">
          <el-form-item
            label="关联号码"
            :label-width="formLabelWidth"
            prop="associatedNumber"
          >
            <el-input
              v-model="addForm.associatedNumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <div class="width">
            <el-form-item
              label="转移类型"
              :label-width="formLabelWidth"
              prop="transferType"
            >
              <el-select v-model="addForm.transferType">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in transferType"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="转接参数"
              :label-width="formLabelWidth"
              prop="transferParameter"
            >
              <el-select v-model="addForm.transferParameter">
                <el-option
                  :label="item"
                  :value="item"
                  v-for="item in 10"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item
            label="有效周期"
            :label-width="formLabelWidth"
            prop="cycle"
          >
            <el-checkbox-group v-model="addForm.cycle">
              <el-checkbox-button
                v-for="city in cycle"
                :label="city"
                :key="city"
              >{{ city }}
              </el-checkbox-button
              >
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="有效时间" :label-width="formLabelWidth" required>
            <div class="width">
              <el-form-item prop="startTime">
                <el-time-select
                  prop="startTime"
                  placeholder="起始时间"
                  v-model="addForm.startTime"
                  :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }"
                >
                </el-time-select>
              </el-form-item>
              <el-form-item prop="startTime">
                <el-time-select
                  style="margin-left: 30px"
                  placeholder="结束时间"
                  v-model="addForm.endTime"
                  :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                  minTime: addForm.startTime
                }"
                >
                </el-time-select>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="备注" prop="remark">
            <el-input v-model="addForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addFrom')"
          >确 定
          </el-button
          >
        </div>
      </el-dialog>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="date" label="序号" width="50">
          <template scope="scope">{{ scope.$index }}</template>
        </el-table-column>
        <el-table-column prop="associatedNumber" label="关联号码" width="180">
        </el-table-column>
        <el-table-column prop="transferType" label="转移类型" width="180">
        </el-table-column>
        <el-table-column prop="transferParameter" label="转移参数" width="180">
        </el-table-column>
        <el-table-column prop="cycle" label="有效期">
          <template scope="scope">
            <div style="display: flex">
              <p style="margin-right: 10px" v-for="item in scope.row.cycle">
                {{ item }}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="有效时间">
          <template scope="scope">
            {{ scope.row.startTime }} -- {{ scope.row.endTime }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="180">
        </el-table-column>
        <el-table-column prop="name" label="操作" :width="$store.state.tableMixWidth">
          <template scope="scope">
            <el-link
              style="margin-right: 20px"
              @click="showAddForm(scope.row, '编辑')"
              type="info"
            >编辑
            </el-link
            >
            <el-link style="margin-right: 20px" type="info">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <my-footer v-on:next="next" @prev="prev" :form="form" @change="change"></my-footer>
  </div>
</template>

<script>
import myFooter from "@/components/myFooter";
import myElHeader from "@/components/myElHeader";

export default {
  name: "calls",
  components: {
    myFooter,
    myElHeader
  },

  data() {
    return {
      title: "添加呼叫转移",
      formLabelWidth: "120px",
      dialogFormVisible: false,

      form: {
        associatedNumber: "",
        transferType: "",
        transferParameter: ""
      },
      list: [],
      transferType: [
        { label: "IVR", value: "IVR" },
        { label: "外网号码", value: "外网号码" },
        { label: "内网号码", value: "内网号码" },
        { label: "振玲组", value: "振玲组" }
      ],
      addForm: {
        associatedNumber: "",
        transferType: "",
        transferParameter: "",
        cycle: ["周一"],
        startTime: "",
        endTime: "",
        remark: ""
      },
      cycle: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      rules: {
        associatedNumber: [
          { required: true, message: "请输入关联号码", trigger: "blur" }
        ],
        transferType: [
          { required: true, message: "请转移类型", trigger: "blur" }
        ],
        transferParameter: [
          { required: true, message: "请输入转移参数", trigger: "blur" }
        ],
        cycle: [{ required: true, message: "请选择有效周期", trigger: "blur" }],
        startTime: [
          { required: true, message: "请选择执行时间", trigger: "blur" }
        ],
        remark: [
          { required: false, message: "请输入活动名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    showAddForm(row, title) {
      this.dialogFormVisible = true;
      this.title = title;
      if (title === "编辑") {
        this.addForm = row;
        console.log(row);
      } else if (title === "查看") {
        this.addForm = row;
        this.isReadOnly = true;
      } else {
        this.resetForm("addForm");
      }
    },
    next() {
      this.form.pageNum++;
      this.getRecord(this.form);
    },
    prev() {
      this.form.pageNum--;
      this.getRecord(this.form);
    },
    change(e) {
      this.form.pageNum = e;
      this.getRecord(this.form);
    },
    find() {
      this.getRecord(this.form);
    },
    clear() {
      this.form = this.$options.data().form;
      this.getRecord(this.form);
    },
    submitForm() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          this.$message({
            message: "提交完成",
            type: "success"
          });
          console.log(this.addForm);
          this.list.push(this.addForm);
          window.localStorage.setItem("calls", JSON.stringify(this.list));
          this.dialogFormVisible = false;
        } else {
          this.$message.error("提交失败， 请重试");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["addForm"].resetFields();
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
    this.list = JSON.parse(window.localStorage.getItem("calls")) || [];
  }
};
</script>

<style scoped>

.width > * {
  flex: 1;
}
</style>
