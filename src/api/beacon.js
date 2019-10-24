import request from '@/utils/request'

export function getBeaconInfo() {
  return request({
    url: '/func/web/getBeaconInfo',
    method: 'post'
  })
}
export function saveBeacon(beaconNum, beaconType, beaconStatus, beaconX, beaconY, companyId) {
  return request({
    url: '/func/web/saveBeaconList',
    method: 'POST',
    data: {
      beaconNum,
      beaconType,
      beaconStatus,
      beaconX,
      beaconY,
      companyId
    }
  })
}
export function editBeacon(beaconId, beaconNum, beaconType, beaconStatus, beaconX, beaconY, companyId) {
  return request({
    url: '/func/web/editBeaconList',
    method: 'POST',
    data: {
      beaconId,
      beaconNum,
      beaconType,
      beaconStatus,
      beaconX,
      beaconY,
      companyId
    }
  })
}
export function deleteBeacon(beaconId) {
  return request({
    url: '/func/web/deleteBeaconList',
    method: 'POST',
    data: {
      beaconId
    }
  })
}
