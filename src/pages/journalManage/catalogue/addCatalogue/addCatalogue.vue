<template>
  <div class="journal-Manage-catalogue-add">
    <header class="header">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="目录名称:">
              <el-input v-model="form.title" placeholder="请输入目录名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人:">
              <el-input v-model="form.linkman" placeholder="请输入联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话:">
              <el-input v-model="form.linkmobile" placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="提示语:">
              <el-input v-model="form.tip" placeholder="请输入提示语"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注:">
              <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="适合年龄:">
              <el-select v-model="form.schoolLevel">
                <el-option label="幼儿园" value="2"></el-option>
                <el-option label="小学" value="0"></el-option>
                <el-option label="初中" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-tabs type="border-card">
        <el-tab-pane label="杂志"><el-magaList @mageDate="mageDate"></el-magaList></el-tab-pane>
        <el-tab-pane label="图书"><el-bookList @bookDate="bookDate"></el-bookList></el-tab-pane>
        <el-tab-pane label="视听"><el-audioList @ypspDate="ypspDate"></el-audioList></el-tab-pane>
      </el-tabs>
    </header>
    <el-row style="margin-top: 20px; margin-left: 20px">
      <el-button type="primary" @click="onSave">保存书单</el-button>
      <el-button @click="goBack">取消</el-button>
    </el-row>
  </div>
</template>

<script>
import magaList from '@/components/magaList/magaList.vue'
import bookList from '@/components/bookList/bookList.vue'
import audioList from '@/components/audioList/audioList.vue'
export default {
  name: 'journal-Manage-catalogue-add',
  components: {
    'el-magaList': magaList,
    'el-bookList': bookList,
    'el-audioList': audioList
  },
  data () {
    return {
      windowHeight: window.innerHeight - 500 + 'px',
      options: [],
      search: [],
      form: {
        items: [],
        tip: '',
        title: '',
        remark: '',
        linkman: '',
        linkmobile: '',
        postage: '',
        postageSum: '',
        schoolLevel: '',
        sendType: ''
      },
      tableList: [],
      mageList: [],
      bookList: [],
      ypspList: []
    }
  },
  mounted () {
  },
  methods: {
    handleSelectionChange (val) {
      console.log(val)
    },
    mageDate (val) {
      this.form.postage = val.postage === undefined ? '' : val.postage
      this.form.postageSum = val.postageSum === undefined ? '' : val.postageSum
      this.form.sendType = val.sendType === undefined ? '' : val.sendType
      this.mageList = val.items.length > 0 ? val.items : []
    },
    bookDate (val) {
      this.form.postageBook = val.postageBook === undefined ? '' : val.postageBook
      this.form.postageSumBook = val.postageSumBook === undefined ? '' : val.postageSumBook
      this.bookList = val.items.length > 0 ? val.items : []
    },
    ypspDate (val) {
      this.ypspList = val.items.length > 0 ? val.items : []
    },
    onSave () {
      this.$axios.itempackSave(this.form).then(res => {
        if (res.data.code === '0') {
          this.$message.success('添加成功!')
          this.$router.push({
            path: '/catalogue'
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
    goBack () {
      this.$router.go(-1)
    }
  },
  watch: {
    mageList () {
      this.form.items = this.mageList.concat(this.bookList).concat(this.ypspList)
    },
    bookList () {
      this.form.items = this.mageList.concat(this.bookList).concat(this.ypspList)
    },
    ypspList () {
      this.form.items = this.mageList.concat(this.bookList).concat(this.ypspList)
    }
  }
}
</script>

<style>
  .journal-Manage-catalogue-add header {
    padding: 20px;
    background-color: #F2F6FC;
  }
  .journal-Manage-catalogue-add .el-tabs {
    background-color: #ffffff;
  }
</style>
