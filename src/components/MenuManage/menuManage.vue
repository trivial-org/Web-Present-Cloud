<template>
  <div class="sa">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="menulist-card">
      <div></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {}
    }
  },
  created () {
    this.getCourseList()
  },
  methods: {
    async getCourseList () {
      const { data: res } = await this.$http.get('/user/createdClass')
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
