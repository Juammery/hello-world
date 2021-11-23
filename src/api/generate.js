import axios from "@/axios/index.js";
export function getHtml(id, data) {
  return axios({
    url: `/cbs/material/getNeededMaterial?themeId=${id}`,
    method: "post",
    data: data
  });
}
// 获取材料清单页面是否要有上传的按钮的字典项
export function getISUPLOADMap() {
  return axios({
    url: `/admin/dict/list/IS_UPLOAD`,
    method: "get"
  });
}
export function getAttention(id, data) {
  return axios({
    url: `/cbs/material/getAllForm?themeId=${id}`,
    method: "post",
    data: data
  });
}
// c创建办件
export function createdHtml(data) {
  return axios({
    url: `/cbs/msh_user_form/create`,
    method: "post",
    data: data
  });
}

export function getInfoHtml(id) {
  return axios({
    url: `/cbs/user_form_preliminary/getDetailByCode?code=${id}`,
    method: "get"
  });
}
//  2.0获取申请表
export function getApplicationForm(id, data) {
  return axios({
    url: `/cbs/material/getApplicationForm?themeId=${id}`,
    method: "post",
    data: data
  });
}
// 2.0获取材料
export function getBillOfMaterial(id, data) {
  return axios({
    url: `/cbs/material/getBillOfMaterial?themeId=${id}`,
    method: "post",
    data: data
  });
}
// 填写材料

export function getByMaterialIdAndChoice(themeId, guideId, id, data) {
  return axios({
    url: `/cbs/paragraph/getByMaterialIdAndChoice?materialId=${id}&themeId=${themeId}&guideId=${guideId}`,
    method: "post",
    data: data
  });
}
// 保存材料的接口

export function saveParagraph(data) {
  return axios({
    url: `/cbs/user_form_paragraph/save`,
    method: "post",
    data: data
  });
}
// 查看html
export function getFormDetail(id) {
  return axios({
    url: `/cbs/user_form_paragraph/getFormDetail/${id}`,
    method: "get"
  });
}

export function createDraft(data) {
  return axios({
    url: `/cbs/user_form_draft/create`,
    method: "post",
    data: data
  });
}
//上传材料（申请人自备）
// export function uploadMaterialFile (obj) {
//   return axios({
//     url: `/cbs/msh_user_material/uploadMaterialFile`,
//     method: 'post',
//     // Headers: requestConfig,
//     data: obj
//   })
// }
export function uploadMaterialFile(fileFormData) {
  // ,requestConfig
  return axios({
    url: `/cbs/msh_user_material/uploadMaterialFile`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: fileFormData
    // processData: false,
    // contentType: false,
  });
}
