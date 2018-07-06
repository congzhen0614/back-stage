<template>
  <div class="journal-manage-index">
    <journal-manage v-if="routeList.length === 2"></journal-manage>
    <router-view v-if="routeList.length > 2"></router-view>
  </div>
</template>

<script>
import journalManage from './journalManage.vue'
export default {
  name: 'journal-manage-index',
  components: {
    'journal-manage': journalManage
  },
  data () {
    return {
      routeList: []
    }
  },
  mounted () {
    this.routeList = this.$route.meta.routeList
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style>
</style>
