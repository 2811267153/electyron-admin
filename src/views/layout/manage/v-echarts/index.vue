<template>
  <div class="warp">
    <div class="v-echarts" ref="eCharts">

    </div>
  </div>
</template>

<script>

import * as echarts from 'echarts';

export default {
  name: "v-index",
  props: {
    data: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart(){
      const  eCharts = echarts.init(this.$refs.eCharts)
      const option =  this.data

      eCharts.setOption(option)
    }
  }
}
</script>

<style scoped>
  .v-echarts {
    width: 90%;
    height: 500px;
    padding: 20px;
    border: 1px solid #cccccc;
  }
</style>
