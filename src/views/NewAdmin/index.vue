<script setup>
import { JWTCheckAPI } from '@/apis/userAPI'
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user'
import { ArrowDown } from '@element-plus/icons-vue'
import UserMenu from './component/UserMenu.vue'
import tabsMain from './component/tabsMain.vue';
const userStore = useUserStore()
//定义标签页子组件对象
const mainRouter=ref(null)
// 请求服务器进行JWT校验
const jwtCheck = async () => {
    await JWTCheckAPI()
    //console.log(res);
}
//响应菜单中传过来的动态路由参数
const getRouterData=(routerData)=>{
    //routerData.modulePath=() => import(routerData.modulePath)
    mainRouter.value.openMainRouterView(routerData)
    //console.log(routerData);
}
const userName = ref('')
onMounted(() => {
    jwtCheck()
    userName.value = userStore.userInfo.userName
})
</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-header class="top">
                <el-row :gutter="10">
                    <el-col :span="20">
                        <div style="text-align: center;">
                            <h3>欢迎使用WY新闻后台管理系统</h3>
                        </div>
                    </el-col>
                    <el-col :span="0">

                    </el-col>
                    <el-col :span="4">
                        <div style="margin-top: 15px;text-align: center;">
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    欢迎{{ userName }}用户
                                    <el-icon class="el-icon--right">
                                        <arrow-down />
                                    </el-icon>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>个人设置</el-dropdown-item>
                                        <el-dropdown-item>退出登陆</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>

                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <UserMenu @get-routerdata="getRouterData"/>
                </el-aside>
                <el-container>
                    <el-main>
                        <div class="grid-content right">
                            <tabsMain ref="mainRouter"/>
                        </div>
                    </el-main>
                    <el-footer>
                        <div class="footer">
                            @WanYou2023 设计开发</div>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<style scoped>
.el-row {
    margin-bottom: 0px;


}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 2px;
    /* border: 1px solid #333; */
}

.grid-content {
    border-radius: 2px;
    min-height: 36px;
}

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.el-dropdown-link:focus {
    outline: none;
}

.top {
    background-color: #FAFAFA;
    height: 50px;
    line-height: 50px;
}

.topRight {}

.left {
    background-color: #d9ecff;
    padding-top: 10px;
    text-align: center;
}

.right {
    /* background-color: #ecf5ff; */
    /* padding-left: 10px; */
    min-height: 800px;
}

.footer {
    margin: 0 auot;
    text-align: center;
    background-color: #ecf5ff;
    height: 50px;
    line-height: 50px;
}</style>