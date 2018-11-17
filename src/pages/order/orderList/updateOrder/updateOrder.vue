<template>
  <div class="update-order">
    <header>
      <header class="update-order-heder">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="商品名称:">
                <el-select v-model="form.id" placeholder="请选择商品名称">
                  <el-option :label="item.name + ' ￥' + item.fee" :value="item.id" v-for="item in itemList" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="数量:">
                <el-input v-model="form.quantity" placeholder="请输入数量" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-button type="primary" size="mini" style="margin-top: 6px" @click="onAddList">添加选中商品</el-button>
            </el-col>
          </el-row>
        </el-form>
      </header>
    </header>
    <main style="padding: 0 20px">
      <template>
        <el-table :data="tableData" border>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="fee" label="商品价格" width="100"></el-table-column>
          <el-table-column prop="quantity" label="数量" width="100"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="onDelete(scope.$index)" type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </main>
    <footer class="footer-button">
      <el-button size="mini" type="primary" @click="onSubmit">保存提交</el-button>
      <el-button size="mini" @click="onCancel">取消</el-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'update-order',
  components: {},
  data () {
    return {
      // windowHeight: window.innerHeight - 100 + 'px',
      orderItem: JSON.parse(this.$route.query.item),
      formItem: JSON.parse(this.$route.query.form),
      form: {
        id: '',
        quantity: ''
      },
      tableData: [],
      itemList: []
    }
  },
  created () {
    this.tradeItemPackList()
  },
  mounted () {
    this.tableData.push({
      name: this.orderItem.name,
      fee: this.orderItem.fee,
      id: this.orderItem.itemId,
      quantity: this.orderItem.quantity
    })
  },
  methods: {
    tradeItemPackList () {
      this.$axios.tradeItemPackList({cls: this.orderItem.cls, itemPackId: this.formItem.qrzdItemPackId}).then(res => {
        if (res.data.code === '0') {
          this.itemList = res.data.data.itemViews
        } else {
          this.$message.error(res.data.code)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onAddList () {
      let formItem = {}
      let own = false
      if (this.form.quantity === '' || this.form.id === '') return
      this.itemList.forEach(item => {
        console.log(item)
        if (item.id === this.form.id) {
          formItem = {
            name: item.name,
            fee: item.fee,
            id: item.id,
            quantity: this.form.quantity
          }
        }
      })
      this.tableData.forEach(item => {
        if (item.id === this.form.id) {
          own = true
        }
      })
      if (!own) {
        this.tableData.push(formItem)
        this.form = {
          id: '',
          quantity: ''
        }
      }
    },
    onDelete (index) {
      this.tableData.splice(index, 1)
    },
    onCancel () {
      this.$router.go(-1)
    },
    onSubmit () {
      let qrzdTradeDetailUpdateViews = []
      this.tableData.forEach(item => {
        qrzdTradeDetailUpdateViews.push({
          id: item.id,
          quantity: parseInt(item.quantity)
        })
      })
      let param = {
        cls: this.orderItem.cls,
        qrzdTradeDetailUpdateViews: qrzdTradeDetailUpdateViews,
        tradeDetailId: this.orderItem.id,
        tradeId: this.$route.query.tradeId
      }
      this.$axios.detailUpdate(param).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功')
          this.$router.go(-1)
        } else {
          this.$message.error(res.data.msg)
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
.update-order-heder {
  padding: 20px;
  padding-bottom: 0px;
}
.bottom-button {
  padding: 20px;
}
.update-order .el-select {
  width: 100%;
}
.update-order {
  margin-bottom: 50px;
}
</style>
