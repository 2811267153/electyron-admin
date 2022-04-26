<template>

  <el-tree
      :data="path"
      :props="defaultProps"
      node-key="menuId"
      @node-click="meunClick"
      :default-expanded-keys="defaultShowNodes"
      accordion>
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
      },
      defaultShowNodes: [],
    }
  },
  created() {
    this.getMenuAll(this.form)
  },
  methods: {
    getMenuAll(form){
      getMenuAll(form).then(res => {
        this.path = menuToTree(res.data.data)
      }).catch(e => {
        console.log(e)
        this.$message.error(e)
      })
    },
    meunClick(a, b, c){
      console.log(a, b, c )
    }
  },
  computed: {
    // pathRes(){
    //   return (this.path)
    // }
  },
  watch: {
    path: {
      handler(){
        console.log(this.path)
        this.path.forEach(item => {
          this.defaultShowNodes.push(item.menuId)
        })
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
