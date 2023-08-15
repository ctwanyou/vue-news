<script setup>
import {ref} from 'vue'
import  Teditor from '@/components/Teditor.vue'
const editr=ref(null)
//添加新闻
const sendNews=()=>{
    const res=editr.value.getContents()  //此方法获取的为初始值
    console.log(res);
}
const getContent=(value)=>{
    // 使用value获取Teditr子组件的值
    console.log(`父${value}`)
}
</script>
<template>
    <!-- conten 为子组件的初始值 -->
    <Teditor content="" @getContent="getContent" ref="editr"></Teditor>
    <el-button type="primary" @click="sendNews">添加新闻</el-button>
</template>
<style scoped>
</style>