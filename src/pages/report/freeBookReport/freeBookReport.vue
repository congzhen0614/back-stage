<template>
  <div class="free-book-report">
    <header>
      <el-button size="mini" type="primary" @click="onExport">福建地区图书赠送统计报表导出</el-button>
    </header>
  </div>
</template>

<script>
export default {
  name: 'free-book-report',
  components: {},
  data () {
    return {}
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    onExport () {
      let _url = '/qrzd/fujian/trade/report/export'
      window.location.href = window.location.protocol + '//' + window.location.host + _url
    }
  },
  watch: {}
}
</script>

<style>
  .free-book-report header {
    width: 100%;
    padding: 10px;
    background-color: #F2F6FC;
  }
</style>
