<template>
  <div class="warps">
    <my-el-header title="点名组管理" />
    <div class="container">
      <div class="container-l">
        <e-tree @treeClick="treeClick" :data="treeArr" />
      </div>
      <div class="container-r">
        <div class="form-nav">
          <el-form :inline="true" :close-on-click-modal="false" :model="form" class="demo-form-inline" :rules="form"
                   ref="form">
            <el-form-item label="广播名称" prop="diaplanRateGroup">
              <el-input v-model="form.routerName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="点广播状态" prop="diaplanRateGroup">
              <el-input v-model="form.desType" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="find">查询</el-button>
              <el-button @click="clear">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="showAddForm(null, '新增广播')"
          >添加广播
          </el-button
          >
        </div>
        <el-table
          :data="list"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="序号"
            width="50">
            <template scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            prop="broadcastName"
            label="广播名称"
            width="">
          </el-table-column>
          <el-table-column
            prop="broadcastName"
            label="广播内容"
            width="">
          </el-table-column>
          <el-table-column
            prop="currentStartTime"
            label="开始时间"
            width="">
          </el-table-column>
          <el-table-column
            prop="currentStartTime"
            label="结束时间"
            width="">
          </el-table-column>
          <el-table-column
            prop="deptId"
            label="所属组织"
            width="">
            <template scope="scope">{{ deptName(scope.row.deptId) }}</template>
          </el-table-column>
          <el-table-column
            prop="mode"
            label="广播类型"
            width="">
            <template scope="scope">
              <div v-if="scope.row.mode === '1'">文字任务</div>
              <div v-if="scope.row.mode === '2'">音乐任务</div>
              <div v-if="scope.row.mode === '3'">采播任务</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="address" label="操作" fixed="right" :width="$store.state.tableMixWidth">
            <template scope="scope">
              <div class="operate">
                <el-link type="info" @click="showAddForm(scope.row, '编辑')">编辑</el-link>
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
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" ref="addForm">
        <div class="width">
          <el-form-item label="广播名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addForm.broadcastName" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="所属部门" :label-width="formLabelWidth" prop="deptId">
            <treeselect v-model="addForm.deptId" :multiple="false " :options="treeArr"
                        :normalizer="normalizer" />
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="广播内容" :label-width="formLabelWidth" prop="deptId">
            <el-input v-model="addForm.context" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width" style="height: auto">
          <el-form-item label="广播成员" :label-width="formLabelWidth">
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
                v-for="element in a"
                :key="element.key"
              >
                {{ element.label || element.directoryName }}
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
        <div class="width">
          <el-form-item label="广播类型" :label-width="formLabelWidth" prop="seqType">
            <el-radio-group v-model="addForm.seqType">
              <el-radio :label="0">计划点名</el-radio>
              <el-radio :label="1" disabled>周期点名</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="width">
          <el-form-item label="广播方式" :label-width="formLabelWidth">
            <el-select v-model="addForm.mode" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in broadcasType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="width" v-show="addForm.seqType === 0">
          <el-form-item label="会议开始时间" :label-width="formLabelWidth" prop="time1">
            <el-date-picker
              style="width: 100%"
              @change="dataChange"
              v-model="time1"
              format="yyyy MM dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="width" v-show="addForm.seqType !== 0">
          <el-form-item label="cron" :label-width="formLabelWidth" prop="icon">
            <div class="width-cron" :class="isActive ? '' : 'z-index'" style="width: 100%" @click="aClick">
              <el-input v-model="addForm.cron" ref="inputs" @focus="focus" @blur="blur" placeholder
                        style="width: 100%"></el-input>
              <vcrontab :class="isActive ? 'active' : 'feActive'" @hide="showCron=false"
                        :hideComponent="hideComponent" @fill="crontabFill"
                        :expression="expression"></vcrontab>
            </div>
            <!--            反编译-->
            <!--            <div class="box">-->
            <!--              <el-input v-model="addForm.cron" placeholder class="inp"></el-input>-->
            <!--              <el-button type="primary" @click="showDialog">生成 cron</el-button>-->
            <!--            </div>-->
          </el-form-item>
        </div>
        <div class="width" v-show="addForm.seqType !== 0">
          <el-form-item label="会议开始时间" :label-width="formLabelWidth" prop="time">
            <el-time-picker
              is-range
              @change="timeChange"
              v-model="time"
              range-separator="至"
              format="HH:mm"
              value-format="HH:mm"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </el-form-item>
        </div>
        <div style="height: 310px"></div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subInfo">确 定</el-button>
      </div>
    </el-dialog>
    <!--    选择广播成员弹出框-->
    <el-dialog title="组织成员" :visible.sync="deptIdDialogFormVisible">
      <el-form :model="form" style="height: 300px">
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
            :key="item.id"
          >
            <p>{{ item.directoryName }}</p>
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
import myElHeader from "@/components/myElHeader";
import myFooter from "@/components/myFooter";
import eTree from "@/components/eTree";
import { getOrganizeId, getOrganizeList } from "@/newwork/system-colltroner";
import { fn } from "@/uti";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import treeselect from "@riophae/vue-treeselect";
import draggable from "vuedraggable";
import vcrontab from "@illidanj/cron-editor";
import { getDirectory } from "@/newwork/directory";
import { addBroadcast, delBroadcast, getBroadcast, upDataBroadcast } from "@/newwork/call-router";

