import request from '@/utils/request'

export function getAlarmInfo() {
  return request({
    url: '/func/web/getAlarmInfo',
    method: 'post'
  })
}
export function saveAlarm(cardId, alarmContent, X, Y, alarmTime) {
  return request({
    url: '/func/web/saveAlarmList',
    method: 'POST',
    data: {
      cardId,
      alarmContent,
      X,
      Y,
      alarmTime
    }
  })
}
export function editAlarm(alarmId, cardId, alarmContent, X, Y, alarmTime) {
  return request({
    url: '/func/web/editAlarmList',
    method: 'POST',
    data: {
      alarmId,
      cardId,
      alarmContent,
      X,
      Y,
      alarmTime
    }
  })
}
export function deleteAlarm(alarmId) {
  return request({
    url: '/func/web/deleteAlarmList',
    method: 'POST',
    data: {
      alarmId
    }
  })
}
