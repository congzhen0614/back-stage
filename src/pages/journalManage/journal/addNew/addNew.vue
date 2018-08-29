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
        <el-checkbox :indeterminate="isIndeterminateType" v-model="checkAllType" @change="handleCheckAllType">全选</el-checkbox>
        <el-checkbox-group v-model="form.typeId">
          <el-checkbox :label="item.id" v-for="item in typeList" :key="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="产品类别(年级):" prop="ageId">
        <el-checkbox :indeterminate="isIndeterminateAge" v-model="checkAllAge" @change="handleCheckAllAge">全选</el-checkbox>
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
        <!--<el-input type="textarea" v-model="form.content"></el-input>-->
        <quill-editor v-model="form.content" :options="editorOption"></quill-editor>
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
import rules from '@/common/rules.js'
export default {
  name: 'journal-manage-add',
  components: {},
  data () {
    return {
      editorOption: {
        modules: {
          toolbar: ['bold', 'italic', 'strike', 'underline', 'image', 'clean']
        }
      },
      rules: rules.magazineRules,
      isIndeterminateType: false,
      checkAllType: false,
      isIndeterminateAge: false,
      checkAllAge: false,
      ageList: [],
      ageSelect: [],
      typeList: [],
      typeSelect: [],
      form: {
        isSale: 1,
        typeId: [],
        ageId: []
      },
      fileList2: []
    }
  },
  mounted () {
    this.loadItemageList()
    this.loadItemtypeList()
  },
  computed: {
    params () {
      let ageId = this.form.ageId
      let typeId = this.form.typeId
      let param = {
        ageId: ageId.join(','),
        content: this.form.content,
        fee: this.form.fee,
        feeUnit: this.form.feeUnit,
        feeUnitNum: this.form.feeUnitNum,
        feeUnitType: this.form.feeUnitType,
        giftName: this.form.giftName,
        isSale: this.form.isSale,
        issn: this.form.issn,
        memo: this.form.memo,
        name: this.form.name,
        nameShort: this.form.nameShort,
        press: this.form.press,
        pubdate: this.form.pubdate,
        typeId: typeId.join(',')
      }
      return param
    }
  },
  methods: {
    loadItemageList () {
      this.$axios.itemageList().then(res => {
        if (res.data.code === '0') {
          this.ageList = res.data.data.list
          res.data.data.list.forEach(item => {
            this.ageSelect.push(item.id)
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
    loadItemtypeList () {
      this.$axios.itemtypeList().then(res => {
        if (res.data.code === '0') {
          this.typeList = res.data.data.list
          res.data.data.list.forEach(item => {
            this.typeSelect.push(item.id)
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
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$axios.magazineSave(this.params).then(res => {
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
    handleCheckAllType (val) {
      this.form.typeId = val ? this.typeSelect : []
      this.isIndeterminateType = false
    },
    handleCheckAllAge (val) {
      this.form.ageId = val ? this.ageSelect : []
      this.isIndeterminateAge = false
    },
    clickCancel () {
      this.$router.go(-1)
    }
  },
  watch: {
    'form.typeId' (val) {
      if (val.length === 0) {
        this.checkAllType = false
        this.isIndeterminateType = false
      } else if (val.length > 0 && val.length < this.typeSelect.length) {
        this.checkAllType = false
        this.isIndeterminateType = true
      } else if (val.length === this.typeSelect.length) {
        this.checkAllType = true
        this.isIndeterminateType = false
      }
    },
    'form.ageId' (val) {
      if (val.length === 0) {
        this.checkAllAge = false
        this.isIndeterminateAge = false
      } else if (val.length > 0 && val.length < this.ageSelect.length) {
        this.checkAllAge = false
        this.isIndeterminateAge = true
      } else if (val.length === this.ageSelect.length) {
        this.checkAllAge = true
        this.isIndeterminateAge = false
      }
    }
  }
}
</script>

<style>
  .el-select {
    width: 100%;
  }
  .journal-manage-add {
    width: 1000px;
  }
  .journal-manage-add .el-checkbox.el-checkbox {
    width: 170px;
    margin-left: 0px;
  }
  .journal-manage-add .el-textarea__inner {
    min-height: 100px!important;
  }
</style>
