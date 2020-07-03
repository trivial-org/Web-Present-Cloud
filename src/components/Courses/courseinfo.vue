<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
      <el-breadcrumb-item>课程详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="班课信息" name="information">
<!--          <i class="el-icon-edit iconedit"></i>-->
          <div v-if="showInformation">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="big"
            class="icon-edit"
            @click="showEditDialog"
          ></el-button>
            <span>学校：{{informationTableData.school}}</span><br>
            <span>专业：{{informationTableData.college}}</span><br>
            <span>课程名：{{informationTableData.className}}</span><br>
            <span>班课号：{{orgCode}}</span><br>
            <span>班级：{{informationTableData.grade}}</span><br>
            <span>教材：{{informationTableData.teachingMateria}}</span><br>
            <span>开课时间：{{informationTableData.lessonStartDate}}</span><br>
            <span>结课时间：{{informationTableData.lessonEndDate}}</span><br>
            <span>介绍：{{informationTableData.introduction}}</span><br>
          </div>
          <div v-if="showEditInformation">
            <el-form :model="informationTableData" :rules="informationFormRules" ref="informationFormRef" label-width="80px">
              <el-form-item label="课程名称" prop="className">
                <el-input v-model="informationTableData.className"></el-input>
              </el-form-item>
              <el-form-item label="班课号" prop="orgCode">
                <el-input v-model="orgCode" disabled></el-input>
              </el-form-item>
              <el-form-item label="班级" prop="grade">
                <el-input v-model="informationTableData.grade"></el-input>
              </el-form-item>
              <el-form-item label="教材">
                <el-input v-model="informationTableData.teachingMateria"></el-input>
              </el-form-item>
              <el-form-item label="学校">
                <el-input v-model="informationTableData.school"></el-input>
              </el-form-item>
              <el-form-item label="专业">
                <el-input v-model="informationTableData.college"></el-input>
              </el-form-item>
              <el-form-item label="开课时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="informationTableData.lessonStartDate" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="结课时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="informationTableData.lessonEndDate" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="介绍" >
                <el-input v-model="informationTableData.introduction"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="editCourse">确定</el-button>
                <el-button @click="editCourseClosed">取消</el-button>
              </el-form-item>
            </el-form>

          </div>
        </el-tab-pane>
        <el-tab-pane label="成员" name="members">
          <el-table :data="memberTableData" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="姓名" prop="memberDetail.userClassNickName"></el-table-column>
            <el-table-column label="学号" prop="memberDetail.userClassNumber"></el-table-column>
            <el-table-column label="学校" prop="memberDetail.userClassSchool"></el-table-column>
            <el-table-column label="学院" prop="memberDetail.userClassCollege"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="签到" name="activities">
          <el-table :data="activityTableData" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="活动类型" prop="activityTypeId"></el-table-column>
            <el-table-column label="活动创建时间" prop="beginDate"></el-table-column>
            <el-table-column label="签到答案" prop="activityParam"></el-table-column>
            <el-table-column label="签到分数" prop="maxscore"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="作业" name="homework">作业</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Member from './components/Member.vue'
import Activity from './components/Activity.vue'
//
export default {
  name: 'Tab',
  components: { Member, Activity },
  data () {
    return {
      queryInfo: {
        page: 1,
        pageSize: 10
      },
      activeName: 'information',
      showInformation: true,
      showEditInformation: false,
      // 课程id
      orgCode: 0,
      memberTableData: [],
      activityTableData: [],
      informationTableData: {
        // classCloud:{
        //     school:'',
        //     college:'',
        //     className:'',
        //     grade:'',
        //     teachingMateria:'',
        //     lessonStartDate:'',
        //     lessonEndDate:'',
        //     introduction:''
        // }
      },
      informationFormRules: {
        className: [
          {required: true, message: '请输入课程名称', trigger: 'blur'},
          {min: 1, max: 15, message: '课程名称长度在1-10个', trigger: 'blur'}
        ]
      },
      createActivityInfo: {
        activityTypeId: 2,
        activityDescription: '第一次作业',
        maxscore: 4, // 活动分数
        orgCode: 10002
      }
    }
  },
  watch: {

  },
  created () {
    this.getParamsData()
    // this.createdActivity()
  },
  methods: {
    handleTabClick () {
      console.log(this.activeName)
      this.getParamsData()
    },
    // 获取参数的列表数据
    async getParamsData () {
      this.orgCode = this.$route.query.orgCode
      if (this.activeName === 'members') {
        const {data: res} = await this.$http.get(`/cloudClass/members?orgCode=` + this.orgCode, {
          params: this.queryInfo
        })
        if (res.state !== 'success') {
          return this.$message.error('获取成员列表失败')
        }
        console.log(res)
        this.memberTableData = res.result
      } else if (this.activeName === 'activities') {
        const {data: res} = await this.$http.get(`/activities?orgCode=` + this.orgCode)
        if (res.state !== 'success') {
          return this.$message.error('获取活动列表失败')
        }
        console.log(res)
        this.activityTableData = res.result
      } else if (this.activeName === 'information') {
        const {data: res} = await this.$http.get(`/cloudClass?orgCode=` + this.orgCode)
        if (res.state !== 'success') {
          return this.$message.error('获取课程详情列表失败')
        }
        this.informationTableData = res.result.classCloud
        // this.orgCode =
        console.log(this.informationTableData)
      }
    },
    async createdActivity () {
      const {data: res} = await this.$http.post('/activities', this.createActivityInfo)
      if (res.state !== 'success') {
        return this.$message.error('创建活动失败')
      }
      console.log(res)
      this.memberTableData = res.result
    },
    showEditDialog () {
      this.showInformation = !this.showInformation
      this.showEditInformation = !this.showEditInformation
    },

    editCourse () {
      this.$refs.informationFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put(
          'cloudClass?orgCode=' + this.orgCode,
          this.informationTableData
        )
        if (res.state !== 'success') {
          this.$message.error('更新课程信息失败！')
        }

        this.showEditDialog()
        this.getParamsData()
        // this.getCourseList()
        this.$message.success('更新课程信息成功')
      })
    },
    editCourseClosed () {
      this.$refs.informationFormRef.resetFields()
      this.showEditDialog()
    }
  }
}
</script>

<style scoped>
.icon-edit{
  float: right;
  margin-right: 40px;
}
</style>
