<template>
    <div class="three-content">
        <!-- <div style="position:relative;" class="themeName-box">
            <div class="themeName">材料确认</div>
        </div> -->
        <home-top current-page="材料确认"></home-top>
        <div class="bos">
            <div class="gen-content">
                <div class="is_content scorll_content">
                    <switch-panel
                        title="情形选择："
                        :list="getSubjectSuper('subject')"
                        v-if="getSession('subject').length >0"
                    >
                        <template slot="right">
                            <svg
                                @click="$router.push('/subject')"
                                v-if="(getSession('subject') && getSession('subject').length !== 0)"
                                class="right-icon"
                                t="1617172917978"
                                viewBox="0 0 1025 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="1268"
                                style="width: 20px;fill: #8b614d;"
                            >
                                <path
                                    d="M960.341 961.534c0 17.875-12.503 32.454-28.013 32.454H91.86c-15.377 0-27.883-14.579-27.883-32.454 0-18.003 12.506-32.454 27.883-32.454h840.467c15.51 0 28.013 14.45 28.013 32.454zM855.486 272.739c-12.381 12.615-32.764 12.615-45.265 0L674.54 135.118c-12.441-12.61-12.441-33.278 0-45.89l45.265-45.96c12.383-12.616 32.764-12.616 45.27 0L900.882 180.95c12.379 12.68 12.379 33.34 0 45.894l-45.396 45.894zM357.66 777.576c-12.382 12.551-32.766 12.551-45.267 0l-135.87-137.619c-12.441-12.615-12.441-33.281-0.062-45.892L583.94 180.95c12.44-12.55 32.826-12.55 45.266 0l135.744 137.682c12.507 12.68 12.507 33.345 0 45.896l-407.29 413.047zM131.189 685.85c-12.438-12.611-25.445-8.617-28.882 8.876L69.543 860.618c-3.44 17.495 7.879 28.905 25.136 25.42l163.565-33.092c17.257-3.487 21.129-16.67 8.753-29.35L131.19 685.85z"
                                    p-id="1269"
                                />
                            </svg>
                        </template>
                    </switch-panel>

                    <div
                        class="main-business-form"
                        v-if="
              Array.isArray(getSession('business')) &&
                getSession('business').length !== 0
            "
                    >
                        <div class="edit-nav-content">
                            <span class="edit-nav-bar">情形判断：</span>
                            <span style="color:#666">{{ getSubject("business") }}</span>
                        </div>
                        <div
                            class="fr leftbtn"
                            style="margin-top: 0.4rem;position: absolute;right: 20px;top: 45%;transform: translateY(-50%);"
                            @click="goBefore('/business')"
                            v-if="
                Array.isArray(getSession('business')) &&
                  getSession('business').length !== 0
              "
                        >
                            <img src="../../assets/img/edit.png" style="width: 80%;" alt />
                        </div>
                    </div>
                    <div class="main-business-form">
                        <div class="edit-nav-content">
                            <span class="edit-nav-bar">表单填写：</span>
                            <span style="color:#666">办事表单</span>
                        </div>
                        <div
                            class="fr leftbtn"
                            style="margin-top: 0.4rem;position: absolute;right: 20px;top: 45%;transform: translateY(-50%);"
                            @click="goBefore('/fillform')"
                        >
                            <svg
                                @click="$router.push('/subject')"
                                v-if="(getSession('subject') && getSession('subject').length !== 0)"
                                class="right-icon"
                                t="1617172917978"
                                viewBox="0 0 1025 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="1268"
                                style="width: 20px;fill: #8b614d;"
                            >
                                <path
                                    d="M960.341 961.534c0 17.875-12.503 32.454-28.013 32.454H91.86c-15.377 0-27.883-14.579-27.883-32.454 0-18.003 12.506-32.454 27.883-32.454h840.467c15.51 0 28.013 14.45 28.013 32.454zM855.486 272.739c-12.381 12.615-32.764 12.615-45.265 0L674.54 135.118c-12.441-12.61-12.441-33.278 0-45.89l45.265-45.96c12.383-12.616 32.764-12.616 45.27 0L900.882 180.95c12.379 12.68 12.379 33.34 0 45.894l-45.396 45.894zM357.66 777.576c-12.382 12.551-32.766 12.551-45.267 0l-135.87-137.619c-12.441-12.615-12.441-33.281-0.062-45.892L583.94 180.95c12.44-12.55 32.826-12.55 45.266 0l135.744 137.682c12.507 12.68 12.507 33.345 0 45.896l-407.29 413.047zM131.189 685.85c-12.438-12.611-25.445-8.617-28.882 8.876L69.543 860.618c-3.44 17.495 7.879 28.905 25.136 25.42l163.565-33.092c17.257-3.487 21.129-16.67 8.753-29.35L131.19 685.85z"
                                    p-id="1269"
                                />
                            </svg>
                        </div>
                    </div>
                    <!-- 填写表单 -->
                    <div class="ytable1">
                        <div class="form-component">
                            <span class="edit-nav-bar">申请表</span>
                            <el-button
                                @click="allPrint"
                                type="text"
                                style="float: right;"
                                class="container-button"
                                v-if="showAllPrint"
                            >全部打印</el-button>
                            <!-- :span-method="objectSpanApplicationMethod" -->
                            <el-table
                                :data="htmlList"
                                border
                                style="width: 100%"
                                max-height="2504"
                                empty-text="暂无提交材料"
                            >
                                <!-- 暂时隐藏申请表所属的事项名称字段 -->
                                <!-- <el-table-column
                  prop="guideName"
                  label="事项名称"
                  min-width="120"
                  align="center"
                >
                                </el-table-column>-->
                                <el-table-column label="表名" align="center">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.materialDescription">
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                :content="scope.row.materialDescription"
                                                placement="bottom"
                                            >
                                                <span>
                                                    {{ scope.row.name
                                                    }}
                                                    <img
                                                        src="@/assets/img/tip_round.png"
                                                    />
                                                </span>
                                            </el-tooltip>
                                        </span>
                                        <span v-else>{{ scope.row.name }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="origNum"
                                    label="原件数"
                                    align="center"
                                    width="80"
                                ></el-table-column>
                                <el-table-column
                                    prop="copyNum"
                                    label="复印件数"
                                    align="center"
                                    width="100"
                                ></el-table-column>
                                <el-table-column prop="status" label="状态" align="center" width="80">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.status == 0">待确认</span>
                                        <span v-if="scope.row.status == 1">已确认</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="操作"
                                    align="center"
                                    width="100"
                                    style="border-bottom: 1px solid #000"
                                >
                                    <el-table-column label="基本" align="center" width="130">
                                        <template slot-scope="scope">
                                            <el-button
                                                @click="handlerSure(scope.$index)"
                                                type="text"
                                                class="container-button"
                                                v-if="scope.row.status == 0"
                                            >确认</el-button>
                                            <el-button
                                                @click="handleClick(scope.$index)"
                                                type="text"
                                                class="container-button"
                                            >查看</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="线下" align="center" width="80">
                                        <template slot-scope="scope">
                                            <div v-if="scope.row.status == 1">
                                                <el-button
                                                    type="text"
                                                    @click="filterPrint(scope.$index, scope.row)"
                                                    class="container-button"
                                                    v-if="scope.row.downloadStatus == 0"
                                                >
                                                    <span v-if="operating == 2">下载</span>
                                                    <span v-else>打印</span>
                                                </el-button>
                                                <el-button
                                                    type="text"
                                                    class="container-button"
                                                    @click="filterPrint(scope.$index, scope.row)"
                                                    v-else-if="scope.row.downloadStatus == 1"
                                                >
                                                    <span v-if="operating == 2">已下载</span>
                                                    <span v-else>已打印</span>
                                                </el-button>
                                                <span v-else>/</span>
                                            </div>
                                            <span v-else>/</span>
                                        </template>
                                    </el-table-column>
                                    <!-- <el-table-column label="线上" align="center" width="80">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        class="container-button"
                        v-if="scope.row.status == 1"
                        >签章</el-button
                      >
                      <span v-else>/</span>
                    </template>
                                    </el-table-column>-->
                                </el-table-column>
                            </el-table>
                        </div>
                        <!--材料清单 -->
                        <div class="form-component" style="margin:40px 0 20px 0;">
                            <span class="edit-nav-bar">材料清单</span>
                            <el-table
                                :data="Material"
                                :span-method="objectSpanMaterialMethod"
                                border
                                style="width: 100%;"
                                empty-text="暂无提交材料"
                            >
                                <el-table-column
                                    prop="guideName"
                                    label="事项名称"
                                    width="100"
                                    align="center"
                                ></el-table-column>
                                <el-table-column label="材料名" align="center">
                                    <!--                                    prop="materialName"-->
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.materialDescription">
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                :content="scope.row.materialDescription"
                                                placement="bottom"
                                            >
                                                <span>
                                                    {{ scope.row.materialName
                                                    }}
                                                    <img
                                                        src="@/assets/img/tip_round.png"
                                                    />
                                                </span>
                                            </el-tooltip>
                                        </span>
                                        <span v-else>{{ scope.row.materialName }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="origNum"
                                    label="原件数"
                                    align="center"
                                    width="80"
                                ></el-table-column>
                                <el-table-column
                                    prop="copyNum"
                                    label="复印件数"
                                    align="center"
                                    width="100"
                                ></el-table-column>
                                <el-table-column prop="status" label="状态" align="center" width="80">
                                    <template slot-scope="scope">
                                        <span
                                            v-if="scope.row.status == 0 && scope.row.sourceWay == 3"
                                        >待填写</span>
                                        <span
                                            v-else-if="
                        scope.row.status == 2 && scope.row.sourceWay == 3
                      "
                                        >待确认</span>
                                        <span
                                            v-else-if="
                        scope.row.status == 1 && scope.row.sourceWay == 3
                      "
                                        >已确认</span>
                                        <!--                                       <span v-else-if="scope.row.status == 0 && scope.row.sourceWay == 4 && operating==2" >待上传</span>-->
                                        <!--                                       <span v-else-if="scope.row.status == 1 && scope.row.sourceWay == 4 && operating==2" >已上传</span>-->
                                        <span v-else>{{ sourceWay[scope.row.sourceWay] }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="操作"
                                    align="center"
                                    width="100"
                                    style="border-bottom: 1px solid #000"
                                >
                                    <el-table-column label="基本" align="center" width="130px">
                                        <template slot-scope="scope">
                                            <div v-if="scope.row.sourceWay == 3">
                                                <el-button
                                                    v-if="scope.row.status == 2"
                                                    @click="sureMaterial(scope.row)"
                                                    type="text"
                                                    class="container-button"
                                                >确认</el-button>
                                                <el-button
                                                    v-else
                                                    @click="seeMaterial(scope.row, scope.$index)"
                                                    type="text"
                                                    class="container-button"
                                                >查看</el-button>
                                                <el-button
                                                    type="text"
                                                    @click="
                            fillMaterial(
                              scope.row.materialId,
                              scope.$index,
                              scope.row
                            )
                          "
                                                    class="container-button"
                                                >填写</el-button>
                                            </div>
                                            <div
                                                v-else-if="
                          scope.row.sourceWay == 4 &&
                            operating == 2 &&
                            IS_UPLOAD
                        "
                                            >
                                                <!--                                          style="display: none;"-->
                                                <input
                                                    type="file"
                                                    :id="nameId(scope.$index)"
                                                    style="display: none;"
                                                    accept=".pdf"
                                                    @change="handleChange(scope.$index, scope.row)"
                                                />
                                                <label
                                                    :for="nameId(scope.$index)"
                                                    class="btn-upload"
                                                >
                                                    <span v-if="scope.row.status == 0">上传</span>
                                                    <span v-if="scope.row.status == 1">已上传</span>
                                                    <!--                                              <el-button @click="handleChange(scope.$index,scope.row)" type="text" class="container-button">提交</el-button>-->
                                                </label>
                                            </div>
                                            <div v-else>/</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="线下" align="center" width="80">
                                        <template slot-scope="scope">
                                            <div v-if="scope.row.sourceWay == 3">
                                                <el-button
                                                    type="text"
                                                    @click="checkDownOrigin(scope.row, scope.$index)"
                                                    class="container-button"
                                                    v-if="scope.row.downloadStatus == 0"
                                                >
                                                    <span v-if="operating == 2">下载</span>
                                                    <span
                                                        v-else-if="scope.row.status == 1 && operating == 1"
                                                    >打印</span>
                                                </el-button>
                                                <el-button
                                                    type="text"
                                                    class="container-button"
                                                    @click="checkDownOrigin(scope.row, scope.$index)"
                                                    v-else-if="scope.row.downloadStatus == 1"
                                                >
                                                    <span v-if="operating == 2">已下载</span>
                                                    <span
                                                        v-else-if="scope.row.status == 1 && operating == 1"
                                                    >已打印</span>
                                                </el-button>
                                                <span v-else>/</span>
                                            </div>
                                            <span v-else>/</span>
                                        </template>
                                        <!-- <template slot-scope="scope">
                      <div>
                        <el-button
                          type="text"
                          @click="checkDownOrigin(scope.row, scope.$index)"
                          class="container-button"
                        >
                          <span>下载</span>
                        </el-button>
                      </div>
                                        </template>-->
                                    </el-table-column>
                                    <!-- <el-table-column label="线上" align="center" width="80">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        class="container-button"
                        v-if="scope.row.status == 1 && scope.row.sourceWay != 4"
                        >签章</el-button
                      >
                      <span v-else>/</span>
                    </template>
                                    </el-table-column>-->
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="nuxt-btn-panel">
                            <div class="nuxt-btn" @click="goBefore('/fillForm')">上一步</div>
                            <div
                                class="nuxt-btn"
                                v-if="!getSession('isProgress')"
                                @click="handleSaveDraft"
                            >保存草稿</div>

                            <div
                                class="nuxt-btn"
                                v-if="!getSession('isProgress')"
                                @click="submitDocument()"
                            >提交办件</div>
                        </div>

                        <!-- <div style="margin-top:15px">
              <el-row>
                <el-col :span="4">
                  <el-button type="warning" round @click="goBefore('/fillForm')">上一步</el-button>
                </el-col>
                <el-col :span="4" v-if="!getSession('isProgress')">
                  <el-button type="warning" round @click="handleSaveDraft">保存草稿</el-button>
                </el-col>
                <el-col :span="4" v-if="!getSession('isProgress')">
                  <el-button
                    :type="allsure ? 'warning' : 'info'"
                    round
                    :disabled="!allsure"
                    @click="submitDocument"
                  >提交办件</el-button>
                </el-col>
              </el-row>
                        </div>-->
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="查看" :visible.sync="dialogVisible" width="1000px" append-to-body>
            <htmlString
                :htmlString="htmlStringData"
                v-if="dialogVisible"
                class="r0"
                :guideList="guideList"
                id="pdfDom"
            ></htmlString>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="metterialVisible"
            width="1000px"
            append-to-body
            ref="dialogMeterial"
        >
            <meterialString
                :htmlString="meterailStringData"
                v-if="metterialVisible"
                class="r0"
                :guideList="guideList"
                :guideName="guideName"
                :downOriginNum="downOriginNum"
                id="pdfDom"
                @input="meterailInput"
                :dialogTitle="dialogTitle"
                ref="meterialRef"
            ></meterialString>
            <span slot="footer" class="dialog-footer" v-if="dialogTitle == '填报'">
                <el-button @click="metterialVisible = false">取 消</el-button>
                <el-button type="primary" @click="makeSureMeterial()">确 定</el-button>
            </span>
        </el-dialog>
        <!--        650px  595×842   842+90=932-->
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible3"
            :width="isTransverseWidth"
            append-to-body
            ref="dialogVisible3"
        >
            <div
                id="pdfDom"
                style="margin:0;padding:10px 45px 0 45px;"
                v-if="dialogVisible3"
                class="downMeterail"
            >
                <div
                    v-html="meterailStringData"
                    class="meterialDown"
                    style="margin-top:90px;width:100%;font-size:14px;line-height:27px;font-family: 宋体, SimSun;color:#000"
                ></div>
            </div>
        </el-dialog>
        <div style="height:0;overflow:hidden" v-if="dialogVisible1" class="form_boss">
            <div v-for="(item, index) in htmlList" :key="index">
                <htmlString
                    :htmlString="item.html"
                    :class="`r${index}`"
                    :numberIndex="index"
                    ref="form1"
                    :guideList="guideList"
                ></htmlString>
            </div>
        </div>
        <div style="height:0;overflow:hidden" v-if="dialogVisible2" class="form_boss">
            <div
                id="pdfDom"
                style="width:600px;margin:65px 80px;padding:20px 40px;font-size:14px;line-height:27px;font-family: 宋体, SimSun;color:#000"
                v-if="dialogVisible2"
                :style="pCss"
            >
                <div v-html="meterailStringData" class="meterialDown"></div>
            </div>
        </div>
        <el-dialog
            custom-class="info-panel"
            :visible.sync="isShowInfo"
            :show-close="false"
            append-to-body
        >
            <div class="info-title">
                <span v-if="isWeb">请确认所有的申请表并下载，再上传所有材料便可提交办件。</span>
                <span v-else>请确认所有的申请表并打印后便可以提交办件。</span>
            </div>
            <div class="btn-box">
                <div class="info-btn" @click="isShowInfo=false">我知道了</div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import mixins from "./mixins";
import createMixins from "@/utils/mixins";
import $ from "jquery";
import axios from "@/axios/index.js";
// import 'jQuery.print'
import htmlString from "./html.vue";
import { setPerfect } from "@/api/admin";
import { findDic } from "./findDIc";
import meterialString from "./meterial.vue";
import { backZf } from "@/assets/backZF.js";
import SwitchPanel from "@/components/SwitchPanel";
import homeTop from "@/components/common/homeTop";

import {
    getBillOfMaterial,
    getApplicationForm,
    createdHtml,
    getByMaterialIdAndChoice,
    saveParagraph,
    getFormDetail,
    uploadMaterialFile,
    getISUPLOADMap
} from "@/api/generate";
const map = new Map([
    [1, "一"],
    [2, "二"],
    [3, "三"],
    [4, "四"],
    [5, "五"],
    [6, "六"],
    [7, "七"],
    [8, "八"],
    [9, "九"],
    [10, "十"],
    [11, "十一"],
    [12, "十二"],
    [13, "十三"],
    [14, "十四"],
    [15, "十五"]
]);
export default {
    name: "app",
    mixins: [mixins, createMixins],
    components: {
        htmlString,
        meterialString,
        SwitchPanel,
        homeTop
    },


    data() {
        return {
            // 是否显示必填提示
            isShowInfo: false,
            fileList: [],
            deliveryMethodVisible: false, //选择交件方式对话框
            isWindowProcess: 2, //是否为综窗办件
            fileName: "",
            files: "",
            isTransverseWidth: "650px", //是否需要横向，控制下载的宽度
            dialogVisible3: false,
            temporaryMeterial: "", //暂存的材料html
            downOriginNum: 1, //2为原表 1 为填写后的表
            dialogTitle: "查看",
            dialogVisible2: false, //材料打印
            htmlTitle: "",
            userInputList: [], //用户输入的值
            indexNum: "", //查看材料的下标
            guideName: "", //材料名称
            meterailStringData: "", //材料列表
            metterialVisible: false,
            interfaceData: [], //接口的参数
            guideList: [],
            // 标记数组
            spanArr: [],
            pos: 0,
            check: 0,
            IS_UPLOAD: false, //材料清单页面是否要有上传的按钮
            dialogVisible: false,
            Material: [],
            htmlList: [],
            htmlStringData: "",
            dialogVisible1: false,
            companyName: "",
            trustee: "",
            pCss:
                `
                table {
        border-collapse: collapse;
    }

    input {
        border: 0;
        font-size: 16px;
        color: black;
        letter-spacing: 1px;
    }

    td {
        border: 1px solid #ccc !important;
        color: black;
        font-size: 16px;
        word-break: break-all;
        font-weight: 300;
        font-family: 宋体, SimSun;

    }

    textarea {
        border: 0;
        display: none;
    }

    body {
        margin: 0;
        padding: 0;
        font-size: 14px;
        line-height: 27px;
    }

    p {
        margin: 5px 0
    }

    td p {
        margin: 0
    }

    input[type=checkbox]:disabled {
        position: relative;
    }

    input[type=checkbox]:disabled::before {
        content: '';
        position: absolute;
        top: 0;
        left: -1px;
        width: 11px;
        height: 11px;
        line-height: 15px;
        border: 1px solid #ccc;
        text-align: center;
        color: white;
        font-size: 15px;
        background-color: white;
        border-radius: 4px;
    }

    input[type=checkbox]:checked:disabled::before {
        content: '✔';
        position: absolute;
        top: -1px;
        left: -1px;
        width: 11px;
        height: 11px;
        line-height: 15px;
        border: 1px solid #ccc;
        text-align: center;
        color: black;
        font-size: 15px;
        background-color: white;
        border-radius: 4px;
    }

    input[type=checkbox]:disabled {
        position: relative;
    }

@media print {
    .print-button {
        display: none;
    }
}

.print-button {
    position: fixed;
    right: 20px;
    top: 100px;
}

                
                
                `,
            sourceWay: {
                1: "调取电子证照库",
                3: "在线填报",
                4: "申请人自备",
                5: "政府部门核发"
            },
            user: {
                inputName: this.getSession("UserInfo")
                    ? this.getSession("UserInfo").name
                    : "",
                inputPhone: "",
                inputAddress: ""
            },
            proceeds: "",
            proceed: "",
            spanArr0: [], //申请表合并单元格数
            spanArr: [], //材料合并单元格数
            CurrentTheme: this.getSession("themeName")
        };
    },

    computed: {
        showAllPrint() {
            if (Array.isArray(this.htmlList) && this.htmlList.length > 0) {
                this.htmlList.forEach(element => {
                    if (element.isTransverse == 1) {
                        return false;
                    } else {
                        return true;
                    }
                });
            }
        },
        // 互联网或自助
        isWeb() {
            if (typeof this.$route.query.terminalCode == 'undefined') {
                //是互联网
                return true;
            } else {
                // 是自助机
                return false;
            }
        }
    },
    updated() {
        let dom = document.getElementById("app");
        dom.scrollTo(0, 0);
    },
    created() {
        // 材料清单页面是否要有上传的按钮,获取字典项
        getISUPLOADMap().then(res => {
            let arr = res.data.map(m => parseInt(m.value))
            this.IS_UPLOAD = arr.includes(parseInt(this.getSession("themeId")))
        })
        let subjectList = this.getSession("subject")
            ? this.filterChildren(this.getSession("subject"))
            : [];
        let business = this.getSession("business")
            ? this.filterChildren(this.getSession("business"))
            : [];
        this.interfaceData = subjectList.concat(business);
        getBillOfMaterial(this.getSession("themeId"), this.interfaceData).then(
            res => {
                this.Material = res.data.data || [];
                // 给材料排序
                // 判断如果是通用材料的
                this.Material.forEach(element => {
                    if (
                        element.guideName == "复用材料" ||
                        element.guideName == "通用材料"
                    ) {
                        // 默认赋值为0
                        element.guideWeight = 0;
                    }
                    if (element.sourceWay == 3) {
                        element.isFill = 0;
                    }
                });
                this.Material.sort((a, b) => {
                    if (a.guideWeight > b.guideWeight) {
                        //先按事项排序
                        return true;
                    } else if (a.guideWeight == b.guideWeight) {
                        //如果事项排序相同，则按材料排序
                        return a.materialWeight > b.materialWeight;
                    }
                    return false;
                });
                // let generalMaterial=[]
                // this.Material.forEach(material=>{
                //     if(material.guideName=='通用材料'){
                //         generalMaterial.push(material)
                //     }
                // })
                let materialId_saveIdList =
                    this.getSession("materialId_saveIdList") || [];
                materialId_saveIdList.forEach(materialId_saveId => {
                    this.Material.forEach(item => {
                        if (materialId_saveId.materialId === item.materialId) {
                            item.saveId = materialId_saveId.saveId;
                        }
                    });
                });

                this.getSpanMaterial(this.Material);
                this.setSession("Material", this.Material);
                // this.getSpanArr(this.Material)
            }
        );
        // 获取html
        getApplicationForm(this.getSession("themeId"), this.interfaceData).then(
            res => {
                this.htmlList = res.data.data || [];
                this.setSession("htmlList", this.htmlList);
                if (Array.isArray(this.htmlList) && this.htmlList.length > 0) {
                    this.htmlList.sort((a, b) => {
                        if (a.guideWeight > b.guideWeight) {
                            //先按事项排序
                            return true;
                        } else if (a.guideWeight == b.guideWeight) {
                            //如果事项排序相同，则按材料排序
                            return a.materialWeight > b.materialWeight;
                        }
                    });
                }
                this.getSpanApplication(this.htmlList);
                if (res.data.data && Array.isArray(res.data.data)) {
                    if (res.data.data.length > 0) {
                        this.htmlStringData = res.data.data[0].html;
                    }
                    res.data.data.forEach(element => {
                        if (!element.isBind) {
                            this.guideList.push(element.guideName);
                        }
                    });
                }
            }
        );
        if (
            this.getSession("UserInfo").zwdtswUserType == "法人" &&
            this.operating == 2 &&
            this.CurrentTheme == "我要开饭店"
        ) {
            let agentIdentification = this.getSession("agentIdentification");
            let imgInfo = this.base64ToFile(agentIdentification);
            let fileFormData = new FormData();
            fileFormData.append("file", imgInfo); //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
            uploadMaterialFile(fileFormData).then(res => {
                let fileData = JSON.parse(res.data.data);
                if (fileData.code == 200) {
                    let fileId = fileData.data; //材料上传后后台会返回一个文件的上传Id
                    let yyzz = {
                        itemCode: "",
                        child: null,
                        copyNum: 0,
                        id: "0001",
                        materialId: "0001",
                        materialName: "营业执照",
                        origNum: 1,
                        stStuffName: "营业执照",
                        nmOriginal: "1",
                        nmCopy: "1",
                        fileId: fileId
                    };
                    this.Material.push(yyzz);
                }
            });
        }
    },
    methods: {
        //申请表按事项合并单元格
        getSpanApplication(data) {
            if (Array.isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        this.spanArr0.push(1);
                        this.pos = 0;
                    } else {
                        if (data[i].guideName === data[i - 1].guideName) {
                            //aspect可以根据你要合并的列更改
                            this.spanArr0[this.pos] += 1;
                            this.spanArr0.push(0);
                        } else {
                            this.spanArr0.push(1);
                            this.pos = i;
                        }
                    }
                }
            }
        },
        objectSpanApplicationMethod({ rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                const _row = this.spanArr0[rowIndex];
                // const _col = _row > 0 ? 1 : 0
                return {
                    rowspan: _row,
                    colspan: 1
                };
            }
        },
        //材料按事项合并单元格
        getSpanMaterial(data) {
            if (Array.isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        this.spanArr.push(1);
                        this.pos = 0;
                    } else {
                        if (data[i].guideName === data[i - 1].guideName) {
                            //aspect可以根据你要合并的列更改
                            this.spanArr[this.pos] += 1;
                            this.spanArr.push(0);
                        } else {
                            this.spanArr.push(1);
                            this.pos = i;
                        }
                    }
                }
            }
        },
        objectSpanMaterialMethod({ rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                const _row = this.spanArr[rowIndex];
                // const _col = _row > 0 ? 1 : 0
                return {
                    rowspan: _row,
                    colspan: 1
                };
            }
        },
        uploadFileById(msg) {
            let multipleSelection = this.getSession("Material") || [];
            // 上传材料的时候带上身份证和营业执照
            multipleSelection.forEach(element => {
                // 材料id
                element.itemCode = element.applyNo;
                // 材料名
                element.stStuffName = element.materialName;
                // 原件数
                element.nmOriginal = element.origNum;
                // 复印件数
                element.nmCopy = element.copyNum;
                if (element.materialName == "营业执照") {
                    let showImg = this.getSession("showImg");
                    element.imgs = showImg;
                }
            });
            let applyNo =
                multipleSelection.length > 0 ? multipleSelection[0].applyNo : "";
            if (this.getSession("UserInfo").zwdtswUserType == "个人") {
                multipleSelection.push({
                    itemCode: applyNo,
                    child: null,
                    copyNum: 0,
                    id: "0002",
                    materialId: "0002",
                    materialName: "委托代理人身份证",
                    origNum: 1,
                    stStuffName: "委托代理人身份证",
                    nmOriginal: "1",
                    nmCopy: "1",
                    file: this.getSession("agentIdentificationImg")
                });
            } else {
                multipleSelection.push({
                    itemCode: applyNo,
                    child: null,
                    copyNum: 0,
                    id: "0001",
                    materialId: "0001",
                    materialName: "营业执照",
                    origNum: 1,
                    stStuffName: "营业执照",
                    nmOriginal: "1",
                    nmCopy: "1",
                    file: this.getSession("agentIdentificationImg")
                });
            }

            // 判断一下是法人还是个人 1是法人的
            // if (this.getSession("serve") == 1) {
            //   multipleSelection.push({
            //     itemCode: applyNo,
            //     child: null,
            //     copyNum: 0,
            //     id: "0001",
            //     materialId: "0001",
            //     materialName: "营业执照",
            //     origNum: 1,
            //     stStuffName: "营业执照",
            //     nmOriginal: "1",
            //     nmCopy: "1",
            //     file: this.getSession("showImg")
            //   });
            // }
            axios
                .post(
                    `/cbs/msh_user_form/uploadFileById?code=${msg}`,
                    multipleSelection
                )
                .then(res => {
                    if ((res.data.code = 0)) {
                        console.log("上传成功");
                    }
                });
        },
        // 返回上一级
        goBefore(route) {
            this.setSession("material", this.Material);
            this.$router.push(route);
        },
        // 返回html
        meterailInput(value) {
            this.temporaryMeterial = value;
        },
        // 数组去重
        unique(arr) {
            let newArr = arr.length > 0 ? [arr[0]] : [];
            for (let i = 1; i < arr.length; i++) {
                let repeat = false;
                for (let j = 0; j < newArr.length; j++) {
                    if (arr[i].itemId === newArr[j].itemId) {
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
                    newArr.push(arr[i]);
                }
            }
            return newArr;
        },
        // 保存材料的接口
        makeSureMeterial() {
            let postData = {
                form_detail: this.temporaryMeterial,
                material_id: this.Material[this.indexNum].materialId,
                theme_id: this.getSession("themeId"),
                saveId: this.Material[this.indexNum].saveId || ""
            };
            saveParagraph(postData).then(res => {
                let { data } = res.data;
                this.Material[this.indexNum].saveId = data.saveId;
                this.Material[this.indexNum].status = 2;
                this.metterialVisible = false;
            });
        },
        // 查看材料的填写
        async seeMaterial(row, indexNum) {
            this.dialogTitle = "查看";
            this.indexNum = indexNum;
            this.meterailStringData = "";
            let data = this.interfaceData;
            if (row.saveId) {
                getFormDetail(row.saveId).then(res => {
                    let { data } = res.data;
                    this.meterailStringData = data.formDetail;
                    this.metterialVisible = true;
                });
            } else {
                let res = await getByMaterialIdAndChoice(
                    this.getSession("themeId"),
                    row.id,
                    row.materialId,
                    data
                );
                let result = res.data.data;
                let i = 1;
                if (result.paragraphHtmls.length) {
                    result.paragraphHtmls.forEach(e => {
                        if (e.isSort) {
                            if (result.paragraphHtmls.length == 1) {
                                this.meterailStringData +=
                                    '<p style="position:relative;font-family: 宋体, SimSun" class="addMargin">' +
                                    '<span style="position:absolute">' +
                                    map.get(i) +
                                    "、</span>" +
                                    e.htmlDetail +
                                    "</p>";
                                i++;
                            } else {
                                if (i > 10) {
                                    this.meterailStringData +=
                                        '<p style="position:relative;margin-left:30px;font-family: 宋体, SimSun" class="addMargin1">' +
                                        '<span style="position:absolute">' +
                                        map.get(i) +
                                        "、</span>" +
                                        e.htmlDetail +
                                        "</p>";
                                } else {
                                    this.meterailStringData +=
                                        '<p style="position:relative;margin-left:30px;font-family: 宋体, SimSun" class="addMargin">' +
                                        '<span style="position:absolute">' +
                                        map.get(i) +
                                        "、</span>" +
                                        '<span class="got-it">' +
                                        e.htmlDetail +
                                        "</span></p>";
                                }
                                i++;
                            }
                        } else {
                            this.meterailStringData += e.htmlDetail;
                        }
                    });
                }
                this.guideName = result.materialName;
                this.metterialVisible = true;
            }
        },
        // 填写材料
        fillMaterial(id, indexNum, row) {
            this.dialogTitle = "填报";
            this.indexNum = indexNum;
            this.meterailStringData = "";
            if (row.saveId) {
                if (row.status == 1) {
                    this.$msgBox
                        .showMsgBox({
                            msgType: 3
                        })
                        .then(async value => {
                            getFormDetail(row.saveId).then(res => {
                                let { data } = res.data;
                                this.meterailStringData = data.formDetail;
                                this.guideName = data.materialName;
                                this.metterialVisible = true;
                            });
                        })
                        .catch(() => {
                            this.$message({
                                type: "info",
                                message: "取消输入"
                            });
                        });
                } else {
                    getFormDetail(row.saveId).then(res => {
                        let { data } = res.data;
                        this.meterailStringData = data.formDetail;
                        this.guideName = data.materialName;
                        this.metterialVisible = true;
                    });
                }
            } else {
                let data = this.interfaceData;
                getByMaterialIdAndChoice(
                    this.getSession("themeId"),
                    row.id,
                    id,
                    data
                ).then(res => {
                    let { data } = res.data;
                    let i = 1;
                    if (data.paragraphHtmls.length) {
                        data.paragraphHtmls.forEach(e => {
                            if (e.isSort) {
                                if (data.paragraphHtmls.length == 1) {
                                    this.meterailStringData +=
                                        '<p style="position:relative;font-family: 宋体, SimSun" class="addMargin">' +
                                        '<span style="position:absolute">' +
                                        map.get(i) +
                                        "、</span>" +
                                        e.htmlDetail +
                                        "</p>";
                                    i++;
                                } else {
                                    if (i > 10) {
                                        this.meterailStringData +=
                                            '<p style="position:relative;;margin-left:30px;font-family: 宋体, SimSun" class="addMargin1">' +
                                            '<span style="position:absolute">' +
                                            map.get(i) +
                                            "、</span>" +
                                            e.htmlDetail +
                                            "</p>";
                                        i++;
                                    } else {
                                        this.meterailStringData +=
                                            '<p style="position:relative;;margin-left:30px;font-family: 宋体, SimSun" class="addMargin">' +
                                            '<span style="position:absolute">' +
                                            map.get(i) +
                                            "、</span>" +
                                            e.htmlDetail +
                                            "</p>";
                                        i++;
                                    }
                                }
                            } else {
                                this.meterailStringData += e.htmlDetail;
                            }
                        });
                    }
                    this.guideName = data.materialName;
                    this.metterialVisible = true;
                });
            }
        },
        // 自助机办件
        // goLogistics (){
        //     this.$router.push('/logistics')
        // },
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
        filterChildren(originList) {
            let list = JSON.parse(JSON.stringify(originList)) || [];
            list.forEach(e => {
                this.filterIndex(list, e.children);
            });
            return list;
        },
        //线上办件
        createOnline() {
            this.saveDraft();
        },
        handleSaveDraft() {
            this.setSession("Material", this.Material);
            this.saveDraft();
        },
        // 提交办件，是否综窗交件
        submitDocument() {
            if (!this.allsure) {
                this.isShowInfo = true;
                return;

            }

            this.deliveryMethodVisible = true;
            if (this.getSession("deliveryMethodList")) {
                //是否可以自助机交件，若无，则跳过弹窗，直接综窗交件
                this.$popup({
                    type: 6,
                    leftText: "自助机交件",
                    rightText: "综窗交件",
                    // deliveryMethodDisabled: !this.getSession("deliveryMethodList"),
                    content:
                        "您好，您可以选择自助机交件或者综窗交件。自助机交件之前请呼叫现场服务人员检查您的材料。",
                    click: () => {
                        // 点击按钮事件
                        this.isWindowProcess = 1;
                        this.createInfo();
                        // this.$popup({
                        //   type: 6,
                        //   leftText: "取消",
                        //   rightText: "确定",
                        //   content: "您即将创建办件，请确认是否继续？",
                        //   cancle: () => {
                        //     // 点击按钮事件
                        //     this.$message({
                        //       showClose: true,
                        //       message: "取消办件",
                        //       type: "warning"
                        //     });
                        //   },
                        //   click: () => {
                        //     this.createInfo();
                        //   }
                        // });
                    },
                    cancle: () => {
                        //自助机交件
                        this.isWindowProcess = 2;
                        this.goLogistics();
                    }
                });
            } else {
                this.isWindowProcess = 1; //综窗交件
                this.createInfo();
            }
        },

        // 进入到配件方式
        goLogistics() {
            this.dialogVisible1 = true;
            setTimeout(() => {
                let form_html = JSON.parse(JSON.stringify(this.htmlList)) || [];
                form_html.forEach((element, index) => {
                    element.html = $(`.r${index}`).html();
                    // this.setSession('form_html',form_html)
                    this.setData("form_html", form_html);
                    let fileList = [];
                    this.Material.forEach(item => {
                        if (item.hasOwnProperty("fileId")) {
                            fileList.push(item);
                        }
                    });
                    this.setSession("fileList", fileList);
                    this.$router.push("/logistics");
                });
            }, 50);
        },
        // 判断是线上还是线上
        submit() {
            // 暂时隐藏配件方式
            this.submitForm();
            // if(this.operating == 2){

            // }else{
            //   this.goLogistics()
            // }
        },
        // 提交
        submitForm() {
            //  this.getProceeds();
            let fillForm = this.getSession("fillForm") || [];
            fillForm.forEach(element => {
                if (element.synonymArray[0] == "企业名称") {
                    this.companyName = element.data;
                }
                if (element.synonymArray[0] == "委托代理人") {
                    this.trustee = element.data;
                }
                if (this.trustee) {
                    if (element.child.length > 0) {
                        element.child.forEach(element => {
                            element.forEach(element => {
                                if (element.synonymArray[0] == "委托代理人") {
                                    this.trustee = element.data;
                                }
                            });
                        });
                    }
                }
            });
            this.dialogVisible1 = true;
            setTimeout(() => {
                let form_html = JSON.parse(JSON.stringify(this.htmlList)) || [];
                form_html.forEach((element, index) => {
                    element.html = $(`.r${index}`).html();
                });
                let data = {
                    wlselect: 1,
                    st_window_no: "11",
                    code: "",
                    phone: "11",
                    proposer: "admin",
                    recipient: "admin",
                    applicant_unit: "guomai",
                    proceed: this.proceed,
                    proceeds: this.proceeds,
                    themeName: this.CurrentTheme,
                    companyName: this.companyName,
                    trustee: this.trustee,
                    themeId: this.getSession("themeId"),
                    id_card: "111",
                    form_detail: {
                        subject: this.getSession("subject"),
                        business: this.getSession("business"),
                        fillForm: this.getSession("fillForm")
                    },
                    htmls: form_html
                };
                createdHtml(data).then(res => {
                    if (!res.data.code) {
                        this.$popup({
                            content: `您申报的<${this.CurrentTheme}>主题已提交申请，您可以登陆一网通办或扫描收件凭证的二维码查询办件进度`,
                            type: 4,
                            click: () => {
                                // 点击按钮事件
                                this.$router.push("/");
                            }
                        });
                    }
                });
            }, 500);
        },
        nameId(index) {
            return "input" + index;
        },
        handleChange1(index, materialItem) {
            materialItem.status = 1;
            let fileFormData = new FormData();
            fileFormData.append(
                "file",
                document.querySelectorAll("input[type=file]")[index].files[0]
            ); //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
            uploadMaterialFile(fileFormData).then(res => {
                if (res.data.data.code == 200) {
                    materialItem.fileId = res.data.data.data; //材料上传后后台会返回一个文件的上传Id
                }
            });
        },
        base64ToFile(data) {
            // 将base64 的图片转换成file对象上传 atob将ascii码解析成binary数据
            let binary = atob(data.split(",")[1]);
            let mime = data.split(",")[0].match(/:(.*?);/)[1];
            let array = [];
            for (let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            let fileData = new Blob([new Uint8Array(array)], {
                type: mime
            });
            let file = new File([fileData], `${new Date().getTime()}.png`, {
                type: mime
            });
            return file;
        },
        handleChange(index, materialItem) {
            materialItem.status = 1;
            this.checkAllPrint();
            materialItem.uploadFileId = "56865686565556";
            let fileFormData = new FormData();
            fileFormData.append(
                "file",
                document.getElementById("input" + index).files[0]
            ); //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
            uploadMaterialFile(fileFormData).then(res => {
                let fileData = JSON.parse(res.data.data);
                if (fileData.code == 200) {
                    materialItem.fileId = fileData.data; //材料上传后后台会返回一个文件的上传Id
                }
            });
        },
        // 确定
        sure() {
            this.dialogVisible1 = false;
            this.dialogVisible = false;
        },
        // 查看
        handleClick(val) {
            this.htmlStringData = this.htmlList[val].html;
            // this.meterailStringData = this.htmlList[val].html;
            // console.log('dddddd',this.htmlList[val].html)
            this.dialogVisible = true;
            // this.metterialVisible = true;
        },
        checkAllPrint() {
            let status = this.checkAllDown();
            if (status) {
                this.allsure = true;
            }
        },
        filterPrint(val, msg) {
            this.htmlList[val].downloadStatus = 1;
            this.checkAllPrint();
            if (msg.isTransverse == 1) {
                this.$msgBox
                    .showMsgBox({
                        content:
                            "办理该事项的材料需要一式两份且横向打印，请按如下步骤进行操作：1、份数填写“2”。2、首选项->装帧->方向 选择“横向”。",
                        isShowInput: false,
                        msgType: 2
                    })
                    .then(async value => {
                        this.handlerPrint(val);
                    })
                    .catch(() => { });
            } else {
                // if (this.operating == 2) {
                //   this.handlerPrint(val);
                // } else {
                //   this.downTable(val);
                // }
                if (this.operating == 2) {
                    this.$popup({
                        content: "",
                        type: 8,
                        click: () => {
                            this.handlerPrint(val);
                        }
                    });
                } else {
                    this.handlerPrint(val);
                }
            }
        },
        // 下载表单
        downTable(val) {
            const loading = this.$loading({
                lock: true,
                text: "正在下载材料",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            this.htmlStringData = this.htmlList[val].html;
            // this.meterailStringData = this.htmlList[val].html;
            this.htmlTitle = this.htmlList[val].name;
            this.dialogVisible = true;
            setTimeout(() => {
                this.getPdf("#pdfDom");
                loading.close();
                //  this.dialogVisible = false;
                this.dialogVisible = false;
            }, 500);
        },
        // 是否下载原表
        checkDownOrigin(row, indexNum) {
            // this.operating = 1;
            this.printMeterial(row, indexNum);

            //网上办理
            // if (this.operating == 2) {
            // this.$msgBox
            //   .showMsgBox({
            //     content: "请选择下载类型：",
            //     isShowInput: true,
            //     radioContent: {
            //       first: " 未填写材料（空表）",
            //       second: "已填写材料"
            //     },
            //     msgType: 1,
            //     inputType: 2
            //   })
            //   .then(async value => {
            //     //如果是下载空表
            //     if (value == 1) {
            //       this.downOrigin(row, indexNum);
            //     }
            //     //如果是下载已填写的材料
            //     else {
            //       this.printMeterial(row, indexNum);
            //     }
            //   })
            //   .catch(() => {
            //     this.$message({
            //       type: "info",
            //       message: "取消输入"
            //     });
            //   });
            //   this.$popup({
            //       content: "",
            //       type: 8,
            //       click: () => {
            //         this.printMeterial(row, indexNum);
            //       }
            //     });
            // }
            //自助机办理
            // else {
            //   this.printMeterial(row, indexNum);
            // }
        },
        // 下载原表
        async downOrigin(row) {
            const loading = this.$loading({
                lock: true,
                text: "正在下载材料",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            this.$nextTick(() => {
                if (row.isTransverse) {
                    this.isTransverseWidth = "1100px";
                }
            });
            row.downloadStatus = 1;
            this.meterailStringData = "";
            let data = this.interfaceData;
            // let res = await getByMaterialIdAndChoice(row.materialId,data)
            let res = await getByMaterialIdAndChoice(
                this.getSession("themeId"),
                row.id,
                row.materialId,
                data
            );
            let result = res.data.data;
            let i = 1;
            if (result.paragraphHtmls && result.paragraphHtmls.length) {
                result.paragraphHtmls.forEach(e => {
                    if (e.isSort) {
                        if (result.paragraphHtmls.length == 1) {
                            this.meterailStringData +=
                                '<p style="position:relative;font-family: 宋体, SimSun" class="addMargin">' +
                                '<span style="position:absolute;">' +
                                map.get(i) +
                                "、</span>" +
                                e.htmlDetail +
                                "</p>";
                        } else {
                            if (i > 10) {
                                this.meterailStringData +=
                                    '<p style="position:relative;margin-left:30px;font-family: 宋体, SimSun" class="addMargin1">' +
                                    '<span style="position:absolute">' +
                                    map.get(i) +
                                    "、</span>" +
                                    e.htmlDetail +
                                    "</p>";
                            } else {
                                this.meterailStringData +=
                                    '<p style="position:relative;margin-left:30px;font-family: 宋体, SimSun" class="addMargin">' +
                                    '<span style="position:absolute">' +
                                    map.get(i) +
                                    "、</span>" +
                                    e.htmlDetail +
                                    "</p>";
                            }
                        }
                        i++;
                    } else {
                        this.meterailStringData += e.htmlDetail;
                    }
                });
            }
            this.guideName = result.materialName;
            this.htmlTitle = result.materialName;
            this.downOriginNum = 2;
            this.dialogVisible3 = true;
            setTimeout(() => {
                $(`.meterialDown`).html(
                    $(`.meterialDown`)
                        .html()
                        .replace(
                            /这里是分页！/gi,
                            "<div style='page-break-before:always;margin-top:350px'></div>"
                        )
                );
                $.each($("#pdfDom").find(".addMargin"), function (value) {
                    $(this)
                        .next()
                        .attr("style", "margin-left:30px");
                });
                $.each($("#pdfDom").find(".addMargin1"), function (value) {
                    $(this)
                        .next()
                        .attr("style", "margin-left:42px");
                });
                this.getPdf("#pdfDom", row.isTransverse);
                loading.close();
                // this.dialogVisible3 = false;
            }, 500);
        },
        // 下载材料
        async printMeterial(row, indexNum) {
            // const loading = this.$loading({
            //   lock: true,
            //   text: "正在下载材料",
            //   spinner: "el-icon-loading",
            //   background: "rgba(0, 0, 0, 0.7)"
            // });
            row.downloadStatus = 1;
            this.indexNum = indexNum;
            this.meterailStringData = "";
            let data = this.interfaceData;
            this.$nextTick(() => {
                if (row.isTransverse) {
                    this.isTransverseWidth = "1100px";
                }
            });
            if (row.saveId) {
                getFormDetail(row.saveId).then(res => {
                    let { data } = res.data;
                    this.meterailStringData = data.formDetail;
                    this.htmlTitle = data.materialName;
                    if (this.operating == 1) {
                        this.handPrintMeterial();
                        setTimeout(() => {
                            // loading.close();
                        }, 1200);
                    } else {
                        // this.dialogVisible3 = true;
                        // setTimeout(() => {
                        //   $(`.meterialDown`).html(
                        //     $(`.meterialDown`)
                        //       .html()
                        //       .replace(
                        //         /这里是分页！/gi,
                        //         "<div style='page-break-before:always;margin-top:350px'></div>"
                        //       )
                        //   );
                        //   this.getPdf("#pdfDom", row.isTransverse);
                        //   loading.close();
                        //   this.dialogVisible3 = false;
                        // }, 500);

                        this.$popup({
                            content: "",
                            type: 8,
                            click: () => {
                                this.handPrintMeterial();
                                setTimeout(() => {
                                    // loading.close();
                                }, 1200);
                            }
                        });
                    }
                });
            } else {
                let res = await getByMaterialIdAndChoice(
                    this.getSession("themeId"),
                    row.id,
                    row.materialId,
                    data
                );
                let result = res.data.data;
                let i = 1;
                if (result.paragraphHtmls && result.paragraphHtmls.length) {
                    result.paragraphHtmls.forEach(e => {
                        if (e.isSort) {
                            if (result.paragraphHtmls.length == 1) {
                                this.meterailStringData +=
                                    '<p style="position:relative;font-family: 宋体, SimSun" class="addMargin">' +
                                    '<span style="position:absolute">' +
                                    map.get(i) +
                                    "、</span>" +
                                    e.htmlDetail +
                                    "</p>";
                            } else {
                                if (i > 10) {
                                    this.meterailStringData +=
                                        '<p style="position:relative;;margin-left:30px;font-family: 宋体, SimSun" class="addMargin1">' +
                                        '<span style="position:absolute">' +
                                        map.get(i) +
                                        "、</span>" +
                                        e.htmlDetail +
                                        "</p>";
                                } else
                                    this.meterailStringData +=
                                        '<p style="position:relative;margin-left:30px;font-family: 宋体, SimSun" class="addMargin">' +
                                        '<span style="position:absolute">' +
                                        map.get(i) +
                                        "、</span>" +
                                        e.htmlDetail +
                                        "</p>";
                            }
                            i++;
                        } else {
                            this.meterailStringData += e.htmlDetail;
                        }
                    });
                }
                this.guideName = result.materialName;
                this.htmlTitle = result.materialName;
                if (this.operating == 1) {
                    this.handPrintMeterial();
                    setTimeout(() => {
                        // loading.close();
                    }, 1000);
                } else {
                    // this.dialogVisible2 = true;
                    // setTimeout(() => {
                    //   this.getPdf("#pdfDom", row.isTransverse);
                    //   loading.close();
                    //   this.dialogVisible2 = false;
                    // }, 500);
                    this.$popup({
                        content: "",
                        type: 8,
                        click: () => {
                            this.handPrintMeterial();
                            setTimeout(() => {
                                // loading.close();
                            }, 1000);
                        }
                    });
                }
            }
            this.checkAllPrint();
        },
        // 打印材料
        handPrintMeterial() {
            // 需要等DOM操作完成
            this.dialogVisible2 = true;
            this.dialogVisible = false;
            setTimeout(() => {
                $(`.meterialDown`).html(
                    $(`.meterialDown`)
                        .html()
                        .replace(
                            /这里是分页！/gi,
                            "<div style='page-break-before:always'></div>"
                        )
                );
                var newWindow = window.open("打印窗口", "_blank");
                var docStr = $(".meterialDown").html();

                docStr += `<button class="print-button" onclick="window.location.reload();print()">打印本页</button>`;
                docStr += `
                
                <${'script'}>
                    window.document
                    .getElementsByTagName("head")
                    .item(0).innerHTML="<${'style'}>${this.pCss.replace(/[\r\n]/g, " ")}</${'style'}>"
                
                </${'script'}>
                
                `;

                newWindow.document.write(docStr);
                newWindow.document.title = "预览";
                newWindow.focus();
                newWindow.print();
                this.dialogVisible = false;
                this.dialogVisible2 = false;

            }, 500);
        },
        // 打印
        handlerPrint(val) {
            // 需要等DOM操作完成
            this.dialogVisible1 = true;
            this.dialogVisible = false;
            setTimeout(() => {
                var newWindow = window.open("打印窗口", "_blank");
                var docStr = $(`.r${val}`)
                    .html()
                    .replace(
                        /这里是分页！/gi,
                        "<div style='page-break-before:always'></div>"
                    );
                let $docStr = $(docStr);

                $docStr.append(`<button class="print-button" onclick="window.location.reload();print()">打印本页</button>`)
                $docStr.append(`
                
                <${'script'}>
                    window.document
                    .getElementsByTagName("head")
                    .item(0).innerHTML="<${'style'}>${this.pCss.replace(/[\r\n]/g, " ")}</${'style'}>"
                
                </${'script'}>
                
                `)

                docStr = $docStr.html();

                newWindow.document.write(docStr);
                newWindow.document.title = "预览";
                newWindow.focus();
                newWindow.print();

                this.dialogVisible = false;
                this.dialogVisible1 = false;

            }, 500);
        },
        allPrint() {
            this.dialogVisible1 = true;
            this.dialogVisible = false;
            setTimeout(() => {
                var newWindow = window.open("打印窗口", "_blank");
                var style = document.createElement("style");
                style.type = "text/css";
                style.innerHTML = this.pCss;
                style.id = "addStyle";
                // document.getElementsByTagName("head").item(0).appendChild(style);
                var docStr = $(".form_boss")
                    .html()
                    .replace(
                        /这里是分页！/gi,
                        "<div style='page-break-before:always'></div>"
                    );
                newWindow.document.write(docStr);
                newWindow.document
                    .getElementsByTagName("head")
                    .item(0)
                    .appendChild(style);
                newWindow.document.close();
                newWindow.print();
                newWindow.close();
                this.dialogVisible = false;
                this.dialogVisible1 = false;
            }, 500);
        },
        // 设定合并标识
        getSpanArr(data) {
            if (Array.isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        this.spanArr.push(1);
                        this.pos = 0;
                    } else {
                        // 判断当前元素与上一个元素是否相同
                        if (data[i].guideName === data[i - 1].guideName) {
                            this.spanArr[this.pos] += 1;
                            this.spanArr.push(0);
                        } else {
                            this.spanArr.push(1);
                            this.pos = i;
                        }
                    }
                }
            }
        },
        // 根据标识合并单元格
        cellMerge({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
        },
        //线下办件提交
        createInfo() {
            this.getProceeds();
            this.initInfo();
            // if (this.logisticsType == 2) {
            //     if (
            //         this.user.inputName != "" &&
            //         this.user.inputPhone != "" &&
            //         this.user.inputAddress != ""
            //     ) {
            //         this.initInfo();
            //     } else {
            //         this.$message({
            //             showClose: true,
            //             message: "请填写完整的收件人信息",
            //             type: "warning"
            //         });
            //     }
            // }
            // else {
            //     this.initInfo();
            // }
        },
        userPop(num) {
            let htmlList = this.getSession("htmlList") || [];
            let content1 = this.getContent();
            // htmlList.forEach(element => {
            //   content1 += '<'+element.guideName+'>'+','
            // })
            this.$popup({
                content: content1,
                num: String(num),
                click: () => {
                    // 点击按钮事件
                    setTimeout(() => {
                        // 更换了打印方法
                        // 需要判断是否是工作时间
                        var docStr = "";
                        if (this.getSession("WorkTime")) {
                            docStr = $(`.file1`).html();
                        } else {
                            docStr = $(`.file2`).html();
                        }
                        // document.body.innerHTML = ''
                        window.document.write(docStr);
                        var style = document.createElement("style");
                        style.type = "text/css";
                        // css
                        style.innerHTML = this.pCss;
                        style.id = "addStyle";
                        document
                            .getElementsByTagName("head")
                            .item(0)
                            .appendChild(style);
                        // document.body.innerHTML = docStr
                        window.print();
                        // 重新加载页面，以刷新数据
                        window.location.reload();
                        this.$router.push("/");
                        // backZf();
                    }, 500);
                }
            });
        },
        getProceeds() {
            let data = this.getSession("subject");
            if (Array.isArray(this.getSession("business"))) {
                data = data.concat(this.getSession("business"));
            }
            // 获取材料中的id
            // let Material = this.getSession("Material") || [];
            let Material = this.Material || [];
            // 获取html
            // let htmlList = this.getSession("htmlList") || [];
            let htmlList = this.htmlList || [];
            if (Material.length > 0) {
                Material.forEach(element => {
                    if (
                        element.guideName != "复用材料" &&
                        element.guideName != "通用材料"
                    ) {
                        this.proceeds += element.guideName + ",";
                        this.proceed += element.applyNo + ",";
                    }
                });
            }
            if (htmlList.length > 0) {
                htmlList.forEach(element => {
                    this.proceeds += element.guideName + ",";
                    this.proceed += element.applyNo + ",";
                });
            }
        },
        //创建办件
        initInfo() {
            // 如果是从待完善进来 ,就把记录清除
            if (this.getSession("isPerfect")) {
                let ids = this.getSession("isPerfect");
                setPerfect(ids).then(res => {
                    console.log();
                });
            }
            // let form_html = this.getData("form_html");
            let form_html = JSON.parse(JSON.stringify(this.htmlList)) || [];
            form_html.forEach((element, index) => {
                element.html = $(`.r${index}`).html();
            });
            let form_detail = {
                subject: this.getSession("subject"),
                business: this.getSession("business")
                    ? this.getSession("business")
                    : [],
                fillForm: this.getSession("fillForm")
            };
            let applicant_unit = "";
            let proposer = "";
            let phone = "";
            let idCard = "";
            let fillForm = this.getSession("fillForm") || [];
            let allFillForm = [];
            let user = this.getSession("UserInfo");
            if (user.zwdtswUserType == "个人") {
                proposer = user.zwdtswName;
                phone = user.phone ? user.phone : user.zwdtswLinkPhone;
                idCard = user.zwdtswCertId;
            }
            fillForm.forEach(element => {
                if (element.child.length > 0) {
                    element.child.forEach(e => {
                        allFillForm = [...allFillForm, ...e];
                    });
                }
                allFillForm.push(element);
                // if (element.synonymArray[0] == "企业名称") {
                //   applicant_unit = element.data;
                // }
                if (element.synonymArray[0] == "委托人移动电话") {
                    phone = element.data;
                }
                if (element.id == 459) {
                    applicant_unit = element.data;
                }

                if (element.child.length > 0) {
                    element.child.forEach(element => {
                        element.forEach(element => {
                            if (element.synonymArray[0] == "委托人移动电话") {
                                phone = element.data;
                            }
                            if (element.id == 459) {
                                applicant_unit = element.data;
                            }
                        });
                    });
                }
            });
            // 遍历allform 找到字典 然后把字典赋值
            findDic(allFillForm);
            this.setSession("phone", phone);
            const loading = this.$loading({
                lock: true,
                text: "正在创建办件",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            let fileList = [];
            this.Material.forEach(item => {
                if (item.hasOwnProperty("fileId")) {
                    fileList.push(item);
                }
            });
            this.setSession("fileList", fileList);
            // 判断一下是法人还是个人 1是法人的
            axios
                .post("/cbs/msh_user_form/create", {
                    wlselect: 1,
                    st_window_no: "",
                    proceed: this.proceed,
                    id_card: idCard,
                    form_detail: form_detail,
                    proceeds: this.proceeds,
                    // recipientPhone: this.user.inputPhone,
                    // recipientAddress: this.user.inputAddress,
                    recipient: proposer ? proposer : "",
                    proposer: proposer ? proposer : "",
                    phone: phone ? phone : "",
                    applicant_unit: applicant_unit ? applicant_unit : "",
                    code: "",
                    // themeName: this.themeName,
                    themeName: this.CurrentTheme,
                    htmls: form_html,
                    themeId: this.getSession("themeId"),
                    allFillForm: allFillForm,
                    fileList: fileList,
                    isWindowProcess: this.isWindowProcess,
                    draftId: this.getSession("draftId")
                        ? this.getSession("draftId")
                        : null
                })
                .then(res => {
                    let result = res.data;
                    // this.$loading().close();
                    // this.$loading.close();
                    loading.close();
                    if (result.code == 0) {
                        this.$popup({
                            // content: result.msg,
                            content: this.getSession("themeType") ==1 ? '请带好您的所有材料，尽快前往B厅窗口进行交件!':'请带好您的所有材料，尽快前往A厅综窗进行交件!',
                            type: 4,
                            click: () => {
                                // 点击按钮事件
                                // if (this.getSession("terminalCode")) {
                                //   backZf();
                                // } else {
                                //   this.$router.push({ path: "/" });
                                // }
                                this.$router.push({ path: "/" });
                            }
                        });
                        // this.$router.push('/')
                        // if (this.getSession("terminalCode")) {
                        //   backZf();
                        // } else {
                        //   this.$router.push({ path: "/" });
                        // }
                    } else {
                        this.$message({
                            showClose: true,
                            message: result.msg,
                            type: "warning"
                        });
                    }
                })
                .catch(error => { });
        }
    }
};
</script>
<style lang="scss">
.generate .el-button--warning {
    background-color: #cbb486;
}
.generate .el-button--info.is-disabled {
    background-color: #717e87;
}
.el-table thead.is-group th {
    border-bottom: 1px solid #cd9e57;
}
.bos .el-table td,
.bos .el-table th.is-leaf,
.bos .el-table--border,
.bos .el-table--group {
    border-color: #cd9e57;
}
.bos .el-table--border::after,
.bos .el-table--group::after,
.bos .el-table::before {
    background-color: #cd9e57;
}
.generate {
    .el-table__header-wrapper {
        overflow: initial;
    }
    .el-table th {
        background-color: transparent !important;
        /*color: white;*/
    }
    .el-table {
        background-color: transparent !important;
        /*color: white;*/
    }
    .el-row {
        display: flex;
        justify-content: center;
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
        padding: 20px;
    }
    .nowLi3 {
        background-image: url("../../assets/img/leftselect.png");
    }
    .bos {
        position: relative;
        padding-top: 20px;
        margin: 0% 11% 0 22%;
        width: 67%;
        background-color: #e5e9ee;
        border-radius: 10px;
        .scorll_content {
            /*max-height: 95% !important;*/
            width: 98%;
        }
    }
    .is_content {
        width: 97%;
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
        height: 100%;
        border-radius: 10px;
    }
    .nowLi4 {
        background-image: url("../../assets/img/leftselect.png");
    }
    .container-table {
        padding: 20px;
    }
    .container-table h3 {
        margin-bottom: 20px;
    }
    .generate /deep/ .el-table,
    .generate /deep/ .el-table th {
        color: #282828 !important;
    }
    /deep/ .el-table {
        .el-button {
            padding: 0 !important;
        }
        .el-button + .el-button {
            margin-left: 0 !important;
        }
        .cell {
            padding: 0 2px !important;
        }
        th {
            font-size: 16px;
        }
        td {
            font-size: 16px;
        }
        .cell {
            /*color: #fff;*/
            color: #282828;
        }
    }
    .gen-content {
        .main-business-form {
            margin: 10px 4px;
        }

        .container-button {
            margin-right: 5px;
            font-size: 16px;
            span {
                color: #cbb486 !important;
                cursor: pointer;
            }
            &:hover,
            &:focus {
                color: #cbb486;
            }
            &.disabled {
                color: #999;
                cursor: auto;
                &:hover {
                    text-decoration: none;
                }
            }
        }
    }
    .six-content h3 {
        color: #05d7eb;
    }
    .rightnext {
        left: 55px;
    }
}
.form_boss {
    table tr {
        border: 1px solid #05d7eb;
    }
}
.downMeterail {
    table {
        border-collapse: collapse;
    }
    input {
        border: 0;
        border-bottom: 1px solid #000;
        font-size: 16px;
        color: black;
        letter-spacing: 1px;
    }
    td {
        border: 1px solid #ccc;
        color: black;
        font-size: 16px;
        word-break: break-all;
        font-weight: 300;
        font-family: 宋体, SimSun;
    }
    textarea {
        border: 0;
        display: none;
    }
    body {
        margin: 0;
        padding: 0;
        font-size: 14px;
        line-height: 27px;
    }
    p {
        margin: 5px 0;
    }
    td p {
        margin: 0;
    }
    input[type="checkbox"]:disabled {
        position: relative;
    }
    input[type="checkbox"]:disabled::before {
        content: "";
        position: absolute;
        top: 0;
        left: -1px;
        width: 11px;
        height: 11px;
        line-height: 15px;
        border: 1px solid #ccc;
        text-align: center;
        color: white;
        font-size: 15px;
        background-color: white;
        border-radius: 4px;
    }
    input[type="checkbox"]:checked:disabled::before {
        content: "✔";
        position: absolute;
        top: -1px;
        left: -1px;
        width: 11px;
        height: 11px;
        line-height: 15px;
        border: 1px solid #ccc;
        text-align: center;
        color: black;
        font-size: 15px;
        background-color: white;
        border-radius: 4px;
    }
    input[type="checkbox"]:disabled {
        position: relative;
    }
}
</style>
<style scoped lang="scss">
.btn-upload {
    color: #cbb486;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
}
</style>

<style lang="scss" scoped>
.nuxt-btn-panel {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    .nuxt-btn {
        cursor: pointer;
        font-size: 16px;
        background-color: #cbb486;
        color: #fff;
        padding: 13px 30px;
        text-align: center;
        line-height: 1;
        border-radius: 25px;
        margin: 0 20px;
        &[disabled] {
            background-color: #c8c9cc;
            // pointer-events: none;
            cursor: not-allowed;
        }
    }
}

.container-button {
    margin-right: 5px;
    font-size: 14px;

    color: #cbb486;
    &:hover,
    &:focus {
        color: #cbb486;
    }
    &.disabled {
        color: #999;
        cursor: auto;
        &:hover {
            text-decoration: none;
        }
    }
}

.three-content {
    /deep/ {
        .el-table__row:hover {
            background-color: rgba(201, 201, 201, 0.411) !important;
            & > td {
                background-color: transparent !important;
                // background-color: rgba(0, 0, 0, 0.1) !important;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.info-title {
    font-size: 18px;
    font-weight: 400;
    color: #666666;
    width: 70%;
    margin: 0 auto;
    line-height: 2;
    text-align: center;
}
.btn-box {
    padding: 50px 0;
    display: flex;
    justify-content: center;
}
.info-btn {
    padding: 15px 20px;
    color: #fff;
    text-align: center;
    background: #cbb486;
    border-radius: 40px;
    font-size: 18px;
}
</style>
<style lang="scss" >
.info-panel {
    border-radius: 25px;
}
</style>