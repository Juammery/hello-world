<template>
  <div class="logistics three-content">
    <!-- <div style="position:relative;z-index: 9;">
      <div class="themeName" style="transform: translate(12%,-66%);">{{ getSession("themeName") }}</div>
    </div>-->

    <!-- <div style="position:relative;" >
      <div class="themeName">{{ getSession("themeName") }}</div>
    </div> -->
    <home-top :current-page='getSession("themeName")'></home-top>
    <div class="six-content" style="position:relative">
      <div class="container mt20 container-table">
        <div class="logistics-chose" style="font-size: 20px !important;">
          <p>请选择证照领取方式</p>
          <el-radio-group v-model="logisticsType" style="margin-top:5px" class="logisStyle">
            <el-radio :label="1">办理点自取</el-radio>
            <el-radio :label="2">物流</el-radio>
          </el-radio-group>
        </div>
        <div
          v-if="showAddress"
          class="logistics-chose"
          style="margin-top: 30px;padding: 30px 15px;"
        >
          <p style="font-size: 20px !important;margin-bottom: 4px;">请填写收件人信息</p>
          <el-row :gutter="20" style="margin-bottom: 20px;">
            <el-col :span="3">
              <span style="color:#606266;">姓名：</span>
            </el-col>
            <el-col :span="21">
              <el-input v-model="user.inputName" placeholder="姓名" :disabled="hasAgentName"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-bottom: 20px;">
            <el-col :span="3">
              <span style="color:#606266;">手机号码：</span>
            </el-col>
            <el-col :span="21">
              <el-input
                :rules="[
                  {
                    pattern: /^1[34578]\d{9}$/,
                    trigger: 'change',
                    message: '请输入正确移动电话'
                  }
                ]"
                v-model="user.inputPhone"
                placeholder="手机号码"
                :disabled="hasAgentPhone"
              ></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3">
              <span style="color:#606266;">地址：</span>
            </el-col>
            <el-col :span="21">
              <el-input v-model="user.inputAddress" placeholder="地址"></el-input>
            </el-col>
          </el-row>
          <p
            style="color:red ;font-size:10px;text-indent:10em;"
          >*&nbsp;请确保收件人信息为受托人（委托代理人）信息，并保证填写的物流信息正确，提交成功后不可修改</p>
        </div>
        <div></div>
      </div>

      <div class="nuxt-btn-panel">
        <div class="nuxt-btn" @click="$router.push('/generate')">上一步</div>
        <div class="nuxt-btn" @click="submitDocumnet">提交办件</div>
      </div>
    </div>
    <div style="height: 0px;overflow: hidden;">
      <file
        ref="file1"
        :codeToBarCode="codeToBarCode"
        :codeTwoQRCode="codeTwoQRCode"
        :applicantUnit="applicantUnit"
        :user="user"
        class="file1"
      ></file>
      <!-- 非工作时间的打印凭证 -->
      <file1
        ref="file2"
        :codeToBarCode="codeToBarCode"
        :codeTwoQRCode="codeTwoQRCode"
        :user="user"
        :backMsg="backMsg"
        class="file2"
      ></file1>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { setTimeout } from "timers";
import { getTheme, standardItem } from "@/api/logistics";
import { getHtml, getAttention } from "@/api/generate";
import { backZf } from "@/assets/backZF.js";
import { setPerfect } from "@/api/admin";
import axios from "@/axios/index.js";
import file from "@/components/table/file";
import file1 from "@/components/table/file1";
import { findDic } from "./findDIc";
import { getWorkDay } from "@/api/index.js";
import { SelectStreet } from "@/components/selectStreet.js";
import homeTop from "@/components/common/homeTop";

