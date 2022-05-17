<template>
  <el-header>
    <div class="content-nav">
      <el-breadcrumb class="nav-bar" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a>{{ $route.meta.title }}</a></el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-link slot></el-link>
      </div>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "myElHeader"
};
</script>

<style scoped>
.content-nav {
  padding: 20px;
  box-shadow: 0 0 15px #ccc;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
