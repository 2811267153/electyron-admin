<template>
  <div class="warps">
    <my-el-header />
    <div class="container">
      <div class="tree-menu">
        <div class="tree-path" style="padding-left: 20px">
          菜单名称
        </div>
        <div class="item-r">
          <div>菜单路径</div>
        </div>
        <div class="item-r">
          <div>权限</div>
        </div>
        <div class="item-r">
          <div>操作</div>
        </div>
      </div>
      <el-tree
        :data="path"
        :props="defaultProps"
        node-key="menuId"
        :expand-on-click-node="false"
        :indent="15"
        @node-click="meunClick"
        :default-expanded-keys="defaultShowNodes"
        accordion>
        <div class="custom-tree-node" slot-scope="{node, data}">
          <div class="tree">
            <div class="tree-path">
              {{ data.menuName }}
            </div>
            <div class="item-r">
              <p>{{ data.path }}
              </p>
            </div>
            <div class="item-r" style="text-align: center">
              <span v-if="data.menuType === 'M'">菜单</span>
              <span v-if="data.menuType === 'F'">按钮</span>
            </div>
            <div class="item-r" style="text-align: center">
              <el-link type="primary" class="link" @click="currentShow(0)">新增</el-link>
              <el-link type="primary" class="link" @click="currentShow(1)">编辑</el-link>
              <el-link type="primary" class="link" @click="currentShow(2)">删除</el-link>
            </div>
          </div>
        </div>
      </el-tree>
      <div>
        <el-dialog :width="$store.state.dialogWidth" :title="title" :visible.sync="dialogFormVisible" destroy-on-close
                   :close-on-click-modal="false">
          <el-form :model="addForm" ref="addForm" :rules="rules">
            <div class="width">
              <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="menuName">
                <el-input v-model="addForm.menuName" autocomplete="off" placeholder="请输入内容"></el-input>
              </el-form-item>

            </div>
            <div class="width">
              <el-form-item label="菜单类型" :label-width="formLabelWidth" prop="menuType">
                <el-select v-model="addForm.menuType" style="width: 100%;">
                  <el-option v-for="item in menuType" :value="item.value" placeholder="请输入内容"
                             :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item label="显示顺序" :label-width="formLabelWidth" prop="orderNum">
                <el-input v-model="addForm.orderNum" placeholder="请输入内容" />
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item label="菜单图标" :label-width="formLabelWidth" prop="orderNum">
                <el-input v-model="addForm.icon" placeholder="请输入内容" />
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item label="父菜单" :label-width="formLabelWidth" prop="parentId">
                <treeselect v-model="parentId" :multiple="false" :options="path"
                            :normalizer="normalizer" />
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item label="路由地址" :label-width="formLabelWidth" prop="path">
                <el-input v-model="addForm.path" placeholder="请输入内容" />
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item label="权限标识" :label-width="formLabelWidth" prop="perms">
                <el-input v-model="addForm.perms" placeholder="请输入内容" />
              </el-form-item>
            </div>
            <div class="width">
              <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
                <el-radio-group v-model="addForm.status">
                  <el-radio :label="0">开启</el-radio>
                  <el-radio :label="1">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <div class="form-bottom">
              <a href=""></a>
              <div>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { addMenuAll, delMenu, getMenuAll, upDataMenu } from "@/newwork/system-colltroner";
import { menuToTree } from "@/uti";
import myElHeader from "@/components/myElHeader";
import treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "menu-path",
  components: {
    myElHeader,
    treeselect
  },

  data() {
    return {
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.menuId,
          children: node.children,
          label: node.menuName
        };
      },
      title: "新增",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {},
      path: [],
      defaultProps: {
        children: "children",
        label: "menuName"
      },
      addForm: {
        menuName: "",
        menuType: "",
        orderNum: "",
        parentId: "",
        path: "",
        perms: "",
        status: 0
      },
      showTitle: ["新增", "编辑", "删除"],
      showIndex: null,
      row: {},
      defaultShowNodes: [],
      menuType: [
        { label: "目录", value: "C" },
        { label: "菜单", value: "M" },
        { label: "按钮", value: "F" }
      ],
      statusType: [
        { label: "开启", value: 0 },
        { label: "关闭", value: 1 }
      ],
      rules: {
        menuName: [{ required: true, message: "该选项不可为空, 请确认", trigger: "blur" }],
        menuType: [{ required: true, message: "该选项不可为空, 请确认", trigger: "blur" }],
        orderNum: [{ required: true, message: "该选项不可为空, 请确认", trigger: "blur" }],
        parentId: [{ required: true, message: "该选项不可为空, 请确认", trigger: "blur" }],
        path: [{ required: true, message: "改选行不可为空, 请确认", trigger: "blur" }],
        perms: [{ required: true, message: "改选行不可为空, 请确认", trigger: "blur" }],
        status: [{ required: false, message: "改选行不可为空, 请确认", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getMenuAll(this.form);
  },
  methods: {
    getMenuAll(form) {
      getMenuAll(form).then(res => {
        this.list = res.data.data;
        this.path = menuToTree(res.data.data);
      }).catch(e => {
        console.log(e);
        this.$message.error(e);
      });
    },
    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.title === "新增" ? addMenuAll(this.addForm).then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.$message.success("提交完成");
                this.dialogFormVisible = false;
                this.getMenuAll();
              } else {
                this.$message.error(res.data.msg);
              }
            }) :
            upDataMenu(this.addForm).then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.getMenuAll();
                this.dialogFormVisible = false;
                this.$message.success("提交完成");
              } else {
                this.$message.error(res.data.msg);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    meunClick(data) {
      this.row = data;
      this.showIndex === null ? console.log("1") : this.showForm(this.showTitle[this.showIndex]);
    },
    showForm(type) {

      this.title = type;
      if (type === "编辑") {
        this.dialogFormVisible = true;
        this.addForm = this.row;
      } else if (type === "新增") {
        this.dialogFormVisible = true;
        this.showIndex = null;
        this.addForm = this.$options.data().addForm;
        this.addForm.parentId = this.row.menuId;
      } else {
        this.removeIt();
        this.showIndex = null;
      }
    },
    currentShow(index) {
      this.showIndex = index;
    },
    removeIt() {
      delMenu(this.row.menuId).then(res => {
        if (res.data.code === 200) {
          this.getMenuAll(this.form);
          this.dialogFormVisible = false;
          this.$message.success("提交完成");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  },
  computed: {
    // pathRes(){
    //   return (this.path)
    // }
    parentId: {
      get() {
        if (this.addForm.parentId === "0") {
          return this.addForm.menuId;
        } else {
          return this.addForm.parentId;
        }
      },
      set(val) {
        return this.addForm.parentId = val;
      }
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.showIndex = null;
      }
    },
    path: {
      handler() {
        console.log(this.path);
        this.path.forEach(item => {
          this.defaultShowNodes.push(item.menuId);
        });
      },
      deep: true
    }
  }
};
</script>

<style>
.custom-tree-node {
  width: 100%;
}

.tree-menu {
  display: flex;
  background-color: #ccc;
  color: #fff;
  line-height: 48px;
}

.tree {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tree-path {
  flex: 1;
  font-size: 16px;
}

.tree .link {
  margin-right: 20px;
}

.form-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-r {
  width: 200px;
}

.item-r div {
  text-align: center;
}

.grid-content {
  text-align: center;
}
</style>
