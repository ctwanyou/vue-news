<script setup>
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { addOneCategory, getOneCategoryList, editOneCategoryOrder, editTwoCategoryOrder, delCategory, editCategory, getTwoCategoryList, addTwoCategory } from '@/apis/categoryAPI.js'
//导入图标
import { Top, Bottom, Check, Delete } from '@element-plus/icons-vue'
import breadCrumb from './breadCrumb.vue'
import { ref, onMounted } from 'vue'
import router from '@/router'

//import { useRouter } from 'vue-router'

//const router = useRouter()
//一级目录选择的是第几项
const radio = ref(0)
//一级目录列表所需数据，由API传入
const oneList = ref([])
//二级目录选择的是第几项
const radioTwo = ref(0)
//二级列表所需的数据，由API传入
const twoList = ref([])



const addOneLevel = ref(false)
const editOneLevel = ref(false)
const addTwoLevel = ref(false)
const editTwoLevel = ref(false)
//const delOneLevel=ref(false)

//修改一级目录排序
const editOneOrder = async () => {
    // console.log(oneList.value)
    const res = await editOneCategoryOrder(JSON.stringify(oneList.value))
    console.log(res)
    //oneList.value=[]
    //return res
}
//触发一级目录排序修改
const doEditOneOrder = () => {
    //oneList.value
    console.log(oneList.value)
    editOneOrder()

    ElMessage({ type: 'success', message: '修改成功' })
    setTimeout(() => {
        //重新加载，清除变量缓存影响
        router.go(0)
    }, 1000)
    //getonelist()
}
//获取一级目录
const getonelist = async () => {
    const res = await getOneCategoryList()
    oneList.value = res.data
    // console.log(res.data)
    radio.value = oneList.value[0]["orderID"]
    form.value.oneLevelName = oneList.value[radio.value]['name']
    gettwolist()
    const i = ref(0)
    oneList.value.forEach(element => {
        element.orderID = i.value
        i.value = i.value + 1

    });
    console.log(oneList.value)

}

//获取二级目录
const gettwolist = async () => {
    const res = await getTwoCategoryList(oneList.value[radio.value]['id'])
    twoList.value = res.data
    if (twoList.value.length > 0) {

        const i = ref(0)
        twoList.value.forEach(element => {
            element.orderID = i.value
            i.value = i.value + 1
        })
        radioTwo.value = twoList.value[0]['orderID']
        form.value.twoLevelName = twoList.value[radioTwo.value]['name']
    }

}
//显示添加一级目录模块
const doAddOne = () => {
    if (addOneLevel.value == false) {
        addOneLevel.value = true
        editOneLevel.value = false
        addTwoLevel.value = false
        editTwoLevel.value = false
    }
    else {
        addOneLevel.value = false
    }
}
//显示修改一级目录模块
const doEditOne = () => {
    //form.value.oneLevelName = oneList.value[radio.value]['name']
    if (editOneLevel.value == false) {
        editOneLevel.value = true
        addOneLevel.value = false
        addTwoLevel.value = false
        editTwoLevel.value = false
    }
    else {
        editOneLevel.value = false
        form.value.oneLevelName = ''
    }
}

