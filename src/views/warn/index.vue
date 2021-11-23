/* eslint-disable prettier/prettier */
<template>
  <div class="warn three-content subject" v-show="isPresent">
    <div style="position:relative;" class="themeName-box">
      <div class="themeName">{{ getSession("themeName") }}指南指引</div>
    </div>
    <div class="scorll_content">
      <div v-html="descriptHtml" class="htmlStyle"></div>
    </div>
    <div class="confirm_buttom">
      <el-button
        type="warning"
        round
        v-if="showButton"
        class="confirm_button"
        @click="goNext"
      >我已阅读并知晓</el-button>
      <el-button type="info" round v-else>我已阅读并知晓({{ time }}s)</el-button>
    </div>
  </div>
</template>

<script>
import { getdescirpt } from "@/api/getForm";
export default {
  data() {
    return {
      descriptHtml: "",
      time: 5,
      showButton: false,
      isPresent: false //是否有阅读须知
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    setTime() {
      let time = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else {
          this.showButton = true;
          clearInterval(time);
        }
      }, 1000);
    },
    init() {
      // 获取详细注意事项
      const loading = this.$loading({
        lock: true,
        text: "正在加载",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      getdescirpt(this.getSession("themeId")).then(res => {
        loading.close();
        if (res.data.data) {
          this.isPresent = true;
          this.descriptHtml = res.data.data;
          this.setTime();
        } else {
          this.$router.push("/subject");
        }
      });
    },
    goNext() {
      this.$router.push("/subject");
    }
  }
};
</script>
<style>
.warn table {
  margin: 0 auto !important;
}
</style>
<style scoped lang="scss">
.three-content {
  // min-height: 620px;
  // background: rgba($color: #e4e9ef, $alpha: 0.65);
  position: relative;
}
.scorll_content {
  // margin-top: 30px;
  // margin-left: 0px;
  // background-color: #fff;
  /*height: 500px;*/
  margin-top: 20px;
  box-sizing: border-box;
  padding: 20px;
}
.confirm_buttom {
  text-align: center;
}
.confirm_button {
  background-color: #cbb486;
  color: white;
}
</style>
