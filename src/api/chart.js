import request from '@/utils/request'

export function getlineListInfo() {
  return request({
    url: '/func/web/getAlarmInfo',
    method: 'post'
  })
}
export function getbarListInfo() {
  return request({
    url: '/func/web/getAlarmInfo',
    method: 'post'
  })
}
