<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="users-card">
      <el-row class="searchRow" :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加权限</el-button>
        </el-col>
      </el-row>
      <el-table :data="authoritiesList" stripe>
        <el-table-column type="index" label="#" fixed></el-table-column>
        <el-table-column label="权限名" prop="name"></el-table-column>
        <el-table-column label="URL" prop="url"></el-table-column>
        <el-table-column label="备注" prop="note"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-card>
    <!-- 添加权限的对话框 -->
    <el-dialog title="添加权限" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form ref="addFormRef" :rules="addFormRules" :model="addForm" label-width="80px">
        <el-form-item label="权限名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="addForm.URL"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 添加表单的验证规则对象
      addFormRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '用户名长度在3-15之间', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6-15个字符', trigger: 'blur' }
        ]
      },
      // 添加权限的表单数据
      addForm: {
        name: '',
        URL: ''
      },
      // 控制添加用户的显示与隐藏
      addDialogVisible: false,
      // 权限列表
      authoritiesList: [
        {
          name: '查看管理员',
          url: 'admin/showAdmin',
          note: '无'
        },
        {
          name: '查看课程',
          url: 'teacher/shoWCourse',
          note: '无'
        },
        {
          name: '删除管理员',
          url: 'admin/deleteAdmin',
          note: '无'
        }
      ]
    }
  },
  created () {
    // 获取所有的权限
    this.getAuthoritiesList()
  },
  methods: {
    // 监听添加权限对话框关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 获取权限列表
    async getAuthoritiesList () {
      const { data: res } = await this.$http.get('authorities/list')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败')
      }
      this.getAuthoritiesList = res.data
    }
  }
}
</script>

<style lang="less">
</style>
