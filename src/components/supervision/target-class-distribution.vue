<script setup>
import * as echarts from "echarts";
import {ref, onMounted, resolveDirective, defineProps, toRefs} from "vue";

const props = defineProps({
  reportData: {
    type: Array,
    default: () => ([]),
  },
});
const { reportData } = toRefs(props);

onMounted(() => {
  initLeftEcharts();
  initRightEcharts();
});

const leftOption = ref({
  grid: {
    x: 0,
    y: 0,
    x2: 0,
    y2: 0
  },
  tooltip: {
    formatter: '招标{b}'
  },
  series: [
    {
      type: "treemap",
      breadcrumb: {
        show: false,
      },
      label: {
        color: '#1B2A52',
        fontSize: '15px',
        position: 'insideBottomLeft',
      },
      itemStyle: {
        borderColor: '#fff',
      },
      levels: [
        {
          itemStyle: {
            borderWidth: 2,
            borderColor: '#fff',
            gapWidth: 2
          },
          color: ['#F99C34E5', 'rgba(249,156,52,0.7)', 'rgba(249,156,52,0.6)','rgba(249,156,52,0.4)', '#F99C3499'],
        },
        {
          color: ['#F99C34E5', 'rgba(249,156,52,0.7)', 'rgba(249,156,52,0.6)','rgba(249,156,52,0.4)', '#F99C3499'],
          colorMappingBy: 'value',
          itemStyle: {
            gapWidth: 1
          }
        }
      ],
      width: '100%',
      height: '100%',
      roam: false,
      nodeClick: false,
      position: [0, 0],
      data: [],
    },
  ],
});
var treeMapLeftDom = ref();
const initLeftEcharts = () => {
  if (reportData.value.length) {
    let leftData = reportData.value.filter(item => item.type === 1);
    let total = leftData.reduce((val, item) => val + item.amount, 0);
    leftOption.value.series[0].data = leftData.map(item => {
      return {
        name: item.content + ' ' + Math.round(item.amount / total * 100) + '%',
        value: item.amount,
      }
    })
  }
  var myChart = echarts.init(treeMapLeftDom.value, 'default');
  window.addEventListener('resize', function () {
    myChart.resize();
  })
  leftOption.value && myChart.setOption(leftOption.value);
};

const rightOption = ref({
  grid: {
    x: 0,
    y: 0,
    x2: 0,
    y2: 0
  },
  tooltip: {
    formatter: '非招{b}'
  },
  series: [
    {
      type: "treemap",
      width: '100%',
      height: '100%',
      breadcrumb: {
        show: false,
      },
      label: {
        color: '#1B2A52',
        fontSize: '16px',
        position: 'insideBottomLeft',
      },
      itemStyle: {
        borderColor: '#fff',
      },
      levels: [
        {
          itemStyle: {
            borderWidth: 2,
            borderColor: '#fff',
            gapWidth: 2
          },
          color: ['#F99C34E5', 'rgba(249,156,52,0.7)', 'rgba(249,156,52,0.6)','rgba(249,156,52,0.4)', '#F99C3499'],
        },
        {
          color: ['#F99C34E5', 'rgba(249,156,52,0.7)', 'rgba(249,156,52,0.6)','rgba(249,156,52,0.4)', '#F99C3499'],
          colorMappingBy: 'value',
          itemStyle: {
            gapWidth: 1
          }
        }
      ],
      roam: false,
      nodeClick: false,
      data: [],
    },
  ],
});
var treeMapRightDom = ref();
const initRightEcharts = () => {
  if (reportData.value.length) {
    let rightData = reportData.value.filter(item => item.type === 2);
    let total = rightData.reduce((val, item) => val + item.amount, 0);
    rightOption.value.series[0].data = rightData.map(item => {
      return {
        name: item.content + ' ' + Math.round(item.amount / total * 100) + '%',
        value: item.amount,
      }
    })
  }
  var myChart = echarts.init(treeMapRightDom.value, 'default');
  window.addEventListener('resize', function () {
    myChart.resize();
  })
  rightOption.value && myChart.setOption(rightOption.value);
};
</script>

<template>
  <div class="main-card grid-main-card">
    <div class="card-title">
      <card-title title="标的类别分布"></card-title>
    </div>
    <div class="chart-top">
      <div class="top-left">招标</div>
      <div class="top-right">非招</div>
    </div>
    <div class="main-content">
      <div ref="treeMapLeftDom" style="width: 55%; height: 248px"></div>
      <div ref="treeMapRightDom" class="right-echarts" style="flex: 1; height: 248px"></div>
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
}
.chart-top {
  margin: 0 2px;
  margin-top: 20px;
  margin-right: 4px;
  //width: 100%;
  height: 34px;
  background: #F99C34;
  text-align: center;
  line-height: 34px;
  display: flex;
  color: #1B2A52;
  //font-weight: 700;
  font-size: 18px;
  //border-bottom: 2px solid #fff;
  .top-left {
    width: calc(55% + 2px);
    border-right: 2px solid #fff;
  }
  .top-right {
    width: 45%;
  }
}
.right-echarts {
  transform: translateX(-2px);
}
</style>
