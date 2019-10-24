import request from '@/utils/request'

export function getElectricFence(data) {
  return request({
    url: '/func/web/getElectricFence',
    method: 'post',
    data
  })
}
export function getElectricFenceInfo(data) {
  return request({
    url: '/func/web/getElectricFenceInfo',
    method: 'post',
    data
  })
}
export function saveElectricFence(mapId, status, capability, level, location) {
  return request({
    url: '/func/web/saveElectricFence',
    method: 'post',
    data: {
      mapId,
      status,
      capability,
      level,
      location
    }
  })
}
export function editElectricFence(fenceId, mapId, status, capability, level) {
  return request({
    url: '/func/web/editElectricFence',
    method: 'POST',
    data: {
      fenceId,
      mapId,
      status,
      capability,
      level
    }
  })
}
export function deleteElectricFence(fenceId) {
  return request({
    url: '/func/web/deleteElectricFence',
    method: 'POST',
    data: {
      fenceId
    }
  })
}

