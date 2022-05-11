<template>
  <div class="footer">
    <div class="total">共查询到: <span> {{ total }} </span> 条相关数据</div>
    <el-pagination
      background
      :page-size="10"
      layout="prev, pager, next"
      @next-click="next"
      @prev-click="prev"
      @current-change="change"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "myFooter",
  data(){
    return {
      total: 0,
      pageNum: 0,
    }
  },
  props: {
    form: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    prev() {
      this.$emit('prev')
    },
    change(index){
      this.$emit('change', index)
    },
    next() {
      this.$emit('next')
    },
    pageChange(e) {
      this.pageNum = e
      this.pageSize = 10
    },
  },
  mounted() {
    this.$bus.$on('total', (data) => {
      this.total = data
    })
  }
};
</script>

<style scoped>

.footer {
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 15px #ccc;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 15px;
  margin-left: 20px;
  margin-top: 20px;
  width: 100%;
}

.total {
  height: 28px;
  background-color: #f4f4f5;
  border-radius: 5px;
  padding: 5px 10px;
  text-align: center;
  font-size: 13px;
}


</style>
