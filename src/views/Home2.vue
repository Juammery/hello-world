<template>
  <div class="main-container">
    <!-- 搜索框 -->
    <!-- 三个导航 -->
    <div class="wrap-content">
      <el-tabs
        tab-position="left"
        v-model="activeType"
        @tab-click="handleChangeActiveType"
      >
        <el-tab-pane
          :label="firstType.value"
          :key="firstType.value"
          :name="firstType.key"
          v-for="firstType in category"
          class="vertical-show"
        >
          <div class="content">
            <el-tabs
              tab-position="left"
              v-model="activeSecondType"
              @tab-click="handleChangeActiveSecondType"
            >
              <el-tab-pane
                :label="secondType.value"
                :key="secondType.value"
                :name="secondType.key"
                v-for="secondType in firstType.dictValueList"
              >
                <ul v-if="records.length > 0">
                  <li class="left-btn" @click="lastPage" v-if="currentPage > 1">
                    <img
                      src="@/assets/img/page-left.png"
                      style="width: 50px;height: 50px;"
                    />
                  </li>
                  <li
                    v-for="(item, key) in records"
                    :key="key"
                    :style="
                      `width:26%;height:8.75rem;margin-bottom:4.5rem;margin-right:30px;cursor:pointer;`
                    "
                  >
                    <el-tooltip
                      class="item"
                      effect="light"
                      :content="item.themeName"
                      placement="bottom"
                    >
                      <div
                        class="content-nav"
                        :style="
                          `border-radius:0 50px 0 50px;box-shadow:0 0 8px 0 ${item.themeColor};background-image: linear-gradient(167deg,${item.themeColor}, #ffffff);`
                        "
                        @click="
                          openDetail(
                            item.id,
                            item.isCheck,
                            item.serverObject,
                            item.isJump,
                            item.jumpUrl,
                            item.themeName,
                            item.deliveryMethodList
                          )
                        "
                      >
                        <div
                          style="text-align:left;position:absolute;left:10px;top:0px;margin-top: 13px;color: #282828;font-size:1.2rem;font-family: 'Microsoft YaHei UI';"
                          class="title"
                        >
                          {{ item.themeName }}
                          <p style="font-size:10px">{{ item.description }}</p>
                        </div>
                        <div
                          :style="
                            `color:white;padding:8px 6px;position:absolute;bottom: 10px;border-radius:8px;right: 10px;background-color:${item.themeColor}`
                          "
                        >
                          马上办理
                        </div>
                      </div>
                    </el-tooltip>
                  </li>
                  <li
                    class="right-btn"
                    @click="nextPage"
                    v-if="currentPage < totalPage"
                  >
                    <img
                      src="@/assets/img/page-right.png"
                      style="width: 50px;height: 50px;"
                    />
                  </li>
                </ul>
                <ul v-else>
                  <li style="color:#fff;font-size: 20px;">
                    暂无可办理主题，敬请期待~
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- <div class="content">
          <ul>
              <li  v-for="(item,key) in topic" :key="key" :style="`width:230px;height:140px;margin-bottom: 50px;margin-right:1.5rem;`">
                  <el-tooltip class="item" effect="light" :content="item.themeName" placement="bottom">
                      <div class="content-nav" :style="`border-radius:0 50px 0 50px;box-shadow:0 0 8px 0 ${ item.themeColor };background-image: linear-gradient(167deg,${ item.themeColor }, #ffffff);`" @click="openDetail(item.id,item.isCheck,item.serverObject,item.isJump,item.jumpUrl,item.themeName,item.deliveryMethodList)">
                          <div style="text-align:left;position:absolute;left:10px;top:0px;margin-top: 13px;color: #282828;font-size:1.2rem;font-family: 'Microsoft YaHei UI';" class="title" >{{item.themeName}}
                              <p style="font-size:10px">{{item.description}}</p>
                          </div>
                          <div :style="`color:white;padding:8px 6px;position:absolute;bottom: 10px;border-radius:8px;right: 10px;background-color:${ item.themeColor }`">马上办理</div>
                      </div>
                  </el-tooltip>
              </li>
          </ul>
      </div> -->

    <!-- 区府版本 -->
    <WebFooter class="margin20" />
  </div>
