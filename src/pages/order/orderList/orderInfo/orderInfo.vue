<template>
  <div class="order-info">
    <header class="order-info-heder">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单号:">
              <el-input v-model="form.no" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态:">
              <el-input v-model="orderItem.tradeStatusName" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务员:">
              <el-input v-model="orderItem.adminName" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单金额:">
              <el-input v-model="form.receivables" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实付金额:">
              <el-input v-model="form.receipt" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运费:">
              <el-input v-model="form.deliveryFee" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="商品数:">
              <el-input v-model="form.itemQuantity" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下单人:">
              <el-input v-model="form.username" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下单时间:">
              <el-input v-model="form.createdAt" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="留言:">
              <el-input v-model="form.userRemark" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </header>
    <main class="table-main">
      <template>
        <header class="table-title">
          <span>收货信息</span>
        </header>
        <el-table :data="addressTable" border>
          <el-table-column prop="sendType" label="配送方式"></el-table-column>
          <el-table-column prop="addressStr" label="收件地址"></el-table-column>
          <el-table-column prop="mobile" label="收件人"></el-table-column>
          <el-table-column prop="name" label="联系电话"></el-table-column>
          <el-table-column label="操作" width="120" v-if="update">
            <template slot-scope="scope">
              <el-button @click="onAddressUpdate(scope.row)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-if="magaTable.length > 0">
        <header class="table-title">
          <span>杂志</span>
        </header>
        <el-table :data="magaTable" border>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="fee" label="商品价格"></el-table-column>
          <el-table-column prop="quantity" label="数量"></el-table-column>
          <el-table-column prop="totalCost" label="合计金额"></el-table-column>
          <el-table-column prop="refundStatus" label="商品状态">
            <template slot-scope="scope">
              <span v-if="scope.row.refundStatus === 0">正常</span>
              <span v-if="scope.row.refundStatus === 1">申请退款</span>
              <span v-if="scope.row.refundStatus === 2">拒绝退款</span>
              <span v-if="scope.row.refundStatus === 3">同意退款</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="330" v-if="update">
            <template slot-scope="scope">
              <el-button @click="onApplyRefund(scope.row)" type="text" size="small" v-if="scope.row.refundStatus === 0">申请退款</el-button>
              <el-button @click="onCancelRefund(scope.row)" type="text" size="small" v-if="scope.row.refundStatus === 1">取消退款</el-button>
              <el-button @click="onRepulseRefund(scope.row)" type="text" size="small" v-if="scope.row.refundStatus === 1">拒绝退款</el-button>
              <el-button @click="onRefund(scope.row)" type="text" size="small" v-if="scope.row.refundStatus === 1">同意退款</el-button>
              <el-button @click="onListUpdate(scope.row)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-if="bookTable.length > 0">
        <header class="table-title">
          <span>图书</span>
        </header>
        <el-table :data="bookTable" border>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="fee" label="商品价格"></el-table-column>
          <el-table-column prop="quantity" label="数量"></el-table-column>
          <el-table-column prop="totalCost" label="合计金额"></el-table-column>
          <el-table-column prop="refundStatus" label="商品状态">
            <template slot-scope="scope">
              <span v-if="scope.row.refundStatus === 0">正常</span>
              <span v-if="scope.row.refundStatus === 1">申请退款</span>
              <span v-if="scope.row.refundStatus === 2">拒绝退款</span>
              <span v-if="scope.row.refundStatus === 3">同意退款</span>
            </template>
          </el-table-column>
          <el-table-column prop="refundReason" label="申请退款原因"></el-table-column>
          <el-table-column prop="refundImgs" label="申请退款图片"></el-table-column>
          <el-table-column label="操作" width="330" v-if="update">
            <template slot-scope="scope">
              <el-button @click="onApplyRefund(scope.row)" type="text" size="small">申请退款</el-button>
              <el-button @click="onCancelRefund(scope.row)" type="text" size="small">取消退款</el-button>
              <el-button @click="onRepulseRefund(scope.row)" type="text" size="small">拒绝退款</el-button>
              <el-button @click="onRefund(scope.row)" type="text" size="small">同意退款</el-button>
              <el-button @click="onListUpdate(scope.row)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-if="spypTable.length > 0">
        <header class="table-title">
          <span>电子读物</span>
        </header>
        <el-table :data="spypTable" border>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="fee" label="商品价格"></el-table-column>
          <el-table-column prop="quantity" label="数量"></el-table-column>
          <el-table-column prop="totalCost" label="合计金额"></el-table-column>
          <el-table-column prop="refundStatus" label="商品状态"></el-table-column>
        </el-table>
      </template>
    </main>
  </div>
