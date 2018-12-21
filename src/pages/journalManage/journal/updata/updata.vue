<template>
  <div class="journal-manage-add">
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="200px" size="mini">
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
          <el-checkbox :label="item.id" v-for="(item, index) in ageList" :key="item.id" @click.native="onSelectClick(index)" @change="onSelectChange">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="价格:" prop="fee">
        <el-input v-model="form.fee" type="number"></el-input>
      </el-form-item>
      <el-form-item label="价格单位:" prop="feeUnitNum">
        <el-row :gutter="10">
          <el-col :span="7">
            <el-select v-model="form.feeUnitType">
              <el-option label="半年" :value="0"></el-option>
              <el-option label="全年" :value="1"></el-option>
              <el-option label="其他" :value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <el-input v-model="form.feeUnitNum" type="number"></el-input>
          </el-col>
          <el-col :span="7">
            <el-select v-model="form.feeUnit" placeholder="请选择单位">
              <el-option label="册" :value="1"></el-option>
              <el-option label="期" :value="2"></el-option>
              <el-option label="套" :value="3"></el-option>
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
        <v-editor :contentStr="form.content" @content="content"></v-editor>
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
    </el-form>
    <footer class="footer-button">
      <el-button size="mini" type="primary" @click="onSubmit">保存提交</el-button>
      <el-button size="mini" @click="clickCancel">取消</el-button>
    </footer>
  </div>
</template>

<script>
import rules from '@/common/rules.js'
import editor from '@/components/editor/editor.vue'
export default {
  name: 'journal-manage-add',
  components: {
    'v-editor': editor
  },
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
      form: {},
      fileList2: []
    }
  },
  mounted () {
    this.getItem()
    this.loadItemageList()
    this.loadItemtypeList()
  },
  methods: {
    onSelectClick (index) {
      const event = window.event
      const that = this
      let indexArr = []
      if (event.shiftKey) {
        if (event.target.type === 'checkbox') {
          setTimeout(() => {
            indexArr = that.form.ageId.map(item => {
              let objIndex = ''
              that.ageList.forEach((obj, index) => {
                if (obj.id === item) {
                  objIndex = index
                }
              })
              return objIndex
            })
            let indexMin = Math.min(...indexArr)
            let indexMax = 0
            if (that.form.ageId.length > 0) {
              indexMax = index
            } else {
              indexMax = Math.max(...indexArr)
            }
            that.form.ageId = []
            for (var i = indexMin; i <= indexMax; i++) {
              let selected = false
              that.form.ageId.forEach(item => {
                if (item === that.ageList[i].id) {
                  selected = true
                }
              })
              if (!selected) {
                that.form.ageId.push(that.ageList[i].id)
              }
            }
          }, 10)
        }
      }
    },
    onSelectChange (val) {
      this.form.ageId.forEach((item, index) => {
        if (item === val) {
          this.form.ageId.splice(index, 1)
        }
      })
    },
    content (val) {
      this.form.content = val
    },
    getItem () {
      let typeId = []
      let ageId = []
      this.$route.query.typeId.split(',').forEach(item => {
        typeId.push(parseInt(item))
      })
      this.$route.query.ageId.split(',').forEach(item => {
        ageId.push(parseInt(item))
      })
      this.form = {
        id: this.$route.query.id,
        name: this.$route.query.name,
        nameShort: this.$route.query.nameShort,
        issn: this.$route.query.issn,
        typeId: typeId,
        ageId: ageId,
        fee: this.$route.query.fee,
        feeUnitType: this.$route.query.feeUnitType == null ? '' : parseInt(this.$route.query.feeUnitType),
        feeUnitNum: this.$route.query.feeUnitNum,
        feeUnit: this.$route.query.feeUnit == null ? '' : parseInt(this.$route.query.feeUnit),
        press: this.$route.query.press,
        pubdate: this.$route.query.pubdate,
        content: this.$route.query.content,
        memo: this.$route.query.memo,
        giftName: this.$route.query.giftName,
        isSale: this.$route.query.isSaleName === '已上架' ? 1 : 0
      }
    },
    loadItemageList () {
      this.$axios.itemageListCandidate().then(res => {
        if (res.data.code === '0') {
          this.ageList = res.data.data
          res.data.data.forEach(item => {
            this.ageSelect.push(item.id)
          })
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadItemtypeList () {
      this.$axios.itemtypeListCandidate().then(res => {
        if (res.data.code === '0') {
          this.typeList = res.data.data
          res.data.data.forEach(item => {
            this.typeSelect.push(item.id)
          })
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onSubmit () {
      if (this.form.feeUnit === '' || this.form.feeUnitType === '') {
        this.$message.warning('请选择价格单位')
        return false
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let ageId = this.form.ageId
          let typeId = this.form.typeId
          this.form.ageId = ageId.join(',')
          this.form.typeId = typeId.join(',')
          this.$axios.magazineUpdate(this.form).then(res => {
            if (res.data.code === '0') {
              this.$message.success('修改成功!')
              this.$router.push({
                path: '/journalManage'
              })
            } else {
              this.$message.error(res.data.msg)
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
  watch: {}
}
</script>

<style>
  .el-select {
    width: 100%;
  }
  .journal-manage-add {
    width: 900px;
    margin-bottom: 100px;
  }
  .journal-manage-add .el-checkbox.el-checkbox {
    width: 170px;
    margin-left: 0px;
  }
</style>
