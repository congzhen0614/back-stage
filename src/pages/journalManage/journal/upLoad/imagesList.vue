<template>
  <div class="images-list">
    <el-header class="journal-Manage-header" style="height: auto">
      <p style="font-size: 16px; margin-bottom: 20px">杂志名称: {{ info.name }}</p>
      <div class="header-button">
        <el-button size="small" type="primary" @click="addImages('1')" v-if="havePermission(45)">添加封面图</el-button>
        <el-button size="small" type="primary" @click="addImages('2')" v-if="havePermission(48)">添加礼品图</el-button>
        <el-button size="small" type="primary" @click="addImages('3')" v-if="havePermission(50)">添加内页图</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :height="windowHeight" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="缩略图" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <img :src="scope.row.url" width="100%">
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="上传时间">
          <template slot-scope="scope"><span>{{ scope.row.updatedAt | dateFormat }}</span></template>
        </el-table-column>
        <el-table-column prop="type" label="类别"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="onDelete(scope.row)" type="text" size="small" v-if="havePermission(19)">删除</el-button>
            <el-button @click="onUpdate(scope.row)" type="text" size="small" v-if="havePermission(45)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'images-list',
  components: {},
  data () {
    return {
      windowHeight: window.innerHeight - 250 + 'px',
      tableData: [],
      info: this.$route.query
    }
  },
  created () {
  },
  mounted () {
    this.loadDate()
  },
  computed: {},
  methods: {
    loadDate () {
      this.$axios.magazineItemImgst({itemId: this.info.id}).then(res => {
        if (res.data.code === '0') {
          this.tableData.push({
            updatedAt: res.data.data.updatedAt,
            url: res.data.data.logo,
            itemId: this.info.id,
            type: '封面图'
          })
          this.tableData.push({
            updatedAt: res.data.data.updatedAt,
            url: res.data.data.giftLogo,
            itemId: this.info.id,
            type: '礼品图'
          })
          res.data.data.qrzdItemImgs.forEach(item => {
            this.tableData.push({
              updatedAt: item.updatedAt,
              url: item.url,
              itemId: item.itemId,
              type: '内页图',
              id: item.id
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
    reload () {
      this.tableData = []
      this.loadDate()
    },
    handleSelectionChange (item) {
      console.log(item)
    },
    addImages (type, id) {
      this.$router.push({
        path: '/upLoadJournal',
        query: {
          itemId: this.$route.query.id,
          type: type,
          id: id
        }
      })
    },
    onDelete (item) {
      this.$confirm('此操作将删除该选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (item.type === '内页图') {
          this.isContent(item)
        } else {
          this.notContent(item)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    notContent (item) {
      let param = {
        coverOrGiftLogo: item.type === '封面图',
        id: item.itemId
      }
      this.$axios.magazineDoverDel(param).then(res => {
        if (res.data.code === '0') {
          this.$message.success('删除成功!')
          this.reload()
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    isContent (item) {
      this.$axios.magazineItemImgDel({id: item.id}).then(res => {
        if (res.data.code === '0') {
          this.$message.success('删除成功!')
          this.reload()
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onUpdate (item) {
      console.log(item)
      if (item.type === '封面图') {
        this.addImages('1')
      } else if (item.type === '礼品图') {
        this.addImages('2')
      } else {
        this.addImages('4', item.id)
      }
    }
  },
  watch: {}
}
</script>

<style>
  .images-list .el-main {
    padding: 0;
  }
  .images-list .journal-Manage-header {
    background-color: #F2F6FC;
    padding: 20px;
  }
</style>
