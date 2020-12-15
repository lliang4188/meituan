import request from "../utils/request";
// 传data
export function getCayegroy(data) {
  return request({
    url: '/get_type',
    data
  })
}
// 商家列表
export function getStore(data) {
  return request({
    url: '/get_store',
    data
  })
}
