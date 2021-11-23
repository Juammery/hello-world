/* eslint-disable prettier/prettier */ /* eslint-disable prettier/prettier */
<template>
  <div id="app">
    <WebHeader />
    <router-view />
  </div>
</template>
<script>
import WebHeader from "./components/WebHeader";
// import getIndex from '@/api/index.js'
// import axios from 'axios'
import {
  getCertThumbnailByUserId,
  getYWTBUserInfo,
  getCertOriginalDataByUserId
} from "@/api/index.js";

export default {
  mounted() {
    let userId = this.getUrlParam("userId");
    // let userId = "001";
    let terminalCode = this.getUrlParam("terminalCode");
    let themeId = this.getUrlParam("themeId");
    if (userId) {
      this.setSession("userId", userId);
    }
    if (terminalCode) {
      //跳转时带入的机器号
      this.setSession("terminalCode", terminalCode);
    }
    if (themeId) {
      //登录时带入的主题id
      this.setSession("_themeId", themeId);
    }
    if (userId == "001") {
      //默认用户
      let userInfo = {
        zwdtswUserType: "个人",
        zwdtswName: "申请人",
        zwdtswLinkPhone: "13217051910",
        phone: "15216635232",
        zwdtswCertId: "001",
        userId: "001"
      };
      this.setSession("UserInfo", JSON.stringify(userInfo));
    } else {
      //根据用户id获取用户（委托代理人/法人）信息
      getYWTBUserInfo(userId).then(res => {
        if (res.data.data) {
          // zwdtswUserId 用户id
          //————————————————————————————————————法人——————————————————————————————————
          // registerSource 法人注册方式	注册方式（ukey：USBKYE登录，etl:电子营业执照登录）
          // zwdtswLawPerson 公司名称
          // zwdtswOrgCode 组织机构代码
          // zwdtswCommerceCode 工商营业执照号
          // zwdtswTaxCode 税务登记号
          // zwdtswLinkPerson  联系人姓名
          // zwdtswLinkMobile 联系人移动电话
          // zwdtswCaCode 一证通编码
          // zwdtswCreditCode 社会信用代码
          // zwdtswSiId 社会保险号
          // zwdtswGjjId 住房公积金号
          // zwdtswSyfrCode 事业单位法人编码
          // zwdtswShfrCode 社会组织法人编码
          // zwdtswZffrCode 政府机关法人编码
          // zwdtswCertSn 证书序列号
          // zwdtswCertificate 公钥证书	大字段
          // LicenceSn 电照的SN，后续的所有和移动端的交换都需要该字段
          //————————————————————————————————————个人——————————————————————————————————
          // zwdtswName 用户姓名	初级及实名以上用户有值
          // zwdtswAccount 用户名
          // zwdtswCertId 身份证号 初级及实名以上用户有值
          // zwdtswCertType 证件类型	身份证、中国护照、普护照、台湾居民通行证、港澳通行证等
          // zwdtswLinkPhone 手机号码
          // zwdtswLinkAddress 家庭住址
          // zwdtswZipCode 邮政编码
          // citizenship 国籍	默认为中国
          this.setSession("UserInfo", JSON.stringify(res.data.data));
          //根据用户id获取证照库信息
          getCertThumbnailByUserId({ userId: userId }).then(res => {
            let agentIdentification =
              "data:image/jpeg;base64," + JSON.parse(res.data.data).file;
            this.setSession(
              "agentIdentificationImg",
              JSON.parse(res.data.data).file
            ); //委托代理人身份证正反面或法人营业执照图片信息
            this.setSession("agentIdentification", agentIdentification); //委托代理人身份证正反面或法人营业执照图片信息
          });
          if (this.getSession("UserInfo").zwdtswUserType == "法人") {
            getCertOriginalDataByUserId(userId).then(res => {
              if (res.data.code == 0) {
                let result = JSON.parse(res.data.data);
                // 存储营业执照的信息
                this.setSession("CertThumbnailImgInfo", result);
              }
            });
          }
        }
      });
    }

    //如果直接访问地址，但是没有登录，则跳转至登录页面
    // if (
    //   (window.location.href.indexOf("180.169.38.13") > -1 ||
    //     window.location.href.indexOf("31.0.6.82") > -1 ||
    //     window.location.href.indexOf("192.168.43.81") > -1) &&
    //   !this.getSession("userId")
    // ) {
    //   let redirectUrl =
    //     "https://zwdtuser.sh.gov.cn/uc/naturalUser/jump.do?redirect_uri=http%3A%2F%2F180.169.38.13%2F%2FYWTB%2Flogin";
    //   if (
    //     this.getUrlParam("terminalCode") &&
    //     window.location.href.indexOf("180.169.38.13") > -1
    //   ) {
    //     redirectUrl = redirectUrl.replace("180.169.38.13", "31.0.6.82");
    //   }
    //   window.location.replace(redirectUrl);
    // }
  },
  methods: {
    getUrlParam1() {
      var sHref = window.location.href;
      var args = sHref.split("?");
      if (args[0] == sHref) {
        return "";
      }
      var arr = args[1].split("&");
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        var arg = arr[i].split("=");
        obj[arg[0]] = arg[1];
      }
      return obj;
    },
    getUrlParam(name) {
      //获取url中的access_token参数
      //构造一个含有目标参数的正则表达式对象
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      //匹配目标参数
      var r = window.location.search.substr(1).match(reg);
      //返回参数
      if (r != null) {
        return unescape(r[2]);
      } else {
        return null;
      }
    }
  },
  components: {
    WebHeader
  }
};
</script>
<style lang="scss">
.required::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.el-form-item__label {
  position: relative;
  padding-right: 20px !important;
  .el-tooltip {
    position: absolute;
    // right: 12px;
    top: 12px;
  }
}
.el-form-item.is-required:not(.is-no-asterisk)
  .el-form-item__label-wrap
  > .el-form-item__label:before,
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  position: absolute;
  left: -10px;
}
</style>
