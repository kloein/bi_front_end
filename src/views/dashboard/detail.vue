<template>
  <el-container>
    <el-header style="height: 40px;padding-left: 0%" >   
      <el-row :gutter="0">
        <el-col :span="7">
          <el-button-group>
            <el-button  type="primary" plain>数据源名称</el-button>
            <el-button plain>{{dataSourceName}}</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="5">
          <el-button-group>
            <el-button  type="primary" plain>数据集名称</el-button>
            <el-button plain>{{dataSetName}}</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="4" offset="6">
          <el-select v-model="dashboardType" placeholder="请图表类型">
            <el-option
              v-for="item in dashboardTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2" offset="0" >
          <el-button plain type="primary" @click="updateDashboardDialogVisible = true">保存</el-button>
        </el-col>
      </el-row>
      <el-dialog
        title="保存图表"
        :visible.sync="updateDashboardDialogVisible"
        width="30%"
        >
        <el-form :model="updateDashboardForm">                             
          <el-form-item label="图表名称">
            <el-input v-model="updateDashboardForm.dashboardName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="注释">
            <el-input v-model="updateDashboardForm.comment" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateDashboardDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleUpdateDashboard">确认</el-button>
        </span>
      </el-dialog>
    </el-header>
    <!-- 指标维度管理区域 -->
    <!-- 维度 -->
    <el-container>
      <el-aside width="200px" >
        <el-container style="height: 280px;background-color:burlywood;">
            <el-header style="height: 40px;background-color: #FFF;padding: 0%;">
                <el-button-group style="padding: 0%; width: 200px; display: flex; justify-content: space-between;">  
                  <el-button type="primary" plain style="width: 180px;">维度管理</el-button>
                  <el-button type="primary" plain style="width: 20px;display: flex;align-items: center;justify-content: center;" icon="el-icon-plus" @click="dimensionDialogVisible = true"></el-button>
                </el-button-group>
            </el-header>  
            <el-main style="background-color: #FFF;padding: 0%;">
              <el-table
              class="tableBox"
                :data="dimensionList"
                :show-header="false"
                :loading="dimensionListLoading"
                height="100%"
                border
                style="width: 100%"
                :row-style="{height: '20px'}"
                >
                <el-table-column label="详情按钮" width="40px" align="left" style="padding: 0;">
                  <template slot-scope="scope" >
                  <el-dropdown  >
                    <el-button class="full-width-button" icon="el-icon-more" style="margin-right:-9px; padding-top: 10%;padding-bottom: 10%;padding-left: 11px;padding-right: 13px; height: 30px;" align="left" size="small" ></el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                          <el-button @click="updateDimension(scope.row.dimensionID)">
                            修改维度
                          </el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button @click="handleDeleteDimension(scope.row.dimensionID)">
                            删除维度
                          </el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button @click="handleDimensionShow(scope.row.dimensionID)">
                            加入图表
                          </el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
                <el-table-column label="维度名称" width="159px">
                    <template slot-scope="scope">
                      <span >{{ scope.row.dimensionName }}</span>
                    </template>
                </el-table-column>
              </el-table>
            </el-main>
            <!-- 添加维度弹窗 -->
            <el-dialog
              title="新增维度"
              :visible.sync="dimensionDialogVisible"
              width="30%"
              >
              <el-form :model="createDimensionForm">                             
                <el-form-item label="维度名称">
                  <el-input v-model="createDimensionForm.dimensionName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="表达式">
                  <el-input v-model="createDimensionForm.dimensionExpression" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="注释">
                  <el-input v-model="createDimensionForm.dimensionComment" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dimensionDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleCreateDimension">确认</el-button>
              </span>
            </el-dialog>

            <!-- 修改维度弹窗 -->
            <el-dialog
              title="修改维度"
              :visible.sync="dimensionUpdateDialogVisible"
              width="30%"
              >
              <el-form :model="dimensionUpdateDetail">                             
                <el-form-item label="维度名称">
                  <el-input v-model="dimensionUpdateDetail.dimensionName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="表达式">
                  <el-input v-model="dimensionUpdateDetail.expression" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="注释">
                  <el-input v-model="dimensionUpdateDetail.comment" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dimensionUpdateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleUpdateDimension">确认</el-button>
              </span>
            </el-dialog>

        </el-container>

        <!-- 指标 -->
        <el-container style="height: 280px;background-color:burlywood;">
            <el-header style="height: 40px;background-color: #FFF;padding: 0%;">
              <el-button-group style="padding: 0%; width: 200px; display: flex; justify-content: space-between;"> 
                <el-button type="primary" plain style="width: 180px;">指标管理</el-button>
                <el-button type="primary" plain style="width: 20px;display: flex;align-items: center;justify-content: center;" icon="el-icon-plus" @click="indexDialogVisible = true"></el-button>
              </el-button-group>
            </el-header>  
            <el-main style="background-color: #FFF;padding: 0%;">
              <el-table
              class="tableBox"
                :data="indexList"
                :show-header="false"
                border
                height="100%"
                style="width: 100%"
                :row-style="{height: '20px'}"
                >
                <el-table-column label="详情按钮" width="40px" align="left" style="padding: 0;">
                    <template slot-scope="scope" >
                      <el-dropdown  >
                        <el-button class="full-width-button" icon="el-icon-more" style="margin-right:-9px; padding-top: 10%;padding-bottom: 10%;padding-left: 11px;padding-right: 13px; height: 30px;" align="left" size="small" ></el-button>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                              <el-button @click="updateIndex(scope.row.indexID)">
                                修改指标
                              </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <el-button @click="handleDeleteIndex(scope.row.indexID)">
                                删除指标
                              </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <el-button @click="handleIndexShow(scope.row.indexID)">
                                加入图表
                              </el-button>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </template>
                </el-table-column>
                <el-table-column label="指标名称" width="160px">
                    <template slot-scope="scope">
                      <span >{{ scope.row.indexName }}</span>
                    </template>
                </el-table-column>
              </el-table>
            </el-main>
        </el-container>

         <!-- 添加指标弹窗 -->
         <el-dialog
              title="新增指标"
              :visible.sync="indexDialogVisible"
              width="30%"
              >
              <el-form :model="createIndexForm">                             
                <el-form-item label="指标名称">
                  <el-input v-model="createIndexForm.indexName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="表达式">
                  <el-input v-model="createIndexForm.indexExpression" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="注释">
                  <el-input v-model="createIndexForm.indexComment" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="indexDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleCreateIndex">确认</el-button>
              </span>
            </el-dialog>

            <!-- 修改指标弹窗 -->
            <el-dialog
              title="修改指标"
              :visible.sync="indexUpdateDialogVisible"
              width="30%"
              >
              <el-form :model="indexUpdateDetail">                             
                <el-form-item label="指标名称">
                  <el-input v-model="indexUpdateDetail.indexName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="表达式">
                  <el-input v-model="indexUpdateDetail.expression" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="注释">
                  <el-input v-model="indexUpdateDetail.comment" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="indexUpdateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleUpdateIndex">确认</el-button>
              </span>
            </el-dialog>

      </el-aside>
      <!-- 图表指标维度区 -->
      <el-container>
        <el-header style="height: 31px;padding-left: 0%;" class="bordered-container">
          <el-button type="primary" plain style="height:30px;text-align: center;padding-top: 0%;padding-bottom: 0%;margin-right: 10px;margin-left: 0px;">维度</el-button>
          <el-button-group v-for="(item,index) in showDimensionList" :key="index" style="margin-right: 5px;margin-top: -2px;">
            <el-button type="primary" plain style="height:30px;text-align: center;padding-top: 0%;padding-bottom: 0%">{{item.dimensionName}}</el-button>
            <el-button plain style="height:30px;text-align: center;padding: 0%;padding-bottom: 0%;width: 22px;font-size: 20px;" icon="el-icon-close" @click="showDimensionList.splice(index,1)"></el-button>
          </el-button-group>
        </el-header>

        <el-header style="height: 31px;padding-left: 0%;" class="bordered-container">
          <el-button type="primary" plain style="height:30px;text-align: center;padding-top: 0%;padding-bottom: 0%;margin-right: 10px;margin-left: 0px;">指标</el-button>
          <el-button-group v-for="(item,index) in showIndexList" :key="index" style="margin-right: 5px;margin-top: -2px;">
            <el-button type="primary" plain style="height:30px;text-align: center;padding-top: 0%;padding-bottom: 0%">{{item.indexName}}</el-button>
            <el-button plain style="height:30px;text-align: center;padding: 0%;padding-bottom: 0%;width: 22px;font-size: 20px;" icon="el-icon-close" @click="showIndexList.splice(index,1)"></el-button>
          </el-button-group>
        </el-header>
        <!-- 制图区域 -->
        <el-main id="paint" style="height: 400px;background-color:#FFF;">Main3</el-main>

      </el-container>
    </el-container>
  </el-container>
