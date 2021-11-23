
<template>
    <div class="three-content business_boss new-panel">
        <home-top current-page="补充情形"></home-top>
        <div class="scorll_content form-panel">
            <div v-if="!noInput" class="is_content">
                <!-- 餐饮服务 -->
                <div class="ytable1 mt20 container scene-judge">
                    <div v-for="(item, index) in tableData" :key="index">
                        <form-item :item="item" :index="index" :ref="`Form${index}`"></form-item>
                        <!-- <el-form :ref="`Form${scope.$index}`" :model="scope.row" label-position="left" class="three-form"  :rules="scope.row.rule" >
          
              <el-form-item :prop="scope.row.type === 2 ? 'dataArray' : 'data'">
                <el-radio-group v-model="scope.row.data" :disabled="getDisable(scope.row.name)" v-if="scope.row.type === 1">
                  <el-radio :label="check.name" v-for="(check,index) in scope.row.choice" :key="index"></el-radio>
                </el-radio-group>
            
                <el-checkbox-group v-model="scope.row.dataArray" :disabled="getDisable(scope.row.name)" v-if="scope.row.type === 2">
                  <el-checkbox :label="check.name" :name="check.name" v-for="(check,index) in scope.row.choice" :key="index"></el-checkbox>
                </el-checkbox-group>
              
                <el-input v-model="scope.row.data" :disabled="getDisable(scope.row.name)" v-if="scope.row.type === 3"></el-input>
                <div class="el-form-item__error" v-if="getStatusForm(scope.row.name)">
                  至少需要一项
                </div>
              </el-form-item>
                        </el-form>-->
                    </div>
                </div>
            </div>
            <div v-if="noInput" class="empty-box">
                <div class="title" @click="next()">
                    暂无需填报的内容,将在
                    <span style="color:#f00">{{timeCount}}s</span>
                    后进入下一页（跳过）
                </div>
            </div>
        </div>

        <div class="nuxt-btn-panel">
            <div class="nuxt-btn" @click="threeStep">上一步</div>
            <div class="nuxt-btn" @click="next" v-if="showNext">下一步</div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
import { ruleDataArr, ruleData } from "../FillForm/options.js";
import formItem from "@/components/formItem.vue";
import homeTop from "@/components/common/homeTop.vue";
// import { getFrontSecondJudges } from "@/api/business.js";
import { skipContent } from "@/components/common/skipWay.js";
import data from "../FillForm/data";

