<!--待完善主题-->
<template>
  <div class="admin-content">
    <ul class="admin-title">
      <li
        v-for="(item, index) in headList"
        :key="index"
        class="light-title"
        @click="switchState(index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="table">
      <!-- 搜索 -->
      <div style="padding: 0px 20px 10px;margin: 10px 0" class="search">
        <el-input
          v-model="themeName"
          placeholder="请输入主题名称"
          style="width:200px"
        ></el-input>
        <!--                    icon="el-icon-search"-->
        <button @click="getTableData" class="search-btn">搜索</button>
      </div>
      <el-table
        :data="tableData.records"
        v-loading="loading"
        border
        style="width: 1000px;min-height: 100px;max-height:370px;overflow-y: scroll;"
        class="table-content table"
      >
        <el-table-column prop="themeName" label="主题名称" align="center">
        </el-table-column>
        <!--                    <el-table-column label="状态" align="center">-->
        <!--                        <template slot-scope="scope" >-->
        <!--                            <span>{{scope.row.state}}</span>-->
        <!--                        </template>-->
        <!--                    </el-table-column>-->
        <el-table-column label="办事日期" align="center" prop="updateDate">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click="seeClick(scope.row)"
              type="text"
              class="container-button"
              >完善</el-button
            >
            <el-button
              @click="deleteClick(scope.row)"
              type="text"
              class="container-button"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 待完善
import { initAdmin, deleteDraft } from "@/api/admin.js";
export default {
  data() {
    return {
      islight: "1", //顶部的进度
      themeName: "", //主题名称，用于搜索
      headList: [
        {
          name: "待完善主题"
        }
      ],
      loading: true,
      tableData1: {
        records: [],
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
    seeClick(item) {
      this.setSession("subjectFormList", "");
      this.setSession("themeId", item.themeId);
      this.setSession("themeName", item.themeName);
      this.setSession("draftId", item.id);
      this.setSession("materialId_saveIdList", item.materialId_saveIdList);
      let flag = false;
      if (item.deliveryMethodList.includes("2")) {
        flag = true;
      }
      this.setSession("deliveryMethodList", flag);
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
      if (item.formPage === 3) {
        this.$router.push("/fillForm");
      } else {
        this.$router.push("/generate");
      }
    },
    deleteClick(item) {
      this.$confirm("此操作将删除该草稿, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          deleteDraft(item.id)
            .then(res => {
              if (res.data.data) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getTableData();
              } else {
                this.$message({
                  message: "删除失败，请稍后重试",
                  type: "error"
                });
              }
            })
            .catch(err => {
              this.$message({
                message: "删除失败，请稍后重试",
                type: "error"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    getTableData() {
      this.$nextTick(() => {
        this.loading = true;
        // let idCard = "";
        // if (this.getSession("UserInfo").zwdtswUserType == "个人") {
        //   idCard = this.getSession("UserInfo").zwdtswCertId;
        // }
        initAdmin(
          this.themeName,
          this.getSession("userId"),
          this.tableData.size,
          this.tableData.current
        ).then(res => {
          // loading.close()
          this.loading = false;
          this.tableData = res.data;
        });
      });
    }
  },
  created() {
    this.getTableData(this.tableData.size, this.tableData.current);
    this.setSession("isProgress", 0);
    this.setSession("draftId", 0);
  }
};
</script>

<style lang="scss" scoped>
.search-btn {
  border: none;
  width: 5rem;
  outline: none;
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
  width: 70%;
  float: right;
  margin: 10px 10% 0 0;
  max-height: 600px;
  min-height: 600px;
  background-image: url("../../assets/img/box3.png");
  background-size: 100% 101%;
  background-repeat: no-repeat;
  padding: 15px 10px;
  .admin-title {
    padding: 20px;
    height: 20px;
    border-bottom: 2px solid #cbb486;
    color: #cbb486;
    font-weight: bold;
  }
  .admin-title li {
    float: left;
    font-size: 20px;
    padding: 0px 0px;
    /*color: #fff*/
  }
}
</style>
<style>
.container-button span {
  color: #cbb486 !important;
}
.admin-content .search .el-input__inner {
  border: 1px solid #cbb486;
}
.admin-content .el-pagination .el-input__inner {
  border: 1px solid #cd9e57;
}
.admin-content .el-pagination {
  text-align: right !important ;
}
.admin-content .el-table td,
.admin-content .el-table th.is-leaf,
.admin-content .el-table--border,
.admin-content .el-table--group {
  border-color: #cd9e57;
  background-color: transparent;
}
.admin-content .el-table--border::after,
.admin-content .el-table--group::after,
.admin-content .el-table::before {
  /*background-color: #444;*/
  background-color: transparent;
}
.admin-content td {
  padding: 0 !important;
}
.el-table thead,
.el-table {
  color: #444;
}

.admin-content .el-pagination button {
  color: #1e4173 !important;
  background-color: transparent !important;
  cursor: not-allowed;
}
.admin-content .el-pager,
.el-pager li:first-child {
  border-radius: 10px 0 0 10px !important;
}
.admin-content .el-pager,
.el-pager li:last-child {
  border-radius: 0 10px 10px 0 !important;
}
.admin-content .el-pager .active {
  color: #e4e9ef !important ;
  background-color: #cbb486 !important ;
}
.admin-content .el-pager,
.el-pager li {
  /*vertical-align: top;*/
  /*margin: 0;*/
  /*display: inline-block;*/
  background-color: transparent !important;
  color: #cbb486 !important;
  /*border-right: 0.2px solid #1E4173 !important;*/
}
.admin-content .el-pager,
.el-pager ul {
  background-color: transparent !important;
  border: 1px solid #cbb486 !important;
}
</style>
