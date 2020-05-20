<template>
  <div class="sa">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>参数设置</el-breadcrumb-item>
      <el-breadcrumb-item>参数设置</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="menulist-card">
      <!-- 搜索框 -->
      <el-row class="searchRow" :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入搜索内容" class="inputSearch" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加参数</el-button>
        </el-col>
      </el-row>
      <el-table :data="data1">
        <el-table-column type="index" label="#" fixed></el-table-column>
        <el-table-column label="paraID" prop="paraID"></el-table-column>
        <el-table-column label="key" prop="key"></el-table-column>
        <el-table-column label="values" prop='value'></el-table-column>
        <el-table-column label="other" prop="other"></el-table-column>
      </el-table>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="参数ID" prop="paraID">
          <el-input v-model="addForm.roleID"></el-input>
        </el-form-item>
        <el-form-item label="参数名称" prop="key">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="参数值" prop="value">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data1: [],
      data2: [
        {
          paraID: '123',
          key: '签到距离',
          value: '3',
          other: ''
        }
      ],

      queryInfo: {
        query: '',
        // 当前的页数
        page: 1,
        // 当前每页显示多少条数据
        pageSize: 5
      },
      userslist: [],
      total: 0,
      // 控制添加用户的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        roleId: '',
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      // 修改用户
      editDialogVisible: false,
      editUserForm: {},
      // 编辑用户表单验证
      // 分配角色对话框
      setRoleDialogVisible: false,
      // 当前需要被分配角色的用户
      userInfo: {},
      // 所有角色数据列表
      rolesLsit: [],
      // 已选中的角色Id值
      selectRoleId: ''
    }
  },
  methods: {
    // 修改用户信息
    addUser () {
      // // 提交请求前，表单预验证
      //   this.$refs.editUserFormRef.validate(async valid => {
      //   // console.log(valid)
      //   // 表单预校验失败
      //     if (!valid) return
      //     const { data: res } = await this.$http.put(
      //       'users/' + this.editUserForm.id,
      //       {
      //         email: this.editUserForm.email,
      //         mobile: this.editUserForm.mobile
      //       }
      //     )
      //     if (res.meta.status !== 200) {
      //       this.$message.error('更新用户信息失败！')
      //     }
      //     // 隐藏添加用户对话框
      //     this.editDialogVisible = false
      //     this.$message.success('更新用户信息成功！')
      //     this.getUserList()
      //   })
      this.data1 = this.data2
    },

    async getUserList () {
      // const { data: res } = await this.$http.get(
      //   '/role',
      //   {
      //     params: this.queryInfo
      //   },
      //   { withCredentials: true }
      // )
      // if (res.state !== 'success') {
      //   return this.$message.error('获取用户列表失败')
      // }
      // this.userslist = res.data.users
      // this.totle = res.data.total
      this.userslist = this.tableData
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    // 监听添加用户对话框关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 监听 页码值 的改变
    handleCurrentChange (newPage) {
      this.queryInfo.page = newPage
      this.getUserList()
    },
    // 添加用户
    // 编辑用户信息
    async showEditDialog (id) {
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.editUserForm = res.data
      this.editDialogVisible = true
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
