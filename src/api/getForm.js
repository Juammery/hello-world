import axios from '@/axios/index.js'
export function getForm (id,data) {
  return axios({
    url: `/cbs/standard_item/getThirdPageItems?themeId=${ id }`,
    method: 'post',
    data: data
  })
}
export function getdescirpt (id) {
  return axios({
    url: `/cbs/theme/getAttentionById/${ id }`,
    method: 'get'
  })
}
// 三页接口  v-2.0
export function getFormFill (id,data) {
  return axios({
    url: `/cbs/standard_item/getFormFill?themeId=${ id }`,
    method: 'post',
    data: data
  })
}