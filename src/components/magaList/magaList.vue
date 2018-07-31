<template>
  <div class="magaList">
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
        <!--<el-col :span="5">-->
          <!--<el-form-item label="适读年龄:">-->
            <!--<el-select v-model="search.ageId">-->
              <!--<el-option :label="item.name" :value="item.id" v-for="item in ageList" :key="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <el-col :span="4">
          <el-button type="primary" plain @click="loadDate">检索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="form.postageSum">
            <template slot="prepend">图书金额未满:</template>
            <template slot="append">元</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="form.postage">
            <template slot="prepend">将收取运费:</template>
            <template slot="append">元</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-form-item label="配送方式:" style="margin-bottom: 0; height: 40px">
            <el-select v-model="form.sendType">
              <el-option label="发到学校" value="0"></el-option>
              <el-option label="发到家里" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table border ref="multipleTable" tooltip-effect="dark" :data="tableList" :height="windowHeight" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="排序" width="80">
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
  name: 'magaList',
  data () {
    return {
      windowHeight: window.innerHeight - 565 + 'px',
      search: {},
      form: {},
      ageList: [],
      typeList: [],
      tableList: [],
      selectIds: []
    }
  },
  props: ['sendType', 'postage', 'postageSum', 'magazineIds'],
  mounted () {
    this.loadItem()
    this.loadDate()
    this.loadItemtypeList()
  },
  methods: {
    loadItem () {
      // this.form.sendType = this.sendType
      this.form.postage = this.postage
      this.form.postageSum = this.postageSum
      this.form.magazineIds = this.magazineIds
    },
    handleSelectionChange (val) {
      let ids = []
      val.forEach(item => {
        ids.push({
          cls: 1,
          itemId: item.id,
          ord: parseInt(item.ord)
        })
      })
      this.selectIds = ids
    },
    loadDate () {
      this.$axios.magazineList(this.search).then(res => {
        if (res.data.code === '0') {
          this.tableList = res.data.data.list
          this.tableList.forEach((item, index) => {
            item.ord = 0
            this.form.magazineIds.forEach(j => {
              if (parseInt(j) === item.id) {
                this.$refs.multipleTable(this.tableList[index], true)
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
    'form.postageSum' (val) {
      this.$emit('mageDate', {
        postage: this.form.postage,
        postageSum: val,
        schoolLevel: this.form.schoolLevel,
        sendType: this.form.sendType,
        items: this.selectIds
      })
    },
    'form.postage' (val) {
      this.$emit('mageDate', {
        postage: val,
        postageSum: this.form.postageSum,
        schoolLevel: this.form.schoolLevel,
        sendType: this.form.sendType,
        items: this.selectIds
      })
    },
    'form.sendType' (val) {
      this.$emit('mageDate', {
        postage: this.form.postage,
        postageSum: this.form.postageSum,
        schoolLevel: this.form.schoolLevel,
        sendType: val,
        items: this.selectIds
      })
    },
    selectIds (val) {
      this.$emit('mageDate', {
        postage: this.form.postage,
        postageSum: this.form.postageSum,
        schoolLevel: this.form.schoolLevel,
        sendType: this.form.sendType,
        items: val
      })
    }
  }
}
</script>

<style>
  .magaList .el-table {
    margin-top: 20px;
  }
</style>
