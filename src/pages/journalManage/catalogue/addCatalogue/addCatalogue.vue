<template>
  <div class="journal-Manage-catalogue-add">
    <header class="header" style="height: auto">
      <el-row :gutter="40">
        <el-col :span="4">
          <el-select v-model="search.type" placeholder="请选择渠道商名称">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="search.type" placeholder="是否上架">
            <el-option :label="'是'" :value="1"></el-option>
            <el-option :label="'否'" :value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" plain>检索</el-button>
        </el-col>
      </el-row>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row style="margin-top: 20px" :gutter="20">
          <el-col :span="6">
            <el-form-item label="书单名称:">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="配送方式:">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.price">
              <template slot="prepend">订单金额未满:</template>
              <template slot="append">元</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.freight">
              <template slot="prepend">将收取运费:</template>
              <template slot="append">元</template>
            </el-input>
          </el-col>
        </el-row>
      </el-form>
    </header>
    <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="120" label="排序"></el-table-column>
      <el-table-column prop="groupName" label="姓名"></el-table-column>
      <el-table-column prop="roleName" label="类型"></el-table-column>
      <el-table-column prop="roleName" label="适度年龄"></el-table-column>
      <el-table-column prop="roleName" label="价格"></el-table-column>
      <el-table-column prop="roleName" label="订阅周期"></el-table-column>
      <el-table-column prop="roleName" label="礼品"></el-table-column>
    </el-table>
    <el-row style="margin-top: 20px">
      <el-button type="primary">保存书单</el-button>
      <el-button @click="goBack">取消</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'journal-Manage-catalogue-add',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 365 + 'px',
      options: [],
      search: [],
      form: {},
      tableList: []
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    handleSelectionChange () {},
    goBack () {
      this.$router.go(-1)
    }
  },
  watch: {}
}
</script>

<style>
  .journal-Manage-catalogue-add header {
    padding: 20px;
    background-color: #F2F6FC;
  }
</style>
