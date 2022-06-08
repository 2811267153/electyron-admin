<template>
  <div class="warps">
    <my-el-header title="呼叫路由" />
    <div class="container">
      <div class="form-nav">
        <el-form :inline="true" :close-on-click-modal="false" :model="form" class="demo-form-inline" :rules="form"
                 ref="form">
          <el-form-item label="路由名称" prop="diaplanRateGroup">
            <el-input v-model="form.routerName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="呼叫类型 " prop="diaplanRateGroup">
            <el-input v-model="form.fifoId" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="diaplanRateGroup">
            <el-input v-model="form.desType" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="diaplanRateGroup">
            <el-input v-model="form.callType" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="find">查询</el-button>
            <el-button @click="clear">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="showAddForm(null, '添加呼叫路由')"
        >添加呼叫路由
        </el-button
        >
      </div>
      <el-table
        height="calc(100vh - 100px - 100px - 100px - 100px)"
        :header-cell-style="{background:'#ccc', color: '#fff',}"
        style="width: 100%"
        :data="list">
        <el-table-column
          prop="date"
          label="序号"
          width="50">
          <template scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="routerName"
          label="路由名称">
        </el-table-column>
        <el-table-column
          prop="routerName"
          label="类型">
          <template scope="scope">
            <span v-if="scope.row.desType === 0">禁止</span>
            <span v-else-if="scope.row.desType === 1">系统分机</span>
            <span v-else-if="scope.row.desType === 2">呼出到socket应用</span>
            <span v-if="scope.row.callType === 3">中继呼叫</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="regular"
          label="正则">
        </el-table-column>
        <el-table-column
          prop="regularType"
          label="正则类型">
          <template scope="scope">
            <div v-if="scope.row.regularType === 1">
              被叫匹配
            </div>
            <div v-else>
              主叫匹配
            </div>
          </template>
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
            <template>
              <el-popconfirm title="确认要删除吗？" @confirm="del(scope.row)">
                <el-link slot="reference">删除
                </el-link>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form">
        <div class="width">
          <el-form-item label="路由名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.routerName" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="呼叫类型" :label-width="formLabelWidth">
            <el-select v-model="addForm.callType" placeholder="请选择活动区域" style="width: 100%">
              <el-option :label="item.label" :value="item.value" v-for="item in callType"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-select v-model="addForm.desType" placeholder="请选择类型" style="width: 100%">
              <el-option :label="item.label" :value="item.value" v-for="item in desType"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="正则" :label-width="formLabelWidth">
            <el-input v-model="addForm.regular" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="正则匹配规则" :label-width="formLabelWidth">
            <el-select v-model="addForm.regularType" placeholder="请选择类型" style="width: 100%">
              <el-option :label="item.label" :value="item.value" v-for="item in regularType"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="内容" :label-width="formLabelWidth">
            <el-input v-model="addForm.content" autocomplete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <p>平台呼入 经过平台注册的方式进行呼叫,中继呼入则相反</p>
        <div class="footer-info">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </div>
    </el-dialog>

    <my-footer />
  </div>
</template>

<script>
import myElHeader from "@/components/myElHeader";
import myFooter from "@/components/myFooter";
import { addRouter, delRouter, getRouter, upDataRouter } from "@/newwork/call-router";

export default {
  name: "callRouting",
  components: {
    myElHeader,
    myFooter
  },
  data() {
    return {
      form: {},
      addForm: {
        routerName: "", //路由名称
        regular: "", //正则
        regularType: "", // regularType
        desType: "", //类型（0：禁止 1：did（找系统分机）2：呼出到socket应用3: ivr）
        callType: 1,//呼叫类型 0:中继呼入 1:平台呼出
        content: ""//content
      },
      list: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      title: "添加呼叫路由",
      callType: [
        { label: "中继呼入", value: 0 },
        { label: "平台呼入", value: 1 }
      ],
      desType: [
        { label: "禁止", value: 0 },
        { label: "系统分机", value: 1 },
        { label: "呼出到socket应用", value: 2 },
        { label: "ivr", value: 31 }
      ],
      regularType: [
        { label: "主叫匹配", value: 0 },
        { label: "被叫匹配", value: 1 }
      ]

    };
  },
  methods: {
    next() {
      this.form.pageNum++;
      this.getRouter(this.form);
    },
    prev() {
      this.form.pageNum--;
      this.getRouter(this.form);
    },
    change(e) {
      this.form.pageNum = e;
      this.getRouter(this.form);
    },
    find() {
      this.getRouter(this.form);
    },
    clear() {
      this.form = this.$options.data().form;
      this.getRouter(this.form);
    },
    showAddForm(row, title) {
      this.title = title;
      this.dialogFormVisible = true;
      if (title === "编辑") {
        this.addForm = row;
      }
    },
    getRouter(form) {
      getRouter(form).then(res => {
        this.$bus.$emit("total", res.data.data.total);
        if (res.data.code === 200) {
          this.list = res.data.data.records;
          this.dialogFormVisible = false;
        }
      }).catch(e => {
        this.$message.error(e);
      });
    },
    submit(row) {
      if (this.title === "编辑") {

        upDataRouter(this.addForm).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.getRouter(this.form);
            this.dialogFormVisible = false;
            this.$message.success("提交完成");
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(e => {
          console.log(e);

        });
      } else {
        addRouter(this.addForm).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.dialogFormVisible = false;
            this.getRouter(this.form);
            this.dialogFormVisible = false;
            this.$message.success("提交完成");
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(e => console.log(e));
      }
    },
    del(row) {
      delRouter(row.id).then(res => {
        if (res.data.code === 200) {
          this.getRouter(this.form);
          this.dialogFormVisible = false;
          this.$message.success("提交完成");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.addForm = this.$options.data().addForm;
      }
    }
  },
  created() {
    this.getRouter(this.form);
  }
};
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-footer p {
  color: #6d6c6c;
}
</style>
