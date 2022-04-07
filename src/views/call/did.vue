<template>
  <div id="did">
    <div class="container">
      <p>{{ $route.meta.title }}</p>
      <div class="nav-form">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="DID号码">
            <el-input v-model="form.serialNumber" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="所属账户">
            <el-input v-model="form.deviceName" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button @click="">重置</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="showAddForm(null, '新增设备')">添加DID</el-button>
        </div>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addForm">
        <el-form-item label="所属账户" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="DID号码" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <div class="width">
          <el-form-item label="DID号码" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="DID号码" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="DID号码" :label-width="formLabelWidth">
          <el-table
              ref="singleTable"
              :data="formTabData"
              :border="true"
              :row-class-name="tableRowClassName"
              highlight-current-row
              @current-change=""
              style="width: 100%">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                property="title"
                width="120">
            </el-table-column>
            <el-table-column
                property="title"
                width="120">
              <template scope="scope">
                <a @click="bubbleSort(scope.row.index, scope.row)">上移</a>
                <a @click="bubbleSort(scope.row.index)">上移</a>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "did",
  data() {
    return {
      form: {},
      title: '添加DID',
      dialogFormVisible: true,
      formLabelWidth: "120px",

      addForm: {
        name: '',
        number: '',
        turnInside1: '',
        turnInside2: '',
        turnInside3: '',
        turnInsideIVR: '',
        turnInsideSIP: '',

      },
      formTabData: [
        {
          title: '转内部号码',
          index: 1
        }, {
          title: '转外呼号码1',
          index: 2
        }, {
          title: '转外呼号码2',
          index: 3
        }, {
          title: '转外呼号码3',
          index: 4
        }, {
          title: '转IVR',
          index: 5
        }, {
          title: '转SIP服务器',
          index: 6
        }
      ]
    }
  },
  methods: {
    showAddForm(row, title) {
      this.dialogFormVisible = true
      this.title = title
    },
    bubbleSort(e, index) {
      console.log(index)
    },
    tableRowClassName({row, rowIndex}){
      row.index = rowIndex
    }
  }
}
</script>

<style scoped>
.container {
  border: 1px solid #ccc;
}

.container p {
  background-color: #f2f2f2;
  padding: 10px 15px;
}

.nav-form {
  margin: 15px;
  height: 40px;
  display: flex;
  justify-content: space-between;
}

.width {
  display: flex;
  width: 100%;
}

.width > * {
  flex: 1;
  padding: 0 20px;
}

h4 {
  margin: 10px 0;
}
</style>
