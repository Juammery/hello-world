<template>
  <div class="statist bos">
    <div>
      <span class="title">
        <label>预办件时间:</label>
        <span style="width: 500px" class="title">
          <el-date-picker
            v-model="time"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </span>
      </span>
      <span class="title" style="width:200px">
        <el-button @click="search">搜索</el-button>
        <el-button @click="derived">导出</el-button>
      </span>
    </div>
    <div class="table">
      <el-table
        show-summary
        :data="tableData.records"
        border
        style="width: 1200px"
      >
        <el-table-column prop="createDate" label="时间"> </el-table-column>
        <el-table-column prop="count" label="当日预办件数量">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="getDetail(scope.row.createDate, 2)"
              >{{ scope.row.count }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="updateCount" label="当日正式办件数量">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="getDetail(scope.row.createDate, 1)"
              >{{ scope.row.updateCount }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableData.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="tableData.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
      >
      </el-pagination>
    </div>
    <el-dialog title="详情" :visible.sync="dialogTableVisible">
      <el-table :data="detail" border>
        <el-table-column prop="themeName" label="主题"> </el-table-column>
        <el-table-column prop="preliminaryCode" label="预办件码">
        </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="idType" label="证照类型"> </el-table-column>
        <el-table-column prop="idCard" label="证件号"> </el-table-column>
        <el-table-column prop="phone" label="手机号码"> </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { getPage, getByTypeAndDate } from "@/api/statistics.js";
export default {
  components: {},
  data() {
    return {
      dialogTableVisible: false,
      time: [],
      tableData: {
        records: [],
        current: 1,
        size: 10,
        total: 0
      },
      detail: []
    };
  },
  watch: {},
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    // 搜索
    search() {
      this.getData();
    },
    // 导出
    derived() {
      let endDate = "";
      let startDate = "";
      if (this.time !== null) {
        endDate = this.time[1] || "";
        startDate = this.time[0] || "";
      }
      window.open(
        `${window.location.protocol}//${
          window.location.host
        }/api/cbs/user_form_preliminary/getExcel?endDate=${endDate ||
          ""}&startDate=${startDate || ""}`
      );
    },
    getData() {
      getPage(this.tableData.current, this.tableData.size, this.time).then(
        res => {
          this.tableData = res.data;
        }
      );
    },
    getDetail(time, type) {
      this.dialogTableVisible = true;
      getByTypeAndDate(time, type).then(res => {
        this.detail = res.data.data;
      });
    },
    // 改变参数
    handleSizeChange(val) {
      this.tableData.size = val;
      this.getData();
    },
    // 改变当前页
    handleCurrentChange(val) {
      this.tableData.current = val;
      this.getData();
    }
  }
};
</script>
<style lang="scss">
.statist {
  padding: 35px 100px 100px 100px;
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
</style>
