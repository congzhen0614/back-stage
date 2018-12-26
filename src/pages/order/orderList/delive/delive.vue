<template>
  <div class="order-delive">
    <el-form ref="form" :model="form" label-width="120px">
      <el-row :gutter="20" v-if="deliverType === 0 || deliverType === 1">
        <el-col :span="3">
          <el-select v-model="shipperCodeMagazine" placeholder="请选择杂志承运方" :disabled="form.sendType === 0" size="mini">
            <el-option value="yt" label="圆通快递"></el-option>
            <el-option value="yd" label="韵达快递"></el-option>
            <el-option value="tt" label="天天快递"></el-option>
            <el-option value="ems" label="EMS"></el-option>
            <el-option value="sto" label="申通快递"></el-option>
            <el-option value="zto" label="中通速递"></el-option>
            <el-option value="sf" label="顺丰速递"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input v-model="logisticCodeMagazine" placeholder="请输入杂志发货单号" :disabled="form.sendType === 0" size="mini"></el-input>
        </el-col>
        <el-col :span="4" v-if="!form.logisticCodeMagazine && !form.shipperCodeMagazine && !form.logisticCode && !form.shipperCode">
          <el-radio v-model="form.sendType" :label="0" size="mini">直送</el-radio>
          <el-radio v-model="form.sendType" :label="1" size="mini">寄送</el-radio>
        </el-col>
        <el-col :span="4" v-if="form.logisticCodeMagazine || form.shipperCodeMagazin|| form.logisticCode || form.shipperCode">
          <p style="height: 26px; line-height: 26px">{{ form.sendType === 0 ? '直送' : '寄送' }}</p>e
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="deliverType === 0 || deliverType === 2">
        <el-col :span="3">
          <el-select v-model="form.shipperCode" placeholder="请选择图书承运方" size="mini">
            <el-option value="yt" label="圆通快递"></el-option>
            <el-option value="yd" label="韵达快递"></el-option>
            <el-option value="tt" label="天天快递"></el-option>
            <el-option value="ems" label="EMS"></el-option>
            <el-option value="sto" label="申通快递"></el-option>
            <el-option value="zto" label="中通速递"></el-option>
            <el-option value="sf" label="顺丰速递"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input v-model="form.logisticCode" placeholder="请输入图书发货单号" size="mini"></el-input>
        </el-col>
      </el-row>
    </el-form>
    <footer class="footer-button">
      <el-button size="mini" @click="onSubmit" type="primary" v-if="hasSubmit">保存提交</el-button>
      <el-button size="mini" @click="goback">返回</el-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'order-delive',
  data () {
    return {
      deliverType: '',
      hasSubmit: '',
      shipperCodeMagazine: '',
      logisticCodeMagazine: '',
      form: {
        sendType: 0, // 0发到学校,1发到家里
        shipperCode: '', // 图书承运方
        logisticCode: '', // 图书发货单号
        shipperCodeMagazine: '', // 杂志承运方
        logisticCodeMagazine: '', // 杂志发货单号
        tradeId: this.$route.query.id
      }
    }
  },
  created () {
    this.loadTradeDelive()
  },
  methods: {
    loadTradeDelive () {
      this.$axios.tradeDelive(this.$route.query.id).then(res => {
        if (res.data.code === '0') {
          this.hasSubmit = res.data.data.hasSubmit
          this.deliverType = res.data.data.deliverType
          this.form.sendType = res.data.data.sendType === 2 ? 1 : res.data.data.sendType
          this.form.shipperCode = res.data.data.shipperCode
          this.form.logisticCode = res.data.data.logisticCode
          this.shipperCodeMagazine = res.data.data.shipperCodeMagazine
          this.logisticCodeMagazine = res.data.data.logisticCodeMagazine
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onSubmit () {
      this.form.shipperCodeMagazine = this.shipperCodeMagazine
      this.form.logisticCodeMagazine = this.logisticCodeMagazine
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
  },
  watch: {
    'form.sendType' (val) {
      let shipperCodeMagazine, logisticCodeMagazine
      if (val === 0) {
        shipperCodeMagazine = this.form.shipperCodeMagazine
        logisticCodeMagazine = this.form.logisticCodeMagazine
        this.form.shipperCodeMagazine = ''
        this.form.logisticCodeMagazine = ''
      } else {
        this.form.shipperCodeMagazine = shipperCodeMagazine
        this.form.logisticCodeMagazine = logisticCodeMagazine
      }
    }
  }
}
</script>

<style>
  .order-delive {
    padding: 20px;
  }
  .order-delive .el-row {
    margin-bottom: 20px;
  }
</style>
