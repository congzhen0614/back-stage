<template>
  <div class="check-catalogue">
    <header class="header">
      <el-form ref="form" :model="form" label-width="100px">
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
      <el-tabs type="border-card" v-if="magaIds.length > 0">
        <el-tab-pane label="杂志">
          <el-table :data="magaIds" style="width: 100%" border>
            <el-table-column prop="ord" label="排序" width="60" align="center"></el-table-column>
            <el-table-column prop="name" label="名称" header-align="center"></el-table-column>
            <el-table-column prop="typeNames" label="类别" header-align="center"></el-table-column>
            <el-table-column prop="ageNames" label="适读年龄" header-align="center"></el-table-column>
            <el-table-column prop="fee" label="价格" width="120" align="center"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="图书" v-if="bookIds.length > 0">
          <el-table :data="bookIds" style="width: 100%" border>
            <el-table-column prop="ord" label="排序" width="60" align="center"></el-table-column>
            <el-table-column prop="name" label="名称" header-align="center"></el-table-column>
            <el-table-column prop="typeNames" label="类别" header-align="center"></el-table-column>
            <el-table-column prop="ageNames" label="适读年龄" header-align="center"></el-table-column>
            <el-table-column prop="fee" label="价格" width="120" align="center"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="视听" v-if="spypIds.length > 0">
          <el-table :data="spypIds" style="width: 100%" border>
            <el-table-column prop="ord" label="排序" width="60" align="center"></el-table-column>
            <el-table-column prop="name" label="名称" header-align="center"></el-table-column>
            <el-table-column prop="typeNames" label="类别" header-align="center"></el-table-column>
            <el-table-column prop="ageNames" label="适读年龄" header-align="center"></el-table-column>
            <el-table-column prop="fee" label="价格" width="120" align="center"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </header>
  </div>
</template>

<script>
export default {
  name: 'check-catalogue',
  components: {},
  data () {
    return {
      magaIds: JSON.parse(this.$route.query.item).magazineIds,
      bookIds: JSON.parse(this.$route.query.item).bookIds,
      spypIds: JSON.parse(this.$route.query.item).videoIds,
      form: {
        id: JSON.parse(this.$route.query.item).id,
        items: [],
        linkman: JSON.parse(this.$route.query.item).linkman,
        linkmobile: JSON.parse(this.$route.query.item).linkmobile,
        postage: JSON.parse(this.$route.query.item).postage,
        postageBook: JSON.parse(this.$route.query.item).postageBook,
        postageSum: JSON.parse(this.$route.query.item).postageSum,
        postageSumBook: JSON.parse(this.$route.query.item).postageSumBook,
        remark: JSON.parse(this.$route.query.item).remark,
        schoolLevel: parseInt(JSON.parse(this.$route.query.item).schoolLevel),
        sendType: parseInt(JSON.parse(this.$route.query.item).sendType),
        tip: JSON.parse(this.$route.query.item).tip,
        title: JSON.parse(this.$route.query.item).title
      }
    }
  },
  created () {
  },
  mounted () {
    console.log(this.magaIds)
    console.log(this.bookIds)
    console.log(this.spypIds)
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style>
.check-catalogue header {
  padding: 20px;
  background-color: #F2F6FC;
}
</style>
