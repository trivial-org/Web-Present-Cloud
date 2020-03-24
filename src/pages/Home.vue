<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/social_github.png" alt />
        <span>到云后台管理系统</span>
      </div>
      <p>您好，老池</p>
      <el-button type="info">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="subItem.id + ''" v-for="subItem in item.children" :key="subItem.id">
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
      <el-main class="main-area">欢迎使用到云后台管理系统</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [
        { 'id': 101,
          'authName': '菜单管理',
          'path': null,
          'children': [
            { 'id': 1011,
              'authName': '菜单列表',
              'path': null,
              'children': []
            }
          ]
        },
        { 'id': 102,
          'authName': '角色管理',
          'path': null,
          'children': [
            { 'id': 1021,
              'authName': '角色列表',
              'path': null,
              'children': []
            }
          ]
        },
        { 'id': 103,
          'authName': '用户管理',
          'path': null,
          'children': [
            { 'id': 1031,
              'authName': '用户列表',
              'path': null,
              'children': []
            }
          ]
        },
        { 'id': 104,
          'authName': '权限管理',
          'path': null,
          'children': [
            { 'id': 1041,
              'authName': '权限列表',
              'path': null,
              'children': []
            }
          ]
        },
        { 'id': 105,
          'authName': '数据字典管理',
          'path': null,
          'children': [
            { 'id': 1051,
              'authName': '数据字典管理',
              'path': null,
              'children': []
            },
            {'id': 1052,
              'authName': '数据字典录入',
              'path': null,
              'children': []
            }
          ]
        },
        { 'id': 106,
          'authName': '课程管理',
          'path': null,
          'children': [
            { 'id': 1061,
              'authName': '课程信息',
              'path': null,
              'children': []
            },
            { 'id': 1062,
              'authName': '课程修改',
              'path': null,
              'children': []
            }
          ]
        }
      ],
      iconsObj: {
        '101': 'iconfont icon-activity_fill',
        '102': 'iconfont icon-yunyingzhongxin',
        '103': 'iconfont icon-group_fill',
        '104': 'iconfont icon-zhanghaoquanxianguanli',
        '105': 'iconfont icon-daibanshixiang',
        '106': 'iconfont icon-qianniudaidise'
      }
    }
  }
//   created () {
//     this.getMenuList()
//   },
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
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #fff;
}

.main-area {
  text-align: center;
  font-size: 55px;
  color: #8080ff
}

</style>
