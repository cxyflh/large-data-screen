<script setup>
import * as echarts from "echarts";
import { ref, onMounted, toRefs, defineProps } from "vue";

const props = defineProps({
  reportData: {
    type: Object,
    default: () => ({}),
  }
});
const { reportData } = toRefs(props);

const year = ref();


const option = ref({
  grid: {
    top: '30px',
    left: '20px',
    right: '30px',
    bottom: '20px',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: '{b}月<br/>{c}'
  },
  xAxis: {
    type: 'category',
    name: '月',
    axisTick: false,
    axisLabel: {
      // rotate: 45,
    },
    data: []
  },
  yAxis: {
    type: 'value',
    name: '标段数'
  },
  series: [
    {
      data: [],
      type: 'line',
      symbol: 'none',
      smooth: true,
      areaStyle: {
        opacity: 0.2,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#FF5F1F'
          },
          {
            offset: 1,
            color: '#FFF'
          }
        ])
      },
    }
  ]
})
const handleData = (data) => {
  if(data.xaxis?.length > 0 && data.yaxis?.length > 0){
    option.value.xAxis.data = data.xaxis.map(i => {
      // if (i < 10) {
      //   return '0' + i + '月';
      // } else {
      //   return i + '月';
      // }
      return i;
    })
    option.value.series[0].data = data.yaxis;
  }
}
var echartsDom = ref();
const initEcharts = () => {
  var myChart = echarts.init(echartsDom.value, 'default');
  handleData(reportData.value);
  option.value && myChart.setOption(option.value);
};
onMounted(() => {
  year.value = new Date().getFullYear();
  initEcharts();
});
</script>

<template>
  <div class="main-card grid-main-card">
    <div class="card-title">
      <card-title :title="year + '年上报标段数'"></card-title>
    </div>
    <div class="main-content">
      <div ref="echartsDom" style="width: 100%; height: 265px"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main-card {
  width: 100%;
  height: 369px;
}
.main-content {
  display: flex;
  padding-top: 20px;
}
</style>
