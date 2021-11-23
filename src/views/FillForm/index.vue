
<template>
    <div class="three-content">
<!--        <div @click="$router.push('/generate')" style="cursor:pointer;">-->
            <home-top current-page="表单填写"></home-top>
<!--        </div>-->
        <div class v-loading="isLoading" element-loading-text="表单生成中">
            <div class="five-content">
                <div class="is_content scorll_content">
                    <div
                        class="supermarket clearfix"
                        v-if="getSession('subject') && getSession('subject').length !== 0"
                    >
                        <switch-panel title="情形选择：" :list="getSubjectSuper('subject')">
                            <template slot="right">
                                <i
                                    @click="$router.push('/subject')"
                                    v-if="(getSession('subject') && getSession('subject').length !== 0)"
                                    class="el-icon-edit-outline"
                                ></i>
                            </template>
                        </switch-panel>
                    </div>
                    <div
                        class="supermarket clearfix"
                        v-if="getSession('business') && getSession('business').length !== 0"
                    >
                        <div class="fl edit-nav-content">
                            <span class="edit-nav-bar">情形判断：</span>
                            <span style="color:#666666">{{ getSubject("business") }}</span>
                        </div>
                        <div
                            class="fr leftbtn"
                            style="margin-top: 0.4rem;position: absolute;right: 20px;top: 45%;transform: translateY(-50%);"
                            @click="$router.push('/business')"
                            v-if="
                getSession('business') && getSession('business').length !== 0
              "
                        >
                            <!-- <img src="../../assets/img/edit.png" style="width: 80%;" alt /> -->
                            <i class="qx-icon el-icon-edit-outline"></i>
                        </div>
                    </div>
                    <!-- <div class="supermarket supermarket-more" >
                        <div class="content-container" :class="contentUp ? 'content_descipt' : ''">
                          <div v-html="descipt">

                          </div>
                        </div>
                        <span @click="contentUp = !contentUp" class="toggle">{{contentUp ? '展开' : '收起'}}</span>
                    </div>-->
                    <!-- 填写表单 -->
                    <div class="ytable1">
                        <div class="form-component">
                            <!-- <span class="edit-nav-bar">请填写以下信息</span> -->
                            <mainDom :formList="formList" ref="mychild"></mainDom>
                        </div>

                        <div class="nuxt-btn-panel">
                            <div class="nuxt-btn" @click="goHistory">上一步</div>
                            <div
                                class="nuxt-btn"
                                v-if="!getSession('isProgress')"
                                @click="saveDraft"
                            >保存草稿</div>
                            <div class="nuxt-btn" @click="fourStep">下一步</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mainDom from "./formDom";
import { getFormFill } from "@/api/getForm";
import { setTimeout } from "timers";
import { createDraft } from "@/api/generate";
import formData from "./data";
import SwitchPanel from "@/components/SwitchPanel";
import homeTop from "@/components/common/homeTop";

