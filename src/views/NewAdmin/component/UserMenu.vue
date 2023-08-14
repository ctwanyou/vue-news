<script setup>
import { onMounted, ref } from 'vue'
import MenuData from '@/stores/Menu.json'
import TreeMenu from './TreeMenu.vue'

//向父组件传值的事件
const emit=defineEmits(['get-routerdata'])

const MenuListData=ref([])
const RouterConfig=ref({
    name:'',
    icon:'',
    title:'',
    routerPath:'',
    modulePath:null
})
//激活项index的值
const activeIndex = ref('')
const seleMenu = (key,keyPath) => {
    console.log(key,keyPath[0])
    // const i=ref(0)
    // const j=ref(0)
    MenuListData.value.forEach((item)=>{
        if(item.id==keyPath[0]){
            // console.log(i.value)
            // j.value=0
            // console.log()
           // console.log('lenght='+item['children'])
           if(item['children']){
            item['children'].forEach((e)=>{
                if(e.id==key){

                    //动态路由参数在此获取
                    console.log(e['title'])
                    setRouterData(e)
                    
                }
               
            })
           }
           else{
            //动态路由参数在此获取
             console.log(item.title)
             setRouterData(item)
           }
            
        }       
    })
}
//给动态路由参数赋值,并传给父组件
const setRouterData=(e)=>{
    RouterConfig.value.name=e.Path
    RouterConfig.value.icon=e.icon
    RouterConfig.value.title=e.title
    RouterConfig.value.routerPath='/NewsAdmin/'+e.Path 
    //let str=  `./${e.Path}.vue`
    RouterConfig.value.modulePath=`./${e.Path}.vue`
    emit('get-routerdata',RouterConfig.value)
}
onMounted(()=>{
    MenuListData.value=  MenuData
    console.log(MenuListData.value[0]['title'])
})

</script>
<template>
    <div class="grid-content left">
        <h4 class="mb-2" style="padding-bottom: 10px;">
            <el-icon style="margin-right: 20px;">
                <Menu />
            </el-icon>选择所需功能</h4>
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo"  @select="seleMenu">
            <TreeMenu :treeData='MenuListData'/>
        </el-menu>

    </div>
</template>
<style scoped></style>