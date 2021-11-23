<template>
  <div class="combination">
    <div v-for="(items, index) in formLists" :key="index">
      <div style="position: relative;">
        <el-row :gutter="20" type="flex" style="flex-wrap:wrap;align-items:stretch;">
          <el-col :span="item.display==2 ? 24 : 12" v-for="(item, childIndex) in items" :key="childIndex" >
            <span :class="combination ? 'span_el_form_there' : 'span_el_form_ten'">
              <el-form onSubmit="return false" :ref="`child${index}${childIndex}`" :model="item" label-position="left"
                class="three-form" :rules="item.rule">
                <el-form-item :prop="
                  item.type === 2 || item.type === 13 || item.type === 6
                    ? 'dataArray'
                    : 'data'
                ">
                  <div slot="label" style="display:inline-block">
                    <span>{{ item.name }}</span>
                    <!-- <el-tooltip class="item" effect="dark" :content="item.description" placement="top">
                                <i class="el-icon-warning" style="margin-left:8px"></i>
                            </el-tooltip> -->
                  </div>
                  <!-- type为1 单选题 -->
                  <el-radio-group v-model="item.data" v-if="item.type === 1" @change="radioChange($event, item)">
                    <!-- 单选后面有填空 -->
                    <span v-for="(check, checkIndex) in item.itemChoices" :key="checkIndex" class="span">
                      <el-radio :label="check.name"></el-radio>
                      <span v-for="(child, childIndex) in check.child" :key="childIndex" class="span_input">
                        <span class="span_input_name" v-if="child.name !== ''">{{
                        child.name
                      }}</span>
                        <el-input onSubmit="return false" :style="`width:${child.width || 100}px`" v-model="child.data"
                          :disabled="item.data !== check.name" :class="child.class"></el-input>
                      </span>
                    </span>
                  </el-radio-group>
                  <!-- type为2 多选题 -->
                  <el-checkbox-group v-model="item.dataArray" v-if="item.type === 2">
                    <!-- 多选后面有填空 -->
                    <span v-for="(check, checkIndex) in item.itemChoices" :key="checkIndex" class="span">
                      <el-checkbox :label="check.name" :name="check.name"></el-checkbox>
                      <span v-for="(child, childIndex) in check.child" :key="childIndex" class="span_input">
                        <span class="span_input_name" v-if="child.name !== ''">{{
                        child.name
                      }}</span>
                        <el-input onSubmit="return false" :style="`width:${child.width || 100}px`" v-model="child.data"
                          :disabled="item.dataArray.indexOf(check.name) === -1" :class="child.class"></el-input>
                      </span>
                    </span>
                  </el-checkbox-group>
                  <!-- type为3 填空题  type为7邮箱  type为8邮编  type为9固定电话  type为10移动电话  type为11身份证-->
                  <el-input onSubmit="return false" v-model="item.data" v-if="
                    item.type === 3 ||
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
                      item.type === 19
                  "></el-input>
                  <el-input onSubmit="return false" v-model="item.data" type="textarea" v-if="item.type === 20">
                  </el-input>
                  <!-- type为4 數字  要隐藏起来-->
                  <el-input-number onSubmit="return false" v-model="item.data" :min="item.min || -9999999999999"
                    :max="item.max || 999999999999" v-if="item.type === 4"></el-input-number>
                  <!-- type为5 時間點 -->
                  <el-date-picker v-model="item.data" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                    v-if="item.type === 5"></el-date-picker>
                  <!-- type为6 時間段 -->
                  <el-date-picker v-if="item.type === 6" v-model="item.dataArray" type="daterange"
                    start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                  </el-date-picker>
                  <!-- type为12 下拉框 -->
                  <el-select v-model="item.data" placeholder="请选择" v-if="item.type === 12"
                    @change="selectChange(item.id, item.data, index)">
                    <el-option v-for="(op, opIndex) in item.itemChoices" :key="opIndex" :label="op.name"
                      :value="op.name">
                    </el-option>
                  </el-select>
                  <!-- type为13 联动框 -->
                  <el-cascader v-if="item.type === 13" v-model="item.dataArray" :options="item.itemChoices"
                    :show-all-levels="false" :props="{ value: 'name', label: 'name', children: 'child' }">
                  </el-cascader>
                </el-form-item>
              </el-form>
            </span>
          </el-col>
        </el-row>
       
        <div class="button_right" v-if="combination">
          <el-button type="text" @click="add(index)">添加</el-button><br />
          <el-button type="text" @click="dele(index)" v-if="formLists.length > 1">刪除</el-button>
        </div>
      </div>
    </div>
    </el-row>
  </div>
