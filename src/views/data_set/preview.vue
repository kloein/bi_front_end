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
        :data="blobs"
        element-loading-text="Loading"
        empty-text="数据集为空"
        fit
        highlight-current-row
        style="width:100%"
      >
      <el-table-column v-for="(col,index) in dataSetColumns" :key="index"  
        :label="col.columnName" align="center">
        <template slot-scope="scope">
          {{ blobs[scope.$index][index] }}
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
import { previewDataSet } from '@/api/data_set'

export default { 
  data() {
    return {
      dataSetName:this.$route.query.dataSetName,
      dataSetID:this.$route.query.dataSetID,
      dataSourceID:this.$route.query.dataSourceID,

      listLoading: false,
      blobs:null,
      dataSetColumns:null,
      pageNo:1,
      pageSize:5,
      total:0,
    }
  },
  created() {
    this.preview(this.dataSourceID,this.dataSetID,this.dataSetName,this.pageNo,this.pageSize)
  },
  methods: {
    // 基础数据集字段查询方法
    preview(DataSourceID, DataSetID, DataSetName,PageNo, PageSize){
      this.listLoading=true
      previewDataSet(DataSourceID,DataSetID,DataSetName,PageNo,PageSize).then(response =>{
         this.blobs=response.blobs
         this.dataSetColumns=response.dataSetColumns
         this.pageNo=response.pageNo
         this.pageSize=response.pageSize
         this.total=response.total
         this.listLoading=false
      })
    },
    handleQuery(){
      this.pageNo=1
      this.preview(this.dataSourceID,this.dataSetID,this.dataSetName, this.pageNo, this.pageSize)
    },
    handleCurrentChange(val){
       this.pageNo=val
       this.preview(this.dataSourceID,this.dataSetID,this.dataSetName, this.pageNo, this.pageSize)
    },
    handleSizeChange(val){
       this.pageSize=val
       if((this.pageSize-1)*this.pageNo>=this.total){
         this.pageNo = this.total / this.pageSize
         if(this.total % this.pageSize!=0){
           this.pageNo++
         }
       }
       this.preview(this.dataSourceID,this.dataSetID,this.dataSetName, this.pageNo, this.pageSize)
    },
    handleBack(){
      var url = "/dataSet/dataSetQuery?dataSourceID="+ this.dataSourceID+"&dataSetName="+this.dataSetName
      this.$router.replace(url)
    }
  }
}
</script>
