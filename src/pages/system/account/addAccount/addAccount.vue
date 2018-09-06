<template>
  <div class="system-account-add">
    <el-form ref="form" :model="form" label-width="150px" :rules="rules" style="width: 650px">
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="form.username" prop="name"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名:" prop="realname">
        <el-input v-model="form.realname"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="所属组织:" prop="groupId">
        <el-select v-model="form.groupId" filterable placeholder="请选择组织" :disabled="!isSuperAdmin">
          <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="高级用户(VIP):" v-if="groupType === 1 && form.roleLevel === 4">
        <el-select v-model="form.userId" placeholder="请选择组织">
          <el-option v-for="item in belongList" :key="item.id" :label="item.realname" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="高级用户（组织）:" v-if="groupType === 1 && form.roleLevel === 5">
        <el-select v-model="form.userId" placeholder="请选择">
          <el-option v-for="item in belongList" :key="item.id" :label="item.realname" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="高级用户(个人):" v-if="groupType === 0 && form.roleLevel === 5">
        <el-select v-model="form.userId" placeholder="请选择">
          <el-option v-for="item in belongList" :key="item.id" :label="item.realname" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色:">
        <el-radio-group v-model="form.roleId">
          <el-radio-button :label="item.id" v-for="item in roles" :key="item.id">{{ item.rolename }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="服务范围:">
        <el-region @province="province" @cities="cities" @regions="regions" :form="{}"></el-region>
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
import rules from '@/common/rules.js'
export default {
  name: 'system-account-add',
  components: {
    'el-region': region
  },
  data () {
    return {
      isSuperAdmin: JSON.parse(localStorage.getItem('user')).roleLevel === 1,
      rules: rules.accountRules,
      form: {
        groupId: JSON.parse(localStorage.getItem('user')).groupId
      },
      groupType: '',
      roles: [],
      groupList: [],
      belongList: []
    }
  },
  mounted () {
    this.getGroup()
  },
  computed: {
  },
  methods: {
    getGroup () {
      this.$axios.admingroupList().then(res => {
        if (res.data.code === '0') {
          this.groupList = res.data.data.list
          res.data.data.list.forEach(item => {
            if (item.id === this.form.groupId) {
              this.groupType = item.type
            }
          })
          this.loadRoleList()
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
          this.roles = res.data.data
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
      this.$axios.accountListCandidate({
        level: this.form.roleLevel,
        groupId: this.form.groupId,
        type: this.groupType
      }).then(res => {
        if (res.data.code === '0') {
          this.belongList = res.data.data
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
      this.groupList.forEach(item => {
        if (item.id === val) {
          this.groupType = item.type
          this.loadRoleList()
          if (this.form.roleLevel) this.loadAccountList()
        }
      })
    },
    'form.roleId' (val) {
      this.roles.forEach(item => {
        if (item.id === val) {
          this.form.roleLevel = item.level
          this.loadAccountList()
        }
      })
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
