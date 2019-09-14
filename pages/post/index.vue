<template>
  <div class="post">
    <div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <!-- 左边部分 -->
        <el-col :span="6">
          <Cities />
        </el-col>
        <!-- 右边部分 -->
        <el-col :span="18">
          <div class="search">
            <input type="text" placeholder="输入想去的地方，比如'广州'" />
            <i class="iconfont icon-sousuosearch79 iconsearch"></i>
          </div>
          <!-- 导航 -->
          <div class="recommend_nav">
            <ul>
              <li>推荐：</li>
              <li>
                <a href="#">广州</a>
              </li>
              <li>
                <a href="#">上海</a>
              </li>
              <li>
                <a href="#">北京</a>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <!-- 推荐攻略 -->
          <el-row type="flex" class="recommend_strategy" justify="space-between">
            <el-col :span="4">
              <h4>推荐攻略</h4>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" class="travels">写游记</el-button>
            </el-col>
          </el-row>
          <!-- 文章部分 -->
          <div class="post_item">
            <el-row class="post_row" v-for="(item,index) in posts" :key="index">
              <!-- 标题 -->
              <el-col :span="24">
                <div class="post_title">
                  <a href="#">{{item.title}}</a>
                </div>
              </el-col>
              <!-- 文章 -->
              <el-col :span="24">
                <div class="post_summary">
                  <a href="#">{{item.summary}}</a>
                </div>
              </el-col>
              <!-- 图片部分 -->
              <el-col class="image" :span="8" 
              v-for="(image,index) in item.images" 
              :key="index" 
              v-if="index<3">
                <img class="post_images" :src="`${image}`" />
              </el-col>
              <!-- 底部信息部分 -->
              <el-col :span="24">
              <el-row type="flex" class="bottom_info" justify="space-between">
                <el-col :span="8">
                  <i class="iconfont icon-location"></i>
                  &nbsp;&nbsp;&nbsp;{{item.cityName}} by &nbsp;
                  <span>
                    <img
                      :src="`${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar}`"
                    />&nbsp;
                  </span>
                  <span class="info_nickname">{{$store.state.user.userInfo.user.nickname}}</span>&nbsp;
                  <i class="iconfont icon-yanjing"></i>&nbsp;
                  {{item.watch}}
                </el-col>
                <el-col :span="2">
                  <span id="like">{{item.like |like}}赞</span>
                </el-col>
              </el-row>
              </el-col>
            </el-row>
             <el-row type="flex" justify="center" style="margin-top:10px;">
            <!-- size-change：切换条数时候触发 -->
            <!-- current-change：选择页数时候触发 -->
            <!-- current-page: 当前页数 -->
            <!-- page-size：当前条数 -->
            <!-- total：总条数 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[3,5,10,15]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
//引入子组件
import Cities from "@/components/posts/cities.vue";
export default {
  data() {
    return {
      //定义一个文章数组
      posts: [{ title: "" }, { summary: "" }, { images: [] }],
      //分页数据
      posts:[],//总数据
      total:0,//总条数
      pageIndex:1,
      pageSize:5,
    };
  },
  components: {
    Cities
  },
  mounted() {
    // console.log(this.$store)
    this.$axios({
      url: "/posts"
    }).then(res => {
      // console.log(res)
      this.posts = res.data.data;
      //总条数
      this.total=res.data.total
      // console.log(this.posts);
    });
  },
 filters:{
   like:(like)=>{
     if(like===null){
       return "0"
     }
     else{
       return like
     }
   }
 },
 methods:{
  // 页数条数改变触发的函数
   handleSizeChange(val){
      this.pageSize=val;
      this.posts=this.posts.slice(0,val)
   },
   //选择页数时触发
   handleCurrentChange(val){
     this.pageIndex=val;
     //公式 0-5 5-10  (pageindex-1)*pageSize,pagesize*pageIndex
     this.post=this.posts.slice((this.pageindex-1)*this.pageSize,this.pagesize*this.pageIndex)
   }
 }
};
</script>
<style scoped>
.post {
  padding-top: 25px;
}
.search input {
  width: 700px;
  height: 40px;
  border: 3px solid #ffa500;
  outline: none;
  position: relative;
}
.search input[type="text"] {
  text-indent: 20px;
}
.iconsearch {
  color: #ffa500;
  position: absolute;
  top: 10px;
  right: 60px;
  font-size: 20px;
}
.post {
  width: 1000px;
  margin: 0 auto;
}
.recommend_nav ul {
  margin-top: 5px;
  height: 36px;
}
.recommend_nav ul li {
  float: left;
  margin-right: 12px;
  font-size: 14px;
  color: #757575;
}
.recommend_nav li a:hover {
  text-decoration: underline;
  color: #ffa500;
}
/* 推荐攻略部分 */
.recommend_strategy {
}
.recommend_strategy h4 {
  width: 90px;
  color: #ffa500;
  font-weight: normal;
  border-bottom: 1px solid #ffa500;
  font-size: 22px;
  padding-bottom: 10px;
}
/* 文章部分 */
.post_item {
}
.post_row {
  border-top: 1px solid #eeeeee;
}
.post_item .post_title a {
  font-size: 18px;
  display: inline-block;
  padding: 20px 0px 20px;
}
.post_item .post_title a:hover {
  text-decoration: underline;
  color: #ffa500;
}
.post_item .post_summary {
  height: 60px;
  overflow: hidden;
  font-size: 14px;
  color: #666;
}

.post_item .image {
  overflow: hidden;
}
.post_item .post_images img {
  width: 100%;
}
/*文章图片部分  */
.post_item .post_images {
  width: 220px;
  height: 150px;
}
/* 底部个人信息部分 */
.bottom_info {
  font-size: 14px;
  color: #999;
  padding: 15px 0px;
}
.bottom_info img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
.bottom_info .info_nickname{
  color: #ffa500;
}
/* 赞 */
#like{
  font-size: 14px;
  color: #ffa500;
}
</style>