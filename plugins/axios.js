import {Message} from 'element-ui'
//错误拦截
export default ({$axios})=>{
    $axios.onError(res=>{
        const {message,statusCode}=res.response.data
        if(statusCode===200){
             Message.error(message)
        }
    })
}