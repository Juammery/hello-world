<template>
  <div style="page-break-after:always;">
    <div v-html="htmlString" class="get_html"></div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "app",
  props: {
    htmlString: {
      type: String,
      default: ""
    },
    numberIndex: {
      type: Number,
      default: 0
    },
    guideList: {
      type: Array,
      default: []
    }
  },
  components: {},
  data() {
    return {
      html: "",
      dialogVisible: false
    };
  },
  mounted() {},
  created() {
    let flag = 1;
    this.setSession("flag", flag);
    this.$nextTick(() => {
      // alert(1)
      // 002  委托人的身份证放在p里面——————————————————start——————————————————
      if (
        this.getSession("UserInfo") &&
        this.getSession("UserInfo").zwdtswUserType == "个人"
      ) {
        //如果是个人(委托代理人)，则需要张贴证件照正反面
        // let photo = "data:image/jpeg;base64,"+this.getSession('idImg') //证件照图片信息，base64格式
        let photo = this.getSession("agentIdentification"); //证件照图片信息，base64格式
        let canvas = document.createElement("canvas"); //
        let ctx = canvas.getContext("2d");
        var createNewCanvas = function(content, width, height) {
          var nCanvas = document.createElement("canvas");
          var nCtx = nCanvas.getContext("2d");
          nCanvas.width = width;
          nCanvas.height = height;
          nCtx.putImageData(content, 0, 0);
          return nCanvas.toDataURL("image/png");
        };
        let image = new Image();
        image.src = photo;
        image.onload = function() {
          let height = this.height;
          let width = this.width;
          canvas.height = height;
          canvas.width = width;
          ctx.drawImage(this, 0, 0, width, height);
          //正面证件照
          let clone_up = [
            { x: 0, y: 0 },
            { xx: width, yy: height * 0.5 }
          ];
          let w = clone_up[1].xx - clone_up[0].x;
          let h = clone_up[1].yy - clone_up[0].y;
          let cutImage = ctx.getImageData(clone_up[0].x, clone_up[0].y, w, h);
          let newImage_up = createNewCanvas(cutImage, w, h);
          //反面证件照
          let clone_down = [
            { x: 0, y: height * 0.5 },
            { xx: width, yy: height }
          ];
          w = clone_down[1].xx - clone_down[0].x;
          h = clone_down[1].yy - clone_down[0].y;
          cutImage = ctx.getImageData(clone_down[0].x, clone_down[0].y, w, h);
          let newImage_down = createNewCanvas(cutImage, w, h);
          $.each(
            $(".get_html")
              .find("textarea[name=002]")
              .parent(`p`),
            function(value) {
              $(this).html(
                "<img src='" +
                  newImage_up +
                  "'><img src='" +
                  newImage_down +
                  "'>"
              );
            }
          );
          // 委托代理人身份证
          $.each(
            $(".get_html")
              .find("textarea[name=002]")
              .parent("td"),
            function(value) {
              $(this).append(
                "<img src='" +
                  newImage_up +
                  "'><img src='" +
                  newImage_down +
                  "'>"
              );
            }
          );
        };
      }
      // 002  委托人的身份证放在p里面——————————————————end——————————————————
      // 所有input禁用 不需要用户填写 直接数据填充
      $(".get_html :input").attr("disabled", "disabled");
      let subjectList = this.filterChildren(this.getSession("subject"));
      let businessList = this.filterChildren(this.getSession("business"));
      let alldata = subjectList.concat(businessList);
      // 三页的数据放在一块 一次搞定
      let data = {
        subject: alldata,
        // business: this.getSession('business'),
        fillForm: this.getSession("fillForm")
      };
      // 分别将对应的3张表单的数据全部填充上去
      // 数据元填写表单的数据
      for (var i in data) {
        if (Array.isArray(data[i]) && data[i].length > 0) {
          data[i].forEach(res => {
            // 如果是普通的数据元 都有materialId
            if (res) {
              if (res.materialId) {
                this.fill(res, res.id);
              }
              // 可能是绑定数据元的父判断和子判断
              if (res.records) {
                this.fill(res, res.records[res.records.length - 1]);
              }
              // 组合形式
              if (res.child instanceof Array && res.child.length !== 0) {
                if (res.combination) {
                  res.child.forEach((element, index) => {
                    element.forEach(child => {
                      $.each(
                        $(`.r${this.numberIndex} .get_html table`)
                          .find(`textarea[name=${child.id}]`)
                          .parent("td"),
                        function(indexs, value) {
                          if (index === indexs) {
                            $(this).html(`${$(this).html()}${child.data}`);
                          }
                          if (
                            index === indexs &&
                            child.type == 6 &&
                            child.dataArray.length !== 0
                          ) {
                            $(this).html(
                              `${child.dataArray[0]} - ${
                                child.dataArray[child.dataArray.length - 1]
                              }`
                            );
                          }
                        }
                      );
                    });
                  });
                } else {
                  res.child[0].forEach((element, index) => {
                    this.fill(element, element.id);
                  });
                }
              }
            }
          });
        }
      }
      // 强制分頁
      $(`.r${this.numberIndex} .get_html`).html(
        $(`.r${this.numberIndex} .get_html`)
          .html()
          .replace(
            /这里是分页！/gi,
            "<div style='page-break-before:always'></div>"
          )
      );
      // 默认003获取事项名称
      if (this.getSession("flag") == 1) {
        let _this = this;
        $.each($(".get_html").find('input[name=003][type="text"]'), function(
          value
        ) {
          let data = "";
          _this.guideList.forEach((element, index) => {
            if (_this.guideList.length == 1) {
              data = `${element}`;
            } else if (index === _this.guideList.length - 1) {
              data = `${data}、${element}`;
            } else {
              data = `${data}${data ? "、" : ""}${element}`;
            }
          });
          $(this).before(data);
          $(this).attr("style", "display:none");
        });
        flag++;
        this.setSession("flag", flag);
        // alert(3)
      }
    });
  },
  methods: {
    // 递归数组
    filterIndex(origin, list) {
      if (Array.isArray(list) && list.length > 0) {
        list.forEach(e => {
          if (e.children.length > 0) {
            this.filterIndex(origin, e.children);
          }
          if (e.data || e.dataArray.length > 0) {
            origin.push(e);
          }
        });
      }
    },
    // 将children 拆开
    filterChildren(jsonList) {
      let list = JSON.parse(JSON.stringify(jsonList));
      if (Array.isArray(list)) {
        list.forEach(e => {
          this.filterIndex(list, e.children);
        });
      }
      return list;
    },
    // 提交
    submit() {},
    // 确定
    sure() {
      // console.log(111)
    },
    // 进行填充
    fill(res, id) {
      let _this = this;
      if (id == 634) {
      }
      // 表格内的数据直接填充就行 考虑多个情况需要进行遍历
      $.each(
        $(".get_html table")
          .find(`textarea[name=${id}]`)
          .parent("td"),
        function(index, value) {
          if (res.dataArray instanceof Array && res.dataArray.length !== 0) {
            $(this).html(`${res.dataArray[res.dataArray.length - 1]}`);
            // 时间放一起的情况
            if (res.choiceType === 6 || res.type == 6) {
              $(this).html(
                `${res.dataArray[0]} - ${
                  res.dataArray[res.dataArray.length - 1]
                }`
              );
            }
            // 2级联动分开
            if (res.choiceType === 13) {
              $(this).html(`${res.dataArray[index]}`);
            }
          } else {
            $(this).html(`${$(this).text()} ${res.data}`);
          }
        }
      );
      $.each(
        $(".get_html table")
          .find(`textarea[name=${id}]`)
          .parent("span"),
        function(index, value) {
          $(this).html(`${$(this).text()} ${res.data}`);
        }
      );
      // 表格文本框需要进行判断是单个还是其他单选多选情况下
      $.each($(".get_html").find(`input[name=${id}][type="text"]`), function() {
        $(this).attr("value", res.data);
      });

      $.each($(".get_html").find(`input[name=${id}][type="text"]`), function(
        index,
        value
      ) {
        // 这个input为多选和单选情况下的
        if (res.choiceType == 1 || res.choiceType == 2) {
          // 如果是单选或者多选 则需要便利2层 找到选项值和选项名称
          res.choice.forEach(choice => {
            // 找到name相同的选项
            if (choice.name == $(this).attr("orgdata")) {
              // 循环选项下面的数组 找到对应的input
              if (choice.child) {
                choice.child.forEach(child => {
                  if (
                    child.name == $(this).attr("orgcount") ||
                    (child.name == "" && !$(this).attr("orgcount"))
                  ) {
                    $(this).attr("value", child.data);
                  }
                });
              }
            }
          });
        } else {
          // type為1和2時 不会有有input的 所以不考虑1和2 只有13的时候会有时间段需要填写
          if (res.dataArray instanceof Array && res.dataArray.length !== 0) {
            if (index === 0 || index % 2 == 0) {
              $(this).attr("value", `${res.dataArray[0]}`);
            } else {
              $(this).attr("value", `${res.dataArray[1]}`);
            }
            res.dataArray.forEach(item => {
              if (res.itemChoices && res.itemChoices.length > 0) {
                res.itemChoices.forEach(choice => {
                  if (choice.name == item) {
                    choice.child.forEach(child => {
                      // $(this).attr('value',item.child[0].data)
                      if (child.name) {
                        $(".get_html table")
                          .find(
                            `input[name=${res.id}][type="text"][orgdata=${item}][orgcount=${child.name}]`
                          )
                          .attr("value", child.data);
                      } else {
                        $(".get_html table")
                          .find(
                            `input[name=${res.id}][type="text"][orgdata=${item}]`
                          )
                          .attr("value", child.data);
                      }
                    });
                  }
                });
              }
            });
          } else {
            if (res.itemChoices && res.itemChoices.length > 0) {
              res.itemChoices.forEach(item => {
                if (item.name == res.data) {
                  if (item.child && item.child.length > 0) {
                    $(".get_html table")
                      .find(
                        `input[name=${res.id}][type="text"][orgdata=${item.name}]`
                      )
                      .attr("value", item.child[0].data);
                  }
                }
              });
            } else {
              $(this).attr("value", res.data);
            }
          }
        }
      });

      // 多选框的数据 由于插件的name是在外层的span 所以先找上一层再找下一层 再去考虑多个情况进行循环
      // 名字相同则给他打钩
      $.each(
        $(".get_html")
          .find('input[type="checkbox"]')
          .parent(`span[name=${id}]`),
        function(value) {
          $.each($(this).children(), function(val) {
            if (res.type === 2 || res.choiceType == 2) {
              if (res["dataArray"].indexOf($(this).val()) !== -1) {
                $(this).attr("checked", "checked");
              }
            } else {
              if (res["data"] == $(this).val()) {
                $(this).attr("checked", "checked");
              }
            }
            if (
              res.titleData instanceof Array &&
              res.titleData.length !== 0 &&
              res.titleData.indexOf($(this).val()) !== -1
            ) {
              $(this).attr("checked", "checked");
            }
          });
        }
      );
      //-------------------------------------
      $.each(
        $(".get_html")
          .find('input[type="checkbox"]')
          .parent(`span[name=${id}]`),
        function(value) {
          $.each($(this).children(), function(val) {
            if (res.type === 2) {
              if (res["dataArray"].indexOf($(this).val()) !== -1) {
                $(this).attr("checked", "checked");
              }
            }
          });
        }
      );

      //-------------------------------------
      // 获取时间
      let date = this.getdate();
      // 默认001为时间
      $.each($(".get_html").find('input[name=001][type="text"]'), function(
        value
      ) {
        $(this).attr("value", date);
        // $(this).attr('value','2020-08-24')
      });
      $.each($(".get_html").find(`input[name=${id}][type="text"]`), function(
        item,
        index
      ) {
        if (res.itemChoices && res.itemChoices.length > 0) {
          res.itemChoices.forEach(choice => {
            if (choice.name == res.data) {
              choice.child.forEach(child => {
                if (child.choiceName == res.data) {
                  if ($(this).attr("orgdata") == child.choiceName) {
                    $(this).attr("value", child.data);
                  }
                }
              });
            }
          });
        }
        //时间段
        else if (res.type == 6 && res.dataArray.length > 0) {
          $(this).attr("value", res.dataArray[index]);
        } else {
          $(this).attr("value", res.data);
        }
      });
      $.each($(".get_html").find(`input[name=${id}][type="text"]`), function(
        item,
        index
      ) {
        //时间段
        if (res.type == 6 && res.dataArray.length > 0) {
          if (
            $(".get_html").find(`input[name=${id}][type="text"]`).length == 1
          ) {
            $(this).attr(
              "value",
              res.dataArray[0] + "-" + res.dataArray[res.dataArray.length - 1]
            );
          }
        }
      });
      $(`input[name=${id}][type="text"]`).each(function(index, value) {
        let len = $(this).attr("value").length;
        $(this)
          .css("width", len + 2 + "em")
          .css("text-align", "center");
      });
    },
    // 获取日期
    getdate() {
      var d = new Date();
      var year = d.getFullYear();
      var month =
        d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
      var date = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
      var tempDate = year + "年" + month + "月" + date + "日";
      return tempDate;
    }
  }
};
</script>
<style lang="scss">
#edui1_elementpath {
  display: none !important;
}
#edui1_elementpath > div {
  display: none !important;
}
.edui-notadd .edui-editor-breadcrumb {
  display: none !important;
}
.get_html {
  padding-top: 10px;
  input[type="checkbox"]:disabled {
    position: relative;
  }
  p {
    line-height: 15px !important;
  }
  input[type="checkbox"]:disabled::before {
    content: "";
    position: absolute;
    top: 0;
    left: -1px;
    width: 11px;
    height: 11px;
    line-height: 15px;
    border: 1px solid #ccc;
    text-align: center;
    color: white;
    font-size: 15px;
    background-color: white;
    border-radius: 4px;
  }
  input[type="checkbox"]:checked:disabled::before {
    content: "✔";
    position: absolute;
    top: 0;
    left: -1px;
    width: 11px;
    height: 11px;
    line-height: 15px;
    border: 1px solid #ccc;
    text-align: center;
    color: black;
    font-size: 15px;
    background-color: white;
    border-radius: 4px;
  }
  table {
    margin: 0 auto;
    border-collapse: collapse;
  }
  textarea {
    display: none;
  }
  input {
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    color: #606266;
    letter-spacing: 1px;
  }
  input:disabled {
    background-color: white;
  }
  td {
    border: 1px solid #999;
  }
  // input[type='checkbox']{
  //     width: 15px;
  //     height: 15px;
  //     background-color: #fff;
  //     -webkit-appearance: none;
  //     border: 1px solid #c9c9c9;
  //     border-radius: 2px;
  //     outline: none;
  // }
  // input[type=checkbox]:checked{
  //     background-color: black;
  //     border: 1px solid black;
  //     // background: url("../images/checkbox_icon.png")no-repeat center;
  // }
}
.el-dialog__body {
  padding: 10px 5px;
}
</style>
<style media="print" lang="scss">
.get_html {
  table {
    margin: 0 auto;
  }
  textarea {
    display: none;
  }
  input {
    border: none;
    border-bottom: 1px solid #ccc;
  }
  input:disabled {
    background-color: white;
  }
}
</style>
