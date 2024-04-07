<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="数据源名称" >
        <el-input v-model="form.DataSourceName" style="width: 300px;"/>
      </el-form-item>
      <el-form-item label="数据源类型">
        <template>
        <el-radio v-model="form.DataSourceType" label="ClickHouse">ClickHouse</el-radio>
      </template>
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="form.URL" style="width: 400px;"/>
      </el-form-item>
      <el-form-item label="数据库名称">
        <el-input v-model="form.DataBase" style="width: 300px;"/>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.UserName" style="width: 300px;"/>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input v-model="form.Password" style="width: 300px;" show-password/>
      </el-form-item>
      <el-form-item label="注释">
        <el-input v-model="form.Comment" style="width: 400px;" rows="5" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认并保存</el-button>
        <el-button @click="onTest">测试连接</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create,test } from '@/api/data_source'

export default {
  data() {
    return {
      form: {
        DataSourceName: '',
        DataSourceType:'ClickHouse',
        URL: '',
        DataBase: '',
        UserName: '',
        Password: '',
        Comment: ''
      }
    }
  },
  methods: {
    onSubmit() {
      create(this.form.DataSourceName,this.form.URL,this.form.DataBase,this.form.UserName,this.form.Password,this.form.Comment)
      .then(response =>{
         if(response.retCode==20000){
           this.$message({
                message: '数据源创建成功，跳转中',
                type: 'success',
                duration:2000
              })

          this.$router.replace("/dataSource/dataSourceQuery?dataSourceName="+this.form.DataSourceName)
         }else{
           this.$message({
                message: '数据源连接失败，请校验表单数据',
                type: 'warning'
              })
         }
      })
    },
    onTest() {
      test("",this.form.URL,this.form.DataBase,this.form.UserName,this.form.Password).then(response =>{
          if(response.retCode==20000){
            this.$message({
                message: '数据源连接成功',
                type: 'success'
              })
          }else{
            this.$message({
                message: '数据源连接失败，请校验表单数据',
                type: 'warning'
              })
          }
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

