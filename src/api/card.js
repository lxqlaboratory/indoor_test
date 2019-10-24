import request from '@/utils/request'

export function getCardInfo() {
  return request({
    url: '/func/web/getCardInfo',
    method: 'post'
  })
}
export function saveCard(personId, cardNum, cardType, cardStatus, companyId) {
  return request({
    url: '/func/web/saveCardList',
    method: 'POST',
    data: {
      personId,
      cardNum,
      cardType,
      cardStatus,
      companyId
    }
  })
}
export function editCard(cardId, personId, cardNum, cardType, cardStatus, companyId) {
  return request({
    url: '/func/web/editCardList',
    method: 'POST',
    data: {
      cardId,
      personId,
      cardNum,
      cardType,
      cardStatus,
      companyId
    }
  })
}
export function deleteCard(cardId) {
  return request({
    url: '/func/web/deleteCardList',
    method: 'POST',
    data: {
      cardId
    }
  })
}

