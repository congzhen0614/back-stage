<template>
  <div class="journal-Manage-catalogue-add">
    <header class="header">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="订单名称:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="杂志" name="first">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="杂志名称:">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="是否上架:">
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="类别:">
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="类别一" value="shanghai"></el-option>
                    <el-option label="类别二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="试读年龄:">
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="年龄一" value="shanghai"></el-option>
                    <el-option label="年龄二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" plain>检索</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="商品配送方式:">
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="送到学校" value="shanghai"></el-option>
                    <el-option label="送到家里" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-input placeholder="请输入内容" v-model="form.input">
                  <template slot="prepend">订单金额未满</template>
                  <template slot="append">元</template>
                </el-input>
              </el-col>
              <el-col :span="5">
                <el-input placeholder="请输入内容" v-model="form.input">
                  <template slot="prepend">将收取运费</template>
                  <template slot="append">元</template>
                </el-input>
              </el-col>
            </el-row>
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
          </el-tab-pane>
          <el-tab-pane label="图书" name="second">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="杂志名称:">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="是否上架:">
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="类别:">
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="类别一" value="shanghai"></el-option>
                    <el-option label="类别二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="试读年龄:">
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="年龄一" value="shanghai"></el-option>
                    <el-option label="年龄二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" plain>检索</el-button>
              </el-col>
            </el-row>
            <el-row  :gutter="20" style="margin-bottom: 22px">
              <el-col :span="5">
                <el-input placeholder="金额" v-model="form.input">
                  <template slot="prepend">图书运费</template>
                  <template slot="append">元</template>
                </el-input>
              </el-col>
              <el-col :span="5">
                <el-input placeholder="金额" v-model="form.input">
                  <template slot="prepend">图书金额满</template>
                  <template slot="append">免运费</template>
                </el-input>
              </el-col>
            </el-row>
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
          </el-tab-pane>
          <el-tab-pane label="试听" name="third">
            <el-row  :gutter="20">
              <el-col :span="5">
                <el-form-item label="包名称:">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" plain>检索</el-button>
              </el-col>
            </el-row>
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
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </header>
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
      windowHeight: window.innerHeight - 500 + 'px',
      options: [],
      search: [],
      form: {},
      tableList: [],
      activeName: 'first'
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    handleSelectionChange () {},
    handleClick (item) {
      if (item.name === 'first') {
        this.windowHeight = window.innerHeight - 500 + 'px'
      } else if (item.name === 'second') {
        this.windowHeight = window.innerHeight - 498 + 'px'
      } else if (item.name === 'third') {
        this.windowHeight = window.innerHeight - 436 + 'px'
      }
    },
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
  .journal-Manage-catalogue-add .el-tabs {
    background-color: #ffffff;
  }
</style>
