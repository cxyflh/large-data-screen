<script setup>
import { ref, onMounted } from "vue";
import { getProcurementSupervision } from "@/api/dashboard.js";
import mainHeader from "@/components/MainHeader.vue";
import sectionReport from "@/components/SectionReport.vue";
import fulfillmentCard from "@/components/supervision/fulfillment-card.vue";
import targetClassDistribution from "@/components/supervision/target-class-distribution.vue";
import targetNumber from "@/components/supervision/target-number.vue";
import questionDistribution from "@/components/supervision/question-distribution.vue";
import alarmQuestionDistribution from "@/components/supervision/alarm-question-distribution.vue";
import targetNumberLineChart from "@/components/supervision/target-number-line-chart.vue"
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  let query = router.currentRoute.value.query;
  const params = {
    buCode: query.buCode || 'CR000',
    month: new Date().getMonth() + 1,
    ldap: query.ldap
  }
  dataInit(params);
})
const procurementSupervisionData = ref({});
const renderKey = ref();
const dataInit = (params) => {
  params.ldap = router.currentRoute.value.query.ldap
  getProcurementSupervision(params).then(res => {
    if (res.code === 200) {
      console.log('res.data', res.data)
      procurementSupervisionData.value = res.data;
      monthEntityList.value = res.data.monthEntityList;
      renderKey.value = Math.random();
    }
  })
}
const monthEntityList = ref([])
const month = ref();
const getMonth = (monthValue) => {
  month.value = monthValue;
}
const title = '基本信息：'
const content = ref('华润集团国资监管创新应用平台，汇聚全集团采购全链路业务数据，应用OCR、NLP等技术，对上报数据进行规则校验，实现了采购过程合规、招采问题线索发现、采购监管画像等场景的智能应用，集团全级次覆盖。同时，赋能了采购业务域合规性的提升，引领了采购业务域向智能化迈进。')
</script>

<template>
  <div class="largeScreenContainer">
    <huarun-header title="采购监管月报" :detailMonth="true" @getData="dataInit" :monthEntityList="monthEntityList" @getMonth="getMonth"/>
    <div :key="renderKey" class="column-flex">
      <mainHeader :title="title" :content="content" />
      <div class="row-flex lineTwo">
        <div class="div-border lineTwo-div">
          <sectionReport :sectionVo="procurementSupervisionData.sectionVo" :month="month" style="padding-top: 40px" />
        </div>
        <div class="div-border lineTwo-div">
          <target-number-line-chart :report-data="procurementSupervisionData.lineEcharts" />
        </div>
        <div class="div-border lineTwo-div">
          <fulfillment-card :report-data="procurementSupervisionData.honourAgreement" :month="month"></fulfillment-card>
        </div>
        <div class="div-border lineTwo-div">
          <target-class-distribution :report-data="procurementSupervisionData.bidList"  />
        </div>
      </div>
      <div class="row-flex lineThree">
        <div class="div-border lineThree-div">
          <target-number :report-data="procurementSupervisionData.barEcharts" :month="month" />
        </div>
        <div class="div-border lineThree-div">
          <question-distribution :report-data="procurementSupervisionData.noPassProblem" />
        </div>
        <div class="div-border lineThree-div">
          <alarm-question-distribution :report-data="procurementSupervisionData.warnProblems" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.largeScreenContainer {
  padding-bottom: 40px;
}
@media screen and (width < 1920px) {
  .largeScreenContainer {
    width: 1920px;
    //height: 1080px;
    overflow: scroll;
  }
}
.main-content {
  flex-grow: 1;
  padding: 40px;
  display: flex;
  justify-content: space-between;
}
.contentDiv {
  width: 425px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  border: 2px solid;
  border-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content-title {
    height: 78px;
    width: 100%;
    text-align: center;
    font-family: Source Han Sans CN;
    font-size: 26px;
    font-weight: 900;
    color: #16408f;
    line-height: 78px;
  }
  .content-main {
    flex-grow: 1;
    padding: 10px 0;
  }
}
.lineTwo {
  width: 100%;
  .lineTwo-div {
    height: 369px;
    flex-grow: 0.25;
    width: 436px;
  }
}

.lineThree {
  width: 100%;
  .lineThree-div {
    width: 33.3%;
    height: 369px;
  }
}
</style>
