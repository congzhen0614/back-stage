<template>
  <div class="order-update">
    <el-header class="order-update-header" style="height: auto">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单号:">
              <el-input v-model="form.no" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="下单人:">
              <el-input v-model="form.username" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单时间:">
              <el-input v-model="form.createdAt" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态:">
              <el-input v-model="form.mobile" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="业务员:">
              <el-input v-model="form.adminId" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注:">
              <el-input v-model="form.adminId" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮费:">
              <el-input v-model="form.deliveryFee" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="共计金额:">
              <el-input v-model="form.totalFee" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-tabs type="border-card" @tab-click="tabValChange">
        <el-tab-pane label="杂志">
          <el-form ref="form" :model="form" label-width="120px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="收件人:">
                  <el-input v-model="form.no" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系电话:">
                  <el-input v-model="form.username" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运费:">
                  <el-input v-model="form.deliveryFee" placeholder="请输入" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="共计金额:">
                  <el-input v-model="form.mobile" placeholder="请输入" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-form-item label="收货地址:"></el-form-item>
              </el-col>
              <el-col :span="2">
                <el-select v-model="form.provinceId" placeholder="请选择省" @change="selectProvince">
                  <el-option v-for="item in provinces" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <el-select v-model="form.cityId" placeholder="请选择市" @change="selectCity" :disabled="cities.length === 0">
                  <el-option v-for="item in cities" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <el-select v-model="form.regionId" placeholder="请选择区" :disabled="regions.length === 0">
                  <el-option v-for="item in regions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学校:">
                  <el-select v-model="form.schoolId" filterable placeholder="请选择">
                    <el-option v-for="item in schoolList" :key="item.value" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="年级:">
                  <el-select v-model="form.gradeId" placeholder="请选择">
                    <el-option v-for="item in gradeList" :key="item.value" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="班级:">
                  <el-select v-model="form.classId" placeholder="请选择">
                    <el-option v-for="item in classList" :key="item.value" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table :data="tradeDetail" border style="width: 100%" :height="windowHeight">
            <el-table-column prop="name" label="杂志名称"></el-table-column>
            <el-table-column prop="quantity" label="数量"></el-table-column>
            <el-table-column prop="fee" label="金额"></el-table-column>
            <el-table-column prop="" label="单品杂志状态"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="onAgreeRefund(scope.row)" type="text" size="small">退款</el-button>
                <el-button @click="onRejectRefund(scope.row)" type="text" size="small">拒绝退款</el-button>
                <!--<el-button @click="onUpload(scope.row)" type="text" size="small">修改</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="图书">
          <el-form ref="form" :model="form" label-width="120px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="收件人:">
                  <el-input v-model="form.no" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系电话:">
                  <el-input v-model="form.username" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运费:">
                  <el-input v-model="form.createdAt" placeholder="请输入" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="共计金额:">
                  <el-input v-model="form.mobile" placeholder="请输入" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-form-item label="收货地址:"></el-form-item>
              </el-col>
              <el-col :span="2">
                <el-select v-model="form.provinceId" placeholder="请选择省" @change="selectProvince">
                  <el-option v-for="item in provinces" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <el-select v-model="form.cityId" placeholder="请选择市" @change="selectCity" :disabled="cities.length === 0">
                  <el-option v-for="item in cities" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <el-select v-model="form.regionId" placeholder="请选择区" :disabled="regions.length === 0">
                  <el-option v-for="item in regions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-form-item label="详细地址:">
                  <el-input v-model="form.address" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table :data="tradeDetail" border style="width: 100%" :height="windowHeight">
            <el-table-column prop="name" label="图书名称"></el-table-column>
            <el-table-column prop="quantity" label="数量"></el-table-column>
            <el-table-column prop="fee" label="金额"></el-table-column>
            <el-table-column prop="" label="单品杂志状态"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="onAgreeRefund(scope.row)" type="text" size="small">退款</el-button>
                <el-button @click="onRejectRefund(scope.row)" type="text" size="small">拒绝退款</el-button>
                <!--<el-button @click="onUpload(scope.row)" type="text" size="small">修改</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="电子读物">
          <el-table :data="tradeDetail" border style="width: 100%" :height="spypHeight">
            <el-table-column prop="name" label="电子包名称"></el-table-column>
            <el-table-column prop="quantity" label="音频专辑"></el-table-column>
            <el-table-column prop="quantity" label="视频专辑"></el-table-column>
            <el-table-column prop="fee" label="金额"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="onUpload(scope.row)" type="text" size="small">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="commodityName + '商品状态: ' + ordersType" disabled></el-tab-pane>
      </el-tabs>
    </el-header>
    <el-row style="margin-top: 20px; margin-left: 20px">
      <el-button type="primary" @click="onSubmit">保存提交</el-button>
      <el-button @click="goBack">取消</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'order-update',
  components: {},
  data () {
    return {
      spypHeight: window.innerHeight - 442 + 'px',
      windowHeight: window.innerHeight - 570 + 'px',
      commodityName: '杂志',
      ordersType: '',
      cls: 1,
      form: {},
      schoolList: [],
      gradeList: [],
      classList: [],
      provinces: [],
      cities: [],
      regions: [],
      tradeDetail: []
    }
  },
  created () {},
  mounted () {
    this.loadDetail()
    this.loadDetails()
    this.loadSchoolList()
    this.loadGradeList()
    this.loadClassList()
    this.loadProvinceList()
  },
  computed: {
    detailsParam () {
      let param = {
        tradeId: this.$route.query.id,
        cls: this.cls
      }
      return param
    },
    updateParam () {
      let param = {
        id: parseInt(this.$route.query.id),
        address: this.form.address,
        cityId: parseInt(this.form.cityId),
        classId: parseInt(this.form.classId),
        className: this.form.className,
        consigneeMobile: this.form.consigneeMobile,
        consigneeName: this.form.consigneeName,
        gradeId: parseInt(this.form.gradeId),
        provinceId: parseInt(this.form.provinceId),
        regionId: parseInt(this.form.regionId),
        schoolId: parseInt(this.form.schoolId)
      }
      return param
    }
  },
  methods: {
    loadDetail () {
      this.$axios.tradeDetail(this.$route.query.id).then(res => {
        if (res.data.code === '0') {
          this.form = res.data.data
          console.log(this.form)
          if (this.form.cityId) {
            this.loadcitiesList(this.form.provinceId)
          }
          if (this.form.regionId) {
            this.loadregionsList(this.form.cityId)
          }
          this.form.provinceId = this.form.provinceId.toString()
          this.form.cityId = this.form.cityId.toString()
          this.form.regionId = this.form.regionId.toString()
          this.form.gradeId = this.form.gradeId.toString()
          this.form.classId = this.form.classId.toString()
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadDetails () {
      this.$axios.tradeDetails(this.detailsParam).then(res => {
        if (res.data.code === '0') {
          this.tradeDetail = res.data.data.tradeDetailViews
          this.ordersType = res.data.data.tradeStatusName
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadSchoolList () {
      this.$axios.schoolList().then(res => {
        if (res.data.code === '0') {
          this.schoolList = res.data.data.list
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadGradeList () {
      this.$axios.schGradeList().then(res => {
        if (res.data.code === '0') {
          this.gradeList = res.data.data
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadClassList () {
      this.$axios.schClassList().then(res => {
        if (res.data.code === '0') {
          this.classList = res.data.data
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    selectProvince (val) {
      this.cities = []
      this.regions = []
      this.search.cityId = ''
      this.search.regionId = ''
      this.loadcitiesList(val)
    },
    selectCity (val) {
      this.regions = []
      this.search.regionId = ''
      this.loadregionsList(val)
    },
    loadProvinceList () {
      this.$axios.province().then(res => {
        if (res.data.code === '0') {
          this.provinces = res.data.data
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadcitiesList (id) {
      this.$axios.cities({id: id}).then(res => {
        if (res.data.code === '0') {
          this.cities = res.data.data
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadregionsList (id) {
      this.$axios.regions({id: id}).then(res => {
        if (res.data.code === '0') {
          this.regions = res.data.data
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    tabValChange (val) {
      this.commodityName = val.label
      if (val.label === '杂志') {
        this.cls = 1
        this.loadDetails()
      } else if (val.label === '图书') {
        this.cls = 2
        this.loadDetails()
      } else if (val.label === '电子读物') {
        this.cls = 54
        this.loadDetails()
      }
    },
    onAgreeRefund (item) {
      this.$axios.tradeRefund({refund: true, tradeDetailId: item.id}).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
          this.loadDetails()
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onRejectRefund (item) {
      this.$axios.tradeRefund({refund: false, tradeDetailId: item.id}).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
          this.loadDetails()
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onUpload (item) {
      console.log(item)
    },
    onSubmit () {
      this.$axios.tradeUpdate(this.updateParam).then(res => {
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
    goBack () {
      this.$router.go(-1)
    }
  },
  watch: {}
}
</script>

<style>
  .order-update .order-update-header {
    background-color: #F2F6FC;
    padding: 20px;
  }
</style>
