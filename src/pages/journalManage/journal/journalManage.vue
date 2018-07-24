<template>
  <div class="journal-Manage">
    <el-header class="journal-Manage-header" style="height: auto">
      <el-form ref="form" :model="search" label-width="90px">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="名称：">
              <el-input v-model="search.name" placeholder="请输入名称筛选"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="刊号:">
              <el-input v-model="search.issn" placeholder="请输入编号筛选"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类别:">
              <el-select v-model="search.typeId" style="width: 50%; float: left; padding-right: 5px">
                <el-option :label="item.name" :value="item.id" v-for="item in typeList" :key="item.id"></el-option>
              </el-select>
              <el-select v-model="search.ageId" style="width: 50%; float: left; padding-left: 5px">
                <el-option :label="item.name" :value="item.id" v-for="item in ageList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否上架:">
              <el-select v-model="search.isSale">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="复制给商家:">
              <el-select v-model="search.merchants">
                <el-option :label="item.name" :value="item.id" v-for="item in groupList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="header-button-right">
          <el-row>
            <el-button type="primary" plain @click="loadDate">检索</el-button>
            <el-button type="primary" plain @click="copyToMagazine">批量复制</el-button>
            <el-button type="primary" plain @click="setMagazinePublish(1)">批量上架</el-button>
            <el-button type="primary" plain @click="setMagazinePublish(0)">批量下架</el-button>
          </el-row>
        </div>
        <div class="header-button">
          <el-button type="primary" icon="el-icon-plus" @click="clickAddNew">添加</el-button>
          <el-button type="primary" icon="el-icon-upload2" @click="dialogVisible = true">导入杂志</el-button>
          <el-button type="primary" @click="onUpload">上传封面图<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
      </el-form>
    </el-header>
    <el-main>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="名称" sortable></el-table-column>
        <el-table-column label="封面图" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <img :src="scope.row.logo" width="100%">
          </template>
        </el-table-column>
        <el-table-column prop="typeName" label="类别"></el-table-column>
        <el-table-column prop="ageName" label="年级"></el-table-column>
        <el-table-column prop="fee" label="价格" sortable></el-table-column>
        <el-table-column prop="feeUnitName" label="单位"></el-table-column>
        <el-table-column prop="giftName" label="礼品"></el-table-column>
        <el-table-column prop="isSale" label="是否上架"></el-table-column>
        <el-table-column prop="createdAt" label="创建日期" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.createdAt | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="onDelete(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="onUpdate(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="onUpload(scope.row)" type="text" size="small">上传图片</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.currentPage"
      :page-size="pages.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total">
    </el-pagination>
    <el-dialog :visible.sync="dialogVisible" width="25%">
      <el-upload class="upload-demo" drag multiple :show-file-list="false" :action="upLoadUrl" :on-success="upLoadSuccess" :on-error="upLoadError">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'journal-Manage',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 325 + 'px',
      dialogVisible: false,
      ageList: [],
      typeList: [],
      groupList: [],
      search: {},
      tableData: [],
      selectIds: [],
      upLoadUrl: this.$axios.magazineBatch(),
      pages: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted () {
    this.loadDate()
    this.loadItemageList()
    this.loadItemtypeList()
    this.loadAdmingroupList()
  },
  computed: {
    params () {
      let param = {
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize,
        issn: this.search.issn,
        name: this.search.name,
        typeId: this.search.typeId,
        ageId: this.search.ageId,
        isSale: this.search.isSale
      }
      return param
    },
    copyParams () {
      let param = {
        ids: this.selectIds,
        adminId: this.search.merchants
      }
      return param
    }
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
    loadAdmingroupList () {
      this.$axios.admingroupList().then(res => {
        if (res.data.code === '0') {
          this.groupList = res.data.data.list
        } else {
          this.$message.error(res.data.data.msg)
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
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 选择每页条数
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.loadDate()
    },
    // 选择第几页
    handleCurrentChange (val) {
      this.pages.pageNum = val
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
      this.$axios.magazineCopy(this.copyParams).then(res => {
        if (res.data.code === '0') {
          this.$message.success('操作成功!')
          this.loadDate()
        } else {
          this.$message.error(res.data.data.msg)
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
          this.$message.error(res.data.data.msg)
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
            this.$message.error(res.data.data.msg)
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
    onUpload () {
      this.$router.push({
        path: '/upLoadJournal'
      })
    },
    upLoadSuccess (res) {
      if (res.code === '0') {
        this.$message.success('导入成功!')
        this.dialogVisible = false
        this.loadDate()
      } else {
        this.$message.error(res.msg)
      }
    },
    upLoadError (res) {
      this.$message.error(res.msg)
    }
  },
  watch: {}
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
    padding: 20px;
  }
  .journal-Manage .header-button-right {
    float: right;
  }
  .journal-Manage .el-table .cell {
    text-align: justify;
  }
  .journal-Manage .el-upload,
  .journal-Manage .el-upload .el-upload-dragger {
    width: 100%;
  }
</style>
