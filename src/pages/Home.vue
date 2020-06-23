<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="img-adj">
        <img src="../assets/logo.jpg" width="7.5%" height="8.5%" />
        <el-button type="text" @click="goToHome">到云后台管理系统</el-button>
      </div>
      <div>
        <div class="trivial">欢迎,</div>
        <div class="userInfo">{{username}}</div>
        <el-popover ref="popover5" placement="top" width="40" v-model="visible2">
          <el-button type="text">个人信息</el-button>
          <el-button type="text" @click="showPswdDialog">修改密码</el-button>
        </el-popover>

        <el-button v-popover:popover5 class="icon"></el-button>
        <el-button type="info" @click="logout" size="mini">退出</el-button>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollpse ? '64px' : '200px'">
        <div class="fold">
          <i
            class="iconfont icon-s-fold"
            @click="toggleCollapse"
            style="font-size:23px"
            v-show="!isCollpse"
          ></i>
          <i
            class="iconfont icon-s-unfold"
            @click="toggleCollapse"
            style="font-size:23px"
            v-show="isCollpse"
          ></i>
        </div>

        <!-- 侧边栏菜单区域 -->
        <!--开启路由模式-->
        <el-menu
          background-color="#304156"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollpse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]" style="font-size:18.5px"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template>
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main class="main-area">
        <!-- 放置路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- 修改密码对话框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="pswdDialogVisible"
      width="40%"
      center
      @close="pswdDialogClosed"
    >
      <el-form :model="pswdForm" ref="pswdFormRef" :rules="pswdFormRules" label-width="70px">
        <el-form-item label="用户ID">
          <el-input v-model="pswdForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="pswdForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="pswdForm.oldPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pswdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePswd">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      pswdDialogVisible: false,
      visible2: false,
      // 用户名
      username: localStorage.getItem('username'),
      // 左侧菜单数据
      menulist: [
        {
          id: 101,
          authName: '菜单管理',
          path: 'menus',
          children: [
            { id: 1011, authName: '菜单列表', path: 'menus-list', children: [] }
          ]
        },
        {
          id: 102,
          authName: '角色管理',
          path: 'roles',
          children: [
            { id: 1021, authName: '角色列表', path: 'roles-list', children: [] }
          ]
        },
        {
          id: 103,
          authName: '用户管理',
          path: 'users',
          children: [
            { id: 1031, authName: '用户列表', path: 'users-list', children: [] }
          ]
        },
        {
          id: 104,
          authName: '权限管理',
          path: 'authority',
          children: [
            {
              id: 1041,
              authName: '权限列表',
              path: 'authority-list',
              children: []
            }
          ]
        },
        {
          id: 105,
          authName: '数据字典管理',
          path: 'data-dict',
          children: [
            {
              id: 1051,
              authName: '数据字典管理',
              path: 'data-dict-manage',
              children: []
            },
            {
              id: 1052,
              authName: '数据字典录入',
              path: 'data-dict-input',
              children: []
            }
          ]
        },
        {
          id: 106,
          authName: '课程管理',
          path: 'courses',
          children: [
            {
              id: 1061,
              authName: '课程列表',
              path: 'courses-list',
              children: []
            }

          ]
        },
        {
          id: 107,
          authName: '参数设置',
          path: 'parameter-Set',
          children: [
            {
              id: 1071,
              authName: '参数设置',
              path: 'parameterSet',
              children: []
            }
          ]
        },
        {
          id: 108,
          authName: '组织管理',
          path: 'organization-manage',
          children: []
        }
      ],
      isCollpse: false,
      iconsObj: {
        '101': 'iconfont icon-s-order',
        '102': 'iconfont icon-postcard',
        '103': 'iconfont icon-user-solid',
        '104': 'iconfont icon-s-tools',
        '105': 'iconfont icon-data-analysis',
        '106': 'iconfont icon-s-management',
        '107': 'iconfont icon-set-up',
        '108': 'iconfont icon-cherry'
      },
      // 被激活的链接地址
      activePath: '',
      // 修改密码表单
      pswdForm: {
        id: '',
        newPassword: '',
        oldPassword: ''
      },
      // 编辑修改用户密码表单验证
      pswdFormRules: {
        newPassword: [
          {
            required: true,
            min: 1,
            max: 15,
            message: '长度在1-15个字符',
            trigger: 'blur'
          }
        ],
        oldPassword: [
          {
            required: true,
            min: 1,
            max: 15,
            message: '长度在1-15个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    goToHome () {
      this.$router.push('/welcome')
    },
    async logout () {
      const { data: res } = await this.$http.post('/signout', {
        username: this.username
      })
      if (res.state !== 'success') {
        this.$message.error('注销失败！')
      }
      this.$message.success('注销成功')
      window.localStorage.clear()
      this.$router.push('/login')
    },
    showpopover () {
      this.visible2 = true
    },
    // 展示修改密码对话框
    async showPswdDialog () {
      const { data: res } = await this.$http.get(
        'super/users?username=' + localStorage.getItem('username')
      )
      this.$set(this.pswdForm, 'id', res.result.id)
      this.pswdDialogVisible = true
    },
    // 监听修改密码对话框的关闭事件
    pswdDialogClosed () {
      this.$refs.pswdFormRef.resetFields()
    },
    // 修改密码
    async changePswd () {
      this.$refs.pswdFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('user/password', this.pswdForm)
        if (res.state !== 'success') {
          return this.$message.error('修改密码失败！')
        }
        this.$message.success('修改密码成功！')
        this.pswdDialogVisible = false
      })
    },
    // 点击按钮   切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollpse = !this.isCollpse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
  // created () {
  //   this.getMenuList()
  //   this.activePath = window.sessionStorage.getItem('activePath')
  // },
  //   methods: {
  //     // 获取所有菜单
  //     async getMenuList () {
  //       const { data: res } = await this.$http.get('menus')
  //       if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
  //       this, (menulist = res.data)
  //       console.log(res)
  //     }
  //   }
}
</script>

<style lang="less">
.dropdown-info {
  background-color: #304156;
  width: 30px; // 你要的正方形
  height: 30px; // 你要的正方形
  margin-right: 13px;
}
.userInfo {
  color: #00ff40;
  margin-left: 10px;
  margin-right: 3px;
}

.icon {
  margin-right: 13px;
  width: 30px; // 你要的正方形
  height: 30px; // 你要的正方形
  background-image: url(../assets/icon.jpg);
  background-position: center center; // 居中
  background-size: cover; // 填满div
  background-repeat: no-repeat;
  border-radius: 10%;
}

.popover {
  width: 30px;
  height: 30px;
  background-color: #304156;
  margin-right: 10px;
}
.home-container {
  height: 100%;
}

.el-header {
  background-color: #304156;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 17px;
  > div {
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
    }
    span {
      margin-left: 13px;
    }
  }
}

.el-aside {
  background-color: #304156;
  .el-menu {
    border-right: none;
  }
  > div {
    background-color: #4a5064;
    line-height: 24px;
    justify-content: center;
    letter-spacing: 0.2em;
    text-align: center;
    > i {
      color: #409eff;
      cursor: pointer;
    }
  }
}

.el-main {
  background-color: #fff;
}

.iconfont {
  // 菜单栏图标与文字的间距
  margin-right: 10px;
}
</style>
