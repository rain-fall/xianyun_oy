<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <flightsFilters :data="cacheflightsData" @setNewDate="setNewDate" />
        </div>

        <!-- 航班头部布局 -->
        <div>
          <flightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <!-- 航班列表 -->
          <flightsItem v-for="(item,index) in dataList" :key="index" :item="item" />
          <!-- 分页 -->
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
              :page-sizes="[5,10,15,20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </el-row>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>
<script>
import flightsListHead from "@/components/air/flightsListHead.vue";
import flightsItem from "@/components/air/flightsItem.vue";
import flightsFilters from "@/components/air/flightsFilters.vue";
export default {
  data() {
    return {
      // 航班总数据
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      //缓存一份数据，只会修改一次
      cacheflightsData: {
        flights: [],
        info: {},
        options: {}
      },
      dataList: [], // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      pageSize: 5,
      pageIndex: 1,
      total: 0 //总条数
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res)
        this.flightsData = res.data; //航班总数据
        // console.log(this.flightsData)
        this.dataList = res.data.flights; //航班列表数据

        //缓存一份新的信息
        this.cacheflightsData = { ...res.data };
        // console.log(this.cacheflightsData)

        //当前页的条数
        this.total = res.data.total;
        //显示第一页的数据
        this.dataList = res.data.flights.slice(0, this.pageSize);
      });
    },
    //处理多少条数据的方法
    handleSizeChange(val) {
      this.pageSize = val;
      this.dataList = this.flightsData.flights.slice(0, val);
    },
    //处理当前显示第几页
    handleCurrentChange(val) {
      // console.log(val)
      this.pageIndex = val;
      //从哪里开始截  截到哪里
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize * this.pageIndex
      );
    },
    //写一个重置后的方法
    setNewDate(arr) {
      console.log(arr, 111111111111111);
      //修改总的航班列表,arr是返回的筛选后的数组
      this.flightsData.flights = arr;
      //重新回到第一页
      (this.pageIndex = 1),
        //按照数学公式切换dataList的值 0-5  5-10 10-15
        //                            1 ,2    (pageIndex-1)*pageSize,pageIndex*pageSize
        (this.dataList = this.flightsData.flights.slice(
          (this.pageIndex - 1) * this.pageSize,
          this.pageIndex * this.pageSize
        ));
      //修改总条数
      this.total = arr.length;
    }
  },
  components: {
    flightsListHead,
    flightsItem,
    flightsFilters
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>