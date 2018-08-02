<template>
  <div class="order-book">
    <el-header class="order-maga-header" style="height: auto">
      <el-form ref="form" :model="search" label-width="120px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单号:">
              <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号:">
              <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学生名称:">
              <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态">
              <el-select v-model="search.region" placeholder="请选择订单状态">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="省/市/区:">
              <el-cascader :options="options" v-model="search.orderSource"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学校:">
              <el-select v-model="search.orderSource" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年级/班级:">
              <el-cascader :options="options" v-model="search.orderSource"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="配送方式:">
              <el-select v-model="search.orderSource" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单时间(开始):" label-width="120px">
              <el-date-picker v-model="search.date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单时间(结束):">
              <el-date-picker v-model="search.date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单来源:">
              <el-select v-model="search.orderSource" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" style="margin-left: 50px" plain>检索</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-button type="primary">批量发货</el-button>
        <el-button type="primary">导出Excel</el-button>
      </el-row>
    </el-header>
    <el-table :data="tableData" style="width: 100%" border :height="windowHeight">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="" label="订单号"></el-table-column>
      <el-table-column prop="" label="订单明细"></el-table-column>
      <el-table-column prop="" label="区域"></el-table-column>
      <el-table-column prop="" label="收货地址"></el-table-column>
      <el-table-column prop="" label="学校名称"></el-table-column>
      <el-table-column prop="" label="订单总额"></el-table-column>
      <el-table-column prop="" label="下单人"></el-table-column>
      <el-table-column prop="" label="联系电话"></el-table-column>
      <el-table-column prop="" label="下单时间"></el-table-column>
      <el-table-column prop="" label="订单状态"></el-table-column>
      <el-table-column prop="" label="来源"></el-table-column>
      <el-table-column prop="" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button @click="onUpload(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="onChecke(scope.row)" type="text" size="small">查看流程</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="pages.total"
      :page-size="pages.pageSize"
      :current-page="pages.pageNum"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'order-book',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 450 + 'px',
      options: [],
      tableData: [],
      search: {},
      pages: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    handleCurrentChange (val) {
      console.log(val)
    },
    handleSizeChange (val) {
      console.log(val)
    },
    onUpload (item) {
      console.log(item)
    },
    onChecke (item) {
      console.log(item)
    }
  },
  watch: {}
}
</script>

<style>
</style>
