<template>
  <div>
    <!-- 侧导航左栏 -->
    <el-row
      type="flex"
      justify="space-around"
      id="tabNav"
      v-for="(item,index) in cityList"
      :key="index"
      @mouseover.native="tabShow(index)"
      @mouseout.native="tabHide"
      :class="{active:index==isActive}"
    >
      <el-col :span="10">
        <span class="type">{{item.type}}</span>
      </el-col>
      <el-col :span="1">
        <i class="jiantou iconfont icon-jiantou"></i>
      </el-col>
    </el-row>
    <!-- 侧导航右栏 -->
    <div class="tabs-content" v-if="cityList">
      <el-row style="line-height:39px;border-left:none;" class="tabDetail" v-for="(item,index) in cityList[count].children" :key="index" >
        <el-col :span="3">
          <h2 style="color:orange;font-size:24px;font-style:italic;font-weight:normal;padding-left:15px">{{index+1}}</h2>
        </el-col>
        <el-col :span="5">
          <nuxt-link class="address" style="margin:0 10px;color:orange;font-size:14px;" to="#">{{ item.city}}</nuxt-link>
        </el-col>
        <el-col :span="16">
          <span class="desc" style="font-size:14px;color:#999;">{{item.desc}}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cityList: null,

      tabcontentShow: false,
      tabcontent: "",
      isActive: false,
      count:0
    };
  },
  methods: {
    // 鼠标移入加入class
    tabShow(index) {
      // console.log(111);
      this.tabcontentShow = true;
      this.count = index
    },
    tabHide() {
      // console.log(222);
      this.tabcontentShow = false;
    },
    tabChange(content, index) {
      this.tabcontentShow = true;
      this.tabcontent = content;
      this.isActive = index;
    },
    getList() {
      this.$axios({
        url: "/posts/cities"
      }).then(res => {
        console.log(res);
      });
    },
    created() {
      this.getList();
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      // console.log(res)
      this.cityList = res.data.data;
      console.log(this.cityList);
    });
  }
};
</script>
<style scoped >
#tabNav {
  width: 230px;
  height: 41px;
  border: 1px solid #ccc;
  line-height: 41px;
  padding: 0px 15px;
  position: relative;
}
#tabNav:nth-child(-n + 3) {
  border-bottom: none;
}
.type {
  font-size: 14px;
  color: #000000;
}
.tabs-content {
  width: 350px;
  /* height: 34px; */
  border: 1px solid #ccc;
  position: absolute;
  top: 0px;
  left: 230px;
  z-index: 1;
  background-color: #fff;
  box-sizing: border-box;
}
.tabDetail {
  height: 39px;
  box-sizing: border-box;
}
</style>