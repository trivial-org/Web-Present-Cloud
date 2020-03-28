<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="img-adj">
        <img src="../assets/logo.jpg" width="8.5%" height="8.5%" />
        <span>到云后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollpse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <!--开启路由模式-->
        <el-menu
          background-color="#333744"
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
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [
        {
          id: 101,
          authName: '菜单管理',
          path: 'menus',
          children: [
            { id: 1011, authName: '课程列表', path: 'menus-list', children: [] }
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
          path: null,
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
              authName: '课程信息',
              path: 'courses-info',
              children: []
            },
            {
              id: 1062,
              authName: '课程修改',
              path: 'courses-change',
              children: []
            }
          ]
        }
      ],
      isCollpse: false,
      iconsObj: {
        '101': 'iconfont icon-activity_fill',
        '102': 'iconfont icon-yunyingzhongxin',
        '103': 'iconfont icon-group_fill',
        '104': 'iconfont icon-zhanghaoquanxianguanli',
        '105': 'iconfont icon-daibanshixiang',
        '106': 'iconfont icon-qianniudaidise'
      },
      // 被激活的链接地址
      activePath: ''
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
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
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
    }
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #fff;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10;
  line-height: 24px;
  color: #ff8000;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.iconfont {
  // 菜单栏图标与文字的间距
  margin-right: 10px;
}
</style>
