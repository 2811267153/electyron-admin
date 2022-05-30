<template>
  <div class="warps">
    <my-el-header />
    <div class="container">
      <div class="data-manage">
        <div class="nav">
          <div class="nav-l">
            <div class="form-nav">
              <el-form :model="form" destroy-on-close inline :rules="rule" ref="form" label-width="68px"
                       class="demo-ruleForm">
                <el-form-item label="字典类型名称" prop="name" label-width="180">
                  <el-input placeholder="请输入内容" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="字典编码" prop="code">
                  <el-input placeholder="请输入内容" v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="字典状态" prop="status">
                  <el-select v-model="form.status">
                    <el-option
                      v-for="item in status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm">查找</el-button>
                  <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="nav-l">
            <el-button type="primary" @click="showAddForm(null, '添加字典类型')">添加字典类型</el-button>
          </div>
        </div>
        <el-dialog :width="$store.state.dialogWidth" destroy-on-close :title="title" :visible.sync="dialogFormVisible"
                   :close-on-click-modal="false">
          <el-form ref="addForm" :model="addForm" :rules="rules">
            <div class="width">
              <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                <el-input placeholder="请输入内容" v-model="addForm.name" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item label="字典类型编码" :label-width="formLabelWidth" prop="code">
                <el-input placeholder="请输入内容" v-model="addForm.code" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item label="状态" :label-width="formLabelWidth">
                <el-radio-group v-model="addForm.status">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="2">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitAddForm('addForm')"
            >确 定
            </el-button
            >
          </div>
        </el-dialog>
        <div ref="tables" class="table-warp">
          <el-table height="calc(100vh - 100px - 100px - 100px - 100px)"
                    :header-cell-style="{background:'#ccc', color: '#fff',}" :data="resultList" style="width: 100%">
            <el-table-column align="center" prop="id" label="序号" width="50">
              <template scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="字典类型名称"></el-table-column>
            <el-table-column align="center" prop="code" label="字典类型编码"></el-table-column>
            <el-table-column align="center" prop="createTime" label="更新时间"></el-table-column>
            <el-table-column align="center" prop="createTime" label="字典">
              <template scope="scope">
                <el-link type="info" @click="toPath(scope.row)">查看字典</el-link>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="sort" label="状态">
              <template scope="scope">
                <a v-if="scope.row.status === 1">启用</a>
                <a v-else>停用</a>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="sort" label="操作" :width="$store.state.tableMixWidth" fixed="right">
              <template scope="scope">
                <div class="operate">
                  <el-link type="info" @click="showAddForm(scope.row, '编辑')">编辑</el-link>
                  <template>
                    <el-popconfirm
                      title="确认要删除吗？"
                      @confirm="removeIt(scope.row)"
                    >
                      <el-link slot="reference" type="info">删除</el-link>
                    </el-popconfirm>
                  </template>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <my-footer v-on:next="next" @prev="prev" @pageCheng="changPage"
               :form="form"
               @change="change"></my-footer>
  </div>
</template>

<script>
import { getNowFormatDate } from "@/uti";

import {
  addDictionaryList,
  addDictionaryTYpe,
  removeDateDictionaryList,
  upDateDictionaryList
} from "@/newwork/system-colltroner";
import myEmpty from "@/newwork/myEmpty";
import myFooter from "@/components/myFooter";
import myElHeader from "@/components/myElHeader";

export default {
  name: "dataManage",
  components: {
    myEmpty,
    myFooter,
    myElHeader
  },

  data() {
    return {
      title: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      resultList: [],
      maxHeight: null,
      addForm: {
        name: "",
        status: 1, // 状态
        code: "",    //字典编码
        pageNum: 1, //pageNum
        pageSize: 10  //分页大小
      },
      form: {},
      rules: {
        name: [{ required: true, message: "请输入字典类型名称", trigger: "blur" }],
        mark: [{ required: true, message: "请输入标示码", trigger: "blur" }],
        code: [{ required: true, message: "请输入字典类型编码", trigger: "blur" }]
      },
      rule: {
        name: [{ required: false, message: "请输入字典类型名称", trigger: "blur" }],
        code: [{ required: false, message: "请输入标示码", trigger: "blur" }],
        status: [{ required: false, message: "请输入字典类型编码", trigger: "blur" }]
      },
      status: [
        { label: "启用", value: 0 },
        { label: "停用", value: 1 }
      ]
    };
  },
  methods: {
    submitForm() {
      this.dictionaryList(this.form);
    },
    next() {
      this.form.pageNum++;
      console.log(this.form);
      this.dictionaryList(this.form);
    },
    prev() {
      this.form.pageNum--;
      this.dictionaryList(this.form);
    },
    change(e) {
      console.log(e);
      this.form.pageNum = e;
      this.dictionaryList(this.form);
    },
    changPage(data) {
      this.form.pageSize = data;
      this.dictionaryList(this.form);
    },

    submitAddForm() {

      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          this.title === "添加字典类型" ? addDictionaryTYpe(this.addForm).then(res => {
              this.dictionaryList();
            }) :      //当前打开的是新增的弹框吗 是就执行第一个不然就执行第二个
            this.aa(this.addForm);
          this.dialogFormVisible = false;
          this.$message({
            message: "提交完成",
            type: "success"
          });
          this.dialogFormVisible = false;
        }
      });
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.dialogFormVisible = false;
          this.dictionaryList(this.form);
        })
        .catch(_ => {
        });
    },
    resetForm(string) {
      string === "form" ? this.$refs.form.resetFields() : this.$refs.addForm.resetFields();
      this.addForm = this.$options.data().addForm;
      this.form = this.$options.data().form;
      this.dictionaryList(this.form);
    },
    toPath(row) {
      this.$router.push({
        path: "/home/layout/dicManage", query: {
          id: row.id,
          name: row.name,
          code: row.code
        }
      });
      this.$store.dispatch("dictionaryData", row);
    },
    aa(form) {
      const data = {};
      data.id = form.id;
      data.code = form.code;
      data.name = form.name;
      data.status = form.status;
      upDateDictionaryList(data).then(res => {
      }).catch(e => {
        this.$message.error(e);
      });
    },
    removeIt(row) {
      removeDateDictionaryList(row.id).then(res => {
        if (res.data.code === 200) {
          this.dictionaryList(this.form);
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.$message.error(e);
      });
    },
    showAddForm(row, type) {
      this.title = type;
      this.dialogFormVisible = true;
      this.addForm = row;
      type === "编辑" ? (this.addForm = row) : this.addForm = this.$options.data().addForm;
    },
    dictionaryList(addForm) {
      addDictionaryList(addForm).then(res => {
        this.resultList = res.data.data["records"];
        this.$bus.$emit("total", res.data.data.total);
      }).catch(e => {
        this.$message.error(e);
      });
    }
  },

  created() {
    this.dictionaryList(this.form);
  },
  computed: {
    creatTimes() {
      return (this.addForm.creatTime = getNowFormatDate());
    }

  }
};
</script>

<style scoped>
#data-manage {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: calc(100vh - 160px);
}

.nav {
  margin-bottom: 20px;
  display: flex;
  height: 40px;
  overflow: hidden;
  justify-content: space-between;
}

</style>
