<template>
  <div class="system-account-add">
    <el-form ref="form" :model="form" label-width="150px" :rules="rules" style="width: 650px">
      <el-form-item label="用户名:">
        <el-input v-model="form.username" prop="name" disabled></el-input>
      </el-form-item>
      <el-form-item label="真实姓名:">
        <el-input v-model="form.realname"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="业务范围:">
        <el-region @province="province" @cities="cities" @regions="regions" :form="form"></el-region>
      </el-form-item>
      <el-form-item label="所属组织:">
        <el-input v-model="form.groupName" disabled></el-input>
      </el-form-item>
      <el-form-item v-if="form.vipCreateUsername" label="高级用户(VIP):">
        <el-input v-model="form.vipCreateUsername" disabled></el-input>
      </el-form-item>
      <el-form-item v-if="form.roleLevel === 5" label="高级用户:">
        <el-input v-model="form.createUserName" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色:">
        <el-input v-model="form.roleName" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import region from '@/components/regionList/regionList.vue'
import rules from '@/common/rules.js'
export default {
  name: 'system-account-add',
  components: {
    'el-region': region
  },
  data () {
    return {
      rules: rules,
      form: {
        id: JSON.parse(this.$route.query.param).id,
        provinceId: JSON.parse(this.$route.query.param).provinceId,
        cityIds: JSON.parse(this.$route.query.param).citys,
        createUserName: JSON.parse(this.$route.query.param).createUserName,
        vipCreateUsername: JSON.parse(this.$route.query.param).vipCreateUsername,
        regionIds: JSON.parse(this.$route.query.param).regions,
        groupId: JSON.parse(this.$route.query.param).groupId,
        groupName: JSON.parse(this.$route.query.param).groupName,
        groupType: JSON.parse(this.$route.query.param).groupType,
        username: JSON.parse(this.$route.query.param).username,
        realname: JSON.parse(this.$route.query.param).realname,
        phone: JSON.parse(this.$route.query.param).phone,
        roleId: JSON.parse(this.$route.query.param).roleId,
        roleName: JSON.parse(this.$route.query.param).roleName,
        roleLevel: JSON.parse(this.$route.query.param).roleLevel,
        userId: JSON.parse(this.$route.query.param).userId
      }
    }
  },
  mounted () {
    console.log(JSON.parse(this.$route.query.param))
  },
  methods: {
    province (val) {
      this.form.provinceId = parseInt(val)
    },
    cities (val) {
      this.form.cityIds = []
      val.forEach(item => {
        this.form.cityIds.push(item)
      })
    },
    regions (val) {
      this.form.regionIds = []
      val.forEach(item => {
        this.form.regionIds.push(item)
      })
    },
    onSubmit () {
      this.$axios.accountUpdate(this.form).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
          this.$router.push({
            path: '/account'
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
  }
}
</script>

<style>
  .system-account-add .el-tag {
    margin-right: 10px;
  }
  .elDialog {
    height: 500px;
    overflow: auto;
    border-radius: 4px;
  }
</style>
