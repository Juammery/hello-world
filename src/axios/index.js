import axios from 'axios'
import ElementUI from 'element-ui'
import { Loading } from 'element-ui';
// 默认配置一个api代理转发
axios.defaults.baseURL = '/api';
// 配置接口返回code不为0时 弹出错误配置信息
let loading;

axios.interceptors.response.use(function (response) {
  if (loading) loading.close();
  if (response.data.code === 1) {
    Loading.service({
      type: 'warning',
      message: response.data.msg
    })
  }
  return response;
}, function (error) {
  if (loading) loading.close();
  if (error.response) {
    switch (error.response.status) {
      case 500:
        ElementUI.Message({
          type: 'warning',
          message: '请联系服务器管理员！'
        });
    }
  }
  return Promise.reject(error.response.data)
})
export default axios
