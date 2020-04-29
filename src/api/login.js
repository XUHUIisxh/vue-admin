import service from '@/utils/request.js'

/**
 * 获取验证码
 */
export function GetSms(url,config) {
  service.request({
    url,
    method:'POST',
    data:config.data
  })
}


/**
 * 登录
 */

/**
* 注册
*/



