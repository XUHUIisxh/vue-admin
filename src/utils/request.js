import axios from 'axios'

const BASEURL = process.env.NODE_ENV === "production" ? '' : '/devApi' 
// const BASEURL = 'http://vue-admin.web-jshtml.cn/productapi'
/**
 * process.env.NODE_ENV === "production"为生产环境
 * process.env.NODE_ENV === development 为开发环境
 */

/**
 * 创建一个axios实例
 */
const service = axios.create({
  baseURL: BASEURL, // http://192.168.0.106:8080/devApi/  == http://www.web-jshtml.cn/productapi/productapi
  timeout:50000
  //超时时间
})

/**
 * 请求拦截
 */
service.interceptors.request.use((config)=>{
  console.log(BASEURL)
  return config;
},(err)=>{
  return Promise.reject(err);
})

/**
 * 相应拦截
 */
service.interceptors.response.use((config)=>{
  return config;
},(err)=>{
  return Promise.reject(err)
})

export default service;



