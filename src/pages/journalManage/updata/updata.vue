<template>
  <div class="journal-manage-updata">
    <el-form ref="form" :model="form" label-width="200px" >
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="名称缩写">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="编号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="刊号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="封面图">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList2" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品类别">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="积分设置">
        <el-row>
          <el-col :span="12">
            <el-input v-model="form.name"></el-input>
          </el-col>
          <el-col :span="12">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="价格单位">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="产品介绍">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="订购说明">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="封面图">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList2" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="赠品">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="是否上架">
        <el-radio-group v-model="form.resource">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否宝贝积分商品">
        <el-radio-group v-model="form.resource">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="clickCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'journal-manage-add',
  components: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      fileList2: []
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    clickCancel () {
      this.$router.go(-1)
    }
  },
  watch: {}
}
</script>

<style>
  .el-select {
    width: 100%;
  }
  .journal-manage-updata {
    width: 900px;
  }
</style>
