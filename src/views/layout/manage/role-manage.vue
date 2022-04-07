<template>
  <!--  角色管理-->
  <div>
    <div class="nav">
      <div class="nav-l">
        <el-form label-width="80px" inline="true" :model="navForm">
          <el-form-item label="角色名称">
            <el-input v-model="navForm.name"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-input v-model="navForm.permission"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
                v-model="navForm.startCreateTime"
                type="date"
                placeholder="选择开始日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
                v-model="navForm.endCreateTime"
                type="date"
                placeholder="选择结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="nav-r">
        <el-button type="primary">查询</el-button>
        <el-button type="primary">重置</el-button>
      </div>
    </div>
    <el-button type="success" @click="addForms">新增</el-button>

    <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="rules">
        <el-form-item
            label="角色名称"
            :label-width="formLabelWidth"
            prop="name"
        >
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限状态" :label-width="formLabelWidth">
          <el-radio-group v-model="addForm.stats">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限" :label-width="formLabelWidth" required>
          <el-tree
              :data="data"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick">
          </el-tree>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
        >确 定
        </el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'role-manage',
  data() {
    return {
      formLabelWidth: '120px',
      dialogFormVisible: false,
      navForm: {
        name: '',
        permission: '',
        startCreateTime: '',
        endCreateTime: ''
      },
      addForm: {
        name: '',
        stats: 1,
        permission: '',
        desc: ''
      },
      rules: {
        name: [{required: true, message: '请输入活动名称', trigger: 'blur'}],
        permission: [
          {required: true, message: '请输入活动名称', trigger: 'change'}
        ]
      },

      data: [
        {
          id: 1,
          label: '张三的公司',
          children: [
            {
              id: '1-2',
              label: '二级标题'
            },
            {
              id: '1-3',
              label: '二级标题'
            },
            {
              id: '1-4',
              label: '二级标题',
            }
          ]
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    addForms() {
      this.dialogFormVisible = true
    },
    check(a, b) {
      console.log(a, b)
    },
    handleNodeClick(data) {
      console.log(data);
    }
  }
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
}
</style>
