<template>
    <div  style="padding:50px;margin-bottom:20px">
        <div class="tabs">
            <span v-for="(item,index) in ['娱乐','体育','政治']" :key="index"
             @click="handleClick(index)"
             :class="{active:current===index}"
             >
            {{item}}
            </span>
        </div>
        <div>
           <ul v-show="current===0">
               <li>文章离婚了</li>
               <li>文章离婚了</li>
               <li>文章离婚了</li>
           </ul>
        </div>
        <div >
           <ul v-show="current===1">
               <li>中国队输了</li>
               <li>中国队输了</li>
               <li>中国队输了</li>
           </ul>
        </div>
        <div >
           <ul v-show="current===2">
               <li>废青死了</li>
               <li>废青死了</li>
               <li>废青死了</li>
           </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            //当前的状态
            current:0
        }
    },
    methods:{
        handleClick(index){
             //修改current
             this.current=index;
        }
    }
}
</script>
<style lang="less" scoped>
   .tabs{
       margin-bottom: 20px;
       span{
           cursor: pointer;
       }
   }
   .active{
       color: red;
   }
</style>