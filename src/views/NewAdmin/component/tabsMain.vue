<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

//import {NewAdmin} from '../index.vue'


const router = useRouter()
const activeTabName = ref(null)
const tabsList = ref([])

//单击标签
const tabClick = () => {
    console.log('click')
}
//标签改变时
const tabChange = () => {
    console.log('change')
}
//标签删除时
const doTabRemove = (targetName) => {
    //获取当前标签页所有数据 const tabs = editableTabs.value
    const tabs = tabsList.value
    //获取当前正在编辑（激活）状态标签页的名称 let activeName = editableTabsValue.value
    let activeName = activeTabName.value
    //如果关闭的是当前标签页，确定下一个激活状态的标签页是哪个
    if (activeName === targetName) {
        tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1] //如果有下一页，就选择下一页，否则选择前一页
                if (nextTab) {
                    activeName = nextTab.name
                }
            }
        })
    }

    //设置激活的标签页
    activeTabName.value = activeName
    //在标签数据组中删除选择的标签
    tabsList.value = tabs.filter((tab) => tab.name !== targetName)
    //删除一个动态路由
    router.removeRoute(targetName)

    //激活当前活动页的路由
    router.push({ name: activeTabName.value })
}
//加载第一个页面
const loadWelcomeView = () => {
    let routerObj = {
        name: 'welcome',
        icon: 'Message',
        title: '首页',
        routerPath: '/NewsAdmin/Welcome',
        modulePath: './Welcome.vue',
        colseable: false
    };
    openMainRouterView(routerObj)
}
//动态添加路由
const openMainRouterView = (config) => {
    let routerObj = {
        name: '',
        icon: 'Message',
        title: '业务功能',
        routerPath: '',
        modulePath: '',
        colseable: true,
        params: {}
    }
    Object.assign(routerObj, config)
    console.log(routerObj)
    var name = routerObj.name
    var hasRoute = router.hasRoute(name)
    if (!hasRoute) {
        //在哪个路由下动态添加子路由
        router.addRoute('newadmin', {
            name: name,
            path: routerObj.routerPath,
            component: () => import(routerObj.modulePath)
        })


        tabsList.value.push({
            title: routerObj.title,
            name: routerObj.name,
            tabPaneClosable: routerObj.colseable,
            tabIcon: routerObj.icon
        })
    }
    console.log(router.getRoutes())

    router.push({ name: name })
    activeTabName.value = name
}
//标签改变时
const doSelectTab = () => {
    router.push({ name: activeTabName.value })
}
onMounted(() => {
    loadWelcomeView()
})
//需要对外的方法放在方法定义的后面
defineExpose({
    openMainRouterView
})
</script>
<template>
    <div style="height: 100%;">
        <el-tabs v-model="activeTabName" type="border-card" @tab-change="doSelectTab" @tab-remove="doTabRemove">
            <el-tab-pane v-for="item in tabsList" :key="item.name" :label="item.title" :name="item.name"
                :closable="item.tabPaneClosable">
                <!-- <template #label v-if="item.tabIcon != null">
                    <span class="custom-tabs-labe1">
                        <el-icon>
                            <component :is="item.tabIcon" />
                        </el-icon>
                        <span>{{ item.title }}</span>
                    </span>
                </template> -->
                <div class="mainView">
                    <router-view v-slot="{ Component }">
                    <transition>
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
                </div>
                

               
            </el-tab-pane>
        </el-tabs>

    </div>
</template>
<style scoped>
.mainView{
    min-height: 650px;
}
</style>