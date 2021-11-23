<template>
  <div>
    <div class="none" style="height:900px;font-family:'宋体'">
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
      <div class="workPlate" style="font-size:20px">
        <span>工作台号：</span
        ><span style="font-size:26px">{{ getTerminalCode() }}号</span>
      </div>
      <div class="workUnit" style="font-size:20px;margin-top:20px">
        <span>职能单位：</span
        ><span style="font-size:26px" class="bold">行政服务中心</span>
      </div>
      <div
        class="material_title center"
        style="text-align:center;font-size:30px;margin-top:20px;font-weight:bold"
      >
        <span>徐汇区政务服务主题服务</span
        ><span style="font-size:36px;font-weight:900px">收件凭证</span>
      </div>
      <div class="material_apply">
        <span>申请主题：</span>
        <span class="bold">{{ this.getSession("themeName") }}</span>
      </div>
      <div class="material_apply">
        <span>子事项：</span>
        {{modelHtml}}
        <span class="bold" v-html="modelHtml" style="margin-left:30px"></span>
      </div>
      <div class="material_apply">
        <span>事项情形：</span>
        <span class="bold">新办</span>
      </div>
      <div class="material_apply">
        <span>项目信息：</span>
        <span class="bold"></span>
      </div>
      <div class="material_detial">
        <span>申请单位：{{ applicantUnit }}</span>
        <span style="margin-left: 20px;">经办人：</span>
        <span class="bold">{{ user.inputName }}</span>
      </div>
      <div class="material_detial">
        <span>申请人：</span>
        <span class="bold">{{ user.inputName }}</span>
        <span style="margin-left: 150px;">联系电话：</span>
        <span class="bold">{{ getphone() }}</span>
      </div>
      <div>
        &nbsp;&nbsp;经核查，您 (单位)
        提交的申请材料齐全，符合法定形式，予以收件。
      </div>
      <!-- <div class="material_explain">
        &nbsp;&nbsp;根据规定，承办部门将在出具本凭证之日起5个工作日内，作出受理或不予受理的决定，申请材料不齐全或者不符合法定形式的，将在5个工作日内一次告知需要补正的材料。如在5个工作日内未被告知需要补正材料的，则视为正式受理，本凭证即为受理凭证。
      </div>  -->
      <div class="material_check" style="margin-top:20px">
        收件材料清单附后。
      </div>
      <el-row style="margin-top:20px">
        <el-col :span="12" v-if="user.inputAddress != ''">
          <div class="material_unit">申请人确认（签字）：</div>
          <p>
            □自行取件
          </p>
          <p>
            ■物流寄送地址(到付)
          </p>
          <p class="text-del">收件人姓名: {{ user.inputName }}</p>
          <p class="text-del">接收电话: {{ user.inputPhone }}</p>
          <p class="text-del">接收地址: {{ user.inputAddress }}</p>
          <p class="text-del">现场服务人员</p>
        </el-col>
        <el-col :span="12" v-else>
          <div class="material_unit">申请人确认（签字）：</div>
          <p>
            ■自行取件
          </p>
          <p>
            □物流寄送地址(到付)
          </p>
          <!-- <p class="text-del">收件人姓名: {{ user.inputName }}</p>
             <p class="text-del">接收电话: {{ user.inputPhone }}</p>
						  <p class="text-del">接收电话: {{ user.inputAddress }}</p> -->
          <p class="text-del">现场服务人员</p>
        </el-col>
        <el-col :span="12" style="position:relative"
          ><div>
            <p>收件机构章</p>
            <div class="txtImg " v-if="showImgs">
              <img
                src="../../assets/img/zxz.png"
                alt=""
                style="z-index:100;position:absolute;top:-50px;height:150px;left:50px"
              />
            </div>
            <p class="text-del">收件日期： {{ getCurrentDate() }}</p>
          </div></el-col
        >
        <el-col :span="24"> </el-col>
      </el-row>
      <!-- <div class="material_date">二〇一八年八月二十八日</div> -->
      <!-- <div class="material_attention" style="margin-top:20px;">注意事项：环评备案事项请前往生态环境部网站进行备案。</div>
			<div class="material_attention" style="margin-top:10px;margin-left:80px">
				网址：http://sthj.sh.gov.cn/www/service/affairs/baxt/1.jsp
			</div>
			<div class="material_attention" style="margin-top:10px;margin-left:80px">户外非广告设施事项请前往徐汇区各街道办事处办理。</div> -->
    </div>
    <p style="text-align:center;margin-bottom:20px">1/2</p>
    <div style="page-break-after: always;"></div>
    <div
      class="material_content"
      style="margin-top:20px;height:900px;font-family:'宋体'"
    >
      <img
        :src="`data:image/jpeg;base64,${codeToBarCode}`"
        alt=""
        style="height:50px;width:150px;margin-bottom:20px"
      />
      <table
        class="table_title_s"
        border="1"
        cellspacing="0"
        cellpadding="0"
        style="text-align:center;width:100%;border-collapse:collapse;"
      >
        <tr>
          <td style="width:50px">序号</td>
          <td colspan="2">申请材料</td>
          <td style="width:50px">原件</td>
          <td style="width:50px">复印件</td>
        </tr>
        <tr v-for="(item, key) in multipleSelection" :key="key">
          <td>{{ key + 1 }}</td>
          <td colspan="2">{{ item.materialName }}</td>
          <td>{{ item.origNum }}</td>
          <td>{{ item.copyNum }}</td>
        </tr>
      </table>

      <div
        class="material_attention"
        style="margin-top:20px;font-family: SimSun;"
      >
        注意事项：本表中的材料必须是真实的，否则要承担因虚假而引致的法律责任。
      </div>
      <div class="material_footer" style="margin-top:20px;font-family: SimSun">
        （本凭证一式三份，一份交予申请人，一份放置件袋内拟作为受理凭证，一份由业务部门签收后交行政中心留档。）
      </div>
      <div style="position:relative" class="txtImg" v-if="showImgs">
        <img
          src="../../assets/img/zxz.png"
          alt=""
          style="z-index:100;position:absolute;top:-30px;right:200px;height:150px;"
        />
      </div>
    </div>
    <p style="text-align:center;margin-bottom:20px;">2/2</p>
  </div>
