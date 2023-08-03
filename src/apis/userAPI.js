import http from "@/utils/http"

export const LoginAPI=({name,password})=>{
    return http({
        url:'UserDemo/UserLogin',
        method:'POST',
        params:{
            name,
            password
        }
       
    })
}