export default {
  name: "callRoll",
  components: {
    myElHeader,
    myFooter,
    eTree,
    treeselect,
    draggable,
    vcrontab
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
      form: {},
      deptIdDialogFormVisible: false,
      selectList: [], //广播成员
      addForm: {
        broadcastName: "",//点名组名称
        context: "", //广播内容
        currentEndTime: "",//	 即时广播结束时间(年月日时分秒)
        currentStartTime: "",//	 即时广播开始时间(年月日时分秒)
        deptId: null, //所属部门,
        cron: "", //cron,
        endTime: "", //周广播结束时间(计划点名)
        startTime: "", //周广播开始时间(计划点名)
        member: "", //会议成员
        mode: "",//广播方式（1：文字任务 2：音乐任务 3：采播任务）
        recurringType: "", //重复类型0：每天1：每周2：每月
        roundEnd: "", //周期结束日期
        seqType: 0 //会议类型(0:即时会议 1:周期会议)
      },
      list: [],
      title: "新增点名组",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      time1: [],
      time: [],
      userList: [], //话单成员
      deptId: null, //当前选择的部门
      treeArr: [],
      isActive: false,
      expression: "",
      hideComponent: ["year", "second", "min", "hour"],
      showCron: false,
      broadcasType: [
        { label: "文字任务", value: "1" },
        { label: "音乐任务", value: "2" },
        { label: "采播任务", value: "3" }
      ],
      a: []
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
        this.addForm = JSON.parse(JSON.stringify(row));
        let res = [];
        res = this.addForm.member.split("|");
        console.log(res);
        res.forEach(item => {
          this.getDirectory(item);
        });
        this.time1[1] = this.addForm.currentEndTime;
        this.time1[0] = this.addForm.currentStartTime;
      }
    },
    draggableChange(e) {
      console.log(e);
    },
    treeClick() {
    },
    dataChange() {
      this.addForm.currentStartTime = this.time1[0];
      this.addForm.currentEndTime = this.time1[1];
    },
    timeChange() {
      this.addForm.startTime = this.time[0];
      this.addForm.endTime = this.time[1];
    },
    //根据广播成员 获取成员信息
    getDirectory(item) {
      let data = {};
      data.detpId = item;
      data.pageNum = 1;
      data.pageSize = 1;
      getDirectory(data).then(res => {
        console.log(res);
        this.selectList.push(...res.data.data.records);
      });
    },
    //选择话单成员弹出框
    showGridDialog() {
      this.deptIdDialogFormVisible = true;
    },

    crontabFill(value) {
      //确定后回传的值
      this.addForm.cron = value;
    },
    focus() {
      this.isActive = true;
    },
    blur() {
      this.isActive = false;
    },
    aClick() {
      this.$refs.inputs.focus();
    },
    treeselectChange() {
      const form = {};
      form.pageSize = 10000;
      form.deptId = this.deptId;
      getDirectory(form).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.userList = res.data.data.records;
        }
      });
    },
    removeIt(row) {
      delBroadcast(row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("提交完成");
          this.getBroadcast(this.form);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //讲选择的话机成员添加到列表内
    gridItemClick(item) {
      if (item.select) {
        item.select = false;
      } else {
        item.select = true;
        this.selectList.push(item);
        this.a = [...new Set(this.selectList)];
        const selectListID = [];
        this.a.forEach(item => {
          selectListID.push(item.id);
        });
        this.addForm.member = selectListID.join("|");
      }
    },
    //提交表单
    subInfo() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          if (this.title === "编辑") {
            upDataBroadcast(this.addForm).then(res => {
              if (res.data.code === 200) {
                this.getBroadcast(this.form);
                this.$message.success("修改完成");
                this.dialogFormVisible = false;
              }
            });
          } else {
            addBroadcast(this.addForm).then(res => {
              if (res.data.code === 200) {
                this.getBroadcast(this.form);
                this.$message.success("提交完成");
                this.dialogFormVisible = false;
              }
            });
          }
          ;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getBroadcast(form) {
      getBroadcast(form).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$bus.$emit("total", res.data.data.total);
          this.list = res.data.data.records;
        }
      });
    },
    //查询组织列表
    deptName(deptId) {
      getOrganizeId(deptId).then(res => {

      });
      return deptId;
    }

  },
  created() {
    this.getBroadcast(this.form);
    getOrganizeList().then(res => {
      this.treeArr = fn(res.data.data);
    });
  },

  computed: {},

  watch: {
    dialogFormVisible(value) {
      if (!value) {
        this.addForm = this.$options.data().addForm;
        this.selectList = [];
        this.time1 = [];
        this.time = [];
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

.width {
  position: relative;
}

.width-cron {
  position: absolute;
  top: 10px;
  left: 0;
  height: 200px;
  z-index: 10;
  background-color: #fff;
}


.grid {
  display: flex;
  border-radius: 5px;
  padding: 10px 15px;
  flex-wrap: wrap;
  align-items: center;
  min-height: 65px;
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
