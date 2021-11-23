<template>
  <div>
    <el-row v-loading="quillUpdateImg">
      <quill-editor class="quill-editor" ref="myQuillEditor" :content="content" :options="editorOption" @blur="onEditorBlur($event);" @focus="onEditorFocus($event);" @ready="onEditorReady($event);" @change="onEditorChange($event);" :disabled="disabled">
      </quill-editor>
    </el-row>
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// import hljs from 'highlight.js'
import { mapState } from 'vuex'
import { quillEditor, Quill } from 'vue-quill-editor'
import { ImageExtend, QuillWatch } from 'quill-image-extend-module'

Quill.register('modules/ImageExtend', ImageExtend)

// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ['clean'], // remove formatting button
  ['link', 'image', 'video'],  
]

export default {
  props: ['value', 'disabled'],
  data () {
    return {
      quillUpdateImg: false,
      editorOption: {
        placeholder: '请在这里输入文本',
        modules: {
          ImageExtend: {
            loading: true,
            name: 'file',
            size: 1, //图片大小
            action: '/api/admin/upload/uploadAvatar', //上传的地址
            response: (res) => {
              return res
            },
            headers: (xhr) => {
              xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token)
            },
            start: () => {
              this.quillUpdateImg = true
            },
            success: () => {
              this.quillUpdateImg = false
            },
            error: () => {
              this.quillUpdateImg = false
              this.$message.error('图片上传失败')
            },
            sizeError: () => {
              this.$message.error('图片太大，只可上传大小不超过1M的图片')
            },
          },
          toolbar: this.disabled
            ? false
            : {
                container: toolbarOptions,
                handlers: {
                  'image': function () {
                    QuillWatch.emit(this.quill.id)
                  },
                },
              },
          // import hljs from 'highlight.js'
          // syntax: {
          //   highlight: text => hljs.highlightAuto(text).value,
          // },
        },
      },
    }
  },
  computed: {
    content: {
      // getter
      get: function () {
        return this.value
      },
      // setter
      set: function (newValue) {
        this.$emit('input', newValue)
      },
    },
    ...mapState({
      userInfo: state => state.user.userInfo,
      access_token: state => state.user.access_token,
    }),
  },
  methods: {
    onEditorChange ({ html }) {
      // console.log('editor change!', quill, html, text)
      this.content = html
    },
    onEditorBlur () {
      // console.log('editor blur!', editor)
    },
    onEditorFocus () {
      // console.log('editor focus!', editor)
    },
    onEditorReady () {
      // console.log('editor ready!', editor)
    },
  },
  components: {
    quillEditor,
  },
}
</script>

<style lang="scss" scoped>
.quill-editor {
  width: 100%;
  float: left;
  /deep/ p[class^="ql-indent-"],
  p[class*="ql-indent-"] {
    padding-left: 0 !important;
  }
}
.quill-editor /deep/ .ql-container {
  height: 200px;
}
.quill-editor /deep/ .ql-picker-label::before {
  position: absolute;
}
.quill-editor /deep/ .ql-icon-picker .ql-picker-label svg {
  position: absolute;
}
.quill-editor /deep/ .ql-color-picker .ql-picker-label svg {
  position: absolute;
}
/* ql indent */
.quill-editor /deep/ .ql-indent-1:not(.ql-direction-rtl) {
  text-indent: 2em !important;
}

.quill-editor /deep/ .ql-indent-1.ql-direction-rtl.ql-align-right {
  text-indent: 2em !important;
}

.quill-editor /deep/ .ql-indent-2:not(.ql-direction-rtl) {
  text-indent: 4em !important;
}

.quill-editor /deep/ .ql-indent-2.ql-direction-rtl.ql-align-right {
  text-indent: 4em !important;
}

.quill-editor /deep/ .ql-indent-3:not(.ql-direction-rtl) {
  text-indent: 6em !important;
}

.quill-editor /deep/ .ql-indent-3.ql-direction-rtl.ql-align-right {
  text-indent: 6em !important;
}

.quill-editor /deep/ .ql-indent-4:not(.ql-direction-rtl) {
  text-indent: 8em !important;
}

.quill-editor /deep/ .ql-indent-4.ql-direction-rtl.ql-align-right {
  text-indent: 8em !important;
}

.quill-editor /deep/ .ql-indent-5:not(.ql-direction-rtl) {
  text-indent: 10em !important;
}

.quill-editor /deep/ .ql-indent-5.ql-direction-rtl.ql-align-right {
  text-indent: 10em !important;
}

.quill-editor /deep/ .ql-indent-6:not(.ql-direction-rtl) {
  text-indent: 12em !important;
}

.quill-editor /deep/ .ql-indent-6.ql-direction-rtl.ql-align-right {
  text-indent: 12em !important;
}

.quill-editor /deep/ .ql-indent-7:not(.ql-direction-rtl) {
  text-indent: 14em !important;
}

.quill-editor /deep/ .ql-indent-7.ql-direction-rtl.ql-align-right {
  text-indent: 14em !important;
}

.quill-editor /deep/ .ql-indent-8:not(.ql-direction-rtl) {
  text-indent: 16em !important;
}

.quill-editor /deep/ .ql-indent-8.ql-direction-rtl.ql-align-right {
  text-indent: 16em !important;
}

.quill-editor /deep/ .ql-indent-9:not(.ql-direction-rtl) {
  text-indent: 18em !important;
}

.quill-editor /deep/ .ql-indent-9.ql-direction-rtl.ql-align-right {
  text-indent: 18em !important;
}
</style>
