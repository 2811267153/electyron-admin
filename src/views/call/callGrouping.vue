<template>
  <div class="warps">
    <my-el-header title="分组管理" />
    <div class="container">
      <div class="container-l">
        <e-tree @treeClick="treeClick" :data="treeArr" />
      </div>
      <div class="container-r">
        <div class="form-nav">
          <el-form
            :inline="true"
            :close-on-click-modal="false"
            :model="form"
            class="demo-form-inline"
            :rules="form"
            ref="form"
          >
            <el-form-item label="分组名称" prop="diaplanRateGroup">
              <el-input
                v-model="form.routerName"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="分组状态" prop="diaplanRateGroup">
              <el-input
                v-model="form.desType"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="find">查询</el-button>
              <el-button @click="clear">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="showAddForm(null, '添加呼叫路由')"
          >添加分组
          </el-button>
        </div>
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="date" label="序号" width="50">
            <template scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="groupName" label="分组名称" width="180">
          </el-table-column>
          <el-table-column prop="deptId" label="所属部门"></el-table-column>
          <el-table-column prop="displayBench" label="是否显示">
            <template scope="scope">
              <div v-if="scope.row.displayBench === 0">显示</div>
              <div v-else>不显示</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="address"
            fixed="right"
            :width="$store.state.tableMixWidth"
            label="操作"
          >
            <template scope="scope">
              <div class="operate">
                <el-link type="info" @click="showAddForm(scope.row, '编辑')"
                >编辑
                </el-link
                >

                <template>
                  <el-popconfirm
                    title="确认要删除吗？"
                    @confirm="removeIt(scope.row, '删除')"
                  >
                    <el-link slot="reference" class="link-item">删除</el-link>
                  </el-popconfirm>
                </template>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog :title="title" width="1000px" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" ref="addForm">
        <div class="width">
          <el-form-item label="组织名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.groupName" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="所属组织" :label-width="formLabelWidth">
            <treeselect
              v-model="addForm.deptId"
              :multiple="false"
              :options="treeArr"
              :normalizer="normalizer"
            />
          </el-form-item>
        </div>
        <!--        <div style="padding-bottom: 20px">-->
        <!--          <el-row>-->
        <!--            <el-col :span="8">-->

        <!--            </el-col>-->
        <!--            <el-col :span="16">-->
        <!--                                    <el-transfer v-model="addForm.directoryIdList" :titles="['全部', '已筛选']" :data="userList">-->
        <!--                                      <span slot-scope="{option}">-->
        <!--                                        {{ option.label }}-->
        <!--                                      </span>-->
        <!--                                    </el-transfer>-->
        <!--            </el-col>-->
        <!--          </el-row>-->
        <!--        </div>-->


        <div class="width" style="height: auto">
          <el-form-item label="分组成员" :label-width="formLabelWidth">
            <draggable
              @click.native="showGridDialog"
              class="grid"
              v-model="selectList"
              group="people"
              @change="draggableChange"
              v-if="selectList.length !== 0"
            >
              <div
                class="user-item"
                v-for="element in selectList"
                :key="element.key"
              >
                {{ element.label || element.directoryNumber }}
              </div>
            </draggable>
            <draggable
              @click.native="showGridDialog"
              class="grid margin"
              v-model="selectList"
              group="people"
              @change="draggableChange"
              v-else
            >
              (点击打开悬浮窗编辑分组成员)
            </draggable>

          </el-form-item>
        </div>
        <div class="width" style="margin-top: 20px;">
          <el-form-item label="排序" :label-width="formLabelWidth">
            <el-input v-model="addForm.orderNum" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="控制台显示" :label-width="formLabelWidth">
            <el-select
              v-model="addForm.displayBench"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in displayBench"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subInfo">确 定</el-button>
      </div>
    </el-dialog>
    <!--    选择组织成员弹出框-->
    <el-dialog title="组织成员" :visible.sync="deptIdDialogFormVisible">
      <el-form :model="form">
        <div class="width">
          <el-form-item label="选择部门" :label-width="formLabelWidth">
            <treeselect
              v-model="deptId"
              @input="treeselectChange"
              :multiple="false"
              :options="treeArr"
              :normalizer="normalizer"
            />
          </el-form-item>
        </div>

        <div class="grid dialog">
          <div
            class="grid-item user-item"
            @click="gridItemClick(item)"
            v-for="item in userList"
            :key="item.key"
          >
            <p>{{ item.label }}</p>
            <i class="el-icon-circle-check"></i>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="deptIdDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <my-footer />
  </div>
</template>

<script>
import eTree from "../../components/eTree.vue";
import myElHeader from "@/components/myElHeader";
import myFooter from "@/components/myFooter";
import { getOrganizeList } from "@/newwork/system-colltroner";
import { fn } from "@/uti";
import { addGroupData, deleteGroupData, getGroupData } from "@/newwork/call-router";
import treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import draggable from "vuedraggable";
import { getDirectory } from "@/newwork/directory";

