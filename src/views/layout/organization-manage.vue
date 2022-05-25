<template>
  <!--  组织管理-->
  <div class="warps">
    <my-el-header></my-el-header>
    <div class="container">
      <div class="nav-form">
        <el-form ref="form" class="form" :model="form" label-width="80px" :inline="true">
          <el-form-item label="组织名称">
            <el-input placeholder="请输入内容" v-model="form.deptName"></el-input>
          </el-form-item>
          <el-button type="primary" @click="find()">搜索</el-button>
          <el-button @click="clear()">重置</el-button>

        </el-form>
        <div class="add">
          <el-button type="primary" @click="showForm('新增')">新增</el-button>
        </div>
      </div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible" destroy-on-close :close-on-click-modal="false">
        <el-form ref="addForm" :model="addForm" :rules="rules">
          <div class="width">
            <el-form-item label="部门名称" :label-width="formLabelWidth" prop="deptName">
              <el-input class="input" v-model="addForm.deptName" autocomplete="off" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item label="显示顺序" :label-width="formLabelWidth" prop="orderNum">
              <el-input type="number" class="input" v-model="addForm.orderNum" autocomplete="off"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item label="上级部门" :label-width="formLabelWidth" prop="parentId">

              <!--          <my-tree style="width: 100%" :options="formList" @getValue="getSelectedValue"></my-tree>-->
              <!--          <my-el-tree v-model="addForm.parentId" :options="formList" :value='row.parentId' :props="defaultProps"/>-->
              <treeselect v-model="parent" :multiple="false" :disabled="isDisabled" :options="formatList"
                          :normalizer="normalizer" />
            </el-form-item>
          </div>
          <div class="width">
            <el-form-item label="状态" :label-width="formLabelWidth">
              <el-radio-group v-model="addForm.status">
                <el-radio :label="0">启用</el-radio>
                <el-radio :label="1">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
        </div>
      </el-dialog>
      <div>
      </div>
      <div class="tree-menu "><p>部门名称</p>
        <p>创建时间</p>
        <p style="padding-left: 25px">状态</p>
        <p>操作</p></div>
      <el-tree
        @node-click="handleNodeClick"
        :data="formatList"
        ref="tree"
        :indent="0"
        :default-expanded-keys="defaulExpanded"
        :expand-on-click-node="false"
        node-key="deptId"
        :filter-node-method="filterNode"
        :props="defaultProps"
        accordion>
        <div class="custom-tree-node" slot-scope="{node, data}">
          <div class="tree">
            <div class="detpName"> {{ data.deptName }}</div>
            <div>{{ data.createTime }}</div>
            <div v-if="data.status === 0">启用</div>
            <div v-else>停用</div>
            <div class="item-r">
              <el-link type="primary" class="link" @click="currentShow(0)">新增下一级</el-link>
              <el-link type="primary" class="link" @click="currentShow(1)">编辑</el-link>
              <el-link type="primary" class="link" @click="currentShow(2)">删除</el-link>
            </div>
          </div>
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { addOrganize, delOrganizeList, getOrganizeList, upDataOrganize } from "@/newwork/system-colltroner";
import { fn, getNowFormatDate } from "@/uti";
import { isValidNumber } from "@/util/validate";
import myTree from "@/components/myTree";
import myFooter from "@/components/myFooter";
import myElTree from "@/components/my-el-tree";
import treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import myElHeader from "@/components/myElHeader";

