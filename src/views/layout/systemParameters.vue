<template>
  <div class="warps">
    <my-el-header title="系统参数" />
    <div class="container">
      <div class="form-nav">
        <el-form :model="form" destroy-on-close inline label-width="68px"
                 class="demo-ruleForm">
          <el-form-item label="参数名称" prop="name" label-width="180">
            <el-input placeholder="请输入内容" v-model="form.params"></el-input>
          </el-form-item>
          <el-form-item label="参数值" prop="code">
            <el-input placeholder="请输入内容" v-model="form.value"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">查找</el-button>
            <el-button @click="clear()">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="showAddForm(null, '添加系统参数')">添加系统参数</el-button>
      </div>
      <el-table
        :data="list"
        :header-cell-style="{background:'#ccc', color: '#fff',}"
        height="calc(100vh - 100px - 100px - 100px - 100px)"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="序号"
          width="50">
          <template scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="params"
          label="参数名称">
        </el-table-column>
        <el-table-column
          prop="value"
          label="参数值">
        </el-table-column>
        <el-table-column
          prop="module"
          label="使用模块">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="描述">
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :width="$store.state.dialogWidth"
               :close-on-click-modal="false">
      <el-form ref="addForm" :model="addForm">
        <div class="width">
          <el-form-item label="参数名称" :label-width="formLabelWidth">
            <el-input placeholder="请输入内容" v-model="addForm.params" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="参数值" :label-width="formLabelWidth">
            <el-input placeholder="请输入内容" v-model="addForm.value" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="使用模块" :label-width="formLabelWidth">
            <el-input placeholder="请输入内容" v-model="addForm.module" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input placeholder="请输入内容" v-model="addForm.desc" autocomplete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <my-footer v-on:next="next" @prev="prev" @pageCheng="changPage"
               :form="form"
               @change="change"></my-footer>
  </div>
</template>

<script>
import myElHeader from "@/components/myElHeader";
import myFooter from "@/components/myFooter";
import {
  addSystemParameters,
  delSystemParameters,
  getSystemParameters,
  upDataParameters
} from "@/newwork/system-colltroner";

export default {
  name: "systemParameters",
  components: {
    myElHeader,
    myFooter
  },
  data() {
    return {
      form: {},
      addForm: {
        params: "", //参数名称
        value: "", //参数值
        module: "", //模块
        desc: "" //描述
      },
      list: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      title: "添加系统参数"
    };
  },
  methods: {
    next() {
      this.form.pageNum++;
      this.getSystemParameters(this.form);
    },
    prev() {
      this.form.pageNum--;
      this.getSystemParameters(this.form);
    },
    change(e) {
      console.log(e);
      this.form.pageNum = e;
      this.getSystemParameters(this.form);
    },
    changPage(data) {
      this.form.pageSize = data;
      this.getSystemParameters(this.form);
    },
    submitForm() {
      this.getSystemParameters(this.form);
    },
    clear() {
      this.form = this.$options.data().form;
    },
    submit() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          if (this.title === "添加系统参数") {
            addSystemParameters(this.addForm).then(res => {
              if (res.data.code === 200) {
                this.$message.success("添加完成");
                this.getSystemParameters(this.from);
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            upDataParameters(this.addForm).then(res => {
              if (res.data.code === 200) {
                this.$message.success("添加完成");
                this.getSystemParameters(this.from);
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        } else {
          console.log("error submit!!");
        }
      });
    },
    resetForm() {
      this.form = this.$options.data.form;
    },
    showAddForm(row, title) {
      this.title = title;
      this.dialogFormVisible = true;
      if (title === "编辑") {
        this.addForm = row;
      }
    },
    removeIt(row) {
      delSystemParameters(row).then(res => {
        if (res.data.code === 200) {
          this.$message.success("提交完成");
        } else {
          this.$message.error(res.data.code);
        }
      });
    },
    getSystemParameters(form) {
      getSystemParameters(form).then(res => {
        if (res.data.code === 200) {
          this.$bus.$emit("total", res.data.data.total);
          this.list = res.data.data.records;
        } else {
          console.log(res);
        }
      });
    }
  },
  created() {
    this.getSystemParameters(this.form);
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.addForm = this.$options.data().addForm;
      }
    }
  }
};
</script>

<style scoped>

</style>
