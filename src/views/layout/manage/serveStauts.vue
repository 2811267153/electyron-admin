<template>
  <div id="serve-stauts">
    <div class="overview">
      <div class="overview-l">
        <h2>服务器运行状态总揽</h2>

          <div class="percentage-item">
            <span>用户使用率</span>
            <el-progress class="percentage" :percentage="percentage.used" :color="customColor"></el-progress>
          </div>
          <div class="percentage-item">
            <span>系统使用率</span>
            <el-progress class="percentage" :percentage="percentage.sys" :color="customColor"></el-progress>
          </div>
          <div class="percentage-item">
            <span>当前空闲率</span>
            <el-progress class="percentage" :percentage="percentage.free" :color="customColor"></el-progress>
          </div>
      </div>
    </div>

    <div class="warp">
      <h2>服务器信息</h2>
      <ul>
        <li><div class="warp-li"> <span>服务器名称</span>{{ serveData.sys.computerName || ''}}</div><div class="warp-li"><span>操作系统</span>{{ serveData.sys.osName }}</div></li>
        <li><div class="warp-li"><span>服务器IP</span>{{ serveData.sys.computerIp }}</div><div class="warp-li"><span>系统架构</span>{{ serveData.sys.osArch }}</div></li>
      </ul>
    </div>

    <div class="warp">
      <h2>JAVA虚拟机信息</h2>
      <ul>
        <li><div class="warp-li"> <span>JAVA名称</span>{{ serveData.jvm.name }}</div><div class="warp-li"><span>Java版本</span>{{ serveData.jvm.version }}</div></li>
        <li><div class="warp-li"><span>启动时间</span>{{ serveData.jvm.runTime }}</div><div class="warp-li"><span>运行时长</span>{{ serveData.jvm.startTime }}</div></li>
        <li><div class="warp-li"><span>安装路径</span>{{ serveData.jvm.home }}</div><div class="warp-li"></div></li>
      </ul>
    </div>
    <div class="warp">
      <h2>磁盘状态</h2>
      <el-table
          border
          :data="serveData.sysFiles"
          style="width: 50%">
        <el-table-column
            align="center"
            prop="dirName"
            label="盘符路径"
            width="180">
        </el-table-column>
        <el-table-column
            align="center"
            prop="sysTypeName"
            label="文件系统">
        </el-table-column>
        <el-table-column
            align="center"
            prop="total"
            label="总大小">
        </el-table-column>
        <el-table-column
            align="center"
            prop="usage"
            label="已使用">
        </el-table-column>
        <el-table-column
            align="center"
            prop="used"
            label="未使用">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import vIndex from './v-echarts/index'
import {getSystem} from "@/newwork/system-colltroner";

export default {
  name: 'serveStarts',
  components: {
    vIndex
  },
  data() {
    return {
      form: {
        cpu: '95',
        ram: '95',
        network: '95',
        hardDisk: '95',
        call: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      percentage: {},
      customColor: '#ff7800',
      serveData: [],
      timer: []
    }
  },
  created() {
    this.getSystem()

    this.timer = setInterval(() => {
      this.getSystem()
    }, 1000)
  },
  methods: {
    getSystem() {
      getSystem().then(res => {
        console.log(res)
        this.serveData = res.data.data
        this.percentage = this.serveData.cpu
      })
    }
  },
  beforeDestroy() {
    window.clearInterval(this.timer)
  }
}
</script>

<style >
.overview {
  display: flex;
  justify-content: space-between;
}

.overview-l {

  width: 50%;
  padding: 20px 40px;
  background-color: #f2f2f2;
  margin: 20px 0 30px;
  border-radius: 5px;
}

.overview .percentage {
  margin: 20px 10px;
  height: 20px;
  flex: 1;
  display: flex;
}

.warp {
  padding: 20px 0;
  width: 100%;
  border: 1px solid #f2f2f2;
}
.warp h2{
  margin-left: 20px;
}
.warp ul li {
  display: flex;
  justify-content: space-between;
}
.percentage-item{
  align-items: center;
  display: flex;
}
.percentage-item .el-progress-bar__outer{
}
.warp-li{
  padding: 20px 15px;
  width: 50%;
  margin: 10px 20px;

  border-radius: 5px;
  background-color: #f2f2f2;
}
.warp-li span{
  display: inline-block;
  padding-right: 20px;
}
</style>
