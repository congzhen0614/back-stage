<template>
  <div class="system-account-add">
    <el-form ref="form" :model="form" label-width="150px" :rules="rules" style="width: 850px">
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
      <el-form-item label="所属组织:">
        <el-select v-model="form.groupId" placeholder="请选择组织">
          <el-option v-for="item in groups" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="VIP高级用户:" v-if="groupType === 1">
        <el-select v-model="form.groupId" placeholder="请选择组织">
          <el-option v-for="item in groups" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="高级用户:"  v-if="groupType === 0">
        <el-select v-model="form.groupId" placeholder="请选择组织">
          <el-option v-for="item in groups" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务范围:">
        <el-region @province="province" @cities="cities" @regions="regions"></el-region>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import region from '@/components/regionList/regionList.vue'
import rules from '@/libs/rules.js'
export default {
  name: 'system-account-add',
  components: {
    'el-region': region
  },
  data () {
    return {
      groupType: 0,
      rules: rules,
      groups: [],
      form: {}
    }
  },
  created () {
  },
  mounted () {
    this.getGroup()
    this.loadRoleList()
    this.loadAccountList()
  },
  computed: {
  },
  methods: {
    getGroup () {
      this.$axios.admingroupList().then(res => {
        if (res.data.code === '0') {
          this.groups = res.data.data.list
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadRoleList () {
      this.$axios.roleList({type: this.groupType}).then(res => {
        if (res.data.code === '0') {
          this.roles = res.data.data.list
          this.form.roleLevel = res.data.data.list[0].level
          this.form.rolename = res.data.data.list[0].rolename
          this.form.roleId = res.data.data.list[0].id
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadAccountList () {
      this.$axios.accountList({level: 1}).then(res => {
        if (res.data.code === '0') {
          console.log(res.data.data.list)
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
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
      this.$axios.accountSave(this.form).then(res => {
        if (res.data.code === '0') {
          this.$message.success('创建成功!')
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
  },
  watch: {
    'form.groupId' (val) {
      this.groups.forEach(item => {
        if (item.id === val) {
          this.groupType = item.type
        }
      })
    },
    groupType () {
      this.loadRoleList()
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
