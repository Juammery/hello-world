import axios from "@/axios/index.js";

export function getMatterReviewPage() {
  return axios({
    url: "/cbs/theme/getAllPostedScene",
    method: "get"
  });
}

export function getActiveUserId() {
  return axios({
    url: "/cbs/getActiveUserId",
    method: "get"
  });
}
// export function getIndex (params) {
//     return axios({
//       // url: '/cbs/index',
//       url: '/cbs/YST/getUserInfo',
//       method: 'post',
//       params:params
//     })
// }
export function getIndex(access_token) {
  return axios({
    // url: '/cbs/index',
    url: "/cbs/YST/getUserInfo/" + access_token,
    method: "post"
    // params:params
  });
}
//通过一网通办登录后，根据一网通办用户Id获取证照
export function getCertThumbnailByUserId(params) {
  return axios({
    // url: '/cbs/index',
    url: "/cbs/msh_user_form/getCertThumbnailByUserId",
    method: "get",
    params: params
  });
}
//通过一网通办登录后，根据一网通办用户Id获取用户信息
export function getYWTBUserInfo(userId) {
  return axios({
    url: "/cbs/YWTB_User/getYWTBUserInfo/" + userId,
    method: "get"
  });
}
//通过一网通办登录后，根据一网通办用户Id获取照面信息
export function getCertOriginalDataByUserId(userId) {
  return axios({
    url: "/cbs/msh_user_form/getCertOriginalDataByUserId?userId=" + userId,
    method: "get"
  });
}

export function getAll_map() {
  return axios({
    url: `/admin/dict/list/THEME_TYPE`,
    method: "get"
  });
}

// 判断是否谁正常的上班时间
export function getWorkDay(terminalCode) {
  return axios({
    url: `/cbs/theme/getWorkDayByTerminalCode?terminalCode=${terminalCode}`,
    method: "get"
  });
}
