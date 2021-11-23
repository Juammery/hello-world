import Vue from "vue";
import Router from "../../router";
let vm = new Vue();
export function skipContent(type, contents, promptContent) {
  let nowPath = Router.history.current.path;
  // 如果是第一种情况的话，跳转并且回到首页
  if (type == 1) {
    let warn = sliceContent(contents);
    vm.$popup({
      // content: warn.content,
      content: promptContent ? promptContent : warn.content,
      type: 4,
      click: () => {
        window.open(warn.jumpUrl);
        Router.push("/");
      }
    });
  } else if (type == 2) {
    vm.$popup({
      // content: contents,
      content: promptContent ? promptContent : contents,
      type: 4,
      click: () => {
        //
        Router.push("/");
      }
    });
  } else if (type == 3) {
    let warn = sliceContent(contents);
    vm.$popup({
      // content:warn.content,
      content: promptContent ? promptContent:warn.content,
      type: 4,
      click: () => {
        // 跳窗下一步
        window.open(warn.jumpUrl);
        if (nowPath == "/business") {
          Router.push("/fillform");
        } else {
          Router.push("/business");
        }
      }
    });
  } else {
    vm.$popup({
      // content: contents,
      content: promptContent ? promptContent : contents,
      type: 4,
      click: () => {
        // 点击按钮事件 回到首页
        if (nowPath == "/business") {
          Router.push("/fillform");
        } else {
          Router.push("/business");
        }
      }
    });
  }
}

// 截取字段，取出提示和跳转的网址
function sliceContent(contents) {
  // 分割符是^
  // 拿到下标
  let indexs = contents.indexOf("^");
  let warn = {};
  warn.content = contents.slice(0, indexs);
  warn.jumpUrl = contents.slice(indexs + 1);
  // console.log(warn,contents)
  return warn;
}
