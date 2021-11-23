<template>
  <div class="main-container" id="home">
    <!-- 搜索框 -->
    <!-- 三个导航 -->

    <div class="page-view">
      <div class="nav-box">
        <div class="nav-bar">
          <div class="nav-bar-body">
            <!-- <img class="logo-img" src="../assets/img/logo.png" alt /> -->
            <div class="nav-list">
              <div
                :class="['nav-item', { active: navActive == '0' }]"
                @click="navActive = '0'"
              >
                全部
                <i
                  class="icon el-icon-caret-bottom"
                  v-if="navActive == '0'"
                ></i>
              </div>
              <div
                :key="item.key"
                v-for="item in navs"
                :class="['nav-item', { active: navActive == item.key }]"
                @click="navActive = item.key"
              >
                {{ item.value }}
                <i
                  class="icon el-icon-caret-bottom"
                  v-if="navActive == item.key"
                ></i>
              </div>
            </div>
            <div
              class="user-box"
              @click="handerAdmin"
              v-if="$route.path === '/'"
            >
              <img src="/img/grzx.png" alt />
              <span>个人中心</span>
            </div>
          </div>
        </div>
        <div class="sub-nav-list" v-if="subNav && subNav.length > 0">
          <div
            :class="['sub-nav-item', { active: navSubActive == item.key }]"
            @click="navSubActive = item.key"
            v-for="item in subNav"
            :key="item.key"
          >
            <div class="sub-nav-item-title">
              <span class="title-text">{{ item.value }}</span>
            </div>
            <i class="icon el-icon-minus"></i>
          </div>
        </div>
      </div>
      <div class="bg-img-box">
        <!-- 个人 -->

        <!-- <div
                    class="bg-img-bx"
                    v-if="navActive=='1'"
                    style="background-image: url(/img/b5.png);"
                ></div>-->
        <img class="bg-img" src="/img/b5.png" v-if="navActive == '1'" alt />
        <!-- 企业 -->
        <!-- <div
                    class="bg-img-bx"
                    v-if="navActive=='2'"
                    style="background-image: url(/img/b5.png);"
                ></div>-->
        <img class="bg-img" src="/img/b5.png" v-if="navActive == '2'" alt />

        <!-- 全部 -->
        <!-- <div
                    class="bg-img-bx"
                    v-if="navActive=='0'"
                    style="background-image: url(/img/b6.png);"
                ></div>-->
        <img class="bg-img" src="/img/b6.png" v-if="navActive == '0'" alt />
      </div>
      <div class="card-panel" style="padding-top:30px">
        <div class="nav-card-list">
          <div class="card-list">
            <div class="card-item" v-for="item in subList" :key="item.id">
              <div class="nav-card">
                <div class="nav-card-line"></div>
                <div class="fex-box">
                  <div
                    :class="[
                      'fex-box-title',
                      { empty: !item.closingTimeLimit }
                    ]"
                  >
                    <span>{{ item.closingTimeLimit }}</span>
                  </div>
                  <div class="fex-box-btns">
                    <div
                      class="fex-box-btn"
                      style="color:#fdab4d"
                      @click="openGuide(item)"
                    >
                      <img src="/img/btn-2.png" alt />主题解读
                    </div>
                    <div
                      class="fex-box-btn"
                      style="color:#fbc95e"
                      @click="openInfo(item)"
                    >
                      <img src="/img/btn-1.png" alt />立即办理
                    </div>
                  </div>
                </div>
                <div class="title">{{ item.themeName }}</div>
                <div class="icon-box">
                  <div
                    class="icon"
                    :style="`background-image: url(${item.logo});`"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 区府版本 -->
    <WebFooter class="margin20" />
  </div>
</template>
<script src="./home.js"></script>
<style scoped lang="scss">
@import "home2.scss";
</style>

<style lang="scss">
@import "home.scss";
</style>
