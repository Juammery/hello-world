<template>
  <transition name="fade">
    <!-- 蒙版 -->
    <!--    <div class="masks" v-if="show && type === 0" @touchmove.prevent>-->
    <div class="masks" v-if="show && type === 0" @touchmove.prevent>
      <!--        min-height:30%;-->
      <div
        class="windows"
        style="background: #F2F2F2;background-size:cover;width:30%;transform: translate(-50%, -50%);margin:0px"
      >
        <span
          class="shadow"
          style="background: #cbb486;color: white;width: 132px;border-radius: 25px;height: 24px;display: flex;align-items: center;justify-content: center;"
          >收件凭证</span
        >
        <p style="line-height: 1.5rem;">
          您的办件已创建！<br />
          1. 您的办件编号是：<b>{{ num }}</b>
          <br />
          请打印2份收件凭证！
        </p>
        <p style="line-height: 1.5rem;">
          <!-- 您所申报的{{ content }}已提交预审,预审结果将以短信方式告知 -->
          2.请通过收件凭证左上方的条形码打开自助证照柜，放入一份收件凭证和办件材料后关闭柜门后便可离开，等待后续通知。
        </p>
        <button
          @click="btnClick"
          class="button"
          style="background-color:#cbb486;border-radius: 10px;"
        >
          打印凭证
        </button>
        <!-- <img
          @click="closeLoding"
          class="close"
          src="../../assets/img/orange-close.png"
          alt=""
        /> -->
      </div>
    </div>
    <!-- 蒙版 -->
    <div class="masks" v-if="show && type === 1" @touchmove.prevent>
      <div
        class="windows"
        style="background: url(img/look-bg.png) repeat center;background-size:cover;"
      >
        <span
          class="shadow"
          style="background: url(img/look-title.png) no-repeat center; background-size:cover;"
          >提示</span
        >
        <p class="type">您的"我要开饭店"主题申请成功</p>

        <button
          @click="btnClick"
          class="button"
          style="background:url(img/btn2.png) no-repeat center;background-size:cover;"
        >
          确定
        </button>
        <img
          @click="show = false"
          class="close"
          src="../../assets/img/orange-close.png"
          alt=""
        />
      </div>
    </div>
    <!--查看表格的详情 -->
    <div class="masks" v-if="show && type === 2" @touchmove.prevent>
      <div
        class="windows"
        style="background: url(img/look-bg.png) repeat center;background-size:cover;"
      >
        <span
          class="shadow"
          style="background: url(img/look-title.png) no-repeat center; background-size:cover;"
          >查看详情</span
        >
        <p>办事名称：{{ content }} 办事状态{{ num }}</p>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
        <img @click="show = false" class="close" src="img/close.png" alt="" />
      </div>
    </div>
    <!-- 蒙版 -->
    <div class="masks" v-if="show && type === 4" @touchmove.prevent>
      <!--        min-height:30%;-->
      <div
        class="windows"
        style="background: #F2F2F2;background-size:cover;width:44%;transform: translate(-50%, -50%);margin:0px"
      >
        <span
          class="shadow"
          style="background: #cbb486;color: white;width: 132px;border-radius: 25px;height: 24px;display: flex;align-items: center;justify-content: center;"
          >提示</span
        >
        <!--        <p style="color: #282828;">{{ content }}</p>-->
        <p
          style="color: #282828;width: 96% !important;margin: 1.2rem 20px 10px 20px !important;"
          v-html="content"
        ></p>
        <button
          @click="btnClick"
          class="button"
          style="background-color:#cbb486;border-radius: 10px;"
        >
          确认
        </button>
        <img
          @click="show = false"
          class="close"
          src="../../assets/img/orange-close.png"
          alt=""
        />
      </div>
    </div>
    <!-- 填报须知 -->
    <div class="masks" v-if="show && type === 5" @touchmove.prevent>
      <!--      <div class="windows" style="background: url(img/look-bg.png) repeat center;background-size:cover;width:1100px;left:45%;height:550px">-->
      <div
        class="windows"
        style="background: #F2F2F2;background-size:cover;height: 85%;"
      >
        <!--        <span class="shadow" style="background: url(img/look-title.png) no-repeat center; background-size:cover;">填报须知</span>-->
        <span
          class="shadow"
          style="background: #cbb486; background-size:cover;color: white !important;"
          >填报须知</span
        >
        <div
          v-html="content"
          style="height:76% !important;max-width: 96%;"
          class="scorll_content"
        ></div>
        <!--           <button @click="btnClick" class="buttons" style="background:url(img/btn2.png) no-repeat center;background-size:cover;">已阅读，并同意</button>-->
        <button
          @click="btnClick"
          class="buttons"
          :style="
            disable_btn
              ? 'background-color:#cbb486;'
              : 'background-color:#F3612B;bottom:15px;color:white !important;'
          "
        >
          已阅读，并同意
        </button>
        <img @click="btnCancle" class="close" src="img/close.png" alt="" />
      </div>
    </div>

    <div class="masks" v-if="show && type === 6" @touchmove.prevent>
      <!--        min-height:30%;-->
      <div
        class="windows"
        style="background: #F2F2F2;background-size:cover;width:30%;transform: translate(-50%, -50%);margin:0px"
      >
        <span
          class="shadow"
          style="background: #cbb486;color: white;width: 132px;border-radius: 25px;height: 24px;display: flex;align-items: center;justify-content: center;"
          >重要提示</span
        >
        <!--        <p style="color: #282828;">{{ content }}</p>-->
        <p style="color: #282828;">
          {{ content }}
        </p>
        <button
          @click="btnCancle"
          class="button"
          style="cursor:pointer;background-color:#cbb486;border-radius: 10px;margin-right: 4em;"
        >
          {{ leftText }}
        </button>
        <button
          @click="btnClick"
          class="button"
          style="cursor:pointer;background-color:#cbb486;border-radius: 10px;"
        >
          {{ rightText }}
        </button>
      </div>
    </div>
    <div class="masks" v-if="show && type === 8" @touchmove.prevent>
      <div
        class="windows"
        style="background: #F2F2F2;background-size:cover;width:44%;transform: translate(-50%, -50%);margin:0px"
      >
        <span
          class="shadow"
          style="background: #cbb486;color: white;width: 132px;border-radius: 25px;height: 24px;display: flex;align-items: center;justify-content: center;"
          >下载提示</span
        >
        <p
          style="color: #282828;width: 96% !important;margin: 10px 20px 10px 20px !important;"
          v-html="content"
        ></p>
        <h5 style="color:black;">请选择“另存为PDF”后，点击保存按钮进行下载</h5>
        <div style="text-align:center;">
          <img src="@/assets/img/downloadTip.png" style="width:80%;" />
        </div>
        <button
          @click="btnClick"
          class="button"
          style="background-color:#cbb486;border-radius: 10px;"
        >
          确定
        </button>
      </div>
    </div>
    <!-- 提示语，无取消 -->
    <div class="masks" v-if="show && type === 9" @touchmove.prevent>
      <!--        min-height:30%;-->
      <div
        class="windows"
        style="background: #F2F2F2;background-size:cover;width:44%;transform: translate(-50%, -50%);margin:0px"
      >
        <span
          class="shadow"
          style="background: #cbb486;color: white;width: 132px;border-radius: 25px;height: 24px;display: flex;align-items: center;justify-content: center;"
          >提示</span
        >
        <!--        <p style="color: #282828;">{{ content }}</p>-->
        <p
          style="color: #282828;width: 96% !important;margin: 1.2rem 20px 10px 20px !important;"
          v-html="content"
        ></p>
        <button
          @click="btnClick"
          class="button"
          style="background-color:#cbb486;border-radius: 10px;"
        >
          确认
        </button>