</template>


<script>
import * as echarts from 'echarts';
import { Loading } from 'element-ui';
import {createIndex,deleteIndex,updateIndex,queryIndex} from  '@/api/index.js'
import {createDimension,deleteDimension,updateDimension,queryDimension} from '@/api/dimension.js'
import {queryDashboard,createDashboard,updateDashboard,detailDashboard,executeQueryDashboard} from '@/api/dashboard.js'

export default {
  data(){
    return {
      updateDashboardForm:{
        dashboardName:"",
        comment:"",
      },
      updateDashboardDialogVisible:false,
      // 基础信息
      dashboardName:"",
      dashboardID:this.$route.query.dashboardID,
      dataSourceName:this.$route.query.dataSourceName,
      dataSourceID:this.$route.query.dataSourceID,
      dataSetName:this.$route.query.dataSetName,
      dataSetID:this.$route.query.dataSetID,
      // 展示信息
      showDimensionList:[],
      showIndexList:[],
      // 维度管理
      dimensionListLoading:true,
      dimensionList:null,
      dimensionDialogVisible:false,

      dimensionUpdateDialogVisible:false,
      dimensionUpdateDetail:{},

      createDimensionForm:{},

      // 指标管理
      indexListLoading:true,
      indexList:null,
      indexDialogVisible:false,

      indexUpdateDialogVisible:false,
      indexUpdateDetail:{},

      createIndexForm:{},

      dashboardType:"Line",
      dashboardTypes: [{
          value: 'Line',
          label: '折线图'
        }, {
          value: 'Bar',
          label: '柱状图'
        }, {
          value: 'Pie',
          label: '饼状图'
        }],
        loadInstance:Loading.service({ fullscreen: true }),
    }
  },
  mounted() {
  // 初始化实例对象  echarts.init(dom容器);
  let myChart = echarts.init(document.getElementById("paint"), null, {
        width: 1100,
        height: 455
      });
     // 指定图表的配置项和数据
     var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
  },
  created(){
    this.loadDimension()
    this.loadIndex()
    this.loadDashboardDetail()
  },
  methods:{
    // 仪表
    loadDashboardDetail(){
      detailDashboard(this.dashboardID).then(response =>{
          // this.dashboardName=response.dashboardName
          // this.dataSourceName=response.dataSourceName
          // this.dataSetName=response.dataSetName

          this.updateDashboardForm.dashboardName=response.dashboardName
          this.updateDashboardForm.comment=response.comment

          this.showDimensionList=response.dimensionInfos || []
          this.showIndexList=response.indexInfos || []

          this.dashboardType=response.dashboardType

          this.loadInstance.close()
      })
    },

    // 维度与指标
    loadDimension(){
      this.dimensionListLoading=true
      queryDimension(this.dataSourceID, this.dataSetID).then(response=>{
        this.dimensionList=response.dimensionInfos
        this.dimensionListLoading=false
      })
    },
    loadIndex(){
      this.indexListLoading=true
      queryIndex(this.dataSourceID,this.dataSetID).then(response=>{
        this.indexList=response.indexInfos
        this.indexListLoading=false
      })
    },
    handleCreateDimension(){
      this.$message({
                message: '维度添加中',
                type: 'success'
              })
      createDimension(this.dataSourceID, this.dataSetID,this.createDimensionForm.dimensionName,this.createDimensionForm.dimensionExpression,this.createDimensionForm.dimensionComment).then(response=>{
          if(response.retCode==20000){
            this.dimensionDialogVisible=false
            this.$message({
                message: '维度添加成功',
                type: 'success'
              })
            // 重置表单
            this.createDimensionForm={}
            // 刷新维度列表
            this.loadDimension()
          }else{
            this.$message({
                message: '维度添加失败',
                type: 'warning'
              })
          }
      })
    },
    handleCreateIndex(){
      this.$message({
                message: '指标添加中',
                type: 'success'
              })
      createIndex(this.dataSourceID, this.dataSetID,this.createIndexForm.indexName,this.createIndexForm.indexExpression,this.createIndexForm.indexComment).then(response=>{
          if(response.retCode==20000){
            this.indexDialogVisible=false
            this.$message({
                message: '指标添加成功',
                type: 'success'
              })
            // 重置表单
            this.createIndexForm={}
            // 刷新维度列表
            this.loadIndex()
          }else{
            this.$message({
                message: '指标添加失败',
                type: 'warning'
              })
          }
      })
    },
    handleDeleteDimension(dimensionID){
      this.$confirm('此操作将永久删除该维度, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDimension(dimensionID).then(response =>{
            if(response.retCode==20000){
                this.dimensionDialogVisible=false
                this.$message({
                    message: '维度删除成功',
                    type: 'success'
                  })
                // 刷新维度列表
                this.loadDimension()
              }else{
                this.$message({
                    message: '维度删除失败',
                      type: 'warning'
                    })
                }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleDeleteIndex(indexID){
      this.$confirm('此操作将永久删除该指标, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteIndex(indexID).then(response =>{
            if(response.retCode==20000){
                this.indexDialogVisible=false
                this.$message({
                    message: '指标删除成功',
                    type: 'success'
                  })
                // 刷新维度列表
                this.loadIndex()
              }else{
                this.$message({
                    message: '指标删除失败',
                    type: 'warning'
                  })
              }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    updateIndex(indexID){
      this.indexList.forEach(element => {
        if(element.indexID==indexID){
          this.indexUpdateDetail=element
        }
      });
      this.indexUpdateDialogVisible=true
    },
    handleUpdateDimension(){
      this.$message({
                message: '维度更新中',
                type: 'success'
              })
      updateDimension(this.dimensionUpdateDetail.dimensionID,this.dimensionUpdateDetail.dimensionName,this.dimensionUpdateDetail.expression,this.dimensionUpdateDetail.comment).then(response =>{
        if(response.retCode==20000){
            this.dimensionUpdateDialogVisible=false
            this.$message({
                message: '维度更新成功',
                type: 'success'
              })
            // 刷新维度列表
            this.loadDimension()
          }else{
            this.$message({
                message: '维度更新失败',
                type: 'warning'
              })
          }
      })
    },
    handleUpdateIndex(){
      this.$message({
                message: '指标更新中',
                type: 'success'
              })
      updateIndex(this.indexUpdateDetail.indexID,this.indexUpdateDetail.dimensionName,this.indexUpdateDetail.expression,this.indexUpdateDetail.comment).then(response =>{
        if(response.retCode==20000){
            this.indexUpdateDialogVisible=false
            this.$message({
                message: '指标更新成功',
                type: 'success'
              })
            // 刷新指标列表
            this.loadIndex()
          }else{
            this.$message({
                message: '指标更新失败',
                type: 'warning'
              })
          }
      })
    },
    handleDimensionShow(dimensionID){
      this.dimensionList.forEach(element => {
        if(element.dimensionID==dimensionID){
          this.showDimensionList.push(element)
        }
      });
    },
    handleIndexShow(indexID){
      this.indexList.forEach(element => {
        if(element.indexID==indexID){
          this.showIndexList.push(element)
        }
      });
    },
    handleUpdateDashboard(){
      var indexIDList=[]
      var dimensionIDList=[]
      this.showIndexList.forEach(element =>{
        indexIDList.push(element.indexID)
      })
      this.showDimensionList.forEach(element =>{
        dimensionIDList.push(element.dimensionID)
      })
      updateDashboard(this.updateDashboardForm.dashboardName,this.dashboardID,this.dataSourceID,this.dataSetID,this.dashboardType,dimensionIDList,indexIDList,this.updateDashboardForm.comment).then(response=>{
        if(response.retCode==20000){
            this.indexUpdateDialogVisible=false
            this.$message({
                message: '图表更新成功',
                type: 'success'
              })
            // 跳回图表查询
            var url = "/dashboards/dashboardQuery?dataSourceID="+this.dataSourceID+"&dataSetID"+this.dataSetID
            this.$router.replace(url)
          }else{
            this.$message({
                message: '图表更新失败',
                type: 'warning'
              })
          }
      })
    },
  }
}
</script>



<style>
/* Define a custom scrollbar */
::-webkit-scrollbar {
  width: 10px; /* Width of the entire scrollbar */
}

/* Define the track */
::-webkit-scrollbar-track {
  background: #f1f1f1; /* Color of the tracking area */
  border-radius: 5px; /* Rounded corners */
}

/* Define the thumb */
::-webkit-scrollbar-thumb {
  background: #ecf5ff     ; /* Color of the scroll thumb */
  border-radius: 5px; /* Rounded corners */
}

/* Define the thumb:hover */
::-webkit-scrollbar-thumb:hover {
  background: #a0cfff    ; /* Color of the thumb on hover */
}

.scrollbar-container {
  direction: rtl; /* 设置文本方向从右到左 */
}

.tableBox{
  direction: rtl; /* 设置文本方向从右到左 */
}

.tableBox th {
  padding: 0 !important;
  height: 50px;
  line-height: 30px;
  text-align: center;
}

.tableBox td {
  padding: 0% !important;
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.bordered-container {
  border: 1px solid #a0cfff; /* 设置边框为1像素，颜色为 #eee */
  border-radius: 4px; /* 可选：为容器添加圆角 */
  padding: 0px; /* 可选：添加内边距 */
}
</style>