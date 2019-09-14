<template>
  <div class="flight-item">
    <div  @click="isShow=!isShow">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{item.airline_name}}</span>
          {{item.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{item.dep_time}}</strong>
              <span>{{item.org_airport_name}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{computeTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{item.arr_time}}</strong>
              <span>{{item.dst_airport_name}}{{item.dst_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{item.base_price}}</span>起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend" v-show="isShow">
      <!-- 隐藏的座位信息列表 --> 
      <el-row type="flex" justify="space-between" align="middle" v-for="(item,index) in item.seat_infos " :key="index" >
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row type="flex" justify="space-between" align="middle" class="flight-sell">
            <el-col :span="16" class="flight-sell-left">
              <span>{{item.name}}</span> | {{item.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{item.settle_price}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini" @click="handleChoose(item.id,item.seat_xid)">选定</el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      //控制列表的展开
     isShow:false
    }
  },
  props: {
    // 父组件传过来的数据
    item: {
      //定义父组件传过来的为对象，不然不接受，防止报错
      type: Object,
      // 默认是空数组
      default: {}
    }
  },
  computed: {
    computeTime() {
      //出发时间 数组
      let dep = this.item.dep_time.split(":");
      //到达时间 返回的是数组
      let arr = this.item.arr_time.split(":");
      // 如果到达的小时小于出发的小时，说明到第二天，需要到达小时 +24
      if (arr[0] < dep[0]) {
        arr[0] += 24;
      }
      //到达时间的分钟
      let arrval = arr[0] * 60 + +arr[1];
      //出发的分钟
      let depval = dep[0] * 60 + +dep[1];
      //求小时
      //相隔的总分钟数 1370- 1230
      let dis = arrval - depval;
      let hour = Math.floor(dis / 60);
      //求分钟
      let min = dis % 60;
     
      return `${hour}时${min}分`;
    }
  },
  methods:{
    //点击选择按钮，跳转到机票订单页
    handleChoose(id,seat_xid){
      // console.log(seat_xid)
      // this.$router.push({
      //   path:"/air/order",
      //   query:{
      //     id:this.data.id,
      //     seat_xid
      //   }
      // })
      
    }
  }
};
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>