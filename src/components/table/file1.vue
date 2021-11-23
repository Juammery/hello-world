<template>
  <div>
    <div class="none" style="height:900px;font-family:'宋体'">
      <div>
        <h4 style="text-align:center;font-weight:500">自助办理凭条</h4>
        <!-- <div class="material_explain">
          &nbsp;&nbsp;您好，{{ user.inputName }}，您的办件编号为<span
            style="text-decoration: underline;"
            >{{ backMsg }}</span
          >,请妥善保管此凭条，请您将所需纸质材料放置在智能文件柜。下个工作日服务人员将电话联系您告知收件结果
        </div> -->
      </div>
      <div>
        <img
          :src="`data:image/jpeg;base64,${codeToBarCode}`"
          alt=""
          style="height:50px;width:150px"
        />
        <div style="float:right">
          <img
            :src="`data:image/jpeg;base64,${codeTwoQRCode}`"
            alt=""
            style="height:120px;width:120px;"
          />
          <p style="font-size:10px">请扫码查看办事进度</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  props: {
    codeToBarCode: {
      type: String,
      default: ""
    },
    codeTwoQRCode: {
      type: String,
      default: ""
    },
    user: {
      type: Object,
      default: () => {}
    },
    backMsg: {
      type: String,
      default: ""
    }
    // applicantUnit: {
    //   type: String,
    //   default: ""
    // }
  },
  computed: {},
  methods: {}
};
</script>

<style>
.none {
  padding: 10px;
  font-family: "宋体";
}
.material_apply {
  margin-top: 20px;
}
.text-del {
  margin-top: 20px;
}
.bold {
  font-weight: bold;
}
.table_title_s {
  font-family: "SimSun";
}
</style>
