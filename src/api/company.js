import request from '@/utils/request'

export function getCompanyInfo(data) {
  return request({
    url: '/func/web/getCompanyInfo',
    method: 'post'
  })
}
