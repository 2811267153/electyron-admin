<template>
  <div class="tree">
    <el-tree
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
      accordion
      @node-click="handleNodeClick"
      :node-key="data.deptId"
      ref="tree"
      :default-expanded-keys="['1524594032656699393',101]">
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'e-tree',
  props: {
    data: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      defaultProps: {
        children: 'children',
        label: 'deptName'
      },
      isStatus: true,
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    isStatus(val){
      if(val){

      }
    }
  },

  methods: {
    handleNodeClick(a, b){
      console.log(a, )
      this.$emit('treeClick', a)
      a.status === 0 ? this.isStatus = true : this.isStatus = false
    }
  },
}
</script>

<style scoped>
.tree {
  box-shadow: inset 0 0 10px #cccccc;
  height: 100%;
  padding: 20px;
  border-radius: 10px;
  margin-right: 10px;
  display: block;
  background-color: #f2f2f2;
}
.filter-tree{
  background-color: transparent;
}
</style>