</template>
<script>
import { getMatterReviewPage, getAll_map } from "@/api/index.js";
// import { getMatterReviewPage,getIndex,getCertThumbnailByUserId,getYWTBUserInfo,getCertOriginalDataByUserId } from '@/api/index.js'
import WebFooter from "../components/webfooter";
import { backZf } from "@/assets/backZF.js";
export default {
  components: { WebFooter },

  data() {
    return {
      IdCard: "",
      topic: [],
      code: "",
      terminalCode: "",
      category: [],
      activeType: "0",
      activeSecondType: "0",
      groupTopic: {},
      pageSize: 6,
      currentPage: 1,
      totalPage: 1,
      records: []
    };
  },
  watch: {},
  computed: {
    activeKey: function() {
      return "" + this.activeType + "," + this.activeSecondType;
    }
  },
  created() {
    getMatterReviewPage().then(res => {
      getAll_map().then(allmap => {
        let userId = this.getSession("userId");
        let terminalCode = this.getSession("terminalCode");
        let _themeId = this.getSession("_themeId"); //登录跳转带入的主题id
        let userInfo = this.getSession("UserInfo");
        let agentIdentificationImg = this.getSession("agentIdentificationImg");
        let agentIdentification = this.getSession("agentIdentification");
        let CertThumbnailImgInfo = this.getSession("CertThumbnailImgInfo");
        let activeType = this.getSession("activeType");
        let activeSecondType = this.getSession("activeSecondType");
        sessionStorage.clear();
        if (userId) {
          this.setSession("userId", userId);
        }
        if (userInfo) {
          this.setSession("UserInfo", userInfo);
        }
        if (agentIdentificationImg) {
          this.setSession("agentIdentificationImg", agentIdentificationImg);
        }
        if (agentIdentification) {
          this.setSession("agentIdentification", agentIdentification);
        }
        if (CertThumbnailImgInfo) {
          this.setSession("CertThumbnailImgInfo", CertThumbnailImgInfo);
        }
        if (terminalCode) {
          this.setSession("terminalCode", terminalCode);
        }
        if (activeType) {
          this.setSession("activeType", activeType);
        }
        if (activeSecondType) {
          this.setSession("activeSecondType", activeSecondType);
        }
        this.category = allmap.data;
        this.activeType = this.getSession("activeType")
          ? String(this.getSession("activeType"))
          : "2";
        this.activeSecondType = this.getSession("activeSecondType")
          ? String(this.getSession("activeSecondType"))
          : "21";
        const sortDict = function(list) {
          list.sort((a, b) => {
            return a.sort > b.sort ? 1 : -1;
          });
          list.forEach(type => {
            if (type.dictValueList && type.dictValueList.length > 0) {
              sortDict(type.dictValueList);
            }
          });
        };
        sortDict(this.category);
        this.topic = res.data.data;
        this.topic.forEach(topic => {
          if (topic.themeCategoryList[0] == "") {
            topic.themeCategoryList = ["0", "0"];
          }
          if (!this.groupTopic.hasOwnProperty(topic.themeCategoryList)) {
            this.groupTopic[topic.themeCategoryList] = [];
          }
          this.groupTopic[topic.themeCategoryList].push(topic);
        });
        if (Array.isArray(this.groupTopic[this.activeKey])) {
          this.totalPage = Math.ceil(
            this.groupTopic[this.activeKey].length / this.pageSize
          );
          this.groupTopic[this.activeKey].forEach((item, index) => {
            if (index < this.pageSize) {
              this.records.push(item);
            }
          });
        }
        this.setSession("subject_topic", this.topic);
        this.topic.sort(function(a, b) {
          return a.sort < b.sort ? -1 : 1;
        });
        if (_themeId) {
          this.topic.forEach(item => {
            if (parseInt(item.id) == _themeId) {
              this.openDetail(
                item.id,
                item.isCheck,
                item.serverObject,
                item.isJump,
                item.jumpUrl,
                item.themeName,
                item.deliveryMethodList
              );
            }
          });
        }
      });
    });
  },
  mounted() {},
  methods: {
    getUrlParam(name) {
      //获取url中的access_token参数
      //构造一个含有目标参数的正则表达式对象
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      //匹配目标参数
      var r = window.location.search.substr(1).match(reg);
      //返回参数
      if (r != null) {
        return unescape(r[2]);
      } else {
        return null;
      }
    },
    handleChangeActiveType() {
      this.currentPage = 1;
      this.setSession("activeType", this.activeType);
      this.category.forEach(item => {
        if (item.key == this.activeType && item.dictValueList.length > 0) {
          this.activeSecondType = item.dictValueList[0].key;
          this.setSession("activeSecondType", item.dictValueList[0].key);
        }
      });
      if (this.category[parseInt(this.activeType) - 1].dictValueList > 0) {
        this.activeSecondType = this.category[
          parseInt(this.activeType) - 1
        ].dictValueList[0].key;
        this.setSession(
          "activeSecondType",
          this.category[parseInt(this.activeType) - 1].dictValueList[0].key
        );
      }
      this.records = [];
      if (Array.isArray(this.groupTopic[this.activeKey])) {
        this.totalPage = Math.ceil(
          this.groupTopic[this.activeKey].length / this.pageSize
        );
        this.groupTopic[this.activeKey].forEach((item, index) => {
          if (index < this.pageSize) {
            this.records.push(item);
          }
        });
      }
    },
    handleChangeActiveSecondType() {
      this.setSession("activeType", this.activeType);
      this.setSession("activeSecondType", this.activeSecondType);
      this.currentPage = 1;
      this.records = [];
      if (Array.isArray(this.groupTopic[this.activeKey])) {
        this.totalPage = Math.ceil(
          this.groupTopic[this.activeKey].length / this.pageSize
        );
        this.groupTopic[this.activeKey].forEach((item, index) => {
          if (index < this.pageSize) {
            this.records.push(item);
          }
        });
      }
    },

    // 跳转存储ID
    openDetail(
      id,
      ischeck,
      serve,
      isJump,
      jumpUrl,
      themeName,
      deliveryMethodList
    ) {
      // 首先判断是否跳转 0 是不需要，1是需要
      if (!this.getSession("UserInfo")) {
        window.location.replace(
          "https://zwdtuser.sh.gov.cn/uc/naturalUser/jump.do?redirect_uri=http%3a%2f%2f180.169.38.13%2fYWTB%2flogin%3fthemeId%3d" +
            id
        );
      } else {
        if (isJump == 1) {
          window.open(jumpUrl);
        } else {
          this.setSession("themeId", id);
          this.setSession("themeName", themeName);
          let flag = false;
          if (deliveryMethodList.includes("2")) {
            flag = true;
          }
          this.setSession("deliveryMethodList", flag);
          // 判断当前的主题是否法人还是个人
          if (this.getSession("themeId")) {
            this.setSession("serve", serve);
            if (!ischeck) {
              this.$router.push("/warn");
            } else {
              this.setSession("subject", []);
              this.setSession("business", []);
              // this.$router.push('/fillform')
            }
          } else {
            if (this.getSession("terminalCode")) {
              backZf();
            } else {
              this.$router.push({ path: "/" });
            }
            // this.$router.push('/')
          }
        }
      }
    },

    lastPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        if (
          Array.isArray(this.groupTopic[this.activeKey]) &&
          this.groupTopic[this.activeKey].length > 0
        ) {
          this.records = [];
          this.groupTopic[this.activeKey].forEach((item, index) => {
            if (
              index > (this.currentPage - 1) * this.pageSize - 1 &&
              index < this.currentPage * this.pageSize
            ) {
              this.records.push(item);
            }
          });
        }
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPage) {
        this.currentPage++;
        if (Array.isArray(this.groupTopic[this.activeKey])) {
          this.records = [];
          this.groupTopic[this.activeKey].forEach((item, index) => {
            if (
              index > (this.currentPage - 1) * this.pageSize - 1 &&
              index < this.currentPage * this.pageSize
            ) {
              this.records.push(item);
            }
          });
        }
      }
    }
  }
};
</script>
<style scoped lang="scss">
.left-btn {
  position: absolute;
  left: 16px;
  top: calc(40vh);
}
.right-btn {
  position: absolute;
  right: 2rem;
  top: calc(40vh);
}

