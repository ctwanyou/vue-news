import http from "@/utils/http"

//添加一级目录
export const addOneCategory=(categoryName)=>{
    return http({
        url:'Category/AddOneLevel',
        method:'POST',
        params:{
            categoryName
        }
    })
}
//获取一级目录
export const getOneCategoryList=()=>{
    return http({
        url:'Category/OneCateLists',
        method:'GET'
    })
}
//修改一级目录排序
export const editOneCategoryOrder=(lists)=>{
    return http({
        url:'Category/editOneOrder',
        method:'POST',
        params:{
            lists
        }
    })
}

//修改一级目录排序
export const editTwoCategoryOrder=(id,lists)=>{
    return http({
        url:'Category/editOneOrder',
        method:'POST',
        params:{
            id,
            lists
        }
    })
}

//删除目录
export const delCategory=(id)=>{
    return http({
        url:'Category/DelCate',
        method:'POST',
        params:{
            id
        }
    })
}
//修改目录
export const editCategory=(id,cateName)=>{
    return http({
        url:'Category/editCateName',
        method:'POST',
        params:{
            id,
            cateName
        }
    })
}
//添加二级目录
export const addTwoCategory=(id,cateName)=>{
    return http({
        url:'Category/addTwoLevel',
        method:'POST',
        params:{
            id,cateName
        }
    })
}
//获取二级目录
export const getTwoCategoryList=(id)=>{
    return http({
        url:'Category/TwoCateLists',
        method:"GET",
        params:{
            id
        }
    })
}