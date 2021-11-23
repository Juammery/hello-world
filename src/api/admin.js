import axios from "@/axios/index.js";
// admin中心查询草稿
export function initAdmin(themeName, idCard, limit, page) {
  return axios({
    // url: `/cbs/user_form_draft/getPageByIdCard?idCard=${idCard}&limit=${limit}&page=${page}`,
    url: `/cbs/user_form_draft/draftPage?themeName=${themeName}&idCard=${idCard}&limit=${limit}&page=${page}`,
    method: "get"
  });
}
// 草稿删除
export function deleteDraft(draftId) {
  return axios({
    // url: `/cbs/user_form_draft/getPageByIdCard?idCard=${idCard}&limit=${limit}&page=${page}`,
    url: `cbs/user_form_draft/delete/`+draftId,
    method: "post"
  });
}
// 查询所有的办件
export function initProgress(themeName, idCard, limit, page) {
  return axios({
    // url: `/cbs/msh_user_form/getPersonByIdCard?themeName=&idCard=${idCard}&limit=${limit}&page=${page}`,
    url: `/cbs/msh_user_form/userFormPage?themeName=${themeName}&idCard=${idCard}&limit=${limit}&page=${page}`,
    method: "get"
  });
}
// 更改变价的状态
export function setPerfect(id) {
  return axios({
    url: `/cbs/user_form_draft/setPerfect?id=${id}`,
    method: "post"
  });
}
//修改手机号码
export function editYWTBPhone(userId, phone) {
  return axios({
    url: `/cbs/YWTB_User/editYWTBPhone?userId=${userId}&phone=${phone}`,
    method: "post"
  });
}
//查询交件方式为自助机交件的办件
export function getProgressStatus(code) {
  console.log("该办件的主题码是：", code);
  return axios({
    url: `/cbs/msh_user_form/queryStatus?code=${code}`,
    method: "post"
  });
}
