<template>
  <el-form :model="registerForm" :rules="rules" ref="registerForm" class="form">
    <el-form-item prop="username">
      <el-input v-model="registerForm.username" placeholder="用户名手机"></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-input v-model="registerForm.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname">
      <el-input v-model="registerForm.nickname" placeholder="你的名字"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="registerForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="checkedpassword">
      <el-input v-model.number="registerForm.checkedpassword" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="resbtn" @click=" register()">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    //验证两次密码不一致
    //value输入框的值
    const checkedpassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (+value !== +this.registerForm.password) {
        // console.log(value,this.registerForm.password)
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        checkedpassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        checkedpassword: [
          {
            //validator不能改 指向验证函数
            validator: checkedpassword,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //注册事件
    register() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          //如果验证成功，则发送注册请求
          const { checkedpassword, ...rest } = this.registerForm;
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: rest
          }).then(res=>{
            //注册成功帮用户自动登录
            this.$store.commit('user/setUserInfo',res.data)
            //没有路由 所以用path跳转
            this.$router.push({path:'/'})
          })
        } else {
        }
      });
    },
    //发送验证码
    handleSendCaptcha() {
      //判断手机号码是否为空 如果为空则不发送请求
      if (!this.registerForm.username) {
        this.$message.err("请输入手机号！");
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.registerForm.username // 手机号码
        }
      }).then(res => {
        // console.log(res.data);
        //模拟手机验证码
        //解构出code属性
        //  const { code }=res.data
        let code = res.data.code;
        console.log(code);
        this.$alert(`模拟手机验证码为：${code}`, "提示");
        //  this.$message({
        //    type:'success',
        //    message:`模拟手机验证码为：${code}`
        
        //  })
      });
    }
  }
};
</script>

<style lang="less" scope>
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
.resbtn {
  width: 350px;
}
</style>