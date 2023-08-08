<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
defineProps({
    OneLevel:String,
    TwoLevel:String
})
</script>
<template>
    <div class="bread">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item >{{ OneLevel }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ TwoLevel }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<style>
.bread {
    padding-top: 20px;
    height: 50px;
    line-height: 50px;
    width: 100%;
    background-color: #ecf5ff;
    font-weight: bold;
}
</style>