</template>
<script>
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
    enRuleData
  } from "./options.js";
  export default {
    data() {
      return {
        show: false,
        formLists: this.formList
      };
    },
    props: {
      formList: {
        type: Array,
        default: []
      },
      parentForm: {
        type: Object,
        default: ()=>{}
      },
      // 控制组合框类型
      combination: {
        type: Number,
        default: 0
      },
      //控制组合框的数量
      combinationCount: {
        type: Number,
        default: 0
      }
    },
    computed: {},
    mounted() {},
    methods: {
      // 检查是否必填
      check() {
        this.formLists.forEach((element, index) => {
          element.forEach((choices, childIndex) => {
            // 判断单选和多选的时候的空格
             console.log('choices',choices,'parentForm ',this.parentForm)
            if (choices.type === 1 || choices.type === 2) {
              choices.itemChoices.forEach(choice => {
                // 选中的才需要进行判断
                if (
                  choices[choices.type === 1 ? "data" : "dataArray"].indexOf(
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
                      // this.$store.state.elements.filter(m=>m.id!=this.parentForm.id);
                      // this.$store.state.elements.push(this.parentForm);
                      this.$emit('parent-warn',this.parentForm) //如果该子数据元未填写，则展开父数据元项
                    } else {
                      this.$set(child, "class", "");
                    }
                  });
                }
              });
            }
            // 判断外部的是否必填项
            this.$refs[`child${index}${childIndex}`][0].validate(valid => {
              if (valid) {
                console.log("成功");
              } else {
                console.log("error submit!!");
                this.$store.state.fill = 1;
                this.$emit('parent-warn',this.parentForm) //如果该子数据元未填写，则展开父数据元项
                return false;
              }
            });
          });
        });
      },
      // 組合添加
      add(index) {
        let data = JSON.parse(JSON.stringify(this.formLists[0]));
        let dLength = this.formLists.length;
        data.forEach(element => {
          element.data = "";
          element.dataArray = [];
          //num组件 每次自增 num+1
          if (element.name == "序号") {
            element.data = dLength + 1;
          }
        });
        if (dLength < this.combinationCount) {
          this.formLists.push(data);
        } else {
          this.$message({
            message: "添加的数量超过限制",
            type: "warning"
          });
        }
      },
      // 組合刪除
      dele(index) {
        this.formLists.splice(index, 1);
        //    let data = JSON.parse(JSON.stringify(this.formLists))
        //    this.formLists = []
        //    data.splice(index,1)
        //     // 删除的时候对每个序号进行重新排序
        this.formLists.forEach((element, index) => {
          // index 记录当前的次数
          element.forEach((elements, indexs) => {
            if (elements.name == "序号") {
              elements.data = index + 1;
              this.$set(elements, "data", index + 1);
            }
          });
        });
        //   this.formLists = data
      },
      // 改变下拉框
      selectChange(id, data, index) {
        this.formLists[index].forEach(element => {
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
      radioChange(val, data) {
        // 切换选项清空下面的值
        data.itemChoices.forEach(element => {
          if (element.name !== val && element.child.length !== 0) {
            console.log(val);
            element.child.forEach(child => {
              // child.data = ''
              this.$set(child, "data", "");
            });
          }
        });
      }
    }
  };
</script>
<style lang="scss" >
  .span_input_name {
    margin-right: 10px;
  }

  .combination {
    // padding-right: 50px;

    .el-checkbox-group {
      font-size: 14px;
    }

    .button_right {
      position: absolute;
      top: 0;
      right: 0;

      .el-button {
        span {
          color: #cbb486 !important;
        }

        background-color: transparent !important;
      }
    }

    .span_el_form_ten {
      .el-form {
        margin: 0;
        margin-top: 10px;
      }

      .el-form-item__label {
        width: 100%;
        display: block;
      }
    }

    .span_el_form_there {
      .el-form-item__content {
        line-height: 20px;
      }

      .el-form {
        vertical-align: top;
        margin: 0;
        padding-right: 25px;
        // width: 150px;
        margin-top: 20px;
        display: inline-block;

        .el-form-item__label {
          width: 100%;
          display: block;
          // text-align: center;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
 /deep/ {
   
  .el-form--label-left{
    padding: 0px !important;
  }
  .el-form-item__error{
    position: static;
  }
  .el-input__inner{
    line-height: 24px;
  }
 }
</style>