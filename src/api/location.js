import request from '@/utils/request'

export function getLocation(data) {
  return request({
    url: '/func/web/getLocationHistoryByTime',
    method: 'post',
    data
  })
}
