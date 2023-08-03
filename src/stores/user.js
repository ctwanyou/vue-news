import { defineStore } from 'pinia'
import { ref } from 'vue'

import { LoginAPI } from '@/apis/userAPI';
export const useUserStore = defineStore('user', () => {
    //1 定义管理用户数据的state
    const userInfo = ref({})
    // 2 定义获取接口数据的action函数
    const getUserInfo = async ({ name, password }) => {
        const res = await LoginAPI({ name, password })
        userInfo.value = res.data
    }
    return {
        userInfo,
        getUserInfo
    }

},
    {
        persist: true,
    }
)