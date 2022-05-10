<template>
  <!--  组织管理-->
  <div id="management">
    <el-form ref="form" :model="form" label-width="80px" :inline="true">
      <el-form-item label="组织名称">
        <el-input placeholder="请输入内容" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="组织状态">
        <el-select v-model="form.region">
          <el-option :label="item.label" :value="item.value" v-for="item in stats"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary">搜索</el-button>
    </el-form>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="addForm" :model="addForm" :rules="rules">
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="deptName">
          <el-input class="input" v-model="addForm.deptName" autocomplete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" :label-width="formLabelWidth" prop="orderNum">
          <el-input type="number" class="input" v-model="addForm.orderNum" autocomplete="off"
                    placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" :label-width="formLabelWidth" prop="parentId">

          <my-tree ref="myTree" style="width: 100%" :options="formatList" @getValue="getSelectedValue"></my-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio-group v-model="addForm.status">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-tree
      @node-click="handleNodeClick"
      :data="toTreeList"
      ref="tree"
      :expand-on-click-node="false"
      :node-key="formatList.deptId"
      :props="defaultProps"
      accordion>
      <div class="custom-tree-node" slot-scope="{node, data}">
        <div class="tree">
          <el-link type="info">
            {{ data.deptName }}
          </el-link>
          <div class="item-r">
            <el-link type="primary" class="link" @click="currentShow(0)">新增下一级</el-link>
            <el-link type="primary" class="link" @click="currentShow(1)">编辑</el-link>
          </div>
        </div>
      </div>
    </el-tree>
  </div>
</template>

<script>
import {
  addOrganize,
  delMenu,
  delOrganizeList,
  getOrganizeId,
  getOrganizeList,
  upDataOrganize
} from "@/newwork/system-colltroner";
import {fn, getNowFormatDate, menuToTree, treeToArray} from "@/uti";
import { isValidNumber } from "@/util/validate";
import myTree from "@/components/myTree";

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
      title: "新增",
      dialogFormVisible: false,
      dialogFormVisibles: false,
      formLabelWidth: "120px",
      form: {
        pageNum: 1,
        pageSize: 10
      },
      addForm: {
        deptName: "",  //部门名字
        orderNum: "", //显示顺序
        parentId: "", //父级单位
        status: 0 //状态
      },
      clickCount: 0,

      parentName: "", //父级单位
      row: [],  //获取当前 点击的那一行
      formatList: [],
      stats: [
        { label: "启用", value: "启用" },
        { label: "禁用", value: "禁用" }
      ],
      defaultProps: {
        children: "children",
        label: "deptName"
      },
      currentNodeKey: '',
      showTitle: ['新增','编辑'],
      showIndex: 0,
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
        this.formatList = fn(res.data.data);
        this.list = res.data.data
      }).catch(e => {
        this.$message.error(e)
      });
    },
    handleNodeClick(data) {
      this.row = data;
      this.showForm(this.showTitle[this.showIndex]);
    },
    showForm(type) {
      this.dialogFormVisible = true;
      this.title = type;
      if (type === "编辑") {
        this.addForm = this.row;
        const a = treeToArray(this.list);
        a.forEach(item =>{
          if(item.deptId === this.row.parentId){
            this.$nextTick(() => {
              this.$refs.myTree.valueName =item.deptName
            })
          }
        })
      } else {
        this.addForm = this.$options.data().addForm;
        this.addForm.parentId = this.row.deptId;
        this.$nextTick(() => {
          this.$refs.myTree.valueName = this.row.deptName
        })
      }
    },
    currentShow(index) {
      this.showIndex = index;
    },
    removeIt(e) {
      e.stopPropagation();
      delMenu(this.row.menuId).then(res => {
        if (res.data.code === 200) {
          this.delOrganizeList(this.form);
          this.dialogFormVisible = false;
          this.$message.success("提交完成");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getSelectedValue(value){
      this.addForm.parentId = value
    },
    submitForm(addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
         this.title === '新增' ? addOrganize(this.addForm).then(res => {
            if(res.data.code === 200){
              this.dialogFormVisible = false
              this.$message.success('提交完成')
              this.getOrganizeList(this.form)
            }else {
              this.$message.error(res.data.msg)
            }
          }).catch(e => {
            this.$message.error(e)
          }) : upDataOrganize(this.addForm).then(res => {
           if(res.data.code === 200){
             this.dialogFormVisible = false
             this.getOrganizeList(this.form)
             this.$message.success('提交完成')
           }else {
             this.$message.error(res.data.msg)
           }
         })
        } else {
          this.$message({
            message: "提交失败, 请重试",
            type: "error"
          });
        }
      });
    }
  },
  components: {
    myTree
  },
  created() {
    this.getOrganizeList(this.form);
  },
  computed: {
    createTime() {
      return this.addForm.createTime = getNowFormatDate();
    },
    toTreeList() {
      return fn(this.formatList);
    },
  },
};
</script>

<style>
.input {
  width: 30%;
}

.operate a {
  margin: 0 10px;
}

.custom-tree-node {
  width: 100%;
}

.tree {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tree .link {
  margin-right: 20px;
}

.form-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
