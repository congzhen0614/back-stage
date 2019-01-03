<template>
  <div class="update-maga" style="width: 600px">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="直送" name="first">
        <v-child></v-child>
      </el-tab-pane>
      <el-tab-pane label="寄送" name="second">
        <v-address></v-address>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import child from './child.vue'
import address from './address.vue'
export default {
  name: 'update-maga',
  components: {
    'v-child': child,
    'v-address': address
  },
  data () {
    return {
      activeName: JSON.parse(this.$route.query.item).sendType === '杂志直送' ? 'first' : 'second'
    }
  }
}
</script>

<style>
.update-child {
  padding: 20px;
}
</style>
