<script setup>
import * as echarts from "echarts";
import {ref, onMounted, toRefs, defineProps} from "vue";

const props = defineProps({
  reportData: {
    type: Object,
    default: () => ({}),
  },
  month: {
    type: String,
    default: 'xx月',
  }
});
const {reportData, month} = toRefs(props);
const echartsList = ref([
  {
    label: '会议数',
    value: 'meetingList',
    data: [],
  },
  {
    label: '异常数',
    value: 'exceptionList',
    data: [],
  },
])
const xAxis = ref([]);
onMounted(() => {
  echartsList.value[0].data = reportData.value.meetingList;
  echartsList.value[1].data = reportData.value.exceptionList;
  console.log(reportData.value)
  xAxis.value = reportData.value.xAxis;
  option.value.xAxis[0].data = xAxis.value;
  initEcharts();
});

const option = ref({
  grid: {
    top: '20px',
    left: '36px',
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
  toolbox: {
    show: false,
    feature: {
      dataView: {show: true, readOnly: false},
      magicType: {show: true, type: ['line', 'bar']},
      restore: {show: true},
      saveAsImage: {show: true}
    }
  },
  legend: {
    show: false,
    data: ['会议数', '异常数']
  },
  xAxis: [
    {
      type: 'category',
      data: xAxis.value,
      axisTick: false,
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '',
      axisLabel: {
        color: '#1B2A52',
        fontSize: 16,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'solid',
        }
      }
    },
    {
      type: 'value',
      name: '',
      axisLabel: {},
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
      name: '会议数',
      type: 'bar',
      tooltip: {},
      barMaxWidth: 20,
      data: echartsList.value[0].data,
    },
    {
      name: '异常',
      type: 'line',
      tooltip: {},
      color: '#DA0000',
      data: echartsList.value[1].data,
    }
  ]
})
var echartsDom = ref();
const initEcharts = () => {
  const myChart = echarts.init(echartsDom.value, 'default');
  option.value && myChart.setOption(option.value);
};
</script>

<template>
  <div class="main-card grid-main-card">
    <div class="card-title">
      <card-title :title="month + '上报情况'"></card-title>
    </div>
    <div class="main-content">
      <div ref="echartsDom" class="echarts-dom"></div>
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
  width: 100%;
  //display: flex;
}
.echarts-dom {
  width: 100%;
  height: 300px;
  position: relative;
}
.target-item {
  display: flex;
  margin-top: 10px;
  padding: 4px 0 4px 16px;
  border-radius: 52px;
  .label {
    width: 48px;
  }
  .num {
    flex: 1;
  }
  span {
    display: inline-block;
    text-align: center;
    color: #1B2A52;
  }
  &:first-child {
    background: #F99C341A;
    .label {
      color: #F99C34;
    }
  }
  &:last-child {
    background: #DA00001A;
    .label {
      color: #DA0000;
    }
  }
}
</style>
