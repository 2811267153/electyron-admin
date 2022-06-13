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
          <el-button type="primary" @click="showAddForm(null, '添加会议')"
          >添加会议
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
            prop="conferenceName"
            label="会议名称">
          </el-table-column>
          <el-table-column
            prop="master"
            label="主持人">
          </el-table-column>
          <el-table-column
            prop="seqType"
            label="会议类型">
            <template scope="scope">
              <div v-if="scope.row.seqType === 0">临时会议</div>
              <div v-else-if="scope.row.seqType !== 0">周期会议</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="roundEnd"
            label="会议日期">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="会议时间">
          </el-table-column>
          <el-table-column
            prop="deptId"
            label="所属部门">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="isRecord"
            label="是否录音">
            <template scope="scope">
              <div v-if="scope.row.isRecord === 1">录音</div>
              <div v-else-if="scope.row.isRecord !== 1">不录音</div>
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
    <el-dialog top="7vh" :title="title" :visible.sync="dialogFormVisible">
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
          <el-form-item label="主持人号码" :label-width="formLabelWidth">
            <el-select v-model="addForm.master" placeholder="请选择" style="width: 100% ">
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

        <!--        会议周期-->
        <div>
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
          <div class="width" v-show="addForm.seqType !== 0">
            <el-form-item label="cron" :label-width="formLabelWidth">
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
            <el-form-item label="会议开始时间" :label-width="formLabelWidth">
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
        </div>
        <div class="width">
          <el-form-item label="会议密码" :label-width="formLabelWidth">
            <el-input v-model="addForm.password" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div style="height: 310px"></div>

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
import { addMeeting, getMeeting, upDataMeeting } from "@/newwork/call-router";
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
        startTime: "", ///会议开始时间(时分秒)
        seqType: 0, // 会议类型(0:即时会议 1:周期会议)
        currentEndTime: "", //临时会议结束时间
        currentStartTime: "", //临时会议开始时间
        cron: ""
      },
      list: [],
      time: [], //周期会议选择的时间
      time1: [], //灵石会议选择的时间
      memberList: "",
      treeArr: [],
      dialogFormVisible: false,
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
      ],
      member: [],
      expression: "",
      showCron: false,
      hideComponent: ["year", "second", "min", "hour"],
      isActive: false
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
        this.addForm = row;
        this.time.push(this.addForm.startTime, this.addForm.endTime);
        this.member = this.addForm.member.split("|");
        this.expression = this.addForm.cron;
      }
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
      if (this.title === "添加会议") {
        addMeeting(this.addForm).then(res => {
          if (res.data.code === 200) {
            this.getCallMetting(this.form);
            this.$message.success("提交完成");
            this.dialogFormVisible = false;
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        if (this.title === "编辑") {
          upDataMeeting(this.addForm).then(res => {
            console.log(res);
            if (res.data.code === 200) {
              this.getCallMetting(this.form);
              this.$message.success("提交完成");
              this.dialogFormVisible = false;
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
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
    getCallMetting(form) {
      getMeeting(form).then(res => {
        console.log(res);
        this.list = res.data.data.records;
      });
    }
  },
  created() {
    getOrganizeList().then(res => {
      this.treeArr = fn(res.data.data);
    });
    this.getCallMetting(this.form);
  },

  watch: {
    addForm: {
      deep: true,
      handler(value) {
        this.getUserList(value.deptId);
      }
    },
    dialogFormVisible(value) {
      if (value) {
        this.getUserList();
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

.active {
  opacity: 1;
}

.feActive {
  opacity: 0;
  transition-delay: .2s;
  z-index: -11;
}

.z-index {
  z-index: 0;
}
</style>
