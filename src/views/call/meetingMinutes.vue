<template>
  <div class="warps">
    <my-el-header title="会议记录" />
    <div class="container">
      <div class="meeting">
        <div class="feDetail" v-if="!isDetail">
          <div class="form-nav">
            <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
              <el-form-item label="会议名称">
                <el-input v-model="form.user" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="find">查询</el-button>
                <el-button @click="clear">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-table
            :data="list"
            height="calc(100vh - 100px - 100px - 100px - 100px)"
            :header-cell-style="{background:'#ccc', color: '#fff',}"
            style="width: 100%">
            <el-table-column
              align="center"
              label="序号"
              width="50"
              prop="date">
              <template scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column align="center"
                             prop="conferenceName"
                             label="会议名称">
            </el-table-column>
            <el-table-column align="center"
                             prop="conferenceName"
                             label="开始时间">
              <template scope="scope">{{ scope.row.conferenceCreateTime | createTime }}</template>
            </el-table-column>
            <el-table-column align="center"
                             prop="conferenceName"
                             label="结束时间">
              <template scope="scope">{{ scope.row.conferenceDestroyTime | endTime }}</template>
            </el-table-column>
            <el-table-column
              prop="member" align="center"
              label="会议成员">
            </el-table-column>
            <el-table-column
              fixed="right"
              :width="$store.state.tableMixWidth"
              prop="member" align="center"
              label="操作">
              <template scope="scope">
                <div class="operate">
                  <el-link type="info" @click="info(scope.row.conferenceUniqueId)">查看详情</el-link>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="detail" v-else>
          <div class="form-nav">
            <div></div>
            <el-button @click="black" type="primary">返回</el-button>
          </div>
          <el-table
            :data="detailList"
            :header-cell-style="{background:'#ccc', color: '#fff',}"
            style="width: 100%">
            <el-table-column
              align="center"
              label="序号"
              prop="date">
              <template scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column align="center"
                             prop="conferenceName"
                             label="会议名称">
            </el-table-column>
            <el-table-column align="center"
                             prop="conferenceDomain"
                             label="域">
            </el-table-column>
            <el-table-column align="center"
                             prop="conferenceProfileName"
                             label="会议文件名">
            </el-table-column>
            <el-table-column
              prop="createTime" align="center"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="action" align="center"
              label="创建人">
            </el-table-column>
          </el-table>

        </div>
      </div>
    </div>
    <my-footer v-on:next="next" @prev="prev" :form="form" @change="change" @pageCheng="pageCheng"></my-footer>
  </div>
</template>

<script>
import { getRecord, getRecordDetail } from "@/newwork/conferencr";
import { formatDate } from "@/uti";
import myFooter from "@/components/myFooter";
import myElHeader from "@/components/myElHeader";

export default {
  name: "meetingMinutes",
  data() {
    return {
      form: {},
      addForm: {},
      list: [],
      dialogFormVisible: true,
      title: "新增",
      formLabelWidth: "120px",
      isDetail: false,
      detailList: []
    };
  },
  components: {
    myFooter,
    myElHeader
  },
  methods: {
    next() {
      this.form.pageNum++;
      this.getRecord(this.form);
    },
    prev() {
      this.form.pageNum--;
      this.getRecord(this.form);
    },
    pageCheng(e) {
      this.form = this.$options.data().form;
      this.form.pageSize = e;
      this.getRecord(this.form);
    },
    change(e) {
      this.form.pageNum = e;
      this.getRecord(this.form);
    },
    find() {
      this.getRecord(this.form);
    },
    clear() {
      this.form = this.$options.data().form;
      this.getRecord(this.form);
    },
    getRecord(form) {
      getRecord(form).then(res => {
        this.$bus.$emit("total", res.data.data.total);
        if (res.data.code === 200) {
          this.list = res.data.data.records;
        }
      }).catch(e => this.$message.error(e));
    },
    info(id) {
      const data = {};
      data.conferenceUniqueId = id;
      getRecordDetail(data).then(res => {
        this.detailList = res.data.data;
      });
      this.isDetail = true;
    },
    black() {
      this.isDetail = false;
    }
  },
  filters: {
    createTime(time) {
      return formatDate(time / 1000);
    },
    endTime(time) {
      return formatDate(time / 1000);
    }
  },
  created() {
    this.getRecord(this.form);
  }
};
</script>

<style scoped>
.nav-form {
  text-align: right;
  height: 63px;
}

.meeting {

}
</style>