export default {
  components: {
    file,
    file1,
    homeTop
  },
  data() {
    return {
      codeToBarCode: "",
      codeTwoQRCode: "",
      applicantUnit: "",
      logisticsType: 1, //物流类型
      code: "",
      multipleSelection: [],
      showAddress: false,
      user: {
        inputName: "",
        inputPhone: "",
        inputAddress: ""
      },
      isPhone: true,
      idNumber: "",
      windowNo: "",
      backMsg: "",
      prolist: [], // 返回的所有数据
      proceed: "", //主题事项
      proceeds: "", //主题码
      themeName: "", //主题名
      hasAgentName: false, //收件人姓名是否对应一表填报页面的委托代理人信息，若已填充则禁用该输入框
      hasAgentPhone: false //收件人手机号是否对应一表填报页面的委托代理人信息，若已填充则禁用该输入框
    };
  },
  watch: {
    logisticsType(val) {
      if (val == 2) {
        this.showAddress = true;
        if (this.getSession("fillForm").length > 0) {
          this.getSession("fillForm").forEach(element => {
            //如果单点登录的用户是个人/委托代理人,则需要在自动填充委托代理人的信息（姓名，身份证类型，身份证号，移动手机号，）
            if (element.synonymArray[0] == "委托代理人") {
              if (Array.isArray(element.child) && element.child.length == 0) {
                switch (element.synonymArray[0]) {
                  case "委托代理人姓名": //委托代理人姓名
                    if (element.data) {
                      this.user.inputName = element.data;
                      this.hasAgentName = true;
                    }
                    break;
                  case "委托代理人": //委托代理人姓名
                    if (element.data) {
                      this.user.inputName = element.data;
                      this.hasAgentName = true;
                    }
                    break;
                  case "委托代理人移动电话": //委托代理人移动电话
                    if (element.data) {
                      this.user.inputPhone = element.data;
                      this.hasAgentPhone = true;
                    }
                    break;
                }
              } else if (
                Array.isArray(element.child[0]) &&
                element.child[0].length > 0
              )
                element.child[0].forEach(itemData => {
                  switch (itemData.synonymArray[0]) {
                    case "委托代理人姓名": //委托代理人姓名
                      if (itemData.data) {
                        this.user.inputName = itemData.data;
                        this.hasAgentName = true;
                      }
                      break;
                    case "委托代理人": //委托代理人姓名
                      if (itemData.data) {
                        this.user.inputName = itemData.data;
                        this.hasAgentName = true;
                      }
                      break;
                    case "委托代理人移动电话": //委托代理人移动电话
                      if (itemData.data) {
                        this.user.inputPhone = itemData.data;
                        this.hasAgentPhone = true;
                      }
                      break;
                  }
                });
            }
          });
        }
      } else {
        this.showAddress = false;
      }
    }
  },
  mounted() {
    this.getTheme();
    this.getPhone();
  },
  methods: {
    // 判断手机号码
    getPhone() {
      // console.log(this.user.inputPhone.length)
      // let myreg=/^[1][3,4,5,7,8][0-9]{9}$/
      //  if(myreg.test(this.user.inputPhone)){
      //     this.isPhone=false
      //  }else{
      //    this.isPhone=true
      //  }
      let fillForm = this.getSession("fillForm") || [];
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
    // 保存草稿

    // 获取事项码
    getProceeds() {
      let data = this.getSession("subject").concat(this.getSession("business"));
      // 获取材料中的id
      let Material = this.getSession("Material") || [];
      // 获取html
      let htmlList = this.getSession("htmlList");
      Material.forEach(element => {
        if (
          element.guideName != "通用材料" &&
          element.guideName != "复用材料"
        ) {
          this.proceeds += element.guideName + ",";
          this.proceed += element.applyNo + ",";
        }
      });
      htmlList.forEach(element => {
        this.proceeds += element.guideName + ",";
        this.proceed += element.applyNo + ",";
      });
    },

    // 创建办件
    submitDocumnet() {
      this.$popup({
        type: 6,
        leftText: "取消",
        rightText: "确认",
        content: "您即将创建办件，请确认是否继续？",
        cancle: () => {
          // 点击按钮事件
          this.$message({
            showClose: true,
            message: "取消办件",
            type: "warning"
          });
        },
        click: () => {
          this.createInfo();
        }
      });
    },
    createInfo() {
      this.getProceeds();
      if (this.logisticsType == 2) {
        if (
          this.user.inputName != "" &&
          this.user.inputPhone != "" &&
          this.user.inputAddress != ""
        ) {
          this.initInfo();
        } else {
          this.$message({
            showClose: true,
            message: "请填写完整的收件人信息",
            type: "warning"
          });
        }
      } else {
        this.initInfo();
      }

      // this.$confirm('您即将提交办件并打印凭证, 请确认是否进行该操作?', '温馨提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      // }).then(() => {
      //     this.getProceeds();
      //     if (this.logisticsType == 2) {
      //         if (
      //             this.user.inputName != "" &&
      //             this.user.inputPhone != "" &&
      //             this.user.inputAddress != ""
      //         ) {
      //             this.initInfo();
      //         } else {
      //             this.$message({
      //                 showClose: true,
      //                 message: "请填写完整的收件人信息",
      //                 type: "warning"
      //             });
      //         }
      //     } else {
      //         this.initInfo();
      //     }
      // }).catch(() => {
      //     this.$message({
      //         type: 'info',
      //         message: '已取消删除'
      //     });
      // });
    },
    //创建办件
    initInfo() {
      // 获取工作时间
      let code = this.getSession("termialCode")
        ? this.getSession("termialCode")
        : "C99";
      getWorkDay(code).then(res => {
        let result = res.data.data;
        this.setSession("WorkTime", result);
      });
      let name = SelectStreet();
      this.setSession("streetType", name);

      // 如果是从待完善进来 ,就把记录清除
      if (this.getSession("isPerfect")) {
        let ids = this.getSession("isPerfect");
        setPerfect(ids).then(res => {
          console.log();
        });
      }
      let form_html = this.getData("form_html");
      let form_detail = {
        subject: this.getSession("subject") || [],
        business: this.getSession("business") || [],
        fillForm: this.getSession("fillForm") || []
      };
      let fileList = this.getSession("fileList");
      let applicant_unit = "";
      let phone = "";
      let proposer = "";
      let idCard = "";
      if (this.getSession("UserInfo").zwdtswUserType == "个人") {
        proposer = this.getSession("UserInfo").zwdtswName;
        phone = this.getSession("UserInfo").phone
          ? this.getSession("UserInfo").phone
          : this.getSession("UserInfo").zwdtswLinkPhone;
        idCard = this.getSession("UserInfo").zwdtswCertId;
      }
      let fillForm = this.getSession("fillForm") || [];
      let allFillForm = [];
      fillForm.forEach(element => {
        if (element.child.length > 0) {
          element.child.forEach(e => {
            allFillForm = [...allFillForm, ...e];
          });
        }
        allFillForm.push(element);
        // if (element.synonymArray[0] == "企业名称") {
        //   applicant_unit = element.data;
        // }
        if (element.synonymArray[0] == "委托人移动电话") {
          phone = element.data;
        }
        if (element.id == 459) {
          applicant_unit = element.data;
        }
        if (element.child.length > 0) {
          element.child.forEach(element => {
            element.forEach(element => {
              if (element.synonymArray[0] == "委托人移动电话") {
                phone = element.data;
              }
              if (element.id == 459) {
                applicant_unit = element.data;
              }
            });
          });
        }
      });
      // 遍历allform 找到字典 然后把字典赋值
      findDic(allFillForm);
      this.$loading({
        lock: true,
        text: "正在创建办件",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      axios
        .post("/cbs/msh_user_form/create", {
          // wlselect: this.logisticsType,
          // st_window_no: this.getSession("ReceiveUrl").terminalCode,
          // proceed: this.proceed,
          // // id_card: this.getSession("ReceiveUrl").code,
          // id_card: this.getSession('userId'),
          // form_detail: form_detail,
          // proceeds: this.proceeds,
          // recipientPhone: this.user.inputPhone,
          // recipientAddress: this.user.inputAddress,
          // recipient: this.getSession("UserInfo").name,
          // proposer: this.getSession("UserInfo").name,
          // phone: phone,
          // applicant_unit: applicant_unit,
          // code: "",
          // themeName: this.themeName,
          // htmls: form_html,
          // themeId: this.getSession("themeId"),
          // allFillForm:allFillForm

          wlselect: this.logisticsType,
          st_window_no: this.getSession("terminalCode")
            ? this.getSession("terminalCode")
            : "C09",
          proceed: this.proceed,
          id_card: idCard,
          form_detail: form_detail,
          proceeds: this.proceeds,
          recipientPhone: this.user.inputPhone,
          recipientAddress: this.user.inputAddress,
          recipient: this.user.inputName,
          // proposer: proposer,
          // phone: phone,
          proposer: this.user.inputName ? this.user.inputName : proposer,
          phone: this.user.inputPhone ? this.user.inputPhone : phone,
          applicant_unit: applicant_unit ? applicant_unit : "",
          isWindowProcess: 2,
          code: "",
          themeName: this.getSession("themeName"),
          htmls: form_html,
          themeId: this.getSession("themeId"),
          allFillForm: allFillForm,
          fileList: fileList,
          draftId: this.getSession("draftId")
            ? this.getSession("draftId")
            : null
        })
        .then(res => {
          let result = res.data;
          this.$loading().close();
          if (result.code == 0) {
            this.code = result.code;
            this.backMsg = result.data;
            this.userPop(this.backMsg);
            // 上传数据元的接口
            // this.uploadData();
            axios
              .get(`/cbs/msh_user_form/codeToBarCode?code=${result.data}`)
              .then(res => {
                this.codeToBarCode = res.data.data.image;
              });
            axios
              .get(
                `/cbs/msh_user_form/codeTwoQRCode?code=${result.data}&phone=${phone}`
              )
              .then(res => {
                this.codeTwoQRCode = res.data.data.image;
              });
            // 上传材料的接口
            this.uploadFileById(result.data);
          } else {
            this.$message({
              showClose: true,
              message: result.msg,
              type: "warning"
            });
          }
        })
        .catch(error => { });
    },

    initInfo1() {
      // 如果是从待完善进来 ,就把记录清除
      if (this.getSession("isPerfect")) {
        let ids = this.getSession("isPerfect");
        setPerfect(ids).then(res => {
          console.log();
        });
      }
      // let form_html = this.getData("form_html");
      let form_html = JSON.parse(JSON.stringify(this.htmlList)) || [];
      form_html.forEach((element, index) => {
        element.html = $(`.r${index}`).html();
      });
      let form_detail = {
        subject: this.getSession("subject"),
        business: this.getSession("business")
          ? this.getSession("business")
          : [],
        fillForm: this.getSession("fillForm")
      };
      let applicant_unit = "";
      let phone = "";
      let fillForm = this.getSession("fillForm") || [];
      let allFillForm = [];
      fillForm.forEach(element => {
        if (element.child.length > 0) {
          element.child.forEach(e => {
            allFillForm = [...allFillForm, ...e];
          });
        }
        allFillForm.push(element);
        if (element.synonymArray[0] == "企业名称") {
          applicant_unit = element.data;
        }
        if (element.child.length > 0) {
          element.child.forEach(element => {
            element.forEach(element => {
              if (element.synonymArray[0] == "委托代理人移动电话") {
                phone = element.data;
              }
            });
          });
        }
      });
      // 遍历allform 找到字典 然后把字典赋值
      findDic(allFillForm);
      this.setSession("phone", phone);
      const loading = this.$loading({
        lock: true,
        text: "正在创建办件",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let fileList = [];
      this.Material.forEach(item => {
        if (item.hasOwnProperty("fileId")) {
          fileList.push(item);
        }
      });
      // 判断一下是法人还是个人 1是法人的
      axios
        .post("/cbs/msh_user_form/create", {
          wlselect: this.logisticsType,
          st_window_no: "11",
          proceed: this.proceed,
          id_card: this.getSession("userId"),
          form_detail: form_detail,
          proceeds: this.proceeds,
          recipientPhone: this.user.inputPhone,
          recipientAddress: this.user.inputAddress,
          recipient: "admin",
          proposer: "admin",
          phone: "11",
          applicant_unit: "guomai",
          code: "",
          themeName: this.getSession("themeName"),
          htmls: form_html,
          themeId: this.getSession("themeId"),
          allFillForm: allFillForm,
          // fileList:fileList,
          draftId: this.getSession("draftId")
            ? this.getSession("draftId")
            : null
        })
        .then(res => {
          let result = res.data;
          // this.$loading().close();
          // this.$loading.close();
          loading.close();
          if (result.code == 0) {
            this.$popup({
              content: result.msg,
              type: 4,
              click: () => {
                // 点击按钮事件
                // if (this.getSession("terminalCode")) {
                //   backZf();
                // } else {
                //   this.$router.push({ path: "/" });
                // }
                this.$router.push({ path: "/" });
              }
            });
          } else {
            this.$message({
              showClose: true,
              message: result.msg,
              type: "warning"
            });
          }
        })
        .catch(error => { });
    },
    // 不同的提示内容，显示
    getContent() {
      let steetType = this.getSession("streetType") || "3";
      let content = "";
      if (steetType == 1) {
        // content = `您所申报的${this.themeName}已提交审核,审核结果将以短信方式告知。请打印2份收件凭证，打印完成后回到自助服务机首页选择左下角的“其他服务”，选择“我要放件”并凭收件码打开自助证照柜。请逐份放入事项申请表、1份收件凭证、办事材料后即可离开。`;
        content = `您的办件已创建！办件编码为：审核结果将以短信方式告知。请打印2份收件凭证，打印完成后回到自助服务机首页选择左下角的“其他服务”，选择“我要放件”并凭收件码打开自助证照柜。请逐份放入事项申请表、1份收件凭证、办事材料后即可离开。`;
      } else if (steetType == 2) {
        // content = `您所申报的${this.themeName}已提交审核,审核结果将以短信方式告知。请打印2份收件凭证，打印完成后前往受理站放置材料。选择左下角的“其他服务”，选择“我要放件”并凭收件码打开自助证照柜。请逐份放入事项申请表、1份收件凭证、办事材料后即可离开。`;
        content = `您所申报的${this.themeName}已提交审核,审核结果将以短信方式告知。请打印2份收件凭证，打印完成后前往受理站放置材料。选择左下角的“其他服务”，选择“我要放件”并凭收件码打开自助证照柜。请逐份放入事项申请表、1份收件凭证、办事材料后即可离开。`;
      } else {
        // content = `您所申报的${this.themeName}已提交审核,审核结果将以短信方式告知。请打印2份收件凭证，打印完成后前往自助证照柜扫描收件凭证左上角的条形码打开自助证照柜。请逐份放入事项申请表、1份收件凭证、办事材料后即可离开。`;
        content = `您所申报的${this.themeName}已提交审核,审核结果将以短信方式告知。请打印2份收件凭证，打印完成后前往自助证照柜扫描收件凭证左上角的条形码打开自助证照柜。请逐份放入事项申请表、1份收件凭证、办事材料后即可离开。`;
      }
      return content;
    },
    // 上传数据元的接口
    uploadData() {
      let fillForm = this.getSession("fillForm");
      //  将东方通的字段和data字段取出来
      let forms = {};
      fillForm.forEach(element => {
        if (element.itemField) {
          let obj = {
            testKey: element.itemField
          };
          let key = "testKey";
          forms[obj[key]] = element.data;
        }
        // 如果有子数据元
        if (element.child.length > 0) {
          element.child.forEach(elements => {
            elements.forEach(ele => {
              if (ele.itemField) {
                let obj = {
                  testKey: ele.itemField
                };
                let key = "testKey";
                forms[obj[key]] = ele.data;
              }
            });
          });
        }
      });
      let datas = {
        form: forms,
        proceed: this.proceed
      };
      // 上传需要的数据元
      standardItem(datas).then(res => {
        console.log(res);
      });
    },
    userPop(num) {
      let htmlList = this.getSession("htmlList") || [];
      let content1 = this.getContent();
      // htmlList.forEach(element => {
      //   content1 += '<'+element.guideName+'>'+','
      // })
      this.$popup({
        content: content1,
        num: String(num),
        click: () => {
          // 点击按钮事件
          setTimeout(() => {
            // let phone = "11";
            // axios
            //   // .get(`/cbs/msh_user_form/codeToBarCode?code=${this.backMsg}`)
            //   .get(`/cbs/msh_user_form/codeToBarCode?code=131599029852601`)
            //   .then(res => {
            //     this.codeToBarCode = res.data.data.image;
            //   });
            // axios
            //   // .get(`/cbs/msh_user_form/codeTwoQRCode?code=${this.backMsg}&phone=${phone}`)
            //   .get(
            //     `/cbs/msh_user_form/codeTwoQRCode?code=131599029852601&phone=${phone}`
            //   )
            //   .then(res => {
            //     this.codeTwoQRCode = res.data.data.image;
            //   });

            // 更换了打印方法
            // 需要判断是否是工作时间
            var docStr = "";
            if (this.getSession("WorkTime")) {
              docStr = $(`.file1`).html();
            } else {
              docStr = $(`.file2`).html();
            }
            // document.body.innerHTML = ''
            var newWindow = window.open("打印窗口", "_blank");

            newWindow.document.write(docStr);
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
            newWindow.document.close();
            newWindow.print();
            newWindow.close();

            // 重新加载页面，以刷新数据
            window.location.href = "/";
            // this.$router.push({ path: "/" });

            // this.backZf();
          }, 500);
        }
      });
    },

    uploadFileById(msg) {
      let multipleSelection = this.getSession("Material");
      // 上传材料的时候带上身份证和营业执照
      multipleSelection.forEach((element, index) => {
        // 材料id
        element.itemCode = element.applyNo;
        // 材料名
        element.stStuffName = element.materialName;
        // 原件数
        element.nmOriginal = element.origNum;
        // 复印件数
        element.nmCopy = element.copyNum;
        if (element.materialName == "营业执照") {
          let showImg = this.getSession("showImg");
          element.imgs = showImg;
        }
      });
      let applyNo = multipleSelection[0].applyNo;
      if (this.getSession("UserInfo").zwdtswUserType == "个人") {
        multipleSelection.push({
          itemCode: applyNo,
          child: null,
          copyNum: 0,
          id: "0002",
          materialId: "0002",
          materialName: "委托代理人身份证",
          origNum: 1,
          stStuffName: "委托代理人身份证",
          nmOriginal: "1",
          nmCopy: "1",
          // file: this.getSession("idImg")
          file: this.getSession("agentIdentificationImg")
        });
      } else {
        multipleSelection.push({
          itemCode: applyNo,
          child: null,
          copyNum: 0,
          id: "0001",
          materialId: "0001",
          materialName: "营业执照",
          origNum: 1,
          stStuffName: "营业执照",
          nmOriginal: "1",
          nmCopy: "1",
          // file: this.getSession("showImg")
          file: this.getSession("agentIdentificationImg")
        });
      }

      // 判断一下是法人还是个人 1是法人的
      // if (this.getSession("serve") == 1) {
      //   multipleSelection.push({
      //     itemCode: applyNo,
      //     child: null,
      //     copyNum: 0,
      //     id: "0001",
      //     materialId: "0001",
      //     materialName: "营业执照",
      //     origNum: 1,
      //     stStuffName: "营业执照",
      //     nmOriginal: "1",
      //     nmCopy: "1",
      //     file: this.getSession("showImg")
      //   });
      // }
      axios
        .post(
          `/cbs/msh_user_form/uploadFileById?code=${msg}`,
          multipleSelection
        )
        .then(res => {
          if ((res.data.code = 0)) {
            console.log("上传成功");
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.six-content {
  // width: 67%;
  // float: right;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  // margin: 0% 10% 0 0;
  border-radius: 10px;
  height: 560px !important;
  // background: #e4e9ef;
  /* background-color: rgba(228,233,239,0.4); */
  background-size: 100% 101%;
  padding: 15px 10px;
  .logistics-chose {
    color: #cbb486;
    padding: 20px !important;
    font-size: 16px;
    line-height: 2;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    // background-color: #f2f2f2;
    // background-color: #ffffff;

    border-radius: 10px;
    padding: 4px 4px 4px 15px;
    position: relative;
  }
}
.nowLi5 {
  background-image: url("../../assets/img/leftselect.png");
  font-size: 22px;
}
.container-table {
  /*padding: 20px;*/
}
.container-table h3 {
  margin-bottom: 20px;
}
.isRed {
  font-size: 10px;
  padding-top: 5px;
  color: red;
}
/deep/ .el-table {
  th {
    font-size: 16px;
  }
  td {
    font-size: 16px;
  }
  .cell {
    color: #fff;
  }
}

.container-button {
  margin-right: 5px;
  font-size: 16px;
  color: #cbb486;
  &:hover,
  &:focus {
    color: #cbb486;
  }
  &.disabled {
    color: #999;
    cursor: auto;
    &:hover {
      text-decoration: none;
    }
  }
}
.six-content h3 {
  color: #05d7eb;
  font-size: 24px;
}
table tr {
  border: 1px solid #05d7eb;
}

.warnUser {
  font-size: 30px;
  // margin-bottom: 50px;
  color: #fff;
  text-align: left;
}
.leftup {
  position: relative;
  bottom: 40px;
  left: 45px;
  color: #05d7eb;
}
</style>
<style>
[data-v-77df3c0a] .el-table th {
  font-size: 20px;
}
[data-v-77df3c0a] .el-table td {
  font-size: 18px;
}
.logisStyle .el-radio__inner {
  width: 20px;
  height: 20px;
}
.logisStyle .el-radio__label {
  font-size: 18px;
}
.logistics-chose .el-radio__input.is-checked .el-radio__inner {
  border-color: #cbb486;
  background: #cbb486;
}
.logistics-chose .el-radio__input.is-checked + .el-radio__label {
  color: #cbb486;
}
.el-input.is-disabled .el-input__inner {
  color: #606266 !important;
}

.logistics .el-button--warning {
  background-color: #cbb486 !important;
}
</style>

<style lang="scss" scoped>
.nuxt-btn-panel {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  .nuxt-btn {
    cursor: pointer;
    font-size: 16px;
    background-color: #cbb486;
    color: #fff;
    padding: 13px 30px;
    text-align: center;
    line-height: 1;
    border-radius: 25px;
    margin: 0 20px;
    &[disabled] {
      background-color: #c8c9cc;
      // pointer-events: none;
      cursor: not-allowed;
    }
  }
}
</style>