</template>

<script>
// import { IsXuhui } from "./selectStreet";
import { IsXuhui } from "@/components/selectStreet.js";
export default {
  data() {
    return {
      checked: true,
      checked1: false,
      show: false,
      multipleSelection: this.getSession("Material") || [],
      modelHtml: "",
      showImgs: ""
    };
  },
  mounted() {
    this.getTitle();
    this.showImg();
  },
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
    applicantUnit: {
      type: String,
      default: ""
    }
  },
  computed: {},
  methods: {
    // 判断是否显示照片
    showImg() {
      let result = IsXuhui();
      if (result) {
        this.showImgs = true;
      } else {
        this.showImgs = false;
      }
    },
    getTitle() {
      let title = "";
      let htmlList = this.getSession("htmlList") ||[];
      htmlList.forEach(element => {
        title += "<p>" + element.guideName + "</p>";
      });
      this.$nextTick(() => {
        this.modelHtml = title;
      })
    },
    getTerminalCode() {
      let code = this.getSession("terminalCode")
        ? this.getSession("terminalCode")
        : 1;
      return code;
    },
    // 获取当前的日期
    getCurrentDate() {
      var timeStr = "-";
      var curDate = new Date();
      var curYear = curDate.getFullYear(); //获取完整的年份(4位,1970-????)
      var curMonth = curDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      var curDay = curDate.getDate(); //获取当前日(1-31)
      var Current = curYear + timeStr + curMonth + timeStr + curDay;
      return Current;
    },
    // 获取电话号码
    getphone() {
      let phone = this.getSession("phone");
      return phone;
    }
  }
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
.txtImg img {
  transform: rotate(30deg);
  -ms-transform: rotate(30deg); /* IE 9 */
  -moz-transform: rotate(30deg); /* Firefox */
  -webkit-transform: rotate(30deg); /* Safari 和 Chrome */
  -o-transform: rotate(30deg); /* Opera */
}
</style>
