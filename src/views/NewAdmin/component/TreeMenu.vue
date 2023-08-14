<script setup>
import { onMounted } from "vue"
defineProps({
    treeData: []
})


</script>
<template >
    <div>
        <template v-for="item in treeData" :key="item.id">
            <el-sub-menu v-if="item.children" :index="item.id">
                <template #title>
                    <el-icon>
                        <component class="icons" :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.title }}</span>
                </template>
                <TreeMenu :tree-data="item.children"></TreeMenu>
            </el-sub-menu>
            <el-menu-item v-else-if="!item.children" :index="item.id"><el-icon>
                    <component class="icons" :is="item.icon"></component>
                </el-icon>{{ item.title }}</el-menu-item>
        </template>
    </div>
</template>
  
<style scoped></style>