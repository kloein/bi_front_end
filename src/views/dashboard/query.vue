<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5" :offset="0"> 
          <el-select
            style="width: 270px;"
            v-model="dataSourceID"
            filterable
            remote
            reserve-keyword
            placeholder="请输入数据源名称"
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

      <el-col :span="5" :offset="0"> 
        <el-select
          style="width: 270px;"
          v-model="dataSetID"
          :disabled ="dataSourceID==null"
          filterable
          remote
          reserve-keyword
          placeholder="请输入数据集名称"
          @change="handleDataSetChange" 
          :remote-method="remoteQueryDataSet"
          :loading="loadingDataSet">
          <el-option
            v-for="item in dataSetList"
            :key="item.dataSetID"
            :label="item.dataSetName"
            :value="item.dataSetID">
          </el-option>
        </el-select>
      </el-col>

        <el-col :span="4" :offset="0"> 
          <el-input v-model="dashboardName" placeholder="输入仪表盘名称" style="width: 100;"></el-input>
        </el-col>
        <el-col :span="2" > 
          <el-button type="primary" @click= "handleQuery">查询</el-button>
        </el-col>

        <el-col :span="2" :offset="5"> 
          <el-button type="primary" @click= "handleQuery">创建仪表</el-button>
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
      <el-table-column label="数据源名称" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.dataSourceName }}
        </template>
      </el-table-column>
      <el-table-column label="数据集名称"  width="120"  align="center">
        <template slot-scope="scope">
          {{ scope.row.dataSetName }}
        </template>
      </el-table-column>
      <el-table-column label="仪表盘名称"  width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dashBoardName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间"  width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间"  width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column label="血缘关系"  width="200" align="center">
        <template slot-scope="scope">
          <el-button  @click="handleJumpToDatasource(scope.row)">数据源</el-button>
          <el-button  @click="handleJumpToDataSet(scope.row)">数据集</el-button>
        </template>
      </el-table-column>
      <el-table-column label="注释"  width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.comment }}
        </template>
      </el-table-column>
      <el-table-column label="仪表详情"  width="100" align="center">
        <template slot-scope="scope">
          <el-button  @click="handleJumpToDatasource(scope.row)">详情</el-button>
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
import { query } from '@/api/dashboard'
import { query as queryDataSourceApi } from '@/api/data_source' 
import { query as queryDataSetApi} from '@/api/data_set'

export default { 
  data() {
    return {
      list: null,
      dataSourceList:null,
      dataSetList:null,

      listLoading: true,
      loadingDataSource:true,
      loadingDataSet:true,

      dashboardName:this.$route.query.dashboardName,
      dataSourceID:this.$route.query.dataSourceID,
      dataSetID:this.$route.query.dataSetID,
      dashboardID:this.$route.query.dashboardID,

      pageNo:1,
      pageSize:5,
      total:0,
    }
  },
  created() {
    // 先查出数据源
    this.queryDataSource("",this.dataSourceID)
    // 如果有数据集ID，也查出来
    if(this.dataSetID!=null){
      this.queryDataSet("",this.dataSourceID)
    }
    this.queryData(this.dashboardName,this.dataSourceID,this.dataSetID,this.dashboardID,this.pageNo,this.pageSize)
  },
  methods: {
    // 基础查询方法
    queryData(DashboardName="", DataSourceID="",DataSetID="",DashboardID="",PageNo, PageSize){
      this.listLoading = true
      query(DashboardName, DataSourceID,DataSetID,DashboardID,PageNo, PageSize).then(response =>{
        this.list = response.dashboardInfos
        this.pageNo=response.pageNo
        this.pageSize=response.pageSize
        this.total=response.total
        this.listLoading = false
      })
    },
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
    // 查询数据集
    remoteQueryDataSet(val){
       this.queryDataSet(val,this.dataSourceID)
    },
    // 基础数据源查询方法
    queryDataSet(dataSetName,dataSourceID){
      this.loadingDataSet = true
      queryDataSetApi(dataSetName,dataSourceID,1, 10).then(response =>{
        this.dataSetList = response.dataSetInfos
        this.loadingDataSet = false
      })
    },
    handleQuery(){
      this.queryData(this.dashboardName,this.dataSourceID,this.dataSetID,this.dashboardID,this.pageNo,this.pageSize)
    },
    handleCurrentChange(val){
       this.pageNo=val
       this.queryData(this.dashboardName,this.dataSourceID,this.dataSetID,this.dashboardID,this.pageNo,this.pageSize)
    },
    handleSizeChange(val){
       this.pageSize=val
       if((this.pageSize-1)*this.pageNo>=this.total){
         this.pageNo = this.total / this.pageSize
         if(this.total % this.pageSize!=0){
           this.pageNo++
         }
       }
       this.queryData(this.dashboardName,this.dataSourceID,this.dataSetID,this.dashboardID,this.pageNo,this.pageSize)
    },
    handleDataSourceChange(val){
      this.pageNo=1
      this.queryData(this.dashboardName,this.dataSourceID,this.dataSetID,this.dashboardID,this.pageNo,this.pageSize)
      // 联动查询数据集
      this.remoteQueryDataSet("")
    },
    handleDataSetChange(val){
      this.pageNo=1
      this.queryData(this.dashboardName,this.dataSourceID,this.dataSetID,this.dashboardID,this.pageNo,this.pageSize)
    },
    handleJumpToDatasource(row){
      var url = "/dataSource/dataSourceQuery?dataSourceID="+row.dataSourceID
      this.$router.replace(url)
    },
    handleJumpToDataSet(row){
      var url = "/dataSet/dataSetQuery?dataSourceID="+row.dataSourceID+"&dataSetID="+row.dataSetID
      this.$router.replace(url)
    }
  }
}
</script>
