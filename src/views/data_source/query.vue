<template>
  <div>
    <el-row :gutter="20">
        <el-col :span="4" :offset="17"> 
          <el-input v-model="dataSourceName" placeholder="输入数据源名称" style="width: 100;"></el-input>
        </el-col>
        <el-col :span="2" > 
          <el-button type="primary" @click= "handleQuery">查询</el-button>
        </el-col>
    </el-row>
  <el-container>
    <el-main style="height: 550px;" >
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="加载中"
        highlight-current-row
        style="width:100%"
      >
      <el-table-column label="数据源名称" width="220" align="center">
        <template slot-scope="scope">
          {{ scope.row.dataSourceName }}
        </template>
      </el-table-column>
      <el-table-column label="URL"  width="280"  align="center">
        <template slot-scope="scope">
          <el-link type="primary" :href="scope.row.URL" target="_blank">{{ scope.row.URL }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="导入时间"   width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据源大小"  width="140" align="center">
        <template slot-scope="scope">
          {{ scope.row.dataBaseSize }}
        </template>
      </el-table-column>
      <el-table-column label="注释"  width="250" align="center">
        <template slot-scope="scope">
          {{ scope.row.comment }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改"  width="100" >
        <template slot-scope="scope">
        <el-button type="danger" plain @click="handleOnUpdate(scope.row)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="测试连接"  width="100" >
        <template slot-scope="scope">
           <el-button type="primary" plain @click="handleOnTest(scope.row.dataSourceID)">测试</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-main>
    <el-footer>
      <div class="block" align="right">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="[5,10,15,20]"
          :page-size="pageSize"
          :pageNo="pageNo"
          :total="total">
        </el-pagination>
      </div>
    </el-footer>
  </el-container>
</div>
</template>

<script>
import { query , test} from '@/api/data_source'

export default { 
  data() {
    return {
      list: null,
      listLoading: true,
      dataSourceName:this.$route.query.dataSourceName,
      dataSourceID:this.$route.query.dataSourceID,
      pageNo:1,
      pageSize:5,
      total:0,
    }
  },
  created() {
    this.queryData(this.dataSourceName,this.dataSourceID,this.pageNo,this.pageSize)
  },
  methods: {
    // 基础查询方法
    queryData(dataSourceName="",dataSourceID="", pageNo, pageSize){
      this.listLoading = true
      query(dataSourceName,dataSourceID, pageNo, pageSize).then(response =>{
        this.list = response.dataSourceList
        this.pageNo=response.pageNo
        this.pageSize=response.pageSize
        this.total=response.total
        this.listLoading = false
      })
    },
    handleQuery(){
       this.queryData(this.dataSourceName, this.pageNo, this.pageSize)
    },
    handleCurrentChange(val){
       this.pageNo=val
       this.queryData(this.dataSourceName, this.pageNo, this.pageSize)
    },
    handleSizeChange(val){
       this.pageSize=val
       if((this.pageSize-1)*this.pageNo>=this.total){
         this.pageNo = this.total / this.pageSize
         if(this.total % this.pageSize!=0){
           this.pageNo++
         }
       }
       this.queryData(this.dataSourceName, this.pageNo, this.pageSize)
    },
    handleOnTest(DataSourceID){
      test(DataSourceID,"","","","").then(response =>{
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
    },
    handleOnUpdate(row){
      var url = "/dataSource/dataSourceUpdate?DataSourceID="+row.dataSourceID+"&DataSourceName="+row.dataSourceName+"&URL="+row.URL+"&DataBase="+row.dataBase+"&UserName="+row.userName
      if(row.comment==null){
        url+="&Comment="
      }
      this.$router.replace(url)
    }
  }
}
</script>