export default {
  name: "serve-manage",
  data: function() {
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
      isDisabled: false,
      title: "新增",
      dialogFormVisible: false,
      dialogFormVisibles: false,
      defaultShowNodes: [], //默认展开
      formLabelWidth: "120px",
      form: {},
      defaulExpanded: [],
      addForm: {
        deptName: "",  //部门名字
        orderNum: "", //显示顺序
        parentId: undefined, //父级单位
        status: 0 //状态
      },
      clickCount: 0,

      parentName: "", //父级单位
      row: {},  //获取当前 点击的那一行
      formatList: [],
      stats: [
        { label: "启用", value: "启用" },
        { label: "禁用", value: "禁用" }
      ],
      defaultProps: {
        children: "children",
        label: "deptName"
      },
      currentNodeKey: "",
      showTitle: ["新增", "编辑", "删除"],
      showIndex: null,
      list: [], //未被格式化 以前的列表
      rules: {
        deptName: [
          { required: true, message: "此项为必填项， 请确认", trigger: "blur" }
        ],
        orderNum: [
          { required: true, message: "此项为必填项， 请确认", trigger: "blur" },
          { validator: validateNum, message: "请输入合法的数字", trigger: "blur" }
        ],
        ancestors: [
          { required: true, message: "此项为必填项， 请确认", trigger: "blur" }
        ],
        parentId: [
          { required: true, message: "此项为必填项， 请确认", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getOrganizeList(form) {
      getOrganizeList(form).then(res => {
        this.$emit("total", res.data.data.total);
        this.formatList = fn(res.data.data);
        this.formatList.forEach(item => {
          this.defaulExpanded.push(item.deptId);
        });
      }).catch(e => {
        this.$message.error(e);
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.deptName.indexOf(value) !== -1;
    },
    find() {
      this.$refs.tree.filter(this.form.deptName);
    },
    clear() {
      if (Object.keys(this.form).length !== 0) {
        this.form = this.$options.data().form;
        this.getOrganizeList(this.form);
      }
    },
    handleNodeClick(data) {
      this.row = data;
      this.showIndex === null ? console.log("1") : this.showForm(this.showTitle[this.showIndex]);
    },
    showForm(type) {
      if (type === "编辑") {
        this.dialogFormVisible = true;
        this.title = type;
        this.addForm.deptId = this.row.deptId;
        this.addForm.deptName = this.row.deptName;
        this.addForm.orderNum = this.row.orderNum;
        this.addForm.parentId = this.row.parentId;
      } else if (type === "新增") {
        this.dialogFormVisible = true;
        this.title = type;
        this.addForm = this.$options.data().addForm;
        this.addForm.parentId = this.row.deptId;
      } else {
        this.removeIt();
        this.showIndex = 0;
        console.log("--------");
      }
    },
    currentShow(index) {
      this.showIndex = index;
    },
    removeIt() {
      delOrganizeList(this.row.deptId).then(res => {
        if (res.data.code === 200) {
          this.defaulExpanded.push(this.row.parentId);
          this.getOrganizeList(this.form);
          this.$message.success("提交完成");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getSelectedValue(value) {
      this.addForm.parentId = value;
    },
    submitForm(addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          this.title === "新增" ? addOrganize(this.addForm).then(res => {
            if (res.data.code === 200) {
              this.dialogFormVisible = false;
              this.getOrganizeList(this.form);
              this.$message.success("提交完成");
              // this.getOrganizeList(this.form)
            } else {
              this.$message.error(res.data.msg);
            }
          }).catch(e => {
            this.$message.error(e);
          }) : upDataOrganize(this.addForm).then(res => {
            if (res.data.code === 200) {
              this.dialogFormVisible = false;
              this.getOrganizeList(this.form);
              this.defaulExpanded.push(this.row.deptId);
              this.$message.success("提交完成");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.showIndex = null;
      }
    }
  },
  components: {
    myTree,
    myFooter,
    myElTree,
    treeselect,
    myElHeader
  },
  created() {
    this.getOrganizeList(this.form);
  },
  computed: {
    createTime() {
      return this.addForm.createTime = getNowFormatDate();
    },
    parentId() {
      return parseInt(this.row.parentId);
    },
    parent: {
      get() {
        if (this.addForm.parentId === "0") {
          this.isDisabled = true;
          return this.addForm.deptId;
        } else {
          this.isDisabled = false;
          return this.addForm.parentId;
        }
      },
      set(value) {
        return this.addForm.parentId = value;
      }
    }
  }
};
</script>

<style>
.management {
  display: flex;
  height: calc(100vh - 160px);
  justify-content: space-between;
  flex-direction: column;
}

.input {
  width: 30%;
}

.custom-tree-node {
  width: 100%;
}

.tree {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tree-menu {
  padding: 10px 20px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: space-between;
}

.tree-menu p {
  width: 200px;
  text-align: center;
}

.tree .link {
  margin-right: 20px;
}

.tree div {
  width: 200px;
}

.nav-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin: 10px 0;
  min-width: 900px;
}

.form {
  height: 40px;
}

.add {
  text-align: right;
}
</style>