export default {
  name: "callGrouping",
  components: {
    myElHeader,
    myFooter,
    eTree,
    treeselect,
    draggable
  },
  data() {
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
      defaultProps: {
        children: "children",
        label: "deptName"
      },
      value: [],
      form: {},
      addForm: {
        deptId: null,
        directoryIdList: [], //分组列表,
        displayBench: "", //      控制台显示(0：显示 1：不显示)
        groupName: "", // 分组名称
        orderNum: "" //    排序
      },
      deptId: null, // 选择部门id
      selectList: [], //当前选择的用户
      treeArr: [],
      list: [],
      userList: [],
      title: "添加分组",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      deptIdDialogFormVisible: false,
      props: {
        key: "id",
        label: "deptName"
      },
      displayBench: [
        { label: "显示", value: 0 },
        { label: "不显示", value: 1 }
      ]
    };
  },
  methods: {
    find() {
    },
    clear() {
      this.form = this.$options.data().form;
    },
    showAddForm(row, title) {
      this.title = title;
      this.dialogFormVisible = true;
      if (title === "编辑") {
        this.selectList = JSON.parse(JSON.stringify(row.directoryIdList));
        this.addForm.displayBench = row.displayBench;
        this.addForm.groupName = row.groupName;
        this.addForm.orderNum = row.orderNum;
        this.addForm.deptId = row.deptId;
        // this.userList = JSON.parse(JSON.stringify(row.directoryIdList));
        // console.log("addForm", this.addForm);
        console.log(row);
      }
    },
    treeClick() {
    },
    //获取选中的用户列表
    gridItemClick(item) {
      this.selectList.push(item);
    },
    removeIt(row) {
      deleteGroupData(row.id).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success("提交完成");
          this.getGroupData(this.form);
        }
      });
    },

    //获取所有的设备列表
    handleNodeClick(deptId) {
      const form = {
        pageSize: 100000
      };
      form.deptId = deptId;
      getDirectory(form).then((res) => {
        console.log("form", res.data.data.records);
        let data = res.data.data.records;
        let fomaterData = [];
        for (let i = 0; i < data.length; i++) {
          fomaterData.push({
            key: data[i].id,
            label: data[i].directoryName
          });
        }
        this.userList = fomaterData;

        //检测重复添加项
        this.userList.forEach((item, i) => {
          if (item.key === this.selectList[i].key) {
            console.log("aaaa");
          }
        });
      });
    },
    treeselectChange() {
      this.handleNodeClick(this.deptId);
    },

    getGroupData(form) {
      getGroupData(form).then((res) => {
        if (res.data.code === 200) {
          this.list = res.data.data.records;
        }
      });
    },
    subInfo() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          addGroupData(this.addForm).then((res) => {
            if (res.data.code === 200) {
              this.getGroupData(this.form);
              this.$message.success("提交完成");
              this.dialogFormVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    draggableChange() {
      let fomaterSelectList = [];
      this.selectList.forEach((item, i) => {
        fomaterSelectList.push({
          directoryId: item.key || item.directoryId,
          orderNum: i
        });
        this.addForm.directoryIdList = fomaterSelectList;
      });
    },
    showGridDialog() {
      console.log("-----");
      this.deptIdDialogFormVisible = true;
    }
  },
  created() {
    getOrganizeList().then((res) => {
      this.treeArr = fn(res.data.data);
    });
    this.getGroupData(this.form);
  },
  watch: {
    deptId(value) {
      if (value.length === 0) {
        this.selectList = [];
        this.userList = [];

      }
    },
    selectList() {
      this.draggableChange();
    },
    dialogFormVisible(value) {
      if (!value) {
        this.addForm = this.$options.data().addForm;
        this.selectList = [];
        this.deptId = null;
      }
    },
    deptIdDialogFormVisible(value) {
      if (!value) {
        this.deptIdDialogFormVisible = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 20px;
  background-color: #fff;
  flex-direction: row;
}

.container-r {
  flex: 1;
}

.grid {
  display: flex;
  border-radius: 5px;
  padding: 10px 15px;
  flex-wrap: wrap;
  min-height: 65px;
  align-items: center;
  background-color: #f2f2f2;
  margin: 0;
  width: 100%;
}

.user-item {
  padding: 4px 15px;
  margin: 5px;
  height: 35px;
  background-color: #fff;
  border-radius: 5px;
  line-height: 30px;
}

.margin {
  align-items: center;
  justify-content: center;
}

.dialog {
  margin: 0 50px 0 120px;
  width: calc(100% - 120px - 50px);
}

.user-item {
  position: relative;
}

.user-item i {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
