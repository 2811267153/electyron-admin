<!--
 * @Description: 封装组件 el-select & el-tree 下拉树形选择
-->
<template>
  <el-select ref="selectTree" :value="value" v-model="valueName" :clearable="clearable" @clear="clearHandle">
    <el-option :value="valueName" :label="valueName" class="options">
      <el-tree
          id="tree-option"
          ref="selectTree"
          :accordion="accordion"
          :data="options"
          :props="props"
          :node-key="props.value"
          :default-expanded-keys="defaultExpandedKey"
          @node-click="handleNodeClick">
                <span slot-scope="{ data }">
                    <i :class="[data.color!=null?'ification_col':'']" :style="{'background-color':data.color}"></i>&nbsp;&nbsp;{{data.deptName}}
                </span>
      </el-tree>
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: "el-tree-select",
  props: {
    // 配置项
    props: {
      type: Object,
      default: () => {
        return {
          value: 'deptId',
          children: 'children',
          label: 'deptName'
        }
      }
    },
    // 选项列表数据(树形结构的对象数组)
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 初始值
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 可清空选项
    clearable: {
      type: Boolean,
      default: true
    },
    // 自动收起
    accordion: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      resultValue: null,
      valueName: '',
      defaultExpandedKey: []
    }
  },
  watch: {
    value() {
      this.resultValue = this.value
      this.initHandle()
    }
  },
  mounted() {
    console.log(this.value.deptName, '------------------')
    this.resultValue = this.value;   // 初始值
    this.initHandle();
  },
  methods: {
    // 初始化值
    initHandle() {
      if (this.resultValue) {
        this.valueName = this.resultValue.parentId;     // 初始化显示
        this.$refs.selectTree.setCurrentKey(this.resultValue)       // 设置默认选中
        this.defaultExpandedKey = [this.resultValue]      // 设置默认展开
      }
      this.initScroll()
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        let scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
        let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
        scrollBar.forEach(ele => ele.style.width = 0)
      })
    },
    // 切换选项
    handleNodeClick(node) {
      // 点击叶子节点后被选中
      this.$refs.selectTree.blur();
      this.valueName = node[this.props.label];
      this.resultValue = node;
      this.$emit('getValue', this.resultValue);
      this.defaultExpandedKey = [];
    },
    // 清除选中
    clearHandle() {
      this.valueName = ''
      this.resultValue = null
      this.defaultExpandedKey = []
      this.clearSelected()
      this.$emit('getValue', null)
    },
    // 清空选中样式
    clearSelected() {
      let allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    }
  },

}
</script>
<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409EFF;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
.el-popper {
  z-index: 9999;
}
.ification_col {
  width: 20px;
  height: 10px;
  display: inline-block;
}
</style>
