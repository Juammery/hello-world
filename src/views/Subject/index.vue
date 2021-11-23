<template>
    <div class="three-content subject new-panel">
        <div class="form-panel">
            <home-top current-page="情形选择"></home-top>
            <template v-if="formList.length > 0">
                <div class="scorll_content form-panel">
                    <!-- 这个地方选择循环form表单 只循环内部item 后期判断不好做 这边使用的是ajax调取接口 所以循环表单没有什么大的问题 -->
                    <div v-for="(item, index) in formList" :key="index">
                        <form-item :item="item" :index="index" :ref="`Form${index}`"></form-item>
                    </div>
                </div>
            </template>
        </div>

        <div class="nuxt-btn-panel">
            <div class="nuxt-btn" @click="$router.push('/')">上一步</div>
            <div class="nuxt-btn" @click="next">下一步</div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";
    import formItem from "@/components/formItem.vue";
    import homeTop from "@/components/common/homeTop.vue";
    import {
        ruleDataArr,
        ruleData
    } from "../FillForm/options.js";
    import { getFrontSecondJudges } from "@/api/business.js";
    import {
        getSubject
    } from "@/api/subject";
    import {
        skipContent
    } from "@/components/common/skipWay.js";

    export default {
        name: "app",
        components: {
            formItem,
            homeTop
        },
        data() {
            return {
                showNext: false, //下一步的按钮 初始的时候灰态
                // 表单数据
                formList: [],
                themeId: this.getSession("themeId"),
                themeJudgeForm: {
                    data: "",
                    dataArray: [],
                    choiceType: 1,
                    name: ""
                }
            };
        },
        created() {
            // 获取表单内的数据
            this.getFormSubject();
        },
        mounted() {
            // 检查是否填满
            // this.intervalId =  setInterval(() => {
            // let num = this.isFill()
            //   if(num == 0){
            //     this.showNext = true
            //   }else{
            //     this.showNext = false
            //   }
            // }, 500);
            if (this.getSession("material")) {
                this.setSession("material", "");
            }
        },
        updated() {
            let dom = document.getElementById("app");
            dom.scrollTo(0, 0);
        },
        methods: {
            // 递归拿出所有的ref
            listRef() {
                console.log($("form"));
            },
            // 判断是否填完
            isFill(formList) {
                // 循环每一个判断是否填写
                let num = 0;
                $.each($("form"), function (index, value) {
                    $(this)[0].__vue__.validate(valid => {
                        if (valid) {
                            console.log("成功");
                        } else {
                            console.log("失败");
                            num++;
                            return false;
                        }
                    });
                });
                return num;
            },
            // 递归数组
            filterIndex(origin, list) {
                if (list.length > 0) {
                    list.forEach(e => {
                        if (e.children.length > 0) {
                            this.filterIndex(origin, e.children);
                        }
                        origin.push(e);
                    });
                }
            },
            // 将children 拆开
            filterChildren() {
                let list = JSON.parse(JSON.stringify(this.formList));
                list.forEach(e => {
                    this.filterIndex(list, e.children);
                });
                return list;
            },
            // 下一步
            next() {
                // 如果当前用户未登录，则跳转到一网通办进行登录，否则进入一表填报（多表合一）

                let num = this.isFill(this.formList);
                let flag = 0; //flag 标志符
                // 只要有一个不通过 则不进行跳转
                if (!num) {
                    // 在这里做判断，是否登录
                    if (!this.getSession("UserInfo")) {
                        // 如果没有登录，则先记录用户的操作数据
                        this.setSession("_subject", this.formList);
                        window.location.replace(
                            "https://zwdtuser.sh.gov.cn/uc/naturalUser/jump.do?redirect_uri=http%3a%2f%2f180.169.38.13%2fYWTB%2flogin%3fthemeId%3d" +
                            this.getSession("themeId")
                        );
                        return;
                    }

                    if (this.getSession("UserInfo").zwdtswUserType == "个人" && this.getSession("themeType") == 2) {
                        this.$popup({
                            content: '此一件事需法人申请，系统将跳转至首页，请使用电子营业执照登录进行办理。',
                            type: 9,
                            click: () => {
                                // 点击按钮事件
                                setTimeout(() => {
                                    this.$router.push('/');
                                }, 500);
                            },
                            cancle:  () => {
                                let subjectList = this.filterChildren();
                                this.setSession("subject", this.formList);
                                subjectList.forEach((element, index) => {
                                    if (element.isJump == 1) {
                                        // 遍历element的choice
                                        element.choice.forEach(ele => {
                                            if (
                                                ele.jumpType &&
                                                (element.data == ele.name ||
                                                    element.dataArray.indexOf(ele.name) > -1
                                                    )
                                            ) {
                                                flag = 1;
                                                skipContent(ele.jumpType, ele.urlOrPrompt,
                                                    ele.promptContent);
                                            }
                                        });
                                    }
                                });
                                //判断flag
                                if (flag == 0) {
                                    // this.$router.push("/business");
                                    this.getFrontData();
                                    // this.setSession('subject',this.formList)
                                }
                            }
                        });
                    } else if (this.getSession("UserInfo").zwdtswUserType != "个人" && this.getSession("themeType") ==
                        1) {
                        this.$popup({
                            content: '此一件事需个人申请，系统将跳转至首页，请使用个人账号登录进行办理。',
                            type: 9,
                            click: () => {
                                // 点击按钮事件
                                setTimeout(() => {
                                    this.$router.push('/');
                                }, 500);
                            },
                            cancle:  () => {
                                let subjectList = this.filterChildren();
                                this.setSession("subject", this.formList);
                                subjectList.forEach((element, index) => {
                                    if (element.isJump == 1) {
                                        // 遍历element的choice
                                        element.choice.forEach(ele => {
                                            if (
                                                ele.jumpType &&
                                                (element.data == ele.name ||
                                                    element.dataArray.indexOf(ele.name) > -1
                                                    )
                                            ) {
                                                flag = 1;
                                                skipContent(ele.jumpType, ele.urlOrPrompt,
                                                    ele.promptContent);
                                            }
                                        });
                                    }
                                });
                                //判断flag
                                if (flag == 0) {
                                     this.getFrontData();
                                    // this.$router.push("/business");
                                    // this.setSession('subject',this.formList)
                                }
                            }

                        });
                    } else {
                        // 判断通过后，对判断进行遍历，如果存在isJump的则进行跳转
                        let subjectList = this.filterChildren();
                        this.setSession("subject", this.formList);
                        subjectList.forEach((element, index) => {
                            if (element.isJump == 1) {
                                // 遍历element的choice
                                element.choice.forEach(ele => {
                                    if (
                                        ele.jumpType &&
                                        (element.data == ele.name ||
                                            element.dataArray.indexOf(ele.name) > -1)
                                    ) {
                                        flag = 1;
                                        skipContent(ele.jumpType, ele.urlOrPrompt, ele.promptContent);
                                    }
                                });
                            }
                        });
                        //判断flag
                        if (flag == 0) {
                            this.getFrontData();
                            // this.$router.push("/business");

                            // this.setSession('subject',this.formList)
                        }
                    }
                    // ending



                }
            },

            // 获取补充情形
            getFrontData(){
                sessionStorage.removeItem("isSkip");
                let subjectList = this.filterChildren(this.getSession("subject"));
                getFrontSecondJudges(this.getSession("themeId"), subjectList).then(
                    res => {
                        this.setSession("frontTableData", res.data.data);
                        if (res.data.data.length === 0) {
                            // this.setSession("isSkip", 1);
                            this.setSession("business", []);
                            this.$router.push("/fillform");
                            //  this.$router.push("/business");
                        }else{
                            this.$router.push("/business");
                        }
                    }
                );
            },


            // 获取表单内容
            getFormSubject11() {
                // 进来先调取接口获取父判断
                if (Array.isArray(this.getSession("subjectFormList"))) {
                    this.formList = this.getSession("subjectFormList");
                    // 循环插入判断规则 全部不能为空
                    this.addRule(this.formList);
                    let subject = this.getSession("subject");
                    this.formList.forEach((element, index) => {
                        // 如果本地存了数据 需要便利将数据上去
                        // if( element.choice.length == 1 ){
                        //   element.data = element.choice[0].name
                        //   // element.titleData = [element.name]
                        // }
                        if (subject) {
                            subject.forEach(sub => {
                                if (sub.id === element.id) {
                                    this.formList.splice(index, 1, sub); //替换缓存中的数据
                                }
                            });
                        }
                    });
                } else {
                    getSubject(this.getSession("themeId")).then(res => {
                        this.formList = res.data.data;
                        // 循环插入判断规则 全部不能为空
                        this.addRule(this.formList);
                        let subject = this.getSession("subject");
                        this.formList.forEach((element, index) => {
                            // 如果本地存了数据 需要便利将数据上去
                            // if( element.choice.length == 1 ){
                            //   element.data = element.choice[0].name
                            //   // element.titleData = [element.name]
                            // }
                            if (subject) {
                                subject.forEach(sub => {
                                    if (sub.id === element.id) {
                                        this.formList.splice(index, 1, sub); //替换缓存中的数据
                                    }
                                });
                            }
                        });
                    });
                }
            },
            //去重
            deWeight(arr) {
                for (var i = 0; i < arr.length - 1; i++) {
                    for (var j = i + 1; j < arr.length; j++) {
                        if (arr[i].id == arr[j].id) {
                            arr.splice(j, 1);
                            //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
                            j--;
                        }
                    }
                }
                return arr;
            },
            getFormSubject() {
                // 进来先调取接口获取父判断
                getSubject(this.getSession("themeId")).then(res => {
                    // this.themeJudgeForm=res.data.data
                    // let subFormList=res.data.data
                    if (
                        this.getSession("themeId") == 181 ||
                        this.getSession("themeId") == 182
                    ) {
                        res.data.data.forEach(subForm => {
                            if (
                                subForm.choiceType == 2 &&
                                Array.isArray(subForm.choice) &&
                                subForm.choice.length > 0
                            ) {
                                subForm.choice.forEach(item => {
                                    if (item.name == "营业执照") {
                                        subForm.dataArray.push(item.name);
                                    }
                                });
                            }
                        });
                    }

                    this.formList = res.data.data;
                    // 循环插入判断规则 全部不能为空
                    this.addRule(this.formList);
                    let subject = this.getSession("subject");
                    this.formList.forEach((element, index) => {
                        // 如果本地存了数据 需要便利将数据上去
                        // if( element.choice.length == 1 ){
                        //   element.data = element.choice[0].name
                        //   // element.titleData = [element.name]
                        // }
                        if (subject) {
                            subject.forEach(sub => {
                                if (sub.id === element.id) {
                                    this.formList.splice(index, 1, sub); //替换缓存中的数据
                                }
                            });
                        }
                    });
                });
            },
            // 递归放置判断
            addRule(list) {
                list.forEach(element => {
                    if (element.children) {
                        this.addRule(element.children);
                    }
                    // 循环放上字段正则
                    if (element.isRequired) {
                        switch (element.choiceType) {
                            case 2:
                                this.$set(element, "rule", ruleDataArr);
                                break;
                            default:
                                this.$set(element, "rule", ruleData);
                                break;
                        }
                    }
                    // if(element.choice instanceof Array &&  element.choice.length === 1){
                    //   if(element.type == 1){
                    //     element.data = element.choice[0].name
                    //   }else{
                    //     element.dataArray.push(element.choice[0].name)
                    //   }
                    // }
                });
            }
        }
    };
