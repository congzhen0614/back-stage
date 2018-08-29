<template>
  <div class="order-delive">
    <el-form ref="form" :model="form" label-width="120px">
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="3">
          <el-input v-model="form.shipperCodeMagazine" placeholder="请输入杂志承运方"></el-input>
        </el-col>
        <el-col :span="5">
          <el-input v-model="form.logisticCodeMagazine" placeholder="请输入杂志发货单号"></el-input>
        </el-col>
        <el-col :span="3">
          <el-switch
            v-model="form.selfDelivery"
            :active-value="1"
            :inactive-value="0"
            active-text="自送"
            inactive-text="寄送"
            active-color="#13ce66"
            inactive-color="#409EFF">
          </el-switch>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input v-model="form.shipperCode" placeholder="请输入图书承运方"></el-input>
        </el-col>
        <el-col :span="5">
          <el-input v-model="form.logisticCode" placeholder="请输入图书发货单号"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-button @click="goback">取消</el-button>
        <el-button @click="onSubmit" type="primary">确定</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'order-delive',
  data () {
    return {
      form: {
        logisticCode: '',
        logisticCodeMagazine: '',
        selfDelivery: 0,
        shipperCode: '',
        shipperCodeMagazine: '',
        tradeId: this.$route.query.id
      }
    }
  },
  methods: {
    onSubmit () {
      this.$axios.delive(this.form).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功')
          this.$router.go(-1)
        }
      })
    },
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
  .order-delive {
    padding: 20px;
  }
</style>
