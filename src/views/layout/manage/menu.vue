<template>

  <el-tree
      :data="pathRes"
      :props="defaultProps"
      accordion
      @node-click="handleNodeClick">
  </el-tree>

</template>

<script>
import {getMenuAll} from "@/newwork/system-colltroner";
import {fn, menuToTree} from "@/uti";
export default {
  name: "menu-path",
  data(){
    return {
      form: {},
      path: [],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      }
    }
  },
  created() {
    this.getMenuAll(this.form)
  },
  methods: {
    getMenuAll(form){
      getMenuAll(form).then(res => {
        this.path = res.data.data
      }).catch(e => {
        console.log(e)
        this.$message.error(e)
      })
    }
  },
  computed: {
    pathRes(){
      return menuToTree(this.path)
    }

  }
}
</script>

<style scoped>

</style>
