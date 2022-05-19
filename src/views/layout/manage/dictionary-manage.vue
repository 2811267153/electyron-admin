<template>
  <!--  字典管理-->
  <div>
    <div class="dictionary">
      <div class="nav-form">
        <el-form :inline="true" :model="from" class="demo-form-inline">
          <el-form-item>
          </el-form-item>
        </el-form>
        <a>         <el-button type="primary" @click="black"
        >返回
        </el-button
        >
          <el-button type="primary" @click="showAddForm(null, '添加字典')"
          >添加字典
          </el-button
          ></a>
      </div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible" destroy-on-close :close-on-click-modal="false">
        <el-form ref="addForm" :model="addForm" :rules="riles">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input placeholder="请输入内容" v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth" prop="orderNum">
            <el-input placeholder="请输入内容" v-model="addForm.orderNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
              label="字典类型"
              prop="code"
              :label-width="formLabelWidth"
          >
            <el-input placeholder="请输入内容" v-model="addForm.code">aqa</el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-radio-group v-model="addForm.status">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAddForm('addForm')"
          >确 定
          </el-button
          >
        </div>
      </el-dialog>
      <el-table :data="resultList" border style="width: 100%" :header-cell-style="{background:'#ccc', color: '#fff',}">
        <el-table-column  align="center"  prop="name" label='序号' width="50">
          <template scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column  align="center"  prop="name" label='字典名称'></el-table-column>
        <el-table-column  align="center"  prop="createBy" label="创建人"></el-table-column>
        <el-table-column  align="center"  prop="status" label="标示码">
          <template scope="scope">
            <div v-if="scope.row.status === 0"> 启用</div>
            <div v-else>禁用</div>
          </template>
        </el-table-column>
        <el-table-column  align="center"  prop="createTime" label="创建时间"></el-table-column>
        <el-table-column  align="center"  prop="mark" label="操作">
          <template scope="scope">
            <div class="operate">
              <a style="margin-right: 20px" @click="showAddForm(scope.row, '修改')">修改</a>
              <template>
                <el-popconfirm
                  title="确认要删除吗？"
                  @confirm="removeIt(scope.row.id)"
                >
                  <el-link slot="reference" type="info">删除</el-link>

                </el-popconfirm>
              </template>
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
      formLabelWidth: '120px',
      dialogFormVisible: false,
      resultList: [],
      showData: '',
      addForm: {
        name: '',  //字典名称
        creatTime: '',  //创建时间
        code: '',    //字典编码
        pageNum: 1,  //分页
        pageSize: 10,  //大小
        orderNum: '', //排序
        typeId: '',  // typeId
        status: 0, // 状态
      },
      codeList: [],
      riles: {
        name: [{required: true, message: '此项为必填项，请确认', trigger: 'blur'}],
        desc: [{required: true, message: '此项为必填项，请确认', trigger: 'blur'}],
        mark: [{required: true, message: '此项为必填项，请确认', trigger: 'blur'}],
        orderNum:  [{required: true, message: '此项为必填项，请确认', trigger: 'blur'}],
        code:  [{required: true, message: '此项为必填项，请确认', trigger: 'blur'}]
      },
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
    showAddForm(row, type) {
      this.title = type
      this.dialogFormVisible = true
      type === '修改' ? (this.addForm = row) : ''
    },
    black() {
      this.$router.go(-1)
    },
    removeIt(id) {
        console.log(id)
      removeDictionary(id).then(res => {
          if(res.data.code === 200){
            this.$message.success('删除成功！')
            this.addForm.code = this.$route.query.code
            this.getDictionaryAll(this.addForm)
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
  },
  watch: {
    dialogFormVisible(val){
      if(!val) {
        this.addForm = this.$options.data().addForm
      }
    }
  }
}
</script>

<style scoped>
.container p {
  background-color: #f2f2f2;
  padding: 10px 15px;
}

.nav-form {
  margin: 0 0 20px;
  display: flex;
  justify-content: space-between;
}

#networkManagement .width {
  display: flex;
  justify-content: space-between;
}
.operate {
  padding: 0;
}

.width > * {
  flex: 1;
}

.mask-btn {
  margin-left: 20px;
}
</style>
