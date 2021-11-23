<template>
  <div>
    <div class="none" style="height:900px">
			<div>
				<img :src="`data:image/jpeg;base64,${codeToBarCode}`" alt="" style="height:50px;width:150px" >
				<div style="float:right">
						<img :src="`data:image/jpeg;base64,${codeTwoQRCode}`" alt="" style="height:120px;width:120px;">
			  	<p  style="font-size:10px">请扫码查看办事进度</p>
				</div>
			</div>
			<div class="workPlate" style="font-size:20px"><span>工作台号：</span><span style="font-size:26px">{{getTerminalCode()}}号</span></div>
			<div class="workUnit" style="font-size:20px;margin-top:20px"><span >职能单位：</span><span style="font-size:26px" class="bold">行政服务中心</span></div>
			<div class="material_title center" style="text-align:center;font-size:30px;margin-top:20px;font-weight:bold"><span>徐汇区政务服务主题服务</span><span style="font-size:36px;font-weight:900px">收件凭证</span></div>
			<div class="material_apply">	
				<span>申请主题：</span>
				<span class="bold">{{getName()}}</span>
			</div>
			<div class="material_apply">
				<span>子事项：</span>
				<span class="bold">食品经营许可</span><br>
				<span class="bold" style="margin-left:60px" v-if="Fire">公众聚集场所使用或者开业前消防安全检查意见书的核发</span><br>
				<p class="bold" style="margin-left:60px" v-show="Drink">酒类商品零售许可证</p>
				<span class="bold" style="margin-left:60px" v-show="Sign">对户外非广告设施(非广告霓虹灯、标语、招牌、标牌、电子显示牌、灯箱、画廊、实物造型等户外设施)设置的审批</span>
			</div>
			<div class="material_apply">	
				<span>事项情形：</span>
				<span class="bold" >新办</span>
			</div>
			<div class="material_apply">	
				<span>项目信息：</span>
				<span class="bold"> </span>
			</div>
			<div class="material_detial">	
				<span>申请单位：</span>
				<span class="bold" style="display: inline-block;min-width: 200px;">{{this.getSession('dongfang').formDetail.corpName }}</span>
				<span style="margin-left: 20px;">经办人：</span>
				<span class="bold">{{this.getSession('UserInfo').name}}</span>
			</div>
			<div class="material_detial">	
				<span>申请人：</span>
				<span class="bold">{{this.getSession('UserInfo').name}}</span>
				<span style="margin-left: 150px;">联系电话：{{ this.getSession('dongfang').phone}}</span>
				<span class="bold"></span>
			</div>
      <div> &nbsp;&nbsp;经核查，您 (单位) 提交的申请材料齐全，符合法定形式，予以收件。</div>
			<div class="material_explain">&nbsp;&nbsp;根据规定，承办部门将在出具本凭证之日起5个工作日内，作出受理或不予受理的决定，申请材料不齐全或者不符合法定形式的，将在5个工作日内一次告知需要补正的材料。如在5个工作日内未被告知需要补正材料的，则视为正式受理，本凭证即为受理凭证。</div>
      <div class="material_check" style="margin-top:20px">收件材料清单附后。</div>
        <el-row style="margin-top:20px">
          <el-col :span="12" >
            <div class="material_unit">申请人确认（签字）：</div>
             <p>
				 ■自行取件
             </p>
             <p>
              □物流寄送地址(到付)
             </p>
             <p class="text-del">收件人姓名: </p>
             <p class="text-del">接收电话: </p>
						  <p class="text-del">接收地址:</p>
             <p class="text-del">现场服务人员</p>
          </el-col>
          <el-col :span="12" style="position:relative"><div>
            <p>收件机构章</p>
            <div class="txtImg">
							<img src="../../assets/img/zxz.png" alt="" style="z-index:100;position:absolute;top:-50px;height:150px;left:20px" >
						</div>
            <p class="text-del">收件日期： {{}}</p>
          </div></el-col>
          <el-col :span="24">
          </el-col>
        </el-row>
					<!-- <div class="material_date">二〇一八年八月二十八日</div> -->
			<!-- <div class="material_attention" style="margin-top:20px;">注意事项：环评备案事项请前往生态环境部网站进行备案。</div>
			<div class="material_attention" style="margin-top:10px;margin-left:80px">
				网址：http://sthj.sh.gov.cn/www/service/affairs/baxt/1.jsp
			</div>
			<div class="material_attention" style="margin-top:10px;margin-left:80px">户外非广告设施事项请前往徐汇区各街道办事处办理。</div>
		 -->
		</div>
		<p style="text-align:center;margin-bottom:20px">1/2</p>
     	<div style="page-break-after: always;"></div>
			<div class="material_content" style="margin-top:20px;height:900px">
				<img :src="`data:image/jpeg;base64,${codeToBarCode}`" alt="" style="height:50px;width:150px;margin-bottom:20px" >
				<table class="table_title_s" border="1" cellspacing="0" cellpadding="0" style="text-align:center;width:100%;border-collapse:collapse;">
					<tr>
						<td style="width:50px">序号</td>
						<td colspan="2">申请材料</td>
						<td style="width:50px">原件</td>
            <td style="width:50px">复印件</td>
					</tr>
          <tr v-for="(item,key) in multipleSelection" :key="key">
							<td>{{key | addNum}}</td>
							<td colspan="2">{{item.stStuffName}}</td>
							<td>{{item.nmOriginal}}</td>
							<td>{{item.nmCopy}}</td>
					</tr>
				</table>
				<div class="material_attention" style="margin-top:20px;font-family: SimSun;">注意事项：本表中的材料必须是真实的，否则要承担因虚假而引致的法律责任。</div>
			  <div class="material_footer" style="margin-top:20px;font-family: SimSun">（本凭证一式三份，一份交予申请人，一份放置件袋内拟作为受理凭证，一份由业务部门签收后交行政中心留档。）</div>
				<div style="position:relative" class="txtImg">
					<img src="../../assets/img/zxz.png" alt="" style="z-index:100;position:absolute;top:-30px;right:200px;height:150px" >
				</div>
			
			</div>
			<p style="text-align:center;margin-bottom:20px;">2/2</p>
   </div> 
