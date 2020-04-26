<template>
  <div class="login">
    <div class="login_wrap">

      <ul class="top_menu">
        <li v-for="(tab,index) in menuTab" :key="index" :class="{'current':tab.current}" @click="selectTab(tab)">{{tab.txt}}</li>
      </ul>
      <!-- 表单 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login_form" size="medium">

        <el-form-item prop="username">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" v-if="model === 'register'">
          <label>确认输入密码</label>
          <el-input type="passwords" v-model="ruleForm.passwords" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type='success' class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" class="login_btn block" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
        
      </el-form>
    </div>
  </div>
</template>

<script>
import { validataEmail,validataPassword,validataCode,stripscript } from 'utils/validata'
export default {
  name: 'login',
  data() {
    // 验证用户名
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (validataEmail(value)) {
        callback(new Error('邮箱格式错误!'));
      } else {
        callback();
      }
      
    };
    // 验证密码
    var validatePassword = (rule, value, callback) => {
      if(this.ruleForm.password != stripscript(value) ){
        callback(new Error('密码包含非法字符，请重新输入！'))
      }else{
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (validataPassword(value)) {
          callback(new Error('请输入6-20位数字字母组合密码!'));
        } else {
          callback();
        }
      }
    };
    // 注册二次验证
    var validatePasswords = (rule, value, callback) => {
     if(this.ruleForm.password != this.ruleForm.passwords){
       callback(new Error('两次输入密码不一致，请重新输入'))
     }else{
       callback();
     }
    };
    // 验证码
    var checkCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入验证码'));
      }else if(validataCode(value)){
        return callback(new Error('验证码格式错误'))
      }else{
        callback()
      }
    };
    return {
      ruleForm: {
        username: '',
        password: '',
        passwords: '',
        code: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwords: [
          { validator: validatePasswords, trigger: 'blur' }
        ],
        code: [
          { validator: checkCode, trigger: 'blur' }
        ]
      },
      model : 'login',
      menuTab: [
        { txt: '登录', current: true ,type:'login' },
        { txt: '注册', current: false , type:'register'}
      ]
    }
  },
  methods: {
  selectTab(data) {
    // 切换tab
      this.menuTab.forEach((elem, index) => {
        elem.current = false
      })
      // 高光
      data.current = true

      this.model = data.type
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  },
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: #344a5f;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_wrap {
    width: 330px;
    .top_menu {
      text-align: center;
      li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
      }
      .current {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }

  .login_form {
    label {
      font-size: 14px;
      color: #fff;
    }
    .block {
      display: block;
      width: 100%;
    }
    .login_btn {
      margin-top: 19px;
    }
  }
}
</style>