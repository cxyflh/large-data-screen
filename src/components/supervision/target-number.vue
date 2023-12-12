<script setup>
import * as echarts from "echarts";
import { ref, onMounted, toRefs, defineProps } from "vue";

const props = defineProps({
  reportData: {
    type: Object,
    default: () => ({}),
  },
  month: {
    type: String,
    default: 'xx',
  }
});
const { reportData } = toRefs(props);
const echartsList = ref([
  {
    label: '告警',
    value: 'warn',
    data: [],
  },
  {
    label: '不通过',
    value: 'noPass',
    data: [],
  },
  {
    label: '待整改',
    value: 'rectified',
    data: [],
  },
]);
const year = ref();
onMounted(() => {
  year.value = new Date().getFullYear();
  initEcharts();
});

const option = ref({
  grid: {
    top: '10px',
    left: '48px',
    right: 0,
    bottom: 0,
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  legend: {
    show: false,
    data: ['告警', '不通过', '待整改']
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisPointer: {
        type: 'shadow'
      },
      axisTick: false,
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#BFD8FC'
        }
      },
      axisLabel: {
        interval: 0,
        formatter:function(value){
          return value.split('').join('\n')
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      show: true,
      name: '',
      // interval: 10,
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'solid',
        }
      },
    },
    {
      type: 'value',
      show: false,
      name: '',
      // interval: 5,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'solid',
        }
      },
    }
  ],
  series: [
    {
      name: '告警',
      type: 'bar',
      tooltip: {},
      // smooth: 20,
      barWidth: 10,
      itemStyle: {
        // barBorderRadius: 2,
      },
      color: '#F99C3480',
      data: [],
      stack: 'stack1'
    },
    {
      name: '不通过',
      type: 'bar',
      tooltip: {},
      // smooth: 20,
      barWidth: 10,
      barGap: '-100%',
      color: '#F99C34',
      itemStyle: {
        // barBorderRadius: 2,
      },
      data: [],
      stack: 'stack1'
    },
    {
      name: '待整改',
      type: 'line',
      symbol: 'none',
      tooltip: {},
      color: '#DA0000',
      data: []
    }
  ]
})
var echartsDom = ref();
const initEcharts = () => {
  var myChart = echarts.init(echartsDom.value, 'default');
  if (reportData.value?.xaxis) {
    option.value.xAxis[0].data = reportData.value.xaxis;
    echartsList.value.forEach(item => {
      item.data = reportData.value[item.value];
      option.value.series.forEach(ele => {
        if (ele.name === item.label) {
          ele.data = reportData.value[item.value];
        }
      })
    })
  }
  option.value && myChart.setOption(option.value);
};
</script>

<template>
  <div class="main-card grid-main-card">
    <div class="card-title">
      <card-title :title="month + '月问题线索汇总'"></card-title>
    </div>
    <div class="main-content">
      <div ref="echartsDom" style="width: 100%; height: 225px"></div>
    </div>
    <div>
      <div v-for="item in echartsList" :key="item.value" class="target-item">
        <span class="label">{{ item.label }}</span>
        <span class="num" v-for="ele in item.data" :key="ele">
          <span class="num-item">{{ ele }}</span>
        </span>
      </div>
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

.target-item {
  display: flex;
  margin-top: 7px;
  padding: 2px 0 2px 4px;
  border-radius: 52px;
  background: #DA00001A;
  font-size: 12px;

  .label {
    width: 48px;
    font-weight: 500;
    line-height: 18px;
  }

  .num {
    flex: 1;
  }

  span {
    display: inline-block;
    text-align: center;
    color: #1B2A52;
    line-height: 18px;
  }

  &:first-child {
    background: #F99C341A;
  }

  &:last-child {
    background: #0033FF1A;
  }
}
</style>
