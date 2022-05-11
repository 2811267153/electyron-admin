<template>
  <div class="footer">
    <div class="total">共查询到: <span> {{ $store.state.total }} </span> 条相关数据</div>
    <el-pagination
      background
      :page-size="10"
      layout="prev, pager, next"
      @next-click="next"
      @current-change="pageChange"
      @prev-click="prev"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "myFooter",
  methods: {
    prev() {
      return this.$store.state.formPage.pageNum--
    },
    next() {
      return this.$store.state.formPage.pageNum++
    },
    pageChange(e) {
      this.formPage.pageNum = e
      this.formPage.pageSize = 10
      this.$bus.$emit('pageChange',)
      this.$store.dispatch('formPage', this.formPage)
    },
    infoClick(i){
      if(i === 0){
        this.loginOut()
      }else {
        this.$router.push('/account')
      }
    }
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
