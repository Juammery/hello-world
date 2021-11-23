<template>
    <div class="page-bg wrapper">
        <div class="router-view-panel">
            <router-view class="router-view" />
        </div>
        <!-- 区府版本 -->
        <div class="mains">
            <iframe
                class="customHeader_iframe"
                scrolling="no"
                src="http://zwdt.sh.gov.cn/zwdtSW/dphead/foot/foot.html"
                style="margin-top:30px"
            ></iframe>
        </div>
        <ToTop></ToTop>
    </div>
</template>
<script>
import affix from "../FillForm/affix";
import ToTop from "../../components/ToTop";



export default {
    name: "app",
    components: { affix, ToTop },
    computed: {
        navList() {
            return this.list.filter(el => el.show);
        },
        isShowNav() {
            let path = this.$route.path;
            let hideMap = ['/warn'];

            return hideMap.indexOf(path) < 0;
        }
    },
    data() {
        return {
            navStyle: {
                // width:'200px',
                // height:'400px',
                // position: 'fixed',
                // left: 0,
                // top:'50%',
                // transform: 'translateY(-50%)'
            },
            list: [
                {
                    name: "主要情形",
                    check: false,
                    checkname: "/subject",
                    router: "/subject",
                    show: true
                },
                {
                    name: "补充情形",
                    check: false,
                    checkname: "/business",
                    router: "/business",
                    show: true
                },
                {
                    name: "表单填写",
                    check: false,
                    checkname: "/fillform",
                    router: "/fillform",
                    show: true
                },
                {
                    name: "材料清单",
                    check: false,
                    checkname: "/generate",
                    router: "/generate",
                    show: true
                },
                {
                    name: "配送方式",
                    check: false,
                    checkname: "/logistics",
                    router: "/logistics",
                    show: false
                }
            ]
        };
    },
    created() {

        // let winHeight='625px'
        // if (window.innerHeight)
        //     winHeight = window.innerHeight;
        // else if ((document.body) && (document.body.clientHeight))
        //     winHeight = document.body.clientHeight;
        // this.navStyle.top= (winHeight-280)/2+'px'


        this.path = this.$route.path;
        if (Array.isArray(this.list) && this.list.length > 0) {
            this.list.forEach(element => {

                if (element.checkname === this.$route.path) {
                    element.check = true;
                    element.show = true;
                } else {
                    element.check = false;
                }
            });
        }
    },
    mounted() {

    },
    beforeDestroy() {
    },
    methods: {

        // 提交
        submit() { },
        // 查看
        handleClick() { },
        // 确认
        handlerPrint() { },
        // 打印
        handlerPrint() { },
        goIndexPage(route) {
            // console.log(route)
            // this.$router.push(route);
            // console.log('ddd',route,this.setSession("subject"))
            if (
                Array.isArray(this.getSession("subject")) &&
                this.getSession("subject").length > 0
            ) {
                this.$router.push(route);
            }
        }
    },
    watch: {
        "$route.path": function (newVal, oldVal) {
            this.path = newVal;
            if (Array.isArray(this.list) && this.list.length > 0) {
                this.list.forEach(element => {
                    console.warn('================');
                    console.warn(element.checkname == newVal);
                    console.warn(`'${element.checkname}'`, `'${newVal}'`);
                    console.warn('================');
                    if (element.checkname.toLowerCase() === newVal.toLowerCase()) {
                        element.check = true;
                    } else {
                        element.check = false;
                    }
                    if (this.$route.path !== "/logistics" && element.name == "配送方式") {
                        element.show = false;
                    } else {
                        element.show = true;
                    }
                });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.nav {
    width: 200px;
    // height: 200px;
    // position: fixed;
    position: absolute;
    padding-top: 50px;
    // top: calc(50vh - 100px);
    // top: 400px;
    left: 0;
    // background: #fffaf1;
}
.wrapper {
    width: 100%;
    min-height: 100%;
}

.content-container {
    position: relative;
    .toggle {
        position: absolute;
        bottom: 0px;
        right: 0px;
        color: #cbb486;
        cursor: pointer;
    }
}
.ytable1 {
    padding: 20px;
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
.bos {
    position: relative;
    width: 75%;
    margin: 0 21%;
    overflow: hidden;
}
.is_content {
    width: 97%;
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
    height: 100%;
    border-radius: 10px;
}

.customFooter_iframe {
    border: none;
    width: 100%;
    height: 150px;
    overflow: scroll;
}
.common-content {
    width: 1190px;
}
// 新的样式 2020-11-6

.page-bg {
    background-color: #fffaf1;
    position: relative;
    z-index: 1;
    .home-panel {
        cursor: pointer;
        padding: 20px;
        display: flex;
        align-items: center;

        .home-icon {
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
}

.router-view-panel {
    margin: 0 auto;
    padding: 5px 0;
    max-width: 1000px;
    box-sizing: border-box;
}
@media screen and (max-width: 1300px) {
    .router-view-panel {
        margin-right: 0;
        margin-left: 150px;
        box-sizing: border-box;
    }
}

.router-view {
    box-sizing: border-box;
    z-index: 2;
    margin: 0 15px;
    margin-top: 20px;
}
.nav-list {
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
</style>
