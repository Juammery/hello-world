import $ from "jquery";
import { createDraft } from "@/api/generate";

export default {
  data() {
    return {
      allsure: false, //判断全部是否已经确定
      operating: 1 //1为现场，2为网上
    };
  },
  mounted() {
    if (this.getSession("terminalCode")) {
      this.operating = 1;
    } else {
      // this.showWarn();
      this.operating = 2;
    }
  },
  methods: {
    // 提醒
    showWarn() {
      this.$msgBox
        .showMsgBox({
          content: "请选择您是否在徐汇区服务中心C厅自助机办理？",
          isShowInput: true,
          radioContent: {
            first: "是",
            second: "否"
          },
          msgType: 1,
          inputType: 2
        })
        .then(async value => {
          if (!value) {
            this.$router.go(-1);
          } else {
            this.operating = value;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 确认
    handlerSure(val) {
      this.$msgBox
        .showMsgBox({
          content: "是否确认该申请表信息无误？",
          isShowInput: true,
          msgType: 1,
          inputType: 1
        })
        .then(async value => {
          this.htmlList[val].status = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    //确认材料
    sureMaterial(val) {
      console.log("val1111", val);
      this.$msgBox
        .showMsgBox({
          content: "是否确认该材料信息无误？",
          isShowInput: true,
          msgType: 1,
          inputType: 1
        })
        .then(async value => {
          // this.htmlList[val].status = true
          val.status = 1;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 检查所有是否已完成打印
    checkAllDown() {
      try {
        if (this.htmlList.length > 0) {
          this.htmlList.forEach(e => {
            if (!e.downloadStatus) {
              throw new Error("err");
            }
          });
        }
        if (this.Material.length > 0) {
          this.Material.forEach(e => {
            // console.log(
            //   "eee1",
            //   e.sourceWay,
            //   this.operating,
            //   e.status,
            //   this.getSession("themeName")
            // );
            if (e.sourceWay === 3 && !e.downloadStatus) {
              throw new Error("err");
            }

            if (
              e.sourceWay === 4 &&
              this.operating == 2 &&
              !e.status &&
              this.getSession("themeName") == "我要开饭店"
            ) {
              throw new Error("err");
            }
          });
        }
      } catch (e) {
        return false;
      }
      return true;
    },
    // 保存草稿
    saveDraft() {
      let fillForm = this.getSession("fillForm")
        ? this.getSession("fillForm")
        : [];
      fillForm.forEach(element => {
        if (element.synonymArray[0] == "企业名称") {
          this.companyName = element.data;
        }
        if (element.synonymArray[0] == "委托代理人") {
          this.trustee = element.data;
        }
        if (this.trustee) {
          if (element.child.length > 0) {
            element.child.forEach(element => {
              element.forEach(element => {
                if (element.synonymArray[0] == "委托代理人") {
                  this.trustee = element.data;
                }
              });
            });
          }
        }
      });
      this.dialogVisible1 = true;
      setTimeout(() => {
        let form_html = JSON.parse(JSON.stringify(this.htmlList));
        // 材料-保存在材料中填写的内容，判断是否有saveId，有则传给后台
        let materialList = this.getSession("Material") || [];
        let materialId_saveIdList = []; //材料id（materialId）和saveId对应关系数组对象
        materialList.forEach(material => {
          if (material.saveId) {
            materialId_saveIdList.push({
              materialId: material.materialId,
              saveId: material.saveId
            });
          }
        });
        form_html.forEach((element, index) => {
          element.html = $(`.r${index}`).html();
        });
        let data = {
          state: "0",
          // draftCode: '',
          phone: "13217051910",
          formPage: 4,
          idCard: this.getSession("userId"), //唯一标识
          code: "",
          companyName: this.companyName,
          trustee: this.trustee,
          themeId: this.getSession("themeId"),
          form_detail: {
            subject: this.getSession("subject"), //主题情形
            business: this.getSession("business"), //补充情形
            fillForm: this.getSession("fillForm") // 多表合一
          },
          htmls: form_html, //提交申请表
          id: this.getSession("draftId") ? this.getSession("draftId") : null,
          materialId_saveIdList: materialId_saveIdList
        };
        createDraft(data).then(res => {
          if (!res.data.code) {
            this.$popup({
              content: "保存草稿成功",
              type: 4,
              click: () => {
                // 点击按钮事件
                this.$router.push("/");
              }
            });
          }
        });
      }, 500);
    }
  }
};
