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
            <el-select v-model="addForm.member" multiple placeholder="请选择" style="width: 100% ">
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

        <div class="width" v-if="addForm.seqType === 0">
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
        <div class="width" v-else>
          <el-form-item label="时间周期" :label-width="formLabelWidth">
            <el-radio-group v-model="addForm.recurringType">
              <el-radio :label="0">每天</el-radio>
              <el-radio :label="1">每周</el-radio>
              <el-radio :label="2">每月</el-radio>
            </el-radio-group>
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
        <div class="width" v-else-if="addForm.recurringType === 1">
          <el-form-item label="时间周期" :label-width="formLabelWidth">
            <el-checkbox-group v-model="addForm">
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
              <el-checkbox label="复选框 C"></el-checkbox>
              <el-checkbox label="禁用" disabled></el-checkbox>
              <el-checkbox label="选中且禁用" disabled></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>

        <div class="width">
          <el-popover v-model="cronPopover">
            <cron></cron>
            <el-input slot="reference" @click="cronPopover=true" v-model="cron" placeholder="请输入定时策略"></el-input>
          </el-popover>
        </div>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
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
import { getOrganizeList, getUserAll } from "@/newwork/system-colltroner";
import { fn } from "@/uti";
import treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { cron } from "vue-cron";

export default {
  name: "callMeeting",
  components: {
    myElHeader,
    myFooter,
    eTree,
    treeselect,
    cron
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
      cronPopover: "",
      cron: "",

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
        week: "", //周几（1-7 1＝星期日）（每周每月）
        seqType: 0, // 会议类型(0:即时会议 1:周期会议)
        currentEndTime: "", //临时会议结束时间
        currentStartTime: "" //临时会议开始时间
      },
      memberList: "",
      treeArr: [],
      dialogFormVisible: true,
      formLabelWidth: "120px",
      title: "添加会议",
      meetingState: [
        { label: "已开始", value: 0 },
        { label: "进行中", value: 1 },
        { label: "已结束", value: 2 }
      ],
      meetingType: [
        { label: "临时会议", value: 0 },
        { label: "周期会议", value: 1 }
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
    changeCron(val) {
      this.cron = val;
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
