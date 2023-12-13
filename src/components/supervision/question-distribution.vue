<script setup>
import * as echarts from "echarts";
import {ref, onMounted, toRefs, defineProps, reactive} from "vue";

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
  color: "",
  legend: {
    show: false,
    data: [],
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: "附件缺失", max: 6500 },
      { name: "报价表一致", max: 16000 },
      { name: "不合理商务条款", max: 30000 },
      { name: "名称不合规", max: 38000 },
      { name: "限制营业执照范围", max: 52000 },
      { name: "附件损坏", max: 25000 },
    ],
  },
  series: [
    {
      name: "",
      type: "radar",
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: "",
          symbol: 'none',
          areaStyle: {
            color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
              {
                color: "rgba(255, 145, 124, 0.1)",
                offset: 0,
              },
              {
                color: "rgba(255, 145, 124, 0.9)",
                offset: 1,
              },
            ]),
          },
        },
      ],
    },
  ],
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
      list.push({
        max: item.count,
        name: item.content,
      });
      valueData.push(item.haveCorrected);
      total += item.count;
      unCorrectedTotal += item.unCorrected;
      haveCorrectedTotal += item.haveCorrected;
    })
    totalInfo.unCorrectedTotal = unCorrectedTotal;
    totalInfo.rectificationRate = (haveCorrectedTotal / total * 100).toFixed() + '%';
    option.value.radar.indicator = list;
    option.value.series[0].data[0].value = valueData;
    questionList.value = reportData.value;
    let num = 8 - questionList.value.length;
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
    loadStatus.value = false;
  }
};
</script>

<template>
  <div class="main-card grid-main-card">
    <div class="card-title">
      <card-title title="不通过问题分布"></card-title>
    </div>
    <div class="main-content">
      <div class="main-item echarts-top">
        <div ref="echartsDom" style="width: 100%; height: 236px"></div>
      </div>
      <div class="main-item">
        <div class="total">
          <div class="total-item">
            <div class="num">{{totalInfo.unCorrectedTotal}}条</div>
            <div class="num-tips">待整改</div>
          </div>
          <div class="total-item">
            <div class="num">{{totalInfo.rectificationRate}}</div>
            <div class="num-tips">整改率</div>
          </div>
        </div>
        <div>
          <div class="list-title list-item">
            <span class="tag">不通过线索标签</span>
            <span class="tag-num">总数</span>
            <span class="tag-num">已整改</span>
            <span class="tag-num">待整改</span>
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
.main-item {
  width: 50%;
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
</style>
