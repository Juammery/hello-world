<template>
    <div class="statist">
        <div style="width:200px;height:400px" class="fl left-bar">
            <div class="nav-list">
                <div
                    :class="['nav-item',{'active':state == index}]"
                    :key="index"
                    v-for="(item, index) in list"
                    @click="state=index"
                >
                    <div class="title-box">
                        <div class="num-box">{{index+1}}</div>
                        <div class="title-text">{{item.name}}</div>
                    </div>
                    <div class="nav-line" v-if="index<list.length-1"></div>
                </div>
            </div>
        </div>

        <!-- 个人信息 -->
        <person-info v-show="state == 0"></person-info>
        <!-- 办事主题 -->
        <be-progress v-show="state == 1"></be-progress>
        <!-- 待完善办事 -->
        <be-perfect v-show="state != 0 && state != 1"></be-perfect>

        <WebFooter class="margin20" />
    </div>
</template>
<script>
import personInfo from "./personInfo.vue";
import bePerfect from "./bePerfect.vue";
import beProgress from "./beProgress.vue";
import WebFooter from "@/components/webfooter";
export default {
    components: {
        bePerfect,
        beProgress,
        personInfo,
        WebFooter
    },
    data() {
        return {
            list: [
                {
                    name: "我的信息",
                    check: false
                },
                {
                    name: "办事主题",
                    check: true
                },
                {
                    name: "待完善主题",
                    check: false
                }
            ],
            state: "0"
        };
    },
    watch: {},
    activated() {
        sessionStorage.removeItem('fillForm');
    },
    mounted() {
        sessionStorage.removeItem('fillForm');
    },
    methods: {
        changeState(index) {
            this.state = index;
        }
    },
    created() {
        sessionStorage.removeItem('fillForm');
        this.setSession("isProgress", 0);
        this.setSession("draftId", 0);
    }
};
</script>
<style lang="scss" scoped>
.statist {
    /*background-image: url("../../assets/img/bg4.png");*/
    // margin-top: 100px;
    // background-color: #f00;

    background: linear-gradient(180deg, #fffbf2 0%, #fffefc 100%);
}
.statist {
    /*padding: 35px 0px 0px 100px;*/
    padding: 5px 0 0 0;
    overflow: hidden;
    .el-input__inner {
        height: 30px;
    }
    .el-input__icon {
        height: auto;
    }
    .el-date-editor .el-range-separator {
        line-height: 20px;
    }
    .el-button {
        line-height: 6px;
    }
    .admin-content {
        width: 55%;
        float: right;
        color: #282828;
        margin: 10px 20% 30px 0;
        border-radius: 10px;
        max-height: 560px;
        min-height: 72vh;
        /*background-image: url("../../assets/img/box3.png");*/
        background: rgba($color: #fff, $alpha: 0.9);
        box-shadow: 0px 0px 15px 0px rgba(154, 112, 50, 0.26);
        // max-width: 1000px;
        background-size: 100% 101%;
        /*background-repeat: no-repeat;*/
        padding: 15px 10px;
        .admin-title {
            padding: 20px;
            height: 20px;
            border-bottom: 2px solid #3b5f8a;
        }
        .admin-title li {
            float: left;
            font-size: 20px;
            padding: 0px 20px;
            /*color: #fff;*/
            /*color: #282828;*/
        }
        .light-title {
            color: #cbb486 !important;
            text-decoration: underline;
        }
    }
    .table {
        margin-top: 30px;
    }
    .el-table {
        background-color: transparent !important;
        color: white !important;
    }
    .el-table th {
        background: transparent;
        color: white !important;
    }
    .block {
        max-width: 1200px;
        margin-top: 20px;
        text-align: right;
    }
    .el-pagination__total {
        color: white;
    }
    .el-pagination__jump {
        color: white;
    }
    .el-table__footer-wrapper tbody td {
        background: transparent;
        color: white !important;
    }
    .nowLi3 {
        /*background-image: url("../../assets/img/leftselect.png");*/
        background: #cbb486;
        color: #fff;
    }
    .nowLi3Default {
        /*background-image: url("../../assets/img/leftselect.png");*/
        background: #d8cfbe;
        color: #6f5226;
    }

    .el-dialog {
        .el-table__footer-wrapper tbody td {
            background: transparent;
            color: black !important;
        }
        .el-table th {
            background: transparent;
            color: black !important;
        }
        .el-table {
            background-color: transparent !important;
            color: black !important;
        }
        .el-table th {
            background: transparent;
            color: black !important;
        }
    }
}
.title {
    width: 650px;
    height: 30px;
    display: inline-block;
    label {
        display: inline-block;
        width: 100px;
        color: white;
    }
}
.result {
    margin-top: 20px;
}
.select {
    display: inline-block;
}
.el-button--primary {
    background-color: #18b0a6;
    border-color: #18b0a6;
}
.el-input__prefix,
.el-input__suffix {
    position: absolute;
    left: 450px;
    top: -5px;
}
.result .el-select .el-input__inner {
    width: 500px;
}
.el-scrollbar__view .el-select-dropdown__list {
    widows: 500px;
}

.statist {
    /deep/ {
        .el-table__row:hover {
            background-color: rgba(201, 201, 201, 0.411) !important;
            & > td {
                background-color: transparent !important;
                // background-color: rgba(0, 0, 0, 0.1) !important;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.nav-list {
    margin-top: 30px;
    .nav-item {
        color: #cbb486;
        padding: 0 20px;
        padding-right: 0;
        &.active {
            .title-box {
                .num-box {
                    background-color: #cbb486;
                    color: #fff;
                }
            }
        }
        .nav-line {
            height: 40px;
            background: #efcd89;
            width: 1px;
            display: block;
            position: relative;
            margin-left: 20px;
            margin-top: 5px;
            margin-bottom: 5px;
        }
        .title-box {
            display: flex;
            align-items: center;
            .num-box {
                border-radius: 100%;
                border: 1px solid #eed095;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                color: #8b614d;
                font-size: 24px;
                // font-family: FZCuHeiSongS-B-GB;
            }
            .title-text {
                color: #8b614d;
                padding: 0 10px;
            }
        }
    }
}
.bg-img {
    // position: absolute;
    right: 0;
    left: 0;
    top: 0;
    display: block;
    height: 270px;
    background-image: url("../../assets/img/bg6.jpg");
    background-size: 100%;
    background-position: center 0;
    background-repeat: no-repeat;
}
.home-panel {
    cursor: pointer;
    padding: 20px;
    display: flex;
    align-items: center;

    .home-icon {
        // background-color: #ffffff;
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border-radius: 5px;
        img {
            display: block;
            max-width: 100%;
            width: 100%;
        }
    }
    .home-title {
        color: #8b614d;
        font-size: 16px;
    }
}
</style>