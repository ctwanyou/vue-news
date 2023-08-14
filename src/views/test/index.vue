<template>
    <el-tabs
      v-model="activeTab"
      type="card"
      class="flex-1"
      @tab-change="tabChange"
      @tab-remove="removeTab"
      style="min-width: 100px"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.path != '/'"
      ></el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
//import { useCookies } from "@vueuse/integrations/useCookies";

  const route = useRoute();
  const router = useRouter();
  //const cookie = useCookies();

  const activeTab = ref(route.path);
  const tabList = ref([
    {
      title: "后台首页",
      path: "/",
    },
  ]);

  //点击标签跳转指定路由
  function tabChange(path) {
    router.push(path);
    activeTab.value = path;
  }

  //添加标签导航
  function addTab(tab) {
    const notTab = tabList.value.findIndex((e) => e.path == tab.path) == -1;
    if (notTab) {
      tabList.value.push(tab);
    }
    cookie.set("tabList", tabList.value);
  }

  //初始化tabList
  function initTabList() {
    const data = cookie.get("tabList");
    if (data) {
      tabList.value = data;
    }
  }
  initTabList();

  //获取路由跳转后的tab数据
  onBeforeRouteUpdate((p) => {
    activeTab.value = p.path;
    addTab({
      title: p.meta.title,
      path: p.path,
    });
  });

  //删除tab
  const removeTab = (currentTab) => {
    let tabs = tabList.value;
    let a = activeTab.value;
    //如果当前路径和你要删除的路径一致
    if (currentTab == a) {
      tabs.forEach((tab, index) => {
        //要删除的路径和tabList的路径匹配
        if (tab.path == currentTab) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          //如果存在，获取nextTab路径
          if (nextTab) {
            a = nextTab.path;
          }
        }
      });
    }
    //重新赋值activeTab
    activeTab.value = a;
    //过滤删除后的tabList
    tabList.value = tabList.value.filter((tab) => tab.path != currentTab);
    //设置cookie
   // cookie.set("tabList", tabList.value);
  };
</script>
