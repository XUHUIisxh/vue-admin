import service from '@/utils/request.js'

/**
 * 获取验证码
 */
export function GetSms(data) {
  return service.request({
    url:'/getSms/',
    method:'POST',
    data
  })
}


/**
 * 登录
 */

 
/**
* 注册
*/
export function Register(data){
  return service.request({
    url:'/register/',
    method:'POST',
    data
  })
}



