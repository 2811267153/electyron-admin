<template>
  <div class="warps">
    <div class="container">
      <p>{{ $route.meta.title }}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "intercept"
};
</script>

<style scoped>
.container {
  border: 1px solid #ccc;
  margin: 0 20px;
  height: 100% !important;
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
</style>
