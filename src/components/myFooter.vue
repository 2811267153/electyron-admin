<template>
  <div class="footer">
    <div class="total">共查询到: <span> {{ total }} </span> 条相关数据</div>
    <div id="page">

      <el-dropdown>
        <div class="page-size">{{pagesize[currentIndex]}}条 /页</div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="changeClick(i)" v-for="(item, i) in pagesize">{{ item }}条 /页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-pagination
        background
        :page-size=pagesize[currentIndex]
        layout="prev, pager, next"
        @next-click="next"
        @prev-click="prev"
        @current-change="change"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "myFooter",
  data(){
    return {
      total: 0,
      pageNum: 0,
      pagesize: [5, 10, 15, 20, 50, 100],
      currentIndex: 1,
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
    changeClick(i){
      this.currentIndex = i
      this.$emit('pageCheng', this.pagesize[this.currentIndex])
    },
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
#page{
  display: flex;
  align-items: center;
}
#page .page-size{
  background-color: #f4f4f5;
  padding: 0 15px;
  line-height: 28px;
  cursor: default;
  border-radius: 5px;
}
.footer {
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 15px #ccc;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 15px;
  width: 100%;
  height: 52px;
  overflow: hidden;
  margin-top: 20px;
}

.total {
  height: 28px;
  background-color: #f4f4f5;
  border-radius: 5px;
  padding: 5px 10px;
  text-align: center;
  font-size: 13px;
  width: 200px;
  overflow: hidden;
}


</style>
