<template>
  <div id="calls">
    <div class="container">
      <p>{{ $route.meta.title }}</p>
      <div class="nav-form">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="关联号码">
            <el-input v-model="form.associatedNumber" ></el-input>
          </el-form-item>
          <el-form-item label="转移类型">
            <el-select v-model="form.transferType" placeholder="请选择">
              <el-option
                  v-for="item in transferType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转移参数">
            <el-input v-model="form.transferParameter"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button @click="">重置</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="showAddForm(null, '添加呼叫转移')">添加呼叫转移</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "calls",
  data(){
    return {
      form: {
        associatedNumber: '',
        transferType: '',
        transferParameter:''
      },
      transferType: [
        {label: 'IVR', value: 'IVR'},
        {label: '外网号码', value: '外网号码'},
        {label: '内网号码', value: '内网号码'},
        {label: '振玲组', value: '振玲组'},
      ]
    }
  },
  methods: {
    showAddForm(){

    }
  }
}
</script>

<style scoped>
#calls{

}
.container {
  border: 1px solid #ccc;
}
.container p{
  background-color: #f2f2f2;

  padding: 10px 15px;
}
.nav-form{
  margin: 10px 20px;
  align-items: center;

  display: flex;
  justify-content: space-between;
}
</style>
