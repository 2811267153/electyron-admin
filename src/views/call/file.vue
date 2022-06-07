<template>
  <div class="warps">
    <my-el-header title="文件管理" />
    <div class="container">
      <div class="form-nav">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item label="文件名" prop="fifoName">
            <el-input v-model="form.fifoName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="find">查询</el-button>
            <el-button @click="resetForm('clear')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="showAddForm(null, '上传文件')">上传文件</el-button>
      </div>

      <el-table
        height="calc(100vh - 100px - 100px - 100px - 100px)"
        :header-cell-style="{background:'#ccc', color: '#fff',}"
        :data="list"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="序号"
          width="50">
          <template scope="scoep">{{ scoep.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="filePath"
          label="文件名">
          <template scope="scope">{{ fileName(scope.row) }}</template>
        </el-table-column>
        <el-table-column
          prop="filePath"
          label="文件路径">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="上传时间">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :width="$store.state.dialogWidth" destroy-on-close
               :close-on-click-modal="false">
      <el-form :model="addForm">
        <div class="width">
          <el-form-item label="文件名" :label-width="formLabelWidth">
            <el-input v-model="addForm.fifoWaitMusic" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="文件" :label-width="formLabelWidth">
            <el-upload
              :action="uploadFileUrl"
              :limit="limit"
              :with-credentials="true"
              :show-file-list="false"
              :before-upload="handleBeforeUpload"
              :headers="headers"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
            >
              <el-button size="small" type="primary" style="margin-right: 20px">点击上传</el-button>
              <div class="el-upload__tip" slot="tip" v-if="addForm.fifoWaitMusic.length === 0">
                请上传
                <template v-if="fileSize"> 大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b></template>
                <template v-if="fileType"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b></template>
                的文件
              </div>
              <div class="el-upload__tip" slot="tip" v-else>
                当前选择的文件: {{ addForm.fifoWaitMusic }}
              </div>
            </el-upload>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myElHeader from "@/components/myElHeader";
import { getCookie } from "@/auth";
import { getFileList } from "@/newwork/ground-colltroner";

export default {
  name: "file",
  components: {
    myElHeader
  },
  data() {
    return {
      form: {},
      dialogFormVisible: false,
      formLabelWidth: "120px",
      addForm: {
        fifoWaitMusic: ""
      },
      title: "0",
      limit: 1,
      uploadFileUrl: "http://123.60.212.9/dispatch/system/file/upload",
      // uploadFileUrl: "/dispatch/system/file/upload",
      headers: {
        Authorization: "Bearer " + getCookie()
      },
      fileSize: 5,
      fileType: ["avi"],
      list: []
    };
  },
  computed: {},
  methods: {
    find() {
    },
    fileName(row) {
      return row.filePath.slice(20);
    },
    resetForm() {
      this.form = this.$options.data().form;
    },
    showAddForm(row, title) {
      this.title = title;
      this.dialogFormVisible = true;
    },
    handleBeforeUpload(file) {
      this.fileData = file;
      if (this.fileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk) {
          this.$message.error(`文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`);
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      return true;
    },
    handleUploadError() {
      this.$message.error("上传失败, 请重试");
    },
    handleUploadSuccess(res) {
      this.$message.success("上传成功");
      this.addForm.fifoWaitMusic = this.fileData.name;
    },
    getFileList() {
      getFileList().then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.list = res.data.data;
        }
      });
    }
  },
  created() {
    this.getFileList();
  }
};
</script>

<style scoped>

</style>