.title {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 1rem;
}
.wrap-content {
  width: 80%;
  margin: 0 auto;
}
.content {
  background-color: rgba(228, 233, 239, 0.4);
  width: 99%;
  /* width: 70%; */
}
// .content ul li {
//   // background-image: url("../assets/img/hotelbg.png");
// }
// .content ul li {
//   // background-image: url("../assets/img/otherbg.png");
// }
.circlePic {
  width: 80px;
  height: 80px;
  overflow: hidden;
  margin: 0 auto;
  img {
    width: 100%;
  }
}
.margin20 {
  margin-top: 60px;
}
</style>
<style lang="scss">
.el-tabs--left .el-tabs__nav-wrap.is-left::after,
.el-tabs--left .el-tabs__nav-wrap.is-right::after,
.el-tabs--right .el-tabs__nav-wrap.is-left::after,
.el-tabs--right .el-tabs__nav-wrap.is-right::after {
  width: 0px !important;
}
.wrap-content .el-tabs {
  width: 100% !important;
}
.wrap-content .el-tabs__header {
  background-color: transparent !important;
  margin-top: 10rem;
}
.wrap-content .el-tabs__nav {
  /*height: 320px;*/
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wrap-content .el-tabs__item {
  color: #0f3968;
  background-color: #fff;
  font-size: 28px;
  /*margin: 4px 0;*/
  height: 10rem;
  padding: 20px 6px;
  writing-mode: vertical-rl;
  letter-spacing: 1.5rem;
  vertical-align: middle;
}
.wrap-content .el-tabs__item {
  border-radius: 30px 30px 0 0 !important;
}
.wrap-content .el-tabs__item:last-of-type {
  border-radius: 0 0 30px 30px !important;
}
.wrap-content .el-tabs__item.is-active {
  color: #fff;
  background-color: #0f3968;
}
.el-tabs__active-bar {
  background-color: transparent;
}
.vertical-show .el-tabs__header {
  background-color: #e4e4e4 !important;
  margin: 0 !important;
  border-radius: 0 !important;
}
.vertical-show .el-tabs__nav {
  width: 150px;
  padding: 0 15px !important;
  height: 400px;
}
.vertical-show .el-tabs__item {
  color: #666666;
  background-color: #e4e4e4;
  font-size: 20px;
  margin: 14px 0 !important;
  height: 40px;
  border-radius: 0 !important;
  writing-mode: horizontal-tb;
  letter-spacing: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center;
}
.vertical-show .el-tabs__item.is-active {
  color: #0f3968;
  border-bottom: 2px solid #0f3968;
  background-color: #e4e4e4;
}
.vertical-show .el-tabs__item:last-of-type {
  border-radius: 0 !important;
}
// .vertical-show .el-tabs__content {
//   width: 50rem;
// }
.vertical-show .el-tab-pane {
  //   width: 50rem;
  height: 550px;
  position: relative;
  padding: 6rem 0 4rem 5rem;
}
.vertical-show .el-tabs--left {
  border-radius: 10px !important;
}
</style>
