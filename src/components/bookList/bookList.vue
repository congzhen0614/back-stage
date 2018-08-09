<template>
  <div class="bookList">
    <el-form ref="form" :model="search" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="书名:">
            <el-input v-model="search.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="是否上架:">
            <el-select v-model="search.isSale">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="类别:">
            <el-select v-model="search.typeId">
              <el-option :label="item.name" :value="item.id" v-for="item in typeList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" plain @click="loadDate">检索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="form.postageSumBook">
            <template slot="prepend">商品金额:</template>
            <template slot="append">元</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="form.postageBook">
            <template slot="prepend">将收取运费:</template>
            <template slot="append">元</template>
          </el-input>
        </el-col>
      </el-row>
    </el-form>
    <el-table border ref="multipleTable" tooltip-effect="dark" :data="tableList" :height="windowHeight" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="ord" type="index" label="排序" width="100" sortable>
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.ord" @change="ordChange(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="typeName" label="类别"></el-table-column>
      <el-table-column prop="ageName" label="适读年龄"></el-table-column>
      <el-table-column prop="fee" label="价格"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'bookList',
  data () {
    return {
      windowHeight: window.innerHeight - 565 + 'px',
      search: {
        isSale: 1
      },
      form: {
        postageBook: this.postageBook,
        postageSumBook: this.postageSumBook
      },
      ageList: [],
      typeList: [],
      tableList: [],
      selectIds: []
    }
  },
  props: ['postageBook', 'postageSumBook', 'bookIds'],
  mounted () {
    this.loadDate()
    this.loadItemtypeList()
  },
  methods: {
    handleSelectionChange (val) {
      let ids = []
      val.forEach(item => {
        ids.push({
          cls: 2,
          itemId: item.id,
          ord: parseInt(item.ord)
        })
      })
      this.selectIds = ids
    },
    loadDate () {
      this.$axios.bookList(this.search).then(res => {
        if (res.data.code === '0') {
          this.tableList = res.data.data.list
          this.tableList.forEach(item => {
            item.ord = 9999
          })
          if (typeof this.bookIds === 'undefined') return false
          this.$nextTick(() => {
            this.tableList.forEach(item => {
              if (this.bookIds.join(',').indexOf(item.id) > -1) {
                this.$refs.multipleTable.toggleRowSelection(item, true)
              }
            })
          })
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    ordChange (obj) {
      if (this.selectIds.length > 0) {
        this.selectIds.forEach(item => {
          if (item.itemId === obj.id) {
            item.ord = parseInt(obj.ord)
          }
        })
      }
    },
    loadItemageList () {
      this.$axios.itemageList().then(res => {
        if (res.data.code === '0') {
          this.ageList = res.data.data.list
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadItemtypeList () {
      this.$axios.itemtypeList().then(res => {
        if (res.data.code === '0') {
          this.typeList = res.data.data.list
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
  watch: {
    'form.postageSumBook' (val) {
      this.$emit('bookDate', {
        postageBook: this.form.postageBook,
        postageSumBook: val,
        items: this.selectIds
      })
    },
    'form.postageBook' (val) {
      this.$emit('bookDate', {
        postageBook: val,
        postageSumBook: this.form.postageSumBook,
        items: this.selectIds
      })
    },
    selectIds (val) {
      this.$emit('bookDate', {
        postageBook: this.form.postageBook,
        postageSumBook: this.form.postageSumBook,
        items: val
      })
      console.log(val)
    }
  }
}
</script>

<style>
  .bookList .el-table {
    margin-top: 20px;
  }
</style>