</template>

<script>
export default {
  data(){
    return{
      checked:true,
	  checked1:false,
	  show:false,
	  dongInfo:'',
	  Drink:false,
	  Sign:false,
	  Fire:false
    }
  },
  created() {
	  this.getInfo()
	},
	 filters: {
		addNum: function (value) {
			return value+1
		}
	 },
	props: {
	codeToBarCode: {
      type: String,
      default: '',
	},
	codeTwoQRCode: {
      type: String,
      default: '',
	},
	multipleSelection: {
		type:Array,
		default:()=>[]
	},
	user:{
		type:Object,
		default:()=>{}
	}
  },
  computed:{
   
  },
  methods:{
	 getInfo(){
		if(this.getSession('dongfang')){
		 let tableList = this.getSession('dongfang').formDetail.subItemNos.split(',')
            for (var i=0 ;i<=tableList.length;i++){
              if(tableList[i] == '310150633000'){
				this.Drink = true
              }
              if(tableList[i] == '310150508000'){
				this.Sign = true
              }
               // 判断是否有消防
            if(tableList[i] == '310150081001'){
				this.Fire =true
             }
			} 
		 }
	 },
	  getTerminalCode () {
        let code = this.getSession('ReceiveUrl').terminalCode
        return code 
	  },
	  getName(){
		  return this.getSession('dongfang').themeName 
	  }
  }
}
</script>

<style>
  .none{
		padding: 20px;
		font-family: "SimSun";
  }
  .material_apply{
    margin-top:20px
  }
.text-del{
  margin-top: 20px
}
.bold{
	font-weight: bold;
}
.table_title_s {
	font-family: "SimSun";
}
.txtImg img {
	transform:rotate(30deg);
	-ms-transform:rotate(30deg); 	/* IE 9 */
	-moz-transform:rotate(30deg); 	/* Firefox */
	-webkit-transform:rotate(30deg); /* Safari 和 Chrome */
	-o-transform:rotate(30deg); 	/* Opera */

}
</style>
