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
          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type='success' class="block" @click="getSms()" :disabled="codeButtonStatus.status">{{codeButtonStatus.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" class="login_btn block" @click="submitForm('ruleForm')" :disabled="loginButtonStatus">{{model === 'login' ? '登录' : '注册'}}</el-button>
        </el-form-item>
        
      </el-form>
    </div>
  </div>
</template>

<script>
import { GetSms,Register } from '@/api/login'
import { reactive,ref,isRef,toRef,onMounted,watch} from '@vue/composition-api'
import { validataEmail,validataPassword,validataCode,stripscript } from 'utils/validata'
export default {
  name: 'login',
  setup(prop,{refs,root}){
  /**
    setup(props, context){
    attrs: (...) == this.$attrs
    emit: (...) == this.$emit
    listeners: (...) == this.$listeners
    parent: (...) == this.$parent
    refs: (...) == this.$refs
    root: (...) == this
    */


    // 验证邮箱
    let validateUsername = (rule, value, callback) => {      
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (validataEmail(value)) {
        callback(new Error('邮箱格式错误!'));
      } else {
        callback();
      }
      
    };
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      if(ruleForm.password != stripscript(value) ){
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
    let validatePasswords = (rule, value, callback) => {
      if(ruleForm.passwords === ''){
        callback(new Error('请再次输入验证码'))
      }else if(ruleForm.password != ruleForm.passwords){
        callback(new Error('两次输入密码不一致，请重新输入'))
      }else{
        callback();
      }
    };
    // 验证码
    let checkCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入验证码'));
      }else if(validataCode(value)){
        return callback(new Error('验证码格式错误'))
      }else{
        callback()
      }
    };


    /**
     * *************************************************************************************声明  变量--------------
     * 声明变量
     */
    // 这里面放置data数据、生命周期、自定义的函数





    // 
    const menuTab = reactive([
        { txt: '登录', current: true ,type:'login' },
        { txt: '注册', current: false , type:'register'}
      ]);
    // 模块值
    const model = ref('login');
    // 登录按钮禁用状态
    const loginButtonStatus = ref(true)
    // 获取验证码禁用状态
    const codeButtonStatus = reactive({
      status:false,
      text:'获取验证码'
    })
    const timer = ref(null)
    // 表单
    const ruleForm = reactive({
        username: '',
        password: '',
        passwords: '',
        code: ''
      });
    
    // 验证规则
    const rules = reactive({
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        passwords: [{ validator: validatePasswords, trigger: 'blur' }],
        code: [{ validator: checkCode, trigger: 'blur' }]
      });





    /**
     * 声明方法**************************************************************************声明  方法--------------------
     */

    
    // 切换tab
    const selectTab = data => {
      menuTab.forEach((elem, index) => {
        elem.current = false
      })
      // 高光
      data.current = true

      model.value = data.type
      // 重置表单
      resetFromData()
      // 清除按钮状态
      clearCountDown()
    };
    // 清除输入框
    const resetFromData = () => {
      refs.ruleForm.resetFields()
    };
    // 更新按钮状态
    const updataButtonStatus = params => {
      codeButtonStatus.status = params.status,
      codeButtonStatus.text = params.text
    }
    // 发送验证码
    const getSms = () => {
      // if(ruleForm.username == ''){
      //   root.$message.error('请输入邮箱账号！！');
      // }
      let data = {
        username:ruleForm.username,
        module:model.value
      }
      if(data.username == ''){
        root.$message.error('请输入邮箱账号！！');
        return
      }
      if(validataEmail(data.username)){
        root.$message.error('用户名包含非法字符！！');
        return
      }
      
      // 更新按钮状态
      updataButtonStatus({
        status : true,
        text:'请求中'
      })

      // 验证码发送请求
      GetSms(data).then((result) => {
        let resCode = result.data
        root.$message({
          message: resCode.message,
          type: 'success'
        });
        // 登录或者注册按钮的禁用
        loginButtonStatus.value = false
        // console.log(resCode)
        // root.$message({
        //   message: `验证码已发送，验证码：${resCode.message}`,
        //   type: 'success'
        // });
        countDown(60)
      }).catch((err) => {
        console.log(err)
        updataButtonStatus({
          status : false,
          text:'获取验证码'
        })
      });
      // {username:'1111111@qq.com',module:'login'}
    }
    // 提交
    const submitForm = formName => {
      // 表单验证
      refs.ruleForm.validate((valid) => {
        if (valid) {
          //三元运算符
          model.value === 'login' ? login() : register()
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    };
    /**
     * 登录
     */
    const login = () => {

    }
    /**
     * 注册
     */
    const register = () => {
      let requestData = {
        username:ruleForm.username,
        password:ruleForm.password,
        code:ruleForm.code,
      }
      Register(requestData).then(response => {
        let sucData = requestData.data
        // console.log(response)
        root.$message({
          message:sucData.message,
          type:'success'
        })
        selectTab(menuTab[0])
      }).catch( err => {
        // root.$message.error('注册失败！');
        console.log(err)
      })
    }
    
    // 定时器
    const countDown = number => {
      // setTimeout:clearTimeout(变量)  只执行一次
      // setInterval:clearInterval(变量))  不断的执行，需要条件才会停止
      // 判断定时器是否存在，存在则清除
      if(timer.value){
        clearInterval(timer.value)
      }
      let time = number
      timer.value = setInterval(() => {
        time--;
        if(time == 0 ){
          clearInterval(timer.value)
          updataButtonStatus({
            status : false,
            text:'再次获取'
          })
        }else{
          codeButtonStatus.text = `倒计时(${time})`
        }
      }, 1000);
    }
    // 清除倒计时
    const clearCountDown = () => {
      updataButtonStatus({
        status : false,
        text:'获取验证码'
      })
      clearInterval(timer.value)
    }
    /**
     * 声明周期
     */
    onMounted(()=>{})
    
    return {
      menuTab,
      model,
      loginButtonStatus,
      codeButtonStatus,
      timer,
      getSms,
      ruleForm,
      rules,
      selectTab,
      submitForm
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