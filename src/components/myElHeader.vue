<template>
  <div class="content-nav">
    <el-breadcrumb class="nav-bar" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>{{ $route.meta.title }}</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btn">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "myElHeader"
};
</script>

<style scoped>
.content-nav {
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
}

</style>
