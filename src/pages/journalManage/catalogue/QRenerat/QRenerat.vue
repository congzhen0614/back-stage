<template>
  <div class="journal-Manage-catalogue-QRenerat">
    <el-table :data="tableData" ref="upload" :height="windowHeight" style="margin-bottom: 20px">
      <el-table-column prop="name"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-upload ref="upload" class="upload-demo" :limit="1" :multiple="false" :on-success="upLoadSuccess" action="http://192.168.0.231:8080/app-api/api/upload">
            <el-button slot="trigger" size="small" type="primary" @click="selectFile(scope.row.id)" style="float: left">选择文件</el-button>
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </div>
</template>

<script>
export default {
  name: 'journal-Manage-catalogue-QRenerat',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 200 + 'px',
      tableData: JSON.parse(this.$route.query.items),
      fileList: [],
      uploadId: 0
    }
  },
  computed: {
    submitParams () {
      let ids = []
      this.tableData.forEach(item => {
        ids.push(item.id)
      })
      let params = {
        ids: ids
      }
      return params
    }
  },
  mounted () {
  },
  methods: {
    selectFile (id) {
      this.uploadId = id
    },
    upLoadSuccess (res) {
      this.updateLogo({id: this.uploadId, img: res.paths[0]})
    },
    updateLogo (params) {
      this.$axios.itempackUpdateLogo(params).then(res => {
        if (res.data.code === '0') {
          this.$message.success('上传成功!')
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onSubmit () {
      this.$axios.itempackUpdateQrcode(this.submitParams).then(res => {
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
  .journal-Manage-catalogue-QRenerat .el-upload {
    float: left;
    margin-right: 20px;
  }
  .journal-Manage-catalogue-QRenerat .el-upload-list {
    float: left;
  }
  .journal-Manage-catalogue-QRenerat .is-success {
    margin-top: 5px;
  }
</style>
