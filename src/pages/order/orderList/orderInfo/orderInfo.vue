<template>
  <div class="order-info">
    <header class="order-info-heder">
      <el-form ref="form" :model="search" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单号:">
              <el-input v-model="search.no" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态:">
              <el-select v-model="search.region" placeholder="请选择状态">
                <el-option label="待付款" value="0"></el-option>
                <el-option label="已付款" value="1"></el-option>
                <el-option label="已完成" value="2"></el-option>
                <el-option label="已退款" value="3"></el-option>
                <el-option label="订单失效" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务员:">
              <el-input v-model="search.mobile" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单金额:">
              <el-input v-model="search.no" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实付金额:">
              <el-input v-model="search.mobile" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运费:">
              <el-input v-model="search.mobile" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="商品数:">
              <el-input v-model="search.no" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下单人:">
              <el-input v-model="search.mobile" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下单时间:">
              <el-input v-model="search.mobile" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="留言:">
              <el-input v-model="search.no" placeholder="请输入" disabled></el-input>
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
          <el-table-column prop="date" label="配送方式"></el-table-column>
          <el-table-column prop="date" label="收件地址"></el-table-column>
          <el-table-column prop="date" label="收件人"></el-table-column>
          <el-table-column prop="date" label="联系电话"></el-table-column>
          <el-table-column prop="date" label="操作" width="120"></el-table-column>
        </el-table>
      </template>
      <template>
        <header class="table-title">
          <span>杂志</span>
        </header>
        <el-table :data="magaTable" border>
          <el-table-column prop="date" label="商品名称"></el-table-column>
          <el-table-column prop="date" label="商品价格"></el-table-column>
          <el-table-column prop="date" label="数量"></el-table-column>
          <el-table-column prop="date" label="合计金额"></el-table-column>
          <el-table-column prop="date" label="商品状态"></el-table-column>
          <el-table-column prop="date" label="操作" width="120"></el-table-column>
        </el-table>
      </template>
      <template>
        <header class="table-title">
          <span>图书</span>
        </header>
        <el-table :data="bookTable" border>
          <el-table-column prop="date" label="商品名称"></el-table-column>
          <el-table-column prop="date" label="商品价格"></el-table-column>
          <el-table-column prop="date" label="数量"></el-table-column>
          <el-table-column prop="date" label="合计金额"></el-table-column>
          <el-table-column prop="date" label="商品状态"></el-table-column>
          <el-table-column prop="date" label="申请退款原因"></el-table-column>
          <el-table-column prop="date" label="申请退款图片"></el-table-column>
          <el-table-column prop="date" label="操作" width="120"></el-table-column>
        </el-table>
      </template>
      <template>
        <header class="table-title">
          <span>电子读物</span>
        </header>
        <el-table :data="spypTable" border>
          <el-table-column prop="date" label="商品名称"></el-table-column>
          <el-table-column prop="date" label="商品价格"></el-table-column>
          <el-table-column prop="date" label="数量"></el-table-column>
          <el-table-column prop="date" label="合计金额"></el-table-column>
          <el-table-column prop="date" label="商品状态"></el-table-column>
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
      search: {},
      addressTable: [],
      magaTable: [],
      bookTable: [],
      spypTable: []
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {},
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
