<template>
  <div class="journal-Manage-catalogue-QRenerat">
    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" limit="1" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
    </el-dialog>
    <el-row style="margin-top: 20px">
      <el-button type="primary" @click="clickCreate">生成二维码</el-button>
      <el-button @click="goBack">取消</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'journal-Manage-catalogue-QRenerat',
  components: {},
  data () {
    return {}
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    handlePictureCardPreview () {},
    handleRemove () {},
    clickCreate () {
      this.$router.push({
        path: '/QRlist'
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  watch: {}
}
</script>

<style>
</style>
