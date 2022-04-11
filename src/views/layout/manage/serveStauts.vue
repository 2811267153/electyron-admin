<template>
  <div id="serve-stauts">
    <div class="overview">
      <div class="overview-l">
        <h2>服务器运行状态总揽</h2>
        <el-progress class="percentage" :percentage="item" v-for="item in percentage" :color="customColor"></el-progress>
      </div>
      <div>
        <el-button type="primary">设置预警</el-button>
      </div>
    </div>

    <el-dialog title="设置预警" :visible.sync="dialogFormVisible">
      <el-form :model="form" class="form">
        <el-form-item label="CPU" :label-width="formLabelWidth">
          <el-input v-model="form.cpu" autocomplete ="off"></el-input>
        </el-form-item>
        <el-form-item label="内存" :label-width="formLabelWidth">
          <el-input v-model="form.ram" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网络" :label-width="formLabelWidth">
          <el-input v-model="form.network" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="硬盘" :label-width="formLabelWidth">
          <el-input v-model="form.hardDisk" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="预警电话" :label-width="formLabelWidth">
          <el-input v-model="form.call" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="warp">
      <v-index :data="option"></v-index>
      <v-index :data="options"></v-index>
      <v-index :data="optionsInfo"></v-index>
    </div>
  </div>
</template>

<script>
import  vIndex from './v-echarts/index'

export default {
  name: 'serveStarts',
  components: {
    vIndex
  },

  //      myChart.setOption(option);

  data(){
    return {
      form: {
        cpu: '95',
        ram: '95',
        network: '95',
        hardDisk: '95',
        call: ''
      },
      option:  {
        title: {
          text: 'CPU利用率'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [ '780', '480', '240', '120', '60', '0']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'CPU',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      percentage: [50, 46, 90, 98],
      customColor: '#ff7800',
      options:  {
        title: {
          text: 'Stacked Line'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['上行网络', '下行网络',]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '上行网络',
            type: 'line',
            stack: 'Total',
            data: [120, 220, 936, 1000, 523, 2655, 250]
          },
          {
            name: '下行网络',
            type: 'line',
            stack: 'Total',
            data: [0, 5000, 2650, 0, 290, 265, 310]
          },
        ]
      },
      optionsInfo: {
        title: {
          text: 'Stacked Line'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '采集服务' },
              { value: 735, name: '应用服务' },
              { value: 580, name: '主机服务' },
              { value: 484, name: '搜索服务' },
              { value: 600, name: '接触服务' },
              { value: 800, name: 'video' },
              { value: 1156, name: '同步服务' },
              { value: 300, name: '消息服务' }
            ]
          }
        ]
      },
    }
}}
</script>

<style scoped>
.overview{
  display: flex;
  justify-content: space-between;
}
.form {
  width: 50%;
}
.overview-l {

  width: 50%;
  padding: 20px 40px ;
  background-color: #f2f2f2;
  margin: 20px 0 30px;
  border-radius: 5px;
}
.overview .percentage {
  margin: 20px 10px;
  height: 20px;
}
.warp{
  display: flex;
  width: 100%;

  justify-content: space-between;
}
</style>
