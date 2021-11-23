<!--办事主题-->
<template>
  <div class="admin-content">
    <ul class="admin-title">
      <li
        v-for="(item, index) in headList"
        :key="index"
        :class="islight == index ? 'light-title' : ''"
        @click="switchState(index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="table">
      <!-- 搜索 -->
      <div style="padding: 15px 20px 15px " class="search">
        <el-input
          v-model="themeName"
          placeholder="请输入主题名称"
          style="width:200px"
        ></el-input>
        <button @click="getTableData" class="search-btn">搜索</button>
      </div>
      <el-table
        class="table-content table"
        v-loading="loading"
        :data="tableData.records"
        border
        style="width: 1000px;min-height: 100px;max-height:370px;overflow-y: scroll;"
      >
        <el-table-column prop="name" label="主题名称" align="center">
        </el-table-column>
        <!--            <el-table-column prop="preliminaryCode" label="状态" align="center">-->
        <!--                <template slot-scope="scope">-->
        <!--                    <p v-if="scope.row.preliminaryCode==0">待完善</p>-->
        <!--                    <p v-else-if="scope.row.preliminaryCode==1">已完成</p>-->
        <!--                </template>-->
        <!--            </el-table-column>-->
        <el-table-column
          prop="updateTime"
          label="办事日期"
          align="center"
        ></el-table-column>
        <el-table-column label="交件方式" align="center">
          <template slot-scope="scope">
            {{ is_window_processName[scope.row.is_window_process] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click="editClick(scope.row, 0)"
              type="text"
              class="container-button"
              >详情</el-button
            >
            <el-button
              @click="showStatus(scope.row)"
              type="text"
              class="container-button"
              >进度</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="status">
        <el-dialog
          width="60%"
          title="事项清单"
          v-if="showProgressStatus"
          :visible.sync="showProgressStatus"
          append  -to-body
        >
          <!-- 搜索 -->
          <p style="margin-bottom:10px;font-size:1.1rem;">
            <span style="font-size:30px;color:#cbb486;font-weight: 700;">·</span
            >当前主题办件进度:<span style="color:#cbb486;">{{
              themeStatus
            }}</span
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <span style="color:#cbb486;">{{ currentThemeName }}</span>
            &nbsp;&nbsp;主题编码：<span>{{ themeCode }}</span>
          </p>
          <el-table
            class="table-content table"
            v-loading="loading"
            :data="mattersStatusData"
            border
            style="width: 1000px;min-height: 100px;max-height:370px;overflow-y: scroll;"
          >
            <el-table-column prop="itemName" label="事项名称" align="center">
            </el-table-column>
            <el-table-column
              prop="status"
              label="事项状态"
              align="center"
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <template>
                <el-button
                  @click="showDetail"
                  type="text"
                  class="container-button"
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </div>
    <div class="block" style="margin-top: 20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableData.current"
        :page-sizes="[10, 20]"
        :page-size="tableData.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
// 办事进度
import { initProgress, getProgressStatus } from "@/api/admin.js";
export default {
  data() {
    return {
      loading: true,
      islight: "1", //顶部的进度
      keyWord: "", //关键词
      themeName: "", //主题名称搜索
      currentThemeName: "",
      themeCode: "1111111111111",
      themeStatus: "审核中",
      mattersStatusData: [],
      showProgressStatus: false,
      headList: [
        {
          name: "办事主题"
        }
        // {
        //   name: "已完成"
        // },
        // {
        //   name: "进行中"
        // }
      ],
      is_window_processName: {
        1: "综窗交件",
        2: "自助机交件"
      },
      tableData1: {
        records: [
          {
            createDate: "开饭店",
            preliminaryCode: "1",
            phone: "2015",
            showChild: false,
            child: [
              {
                createDate: "食品",
                preliminaryCode: "1",
                phone: "2015"
              },
              {
                createDate: "食品2",
                preliminaryCode: "1",
                phone: "2015"
              },
              {
                createDate: "食品3",
                preliminaryCode: "1",
                phone: "2015"
              }
            ]
          },

          {
            createDate: "开食堂",
            preliminaryCode: "1",
            phone: "2015",
            child: "3"
          }
        ],
        current: 1,
        size: 10,
        total: 0
      },
      tableData: {
        records: [],
        current: 1,
        size: 10,
        total: 0
      }
    };
  },
  methods: {
    showMore(row) {
      //   寻找当前元素的下标
      let rowIndex = "";
      this.tableData.records.forEach((element, index) => {
        if (element.createDate == row.createDate) {
          rowIndex = index;
        }
      });
      if (row.showChild) {
        let length = row.child.length;
        this.tableData.records.splice(rowIndex + 1, length);
        row.showChild = !row.showChild;
      } else {
        for (let j in row.child) {
          this.tableData.records.splice(rowIndex + 1, 0, row.child[j]);
        }
        row.showChild = !row.showChild;
      }
    },
    //   改变顶部的状态
    switchState(state) {
      this.islight = state;
    },
    // 改变参数
    handleSizeChange(val) {
      this.tableData.size = val;
      this.getTableData();
    },
    // 改变当前页
    handleCurrentChange(val) {
      this.tableData.current = val;
      this.getTableData();
    },
    seeClick(index) {
      this.$popup({
        content:
          "<食品经营许可>,<公众聚集场所使用安全或开业的时候的消防安全哈哈哈哈哈哈哈哈哈哈或>",
        num: "2232323232323,32323232323233",
        type: "1",
        click: () => {
          // 点击按钮事件
          console.log(121212);
        }
      });
    },
    goToFillFormPage() {
      this.$router.push("/fillform");
    },
    goToGeneratePage() {
      this.$router.push("/generate");
    },
    editClick(item, flag) {
      this.setSession("subjectFormList", "");
      this.setSession("isProgress", 1);
      this.setSession("themeId", item.themeId);
      // this.getSession("subject_topic").forEach(subject => {
      //   if (subject.themeName == item.name) {
      //     this.setSession("themeId", subject.id);
      //   }
      // });
      // this.setSession('themeId',item.themeId)
      this.setSession("themeName", item.name);
      let storageData = JSON.parse(item.formDetail);
      if (storageData.hasOwnProperty("subject")) {
        this.setSession("subject", storageData.subject);
      }
      // this.setSession('subject',JSON.stringify(storageData.subject))
      if (storageData.hasOwnProperty("business")) {
        this.setSession("business", storageData.business);
      }
      if (storageData.hasOwnProperty("fillForm")) {
        this.setSession("fillForm", storageData.fillForm);
      }
      if (flag === 0) {
        this.goToFillFormPage();
      } else {
        this.goToGeneratePage();
      }
    },

    showStatus(item) {
      this.$popup({
        content:
          "您可以通过收件凭证右上角的二维码查询办件进度，或者通过一网通办的个人主页查询办件进度。",
        type: 4,
        click: () => {
          // 点击按钮事件 回到首页
        }
      });

      // this.currentThemeItem = item;
      // if (item.is_window_process == 2) {
      //   //自助机交件
      //   this.showProgressStatus = true;
      //   this.currentThemeName = item.name;
      //   this.themeCode = item.code;
      //   this.$nextTick(() => {
      //     getProgressStatus(item.code).then(res => {
      //       if (res.data.code === 0) {
      //         this.themeStatus = res.data.data.status;
      //         this.mattersStatusData = res.data.data.itemStatus;
      //         // console.log(
      //         //   "当前自助机办件的进度为：",
      //         //   this.themeStatus,
      //         //   this.mattersStatusData
      //         // );
      //       }
      //     });
      //   });
      // } else {
      //   this.$popup({
      //     content:
      //       "您可以通过收件凭证右上角的二维码查询办件进度，或者通过一网通办的个人主页查询办件进度。",
      //     type: 4,
      //     click: () => {
      //       // 点击按钮事件 回到首页
      //     }
      //   });
      // }
    },
    showDetail() {
      this.editClick(this.currentThemeItem, 1);
      this.$router.push("/generate");
    },
    getTableData() {
      this.$nextTick(() => {
        let idCard = "";
        if (this.getSession("UserInfo").zwdtswUserType == "个人") {
          idCard = this.getSession("UserInfo").zwdtswCertId;
        }
        this.loading = true;
        initProgress(
          this.themeName,
          idCard,
          this.tableData.size,
          this.tableData.current
        ).then(res => {
          this.loading = false;
          this.tableData = res.data;
        });
      });
    }
  },
  created() {
    this.getTableData(this.tableData.size, this.tableData.current);
  }
};
</script>

<style lang="scss" scoped>
.admin-content .search .el-input__inner {
  border: 1px solid #cbb486;
}
.search-btn {
  border: none;
  width: 5rem;
  outline:none;
  padding: 6px 4px;
  background-color: #cbb486;
  color: white;
  margin-left: 20px;
  border-radius: 15px;
  cursor: pointer;
}
.table-content::-webkit-scrollbar {
  display: none;
}
// 
.table-content {
    -ms-scroll-chaining: chained;
    -ms-overflow-style: none;
    -ms-content-zooming: zoom;
    -ms-scroll-rails: none;
    -ms-content-zoom-limit-min: 100%;
    -ms-content-zoom-limit-max: 500%;
    -ms-scroll-snap-type: proximity;
    -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
    -ms-overflow-style: none;
    overflow: auto;
}

.admin-content {
  .el-button--primary {
    background-color: #cbb486;
  }
  color: #282828;
  width: 70%;
  float: right;
  margin: 10px 10% 0 0;
  max-height: 560px;
  min-height: 560px;
  border-radius: 10px;
  background-image: url("../../assets/img/box3.png");
  background-size: 100% 101%;
  background-repeat: no-repeat;
  padding: 15px 10px;
  .admin-title {
    padding: 20px 0px;
    height: 20px;
    border-bottom: 2px solid #cbb486;
    color: #cbb486;
    font-weight: bold;
  }
  .admin-title li {
    float: left;
    font-size: 20px;
    padding: 0px 20px;
    /*color: #fff;*/
  }
  .light-title {
    color: #cbb486 !important;
    text-decoration: underline;
  }
}
</style>
<style lang="scss">
.table-content::-webkit-scrollbar {
  display: none;
}
.status .el-dialog {
  background: #e4e9ef !important;
}
 .el-dialog__body {
  padding-top: 10px !important;
}
.el-table td,
.el-table th.is-leaf,
.el-table--border,
.el-table--group {
  border-color: #CD9E57;
  background-color: transparent;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  /*background-color: #444;*/
  background-color: transparent;
}
td {
  padding: 0 !important;
}
.el-table thead,
.el-table {
  color: #444;
}

.status .el-dialog__title {
  color: #cbb486 !important;
  display: block;
  font-weight: 700;
  padding-bottom: 4px;
  border-bottom: 2px solid #cbb486;
}
</style>
