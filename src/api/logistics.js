import axios from '@/axios/index.js'
// 获取主题的码
export function getTheme (id) {
    return axios({
        url: `/cbs/theme/getWCodeById/${id}`,
        method: 'get',
    })
}
export function standardItem (data) {
    return axios({
        url: `/cbs/standard_item/standardItemMappingFiled`,
        method: 'post',
        data: data
    })
}
