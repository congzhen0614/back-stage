<template>
  <div class="upload-head-images">
    <el-upload
      action="http://192.168.0.231:8080/app-api/api/upload"
      list-type="picture-card"
      :limit="1"
      :on-success="handleSuccess"
      :on-preview="handlePictureCardPreview">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'upload-head-images',
  components: {},
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    handleSuccess (res) {
      if (res.result.status === '0') {
        let param = {
          logo: res.paths[0],
          ids: JSON.parse(this.$route.query.ids)
        }
        this.setMagazineCover(param)
      }
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    setMagazineCover (param) {
      this.$axios.magazineCover(param).then(res => {
        if (res.data.code === '0') {
          this.$message.success('添加成功!')
          this.$router.go(-1)
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    }
  },
  watch: {}
}
</script>

<style>
</style>
