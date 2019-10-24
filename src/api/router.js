import request from '@/utils/request'

export function getRouterInfo() {
  return request({
    url: '/func/web/getRouterInfo',
    method: 'post'
  })
}
export function saveRouter(routerId, routerNum, routerType, routerStatus, companyId) {
  return request({
    url: '/func/web/saveRouterList',
    method: 'POST',
    data: {
      routerId,
      routerNum,
      routerType,
      routerStatus,
      companyId
    }
  })
}
export function editRouter(routerId, routerNum, routerType, routerStatus, companyId) {
  return request({
    url: '/func/web/editRouterList',
    method: 'POST',
    data: {
      routerId,
      routerNum,
      routerType,
      routerStatus,
      companyId
    }
  })
}
export function deleteRouter(routerId) {
  return request({
    url: '/func/web/deleteRouterList',
    method: 'POST',
    data: {
      routerId
    }
  })
}

