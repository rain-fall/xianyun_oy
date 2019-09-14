<template>
  <div class="container">
    <!-- 图片 -->
    <el-row type="flex" class="main" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" />
      </div>
      <!-- 文字 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>

      <!-- 登录跳转 -->
      <!-- 如果store没有token 则显示登录/注册 -->
      <!-- 如果store中有token 则显示下拉菜单 -->
      <div v-show=" !this.$store.state.user.userInfo.token">
        <nuxt-link to="/user/login" class="login">登录/注册</nuxt-link>
      </div>
      <div v-show="this.$store.state.user.userInfo.token">
        <!-- 下拉菜单 -->
        <el-dropdown>
          <div>
            <img :src="`${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar}`" />
          <span class="el-dropdown-link">
            {{$store.state.user.userInfo.user.nickname}}
            <i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="handleGetout()">退出</el-dropdown-item>
          </el-dropdown-menu>
          </div>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    //退出功能 清除登录信息
    handleGetout() {
      //调用store里的清除登录信息的方法
      this.$store.commit("user/clearUserInfo");
      //提示退出成功
      this.$message.success("退出成功");
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 1px 1px #ddd;
  background: #fff;
  overflow: hidden;
}
.main {
  width: 1000px;
  margin: 0 auto;
}
.navs {
  flex: 1;
  margin-left: 10px;
  a {
    padding: 0 20px;
    &:hover {
      // color: #409eff;
      border-bottom: 5px solid #409eff;
    }
  }
}
.login {
  font-size: 14px;
  color: #606268;
  margin-left: 15px;
}
.login:hover {
  color: #409eff;
  text-decoration: underline;
}
//头像样式
.el-dropdown{
  img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  vertical-align: middle;
  &:hover {
    border: 2px #83c0ff solid;
  }
}
}

</style>