import axios from 'axios';

const instance = axios.create();

instance.defaults.headers.common['Authorization'] = "xxxx";

instance.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response.data;
}, (error) => {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default instance;