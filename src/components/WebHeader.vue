<template>
  <div class="main">
    <iframe
      class="customHeader_iframe"
      scrolling="no"
      src="http://zwdt.sh.gov.cn/zwdtSW/dphead/head/head.jsp?name=SH00XH"
    ></iframe>
    <!-- 头部框 -->

    <div
      class="page-header"
      style="vertical-align:middle;text-align:left"
      v-if="$route.path != '/' && $route.path != '/admin'"
    >
      <div @click="beBack" class="logo">
        <img src="../assets/img/logo.png" alt="" />
      </div>

      <!--        <div class="home fr" @click="handerAdmin" v-if="$route.path === '/' && !getSession('code')">-->
      <div class="home fr" @click="handerAdmin" v-if="$route.path === '/'">
        <img src="../assets/img/admin.png" alt="" />
        <span class="code">个人中心</span>
      </div>
      <!-- <div class="home fr" @click="handerAdmin">
          <img src="../assets/img/admin.png" alt="">
        </div>  -->
    </div>
  </div>
</template>

<script>
import { getInfoHtml } from "@/api/generate";
import { backZf } from "@/assets/backZF.js";
export default {
  name: "WebHeader",
  data() {
    return {};
  },
  methods: {
    beBack() {
      this.$router.push({ path: "/" });
      // if (this.getSession("terminalCode")) {
      //   backZf();
      // } else {
      //   this.$router.push({ path: "/" });
      // }
    },
    handleHome() {
      this.$msgBox
        .showMsgBox({
          content: "请填写预办件码",
          isShowInput: true,
          inputType: 1,
          msgType: 1
        })
        .then(async value => {
          getInfoHtml(value).then(res => {
            if (!res.data.code) {
              this.setSession("code", value);
              this.setSession("themeId", res.data.data.themeId);
              this.setSession("subject", res.data.data.formDetail.subject);
              this.setSession("business", res.data.data.formDetail.business);
              this.setSession("fillForm", res.data.data.formDetail.fillForm);
              this.$router.push("/fillForm");
            }
          });
        })
        .catch(() => {});
    },
    handerAdmin() {
      if (!this.getSession("UserInfo")) {
        window.location.replace(
          "https://zwdtuser.sh.gov.cn/uc/naturalUser/jump.do?redirect_uri=http%3A%2F%2F180.169.38.13%2F%2FYWTB%2Flogin"
        );
      } else {
        this.$router.push({
          path: "/admin"
        });
      }
    }
  }
};
</script>

<style>
.home-page {
  width: 100%;
  min-width: 1200px;
}
.page-header {
  width: 100%;
  /*background-color: #07173b;*/
  /* height: 100px; */
  /*background-image: url("../assets/img/headbg.png");*/
  background-size: 100% 100%;
  position: relative;
}
.page-header img {
  height: 50px;
  margin-top: 10px;
  cursor: pointer;
}
/* .page-bg{
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/bg3.png");
  background-size: 100%;
  background-repeat: no-repeat
} */
.header-size {
  margin-left: 10px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}
.page-container {
  width: 100%;
}
.page-container .el-input__inner {
  background: transparent;
  border: none;
  color: #fff;
}
.page-container .el-input {
  color: #fff;
}
.page-container .el-button {
  background: transparent;
  border: none;
}
.header-search {
  width: 600px;
  margin: 0 auto;
}
.page-header .logo img {
  position: absolute;
  top: 10px;
  left: 20px;
  margin-top: 0px;
  height: 80px;
}
.page-header .home img {
  position: absolute;
  top: 15px;
  right: 180px;
  margin-top: 0px;
  height: 50px;
}
.page-header .home .code {
  position: absolute;
  top: 2px;
  right: 80px;
  margin-top: 0px;
  height: 70px;
  line-height: 80px;
  color: white;
  font-size: 20px;
}
.customHeader_iframe {
  border: none;
  width: 100%;
  height: 140px;
  display: block;
  overflow: hidden;
}
.common-content {
  width: 1190px;
  margin: 0 auto;
}
</style>
