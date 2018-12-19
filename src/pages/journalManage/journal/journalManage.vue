<template>
  <div class="journal-Manage">
    <el-header class="journal-Manage-header" style="height: auto">
      <el-form ref="form" :model="search" size="mini">
        <el-row>
          <el-col :span="3">
            <el-form-item label="名称：" label-width="50px">
              <el-input v-model="search.name" placeholder="名称筛选" @keyup.enter.native="clickSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="刊号:" label-width="45px">
              <el-input v-model="search.issn" placeholder="刊号筛选" @keyup.enter.native="clickSearch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="类别:" label-width="45px">
              <el-select v-model="search.typeId" style="width: 50%;float: left">
                <el-option label="全部" :value="''"></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in typeList" :key="item.id"></el-option>
              </el-select>
              <el-select v-model="search.ageId" style="width: 50%;float: left">
                <el-option label="全部" :value="''"></el-option>
                <el-option :label="item.name" :value="item.id" v-for="item in ageList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否上架:" label-width="70px">
              <el-select v-model="search.isSale">
                <el-option label="全部" :value="''"></el-option>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="商家账号:" label-width="70px">
              <el-select v-model="search.createUser">
                <el-option label="全部" :value="''"></el-option>
                <el-option :label="item.username" :value="item.id" v-for="item in accountList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="havePermission('magazine:copy')">
            <el-form-item label="复制给商家:" label-width="80px">
              <el-select v-model="search.merchants" :disabled="roleLevel === 4 || roleLevel === 6">
                <el-option :label="item.username" :value="item.id" v-for="item in groupList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="header-button-right">
          <el-row>
            <el-button size="mini" type="primary" plain @click="clickSearch">检索</el-button>
          </el-row>
        </div>
        <div class="header-button">
          <el-button size="mini" type="primary" @click="clickAddNew" v-if="havePermission('magazine:add')">添加</el-button>
          <el-button size="mini" type="primary" @click="dialogVisible = true" v-if="havePermission('magazine:batch')">导入杂志</el-button>
          <el-button size="mini" type="primary" @click="onUploadImages" v-if="havePermission('magazine:updatelogo')">上传封面图</el-button>
          <el-button size="mini" type="primary" @click="setMagazinePublish(1)" v-if="havePermission('magazine:publish')">批量上架</el-button>
          <el-button size="mini" type="primary" @click="setMagazinePublish(0)" v-if="havePermission('magazine:publish')">批量下架</el-button>
          <el-button size="mini" type="primary" @click="copyToMagazine" v-if="havePermission('magazine:copy')">批量复制</el-button>
        </div>
      </el-form>
    </el-header>
    <el-main>
      <el-table
        border
        size="mini"
        :data="tableData"
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :height="windowHeight"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" ></el-table-column>
        <el-table-column prop="name"       label="名称"    sortable min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="issn"       label="刊号"             min-width="150"></el-table-column>
        <el-table-column                   label="封面图"  width="60">
          <template slot-scope="scope">
            <img :src="scope.row.logo" width="100%">
          </template>
        </el-table-column>
        <el-table-column prop="typeName"   label="类别"    width="100"></el-table-column>
        <el-table-column prop="ageName"    label="年级"    min-width="250" show-overflow-tooltip></el-table-column>
        <el-table-column prop="fee"        label="价格"    width="100"  sortable></el-table-column>
        <el-table-column prop="feeUnitNum" label="单位"    width="100" >
          <template slot-scope="scope">
            <span>{{ scope.row.feeUnitTypeName }}</span>
            <span>{{ scope.row.feeUnitNum }}</span>
            <span>{{ scope.row.feeUnitName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="giftName"   label="礼品"      min-width="250" show-overflow-tooltip></el-table-column>
        <el-table-column prop="isSale"     label="是否上架"  width="100" >
          <template slot-scope="scope">
            <span v-if="scope.row.isSale === 1">是</span>
            <span v-if="scope.row.isSale === 0">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt"  label="创建日期"  width="200" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.createdAt | timeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right"     label="操作"       width="200">
          <template slot-scope="scope">
            <el-button @click="onUpdate(scope.row)" type="text" size="mini" v-if="havePermission('magazine:update')">修改</el-button>
            <el-button @click="onDelete(scope.row)" type="text" size="mini" v-if="havePermission('magazine:delete')">删除</el-button>
            <el-button @click="onUpload(scope.row)" type="text" size="mini" v-if="havePermission('magazine:updatelogo') || havePermission('magazine:giftlogo') || havePermission('itemimg:save')">上传图片</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-pagination
      small
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pages.pageNum"
      :page-size="pages.pageSize"
      :page-sizes="[20, 50, 75, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total">
    </el-pagination>
    <el-dialog :visible.sync="dialogVisible" width="25%">
      <el-upload
        class="upload-demo"
        drag
        multiple
        :action="upLoadUrl"
        :headers="{Authorization: authorization}"
        :show-file-list="false"
        :on-success="upLoadSuccess"
        :on-error="upLoadError"
        :before-upload="beforeAvatarUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip" style="cursor: pointer" @click="loadTemplate">点击下载模板</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import pages from '@/store/pages/managePages.js'
export default {
  name: 'journal-Manage',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 170 + 'px',
      dialogVisible: false,
      authorization: JSON.parse(localStorage.getItem('user')).authorization,
      roleLevel: JSON.parse(localStorage.getItem('user')).roleLevel,
      ageList: [],
      typeList: [],
      groupList: [],
      accountList: [],
      search: {
        name: pages.pages.name || '',
        issn: pages.pages.issn || '',
        ageId: pages.pages.ageId || '',
        typeId: pages.pages.typeId || '',
        isSale: pages.pages.isSale || '',
        createUser: pages.pages.createUser || ''
      },
      tableData: [],
      selectIds: [],
      upLoadUrl: this.$axios.magazineBatch(),
      pages: {
        total: 0,
        pageNum: pages.pages.pageNum || 1,
        pageSize: pages.pages.pageSize || 20
      }
    }
  },
  created () {
    this.loadDate()
    this.loadItemageList()
    this.loadItemtypeList()
    this.loadAdmingroupList()
  },
  computed: {
    params () {
      let Trim = str => {
        if (str !== '') {
          return str.replace(/(^\s*)|(\s*$)/g, '')
        } else {
          return ''
        }
      }
      let param = {
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize,
        issn: this.search.issn,
        name: Trim(this.search.name),
        typeId: this.search.typeId,
        ageId: this.search.ageId,
        isSale: this.search.isSale,
        createUser: this.search.createUser
      }
      return param
    }
  },
  methods: {
    clickSearch () {
      pages.pages.name = this.search.name
      pages.pages.issn = this.search.issn
      pages.pages.ageId = this.search.ageId
      pages.pages.typeId = this.search.typeId
      pages.pages.isSale = this.search.isSale
      pages.pages.createUser = this.search.createUser
      this.loadDate()
    },
    loadItemageList () {
      this.$axios.itemageListCandidate().then(res => {
        if (res.data.code === '0') {
          this.ageList = res.data.data
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
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadAdmingroupList () {
      this.$axios.accountListCandidate({groupId: '', level: '', type: ''}).then(res => {
        let level = JSON.parse(localStorage.getItem('user')).roleLevel
        let adminID = JSON.parse(localStorage.getItem('user')).id
        this.accountList = res.data.data
        if (level === 1) {
          this.groupList = res.data.data
        } else {
          if (level === 4 || level === 6) {
            res.data.data.forEach(item => {
              if (item.id === adminID) {
                this.groupList = [item]
              }
            })
          } else {
            this.groupList = res.data.data
          }
        }
        if (this.roleLevel === 4 || this.roleLevel === 6) {
          this.search.merchants = this.groupList[0].id
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadDate () {
      this.$axios.magazineList(this.params).then(res => {
        if (res.data.code === '0') {
          this.tableData = res.data.data.list
          this.pages.total = res.data.data.total
          this.pages.pageNum = res.data.data.pageNum
          this.pages.pageSize = res.data.data.pageSize
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 选择每页条数
    handleSizeChange (val) {
      pages.pages.pageSize = val
      this.pages.pageSize = val
      this.loadDate()
    },
    // 选择第几页
    handleCurrentChange (val) {
      pages.pages.pageNum = val
      this.pages.pageNum = val
      console.log()
      this.loadDate()
    },
    // 选择的项目
    handleSelectionChange (item) {
      this.selectIds = []
      item.forEach(item => {
        this.selectIds.push(item.id)
      })
    },
    // 复制给渠道商
    copyToMagazine () {
      let groupId = ''
      this.groupList.forEach(item => {
        if (item.id === this.search.merchants) {
          groupId = item.groupId
        }
      })
      let param = {
        ids: this.selectIds,
        adminId: this.search.merchants,
        groupId: groupId
      }
      this.$axios.magazineCopy(param).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
          this.loadDate()
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    setMagazinePublish (isSale) {
      let param = {
        ids: this.selectIds,
        isSale: isSale
      }
      this.$axios.magazinePublish(param).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
          this.loadDate()
        } else {
          this.$message.error(res.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 添加
    clickAddNew () {
      this.$router.push({
        path: '/addNewJournal'
      })
    },
    // 删除
    onDelete (item) {
      this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.magazineDel({id: item.id}).then(res => {
          if (res.data.code === '0') {
            this.$message.success('删除成功!')
            this.loadDate()
          } else {
            this.$message.error(res.data.msg)
          }
        }, err => {
          this.$message.error(err)
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改
    onUpdate (item) {
      this.$router.push({
        path: '/updataJournal',
        query: item
      })
    },
    // 上传图片
    onUpload (item) {
      this.$router.push({
        path: '/imagesList',
        query: item
      })
    },
    beforeAvatarUpload (file) {
      let xls = 'application/vnd.ms-excel'
      let xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isXlsx = file.type === xls || file.type === xlsx
      if (!isXlsx) {
        this.$message.error('只能上传Excel')
      }
      return isXlsx
    },
    upLoadSuccess (res) {
      if (res.code === '0') {
        this.$message.success('导入成功!')
        this.dialogVisible = false
        this.loadDate()
      } else {
        if (typeof res.msg === 'string') {
          this.$message.error(res.msg)
          return false
        }
        let str = ''
        res.data.forEach(item => {
          str += '第' + item.id + '行'
          item.list.forEach((list, index) => {
            if (index + 1 === item.list.length) {
              str += list.msg + '。'
            } else {
              str += list.msg + '，'
            }
          })
        })
        this.$message.error(str)
      }
    },
    upLoadError (res) {
      this.$message.error(res.msg)
    },
    onUploadImages () {
      if (this.selectIds.length === 0) {
        this.$message.warning('请选择至少一种杂志!')
        return false
      }
      this.$router.push({
        path: '/upLoadImages',
        query: {
          ids: JSON.stringify(this.selectIds)
        }
      })
    },
    loadTemplate () {
      window.location.href = location.protocol + '//' + window.location.host + '/zdadmin/static/file/杂志批量导入模板.xlsx'
    }
  }
}
</script>

<style>
  .journal-Manage .el-main {
    padding: 0;
  }
  .journal-Manage .el-select {
    width: 100%;
  }
  .journal-Manage .journal-Manage-header {
    background-color: #F2F6FC;
    overflow: hidden;
    padding: 10px;
  }
  .journal-Manage .header-button-right {
    float: right;
  }
  .journal-Manage .el-upload,
  .journal-Manage .el-upload .el-upload-dragger {
    width: 100%;
  }
  .journal-Manage .el-table__body-wrapper .el-table__row {
    height: 80px;
  }
  .journal-Manage .el-table__fixed-body-wrapper .el-table__row {
    height: 80px;
  }
</style>
