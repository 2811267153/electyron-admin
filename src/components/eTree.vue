<template>
  <el-tree
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
      accordion
      @node-click="handleNodeClick"
      node-key="data.deptId"
      ref="tree"
      :default-expanded-keys="['1524594032656699393',101]"
  >
  </el-tree>
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
      }

    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  methods: {
    handleNodeClick(a, b){
      console.log(a, )
      this.$emit('treeClick', a)
    }
  }
}
</script>

<style scoped></style>
