<template>
  <div class="system-account-add">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" style="width: 600px">
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
        <el-tag v-for="tag in tags" :key="tag.label" type="success">{{tag.label}}</el-tag>
        <el-button size="small" @click="clickScope()">添加</el-button>
      </el-form-item>
      <el-form-item label="所属组织:">
        <el-select v-model="form.groupId" placeholder="请选择组织">
          <el-option v-for="item in groups" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色:">
        <el-radio-group v-model="form.rolename">
          <el-radio-button v-for="role in roles" :label="role.rolename" :key="role.roleId"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog width="30%" custom-class="elDialog" :close-on-press-escape="true" :visible.sync="dialogVisible">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <el-tree :data="options" show-checkbox :check-strictly="true" @check-change="getSelectedNodes" :filter-node-method="filterNode" ref="tree"></el-tree>
    </el-dialog>
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
      dialogVisible: false,
      rules: rules,
      options: [],
      groups: [],
      tags: [],
      form: {
        cityIds: [],
        groupId: '',
        password: '',
        phone: '',
        provinceIds: [],
        realname: '',
        regionIds: [],
        roleId: 0,
        rolename: '',
        roleLevel: '',
        username: ''
      },
      roles: [],
      filterText: ''
    }
  },
  created () {
  },
  mounted () {
    this.getGroup()
    this.getArea()
    this.loadRoleList()
  },
  computed: {
  },
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
              label: region.regionname,
              grade: 3
            })
          })
          city.push({
            value: cities.cityid,
            label: cities.cityname,
            children: regionList,
            grade: 2
          })
        })
        this.options.push({
          value: province.provinceid,
          label: province.provincename,
          children: city,
          grade: 1
        })
      })
    },
    loadRoleList () {
      let param = {
        level: JSON.parse(localStorage.getItem('user')).roleLevel
      }
      this.$axios.roleList(param).then(res => {
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
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getSelectedNodes (val) {
      let exist = false
      this.tags.forEach((item, index) => {
        if (item.value === val.value) {
          this.tags.splice(index, 1)
          exist = true
        }
      })
      if (!exist) {
        this.tags.push(val)
      }
    },
    clickScope () {
      this.dialogVisible = true
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    'tags.length' (val) {
      this.form.provinceIds = []
      this.form.regionIds = []
      this.form.cityIds = []
      this.tags.forEach(item => {
        if (item.grade === 1) {
          this.form.provinceIds.push(item.value)
        } else if (item.grade === 2) {
          this.form.cityIds.push(item.value)
        } else if (item.grade === 3) {
          this.form.regionIds.push(item.value)
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
