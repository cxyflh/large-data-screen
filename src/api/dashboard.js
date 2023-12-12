import request from "@/api/request.js";
// const baseUrl = '/state-assets-monitor';
const baseUrl = 'http://127.0.0.1:4523/m1/3704704-0-default';

/** 采购监管月报数据 **/
export const getProcurementSupervision = (params) => {
  return request.get(baseUrl + '/procurementSupervision', { params })
}

/** 获取主屏数据 */
export const getHomeDomain = (params) => {
  return request.get(baseUrl + '/domain', { params })
}

/** 获取三重一大数据 */
export const getSZYD = (params) => {
  return request.get(baseUrl + '/szyd', { params })
}

/** 获取bu下拉框 */
export const getBuList = (params) => {
  return request.get(baseUrl + '/bu-list', { params })
}