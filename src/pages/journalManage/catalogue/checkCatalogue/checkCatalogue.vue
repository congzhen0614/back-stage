<template>
  <div class="check-catalogue">
    <header class="header">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="8">
            <el-form-item label="目录名称:">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人:">
              <el-input v-model="form.linkman"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话:">
              <el-input v-model="form.linkmobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="提示语:">
              <el-input v-model="form.tip"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注:">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年级阶段:">
              <el-select v-model="form.schoolLevel">
                <el-option label="幼儿园" :value="2"></el-option>
                <el-option label="小学" :value="0"></el-option>
                <el-option label="初中" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </header>
    <div style="padding: 10px">
      <el-tabs type="border-card">
        <el-tab-pane label="杂志" v-if="magaIds.length > 0">
          <el-table :data="magaIds" style="width: 100%" border size="mini">
            <el-table-column prop="ord" label="排序" width="60" ></el-table-column>
            <el-table-column prop="name" label="名称" ></el-table-column>
            <el-table-column prop="typeNames" label="类别" ></el-table-column>
            <el-table-column prop="ageNames" label="适读年龄" ></el-table-column>
            <el-table-column prop="fee" label="价格" width="120" ></el-table-column>
            <el-table-column label="价格单位" >
              <template slot-scope="scope">
                <span>{{ scope.row.feeUnitType }}{{ scope.row.feeUnitNum }}{{ scope.row.feeUnit }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="giftName" label="礼品" ></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="图书" v-if="bookIds.length > 0">
          <el-table :data="bookIds" style="width: 100%" border size="mini">
            <el-table-column prop="ord" label="排序" width="60" ></el-table-column>
            <el-table-column prop="name" label="名称" ></el-table-column>
            <el-table-column prop="typeNames" label="类别" ></el-table-column>
            <el-table-column prop="ageNames" label="适读年龄" ></el-table-column>
            <el-table-column prop="fee" label="价格" width="120" ></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="视听" v-if="spypIds.length > 0">
          <el-table :data="spypIds" style="width: 100%" border size="mini">
            <el-table-column prop="ord" label="排序" width="60" ></el-table-column>
            <el-table-column prop="name" label="名称" ></el-table-column>
            <el-table-column prop="typeNames" label="类别" ></el-table-column>
            <el-table-column prop="ageNames" label="适读年龄" ></el-table-column>
            <el-table-column prop="fee" label="价格" width="120" ></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <footer class="footer-button">
      <el-button size="mini" @click="$router.go(-1)">返回</el-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'check-catalogue',
  data () {
    return {
      magaIds: [],
      bookIds: [],
      spypIds: [],
      form: {
        id: this.$route.query.itemId,
        items: [],
        linkman: '',
        linkmobile: '',
        postage: '',
        postageBook: '',
        postageSum: '',
        postageSumBook: '',
        remark: '',
        schoolLevel: '',
        sendType: '',
        tip: '',
        title: ''
      }
    }
  },
  created () {
    this.loadItempackDetail()
  },
  methods: {
    loadItempackDetail () {
      this.$axios.itempackDetail(this.$route.query.itemId).then(res => {
        if (res.data.code === '0') {
          this.magaIds = res.data.data.magazineIds
          this.bookIds = res.data.data.bookIds
          this.spypIds = res.data.data.videoIds
          this.form = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style>
.check-catalogue {
  margin-bottom: 50px;
}
.check-catalogue header {
  padding: 20px;
  background-color: #F2F6FC;
}
</style>
