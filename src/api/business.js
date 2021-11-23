import axios from '@/axios/index.js'
// 获取第一步父判断
export function getBusiness (data) {
    return axios({
      url: '/cbs/theme_judge/getFrontSecondJudges',
      method: 'post',
      data: data
    })
}
// 获取第一步父判断 --- 2.0
export function getFrontSecondJudges (params,data) {
  return axios({
    url: '/cbs/matJudge/getFrontSecondJudges?themeId='+params,
    method: 'post',
    data: data
  })
}