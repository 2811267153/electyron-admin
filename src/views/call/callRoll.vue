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
            <el-form-item label="点名组名称" prop="diaplanRateGroup">
              <el-input v-model="form.routerName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="点名组状态" prop="diaplanRateGroup">
              <el-input v-model="form.desType" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="find">查询</el-button>
              <el-button @click="clear">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="showAddForm(null, '新增点名组')"
          >添加分组
          </el-button
          >
        </div>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addForm">
        <div class="width">
          <el-form-item label="点名组名称" :label-width="formLabelWidth" prop="name">
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
          <el-form-item label="广播成员" :label-width="formLabelWidth">
            <draggable
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
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="点名类型" :label-width="formLabelWidth" prop="seqType">
            <el-radio-group v-model="addForm.seqType">
              <el-radio :label="0">计划点名</el-radio>
              <el-radio :label="1">周期点名</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="width" v-show="addForm.seqType === 0">
          <el-form-item label="会议开始时间" :label-width="formLabelWidth" prop="time1">
            <el-date-picker
              style="width: 100%"
              @change="dataChange"
              v-model="time1"
              format="yyyy MM dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
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
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <my-footer />
  </div>
</template>

<script>
import myElHeader from "@/components/myElHeader";
import myFooter from "@/components/myFooter";
import eTree from "@/components/eTree";
import { getOrganizeList } from "@/newwork/system-colltroner";
import { fn } from "@/uti";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import treeselect from "@riophae/vue-treeselect";
import draggable from "vuedraggable";

export default {
  name: "callRoll",
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
      form: {},
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
      title: "新增点名组",
      dialogFormVisible: true,
      formLabelWidth: "120px",
      time1: [],
      time: [],
      treeArr: [],
      isActive: false,
      expression: "",
      hideComponent: ["year", "second", "min", "hour"],
      showCron: false,
      broadcasType: [
        { label: "文字任务", value: 1 },
        { label: "音乐任务", value: 2 },
        { label: "采播任务", value: 3 }
      ]
    };
  },
  methods: {
    find() {
    },
    clear() {
      this.form = this.$options.data().form;
    },
    showAddForm() {

    },
    draggableChange(e) {
      console.log(e);
    },
    treeClick() {
    },
    dataChange() {
      this.addForm.currentEndTime = this.time1[1];
      this.addForm.currentStartTime = this.time1[0];
    },
    timeChange() {
      this.addForm.endTime = this.time[1];
      this.addForm.startTime = this.time[0];
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
    }

  },
  created() {
    getOrganizeList().then(res => {
      this.treeArr = fn(res.data.data);
    });
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
  height: 65px;
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
