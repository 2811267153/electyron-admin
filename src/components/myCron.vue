<template>
  <div class="my-cron">
    <div class="width-cron">
      <el-input v-model="cron" placeholder></el-input>
      <vcrontab @hide="showCron=false" :hideComponent="hideComponent" @fill="crontabFill"
                :expression="expression"></vcrontab>
    </div>
    <!--    <el-form-item label="时间周期" :label-width="formLabelWidth">-->
    <!--      -->
    <!--      &lt;!&ndash;            反编译&ndash;&gt;-->
    <!--      &lt;!&ndash;            <div class="box">&ndash;&gt;-->
    <!--      &lt;!&ndash;              <el-input v-model="addForm.cron" placeholder class="inp"></el-input>&ndash;&gt;-->
    <!--      &lt;!&ndash;              <el-button type="primary" @click="showDialog">生成 cron</el-button>&ndash;&gt;-->
    <!--      &lt;!&ndash;            </div>&ndash;&gt;-->
    <!--    </el-form-item>-->
  </div>
</template>

<script>
export default {
  name: "myCron",
  data() {
    return {
      hideComponent: ["year"]
    };
  },
  methods: {
    crontabFill(value) {
      //确定后回传的值
      this.addForm.cron = value;
    },
    showDialog() {
      this.expression = this.input;//传入的 cron 表达式，可以反解析到 UI 上
      this.showCron = true;
    }
  }
};
</script>

<style scoped>

</style>
