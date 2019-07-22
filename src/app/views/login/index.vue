<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title" style="margin-bottom: 16px;">交易所监控系统</h3>
      <h6 class="title" style="font-size: 20px">Unified Technical Monitoring System</h6>
      <el-form-item prop="username" class="login-width">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" clearable type="text" v-model="loginForm.username" autoComplete="off" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password" class="login-width">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" clearable  :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="off"
          placeholder="请输入密码"></el-input>
          <span class="show-pwd" @click="showPwd">
            <svg-icon v-show="this.pwdType.length > 0" icon-class="eye" />
             <svg-icon v-show="!(this.pwdType.length > 0)" icon-class="openEye" />
          </span>
      </el-form-item>
      <el-form-item class="login-width">
        <el-button type="primary" v-waves style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/common/utils/validate'
import waves from '@/common/directive/waves/index.js'
export default {
    name: 'login',
    directives: {
        waves
    },
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!isvalidUsername(value)) {
                callback(new Error('请输入正确的用户名'))
            } else if (value.length === 0) {
                callback(new Error('请输入用户名'))
            } else {
                callback()
            }
        }
        const validatePass = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码不能小于6位'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: '23456',
                password: 'Aa12345'
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePass }]
            },
            loading: false,
            pwdType: 'password'
        }
    },
    methods: {
        showPwd() {
            if (this.pwdType === 'password') {
                this.pwdType = ''
            } else {
                this.pwdType = 'password'
            }
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                // 如果用户名和密码通过校验,则进行登录判断
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
                        this.loading = false
                        this.$router.push({ path: '/' })
                    }).catch(err => {
                        this.loading = false
                        this.$message.error(err)
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-image:url(../../../common/assets/images/tust.jpg);
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    background-color: #3f6fad;
    box-shadow: 0 0 12px #4f7cb5;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
