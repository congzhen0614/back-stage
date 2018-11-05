<template>
  <div class="app" id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app {
  height: 100%;
}
.el-main {
  padding: 0!important;
}
.el-input__inner {
  font-size: 12px;
  height: 30px;
}
.el-form-item {
  margin-bottom: 10px;
}
.el-form-item__label {
  font-size: 12px;
}
.el-form-item__label {
  padding: 0 5px 0 0;
}
.el-table {
  font-size: 12px;
}
.el-table .cell {
  padding: 0!important;
}
.el-table th {
  padding: 5px;
}
.el-table td {
  padding: 5px;
}
.el-pagination {
  margin-top: 5px;
}
.el-pagination button,
.el-pagination span:not([class*=suffix]) {
  font-size: 12px;
  line-height: 26px;
}
.el-button +
.el-button {
  margin-left: 5px;
}
.el-pagination .el-input__inner {
  height: 26px;
}
.el-pagination__sizes,
.is-in-pagination {
  margin-top: -2px;
}
.el-checkbox__label {
  font-size: 12px;
}
.el-tabs--border-card >
.el-tabs__content {
  padding: 5px 15px;
}
.el-form-item__error {
  padding-top: 0;
}
.footer-button {
  position: fixed;
  bottom: 0;
  left: 200px;
  width: 100%;
  padding: 10px;
  z-index: 9999;
  background-color: #ffffff;
  box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.1);
}
</style>
