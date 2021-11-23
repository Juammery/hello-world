<template>
  <div class="admin-content">
    <h3 class="admin-title">我的信息</h3>
    <div style="padding:20px">
      <div class="info-cell-group">
        <template v-if="zwdtswUserType == 1">
          <div class="info-cell">
            <div class="info-label">真实姓名：</div>
            <div class="info-value">{{ person.name }}</div>
          </div>

          <div class="info-cell">
            <div class="info-label">手机号码：</div>
            <div class="info-value">{{ person.phone }}</div>
            <div class="info-end">
              <span @click="modifyPhone" class="modify-phone">修改</span>
            </div>
          </div>

          <div class="info-cell">
            <div class="info-label">身份证号码：</div>
            <div class="info-value">{{ person.idCard }}</div>
          </div>
        </template>
        <template v-else>
          <div class="info-cell">
            <div class="info-label">企业名称：</div>
            <div class="info-value">{{ company.name }}</div>
          </div>

          <div class="info-cell">
            <div class="info-label">统一社会信用代码：</div>
            <div class="info-value">{{ company.creditCode }}</div>
          </div>
        </template>
      </div>
    </div>

    <!-- <ul>
      <li v-if="zwdtswUserType == 1">真实姓名：{{ person.name }}</li>
      <li v-else>企业名称：{{ company.name }}</li>
      <li v-if="zwdtswUserType == 1">
        手机号码：{{ person.phone }}
        <span @click="modifyPhone" class="modify-phone">修改</span>
      </li>
      <li v-if="zwdtswUserType == 1">身份证号码：{{ person.idCard }}</li>
      <li v-else>统一社会信用代码：{{ company.creditCode }}</li>
    </ul>-->
  </div>
</template>

<script>
import { editYWTBPhone } from "@/api/admin.js";
// 个人信息
export default {
  data() {
    return {
      zwdtswUserType: 1, //法人
      person: {
        name: "张三",
        phone: "1321475685",
        idCard: "362207565625656568"
      },
      company: {
        name: "xxx有限公司",
        creditCode: "9665658000056500M"
      }
    };
  },
  methods: {
    modifyPhone() {
      // console.log('您当前正在修改手机号码操作')
      // this.$refs['phoneInput'].focus();
      this.$prompt("请输入新的手机号码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          let userId = this.getSession("userId")
            ? "111"
            : this.getSession("userId");
          let phone = value;
          editYWTBPhone(userId, phone).then(res => {
            this.person.phone = value;
            let tempUserInfo = this.getSession("UserInfo");
            tempUserInfo.phone = value;
            this.setSession("UserInfo", tempUserInfo);
          });
          this.$message({
            type: "success",
            message: "你的手机号码是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  },
  mounted() {
    if (this.getSession("UserInfo")) {
      let user = this.getSession("UserInfo");
      if (user.zwdtswUserType == "个人") {
        this.zwdtswUserType = 1;
        this.person.name = user.zwdtswName;
        this.person.phone = user.phone ? user.phone : user.zwdtswLinkPhone;
        this.setSession("phone", this.person.phone);
        this.setSession("proposer", this.person.name);
        this.person.idCard = user.zwdtswCertId;
      } else {
        this.zwdtswUserType = 2;
        this.company.name = user.zwdtswLawPerson;
        this.company.creditCode = user.zwdtswCreditCode;
      }
    }
  },
  created() {
    this.setSession("isProgress", 0);
    this.setSession("draftId", 0);
  }
};
</script>

<style lang="scss" scoped>
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
  ul {
    padding: 25px 35px;
  }
  ul li {
    margin-bottom: 20px;
    color: #114196;
  }
  .modify-phone {
    color: #cbb486;
    cursor: pointer;
    margin-left: 1em;
    /*font-size: 0.9em;*/
  }
}
</style>
<style lang="scss">
.phone .el-input__inner {
  height: 25px;
  color: #114196;
  border: 0;
}
</style>
<style lang="scss" scoped>
.info-cell-group {
  .info-cell {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .info-label {
      color: #8B614D;
      font-weight: bold;
    }
    .info-value {
      color: #666666;
    }
    .info-end {
      color: #CBB486;
    }
  }
}
</style>