export default {
    data() {
        return {
            contentUp: true,
            formList: [],
            descipt: "",
            trustee: "",
            companyName: "",
            isLoading: false,
        };
    },
    components: {
        mainDom,
        SwitchPanel,
        homeTop
    },
    updated() {
        // let dom = document.getElementById("app");
        // dom.scrollTo(0, 0);
    },
    async created() {
        this.init();
    },
    methods: {
        async init() {
            // console.log('vue',this)

            // 調取接口需要父子判斷
            // let subjectList = this.getSession("subject")
            //   ? this.filterChildren(this.getSession("subject"))
            //   : [];
            // let businessList = !this.getSession("business")
            //   ? []
            //   : this.filterChildren(this.getSession("business"));
            // let data = subjectList.concat(businessList);
            // if (businessList == undefined) {
            //   data = subjectList;
            // }
            // const loading = this.$loading({
            //   lock: true,
            //   text: "Loading",
            //   spinner: "el-icon-loading",
            //   background: "rgba(0, 0, 0, 0.7)"
            // });
            this.isLoading = true;
            let res = await formData.preHttp();
            this.isLoading = false;
            // loading.close();
            this.headerData(res);
            // // 获取数据元
            // getFormFill(this.getSession("themeId"), data).then(res => {
            // });
        },
        headerData(res) {

            // this.setSession('agentInfo',JSON.stringify({zwdtswName:'ganyongfang',zwdtswCertType:'居民身份证',zwdtswLinkPhone:'13217051910',zwdtswCertId:'362204199607032465'}))
            // 判断可能没有申请表的情况

            if (res.data.data.length == 0) {
                this.$router.push("/generate");
            } else {
                this.formList = res.data.data;
                // 排序 根据名称 id 以及sort
                // this.formList.sort((a, b) =>{
                //     if (a.guideWeight > b.guideWeight){//先按事项排序
                //         return true
                //     } else if(a.guideWeight == b.guideWeight){//如果事项排序相同，则按材料排序
                //         return (a.materialWeight > b.materialWeight) ? 1 : -1
                //     }
                // }).sort(function (a, b) {
                //     if(a.materialName === b.materialName){
                //         return (a.sort > b.sort) ? 1 : -1
                //     }else{
                //         return 0
                //     }
                // })
                this.formList.sort((a, b) => {
                    if (a.guideWeight > b.guideWeight) {
                        //先按事项排序
                        return true;
                    } else if (a.guideWeight == b.guideWeight) {
                        //先按事项排序
                        if (a.materialId == b.materialId) {
                            return a.sort > b.sort ? 1 : -1;
                        } else if (a.materialWeight > b.materialWeight) {
                            return true;
                        }
                    }
                    return false;
                });
                // this.formList.sort(function (a, b) {
                //   return (a.materialName < b.materialName) ? 1 : -1
                // }).sort(function (a, b) {
                //   if(a.materialName === b.materialName){
                //     return (a.sort > b.sort) ? 1 : -1
                //   }else{
                //     return 0
                //   }
                // })
                if (this.getSession("UserInfo") && !this.getSession("fillForm")) {
                    //如果有单点登录
                    let UserInfo = this.getSession("UserInfo");
                    if (UserInfo.zwdtswUserType == "个人") {
                        if (this.formList.length > 0) {
                            this.formList.forEach(element => {
                                //如果单点登录的用户是个人/委托代理人,则需要在自动填充委托代理人的信息（姓名，身份证类型，身份证号，移动手机号，）
                                if (element.id == 1448) {
                                    element.child[0].forEach(itemData => {
                                        switch (itemData.id) {
                                            case 1449: //委托代理人姓名
                                                itemData.data = UserInfo.zwdtswName
                                                    ? UserInfo.zwdtswName
                                                    : "";
                                                break;
                                            case 1450: //委托代理人身份证类型
                                                itemData.data = UserInfo.zwdtswCertType
                                                    ? UserInfo.zwdtswCertType
                                                    : "";
                                                break;
                                            case 1452: //委托代理人移动电话
                                                itemData.data = UserInfo.zwdtswLinkPhone
                                                    ? UserInfo.zwdtswLinkPhone
                                                    : "";
                                                break;
                                            case 1465: //委托代理人身份证号码
                                                itemData.data = UserInfo.zwdtswCertId
                                                    ? UserInfo.zwdtswCertId
                                                    : "";
                                                break;
                                        }
                                    });
                                } else if (element.synonymArray[0] == "委托代理人") {
                                    if (
                                        Array.isArray(element.child) &&
                                        element.child.length == 0
                                    ) {
                                        switch (element.synonymArray[0]) {
                                            case "委托代理人姓名": //委托代理人姓名
                                                element.data = UserInfo.zwdtswName
                                                    ? UserInfo.zwdtswName
                                                    : "";
                                                break;
                                            case "委托代理人身份证类型": //委托代理人身份证类型
                                                element.data = UserInfo.zwdtswCertType
                                                    ? UserInfo.zwdtswCertType
                                                    : "";
                                                break;
                                            case "委托代理人移动电话": //委托代理人移动电话
                                                element.data = UserInfo.zwdtswLinkPhone
                                                    ? UserInfo.zwdtswLinkPhone
                                                    : "";
                                                break;
                                            case "委托代理人身份证号码": //委托代理人身份证号码
                                                element.data = UserInfo.zwdtswCertId
                                                    ? UserInfo.zwdtswCertId
                                                    : "";
                                                break;
                                        }
                                    } else if (
                                        Array.isArray(element.child[0]) &&
                                        element.child[0].length > 0
                                    )
                                        element.child[0].forEach(itemData => {
                                            switch (itemData.synonymArray[0]) {
                                                case "委托代理人姓名": //委托代理人姓名
                                                    itemData.data = UserInfo.zwdtswName
                                                        ? UserInfo.zwdtswName
                                                        : "";
                                                    break;
                                                case "委托代理人身份证类型": //委托代理人身份证类型
                                                    itemData.data = UserInfo.zwdtswCertType
                                                        ? UserInfo.zwdtswCertType
                                                        : "";
                                                    break;
                                                case "委托代理人移动电话": //委托代理人移动电话
                                                    itemData.data = UserInfo.zwdtswLinkPhone
                                                        ? UserInfo.zwdtswLinkPhone
                                                        : "";
                                                    break;
                                                case "委托代理人身份证号码": //委托代理人身份证号码
                                                    itemData.data = UserInfo.zwdtswCertId
                                                        ? UserInfo.zwdtswCertId
                                                        : "";
                                                    break;
                                            }
                                        });
                                }
                            });
                        }
                    } else if (UserInfo.zwdtswUserType == "法人") {
                        this.formList.forEach(element => {
                            //如果单点登录的用户是法人,则需要在自动填充法人基本信息（公司名称，法人代表姓名，统一社会信用代码）
                            if (element.synonymArray[0] == "企业名称") {
                                element.data = UserInfo.zwdtswLawPerson;
                            } else if (element.synonymArray[0] == "信用代码") {
                                element.data = UserInfo.zwdtswCreditCode;
                            } else if (element.synonymArray[0] == "法定代表人姓名") {
                                element.data = this.getSession("CertThumbnailImgInfo")[
                                    "企业法人"
                                ];
                            } else if (element.synonymArray[0] == "住所") {
                                if (this.getSession("CertThumbnailImgInfo")["地址"]) {
                                    element.data = this.getSession("CertThumbnailImgInfo")[
                                        "地址"
                                    ];
                                } else if (this.getSession("CertThumbnailImgInfo")["住所"]) {
                                    element.data = this.getSession("CertThumbnailImgInfo")[
                                        "住所"
                                    ];
                                }
                            }
                        });
                    }
                }
                if (this.formList.length > 0) {
                    this.formList.forEach(element => {
                        if (Array.isArray(element.child) && element.child.length > 0) {
                            element.child[0].sort(function (a, b) {
                                return a.sort > b.sort ? 1 : -1;
                            });
                        }
                    });
                }
                // 加入异步队列 然后进行data处理
                setTimeout(() => {
                    // 如果本地存有数据则便利替换
                    if (this.getSession("fillForm")) {
                        this.formList.forEach((res, index) => {
                            this.getSession("fillForm").forEach(element => {
                                if (res.id === element.id) {
                                    this.formList.splice(index, 1, element);
                                    // 替换值
                                }
                            });
                        });
                    }
                    this.$refs.mychild.handleData();
                }, 0);
            }
        },
        // 直接跳到下一页
        goGenerate() {
            this.$router.push("/generate");
        },
        // 保存草稿
        saveDraft() {
            let fillForm = this.formList;
            this.setSession("fillForm", this.formList);
            if (fillForm.length > 0) {
                fillForm.forEach(element => {
                    if (element.synonymArray[0] == "企业名称") {
                        this.companyName = element.data;
                    }
                    if (element.synonymArray[0] == "委托代理人") {
                        this.trustee = element.data;
                    }
                    if (this.trustee) {
                        if (Array.isArray(element.child) && element.child.length > 0) {
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
            }
            let data = {
                state: "0",
                // draftCode: '',
                // phone:this.getSession('userInfo').phone,
                formPage: 3,
                phone: "13217051910",
                idCard: this.getSession("userId"),
                // idCard:'362204199607032465',
                code: "",
                companyName: this.companyName,
                trustee: this.trustee,
                themeId: this.getSession("themeId"),
                form_detail: {
                    subject: this.getSession("subject"),
                    business: this.getSession("business"),
                    fillForm: this.getSession("fillForm")
                },
                htmls: "",
                id: this.getSession("draftId") ? this.getSession("draftId") : null
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
        },
        // 递归数组
        filterIndex(origin, list) {
            if (Array.isArray(list) && list.length > 0) {
                list.forEach(e => {
                    if (e.children.length > 0) {
                        this.filterIndex(origin, e.children);
                    }
                    if (e.data || e.dataArray.length > 0) {
                        origin.push(e);
                    }
                });
            }
        },
        // 将children 拆开
        filterChildren(jsonList) {
            let list =
                jsonList == undefined ? [] : JSON.parse(JSON.stringify(jsonList));
            if (Array.isArray(list) && list.length > 0) {
                list.forEach(e => {
                    this.filterIndex(list, e.children);
                });
            }
            if (!list) {
                list = [];
            }

            return list;
        },
        // 填报须知
        showPop() {
            this.$popup({
                content: this.descipt,
                num: "2232323232323,32323232323233",
                type: 5,
                click: () => {
                    // 如果同意则保存状态
                    this.setSession("isAgree", "1");
                },
                cancle: () => {
                    // 如果是预办件进来
                    // 如果是预办件进来
                    if (this.getSession("isSkip") == 1) {
                        this.$router.push({
                            path: "/subject"
                        });
                    } else {
                        this.$router.push({
                            path: "/business"
                        });
                    }
                }
            });
        },
        // 下一步 判断正则 保存数据 最后跳转
        fourStep1() {
            // 取消必填 ，测试用
            this.formList.forEach(element => {
                if (element.hide === true) {
                    // alert(2)
                    element.data = "";
                    element.dataArray = [];
                }
            });
            this.setSession("fillForm", this.formList);
            this.$router.push("/generate");
        },
        fourStep() {
            // 取消必填 ，测试用
            // this.formList.forEach(element => {
            //     if(element.hide === true){
            //       // alert(2)
            //       element.data = ""
            //       element.dataArray = []
            //     }
            //   })
            console.log('11111111111')
            this.setSession("fillForm", this.formList);
            //  this.$router.push('/generate')
            this.$refs.mychild.check();
            if (this.$store.state.fill === 0) { //如果校验通过，必填的均已填写
                this.formList.forEach(element => {
                    if (element.hide === true) {
                        // alert(2)
                        element.data = "";
                        element.dataArray = [];
                    }
                });
                this.setSession("fillForm", this.formList);
                this.$router.push("/generate");
            } else { //存在必填项的未填写
                this.$message({
                    message: "请填写完整信息",
                    type: "warning"
                });
            }
        },
        // 返回可能出现没有父子判断的情况 需要注意判断
        goHistory() {
            if (
                this.getSession("business") &&
                this.getSession("business").length === 0 &&
                this.getSession("subject") &&
                this.getSession("subject").length !== 0
            ) {
                this.$router.push("/subject");
            } else if (
                this.getSession("subject") &&
                this.getSession("subject").length === 0
            ) {
                this.$router.push("/");
            } else {
                this.$router.push("/business");
            }
        }
    }
};
</script>
<style>
.page-bg .el-button--warning {
    background-color: #cbb486 !important;
}
.page-bg .el-button--info {
    background-color: #717e87 !important;
}
.five-content .el-checkbox__label {
    color: #666666;
}
.five-content .is-checked .el-checkbox__label {
    color: #cbb486;
}

.five-content .el-checkbox__input.is-checked .el-checkbox__inner,
.five-content .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #cbb486;
    border-color: #cbb486;
}
.five-content .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #cbb486 !important;
}
</style>
<style lang="scss" scoped>
.five-content .supermarket {
    padding: 10px 20px;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 2;
    // background-color: #ff0000;
    box-shadow: 0px 0px 7px 0px rgba(154, 112, 50, 0.1);
}
.content_descipt {
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.content-container {
    position: relative;
}
.toggle {
    float: right;
    color: #cbb486;
    cursor: pointer;
}
.ytable1 {
    // padding: 20px;
}
.nowLi3 {
    background-image: url("../../assets/img/leftselect.png");
}
.bos {
    // position: relative;
    // margin: 0% 11% 0 22%;
    // width: 67%;
    // border-radius: 10px;
    // background-color: #e5e9ee;
}
.scorll_content {
    /*max-height: 364px !important;*/
    /*height: 95% !important;*/
}
.is_content {
    box-sizing: border-box;
}
.scrollboxs {
    width: 10px;
    position: absolute;
    top: 20px;
    right: 12px;
    z-index: 0;
    background-color: rgba(248, 248, 255, 0.1);
    height: 700px;
    border-radius: 50px;
}
#scrollbtn1 {
    width: 100%;
    height: 200px;
    margin: 0 auto;
    position: relative;
    cursor: pointer;
    padding: 2px 0;
}
.div {
    background-image: -ms-linear-gradient(#00e6ec, #01e2c7, #01dfa7);
    background-image: -webkit-linear-gradient(#00e6ec, #01e2c7, #01dfa7);
    // background-color:rgba(1, 226, 194, 1);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00e6ec', endColorstr='#01dfa7');
    // filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=red, endColorstr=blue,GradientType=1 );
    position: absolute;
    width: 10px;
    /*height:100%;*/
    border-radius: 10px;
}
</style>

<style lang="scss" scoped>
.qx-icon {
    color: #ab8f56;
    font-size: 30px;
}

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
    }
}
.qx-content {
    // color: #999;
}
</style>
