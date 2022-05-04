<template>
  <div id="index">
    <div class="banner">
     <h1> 金数GDP1000 融合通信管理平台 </h1>
    </div>
    <div class="home-info">
      业务介绍
    </div>
    <div class="info-nav">
      <h2>快速导航</h2>
      <div class="nav-bd" >
        <div @click="toPath(item)" class="nav-info" v-for="item in navPath">
          <a >{{item.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      navPath: [
        {name: '系统配置', url: '/layout/serveStarts'},
        {name: '设备管理', url: '/configure/phoneConfig'},
        {name: '落地管理', url: '/billing/networkManagement'},
        {name: '拨号方案', url: '/billing/dialPlan'},
        {name: '呼叫管理', url: '/call/ivr'},
        {name: '呼叫管理', url: '/bill/index'},
      ]
    }
  },
  methods: {
    toPath(item){
      this.$router.push({path: item.url})
    }
  }
}
</script>

<style scoped>
#index{
  width: calc(100vw - 200px);
  height: calc(100vh - 80px);
  background-color: #f2f2f2;
  padding-top: 20px;
}
.banner{
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px #ccc;
  padding: 40px;
  margin: 0 20px;
}
.home-info{
  margin: 20px;
   background-color: #fff;
   border-radius: 10px;
   box-shadow: 0 0 15px #ccc;
   padding: 40px;
 }
.info-nav{
  margin: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px #ccc;
  padding: 40px;
}
.info-nav h2{
  font-size: 20px;
  text-align: left;
}
.nav-bd {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-info{
  margin-top: 20px;
  background-color: #f2f2f2;
  padding: 20px 30px;
  border-radius: 10px;
}
</style>
