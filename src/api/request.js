import axios from 'axios';
import { notification } from 'ant-design-vue';
// 这里是用于设定请求后端时，所用的 Token KEY
// 可以根据自己的需要修改，常见的如 Access-Token，Authorization
// 需要注意的是，请尽量保证使用中横线`-` 来作为分隔符，
// 避免被 nginx 等负载均衡器丢弃了自定义的请求头
export const REQUEST_TOKEN_KEY = 'X-Auth-Token';
// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    // baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 100000, // 请求超时时间
});

// 异常拦截处理器
const errorHandler = error => {
    if (error.response) {
        const {
            data = {},
            status,
            statusText,
        } = error.response;
        // 403 无权限
        if (status === 403) {
          setTimeout(() => {
            window.location.href = import.meta.env.VITE_PLATFORM_BASE_URL;
          }, 500)
        }
        // 401 未登录/未授权
        if (status === 401 && data.result && data.result.isLogin) {
            notification.error({
                message: 'Unauthorized',
                description: 'Authorization verification failed',
            });
        }
    }

    return Promise.reject(error);
};

// 请求拦截器
const requestHandler = config => {
    return config;
};

// Add a request interceptor
request.interceptors.request.use(requestHandler, errorHandler);

// 响应拦截器
const responseHandler = response => {
    return response.data;
};

// Add a response interceptor
request.interceptors.response.use(responseHandler, errorHandler);
// export { AxiosResponse };
export default request;
