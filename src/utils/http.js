import axios from 'axios'

import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

import { useUserStore } from '@/stores/user'

// 创建axios实例
const http = axios.create({
    baseURL: 'https://localhost:7064/api/',
    timeout: 5000

})

// axios请求拦截器
http.interceptors.request.use(config => {
    //1 从pinia中拿到数据
    const userStore = useUserStore()
    //按后端要求拼接数据
    const token=userStore.userInfo.token
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => {
    // const head=res.headers
    // console.log(head);
    return res
}, e => {

    ElMessage({ type: 'warning', message: e.message })
    return Promise.reject(e)
})


export default http