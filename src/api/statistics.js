import axios from '@/axios/index.js'

export function getPage (current,size,time) {
    return axios({
      url: `/cbs/user_form_preliminary/getPage?page=${current}&limit=${size}&endDate=${time[1] || '' }&startDate=${time[0] || ''}`,
      method: 'get'
    })
  }

  export function getByTypeAndDate (time,type) {
    return axios({
      url: `/cbs/user_form_preliminary/getByTypeAndDate?date=${time}&type=${type}`,
      method: 'get'
    })
  }