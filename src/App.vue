<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import jsCookie from "js-cookie";

export default {
  name: "app",
  beforeDestroy() {
    jsCookie.remove("JSESSIONID");
  }
};
</script>

<style>
@import url('./assets/css/index.css');
@import url('https://at.alicdn.com/t/font_3197089_hi7jh5w84ri.css?spm=a313x.7781069.1998910419.51&file=font_3197089_hi7jh5w84ri.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
