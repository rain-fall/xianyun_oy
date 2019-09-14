//用户管理
export const state={
  //接口返回的数据    
  userInfo:{
      taken:'',
      user:{}
  }
}

export const mutations={
//保存用户信息到state mutations异步操作
    setUserInfo(state,data){
      // console.log(data)
        state.userInfo=data;
    },
    //清除用户信息
    clearUserInfo(state){
          state.userInfo={
            taken:'',
            user:{
              
            }
          }
    }
}
export const actives={

}
 