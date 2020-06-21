<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-col :span="8">
        <el-input placeholder="请输入内容"  >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addDialogVisible = true">创建课程</el-button>
      </el-col>
    </el-card>

    <!--添加用户对话框-->
    <el-dialog
      title="创建课程"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
      >
      <!--内容主体区域-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="课程名" prop="className">
          <el-input v-model="addForm.className"></el-input>
        </el-form-item>
        <el-form-item label="教师" prop="teacherName">
          <el-input v-model="addForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="grade">
          <el-input v-model="addForm.grade"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCourse" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default{
      data() {
        return {
            //获取列表参数对象
            queryInfo: {
                query:'',
                pagenum: 1,
                pagesize: 2
            },
            /*控制创建课程对话框的显示与隐藏*/
            addDialogVisible: false,
            /*添加用户的表单数据*/
            addForm: {
                className: '',
                teacherName: '',
                grade: ''
            },
            /*添加表单的验证规则对象*/
            addFormRules:{
                className: [
                    {required:true, message:'请输入课程名称', trigger:'blur'},
                    {min: 1, max: 10, message: '课程名称长度在1-10个',trigger: 'blur'}
                ],
                teacherName: [
                    {required:true, message:'请输入教师姓名', trigger:'blur'},
                    {min: 1, max: 10, message: '姓名长度在1-10个', trigger: 'blur'}
                ],
                grade: [
                    {required:true, message:'请输入班级', trigger:'blur'},
                    {min: 1, max: 10, message: '班级名称长度在1-10个', trigger: 'blur'}
                ],
            }
        }
      },
      created() {
        this.getCourseList()
      },
      methods: {
          async getCourseList() {
              const {data: res} = await this.$http.get('/user/createdClass')
              console.log(res)
          },
          /*监听添加用户对话框的关闭事件*/
          addDialogClosed() {
              this.$refs.addFormRef.resetFields()
          },
          addCourse() {
              this.$refs.addFormRef.validate(async valid => {
                  if(!valid) return
                  const {data: res} = await this.$http.post('cloudClass',this.addForm)
                  console.log(res)
              })
          }
      }
  }
</script>

<style lang="less" scoped>

</style>
