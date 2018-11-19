<template>
  <div class="editor">
    <el-upload
      class="avatar-uploader"
      action="https://app.51weixiao.com/app-api/api/upload"
      :multiple="true"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-error="uploadError">
    </el-upload>
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @change="onEditorChange($event)"
    >
    </quill-editor>
  </div>
</template>

<script>
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  [{'header': 1}, {'header': 2}],
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'indent': '-1'}, {'indent': '+1'}],
  [{'align': 'center'}, {'align': 'right'}],
  ['link', 'image'],
  ['clean']
]
export default {
  data () {
    return {
      quillUpdateImg: false,
      content: null,
      editorOption: {
        placeholder: '',
        theme: 'snow',
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              'image': function (value) {
                if (value) {
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }
    }
  },
  props: ['contentStr'],
  methods: {
    onEditorChange ({editor, html, text}) { // 内容改变事件
      this.content = html
    },
    uploadSuccess (res, file) {
      let quill = this.$refs.myQuillEditor.quill
      if (res.result.status === '0') {
        let length = quill.getSelection().index
        quill.insertEmbed(length, 'image', 'http://www.res.51weixiao.com/upload/' + res.paths[0])
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
    },
    uploadError () {
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    }
  },
  watch: {
    contentStr (val) {
      if (val) {
        this.content = val
      }
    },
    content (val) {
      this.$emit('content', val)
    }
  }
}
</script>

<style>
  .avatar-uploader {
    display: none;
  }
</style>
