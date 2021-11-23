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
      records: [],
      // 新的======
      //一级菜单
      navs: [],
      // 一级导航当前选中项
      navActive: "0",
      // 二级菜单当前选中项
      navSubActive: "",
      //栏目
      list: []
    };
  },
  watch: {
    navActive(v) {
      localStorage.navActive = v;
      if (this.subNav && this.subNav.length > 0) {
        if (this.subNav.findIndex(el => el.key == this.navSubActive) < 0) {
          this.navSubActive = this.subNav[0].key;
        }
      }
    },
    navSubActive(v) {
      localStorage.navSubActive = v;
    }
  },
  computed: {
    activeKey: function () {
      return "" + this.activeType + "," + this.activeSecondType;
    },
    // 二级菜单
    subNav() {
      if (!this.navActive) return [];
      return this.navs
        .filter(el => el.key == this.navActive)
        .map(el => el.dictValueList)[0];
    },
    //栏目
    subList() {
      if (this.navActive == 0) {
        return this.list;
      } else {
        return this.list.filter(
          el => el.themeCategoryList.indexOf(this.navSubActive) >= 0
        );
      }
    }
  },
  created() {
    // getMatterReviewPage().then(res => {
    // getAll_map().then(allmap => {
    if (this.$route.path == "/login") {
      this.$router.push("/");
    }
  },
  mounted() {
    this.init();
  },

  methods: {
    async init() {
      await this.httpNav();
      await this.httpList();
      await this.initUser();
    },

    async httpNav() {
      if (typeof localStorage.navs != "undefined") {
        this.navs = JSON.parse(localStorage.navs);
      }

      // await this.$nextTick();
      const sortDict = function (list) {
        list.sort((a, b) => {
          return a.sort > b.sort ? 1 : -1;
        });
        list.forEach(type => {
          if (type.dictValueList && type.dictValueList.length > 0) {
            sortDict(type.dictValueList);
          }
        });
      };
      const res = await getAll_map();
      this.navs = res.data;
      sortDict(this.navs);
      localStorage.navs = JSON.stringify(this.navs);

      if (this.navs.length > 0) {
        if (typeof localStorage.navActive != "undefined") {
          this.navActive = localStorage.navActive;
        } else {
          this.navActive = '0';
        }

        if (typeof localStorage.navSubActive != "undefined") {
          this.navSubActive = localStorage.navSubActive;
        } else {
          this.navSubActive = this.navs[0].dictValueList[0].key;
        }
      }
    },
    async httpList() {
      if (typeof localStorage.homeList != "undefined") {
        this.list = JSON.parse(localStorage.homeList);
      }
      // await this.$nextTick();
      const { data: res } = await getMatterReviewPage();
      this.list = res.data;
      localStorage.homeList = JSON.stringify(this.list);
    },
    async initUser() {
      let userId = this.getSession("userId");
      let terminalCode = this.getSession("terminalCode");
      let _themeId = this.getSession("_themeId"); //登录跳转带入的主题id
      let userInfo = this.getSession("UserInfo");
      let agentIdentificationImg = this.getSession("agentIdentificationImg");
      let agentIdentification = this.getSession("agentIdentification");
      let CertThumbnailImgInfo = this.getSession("CertThumbnailImgInfo");
      let activeType = this.getSession("activeType");
      let activeSecondType = this.getSession("activeSecondType");
      let subject = this.getSession("_subject");
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
      // if (terminalCode) {
      //   this.setSession("terminalCode", terminalCode);
      // }
      if (activeType) {
        this.setSession("activeType", activeType);
      }
      if (activeSecondType) {
        this.setSession("activeSecondType", activeSecondType);
      }
      this.activeType = this.getSession("activeType")
        ? String(this.getSession("activeType"))
        : "2";
      this.activeSecondType = this.getSession("activeSecondType")
        ? String(this.getSession("activeSecondType"))
        : "21";
      if (_themeId) { //此处的主题id是跳转过来的
        let item = this.list.find(el => parseInt(el.id) == _themeId);
        if(terminalCode){ //如果是自助机
          this.openInfo(item,true);
        }else{//否则（一网通办）
          this.openInfo(item);
        }


      }
      if (Array.isArray(subject) && subject.length>0) {
        this.setSession("subject", subject);
      }
    },
    // 跳转引导页面
    openGuide(item) {
      // if (!this.getSession("UserInfo")) {
      //   window.location.replace(
      //     "https://zwdtuser.sh.gov.cn/uc/naturalUser/jump.do?redirect_uri=http%3a%2f%2f180.169.38.13%2fYWTB%2flogin%3fthemeId%3d" +
      //     item.id
      //   );
      //   return;
      // }
      if (item.isJump == 1) {
        window.open(item.jumpUrl);
      } else {
        this.setSession("themeId", item.id);
        this.setSession("themeName", item.themeName);
        let flag = false;
        if (item.deliveryMethodList.includes("2")) {
          flag = true;
        }
        this.setSession("deliveryMethodList", flag);
        this.setSession("themeType", item.themeCategoryList[0]);
        // 判断当前的主题是否法人还是个人
        if (this.getSession("themeId")) {
          this.setSession("serve", item.serverObject);

          if (!item.isCheck) {
            this.$router.push(`/guide?id=${item.id}`);
          } else {
            this.setSession("subject", []);
            this.setSession("business", []);
          }
        } else {
          if (this.getSession("terminalCode")) {
            backZf();
          } else {
            this.$router.push({ path: "/" });
          }
        }
      }
    },
    openInfo(item,termial=false) { //自助机端时flag为true，否则为false，默认为false
      // if (!this.getSession("UserInfo")) {
      //   window.location.replace(
      //     "https://zwdtuser.sh.gov.cn/uc/naturalUser/jump.do?redirect_uri=http%3a%2f%2f180.169.38.13%2fYWTB%2flogin%3fthemeId%3d" +
      //     item.id
      //   );
      //   return;
      // }
      if (item.isJump == 1) {
        window.open(item.jumpUrl);
      } else {
        this.setSession("themeId", item.id);
        this.setSession("themeName", item.themeName);
        let flag = false;
        if (item.deliveryMethodList.includes("2")) {
          flag = true;
        }
        this.setSession("deliveryMethodList", flag);
        this.setSession("themeType", item.themeCategoryList[0]);
        // 判断当前的主题是否法人还是个人
        if (this.getSession("themeId")) {
          this.setSession("serve", item.serverObject);
          if (!item.isCheck) {
            // this.$router.push("/subject");
            if(termial){
              this.$router.push("/guide?id="+item.id);
            }else{
              this.$router.push("/subject");
            }

          } else {
            this.setSession("subject", []);
            this.setSession("business", []);
          }
        } else {
          if (this.getSession("terminalCode")) {
            backZf();
          } else {
            this.$router.push({ path: "/" });
          }
        }
      }
    },
    handerAdmin() {
      if (!this.getSession("UserInfo")) {
        window.location.replace(
          "https://zwdtuser.sh.gov.cn/uc/naturalUser/jump.do?redirect_uri=http%3A%2F%2F180.169.38.13%2F%2FYWTB%2Flogin"
        );
      } else {
        this.$router.push({
          path: "/admin"
        });
      }
    }
  }
};
