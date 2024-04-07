<template>
  <div>
    <el-row :gutter="5">
        <el-col :span="2" offset="22" > 
          <el-button type="primary" size="small" style="width: 100px;" @click= "handleBack">返回</el-button>
        </el-col>
    </el-row>
  <el-container>
    <el-main style="height: 550px;" >
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        empty-text="字段为空"
        highlight-current-row
        style="width:100%"
      >
      <el-table-column label="字段名称" width="250" align="center">
        <template slot-scope="scope">
          {{ scope.row.columnName }}
        </template>
      </el-table-column>

      <el-table-column label="字段类型" width="250" align="center">
        <template slot-scope="scope">
          {{ scope.row.columnType }}
        </template>
      </el-table-column>

      <el-table-column label="默认值" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.columnDefault }}
        </template>
      </el-table-column>

      <el-table-column label="注释" width="600" align="center">
        <template slot-scope="scope">
          {{ scope.row.comment }}
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
import {queryDataSetColumn} from '@/api/data_set'

export default { 
  data() {
    return {
      dataSetName:this.$route.query.dataSetName,
      dataSourceID:this.$route.query.dataSourceID,

      listLoading: false,
      list:null,
      pageNo:1,
      pageSize:5,
      total:0,
    }
  },
  created() {
    this.queryDataSetColumn(this.dataSourceID,this.dataSetName,this.pageNo,this.pageSize)
  },
  methods: {
    // 基础数据集字段查询方法
    queryDataSetColumn(DataSourceID, DataSetName,PageNo, PageSize){
      this.listLoading=true
      queryDataSetColumn(DataSourceID,DataSetName,PageNo,PageSize).then(response =>{
         this.list=response.dataSetColumns
         this.pageNo=response.pageNo
         this.pageSize=response.pageSize
         this.total=response.total
         this.listLoading=false
      })
    },
    handleQuery(){
      this.pageNo=1
      this.queryDataSetColumn(this.dataSetName,this.dataSourceID, this.pageNo, this.pageSize)
    },
    handleCurrentChange(val){
       this.pageNo=val
       this.queryDataSetColumn(this.dataSetName,this.dataSourceID, this.pageNo, this.pageSize)
    },
    handleSizeChange(val){
       this.pageSize=val
       if((this.pageSize-1)*this.pageNo>=this.total){
         this.pageNo = this.total / this.pageSize
         if(this.total % this.pageSize!=0){
           this.pageNo++
         }
       }
       this.queryDataSetColumn(this.dataSetName,this.dataSourceID, this.pageNo, this.pageSize)
    },
    handleBack(){
      var url = "/dataSet/dataSetQuery?dataSourceID="+ this.dataSourceID+"&dataSetName="+this.dataSetName
      this.$router.replace(url)
    }
  }
}
</script>