</script>
<style lang="scss">
    .subject .el-radio {
        color: #666 !important;
    }

    .subject .el-radio__input+.el-radio__label {
        // color: #F7D591 !important;
        color: #666 !important;
        padding-left: 5px !important;
    }

    // .subject .el-radio__input.is-checked + .el-radio__label {
    //   // color: #F7D591 !important;
    //   color: #666 !important;
    // }
    .subject .el-radio__input.is-checked .el-radio__inner {
        border-color: #f7d591 !important;
        background: #f7d591 !important;
    }

    .subject .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before,
    .subject .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
        // content: "*";
        // color: white;
        // margin-right: 4px;
    }

    .subject .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before,
    .subject .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
        // position: absolute;
        // left: 10px;
        // top: 1px;
        // color: white;

        color: #f00;
        font-size: 18px;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
        margin-left: -5px;
        font-weight: bold;
    }

    .subject .el-form-item__label {
        // margin-left: -20px;
    }
</style>
<style lang="scss">
    .itemName {
        display: inline-block;
        background-color: #cbb486;
        color: #fff;
        border-radius: 0 25px 25px 0;
        padding: 0 20px !important;

        span {
            color: white !important;
        }
    }

    .subject {
        .el-input {
            width: 70%;
        }

        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border-color: #f7d591 !important;
            background: #f7d591 !important;
        }

        .nowLi {
            background-image: url("../../assets/img/leftselect.png");
        }

        h3 {
            color: #05d7eb;
        }

        .three-form .el-form-item__label {
            // color: #05d7eb;
        }
    }

    .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner {
        -webkit-box-shadow: 0 0 2px 2px #cbb486;
        /* box-shadow: 0 0 2px 2px #409EFF; */
    }

    .el-radio__inner:hover {
        border-color: #cbb486;
    }
</style>
<style lang="scss" scoped>
    .clearfix {

        &:before,
        &:after {
            content: " ";
            display: table;
        }

        &:after {
            clear: both;
        }
    }

    .three-content {
        position: relative;
    }

    .form-panel {
        padding: 20px;
        padding-top: 0;
        box-sizing: border-box;
    }

    .nuxt-btn-panel {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 10px;
        padding-bottom: 30px;

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

    .form-panel {
        flex: 1;
    }

    .new-panel {
        // display: flex;
        // flex-direction: column;
    }
</style>
