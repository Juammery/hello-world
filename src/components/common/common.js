import Vue from "vue";

// localStorage存储数据
Vue.prototype.getData = function (name) {
  try {
    return JSON.parse(localStorage.getItem(name));
  } catch (err) {
    return localStorage.getItem(name);
  }
};
Vue.prototype.setData = function (name, value) {
  if (name) {
    if (typeof value === "string") {
      localStorage.setItem(name, value);
    } else {
      localStorage.setItem(name, JSON.stringify(value));
    }
  }
};
function getSession(name) {
  try {
    return JSON.parse(sessionStorage.getItem(name));
  } catch (err) {
    return sessionStorage.getItem(name);
  }
};
// Session存储数据
Vue.prototype.getSession = getSession
function setSession(name, value) {
  // sessionStorage
  if (name) {
    if (typeof value === "string") {
      sessionStorage.setItem(name, value);
    } else {
      sessionStorage.setItem(name, JSON.stringify(value));
    }
  }
};
Vue.prototype.setSession = setSession
export default {
  getSession: getSession,
  setSession: setSession
};

// 递归数组
function filterIndex(origin, list) {
  if (list.length > 0) {
    list.forEach(e => {
      if (e.children.length > 0) {
        filterIndex(origin, e.children);
      }
      if (e.data || e.dataArray.length > 0) {
        origin.push(e);
      }
    });
  }
}
// 将children 拆开
function filterChildren(data) {
  let list = JSON.parse(JSON.stringify(data));
  list.forEach(e => {
    filterIndex(list, e.children);
  });
  return list;
}


// 获取主体业态和经营项目
Vue.prototype.getSubject = function (name) {
  let string = "";
  let data = filterChildren(Vue.prototype.getSession(name)) || [];
  data.forEach(element => {
    // 判断是否为数组
    if (
      !element.data &&
      element.dataArray instanceof Array &&
      element.dataArray.length !== 0
    ) {
      element.dataArray.forEach(str => {
        string = string + str + "； ";
      });
    } else {
      string = string + (!element.data ? "" : element.data + "；");
    }
  });
  return string || "无";
};


/**
 * 更新后的超级获取器
 * @param {}} name 
 * @returns 
 */
Vue.prototype.getSubjectSuper = function (name) {
  let data = filterChildren(Vue.prototype.getSession(name)) || [];
  let arr = data.map(el => ({ name: el.name, data: el.dataArray.join(',') + el.data }));
  return arr;
};


