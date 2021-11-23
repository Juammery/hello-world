<template>
  <div v-if="show" class="bos">
    <div :class="['top-box', { active: !!topTitle }]">{{ topTitle }}</div>

    <el-row
      :gutter="0"
      v-for="(materialName, formIndex) in tempFormList"
      :key="formIndex" align="middle"
      style="padding: 0 50px"
      >
      <el-col>
        <div>
          <affix :return-value="materialName">
            <div class="tableName">
              <i class="name-icon el-icon-d-arrow-right"></i>
              <div>{{ materialName + "：" || "无" }}</div>
            </div>
          </affix>
        </div>
      </el-col>
      <el-col>
        <el-row :gutter="20" type="flex" style="flex-wrap: wrap;algin-items:stretch;">
          <el-col
            :span="
              (item.child instanceof Array && item.child.length !== 0) || item.display==2 ? 24 : 12
            "
            :key="index"
              class="table-combine"
            v-for="(item, index) in formList.filter(
              v => (v.materialName == materialName)
            )"
          >
          <div  v-if="!item.hide">
              <el-form
              @submit.native.prevent
              onsubmit="return false;"
              :ref="`Form${index}`"
              :model="item"
              label-position="left"
              class="three-form"
             
              :rules="item.rule"
            >
              <el-form-item
                :prop="
                  item.type === 2 || item.type === 13 || item.type === 6
                    ? 'dataArray'
                    : 'data'
                "
              >
                <div slot="label" style="display: inline-block">
                  <span v-if="item.child instanceof Array && item.child.length !== 0" @click="closeOpen(item)">
                    <i class="el-icon-caret-bottom" style="color:#8A614D;font-size:16px;" v-if="!item.isClose"></i>
                    <i class="el-icon-caret-right" style="color:#8A614D;font-size:16px;" v-else></i>
                  </span>
                  <span>{{ item.name }}</span>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="item.description"
                    placement="top"
                    v-if="item.description"
                  >
                    <!--                          <i class="el-icon-warning" style="margin-left:8px"></i>-->
                    <img
                      src="../../assets/img/tip_round.png"
                      style="margin-left: 8px"
                    />
                  </el-tooltip>
                </div>
                <!-- type为1 单选题 -->
                <el-radio-group
                  v-model="item.data"
                  v-if="item.type === 1 && item.child.length === 0"
                  @change="radioChange($event, item)"
                  :disabled="getDisable(item.itemChoices)"
                >
                  <!-- 单选后面有填空 -->
                  <span
                    v-for="(check, checkIndex) in item.itemChoices"
                    :key="checkIndex"
                    class="span"
                  >
                    <el-radio :label="check.name"></el-radio>
                    <span
                      v-for="(child, childIndex) in check.child"
                      :key="childIndex"
                      class="span_input"
                    >
                      <span class="span_input_name" v-if="child.name !== ''">
                        {{ child.name }}
                      </span>
                      <el-input
                        onsubmit="return false"
                        :style="`width:${child.width || 100}px`"
                        v-model="child.data"
                        :disabled="item.data !== check.name"
                        :class="child.class"
                      ></el-input>
                    </span>
                  </span>
                </el-radio-group>
                <!-- type为2 多选题 -->
                <el-checkbox-group
                  v-model="item.dataArray"
                  v-if="item.type === 2 && item.child.length === 0"
                  @change="checkChange($event, item)"
                >
                  <!-- 多选后面有填空 -->
                  <span
                    v-for="(check, checkIndex) in item.itemChoices"
                    :key="checkIndex"
                    class="span"
                  >
                    <el-checkbox
                      :label="check.name"
                      :name="check.name"
                      :disabled="check.isRequired ? true : false"
                    >
                    </el-checkbox>
                    <span
                      v-for="(child, childIndex) in check.child"
                      :key="childIndex"
                      class="span_input"
                    >
                      <span class="span_input_name" v-if="child.name !== ''">
                        {{ child.name }}
                      </span>
                      <el-input
                        onsubmit="return false"
                        :style="`width:${child.width || 100}px`"
                        v-model="child.data"
                        :disabled="item.dataArray.indexOf(check.name) === -1"
                        :class="child.class"
                      ></el-input>
                    </span>
                  </span>
                </el-checkbox-group>
                <!-- type为3 填空题  type为7邮箱  type为8邮编  type为9固定电话  type为10移动电话  type为11身份证-->
                <el-input
                  onsubmit="return false"
                  v-model="item.data"
                  v-if="
                    (item.type === 3 ||
                      item.type === 7 ||
                      item.type === 9 ||
                      item.type === 8 ||
                      item.type === 10 ||
                      item.type === 11 ||
                      item.type === 14 ||
                      item.type === 15 ||
                      item.type === 16 ||
                      item.type === 17 ||
                      item.type === 18 ||
                      item.type === 19) &&
                      item.child.length === 0
                  "
                ></el-input>
                <!-- type==20 多行文本 -->
                <el-input
                  onsubmit="return false"
                  v-model="item.data"
                  type="textarea"
                  v-if="item.type === 20"
                ></el-input>
                <!-- type为4 數字 -->
                <el-input-number
                  v-model="item.data"
                  :min="setMin(item)"
                  :max="setMax(item)"
                  v-if="item.type === 4 && item.child.length === 0"
                ></el-input-number>
                <!-- type为5 時間點 -->
                <el-date-picker
                  v-model="item.data"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy年MM月dd日"
                  v-if="item.type === 5 && item.child.length === 0"
                ></el-date-picker>
                <!-- type为6 時間段 -->
                <el-date-picker
                  v-if="item.type === 6 && item.child.length === 0"
                  v-model="item.dataArray"
                  value-format="yyyy年MM月dd日"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
                <!-- type为12 下拉框 -->
                <el-select
                  v-model="item.data"
                  placeholder="请选择"
                  v-if="item.type === 12 && item.child.length === 0"
                  @change="selectChange(item.id, item.data)" 
                >
                  <el-option
                    v-for="(op, opIndex) in item.itemChoices"
                    :key="opIndex"
                    :label="op.name"
                    :value="op.name"
                  >
                  </el-option>
                </el-select>
                <!-- type为13 联动框 -->
                <el-cascader
                  v-if="item.type === 13 && item.child.length === 0"
                  v-model="item.dataArray"
                  :options="item.itemChoices"
                  :show-all-levels="false"
                  :props="{ value: 'name', label: 'name', children: 'child' }"
                ></el-cascader>
                <!-- 判断是否有child 有的话进行组合操作 -->
                <div
                  v-show="item.child instanceof Array && item.child.length !== 0 && !item.isClose"
                >
                  <combination
                    :formList="item.child"
                    :parent-form="item"
                    @parent-warn="handleParentWarn"
                    ref="mycombination"
                    :combination="item.combination"
                    :combinationCount="item.combinationCount"
                  ></combination>
                </div>
              </el-form-item>
            </el-form>
          </div>
            
            </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import combination from "./combination";
