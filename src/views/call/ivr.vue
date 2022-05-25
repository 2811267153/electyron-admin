<template>
  <div class="warps">
    <div class="container">
      <p>{{ $route.meta.title }}</p>
      <div class="nav-form">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="虚拟接待名称">
            <el-input v-model="form.user"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="类型">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button @click="">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="">添加虚拟接待</el-button>
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
          <el-form :model="form" rules="rules" ref="addFrom">
            <el-form-item
              label="虚拟接待名称"
              :label-width="formLabelWidth"
              prop="name"
            >
              <el-input v-model="addForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <div class="width">
              <el-form-item
                label="虚拟接待类型"
                :label-width="formLabelWidth"
                prop="type"
              >
                <el-select v-model="addForm.type">
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="item in type"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="拥有者"
                :label-width="formLabelWidth"
                prop="owner"
              >
                <el-input v-model="addForm.owner" />
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item label="欢迎语录音" :label-width="formLabelWidth">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="提示音" :label-width="formLabelWidth">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
              </el-form-item>
            </div>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="addForm.remark" />
            </el-form-item>
          </el-form>
          <h4>按键设置</h4>
          <div class="width">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in 10"
                :key="item.value"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <el-input v-model="num" />
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false"
            >确 定
            </el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ivr",
  data() {
    return {
      title: "添加虚拟接待",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {},
      addForm: {
        name: "",
        type: "",
        owner: "",
        startRecording: "",
        hint: "",
        remark: ""
      },
      value: "",
      num: "",
      type: [
        { label: "单个用户", value: "单个用户" },
        { label: "所有用户", value: "所有用户" }
      ],
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        owner: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
.container {
  border: 1px solid #ccc;
}

.container p {
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
  padding: 0 20px;
}

h4 {
  margin: 10px 0;
}
</style>
