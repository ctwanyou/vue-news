import http from "@/utils/http"

export const tinyMceUpFile=(url,params)=>{
    return http({
        url:url,
        method:'POST',
        data:params,
    })
}