<template>
  <div class="journal-manage-upLoad">
    <el-upload
      action="https://app.51weixiao.com/app-api/api/upload"
      list-type="picture-card"
      :multiple="multiple"
      :limit="limit"
      :before-upload="beforeUpload"
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
  name: 'journal-manage-upLoad',
  components: {},
  data () {
    return {
      limit: this.$route.query.type === '3' ? 5 : 1,
      multiple: this.$route.query.type === '3',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  mounted () {},
  computed: {},
  methods: {
    beforeUpload (file) {
      let k100 = 1024 * 100
      let k300 = 1024 * 300
      if (this.$route.query.type === 1) {
        if (file.size > k100) {
          this.$message.warning('图片大小不能超出100kb')
          return false
        }
      } else {
        if (file.size > k300) {
          this.$message.warning('图片大小不能超出300kb')
          return false
        }
      }
    },
    handleSuccess (res) {
      if (res.result.status === '0') {
        if (this.$route.query.type === '1') {
          let param = {
            logo: res.paths[0],
            ids: [this.$route.query.itemId]
          }
          this.setMagazineCover(param)
        } else if (this.$route.query.type === '2') {
          let param = {
            giftLogo: res.paths[0],
            id: this.$route.query.itemId
          }
          this.setMagazineGiftlogo(param)
        } else if (this.$route.query.type === '3') {
          let param = {
            urls: res.paths,
            itemId: parseInt(this.$route.query.itemId)
          }
          this.setMagazineItemImgSave(param)
        } else if (this.$route.query.type === '4') {
          let param = {
            id: this.$route.query.id,
            url: res.paths[0]
          }
          this.setMagazineItemImgUpdate(param)
        }
      }
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    setMagazineCover (param) {
      this.$axios.magazineCover(param).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
          this.$router.go(-1)
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    setMagazineGiftlogo (param) {
      this.$axios.magazineGiftlogo(param).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
          this.$router.go(-1)
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    setMagazineItemImgSave (param) {
      this.$axios.magazineItemImgSave(param).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    setMagazineItemImgUpdate (param) {
      this.$axios.magazineItemImgUpdate(param).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
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
  .journal-manage-upLoad {
    padding: 20px;
  }
  .journal-manage-upLoad .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    width: auto;
    height: 100%;
  }
</style>
