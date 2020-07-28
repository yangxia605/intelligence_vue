<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm"  :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">用户注册</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container" style="display: inline-block;width: 100px ">
          <svg-icon icon-class="user" />用户名
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"/>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container" style="display: inline-block;width: 100px ">
          <svg-icon icon-class="password" />密码
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-form-item prop="password2">
        <span class="svg-container" style="display: inline-block;width: 100px ">
          <svg-icon icon-class="password2" />确认密码
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password2"
          :type="passwordType"
          placeholder="再次输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <!-- <span>@{{passwordCheckValidate.errorText}}</span> -->
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"  @click="handleLogin">注册</el-button>

      <div class="tips">
        <span style="display: inline-block;float: left" @click="toLogin">返回登录界面</span>
      </div>

    </el-form>
  </div>
</template>

<script>

  export default {
    name: 'Login',
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能少于6位'))
        } else {
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === ""){
          callback(new Error("请再次输入密码"));
        }
        else if(value !== this.loginForm.password) {
          callback(new Error("两次输入密码不一致！"));
        }
        else {
          callback();
        }
      }
      let validateName = (rule, value, callback) => {
        if (value === ""){
          callback(new Error("用户名为空"));
        }
        else {
          callback();
        }
      }
      return {
        loginForm: {
          username: '',
          password: '',
          password2: ''
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateName }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }],
          password2: [{ required: true, trigger: 'blur', validator: validatePass2 }]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      handleRegister() {
        this.$refs.loginForm.validate(valid => {
            if (valid) {
              let postdata = {
                'username': this.loginForm.username,
                'password': this.loginForm.password
              }
              this.$axios({
              methods: 'get',
              url:'/register',
              headers: {'Content-type': 'application/x-www-form-urlencoded'},
              params: postdata})
              .then((response) => {
                if(!response.success) {
                  console.log(response.message)
                  alter(response.message)
                }
                else {
                  console.log(response.message)
                  alter(response.message)
                }
              })
            }
          })
        if (this.loginForm.username === '' || this.loginForm.password === '' || this.loginForm.password2 === '') {
          alter("请填写完整注册信息")
          console.log("注册信息不完整")
          // this.$Message.info("注册信息不完整");
        }
        else if(this.loginForm.password !== this.loginForm.password2) {
          alter("两次密码不一致")
          console.log("两次密码不一致")
          // this.$Message.info("两次密码不一致");
        }
        else {
          this.$refs.loginForm.validate(valid => {
            if (valid) {
              let postdata = {
                'username': this.loginForm.username,
                'password': this.loginForm.password
              }
              this.$axios({
              methods: 'get',
              url:'http://localhost:8080/register',
              headers: {'Content-type': 'application/x-www-form-urlencoded'},
              params: postdata})
              .then((response) => {
                if(!response.success) {
                  console.log(response.message)
                  alter(response.message)
                }
                else {
                  console.log(response.message)
                  alter(response.message)
                }
              })
            }
          })
      }
        },
      // 跳转到注册界面
      toLogin() {
        this.$router.push({ path: '/' })
      }
    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 75%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
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

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
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
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
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