//显示添加二级目录模块
const doAddTwo = () => {
    if (addTwoLevel.value == false) {
        addTwoLevel.value = true
        editTwoLevel.value = false
        addOneLevel.value = false
        editOneLevel.value = false
        form.value.twoLevelName = ''
    }
    else {
        addTwoLevel.value = false
    }

}
//显示修改二级目录模块
const doEditTwo = () => {
    if (editTwoLevel.value == false) {
        editTwoLevel.value = true
        addTwoLevel.value = false
        addOneLevel.value = false
        editOneLevel.value = false
        form.value.twoLevelName = twoList.value[radioTwo.value]['name']
    }
    else {
        editTwoLevel.value = false
        form.value.twoLevelName = ''
    }
}
//表单及表单校验
const form = ref({
    oneLevelName: '',
    twoLevelName: ''
})
const rules = {
    oneLevelName: [
        { required: true, message: "目录不能为空", trigger: 'blur' },
        { min: 3, max: 6, message: '目录长度在3-6个字符之间', trigger: 'blur' }
    ],
    twoLevelName: [
        { required: true, message: "目录不能为空", trigger: 'blur' },
        { min: 3, max: 6, message: '目录长度在3-6个字符之间', trigger: 'blur' }
    ]
}
const formRef = ref(null)
const oneGroup = ref(null)
//添加一级目录
const doAddOneLevel = () => {
    const { oneLevelName } = form.value
    formRef.value.validate(async (valid) => {
        //console.log(valid);
        if (valid) {
            const res = await addOneCategory(oneLevelName)
            // console.log(res)
            if (res.data.code === 200) {
                ElMessage({ type: 'success', message: '一级目录添加成功' })
                //router.go(0)
                addOneLevel.value = false
                form.value.oneLevelName = ''
                //刷新加载类别
                getonelist()
            }
        }

    })
}
//执行修改一级目录
const doEditOneLevel = async () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            const res = await editCategory(oneList.value[radio.value]['id'], form.value.oneLevelName)
            if (res.data.code === 200) {
                ElMessage({ type: 'success', message: '一级目录修改成功' })
                editOneLevel.value = false
                form.value.oneLevelName = ''
                //刷新加载类别
                getonelist()
            }
        }
    })

}

