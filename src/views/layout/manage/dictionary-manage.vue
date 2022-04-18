<template>
  <!--  字典管理-->
  <div>
    <div >
      <div class="container">
        <p>{{ this.$route.meta.title }}</p>
      </div>
      <div class="nav-form">
        <el-form :inline="true" :model="from" class="demo-form-inline">
          <el-form-item>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="showAddForm(null, '添加字典')"
        >添加字典
        </el-button
        >
      </div>

      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form ref="addForm" :model="addForm" :rules="riles">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth" prop="orderNum">
            <el-input v-model="addForm.orderNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
              label="字典类型"
              disabled
              :label-width="formLabelWidth"
          >
            <el-input v-model="addForm.code"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-radio-group v-model="addForm.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="black">取 消</el-button>
          <el-button type="primary" @click="submitAddForm('addForm')"
          >确 定
          </el-button
          >
        </div>
      </el-dialog>

      <el-table :data="resultList" border style="width: 100%">
        <el-table-column  align="center"  prop="name" label='序号' width="50">
          <template scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column  align="center"  prop="name" label='字典名称'></el-table-column>
        <el-table-column  align="center"  prop="createBy" label="创建人"></el-table-column>
        <el-table-column  align="center"  prop="status" label="标示码">
          <template scope="scope">
            <div v-if="scope.row.status === 1"> <el-tag type="success">启用</el-tag></div>
            <div v-else> <el-tag type="success">禁用</el-tag></div>
          </template>
        </el-table-column>
        <el-table-column  align="center"  prop="createTime" label="创建时间"></el-table-column>
        <el-table-column  align="center"  prop="mark" label="操作">
          <template scope="scope">
            <div class="operate">
              <a style="margin-right: 20px" @click="showAddForm(scope.row, '修改')">修改</a>
              <a style="margin-right: 20px" @click="removeIt(scope.row.id)">删除</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>


  </div>
</template>

<script>
import {getNowFormatDate} from '@/uti'
import {
  addDictionaryList,
  getDictionaryAll,
  addDictionary,
  upData,
  removeDictionary
} from "@/newwork/system-colltroner";

export default {
  name: 'serve-manage',
  data() {
    return {
      isShow: false,
      title: '新增',
      from: {
        searchInp: '',
      },
      showDataList: [
        {label: '1', value: '字典类型'},
        {label: '2', value: '字典ID'}
      ],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      resultList: [],
      showData: '',
      addForm: {
        name: '',  //字典名称
        creatTime: '',  //创建时间
        status: '1', // 状态
        code: '',    //字典编码
        pageNum: 1,  //分页
        pageSize: 10,  //大小
        orderNum: '', //排序
        typeId: '',  // typeId
      },
      codeList: [],
      riles: {
        name: [{required: true, message: '此项为必填项，请确认', trigger: 'blur'}],
        desc: [{required: true, message: '此项为必填项，请确认', trigger: 'blur'}],
        mark: [{required: true, message: '此项为必填项，请确认', trigger: 'blur'}],
        orderNum:  [{required: true, message: '此项为必填项，请确认', trigger: 'blur'}],
        code:  [{required: true, message: '此项为必填项，请确认', trigger: 'blur'}]
      },
      status: [
        {label: '1', value: '开启'},
        {label: '0', value: '关闭'},
      ]
    }
  },
  computed: {
    creatTime() {
      return (this.addForm.creatTime = getNowFormatDate())
    },
    code() {
      return  this.$route.query.name
    }

  },
  methods: {
    toPath() {
      this.$router.push({name: 'dataManage'})
    },
    disabled(status){
      if(status == 1){
        return false
      }else {
        return  true
      }
    },
    submitAddForm() {
      this.$refs['addForm'].validate((valid) => {
        const data = {}
        data.pageNum = 1
        data.pageSize = 10
        data.code = this.$route.query.code
        if (valid) {
          //添加自填编码
          this.addForm.typeId = this.$route.query.id

          /*
          *
          * 判断用户现在正在进行的操作  新增？ 调用 addDictionary ： upData
          * */
         this.title === '修改' ?  upData(this.addForm).then(res => {
           if(res.data.code === 200){
             this.$message.success('修改完成！')
             this.getDictionaryAll(data)
           }else {
             this.$message.error(res.data.msg)
           }
             }).catch(e => {
               this.$message.error(e)
             }):
             addDictionary(this.addForm).then(res => {
               if(res.data.code === 200){
                 this.$message.success('添加完成！')
                 this.getDictionaryAll(data)

               }else {
                 this.$message.error(res.data.msg)
               }
          })
          this.dialogFormVisible = false
        }
      })
    },
    onSubmit() {

    },
    showAddForm(row, type) {
      this.title = type
      this.dialogFormVisible = true
      type === '修改' ? (this.addForm = row) : (this.addForm = {})
    },
    black() {
      this.dialogFormVisible = false
      this.resultList = this.resultCopy
    },
    removeIt(id) {
        console.log(id)
      removeDictionary(id).then(res => {
          if(res.data.code === 200){
            this.$message.success('删除成功！')
            this.getDictionaryAll(this.addForm )
          }
      }).catch(e => {
        this.$message.error(e)
      })
    },

    getDictionaryAll(id){
      getDictionaryAll(id).then(res => {
        console.log(res)
        this.resultList = res.data.data
      }).catch(e => {
        this.$message.error(e)
      })
    }
  },
  created() {
    this.addForm.code = this.$route.query.code
    this.getDictionaryAll(this.addForm )
  }
}
</script>

<style scoped>
.container {
  border: 1px solid #ccc;
  margin: 0 20px;
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

#networkManagement .width {
  display: flex;
  justify-content: space-between;
}

.width > * {
  flex: 1;
}

.mask-btn {
  margin-left: 20px;
}
</style>
