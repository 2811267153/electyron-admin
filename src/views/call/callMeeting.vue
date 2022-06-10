<template>
  <div class="warps">
    <my-el-header title="分组管理" />
    <div class="container">
      <div class="container-l">
        <e-tree @treeClick="treeClick" :data="treeArr" />
      </div>
      <div class="container-r">
        <div class="form-nav">
          <el-form :inline="true" :close-on-click-modal="false" :model="form" class="demo-form-inline" :rules="form"
                   ref="form">
            <el-form-item label="会议名称" prop="diaplanRateGroup">
              <el-input v-model="form.routerName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="会议状态 " prop="diaplanRateGroup">
              <el-select v-model="form.desType" placeholder="请选择">
                <el-option
                  v-for="item in meetingState"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="会议类型  " prop="diaplanRateGroup">
              <el-select v-model="form.meetingType" placeholder="请选择">
                <el-option
                  v-for="item in meetingState"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="find">查询</el-button>
              <el-button @click="clear">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="showAddForm(null, '添加呼叫路由')"
          >添加分组
          </el-button
          >
        </div>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <div class="width">
          <el-form-item label="会议名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.conferenceName" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="会议类型" :label-width="formLabelWidth">
            <el-radio-group v-model="addForm.conferenceType">
              <el-radio :label="0">音频会议</el-radio>
              <el-radio :label="1">视频会议</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="是否录音" :label-width="formLabelWidth">
            <el-radio-group v-model="addForm.isRecord">
              <el-radio :label="0">不录音</el-radio>
              <el-radio :label="1">录音</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="所属组织" :label-width="formLabelWidth">
            <treeselect v-model="addForm.deptId" :multiple="false " :options="treeArr"
                        :normalizer="normalizer" />
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="开始时间" :label-width="formLabelWidth">
            <el-time-select
              style="width: 100%"
              v-model="addForm.startTime"
              :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }"
              placeholder="选择时间">
            </el-time-select>
          </el-form-item>
          <el-form-item label="结束时间" :label-width="formLabelWidth">
            <el-time-select
              style="width: 100%"
              v-model="addForm.endTime"
              :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }"
              placeholder="选择时间">
            </el-time-select>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="主持人号码" :label-width="formLabelWidth">
            <el-input v-model="addForm.master" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="会议成员" :label-width="formLabelWidth">
            <el-select @change="selectChange" v-model="member" multiple placeholder="请选择" style="width: 100% ">
              <el-option
                v-for="item in memberList"
                :key="item.nickName"
                :label="item.nickName"
                :value="item.nickName">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="会议类型" :label-width="formLabelWidth">
            <el-radio-group v-model="addForm.seqType">
              <el-radio :label="0">临时会议</el-radio>
              <el-radio :label="1">周期会议</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="width" v-show="addForm.seqType === 0">
          <el-form-item label="会议开始时间" :label-width="formLabelWidth">
            <el-time-select
              v-model="addForm.currentStartTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
              placeholder="选择时间">
            </el-time-select>
          </el-form-item>
          <el-form-item label="会议结束时间" :label-width="formLabelWidth">
            <el-time-select
              v-model="addForm.currentEndTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
              placeholder="选择时间">
            </el-time-select>
          </el-form-item>
        </div>
        <div class="width" style="height: auto" v-show="addForm.seqType !== 0">
          <el-form-item label="时间周期" :label-width="formLabelWidth">
            <div class="width-cron">
              <el-input v-model="addForm.cron" placeholder></el-input>
              <vcrontab @hide="showCron=false" :hideComponent="hideComponent" @fill="crontabFill"
                        :expression="expression"></vcrontab>
            </div>
            <!--            反编译-->
            <!--            <div class="box">-->
            <!--              <el-input v-model="addForm.cron" placeholder class="inp"></el-input>-->
            <!--              <el-button type="primary" @click="showDialog">生成 cron</el-button>-->
            <!--            </div>-->
          </el-form-item>
        </div>
        <div class="width" v-if="addForm.recurringType ===0">
          <el-form-item label="会议开始时间" :label-width="formLabelWidth">
            <el-time-select
              v-model="addForm.startTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
              placeholder="选择时间">
            </el-time-select>
          </el-form-item>
          <el-form-item label="会议结束时间" :label-width="formLabelWidth">
            <el-time-select
              v-model="addForm.endTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
              placeholder="选择时间">
            </el-time-select>
          </el-form-item>
        </div>
        <div class="width">
          <el-form-item label="会议密码" :label-width="formLabelWidth">
            <el-input v-model="addForm.password" autocomplete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <my-footer />
  </div>
</template>

<script>
import myElHeader from "@/components/myElHeader";
import myFooter from "@/components/myFooter";
import eTree from "@/components/eTree";
import { getOrganizeList, getUserAll } from "@/newwork/system-colltroner";
import { fn } from "@/uti";
import treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { addMeeting } from "@/newwork/call-router";
import vcrontab from "@illidanj/cron-editor";

export default {
  name: "callMeeting",
  components: {
    myElHeader,
    myFooter,
    eTree,
    treeselect,
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
      cronPopover: false,


      form: {},
      addForm: {
        conferenceName: "",//会议名称
        conferenceType: 0,//会议类型（0:音频会议、1:视频会议）
        deptId: null,//所属区域
        endTime: "",//会议结束时间(时分秒)
        isRecord: 0,//是否录音（0：默认不录音，1为录音）
        master: "",//主持人号码
        member: "",//会议成员列表(|分割)
        numWeek: "",//第几周（1-4）（每月）
        password: "",//会议密码
        recurringType: "", //重复类型0：每天1：每周2：每月
        remark: "",//备注
        roundEnd: "",//周期结束日期
        startTime: "", //会议开始时间(时分秒)
        seqType: 0, // 会议类型(0:即时会议 1:周期会议)
        currentEndTime: "", //临时会议结束时间
        currentStartTime: "", //临时会议开始时间
        cron: ""
      },
      memberList: "",
      treeArr: [],
      dialogFormVisible: true,
      formLabelWidth: "120px",
      title: "添加分组",
      meetingState: [
        { label: "已开始", value: 0 },
        { label: "进行中", value: 1 },
        { label: "已结束", value: 2 }
      ],
      meetingType: [
        { label: "临时会议", value: 0 },
        { label: "周期会议", value: 1 }
      ],
      member: [],
      expression: "",
      showCron: false,
      hideComponent: ["year"]
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
    treeClick() {
    },
    getUserList(deptId) {
      const form = {};
      form.deptId = deptId;
      form.pageSize = 1000000;
      getUserAll(form).then(res => {
        console.log(res);
        this.memberList = res.data.data.records;
      });
    },
    submitForm() {
      if (this.title === "添加分组") {
        addMeeting(this.addForm).then(res => {
          console.log(res);
        });
      }
    },
    selectChange() {
      this.addForm.member = this.member.join("|");
    },
    showDialog() {
      this.expression = this.input;//传入的 cron 表达式，可以反解析到 UI 上
      this.showCron = true;
    },
    crontabFill(value) {
      //确定后回传的值
      this.addForm.cron = value;
    }
  },
  created() {
    getOrganizeList().then(res => {
      this.treeArr = fn(res.data.data);
    });
  },

  watch: {
    addForm: {
      deep: true,
      handler(value) {
        this.getUserList(value.deptId);
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

</style>
