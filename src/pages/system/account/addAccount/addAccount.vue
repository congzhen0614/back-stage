<template>
  <div class="system-account-add">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" style="width: 500px">
      <el-form-item label="用户名:">
        <el-input v-model="form.username" prop="name"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名:">
        <el-input v-model="form.realname"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="业务范围:">
        <el-cascader :options="options" v-model="form.regionIds" placeholder="请选择活动区域"></el-cascader>
      </el-form-item>
      <el-form-item label="所属组织:">
        <el-select v-model="form.groupId" placeholder="请选择组织">
          <el-option v-for="item in groups" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色:">
        <el-radio-group v-model="form.roleId">
          <el-radio-button v-for="role in roles" :label="role" :key="role"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import rules from '@/libs/rules.js'
import area from '../../../../../static/js/area.json'
export default {
  name: 'system-account-add',
  components: {},
  data () {
    return {
      rules: rules,
      options: [],
      groups: [],
      form: {
        cityIds: '',
        groupId: '',
        password: '',
        phone: '',
        provinceIds: '',
        realname: '',
        regionIds: [],
        roleId: '普通用户',
        roleLevel: '',
        username: ''
      },
      roles: ['高级管理员', '管理员', '高级用户', '普通用户']
    }
  },
  created () {
  },
  mounted () {
    this.getGroup()
    this.getArea()
  },
  computed: {},
  methods: {
    getGroup () {
      this.$axios.admingroupList().then(res => {
        if (res.data.code === '0') {
          res.data.data.list.forEach(item => {
            this.groups.push({
              label: item.name,
              value: item.id
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
    getArea () {
      area.result.forEach(province => {
        let city = []
        province.citylist.forEach(cities => {
          let regionList = []
          cities.regionlist.forEach(region => {
            regionList.push({
              value: region.regionid,
              label: region.regionname
            })
          })
          city.push({
            value: cities.cityid,
            label: cities.cityname,
            children: regionList
          })
        })
        this.options.push({
          value: province.provinceid,
          label: province.provincename,
          children: city
        })
      })
    },
    onSubmit () {
      this.$axios.accountSave(this.form).then(res => {
        if (res.data.code === '0') {
          this.$message.success('创建成功!')
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
</style>
