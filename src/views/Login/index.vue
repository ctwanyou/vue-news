<script setup>


import { ref } from 'vue'

// 1 准备表单对象 并绑定
const form = ref({
    account: '',
    password: '',
    agree: true
})
// 1 准备规则对象
const rules = {
    account: [
        { required: true, message: '用户名不得为空', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不得为空', trigger: 'blur' },
        { min: 6, max: 19, message: "密码长度在6-19位", trigger: 'blur' }
    ],
    agree: [
        {
            validator: (rule, val, callback) => {
                // console.log(val);
                if (val) {
                    callback()
                }
                else {
                    callback(new Error('请勾选协议'))
                }
            }
        }
    ]
}
</script>


<template>
    <div>
        <header class="login-header">
            <div class="container m-top-20">
                <h1 class="logo">
                    <RouterLink to="/">小兔鲜</RouterLink>
                </h1>
                <RouterLink class="entry" to="/">
                    进入网站首页
                    <i class="iconfont icon-angle-right"></i>
                    <i class="iconfont icon-angle-right"></i>
                </RouterLink>
            </div>
        </header>
        <section class="login-section">
            <div class="wrapper">
                <nav>
                    <a href="javascript:;">账户登录</a>
                </nav>
                <div class="account-box">
                    <div class="form">
                        <el-form :model="form" :rules="rules" label-position="right" label-width="60px" status-icon>
                            <el-form-item prop="account" label="账户">
                                <el-input v-model="form.account" placeholder="请输入用户名" clearable />
                            </el-form-item>
                            <el-form-item prop="password" label="密码">
                                <el-input v-model="form.password" placeholder="请输入密码" clearable type="password"
                                    show-password="true" />
                            </el-form-item>
                            <el-form-item label-width="22px" prop="agree">
                                <el-checkbox size="large" v-model="form.agree">
                                    我已同意隐私条款和服务条款
                                </el-checkbox>
                            </el-form-item>
                            <el-button size="large" type="success" class="subBtn">点击登录</el-button>
                        </el-form>
                    </div>
                </div>
            </div>
        </section>

        <footer class="login-footer">
            <div class="container">
                <p>
                    <a href="javascript:;">关于我们</a>
                    <a href="javascript:;">帮助中心</a>
                    <a href="javascript:;">售后服务</a>
                    <a href="javascript:;">配送与验收</a>
                    <a href="javascript:;">商务合作</a>
                    <a href="javascript:;">搜索推荐</a>
                    <a href="javascript:;">友情链接</a>
                </p>
                <p>CopyRight &copy; 小兔鲜儿</p>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.login-header {
    background: #fff;
    border-bottom: 1px solid #e4e4e4;
}

.login-header .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
}

.login-header .logo {
    width: 200px;
}

.login-header .logo a {
    display: block;
    height: 132px;
    width: 100%;
    text-indent: -9999px;
    background: url("@/assets/images/logo.png") no-repeat center 18px/contain;
}

.login-header .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
}

.login-header .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;
}

.login-header .entry i {
    font-size: 14px;
    color: #27ba9b;
    letter-spacing: -5px;
}

.login-section {
    background: url("@/assets/images/login-bg.png") no-repeat center/cover;
    height: 488px;
    position: relative;
}

.login-section .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.login-section .wrapper nav {
    font-size: 14px;
    height: 55px;
    margin-bottom: 20px;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    padding: 0 40px;
    text-align: right;
    align-items: center;
}

.login-section .wrapper nav a {
    flex: 1;
    line-height: 1;
    display: inline-block;
    font-size: 18px;
    position: relative;
    text-align: center;
}

.login-footer {
    padding: 30px 0 50px;
    background: #fff;
}

.login-footer p {
    text-align: center;
    color: #999;
    padding-top: 20px;
}

.login-footer p a {
    line-height: 1;
    padding: 0 10px;
    color: #999;
    display: inline-block;
}

.login-footer p a~a {
    border-left: 1px solid #ccc;
}

.account-box .toggle {
    padding: 15px 40px;
    text-align: right;
}

.account-box .toggle a {
    color: #27ba9b;
}

.account-box .toggle a i {
    font-size: 14px;
}

.account-box .form {
    padding: 0 20px 20px 20px;
}

.account-box .form-item {
    margin-bottom: 28px;
}

.account-box .form-item .input {
    position: relative;
    height: 36px;
}

.account-box .form-item .input>i {
    width: 34px;
    height: 34px;
    background: #cfcdcd;
    color: #fff;
    position: absolute;
    left: 1px;
    top: 1px;
    text-align: center;
    line-height: 34px;
    font-size: 18px;
}

.account-box .form-item .input input {
    padding-left: 44px;
    border: 1px solid #cfcdcd;
    height: 36px;
    line-height: 36px;
    width: 100%;
}

.account-box .form-item .input input.error {
    border-color: #cf4444;
}

.account-box .form-item .input input.active,
.account-box .form-item .input input:focus {
    border-color: #27ba9b;
}

.account-box .form-item .input .code {
    position: absolute;
    right: 1px;
    top: 1px;
    text-align: center;
    line-height: 34px;
    font-size: 14px;
    background: #f5f5f5;
    color: #666;
    width: 90px;
    height: 34px;
    cursor: pointer;
}

.account-box .form-item>.error {
    position: absolute;
    font-size: 12px;
    line-height: 28px;
    color: #cf4444;
}

.account-box .form-item>.error i {
    font-size: 14px;
    margin-right: 2px;
}

.account-box .form .agree a {
    color: #069;
}

.account-box .form .btn {
    display: block;
    width: 100%;
    height: 40px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    background: #27ba9b;
}

.account-box .form .btn.disabled {
    background: #cfcdcd;
}

.account-box .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.account-box .action .url a {
    color: #999;
    margin-left: 10px;
}

.subBtn {
    /* background: #cfcdcd; */
    width: 100%;
    /* color: #fff; */
}</style>