export default {
    name: "app",
    components: {
        formItem,homeTop
    },
    data() {
        return {
            // showNext:false,
            showNext: true,
            tableData: [],
            // 标记数组
            spanArr: [],
            pos: 0,
            // 跳转的倒计时
            timeCount: 3,
            // 是否不需要填写
            noInput: false,
            nextTime: null,
        };
    },
    created() {
        // 获取表单
        this.getForm();
    },

    beforeDestroy() {
        this.clearTime();
    },
    mounted() {
        let dom = document.getElementById("app");
        dom.scrollTo(0, 0);
        // 检查是否填满
        //  this.intervalId =  setInterval(() => {
        //  let num = this.isFill()
        //    if(num == 0){
        //      this.showNext = true
        //    }else{
        //      this.showNext = false
        //    }
        //  }, 1000);
    },
    methods: {
        // 修改主体业态
        threeStep() {
            this.$router.push("/subject");
        },
        // 递归数组
        filterIndex(origin, list) {
            if (list.length > 0) {
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
        filterChildren(arr) {
            let list = arr ? JSON.parse(JSON.stringify(arr)) : [];
            if (list.length > 0) {
                list.forEach(e => {
                    this.filterIndex(list, e.children);
                });
            }
            return list;
        },
        nextInit() {
            this.startTime();
            // if (!data.getData()) {
            //   data.preHttp();
            // }
        },
        startTime() {
            this.timeCount = 3;
            this.clearTime();
            this.nextTime = setInterval(() => {
                this.timeCount--;
                if (this.timeCount <= 0) {
                    this.clearTime();
                    this.next();
                }
            }, 1000);
        },
        clearTime() {
            clearInterval(this.nextTime);
        },

        // 获取表单数据
        getForm() {
            sessionStorage.removeItem("isSkip");
            // let business = this.getSession("business"); //如果本地缓存有数据，则填充上
            // let subjectList = this.filterChildren(this.getSession("subject"));
            //============请求接口 start ===============
            // getFrontSecondJudges(this.getSession("themeId"), subjectList).then(
            //     res => {
            //         this.noInput = false;
            //         if (res.data.data.length === 0) {
            //             // this.setSession("business", res.data.data);
            //             // 判断是从fiilform 回来则返回上一步
            //             // this.$router.push("/fillform");
            //             /**
            //              * 新改动，如果本页不需要填写，就倒计时跳转
            //              */
            //             this.noInput = true;
            //             // 没有当前页给她一个状态
            //             this.nextInit();
            //             this.setSession("isSkip", 1);
            //         }
            //         this.tableData = res.data.data;
            //         let business = this.getSession("business")  
            //         this.addRule(this.tableData);
            //         this.tableData.forEach((element, index) => {
            //             if (element.isChecked) {
            //                 element.titleData = [element.name];
            //             }
            //             if (business) {
            //                 business.forEach(sub => {
            //                     if (sub.id === element.id) {
            //                         this.tableData.splice(index, 1, sub);
            //                     }
            //                 });
            //             }
            //         });
            //     }
            // );
            // ===============请求补充情形Ending ===============
                    this.noInput = false;
                    this.tableData = this.getSession("frontTableData");
                    let business = this.getSession("business")  
                    this.addRule(this.tableData);
                    this.tableData.forEach((element, index) => {
                        if (element.isChecked) {
                            element.titleData = [element.name];
                        }
                        if (business) {
                            business.forEach(sub => {
                                if (sub.id === element.id) {
                                    this.tableData.splice(index, 1, sub);
                                }
                            });
                        }
                    });
        },
        // 判断是否填完
        isFill(formList) {
            // 循环每一个判断是否填写
            let num = 0;
            $.each($("form"), function (index, value) {
                // console.log($(this)[0].__vue__);
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
        // 下一步
        next() {
            let num = this.isFill(this.tableData);
            let flag = 0;
            //判断flag
            if (!num) {
                clearInterval(this.intervalId);
                let businessList = this.filterChildren(this.tableData);
                this.setSession("business", this.tableData);
                businessList.forEach((element, index) => {
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
                if (flag == 0) {
                    this.$router.push("/fillform");
                }
            }
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
<style>
.business_boss {
    /* font-family: "Microsoft YaHei UI"; */
}
.business_boss .el-radio {
    color: #666666 !important;
}
.business_boss .el-radio__input.is-checked + .el-radio__label {
    color: #666666 !important;
}
.business_boss .el-radio__input.is-checked .el-radio__inner {
    border-color: #f7d591 !important;
    background: #f7d591 !important;
}
.business_boss
    .el-form-item.is-required:not(.is-no-asterisk)
    .el-form-item__label-wrap
    > .el-form-item__label:before,
.business_boss
    .el-form-item.is-required:not(.is-no-asterisk)
    > .el-form-item__label:before {
    color: #f00;
    font-size: 18px;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    margin-left: -5px;
    font-weight: bold;
}
.business_boss
    .el-form-item.is-required:not(.is-no-asterisk)
    .el-form-item__label-wrap
    > .el-form-item__label:before,
.business_boss
    .el-form-item.is-required:not(.is-no-asterisk)
    > .el-form-item__label:before {
    color: #f00;
    font-size: 18px;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    margin-left: -5px;
    font-weight: bold;
}
.business_boss .el-form-item__label {
}
</style>
<style lang="scss" scoped>
.el-checkbox {
    color: #969798 !important;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #cbb486 !important;
}

.business_boss {
    .el-checkbox-group {
        display: inline-block;
    }
    .el-tooltip {
        color: #cbb486;
    }
    .el-table {
        background: transparent;
        color: white;
        font-size: 16px;
    }
    .bussiness {
        background-image: url("../../assets/img/leftselect.png");
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: rgba(248, 248, 255, 0.1);
    }

    h3 {
        color: #cbb486;
        display: inline-block;
    }
    .bos {
        // margin: 0% 11% 0 22%;
        // width: 67%;
    }
    .is_content {
        // width: 97%;
    }
    .scrollboxs {
        width: 10px;
        overflow: hidden;
        position: absolute;
        top: 20px;
        right: 12px;
        z-index: 0;
        background-color: rgba(248, 248, 255, 0.1);
        /*height:700px;*/
        border-radius: 50px;
    }
    .listTitle {
        color: #fff;
        margin-bottom: 5px;
    }
}
.el-checkbox__label {
    width: 350px;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

<style lang="scss" scoped>
.form-panel {
    padding: 20px;
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
.new-panel {
    // display: flex;
    // flex-direction: column;
}
.form-panel {
    flex: 1;
}
.empty-box {
    flex: 1;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // margin-top: 30px;
    padding-top: 100px;
    .title {
        color: #666;
        // font-weight: bold;
        text-align: center;
        // text-decoration: underline;
        cursor: pointer;
    }
}
</style>

