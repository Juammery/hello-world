<template>
  <div class="formItem">
    <el-form
      :model="item"
      label-width="200px"
      label-position="top"
      class="three-form"
      :rules="item.rule"
    >
      <!-- type为1 单选题 -->
      <!-- type为2 多选题 -->
      <!-- type为3 填空题 -->
      <el-form-item :label="item.name" :prop="item.choiceType === 2 ? 'dataArray' : 'data'">
        <div slot="label" class="form-item-style">
          <span>{{ item.name }}：</span>
        </div>
        <el-radio-group v-model="item.data" v-if="item.choiceType === 1">
          <!--                    <el-radio :label="check.name" v-for="(check,index) in item.choice" :key="index">-->
          <!--                        {{check.name}}-->
          <!--                        <el-tooltip class="item" effect="dark" :content="check.tipsValue" placement="top" v-if="check.tipsValue">-->
          <!--                            <img src="../assets/img/tip_round.png" style="margin-left:8px"/>-->
          <!--                        </el-tooltip>-->
          <!--                    </el-radio>-->

          <span v-for="(check, index) in item.choice" :key="index">
            <span v-if="check.tipsValue" style="margin-right: 15px;">
              <el-tooltip class="item" effect="dark" :content="check.tipsValue" placement="bottom">
                <el-radio :label="check.name" @click.native.prevent="clickItem(check.name)">
                  <span>
                    {{ check.name}}
                    <img src="../assets/img/tip_round.png" style="margin-left:8px" />
                  </span>
                </el-radio>
              </el-tooltip>
            </span>
            <span v-else style="margin-right: 15px;">
              <el-radio :label="check.name" @click.native.prevent="clickItem(check.name)">
                <span>{{ check.name }}</span>
              </el-radio>
            </span>
          </span>
          <!--                    <el-radio :label="check.name" v-for="(check,index) in item.choice" :key="index">-->
          <!--                       <span v-if="check.tipsValue">-->
          <!--                           <el-tooltip class="item" effect="dark" :content="check.tipsValue" placement="bottom">-->
          <!--                                <span>{{check.name}}<img src="../assets/img/tip_round.png" style="margin-left:8px" /></span>-->
          <!--                            </el-tooltip>-->
          <!--                       </span>-->
          <!--                       <span v-else>-->
          <!--                            {{check.name}}-->
          <!--                       </span>-->
          <!--                    </el-radio>-->
        </el-radio-group>
        <el-checkbox-group v-model="item.dataArray" v-if="item.choiceType === 2">
          <el-checkbox
            :label="check.name"
            :name="check.name"
            v-for="(check, index) in item.choice"
            :key="index"
          >
            <span v-if="check.tipsValue">
              <el-tooltip class="item" effect="dark" :content="check.tipsValue" placement="bottom">
                <span>
                  {{ check.name
                  }}
                  <img
                    src="../assets/img/tip_round.png"
                    style="margin-left:8px"
                  />
                </span>
              </el-tooltip>
            </span>
            <span v-else>{{ check.name }}</span>
            <!--                        {{check.name}}-->
            <!--                            <el-tooltip class="item" effect="dark" :content="check.tipsValue" placement="top" v-if="check.tipsValue">-->
            <!--                                <img src="../assets/img/tip_round.png" style="margin-left:8px"/>-->
            <!--                            </el-tooltip>-->
          </el-checkbox>
        </el-checkbox-group>
        <el-input v-model="item.data" v-if="item.choiceType === 3"></el-input>
      </el-form-item>
    </el-form>
    <div class="form-line"></div>
    <transition-group name="list" tag="div">
      <div
        v-show="item.children && item.children.length > 0"
        v-for="(items, i) in item.children"
        :key="i"
        class="list-item"
      >
        <!-- {{treeDepth}} -->
        <div :style="{paddingLeft:treeDepth<=1?'30px':''}">
          <form-item
            :treeDepth="treeDepth+1"
            :item="items"
            :index="i"
            :ref="`Form${i}`"
            v-if="items.showChoice"
          ></form-item>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: "formItem",
  props: {
    item: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: 0
    },
    treeDepth: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showChoice: false
    };
  },
  computed: {
    single() {
      if (this.item.choice.length > 1) {
        return true;
      } else {
        if (this.item.choice.length == 1 && this.item.children.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  created() {
    // if(this.item.choiceType == 1){
    //   this.checkRadio(this.item.data)
    // }else if(this.item.choiceType  == 2){
    //   this.checkBox(this.item.dataArray)
    // }
  },
  watch: {
    "item.data"(newValue, oldValue) {
      // 把oldvalue下面的值全部清除
      if (oldValue) {
        let choice = {};
        this.item.choice.forEach((e, i) => {
          if (oldValue == e.name) {
            choice = e;
          }
        });
        this.item.children.forEach(e => {
          if (e.parentChoiceId == choice.choiceId || e.parentChoiceId == 0) {
            // 递归找到所有的子级并清空里面的值
            this.filterIndex(e.children);
            e.data = "";
            e.dataArray = [];
          }
        });
      }
      this.item.children.forEach(e => {
        e.showChoice = false;
        e.data = "";
        e.dataArray = [];
      });
      let choice = {};
      this.item.choice.forEach((e, i) => {
        if (newValue == e.name) {
          choice = e;
          if (e.frameValue) {
            this.$popup({
              content: e.frameValue,
              type: 4,
              click: () => { }
            });
          }
        }
      });
      this.item.children.forEach(e => {
        if (e.parentChoiceId == choice.choiceId || e.parentChoiceId == 0) {
          e.showChoice = true;
        }
      });
    },
    "item.dataArray"(newValue, oldValue) {
      // 比较新老的数组 如果少的话就把子级去除
      // 去除的情况，就把去除的下的data清除
      if (oldValue.length > newValue.length) {
        let union = oldValue.filter(function (val) {
          return newValue.indexOf(val) === -1;
        });
        let spliceList = [];
        if (Array.isArray(this.item.choice)) {
          this.item.choice.forEach((e, i) => {
            if (union.includes(e.name)) {
              spliceList.push(e);
            } else {
              spliceList.splice(i, 1);
            }
          });
        }
        if (Array.isArray(this.item.children)) {
          this.item.children.forEach(e => {
            spliceList.forEach(ele => {
              if (e.parentChoiceId == ele.choiceId || e.parentChoiceId == 0) {
                // 递归找到所有的子级并清空里面的值
                this.filterIndex(e.children);
                e.data = "";
                e.dataArray = [];
              }
            });
          });
        }
      }
      let isEmpty = false;
      if (newValue.length == 0) {
        isEmpty = true;
      }
      this.item.children.forEach(e => {
        e.showChoice = false;
        if (isEmpty) {
          e.data = "";
          e.dataArray = [];
        }
      });
      let choiceList = [];
      if (Array.isArray(this.item.choice)) {
        this.item.choice.forEach((e, i) => {
          if (newValue.includes(e.name) && !choiceList.includes(e)) {
            choiceList.push(e);
            if (e.frameValue && !e.isPop) {
              e.isPop = true;
              this.$popup({
                content: e.frameValue,
                type: 4,
                click: () => { }
              });
            }
          } else {
            e.isPop = false;
            choiceList.splice(i, 1);
          }
        });
      }
      this.item.children.forEach(e => {
        choiceList.forEach(ele => {
          if (e.parentChoiceId == ele.choiceId || e.parentChoiceId == 0) {
            e.showChoice = true;
          }
        });
      });
    }
  },
  methods: {
    // 递归找到所有的子级并清空里面的值
    // 递归数组
    filterIndex(list) {
      if (Array.isArray(list) && list.length > 0) {
        list.forEach(e => {
          if (e.children.length > 0) {
            this.filterIndex(e.children);
          }
          e.data = "";
          e.dataArray = [];
          e.showChoice = false;
        });
      }
    },
    checkRadio(newValue) {
      this.item.children.forEach(e => {
        e.showChoice = false;
        e.data = "";
        e.dataArray = [];
      });
      let choice = {};
      if (Array.isArray(this.item.choice)) {
        this.item.choice.forEach((e, i) => {
          if (newValue == e.name) {
            choice = e;
          }
        });
      }
      this.item.children.forEach(e => {
        if (e.parentChoiceId == choice.choiceId || e.parentChoiceId == 0) {
          e.showChoice = true;
        }
      });
    },
    checkBox(newValue) {
      this.item.children.forEach(e => {
        e.showChoice = false;
      });
      let choiceList = [];
      if (Array.isArray(this.item.choice)) {
        this.item.choice.forEach((e, i) => {
          if (newValue.includes(e.name) && !choiceList.includes(e)) {
            choiceList.push(e);
          } else {
            choiceList.splice(i, 1);
          }
        });
      }
      this.item.children.forEach(e => {
        choiceList.forEach(ele => {
          if (e.parentChoiceId == ele.choiceId || e.parentChoiceId == 0) {
            e.showChoice = true;
          }
        });
      });
    },
    clickItem(value) {
      this.item.data = value == this.item.data ? "" : value;
    }
  }
};
</script>

<style lang="scss">
.formItem .el-checkbox__label {
  color: #666 !important;
  padding-left: 5px !important;
}

.itemName {
  display: inline-block;
  background-color: #cbb486;
  color: #fff;
  border-radius: 0 25px 25px 0;
  padding: 0 20px !important;
  span {
    color: white !important;
  }
}
.formItem .itemName {
  line-height: 20px !important;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}
</style>

<style lang="scss" scoped>
.form-item-style {
  font-weight: bold;
  color: #8B614D;
}
.form-line {
  width: 100%;
  height: 1px;
  background-color: #fff1d6;
}
.el-form-item {
  margin: 3px 0;
  /deep/ {
    .el-form-item__label {
      padding: 0;
      line-height: 1;
    }
    .el-form-item__content {
      padding-left: 0;
    }
  }
}
</style>
<style lang="scss" scoped>
.list-item {
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

 .el-input__inner{
    line-height: 24px;
  }

.el-form-item__error {
  font-size: 16px;
  position: relative;
  margin-bottom: 8px;
}
</style>
<style lang="scss" scoped>
.formItem /deep/ {
  .el-form-item__error {
    font-size: 14px;
    position: relative;
    margin-bottom: 8px;
  }
}
</style>