</template>

<script>
export default {
  name: 'order-info',
  components: {},
  data () {
    return {
      orderItem: JSON.parse(this.$route.query.item),
      update: this.$route.query.update,
      form: {},
      addressTable: [],
      magaTable: [],
      bookTable: [],
      spypTable: []
    }
  },
  created () {
    this.loadTradeDetail()
    this.loadTrade()
  },
  mounted () {
    console.log(this.update)
  },
  computed: {},
  methods: {
    loadTradeDetail () {
      this.$axios.tradeDetail(this.orderItem.id).then(res => {
        if (res.data.code === '0') {
          this.magaTable = res.data.data.magazinesDetails
          this.bookTable = res.data.data.booksDetails
          this.spypTable = res.data.data.packetsDetails
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadTrade () {
      this.$axios.trade(this.orderItem.id).then(res => {
        if (res.data.code === '0') {
          this.form = res.data.data
          this.setAddress(this.form)
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    setAddress (item) {
      if (item.address !== null) {
        this.addressTable.push({
          cls: 2,
          sendType: '寄送',
          addressStr: item.addressProvinceName + item.addressCityName + item.addressRegionName + item.address,
          address: item.address,
          provinceName: item.addressProvinceName,
          provinceId: item.addressProvinceId,
          cityName: item.addressCityName,
          cityId: item.addressCityId,
          regionName: item.addressRegionName,
          regionId: item.addressRegionId,
          mobile: item.consigneeMobile,
          name: item.consigneeName
        })
      }
      if (item.addressMagazine !== null && this.orderItem.sendType === 1) {
        this.addressTable.push({
          cls: 1,
          sendType: '寄送',
          addressStr: item.addressProvinceNameMagazine + item.addressCityNameMagazine + item.addressRegionNameMagazine + item.addressMagazine,
          address: item.addressMagazine,
          provinceName: item.addressProvinceNameMagazine,
          provinceId: item.addressProvinceIdMagazine,
          cityName: item.addressCityNameMagazine,
          cityId: item.addressCityIdMagazine,
          regionName: item.addressRegionNameMagazine,
          regionId: item.addressRegionIdMagazine,
          mobile: item.consigneeMobileMagazine,
          name: item.consigneeNameMagazine
        })
      }
      if (item.childId !== null && this.orderItem.sendType === 0) {
        this.addressTable.push({
          cls: 1,
          sendType: '直送',
          addressStr: item.provinceName + item.cityName + item.regionName + item.schoolName + item.gradeName + (item.className ? item.className : item.classNameDef),
          provinceName: item.provinceName,
          provinceId: item.provinceId,
          cityName: item.cityName,
          cityId: item.cityId,
          regionName: item.regionName,
          regionId: item.regionId,
          schoolName: item.schoolName,
          schoolId: item.schoolId,
          gradeName: item.gradeName,
          gradeId: item.gradeId,
          className: item.className,
          classId: item.classId,
          classNameDef: item.classNameDef,
          mobile: item.childMobile,
          name: item.childName
        })
      }
    },
    onAddressUpdate (item) {
      if (item.cls === 1 && item.sendType === '直送') {
        this.$router.push({
          path: '/updateChild',
          query: {
            item: JSON.stringify(item),
            tradeId: this.orderItem.id
          }
        })
      } else {
        this.$router.push({
          path: '/updateAddress',
          query: {
            item: JSON.stringify(item),
            tradeId: this.orderItem.id
          }
        })
      }
    },
    onApplyRefund (item) {
      this.$axios.refundApply({id: item.id}).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功')
          this.loadTradeDetail()
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onCancelRefund (item) {
      this.$axios.refundCancel({id: item.id}).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功')
          this.loadTradeDetail()
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onRepulseRefund (item) {
      this.$axios.tradeRefund({refund: false, tradeDetailId: item.id}).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功')
          this.loadTradeDetail()
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onRefund (item) {
      this.$axios.tradeRefund({refund: true, tradeDetailId: item.id}).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功')
          this.loadTradeDetail()
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onListUpdate (item) {
      this.$router.push({
        path: '/updateOrder',
        query: {
          item: JSON.stringify(item),
          form: JSON.stringify(this.form),
          tradeId: this.orderItem.id
        }
      })
    }
  },
  watch: {}
}
</script>

<style>
  .order-info-heder {
    padding: 20px;
    background-color: #F2F6FC;
  }
  .table-main {
    padding: 20px;
    padding-top: 0;
  }
  .table-title {
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    background-color: #F2F6FC;
    margin-top: 20px;
  }
</style>
