<template>
   <div>
       <div class="mask" v-if="isShowMessageBox && msgType === 1" @touchmove.prevent>
<!--      <div class="window" style="background: url(img/look-bg.png) repeat center;background-size:cover;">-->
      <div class="window" style="background: #F2F2F2;background-size:cover;">
        <span class="shadow" style="background: #cbb486;color: white;width: 120px;border-radius: 25px;height: 10px;display: flex;align-items: center;justify-content: center;">提示</span>
        <p style="font-size:30px;color: #282828">{{ content }}
        </p>
        <div  style="width:60%;margin:0 auto" v-if="!inputType">
            <el-input v-model="inputValue" style="margin:0;color:black" class="input_white"></el-input>
        </div>
         <div  style="width:70%;margin:0 auto" v-else-if="inputType == 2">
            <el-row style="text-align:left">
              <el-col :span="24">
                <el-radio v-model="inputValue" label="1">{{radioContent.first}}</el-radio>
              </el-col>
              <el-col :span="24">
               <el-radio v-model="inputValue" label="2">{{radioContent.second}}</el-radio>
              </el-col>
            </el-row>
        </div>
        <button @click="confirm" class="button" style="background-color:#cbb486;border-radius: 10px;" v-if="inputType == 2">确定</button>
        <button @click="confirm" class="button" style="background-color:#cbb486;border-radius: 10px;" v-if="inputType">确定</button>
        <button @click="type1" class="button" style="background-color:#cbb486;border-radius: 10px;" v-if="!inputType">确定</button>
        <img @click="cancel"  class="close" src="../../assets/img/orange-close.png" alt="">
      </div>
    </div>
     <div class="mask" v-if="isShowMessageBox && msgType === 2" @touchmove.prevent>
      <div class="window" style="background: url(img/look-bg.png) repeat center;background-size:cover;top:30%;width:1000px;height:717px">
        <span class="shadow" style="background: #cbb486;color: white;width: 120px;border-radius: 25px;height: 10px;display: flex;align-items: center;justify-content: center;">提示</span>
        <p style="font-size:30px;margin: 25px auto 0px auto;">{{ content }}
        </p>
        <div> <img src="../../assets/img/warn.gif" style="height:400px;" ></div>
        <button @click="confirm" class="button" style="background:url(img/btn2.png) no-repeat center;background-size:cover;" >确定</button>
        <img @click="cancel"  class="close" src="img/close.png" alt="">
      </div>
    </div>

    <div class="mask" v-if="isShowMessageBox && msgType === 3" @touchmove.prevent>
      <div class="window" style="background: #F2F2F2;background-size:cover;">
        <span class="shadow" style="background: #cbb486;color: white;width: 120px;border-radius: 25px;height: 10px;display: flex;align-items: center;justify-content: center;">提示</span>
        <p style="font-size:30px;color: #282828;margin-bottom:30px">已确认状态下，确定要填写吗？
        </p>
         <p style="font-size:30px;color: #282828;margin-top:10px">经填写后的材料需重新“确认”操作。
        </p>
          <div style="display:flex;justify-content: space-evenly;">
              <div style="background-color:#6c7983;border-radius: 20px;width: 120px;height:50px;line-height:50px;color:#fff;">
                <h6 @click="cancel"  style="color:#fff">取消</h6>
              </div>
               <div style="background-color:#cbb486;border-radius: 20px;width: 120px;height:50px;line-height:50px;color:#fff">
                <h6  @click="confirm" style="color:#fff">确定</h6>
              </div>
        </div>
      
        <img @click="cancel"  class="close" src="img/close.png" alt="">
      </div>
    </div>
   </div>
   
 </template>
 <script>

 export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    content: {
      type: String,
      default: '这是弹框内容'
    },
    radioContent:{
      type:Object,
      default:()=>{}
    },
    isShowInput: false,
    showImg:false,
    inputValue: '',
    inputType: 1,
    msgType:{
      type:Number,
      default:1
    },
    isShowCancelBtn: {
      type: Boolean,
      default: true
    },
    isShowConfimrBtn: {
      type: Boolean,
      default: true
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    }
  },
  data () {
    return {
      isShowMessageBox: false,
      resolve: '',
      reject: '',
      promise: '' // 保存promise对象
    }
  },
  methods: {
    Inputchange () {
        console.log(this.inputValue)
    },
    // 确定,将promise断定为resolve状态
    confirm: function () {
    if (this.isShowInput) {
      this.resolve(this.inputValue);
      } else {
      this.resolve('confirm');
      }
      this.remove();
    },
    // 取消,将promise断定为reject状态
    cancel: function () {
      this.isShowMessageBox = false;
      this.reject('cancel');
      this.remove();
    },
    // 弹出messageBox,并创建promise对象
    showMsgBox: function () {
      this.isShowMessageBox = true;
      this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      });
      // 返回promise对象
      return this.promise;
    },
    hideMsgBox: function () {
      this.isShowMessageBox = false
    },
    remove: function () {
      setTimeout(() => {
        this.destroy();
      }, 300);
    },
    destroy: function () {
      this.$destroy();
      document.body.removeChild(this.$el);
    },
    type1 () {
      if(!(/^1[3456789]\d{9}$/.test(this.inputValue))){ 
              this.$message({
                message: '手机号码不正确！',
                type: 'warning'
              })
          } else {
              this.confirm()
          }
      },
    }
 }
 </script>
 <style lang="scss" >
  
  // 渐变过渡
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .35s;
  }
  // 全局弹窗
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1111;
    background: rgba(0,0,0,0.7);
     .el-input__inner{
      color:black
    }
    .window{
        .el-input__inner:focus{border-color:#cbb486}
      position: absolute;
      top:50%;
      left:50%;
      margin-left:-455px;
      margin-top:-235px;
      width: 911px;
      height: 430px;
      border-radius:8px;
      text-align: center;
      .shadow{
        display: block;
        width: 80%;
        margin: 0 auto;
        padding: 20px;
        margin-top: -30px;
        font-size: 20px;
        border-radius: 5px;
      }
      p{
        width: 80%;
        margin: 40px auto 80px auto;
        font-size:14px;
        color:rgba(220,220,220,0.8);
        line-height:40/75rem;
      }
    }
    .button {
      position: absolute;
      bottom:60px;
      left:50%;
      margin-left:-60px;
      width:120px;
      height: 40px;
      // padding:20px 0;
      border: none;
      color:white;
      font-size: 16px;
    }
    .close {
      position: absolute;
      bottom:-100px;
      left:50%;
      margin-left:-30px;
      width:60px;
      height:60px;
    }
    div {
      color:white;
      margin: 20px;
    }
    .input_white {
      background-color: white !important;
     
    }
  }
      .type {
    line-height: 13;
    font-size: 20px!important;
    } 
</style>