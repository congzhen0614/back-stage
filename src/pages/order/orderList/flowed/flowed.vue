<template>
  <div class="order-flowed">
    <el-table :data="tableData" border size="mini">
      <el-table-column prop="no" label="订单号"></el-table-column>
      <el-table-column prop="adminName" label="业务员"></el-table-column>
      <el-table-column prop="receivables" label="订单总额"></el-table-column>
      <el-table-column prop="user" label="下单人"></el-table-column>
      <el-table-column prop="tradeStatusName" label="订单状态"></el-table-column>
      <el-table-column prop="updatedAt" label="操作时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedAt | timeFormat }}</span>
        </template>
      </el-table-column>
    </el-table>
    <footer class="footer-button">
      <el-button size="mini" @click="$router.go(-1)">返回</el-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'order-flowed',
  components: {},
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.loadFlow()
  },
  methods: {
    loadFlow () {
      this.$axios.tradeHis(this.$route.query.id).then(res => {
        if (res.data.code === '0') {
          this.tableData = res.data.data.qrzdTradeHisViews
        }
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
  .order-flowed {
    padding: 20px;
  }
</style>
