<script setup>
import * as echarts from "echarts";
import { ref, onMounted, toRefs, defineProps, reactive } from "vue";

const props = defineProps({
  reportData: {
    type: Object,
    default: () => ({}),
  }
});
const { reportData } = toRefs(props);
onMounted(() => {
  initEcharts();
});

const option = ref({
  title: {
    show: false,
    text: '',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    containLabel: true
  },
  xAxis: {
    show: false,
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    axisTick: false,
    axisLabel: {
      show: true,
      textStyle: {
        color: '#1B2A52'
      },
      interval: 0,
      height: 20,
      //设置字数限制
      formatter: function(value) {
        if (value.length > 6) {
          return value.substring(0, 6) + '...';
        } else {
          return value;
        }
      }
    },
    data: []
  },
  series: [
    {
      name: '',
      type: 'bar',
      barMaxWidth: 15,
      data: []
    },
  ]
});
const echartsDom = ref();
const questionList = ref([]);
const totalInfo = reactive({
  unCorrectedTotal: 0,
  rectificationRate: '0%',
});
const loadStatus = ref(false);
const initEcharts = () => {
  if (reportData.value.length) {
    let list = [];
    let valueData = [];
    let total = 0;
    let haveCorrectedTotal = 0;
    let unCorrectedTotal = 0
    reportData.value.map(item => {
      list.push(item.content);
      valueData.push(item.count);
      total += item.count;
      unCorrectedTotal += item.unCorrected;
      haveCorrectedTotal += item.haveCorrected;
    })
    totalInfo.unCorrectedTotal = unCorrectedTotal;
    totalInfo.rectificationRate = (haveCorrectedTotal / total * 100).toFixed() + '%';
    option.value.yAxis.data = list;
    option.value.series[0].data = valueData;
    questionList.value = reportData.value;
    let num = 7 - questionList.value.length;
    if (num > 0) {
      for (let i = 0; i < num; i++) {
        questionList.value.push({
          content: '-',
          count: '-',
          haveCorrected: '-',
          unCorrected: '-',
        })
      }
    }
    loadStatus.value = true;
    const myChart = echarts.init(echartsDom.value, "default");
    window.addEventListener('resize', function () {
      myChart.resize();
    })
    option.value && myChart.setOption(option.value);
  } else {
    for (let i = 0; i < 7; i++) {
      questionList.value.push({
        content: '-',
        count: '-',
        haveCorrected: '-',
        unCorrected: '-',
      })
    }
    loadStatus.value = false;
  }
};

</script>

<template>
  <div class="main-card grid-main-card">
    <div class="card-title">
      <card-title title="警告问题分布"></card-title>
    </div>
    <div class="main-content">
      <div class="main-left echarts-top">
        <div ref="echartsDom" style="width: 100%; height: 100%"></div>
<!--        <div ref="echartsDom" v-show="reportData.length" style="width: 100%; height: 100%"></div>-->
<!--        <div class="no-data" v-if="!reportData.length">-->
<!--          暂无数据-->
<!--        </div>-->
      </div>
      <div class="main-right">
        <div class="total">
          <div class="total-item">
            <div class="num">{{totalInfo.unCorrectedTotal}}条</div>
            <div class="num-tips">待阅读</div>
          </div>
          <div class="total-item">
            <div class="num">{{totalInfo.rectificationRate}}</div>
            <div class="num-tips">已阅读占比</div>
          </div>
        </div>
        <div>
          <div class="list-title list-item">
            <span class="tag">警告线索标签</span>
            <span class="tag-num">总数</span>
            <span class="tag-num">已阅</span>
            <span class="tag-num">待阅</span>
          </div>
          <div class="list-main">
            <div class="list-item" v-for="(item, index) in questionList" :key="index">
              <span class="tag" :title="item.content">{{ item.content }}</span>
              <span class="tag-num">{{ item.count }}</span>
              <span class="tag-num">{{ item.haveCorrected }}</span>
              <span class="tag-num">{{ item.unCorrected }}</span>
            </div>
          </div>
        </div>
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
  color: #1b2a52;
  display: flex;
  .echarts-top {
    margin-top: 20px;
  }
}
.main-left {
  width: 40%;
}
.main-right {
  width: 60%;
}
.total {
  width: 100%;
  display: flex;
}
.total-item {
  flex: 1;
  text-align: center;
  height: 66px;
  background-color: var(--default-background-color);
  color: #1b2a52;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .num {
    font-family: DIN Black;
    font-weight: 900;
    font-size: 20px;
  }
  .num-tips {
    font-family: Source Han Sans CN;
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
  }
}
.list-title {
  background-color: var(--deep-background-color);
  font-weight: 700 !important;
  margin-bottom: 10px;
}
.list-title, .list-item {
  border-radius: 12px;
  height: 22px;
  line-height: 22px;
  width: 100%;
  font-size: 11px;
  padding: 0 12px;
  font-weight: 400;
  span {
    display: inline-block;
  }
  .tag {
    width: 40%;
    text-align: left;
  }
  .tag-num {
    text-align: right;
    width: calc(60% / 3);
  }
}
.list-main {
  height: 190px;
  overflow-y: auto;
  .tag {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .list-item {
    margin-bottom: 2px;
  }
  .tag-num {
    transform: translateY(-6px);
  }
  .list-item:nth-child(2n) {
    background-color: #F99C340D;
  }
  .list-item:nth-child(2n+1) {
  background-color: #F99C341A;
}
}
.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #282828;
  width: 100%;
  height: 100%;
  margin-left: -20px;
}
</style>
