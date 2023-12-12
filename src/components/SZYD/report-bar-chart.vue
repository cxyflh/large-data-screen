<template>
  <div class="p-all-20" style="width:100%">
    <cardTitle :title="title"/>
    <div ref="echartsDom" style="width: 100%; height: 295px"></div>
  </div>
</template>

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
      default: 'xx'
    }
  });

  const { reportData, month } = toRefs(props);
  const title = `${month.value}月上报情况`;
  var echartsDom = ref();
//   const series = ref([
//   {
//     data: [120, 200, 150, 80, 70, 110, 130],
//     type: 'bar',
//     name: 'a',
//     barWidth: '25%',
//   },
// ]);
  const option = ref({
    xAxis: {
      type: 'category',
      data: [],
      axisTick: false,
      axisLabel: {
        // interval: 0,
        // formatter:function(value){
        //       return value.split('').join('\n')
        // }
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
    {
      data: [],
      type: 'bar',
      barWidth: '25%',
    },
]
  });
  const handleData = (data) => {
  if(data.xaxis?.length > 0 && data.yaxis?.length > 0){
    option.value.xAxis.data = data.xaxis;
    option.value.series[0].data = data.yaxis;;
  }
}
  const handleSeries = (series) => {
    for(let i = 0; i < series[0].data.length; i++) {
      series[0].data[i] = {
        value: series[0].data[i],
        itemStyle: {
          borderRadius: [20, 20, 20, 20]
        }
      };
    }
  }
  
  const initEcharts = () => {
    var myChart = echarts.init(echartsDom.value, 'default');
    handleData(reportData.value);
    handleSeries(option.value.series)
    option.value && myChart.setOption(option.value);
  };

  onMounted(() => {
      initEcharts();
  });
</script>

<style scoped>

</style>