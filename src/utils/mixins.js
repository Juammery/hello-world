import $ from "jquery";
import { setTimeout } from "timers";
// import {setPerfect} from '@/api/admin'

export default {
  data() {
    return {
      CurrentTheme: "我要开饭店", //当前 主题
      codeToBarCode: "",
      codeTwoQRCode: "",
      logisticsType: 1, //物流类型
      code: "",
      multipleSelection: [],
      showAddress: false,
      isPhone: true,
      idNumber: "",
      windowNo: "",
      backMsg: "",
      prolist: [], // 返回的所有数据
      proceed: "", //主题事项
      proceeds: "", //主题码
      themeName: "", //主题名
      rules: {}
    };
  },
  methods: {
    // 判断手机号码
    getPhone() {
      let fillForm = this.getSession("fillForm");
      fillForm.forEach(element => {
        if (element.child.length > 0) {
          element.child.forEach(element => {
            element.forEach(element => {
              if (element.synonymArray[0] == "委托代理人移动电话") {
                this.user.inputPhone = element.data;
              }
            });
          });
        }
      });
    },
    // 获取主题的事项码
    getTheme() {
      let themeId = this.getSession("themeId");
      getTheme(themeId).then(res => {
        if (res.data.code == 0) {
          this.themeName = res.data.data.themeName;
          this.setSession("themeName", this.themeName);
          // this.proceeds = res.data.data.themeName+','
          this.proceed = res.data.data.applyNo + ",";
        }
      });
    },
    // 获取事项码
    getProceeds() {
      let data = this.getSession("subject").concat(this.getSession("business"));
      // 获取材料中的id
      let Material = this.getSession("Material") || [];
      // 获取html
      let htmlList = this.getSession("htmlList");
      Material.forEach(element => {
        if (element.guideName != "通用材料") {
          this.proceeds += element.guideName + ",";
          this.proceed += element.applyNo + ",";
        }
      });
      htmlList.forEach(element => {
        this.proceeds += element.guideName + ",";
        this.proceed += element.applyNo + ",";
      });
    },
    // 不同的提示内容，显示
    getContent() {
      let steetType = this.getSession("streetType") || "3";
      let content = "";
      if (steetType == 1) {
        content = `<${this.CurrentTheme}>已提交审核,审核结果将以短信方式告知。请打印2份收件凭证，打印完成后回到自助服务机首页选择左下角的“其他服务”，选择“我要放件”并凭收件码打开自助证照柜。请逐份放入事项申请表、1份收件凭证、办事材料后即可离开。`;
        // content = `<${this.CurrentTheme}>您的办件已创建！。请打印2份收件凭证，打印完成后回到自助服务机首页选择左下角的“其他服务”，选择“我要放件”并凭收件码打开自助证照柜。请逐份放入事项申请表、1份收件凭证、办事材料后即可离开。`;
      } else if (steetType == 2) {
        content = `<${this.CurrentTheme}>已提交审核,审核结果将以短信方式告知。请打印2份收件凭证，打印完成后前往受理站放置材料。选择左下角的“其他服务”，选择“我要放件”并凭收件码打开自助证照柜。请逐份放入事项申请表、1份收件凭证、办事材料后即可离开。`;
      } else {
        content = `<${this.CurrentTheme}>已提交审核,审核结果将以短信方式告知。请打印2份收件凭证，打印完成后前往自助证照柜扫描收件凭证左上角的条形码打开自助证照柜。请逐份放入事项申请表、1份收件凭证、办事材料后即可离开。`;
      }
      return content;
    },
    userPop(num) {
      let content1 = this.getContent();
      this.$popup({
        content: content1,
        num: String(num),
        click: () => {
          // 点击按钮事件
          setTimeout(() => {
            // 更换了打印方法
            // 需要判断是否是工作时间
            if (this.getSession("WorkTime")) {
              var docStr = $(`.file1`).html();
            } else {
              var docStr = $(`.file2`).html();
            }
            // document.body.innerHTML = ''
            window.document.write(docStr);
            var style = document.createElement("style");
            style.type = "text/css";
            // css
            style.innerHTML = this.pCss;
            style.id = "addStyle";
            document
              .getElementsByTagName("head")
              .item(0)
              .appendChild(style);
            // document.body.innerHTML = docStr
            window.print();
            // 重新加载页面，以刷新数据
            window.location.reload();
            // this.backZf();
          }, 500);
        }
      });
    },
    
  }
};
