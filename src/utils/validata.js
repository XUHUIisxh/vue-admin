/**
 * 过滤特殊字符
 */
export function stripscript(str) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
  var rs = "";
  for (var i = 0; i < str.length; i++) {
      rs = rs + str.substr(i, 1).replace(pattern, '');
  }
  return rs;
}

/**
 * 验证邮箱
 */
export function validataEmail(value){
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; 
  return !reg.test(value) ? true : false
  // 验证不通过为true 返回给条件语句 为true时表示格式不正确 需要抛出错误
}

/**
* 验证密码 6-20位密码
*/
export function validataPassword(value){
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return !reg.test(value) ? true :false
}

/**
 * 验证code码 6位验证码
 */
export function validataCode (value){
  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(value) ? true : false;
}