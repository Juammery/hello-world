<template>
  <div
    style="color: black;font-weight:300;font-family: 宋体, SimSun;page-break-after:always;font-size:15px;line-height : 22px;"
  >
    <div
      v-html="htmlString"
      class="get_html"
      style="opacity:0;height:0px;overflow:hidden"
    ></div>
    <editor v-model="content" :disabled="isDisabled" v-if="showEditor" />
    <!-- style="opacity:0;height:0px;overflow:hidden" -->
  </div>
</template>
<script>
import editor from "@/components/editor";
import $ from "jquery";
export default {
  name: "app",
  components: {
    editor
  },
  props: {
    htmlString: {
      type: String,
      default: ""
    },
    guideList: {
      type: Array,
      default: []
    },
    guideName: {
      type: String,
      default: ""
    },
    downOriginNum: {
      type: Number,
      default: 1
    },
    dialogTitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showEditor: false,
      html: "",
      dialogVisible: false,
      content: ""
    };
  },
  watch: {
    content(newValue) {
      this.$emit("input", newValue);
    }
  },
  computed: {
    isDisabled: {
      get: function() {
        if (this.dialogTitle == "填报") {
          return false;
        } else {
          return true;
        }
      }
    }
    // content: {
    //   // getter
    //   get: function () {
    //     return this.htmlString || ''
    //   },
    //   // setter
    //   set: function (newValue) {
    //     this.$emit('input', newValue)
    //   },
    // },
  },
  created() {
    let flag = 1;
    this.setSession("flag", flag);
    this.$nextTick(() => {
      if (this.downOriginNum == 1) {
        this.autoFill(flag);
      }
    });
  },
  mounted() {},
  methods: {
    // 自动填充
    autoFill(flag) {
      // 三页的数据放在一块 一次搞定
      let data = {
        subject: this.getSession("subject"),
        business: this.getSession("business"),
        fillForm: this.getSession("fillForm")
      };
      // 分别将对应的3张表单的数据全部填充上去
      // 数据元填写表单的数据
      let date = this.getdate();
      for (var i in data) {
        if (Array.isArray(data[i]) && data[i].length > 0) {
          data[i].forEach(res => {
            // 如果是普通的数据元 都有materialId
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
                      $(`.r0 .get_html`).find(
                        `input[name=${child.id}][type="text"]`
                      ),
                      function(indexs, value) {
                        if (index === indexs) {
                          $(this).attr("value", child.data);
                          // $(this).html(`${ $(this).html() }${ child.data }`)
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
          });
        } else {
          this.$set(this, "content", $(".get_html").html());
          $.each($(".get_html").find("input[name=001]"), function(value) {
            $(this).attr("value", date);
          });
          $.each($(".get_html").find(".addMargin"), function(value) {
            $(this)
              .next()
              .attr("style", "margin-left:30px");
          });
          $.each($(".get_html").find(".addMargin1"), function(value) {
            $(this)
              .next()
              .attr("style", "margin-left:42px");
          });
          // this.content =  $('.get_html').html()
          this.showEditor = true;
        }
      }

      // 默认003获取事项名称
      if (this.getSession("flag") == 1) {
        let _this = this;
        $.each(
          $(".meterial_html").find('input[name=003][type="text"]'),
          function(value) {
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
          }
        );
        flag++;
        this.setSession("flag", flag);
        // alert(3)
      }
    },
    fillMeterial(res, id) {
      $.each(
        $(".meterial_html").find(`input[name=${id}][type="text"]`),
        function(index, value) {
          $(this).attr("value", res.value);
        }
      );
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
      // 表格内的数据直接填充就行 考虑多个情况需要进行遍历
      $.each(
        $(".get_html table")
          .find(`textarea[name=${id}]`)
          .parent("td"),
        function(index, value) {
          if (res.dataArray instanceof Array && res.dataArray.length !== 0) {
            $(this).html(`${res.dataArray[res.dataArray.length - 1]}`);
            // 时间放一起的情况
            if (res.type === 6) {
              $(this).html(
                `${res.dataArray[0]} - ${
                  res.dataArray[res.dataArray.length - 1]
                }`
              );
            }
            // 2级联动分开
            if (res.type === 13) {
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
      $.each($(".get_html").find(`input[name=${id}][type="text"]`), function(
        index,
        value
      ) {
        // 这个input为多选和单选情况下的
        if (res.type == 1 || res.type == 2) {
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
            } else {
              // if(choice.child) {
              //     $(this).attr('value',res.data)
              // }
              //  $(this).attr('value',child.data)
              // res 为数据元  value为填充的地方
              //
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
          } else {
            $(this).attr("value", res.data);
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
            if (res.type === 2) {
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
      // 获取时间
      let date = this.getdate();
      // 默认001为时间
      $.each($(".get_html").find("input[name=001]"), function(value) {
        $(this).attr("value", date);
      });
      $.each($(".get_html").find(".addMargin"), function(value) {
        $(this)
          .next()
          .attr("style", "margin-left:30px");
      });
      $.each($(".get_html").find(".addMargin1"), function(value) {
        $(this)
          .next()
          .attr("style", "margin-left:42px");
      });

      this.$set(this, "content", $(".get_html").html());
      // this.content =  $('.get_html').html()
      this.showEditor = true;
      $(`input[name=${id}][type="text"]`).each(function(index, value) {
        let len = $(this).attr("value").length;
          // .css("max-width", "30em")
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
.meterialTitle {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}
.get_html {
  input[type="checkbox"]:disabled {
    position: relative;
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
