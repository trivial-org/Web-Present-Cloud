<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据字典管理管理</el-breadcrumb-item>
      <el-breadcrumb-item>数据字典列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片区域-->
    <el-card class="manage-card">
      <!-- 搜索框 -->
      <el-row class="searchRow" :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入数据字典关键字"
            class="inputSearch"
            v-model="queryInfo.query"
            clearable
            @clear="getDataDictionaryList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getDataDictionaryList"></el-button>
          </el-input>
        </el-col>
        <el-table :data="dataDictionaryList" stripe>
          <el-table-column label="#" type="index" fixed></el-table-column>
          <el-table-column label="DictName" prop="dictName"></el-table-column>
          <el-table-column label="DataName" prop="dataName"></el-table-column>
          <el-table-column label="备注"></el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog((scope.row))"
            ></el-button>
          </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          align="right"
        ></el-pagination>
      </el-row>
    </el-card>
    <!-- 详情页对话框 -->
    <el-dialog title="数据字典详情" :visible.sync="addDialogVisible" width="50%">
      <el-form :model="editUserForm" ref="editUserFormRef" label-width="70px">
        <el-form-item label="原key">
          <el-input v-model="editUserForm.dictName" disabled></el-input>
        </el-form-item>
        <el-form-item label="原value">
          <el-input v-model="editUserForm.dataName" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 0,
      // 详情页显示与隐藏
      addDialogVisible: false,
      queryInfo: {
        getAll: 1,
        dictName: '',
        dataName: '',
        // 当前的页数
        page: 1,
        // 当前每页显示多少条数据
        pageSize: 20
      },
      dataDictionaryList: [],
      // 编辑
      editUserForm: {
        dictName: '',
        dataName: '',
        dataOrder: '',
        newDictName: '',
        newDataName: ''
      }
    }
  },
  created () {
    this.$message.success('获取数据字典列表成功')
    this.getDataDictionaryList()
  },
  methods: {
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    async getDataDictionaryList () {
      const { data: res } = await this.$http.get('/dataDictionary', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.state !== 'success') {
        return this.$message.error('获取数据字典列表失败')
      }
      this.total = res.result.length
      this.dataDictionaryList = res.result
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    // 监听 页码值 的改变
    handleCurrentChange (newPage) {
      this.queryInfo.page = newPage
      this.getUserList()
    },
    showEditDialog (res) {
      this.editUserForm.dictName = res.dictName
      this.editUserForm.dataName = res.dataName
      this.addDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed () {
      this.$refs.editUserFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