import affix from "./affix";
import {
  ruleDataArr,
  ruleData,
  emRuleData,
  coRuleData,
  liRuleData,
  phRuleData,
  idRuleData,
  hkRuleData,
  amRuleData,
  twRuleData,
  enRuleData,
  chinaIDData
} from "./options.js";
export default {
  data() {
    return {
      show: false,
      rangeList: [],
      topTitle: ""
    };
  },
  props: {
    formList: {
      type: Array,
      default: []
    }
  },
  components: {
    combination,
    affix
  },
  computed: {
    tempFormList: function() {
      return Array.from(new Set(this.formList.map(v => v.materialName)));
    }
  },
  mounted() {
    this.searchId();
  },
  methods: {
    handleParentWarn(item){ //必填的子数据元未填写，展开父数据项
      this.$set(item, "isClose", false);
    },
    //阻止刷新
    handlePrevent() {
      alert("阻止刷新");
    },
    // 展开父子级
    closeOpen(item){
      // this.$nextTick()
      // item.isClose = !item.isClose?true:false
      this.$set(item, "isClose", !item.isClose ? true : false);
    },
    // 设置最小值
    setMin(num) {
      // 如果存在这个值的话 就附上最大和最小
      let listMin = ""; //最小值
      this.rangeList.forEach(element => {
        if (element.standardItemId == num.id) {
          listMin = element;
        }
      });
      if (listMin.standardItemId == num.id) {
        return listMin.min;
      } else {
        return num.min || 0;
      }
    },
    setMax(num) {
      // 如果存在这个值的话 就附上最大和最小
      let listMax = "";
      this.rangeList.forEach(element => {
        if (element.standardItemId == num.id) {
          listMax = element;
        }
      });
      if (listMax.standardItemId == num.id) {
        return listMax.max;
      } else {
        return num.max || 999;
      }
    },
    //先找到是否存在设置范围的数据元id  并且找到最大和最小的值
    searchId() {
      let subjectList = this.filterChildren(this.getSession("subject"));
      subjectList.forEach(element => {
        if (element.choice.length > 0) {
          // 拿到当前的判断数组
          element.choice.forEach(elements => {
            // 如果data值和判断中哪个值想等，就拿出来
            if (element.data == elements.name && elements.standardItemId) {
              this.rangeList.push(elements);
            }
          });
        }
      });
    },
    // 递归数组
    filterIndex(origin, list) {
      if (list.length > 0) {
        list.forEach(e => {
          if (e.children.length > 0) {
            this.filterIndex(origin, e.children);
          }
          if (e.data || e.dataArray.length > 0) {
            origin.push(e);
          }
        });
      }
    },
    // 将children 拆开
    filterChildren() {
      let list = JSON.parse(JSON.stringify(this.getSession("subject"))) || [];
      list.forEach(e => {
        this.filterIndex(list, e.children);
      });
      return list;
    },
    // 处理数据
    handleData() {
      this.formList.forEach(element => {
        // 如果有显影的元素 先隐藏
        if (
          element.linkList instanceof Array &&
          element.linkList.length !== 0
        ) {
          element.linkList.forEach(res => {
            this.formList.forEach(formlist => {
              if (formlist.id == res.linkList[res.linkList.length - 1]) {
                // console.log(
                //   "res.linkList",
                //   res.linkList,
                //   formlist.id,
                //   formlist
                // );
                if (!formlist.data) {
                  this.$set(formlist, "hide", true);
                }
              }
            });
          });
        }
        if (element.child instanceof Array && element.child.length !== 0) {
          // 组合情况
          // 后端返我只会返我一条 后面的是前端自己新增
          element.child[0].forEach(child => {
            this.forRule(child);
          });
        } else {
          // 多选可能有值是必√的 帮他勾上
          if (element.type == 2 || element.type == 1) {
            element.itemChoices.forEach(choice => {
              if (choice.isRequired && element.type == 2) {
                // 多选是dataArray
                element.dataArray.push(choice.name);
              }
              if (choice.isRequired && element.type == 1) {
                // 多选是dataArray
                element.data = choice.name;
              }
            });
          }
          this.forRule(element);
        }
      });
      this.show = true;
    },
    // 检查是否必填
    check() {
      this.$store.state.fill = 0;
      // console.log(this.$refs.mycombination)
      // 组合内的判断
      if (this.$refs.mycombination) {
        console.log('this.$refs.mycombination',this.$refs.mycombination);
        this.$refs.mycombination.forEach(element => {
          element.check();
        });
      }
      // this.$refs.mycombination[0].check()
      this.formList.forEach((element, index) => {
        if (!element.hide) {
          // 判斷單選和多選後面的必填項
          if (element.type === 1 || element.type === 2) {
            // console.log(element)
            element.itemChoices.forEach(choice => {
              // 选中的才需要进行判断
              if (
                element[element.type === 1 ? "data" : "dataArray"].indexOf(
                  choice.name
                ) !== -1 &&
                choice.child
              ) {
                // 选中以后他还得是一个必填！
                choice.child.forEach(child => {
                  // 给一个红色的样式 同时改变全局状态
                  if (child.required && !child.data) {
                    this.$set(child, "class", "is_error");
                    this.$store.state.fill = 1;
                  } else {
                    this.$set(child, "class", "");
                  }
                });
              }
            });
          }
          //判断外层是否有必填的没填
          if(this.$refs[`Form${index}`]!=undefined){
            this.$refs[`Form${index}`][0].validate(valid => {
            if (valid) {
              console.log("成功");
            } else {
              this.$store.state.fill = 1;
              console.log("error submit!!");
              return false;
            }
          });
          }
        }
      });
    },
    // 禁用单选框
    getDisable(val) {
      let data = false;
      val.forEach(element => {
        if (element.isRequired) {
          data = true;
        }
      });
      return data;
    },
    // 下拉框如果是联动的话 就需要改变对应的input的rule
    selectChange(id, data) {
      this.formList.forEach(element => {
        if (
          element.type === 19 &&
          element.linkage[element.linkage.length - 1] === id
        ) {
          switch (data) {
            case "中华人民共和国居民身份证":
              this.$set(element, "rule", idRuleData);
              if (element.isRequired) {
                element.rule.data = element.rule.data.concat(ruleData.data);
              }
              break;
            case "香港有效身份证件":
              this.$set(element, "rule", hkRuleData);
              if (element.isRequired) {
                element.rule.data = element.rule.data.concat(ruleData.data);
              }
              break;
            case "澳门有效身份证件":
              this.$set(element, "rule", amRuleData);
              if (element.isRequired) {
                element.rule.data = element.rule.data.concat(ruleData.data);
              }
              break;
            case "台湾有效身份证件":
              this.$set(element, "rule", twRuleData);
              if (element.isRequired) {
                element.rule.data = element.rule.data.concat(ruleData.data);
              }
              break;
            case "外国（地区）护照":
              this.$set(element, "rule", enRuleData);
              if (element.isRequired) {
                element.rule.data = element.rule.data.concat(ruleData.data);
              }
              break;
            default:
              this.$set(element, "rule", ruleData);
              break;
          }
        }
      });
    },
    // 规则切割
    sliceRule(rule) {
      let rules = {};
      rules.data = rule.data[0];
      return rules;
    },
    // 循环放置规则
    forRule(element) {
      switch (element.type) {
        case 7:
          this.$set(element, "rule", this.sliceRule(emRuleData));
          break;
        case 8:
          this.$set(element, "rule", this.sliceRule(coRuleData));
          break;
        case 9:
          this.$set(element, "rule", this.sliceRule(liRuleData));
          break;
        case 10:
          this.$set(element, "rule", this.sliceRule(phRuleData));
          break;
        case 11:
          this.$set(element, "rule", this.sliceRule(idRuleData));
          break;
        case 14:
          this.$set(element, "rule", this.sliceRule(hkRuleData));
          break;
        case 15:
          this.$set(element, "rule", this.sliceRule(amRuleData));
          break;
        case 16:
          this.$set(element, "rule", this.sliceRule(twRuleData));
          break;
        case 17:
          this.$set(element, "rule", this.sliceRule(enRuleData));
          break;
      }
      // 循环放上字段正则
      if (element.isRequired) {
        switch (element.type) {
          case 7:
            this.$set(element, "rule", emRuleData);
            break;
          case 8:
            this.$set(element, "rule", coRuleData);
            break;
          case 9:
            this.$set(element, "rule", liRuleData);
            break;
          case 10:
            this.$set(element, "rule", phRuleData);
            break;
          case 11:
            this.$set(element, "rule", idRuleData);
            break;
          case 14:
            this.$set(element, "rule", hkRuleData);
            break;
          case 15:
            this.$set(element, "rule", amRuleData);
            break;
          case 16:
            this.$set(element, "rule", twRuleData);
            break;
          case 17:
            this.$set(element, "rule", enRuleData);
            break;
        }
      }
      if (element.isRequired && !element.rule) {
        switch (element.type) {
          case 2:
            this.$set(element, "rule", ruleDataArr);
            break;
          case 13:
            this.$set(element, "rule", ruleDataArr);
            break;
          case 6:
            this.$set(element, "rule", ruleDataArr);
            break;
          default:
            this.$set(element, "rule", ruleData);
            break;
        }
      } else if (element.isRequired && element.rule) {
        if (element.rule.data) {
          element.rule.data = element.rule.data.concat(ruleData.data);
        }
      }
    },
    // 单选改变现实隐藏某些数据源
    radioChange(val, data) {
      // 切换选项清空下面的值
      data.itemChoices.forEach(element => {
        if (element.name !== val && element.child.length !== 0) {
          element.child.forEach(child => {
            // child.data = ''
            this.$set(child, "data", "");
          });
        }
      });
      // 当前数据线隐藏在根据对应选项显示
      if (data.linkList instanceof Array && data.linkList.length !== 0) {
        data.linkList.forEach(res => {
          // console.log(res.linkList[res.linkList.length - 1])
          this.formList.forEach(formlist => {
            if (formlist.id == res.linkList[res.linkList.length - 1]) {
              this.$set(formlist, "hide", true);
            }
            // 切换清空关联的值  先找到相关联的数据元，再判断是否和当前的值相等
            // 循环出每一个子的判断
            if (formlist.id == res.linkList[0]) {
              if (formlist.data !== val) {
                this.$set(formlist, "data", "");
              }
            }
          });
        });
      }
      // 循环找到那个东西 把他变成显示
      if (data.linkList instanceof Array && data.linkList.length !== 0) {
        data.linkList.forEach(res => {
          if (res.inputName === val) {
            this.formList.forEach(formlist => {
              if (formlist.id == res.linkList[res.linkList.length - 1]) {
                this.$set(formlist, "hide", false);
              }
            });
          }
        });
      }
    },
    // 多选改变现实隐藏某些数据源
    checkChange(val, data) {
      // 切换选项清空下面的值
      data.itemChoices.forEach(element => {
        if (
          data.dataArray.indexOf(element.name) === -1 &&
          element.child.length !== 0
        ) {
          element.child.forEach(child => {
            this.$set(child, "data", "");
          });
        }
      });
      // 当前数据线隐藏在根据对应选项显示
      if (data.linkList instanceof Array && data.linkList.length !== 0) {
        data.linkList.forEach(res => {
          this.formList.forEach(formlist => {
            if (formlist.id == res.linkList[res.linkList.length - 1]) {
              this.$set(formlist, "hide", true);
            }
          });
        });
      }
      // 循环找到那个东西 把他变成显示
      if (data.linkList instanceof Array && data.linkList.length !== 0) {
        data.linkList.forEach(res => {
          if (val.indexOf(res.inputName) !== -1) {
            this.formList.forEach(formlist => {
              if (formlist.id == res.linkList[res.linkList.length - 1]) {
                this.$set(formlist, "hide", false);
              }
            });
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tableName {
  font-size: 18px;
  color: #ab8f56;
  background: rgb(252, 243, 216);
  padding: 10px 30px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  margin-left: -40px;
  width: 102.5%;

  .name-icon {
    transform: rotateZ(90deg);
    margin-right: 10px;
  }
}

/deep/ {
  .el-radio__input.is-checked + .el-radio__label {
    color: #666 !important;
  }

  .el-radio__input.is-checked .el-radio__inner {
    border-color: #cbb486 !important;
    background: #cbb486 !important;
  }

  .el-form-item {
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-bottom: 0px;
    .el-form-item__content {
      margin-left: 0px !important;
    }
    .el-input__inner {
      height: 32px;
    }
    .el-form-item__error {
      font-size: 10px;
      padding-top: 0px;
    }
  }
 
}
</style>
<style lang="scss">
.bos
  .el-form-item.is-required:not(.is-no-asterisk)
  .el-form-item__label-wrap
  > .el-form-item__label:before,
.bos
  .el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  color: #f00;
}

.bos .el-input__inner:focus {
  border-color: #cbb486;
}

.bos .el-select:focus {
  border-color: #cbb486;
}

.bos .el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #c1c1c1;
}

.bos .el-radio {
  color: #666 !important;
}

.bos .el-textarea__inner {
  background-color: transparent !important;
  background-image: none;
  border-radius: 4px;
  color: #666;
  border: 1px solid #c1c1c1;
}

.bos .el-radio__input.is-checked + .el-radio__label {
  color: #cbb486 !important;
}

.bos .el-radio__input.is-checked .el-radio__inner {
  border-color: #cbb486 !important;
  background: #cbb486 !important;
}

.bos
  .el-form-item.is-required:not(.is-no-asterisk)
  .el-form-item__label-wrap
  > .el-form-item__label:before,
.bos
  .el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  color: #f00;
  font-size: 18px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  margin-left: -5px;
  font-weight: bold;
}

.bos .five-content .el-form .el-input-number__decrease,
.bos .five-content .el-form .el-input-number__increase {
  color: #282828;
}

.table-combine .el-form-item__label span {
  font-weight: 600;
}

.table-combine .el-input {
  /*background-color: white;*/
}

.span_input_name {
  margin-right: 10px;
}

.span_input {
  margin-left: 10px;

  span {
    font-size: 14px;
  }
}

.span {
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
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
  // padding: 20px;
}

.nowLi3 {
  background-image: url("../../assets/img/leftselect.png");
}

.is_content {
  // width: 97%;
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
  /*height:100%;*/
  border-radius: 10px;
}

.el-form-item__label span {
  color: #8b614d;
}
</style>

<style lang="scss" scoped>
.top-box {
  top: 0;
  position: relative;
  background-color: #ffffff;
  // width: 100%;
  z-index: 1024;

  &.active {
    position: fixed;
  }
}
/deep/{
    .el-form-item__error{
    position: static;
  }
  .el-input__inner{
    // height: 32px;
    line-height: 24px;
  }
}
</style>

