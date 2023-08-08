import http from "@/utils/http"
//用户登陆
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

//用户Jwt校验

export const JWTCheckAPI=()=>{
    return http({
        url:'UserDemo/TestAuthorize',
        method:'post'
    })
}