//删除一级目录
const doDelOne = async () => {
    const res = await delCategory(oneList.value[radio.value]["id"])
    if (res.data.code === 200) {
        ElMessage({ type: 'success', message: '一级目删除成功' })
        getonelist()
    }
}
//一级排序向上按钮
const doOnTop = () => {
    if (radio.value == 0) {
        ElMessage({ type: 'error', message: '无法提升第一项的排序' })
    }
    else {
        oneList.value[radio.value]['orderID'] = radio.value - 1
        // oneList.value[radio.value - 1]['orderID'] = radio.value
        oneList.value[radio.value - 1]['orderID'] = radio.value
        const ls0 = oneList.value[radio.value - 1]
        const ls1 = oneList.value[radio.value]
        oneList.value[radio.value] = ls0
        oneList.value[radio.value - 1] = ls1
        radio.value = radio.value - 1
        console.log(oneList.value)

    }
}
//一级排序向下按钮
const doOneButtom = () => {
    if (radio.value == oneList.value.length - 1) {
        ElMessage({ type: 'error', message: '无法降低第后一项的排序' })
    }
    else {
        oneList.value[radio.value]['orderID'] = radio.value + 1
        // oneList.value[radio.value - 1]['orderID'] = radio.value
        oneList.value[radio.value + 1]['orderID'] = radio.value
        const ls0 = oneList.value[radio.value + 1]
        const ls1 = oneList.value[radio.value]
        oneList.value[radio.value] = ls0
        oneList.value[radio.value + 1] = ls1
        radio.value = radio.value + 1
        console.log(oneList.value)
    }
}
onMounted(() => {
    // radio.value=6
    getonelist()
    //radio.value=oneList.value[0]["id"]
    //console.log(oneList.value)
})
//一级目录选择改变时
const oneChange = () => {
    form.value.oneLevelName = oneList.value[radio.value]['name']
    gettwolist()

    //console.log(radio.value)
    // console.log(oneGroup.value)
}
//二级目录选择改变时
const TwoChange = () => {
    form.value.twoLevelName = twoList.value[radioTwo.value]['name']
}
//执行添加二级目录
const doAddTwoLevel = async () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            const res = await addTwoCategory(oneList.value[radio.value]['id'], form.value.twoLevelName)
            if (res.data.code == 200) {
                ElMessage({ type: 'success', message: '二级目录添加成功' })
                form.value.twoLevelName = ''
                addTwoLevel.value = false
                gettwolist()
            }
        }

    })

}
//执行修改二级目录
const doeditTwoLevel = async () => {
    //console.log(form.value.twoLevelName)
    formRef.value.validate(async (valid) => {
        if (valid) {
            const res = await editCategory(twoList.value[radioTwo.value]['id'], form.value.twoLevelName)
            if (res.data.code == 200) {
                ElMessage({ type: 'success', message: '一级目录修改成功' })
                editTwoLevel.value = false
                form.value.twoLevelName = ''
                //刷新加载类别
                gettwolist()
            }
        }
    })
}
//执行删除二级目录
const doDelTwo = async () => {
    const res = await delCategory(twoList.value[radioTwo.value]["id"])
    if (res.data.code === 200) {
        ElMessage({ type: 'success', message: '二级目删除成功' })
        gettwolist()
    }
}
//二级排序向上按钮
const doTwoTop = () => {
    if (radioTwo.value == 0) {
        ElMessage({ type: 'error', message: '无法提升第一项的排序' })
    }
    else {
        twoList.value[radioTwo.value]['orderID'] = radioTwo.value - 1
        // twoList.value[radio.value - 1]['orderID'] = radio.value
        twoList.value[radioTwo.value - 1]['orderID'] = radioTwo.value
        const ls0 = twoList.value[radioTwo.value - 1]
        const ls1 = twoList.value[radioTwo.value]
        twoList.value[radioTwo.value] = ls0
        twoList.value[radioTwo.value - 1] = ls1
        radioTwo.value = radioTwo.value - 1
        //console.log(twoList.value)

    }
}
//二级排序向下按钮
const doTwoButtom = () => {
    if (radioTwo.value == twoList.value.length - 1) {
        ElMessage({ type: 'error', message: '无法降低第后一项的排序' })
    }
    else {
        twoList.value[radioTwo.value]['orderID'] = radioTwo.value + 1
        // twoList.value[radioTwo.value - 1]['orderID'] = radioTwo.value
        twoList.value[radioTwo.value + 1]['orderID'] = radioTwo.value
        const ls0 = twoList.value[radioTwo.value + 1]
        const ls1 = twoList.value[radioTwo.value]
        twoList.value[radioTwo.value] = ls0
        twoList.value[radioTwo.value + 1] = ls1
        radioTwo.value = radioTwo.value + 1
        console.log(twoList.value)
    }
}
//触发二级目录排序修改
const doEditTwoOrder = async() => {
    //需要获取异步返回值，需使用 async await
    const res = await editTwoCategoryOrder(oneList.value[radio.value]['id'], JSON.stringify(twoList.value))
    //console.log(res)
    if (res.data.code == 200) {
        ElMessage({ type: 'success', message: '修改成功' })
        setTimeout(() => {
            //重新加载，清除变量缓存影响
            router.go(0)
        }, 1000)
    }

    //getonelist()
}
</script>
<template>
    <breadCrumb OneLevel="新闻类别" TwoLevel="类别编辑" />
    <div class="container">
        <div class="main">
            <table class="cont_table">
                <tr>
                    <th width="350">
                        一级栏目
                    </th>
                    <th width="350">
                        二级栏目
                    </th>
                </tr>
                <tr>
                    <td style="display: flex;">
                        <div style="width: 160px;">
                            <el-radio-group v-model="radio" class="radioColumn" @change="oneChange" ref="oneGroup">
                                <el-radio-button v-for="item in oneList" :key="item.orderID" :label='item.orderID'
                                    class="radioButton">{{ item.name }}</el-radio-button>
                            </el-radio-group>
                        </div>
                        <div style="display: flex;flex-flow:column nowrap;height: 300px;margin: auto 10px;">
                            <div class="radioButton">
                                栏目排序
                            </div>
                            <div class="radioButton">
                                <el-button type="primary" :icon="Top" @click="doOnTop" />
                            </div>
                            <div class="radioButton">
                                <el-button type="primary" :icon="Bottom" @click="doOneButtom" />
                            </div>
                            <div class="radioButton">
                                <el-button type="primary" :icon="Check" @click="doEditOneOrder">确定</el-button>
                            </div>

                        </div>

                    </td>
                    <td>
                        <div style="display: flex;">
                            <div style="width: 160px;">
                                <el-radio-group v-model="radioTwo" class="radioColumn" @change="TwoChange">
                                    <el-radio-button v-for="item in twoList" :key="item.orderID" :label="item.orderID"
                                        class="radioButton">{{ item.name }}</el-radio-button>
                                </el-radio-group>
                            </div>
                            <div style="display: flex;flex-flow:column nowrap;height: 300px;margin: auto 10px;">
                                <div class="radioButton">
                                    栏目排序
                                </div>
                                <div class="radioButton">
                                    <el-button type="primary" :icon="Top" @click="doTwoTop" />
                                </div>
                                <div class="radioButton">
                                    <el-button type="primary" :icon="Bottom" @click="doTwoButtom" />
                                </div>
                                <div class="radioButton">
                                    <el-button type="primary" :icon="Check" @click="doEditTwoOrder">确定</el-button>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td height="50">
                        <el-button type="primary" size="small" @click="doAddOne">添加一级目录</el-button>
                        <el-button type="success" size="small" @click="doEditOne">修改一级目录</el-button>
                        <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="Delete" icon-color="#ff0000"
                            title="删除后不可恢复，文章不可见，确定删除?" @confirm="doDelOne">
                            <template #reference>
                                <el-button type="warning" size="small">删除一级目录</el-button>
                            </template>
                        </el-popconfirm>
                    </td>
                    <td>
                        <el-button type="primary" size="small" @click="doAddTwo">添加二级目录</el-button>
                        <el-button type="success" size="small" @click="doEditTwo">修改二级目录</el-button>
                        <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="Delete" icon-color="#ff0000"
                            title="删除后不可恢复，文章不可见，确定删除?" @confirm="doDelTwo">
                            <template #reference>
                                <el-button type="warning" size="small">删除二级目录</el-button>
                            </template>
                        </el-popconfirm>
                    </td>
                </tr>
            </table>
        </div>
        <el-form :model="form" :rules="rules" ref="formRef">
            <div class="level" v-if="addOneLevel">
                <el-form-item label="添加一级目录" prop="oneLevelName"><el-input v-model="form.oneLevelName"
                        placeholder="输入一级目录的名称" class="inputWidth" /></el-form-item>
                <el-button type="primary" @click="doAddOneLevel">添加一级目录</el-button>
            </div>
            <div class="level" v-if="editOneLevel">
                <!-- 修改一级目录：<el-input v-model="oneLevelName" placeholder="输入一级目录的名称" class="inputWidth" /> -->
                <el-form-item label="修改一级目录" prop="oneLevelName"><el-input v-model="form.oneLevelName"
                        placeholder="输入一级目录的名称" class="inputWidth" /></el-form-item>
                <el-button type="primary" @click="doEditOneLevel">修改一级目录</el-button>
            </div>
            <!-- 添加二级目录模块 -->
            <div class="level" v-if="addTwoLevel">
                <el-form-item label="一级目录"><el-input v-model="form.oneLevelName" class="inputWidth"
                        disabled /></el-form-item>
                <el-form-item label="二级级目录" prop="twoLevelName"><el-input v-model="form.twoLevelName"
                        placeholder="输入二级目录的名称" class="inputWidth" /></el-form-item>
                <el-button type="primary" @click="doAddTwoLevel">添加二级目录</el-button>
            </div>
            <!-- 修改二级目录模块 -->
            <div class="level" v-if="editTwoLevel">
                <el-form-item label="一级目录"><el-input v-model="form.oneLevelName" class="inputWidth"
                        disabled /></el-form-item>
                <el-form-item label="二级级目录" prop="twoLevelName"><el-input v-model="form.twoLevelName"
                        placeholder="输入二级目录的名称" class="inputWidth" /></el-form-item>
                <el-button type="primary" @click="doeditTwoLevel">修改二级目录</el-button>
            </div>
        </el-form>
    </div>
</template>
<style>
.radioColumn {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
}

.radioButton {
    margin-bottom: 5px;
}

.container {
    background-color: #FAFCFF;
}

.level {
    height: 50px;
    line-height: 50px;
}

.inputWidth {
    width: 150px;
    margin-right: 10px;
}
</style>