<!--         <img-->
<!--          @click="btnCancle"-->
<!--          class="close"-->
<!--          src="../../assets/img/orange-close.png"-->
<!--          alt=""-->
<!--        />-->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      show: false,
      imgUrl: "",
      title: "",
      content: "",
      btnText: "",
      click: "",
      num: "",
      type: 0,
      tableData: [],
      disable_btn: false, //是否 已阅读5s
      deliveryMethodDisabled: false,
      leftText: "取消",
      rightText: "确定"
    };
  },
  props:{
   showClose:{
     type:Boolean,
     default:false
   }
  },
  created() {},
  mounted() {
    setTimeout(function() {
      this.disable_btn = true;
    }, 15000);
  },
  methods: {
    btnClick() {
      this.click();
      this.show = false;
    },
    btnCancle() {
      this.cancle();
      this.show = false;
    },
    closeLoding() {
      this.show = false;
    },
    cancleCondition(){
      this.show = false;
    }
  }
};
</script>
<style lang="scss">
.windows /deep/ .el-table td,
.windows /deep/ .el-table th.is-leaf,
.windows /deep/ .el-table--border,
.windows /deep/ .el-table--group {
  border-color: #282828 !important;
}
.windows /deep/ .el-table--border::after,
.windows /deep/ .el-table--group::after,
.windows /deep/ .el-table::before {
  background-color: #282828 !important;
}
.windows /deep/ table {
  color: #282828 !important;
  margin-top: 15px;
}
.windows /deep/ table td p span {
  color: #282828 !important;
  margin-top: 15px;
}
.windows /deep/ p {
  color: #282828 !important;
  font-family: "Microsoft YaHei";
  font-size: 20px;
}
.windows /deep/ img {
  max-width: 100% !important;
}
.windows /deep/ table {
  border-color: #282828 !important;
}
</style>
<style lang="scss" scoped>
.scorll_content::-webkit-scrollbar {
  height: 6px;
}
// 渐变过渡
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}
// 全局弹窗
.masks {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 33333333;
  background: rgba(0, 0, 0, 0.7);
  .el-input__inner {
    color: black !important;
  }
  .windows {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    margin-left: -455px;
    margin-top: -235px;
    width: 60%;
    /*min-height: 30%;*/
    /*height: 80%;*/
    /*width: 1200px;*/
    /*height: 430px;*/
    border-radius: 8px;
    text-align: center;
    .shadow {
      display: block;
      width: 40%;
      margin: 0 auto;
      padding: 10px;
      margin-top: -30px;
      font-size: 20px;
      border-radius: 25px;
      .scorll_content {
        width: 90% !important;
      }
    }
    p {
      width: 80%;
      margin: 40px auto 10px auto;
      font-size: 14px;
      color: rgba(220, 220, 220, 0.8);
    }
  }
  .button {
    /*position: absolute;*/
    /*bottom:60px;*/
    /*left:50%;*/
    /* margin-left:-60px;*/
    width: 120px;
    height: 40px;
    margin: 20px 0 20px 0;
    // padding:20px 0;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
  .buttons {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    border-radius: 25px;
    height: 40px;
    // padding:20px 0;
    border: none;
    color: white;
    font-size: 14px;
  }
  .close {
    position: absolute;
    bottom: -100px;
    left: 50%;
    margin-left: -30px;
    width: 60px;
    height: 60px;
  }
  div {
    /*color:white;*/
    color: #878888;
    margin: 20px;
  }
}
.type {
  line-height: 13;
  font-size: 20px !important;
}
input {
  color: black;
}
</style>
