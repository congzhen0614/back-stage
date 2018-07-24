<template>
  <div class="journal-manage-add">
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="200px">
      <el-form-item label="名称:" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="简称:">
        <el-input v-model="form.nameShort"></el-input>
      </el-form-item>
      <el-form-item label="刊号:" prop="issn">
        <el-input v-model="form.issn"></el-input>
      </el-form-item>
      <el-form-item label="产品类别(类别):" prop="typeId">
        <el-checkbox-group v-model="form.typeId">
          <el-checkbox :label="item.id" v-for="item in typeList" :key="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="产品类别(年级):" prop="ageId">
        <el-checkbox-group v-model="form.ageId">
          <el-checkbox :label="item.id" v-for="item in ageList" :key="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="价格:" prop="fee">
        <el-input v-model="form.fee"></el-input>
      </el-form-item>
      <el-form-item label="价格单位:">
        <el-row :gutter="10">
          <el-col :span="7">
            <el-select v-model="form.feeUnitType">
              <el-option label="半年" value="0"></el-option>
              <el-option label="全年" value="1"></el-option>
              <el-option label="其他" value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <el-input v-model="form.feeUnitNum"></el-input>
          </el-col>
          <el-col :span="7">
            <el-select v-model="form.feeUnit">
              <el-option label="册" value="1"></el-option>
              <el-option label="期" value="2"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="出版社:">
        <el-input v-model="form.press"></el-input>
      </el-form-item>
      <el-form-item label="出版时间:">
        <el-input v-model="form.pubdate"></el-input>
      </el-form-item>
      <el-form-item label="杂志介绍：（必填）" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="杂志亮点:">
        <el-input type="textarea" v-model="form.memo"></el-input>
      </el-form-item>
      <el-form-item label="礼品:">
        <el-input v-model="form.giftName"></el-input>
      </el-form-item>
      <el-form-item label="是否上架:">
        <el-radio-group v-model="form.isSale">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存提交</el-button>
        <el-button @click="clickCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import rules from '@/libs/rules.js'
export default {
  name: 'journal-manage-add',
  components: {},
  data () {
    return {
      ageList: [],
      typeList: [],
      form: {
        isSale: 1,
        typeId: [],
        ageId: []
      },
      fileList2: [],
      rules: rules
    }
  },
  mounted () {
    this.loadItemageList()
    this.loadItemtypeList()
  },
  methods: {
    loadItemageList () {
      this.$axios.itemageList().then(res => {
        if (res.data.code === '0') {
          this.ageList = res.data.data.list
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadItemtypeList () {
      this.$axios.itemtypeList().then(res => {
        if (res.data.code === '0') {
          this.typeList = res.data.data.list
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
      this.form.ageId = this.form.ageId.join(',')
      this.form.typeId = this.form.typeId.join(',')
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$axios.magazineSave(this.form).then(res => {
            if (res.data.code === '0') {
              this.$message.success('保存成功!')
              this.$router.push({
                path: '/journalManage'
              })
            } else {
              this.$message.error(res.data.data.msg)
            }
          }, err => {
            this.$message.error(err)
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          return false
        }
      })
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
  .journal-manage-add {
    width: 900px;
  }
  .journal-manage-add .el-checkbox.el-checkbox {
    width: 170px;
    margin-left: 0px;
  }
</style>
