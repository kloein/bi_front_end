<template>
  <el-container>
    <el-header style="height: 40px;padding-left: 0%" >   
      <el-row :gutter="0">
        <el-col :span="5">
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
        <el-col :span="4" offset="8">
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
          <el-button plain type="primary" >保存</el-button>
        </el-col>
      </el-row>
    </el-header>
    <!-- 指标维度管理区域 -->
    <!-- 维度 -->
    <el-container>
      <el-aside width="200px" >
        <el-container style="height: 280px;background-color:burlywood;">
            <el-header style="height: 40px;background-color: #FFF;padding: 0%;">
                <el-button-group style="padding: 0%; width: 200px; display: flex; justify-content: space-between;">  
                  <el-button type="primary" plain style="width: 180px;">指标管理</el-button>
                  <el-button type="primary" plain style="width: 20px;display: flex;align-items: center;justify-content: center;" icon="el-icon-plus" @click="dimensionDialogVisible = true"></el-button>
                </el-button-group>
            </el-header>  
            <el-main style="background-color: #FFF;padding: 0%;">
              <el-table
              class="tableBox"
                :data="indexList"
                :show-header="false"
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
                          <el-button type="">
                            修改指标
                          </el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button type="">
                            删除指标
                          </el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
                <el-table-column label="维度名称" width="160px">
                    <template slot-scope="scope">
                      <span >{{ scope.row.indexName }}</span>
                    </template>
                </el-table-column>
              </el-table>
            </el-main>
            <!-- 添加维度弹窗 -->
            <el-dialog
              title="新增维度"
              :visible.sync="dimensionDialogVisible"
              width="30%"
              :before-close="handleClose">
              <el-form :model="createDimensionForm">                             
                <el-form-item label="维度名称" :label-width="formLabelWidth">
                  <el-input v-model="createDimensionForm.dimensionName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="表达式" :label-width="formLabelWidth">
                  <el-input v-model="createDimensionForm.dimensionExpression" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="注释" :label-width="formLabelWidth">
                  <el-input v-model="createDimensionForm.dimensionComment" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dimensionDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dimensionDialogVisible = false">确认</el-button>
              </span>
            </el-dialog>

        </el-container>

        <!-- 指标 -->
        <el-container style="height: 280px;background-color:burlywood;">
            <el-header style="height: 40px;background-color: #FFF;padding: 0%;">
              <el-button-group style="padding: 0%; width: 200px; display: flex; justify-content: space-between;"> 
                <el-button type="primary" plain style="width: 180px;">指标管理</el-button>
                <el-button type="primary" plain style="width: 20px;display: flex;align-items: center;justify-content: center;" icon="el-icon-plus"></el-button>
              </el-button-group>
            </el-header>  
            <el-main style="background-color: #FFF;padding: 0%;">
              <el-table
              class="tableBox"
                :data="indexList"
                :show-header="false"
                height="100%"
                style="width: 100%"
                :row-style="{height: '20px'}"
                >
                <el-table-column label="详情按钮" width="40px" align="left" style="padding: 0;">
                   <el-button class="full-width-button" icon="el-icon-more" style="margin-right:-9px; padding-top: 10%;padding-bottom: 10%;padding-left: 65%;padding-right: 65%; height: 30px;" align="left" size="small" ></el-button>
                </el-table-column>
                <el-table-column label="指标名称" width="160px">
                    <template slot-scope="scope">
                      <span >{{ scope.row.indexName }}</span>
                    </template>
                </el-table-column>
              </el-table>
            </el-main>
        </el-container>
      </el-aside>
      <!-- 图表指标维度区 -->
      <el-container>
        <el-header style="height: 31px;padding-left: 0%;" class="bordered-container">
          <el-button type="primary" plain style="height:30px;text-align: center;padding-top: 0%;padding-bottom: 0%;margin-right: 10px;margin-left: 0px;">维度</el-button>
          <el-button-group v-for="(item,index) in indexList" :key="index" style="margin-right: 5px;margin-top: -2px;">
            <el-button type="primary" plain style="height:30px;text-align: center;padding-top: 0%;padding-bottom: 0%">{{item.indexName}}</el-button>
            <el-button plain style="height:30px;text-align: center;padding: 0%;padding-bottom: 0%;width: 22px;font-size: 20px;" icon="el-icon-close" ></el-button>
          </el-button-group>
        </el-header>

        <el-header style="height: 31px;padding-left: 0%;" class="bordered-container">
          <el-button type="primary" plain style="height:30px;text-align: center;padding-top: 0%;padding-bottom: 0%;margin-right: 10px;margin-left: 0px;">指标</el-button>
          <el-button-group v-for="(item,index) in indexList" :key="index" style="margin-right: 5px;margin-top: -2px;">
            <el-button type="primary" plain style="height:30px;text-align: center;padding-top: 0%;padding-bottom: 0%">{{item.indexName}}</el-button>
            <el-button plain style="height:30px;text-align: center;padding: 0%;padding-bottom: 0%;width: 22px;font-size: 20px;" icon="el-icon-close" ></el-button>
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
import {createIndex,deleteIndex,updateIndex,queryIndex} from  '@/api/index'
import {createDimension,deleteDimension,updateDimension,queryDimension} from  '@/api/dimension'

export default {
  data(){
    return {
      dataSourceName:"测试数据源名称",
      dataSourceID:this.$route.query.dataSourceID,
      dataSetName:"测试数据集名称",
      dataSetID:this.$route.query.dashSetID,

      dimensionDialogVisible:false,
      createDimensionForm:{
        dimensionName:"",
        dimensionExpression:"",
        dimensionComment:"",
      },

      indexList:[{
        indexName:"指标一"
      },{
        indexName:"指标二"
      },{
        indexName:"指标二"
      },{
        indexName:"指标二"
      },{
        indexName:"指标二"
      },{
        indexName:"指标二"
      },{
        indexName:"指标二"
      },{
        indexName:"指标二"
      }],
      dashboardType:"",
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
        value: ''
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

  },
  methods:{
    
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