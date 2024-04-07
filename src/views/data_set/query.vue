<template>
  <div>
    <el-row :gutter="5">
        <el-col :span="5" :offset="12"> 
          <el-select
            style="width: 270px;"
            v-model="dataSourceID"
            filterable
            remote
            reserve-keyword
            placeholder="请输入数据集名称"
            @change="handleDataSourceChange"
            :remote-method="remoteQueryDataSource"
            :loading="loadingDataSource">
            <el-option
              v-for="item in dataSourceList"
              :key="item.dataSourceID"
              :label="item.dataSourceName"
              :value="item.dataSourceID">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" :offset="0"> 
          <el-input v-model="dataSetName" placeholder="输入数据集名称" style="width: 100;"></el-input>
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
        element-loading-text="Loading"
        empty-text="当前数据为空或数据源未选择"
        highlight-current-row
        style="width:100%"
      >
      <el-table-column label="数据集名称" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.dataSetName }}
        </template>
      </el-table-column>
      <el-table-column label="数据集大小"  width="150"  align="center">
        <template slot-scope="scope">
          {{ scope.row.dataSetSize }}
        </template>
      </el-table-column>
      <el-table-column label="行数"   width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.totalRows }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注释"  width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.comment }}
        </template>
      </el-table-column>
      <el-table-column label="血缘关系"  width="200" align="center">
        <template slot-scope="scope">
          <el-button  @click="handleJumpToDatasource(scope.row)">数据源</el-button>
          <el-button  @click="handleJumpToDashboard(scope.row)">仪表盘</el-button>
        </template>
      </el-table-column>
      <el-table-column label="字段详情"  width="100" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="handleColumnDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="数据预览"  width="100" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="handlePrview(scope.row)">预览</el-button>
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
import { query as queryDataSourceApi } from '@/api/data_source' 
import { query as queryDataSetApi} from '@/api/data_set'

export default { 
  data() {
    return {
      loadingDataSource :true,
      dataSource:null,
      dataSourceName:'',
      dataSourceID:this.$route.query.dataSourceID,
      dataSourceList: null,

      listLoading: false,
      dataSetName:this.$route.query.dataSetName,
      list:null,
      pageNo:1,
      pageSize:5,
      total:0,
    }
  },
  created() {
    // 如果带了dataSourceID，查一下赋值给dataSource
    if(this.dataSourceID!=null&&this.dataSetID!=''){
      this.queryDatasourceByID()
      this.queryDataSet(this.dataSetName,this.dataSourceID,this.pageNo,this.pageSize)
    }else{
      this.remoteQueryDataSource("")
    }
  },
  methods: {
    // 查询数据集
    remoteQueryDataSource(val){
       this.queryDataSource(val,"")
    },
    // 基础数据源查询方法
    queryDataSource(dataSourceName,dataSourceID){
      this.loadingDataSource = true
      queryDataSourceApi(dataSourceName,dataSourceID,1, 10).then(response =>{
        this.dataSourceList = response.dataSourceList
        this.loadingDataSource = false
      })
    },
    // 基础数据集查询方法
    queryDataSet(DataSetName, DataSourceID,PageNo, PageSize){
      this.listLoading=true
      if(DataSetName==null){
        DataSetName=''
      }
      queryDataSetApi(DataSetName, DataSourceID,PageNo,PageSize).then(response =>{
         this.list=response.dataSetInfos
         this.pageNo=response.pageNo
         this.pageSize=response.pageSize
         this.total=response.total
         this.listLoading=false
      })
    },
    handleDataSourceChange(val){
      this.pageNo=1
      this.queryDataSet(this.dataSetName,this.dataSourceID,this.pageNo,this.pageSize)
    },
    handleQuery(){
      this.pageNo=1
      this.queryDataSet(this.dataSetName,this.dataSourceID, this.pageNo, this.pageSize)
    },
    handleCurrentChange(val){
       this.pageNo=val
       this.queryDataSet(this.dataSetName,this.dataSourceID, this.pageNo, this.pageSize)
    },
    handleSizeChange(val){
       this.pageSize=val
       if((this.pageSize-1)*this.pageNo>=this.total){
         this.pageNo = this.total / this.pageSize
         if(this.total % this.pageSize!=0){
           this.pageNo++
         }
       }
       this.queryDataSet(this.dataSetName,this.dataSourceID, this.pageNo, this.pageSize)
    },
    handleColumnDetail(row){
       var url = "/dataSet/queryDataSetColumn?dataSourceID="+row.dataSourceID+"&dataSetName="+row.dataSetName
       this.$router.replace(url)
    },
    handlePrview(row){
      var url = "/dataSet/preview?dataSourceID="+row.dataSourceID+"&dataSetName="+row.dataSetName+"&dataSetID="+row.dataSetID
      this.$router.replace(url)
    },
    queryDatasourceByID(){
      if(this.dataSourceID==null)return;
      this.loadingDataSource = true
      queryDataSourceApi('',this.dataSourceID,1, 10).then(response =>{
        this.dataSourceList = response.dataSourceList
        this.loadingDataSource = false
      })
    },
    handleJumpToDatasource(row){
      var url = "/dataSource/dataSourceQuery?dataSourceID="+row.dataSourceID
      this.$router.replace(url)
    },
    handleJumpToDashboard(row){
      var url = "/dashboards/dashboardQuery?dataSourceID="+row.dataSourceID+"&dataSetID="+row.dataSetID
      this.$router.replace(url)
    },
  }
}
</script>
