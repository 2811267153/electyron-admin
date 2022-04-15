<template>
  <div id="app">
<!--    <headers v-if="$route.path !== '/user'" />-->

    <router-view/>
  </div>
</template>

<script>
// import headers from '@/components/header'
export default {
  name: 'app',
  data(){
    return {
      userInfo: null
    }
  },
  components: {
  },
  created() {
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || null
    // if(this.$store.state.musicInfo == null){
    //   this.$router.push({path: '/user'})
    // }
    if(this.userInfo === null ){
      this.$router.push('/user')
    }
    this.$router.push({path: '/home'})
  }
}
</script>

<style>
@import url('./assets/css/index.css');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
