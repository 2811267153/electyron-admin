<template>
  <div class="el-menu">
    <el-menu
      default-active="2"
      background-color="#545c64"
      text-color="#fff"
      unique-opened
      active-text-color="#ff7300">
      <template v-for="item in menuList">
        <div v-if="!item.hasOwnProperty('children')">
          <el-menu-item @click.native="handMenuClick(item)" :index="item.menuId + ''"><span>{{ item.menuName }}</span>
          </el-menu-item>
        </div>
        <template v-else>
          <el-submenu :index="item.menuId">
            <div slot="title">
              <i class="icon" :class="item.icon"></i>
              <span>{{ item.menuName }}</span>
            </div>
            <el-menu-item-group @click="item" :index="item.menuId + ''">
              <template v-for="submit in item.children">
                <el-menu-item @click.native="handMenuClick(submit)" class="menu-item" :index="submit.menuId + ''">
                  <span>{{ submit.menuName }}</span>
                </el-menu-item>
              </template>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { pathMapToMenu } from "@/util/map-menu";

export default {
  name: "navMenu",
  data() {
    return {
      menuList: []
    };
  },
  created() {
    this.menuList = [];
    this.menuList = this.$store.state.login.menuList;
    const menu = pathMapToMenu(this.menuList, this.$route.path);

  },
  mounted() {
    console.log(this.menuList, "aa");
  },
  methods: {
    handMenuClick(item) {
      console.log(item);
      this.$router.push(item.path);
    }
  }
};
</script>

<style>
.el-menu {
  text-align: left;
  height: 100%;
  width: 200px;
  overflow: hidden;
  background-color: #fff;
}

.el-submenu li {
  background-color: rgb(67, 74, 80) !important;
}

.icon {
  margin-right: 10px;
  font-size: 20px;
}
</style>
