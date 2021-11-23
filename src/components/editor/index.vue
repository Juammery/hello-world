<template>
  <vue-neditor-wrap :class="disabled ? 'neditor-disabled' : ''" v-model="content" :config="myConfig" :destroy="false" @ready="ready"></vue-neditor-wrap>
</template>

<script>
import VueNeditorWrap from 'vue-neditor-wrap'
import $ from 'jquery'
export default {
  props: ['value', 'disabled'],
  data () {
    return {
      myConfig: {
        // 上传服务器接口地址
        serverUrl: '/api/admin/upload/uploadAvatar',
        imageActionName: 'image',
        scrawlActionName: 'scrawl',
        videoActionName: 'video',
        fileActionName: 'file',
        fileAllowFiles: ['.txt','.doc','.docs','.docx','.xls','.xlsx','.ppt','.pptx','.pdf','.odt','.ott','.fodt','.uot','.xml','.dot','.htm','.html','.rtf','.docm','.zip','.rar','.tar','.7z','.tar.gz','.tar.bz','.tar.xz'],
        fileMaxSize: 20480000, //附件大小，20M
        initialContent: '',
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: '/NEditor/',
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 400,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 关闭自动保存
        enableAutoSave: false,
        // 上传大小限制，单位B
        imageMaxSize: 1024000, // 1M
        //编辑器层级的基数,默认是900
        zIndex: 11000,
        //首行缩进距离,默认是2em
        indentValue:'2em',
        //编辑器初始化结束后,编辑区域是否是只读的，默认是false
        readonly : false,
        //removeFormat
        //清除格式时可以删除的标签和属性
        removeFormatTags: 'header,section,main,article,aside',
        // removeFormatAttributes属性
        removeFormatAttributes: 'class,hspace,valign,style',
      },
    }
  },
  components: {
    VueNeditorWrap,
  },
  created () {
    this.myConfig.readonly = this.disabled
   
  },
  computed: {
    content: {
      // getter
      get: function () {
        return this.value || ''
      },
      // setter
      set: function (newValue) {
        this.$emit('input', newValue)
      },
    },
  },
  methods: {
    ready () {},
  },
}
</script>

<style lang="scss">
.neditor-disabled {
  .edui-editor-toolbarbox {
    display: none;
  }
}
</style>
