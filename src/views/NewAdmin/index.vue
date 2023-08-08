<script setup>
import { JWTCheckAPI } from '@/apis/userAPI'
import { onMounted,ref } from 'vue';
import { useUserStore } from '@/stores/user'
import { Document, Menu, Location, Memo, User, Tools, ChromeFilled,Hide } from '@element-plus/icons-vue'
const userStore=useUserStore()
// 请求服务器进行JWT校验
const jwtCheck = async () => {
    const res = await JWTCheckAPI()
    console.log(res);
}
// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
const userName=ref('')
onMounted(() => {
    jwtCheck()
    userName.value=userStore.userInfo.userName

})

</script>
<template>
    <el-row>
        <el-col :span="24">
            <div class="grid-content top">
                <h3>欢迎使用WY新闻后台管理系统</h3>
                <div style="padding-left: 400px;">欢迎{{userName}}用户</div>

            </div>
        </el-col>
    </el-row>
    <el-row :gutter="2">
        <el-col :span="4">
            <div class="grid-content left">
                <h4 class="mb-2" style="padding-bottom: 10px;"><el-icon style="margin-right: 20px;">
                        <Menu />
                    </el-icon>选择所需功能</h4>
                <el-menu default-active="4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router="true">
                    <el-sub-menu index="1">
                        <template #title>
                            <!-- <el-icon>
                                <location />
                            </el-icon> -->
                            <el-icon>
                                <User />
                            </el-icon>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item index="1-1">用户添加</el-menu-item>
                        <el-menu-item index="1-2">用户编辑</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>新闻类别管理</span>
                        </template>
                        <el-menu-item index="2-1">添加文章类别</el-menu-item>
                        <el-menu-item index="/NewAdmin/EditCategory">编辑文章类别</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon>
                                <Tools />
                            </el-icon>
                            <span>系统参数管理</span>
                        </template>
                        <el-menu-item index="3-1">参数设置1</el-menu-item>
                        <el-menu-item index="3-2">参数设置2</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="4">
                        <template #title>
                            <el-icon>
                                <Memo />
                            </el-icon>
                            <span>新闻管理</span>
                        </template>
                        <el-menu-item index="/NewAdmin/AddNews">添加新闻</el-menu-item>
                        <el-menu-item index="/NewAdmin/EditNews">编辑新闻</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="5">
                        <el-icon>
                            <ChromeFilled />
                        </el-icon>
                        <span>修改密码</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <el-icon>
                            <Hide />
                        </el-icon>
                        <span>退出登陆</span>
                    </el-menu-item>
                </el-menu>

            </div>
        </el-col>
        <el-col :span="20">
            <div class="grid-content right">
                <RouterView/>
            </div>
        </el-col>
    </el-row>
</template>
<style>
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

.top {
    background-color: #FAFAFA;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 0 auto;
    display: flex;
    width: 850px;

}

.topRight {}

.left {
    background-color: #d9ecff;
    padding-top: 10px;
    text-align: center;
}

.right {
    background-color: #ecf5ff;
    padding-left: 15px;
}</style>