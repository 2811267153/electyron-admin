<template>
  <div class="tree">
    <h2>组织 </h2>
    <div class="tree-warp">
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
  </div>
</template>

<script>
export default {
  name: "e-tree",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "deptName"
      },
      isStatus: true
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    isStatus(val) {
      if (val) {

      }
    }
  },

  methods: {
    handleNodeClick(a, b) {
      console.log(a);
      this.$emit("treeClick", a);
      a.status === 0 ? this.isStatus = true : this.isStatus = false;
    }
  }
};
</script>

<style scoped>
.tree h2 {
  font-size: 16px;
  padding: 10px 10px 10px 20px;
  border-bottom: 2px solid #ccc;
}

.tree {
  height: 100%;
  margin-right: 10px;
  display: block;
  border-right: 5px solid #ccc;
}

.filter-tree {
  background-color: transparent;
}

.tree-warp {
  padding: 10px;
}

</style>
