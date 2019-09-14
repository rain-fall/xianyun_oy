<template>
    <!-- 用户名/密码框部分 -->
    <el-form :model="LoginForm" :rules="Loginrules" ref="LoginForm" class="LoginForm">
      <!-- 用户名的输入框 -->
      <el-form-item prop="username" class="form-item">
        <el-input v-model="LoginForm.username" placeholder="用户名/手机"></el-input>
      </el-form-item>
      <!-- 密码的输入框 -->
      <el-form-item prop="password" class="form-item">
        <el-input v-model="LoginForm.password" placeholder="密码"></el-input>
      </el-form-item>
        <p class="form-text">
        <nuxt-link to="#">忘记密码</nuxt-link>
      </p>
      <el-form-item>
        <el-button class="submit" type="primary" @click="handleloginSubmit">登录</el-button>
      </el-form-item>
    </el-form>
 
</template>
<script>
export default {
  data(){
    return{
      LoginForm:{
        username:'',
        password:''
      },
      // 验证规则
     Loginrules:{
      username:[
        {required: true, message: '请输入用户名', trigger: 'blur'}
      ],
      password:[
        {
          required: true, message: '请输入密码', trigger: 'blur'
        }
      ]
      }
    }
  },
  methods:{
    handleloginSubmit(){
      this.$refs.LoginForm.validate(valid=>{
        if(valid){
        //  如果验证成功就请求接口
        this.$axios({
           url:"/accounts/login",
           method:"POST",
           data:this.LoginForm
        }).then((res)=>{
           //跳转到首页
          //  console.log(res)
          const data=res.data;
          //保存到state
          this.$store.commit("user/setUserInfo",res.data);
          // console.log(res)
          if(res.status===200){
            this.$router.push('/')
            this.$message({
              type:'success',
              message:'登录成功'
            })
          }
        })
        }else{
          console.log("验证失败")
        }
      })
    }
  }
}
</script>
<style scoped>
   .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>