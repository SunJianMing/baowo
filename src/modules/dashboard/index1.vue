<template>
  <div class="dashboard-container">
    <el-row :gutter="20" class="wt-dashboard-row">
      <el-col :span="6">
        <el-card class="box-card" v-loading="isPointLoading">
          <div>
            <div class="wt-dashboard-card-title">
              系统消耗点数/系统总点数
            </div>
            <div class="wt-dashboard-card-subtitle">
              {{used_point}}/{{total_point}}
            </div>
            <div class="wt-dashboard-card-content">
              <div></div>
            </div>
            <div class="wt-dashboard-card-tip">
              已消耗<span class="tip-value">{{used_ratio}}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div>
            <div class="wt-dashboard-card-title">
              系统访问量
            </div>
            <div class="wt-dashboard-card-subtitle">
              {{indexTotalCV}}次
            </div>
            <div class="wt-dashboard-card-content">
              <div></div>
            </div>
            <div class="wt-dashboard-card-tip">
              今日访问量<span class="tip-value">{{indexTodayCV}}次</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="wt-dashboard-row">
      <el-col :span="12">
        <el-card class="box-card" v-loading="isPointLoading">
          <div slot="header" class="clearfix">
            <span>系统点数剩余占比</span>
          </div>
          <div class="wt-dashboard-2-charts">
            <div id="pointChart" class="wt-chart"></div>
          </div>
        </el-card>
      </el-col>
      <!--<el-col :span="12">-->
        <!--<el-card class="box-card">-->
          <!--<div slot="header" class="clearfix">-->
            <!--<span>近15日消耗点数</span>-->
          <!--</div>-->
          <!--<div class="wt-dashboard-2-charts">-->
            <!--<div id="used15Chart" class="wt-chart"></div>-->
          <!--</div>-->
        <!--</el-card>-->
      <!--</el-col>-->
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import request from '@/utils/request'

export default {
  name: 'dashboard',
  mounted() {
  },
  data() {
    return {
      total_point: '',
      used_point: '',
      un_used_point: '',
      used_ratio: '',
      indexTotalCV: '',
      indexTodayCV: '',
      isPointLoading: false
    }
  },
  activated() {
    this.requestDashboard()
    // this.layoutRecentUsedCharts({})
  },
  methods: {
    requestDashboard() {
      // this.isPointLoading = true
      // request({
      //   url: '/modules/auth/dashboard',
      //   method: 'post',
      //   data: { }
      // }).then(resp => {
      //   this.total_point = resp.data.totalPoint
      //   this.used_point = resp.data.usedPoint
      //   this.un_used_point = resp.data.unUsePoint
      //   this.used_ratio = resp.data.usedRatio
      //   this.indexTotalCV = resp.data.indexTotalCV
      //   this.indexTodayCV = resp.data.indexTodayCV
      //   this.layoutPointCharts(resp.data)
      //   this.isPointLoading = false
      // }).catch(error => {
      //   console.log('error', error)
      //   this.isPointLoading = false
      // })
    },
    layoutPointCharts(data) {
      //  点数消耗
      // const pointChart = echarts.init(document.getElementById('pointChart'))
      // pointChart.setOption({
      //   tooltip: {
      //     trigger: 'item',
      //     formatter: '{a} <br/>{b}: {c} ({d}%)'
      //   },
      //   series: [{
      //     name: '点数',
      //     type: 'pie',
      //     radius: ['50%', '70%'],
      //     data: [{ value: data.usedPoint, name: '已用点数' }, { value: data.unUsePoint, name: '未用点数' }]
      //   }]
      // })
    },
    layoutRecentUsedCharts(data) {
      //  近15日消耗
      // const used15Chart = echarts.init(document.getElementById('used15Chart'))
      // used15Chart.setOption({
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       type: 'shadow'
      //     }
      //   },
      //   xAxis: {
      //     type: 'category',
      //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      //     axisLine: { show: false },
      //     axisTick: { show: false },
      //     axisLabel: { textStyle: { color: '#999' }}
      //   },
      //   yAxis: {
      //     axisLine: { show: false },
      //     axisTick: { show: false },
      //     axisLabel: { textStyle: { color: '#999' }}
      //   },
      //   series: [{
      //     data: [120, 200, 150, 80, 70, 110, 130],
      //     type: 'bar'
      //   }]
      // })
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.wt-dashboard-row{
  margin-top: 20px;
  .wt-dashboard-card-title{
    color: #999;
    font-size: 14px;
  }
  .wt-dashboard-card-subtitle{
    font-size: 20px;
    font-weight: bold;
    margin: 8px 0;
  }
  .wt-dashboard-card-content{
    height: 10px;
    display: flex;
    justify-items: center;
    align-content: center;
    color: #666;
  }
  .wt-dashboard-card-tip{
    border-top: 1px solid #f0f0f0;
    padding-top: 12px;
    font-size: 14px;
    color: #666;
    .tip-value{
      color: #333;
      margin: 0 4px;
    }
  }
  .wt-dashboard-2-charts{
    height: 300px;
  }
}
  .wt-chart{
    height: 100%;
  }
</style>
