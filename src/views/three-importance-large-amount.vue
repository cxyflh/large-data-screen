<template>
    <div class="largeScreenContainer">
    <huarun-header title="三重一大月报" :detailMonth="true" @getData="getSZYDData" :monthEntityList="monthEntityList" @getMonth="getMonth"/>
    <div :key="renderKey" class="column-flex">
      <main-header :title="headerTitle" :content="content" />
      <div class="row-flex lineTwo">
        <div class="div-border lineTwo-div1"><decisionMeeting :decisionMeetingData="decisionMeetingData"/></div>
        <div class="div-border lineTwo-div2"><reportStuation :reportData="szydLineEcharts" :month="month"/></div>
        <div class="div-border lineTwo-div3"><unreportedList :unReportList="unReportList"/></div>
      </div>
      <div class="row-flex lineThree">
        <div class="div-border lineThree-div1"><enterpriseDecisionTable :decisionList="decisionList"/></div>
        <div class="div-border lineThree-div2"><largeFundUsage :largeFunds="largeFunds" :month="month"/></div>
      </div>
    </div>
      <div class="demo">样例数据</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import decisionMeeting from '@/components/SZYD/DecisionMeeting.vue'
import unreportedList from '@/components/SZYD/unreported-list.vue'
import enterpriseDecisionTable from '@/components/SZYD/enterprise-decision-table.vue'
import largeFundUsage from '@/components/SZYD/LargeFundUsage.vue'
import reportStuation from '@/components/SZYD/report-stuation.vue'
import { getSZYD } from '../api/dashboard'
import { useRouter } from "vue-router";

const router = useRouter();

const decisionMeetingData = ref({
  decisionMeetingAmount: 0,
  decisionExceptionAmount: 0,
  meetingSubjectAmount: 0,
  itemAmount: 0,
  rectificationRate: 0
})
const szydLineEcharts = ref({
  xAxis: [],
  meetingList: [],
  exceptionList: [],
})
const unReportList = ref([])
const decisionList = ref([])
const largeFunds = ref({})
const monthEntityList = ref([])
const renderKey = ref()
const month = ref();
// const query = ref({
//     buCode: 'CR000',
//     month: new Date().getMonth() + 1,
// })

const getSZYDData = (params) => {
  // query.value = params
  getSZYD(params).then(res => {
    if(res.code === 200){
      if(res.data !== null){
        decisionMeetingData.value.decisionExceptionAmount = res.data.decisionExceptionAmount;
        decisionMeetingData.value.decisionMeetingAmount = res.data.decisionMeetingAmount;
        decisionMeetingData.value.itemAmount = res.data.itemAmount;
        decisionMeetingData.value.meetingSubjectAmount = res.data.meetingSubjectAmount;
        decisionMeetingData.value.rectificationRate = res.data.rectificationRate;
        szydLineEcharts.value = res.data.szydLineEcharts;
        unReportList.value = res.data.unReportList;
        decisionList.value = res.data.decisionList;
        monthEntityList.value = res.data.monthEntityList;
        largeFunds.value = res.data.largeFunds;
        renderKey.value = Math.random()
      }
    }
  })
}
const getMonth = (monthValue) => {
  month.value = `${monthValue}月`;
}
const headerTitle = ref('基本信息：')
const content = ref('为进一步贯彻落实中共中央关于凡属重大决策、重要人事任免、重大项目安排和大额度资金运作（以下简称“三重一大”）事项必须由领导班子集体研究做出决定的要求，防范决策风险，推动企业科学发展')
onMounted(() => {
  let query = router.currentRoute.value.query;
  const params = {
    buCode: query.buCode || 'CR000',
    month: new Date().getMonth() + 1,
    ldap: query.ldap,
  }
  getSZYDData(params);
})

</script>

<style scoped lang="less">
@media screen and (width < 1920px) {
  .largeScreenContainer {
    width: 1920px;
    min-height: 1080px;
    overflow: scroll;
  }
}
.largeScreenContainer {
  padding-bottom: 40px;
}
  .lineTwo {
    width: 100%;
    height: 495px;
  .lineTwo-div1 {
    height: 100%;
    flex: 1;
    //min-width: 333px;
  }
  .lineTwo-div2 {
    height: 100%;
    flex: 2;
    //min-width: 860px;
  }
  .lineTwo-div3 {
    height: 100%;
    flex-grow: 1;
    //min-width: 500px;
  }
}

.lineThree {
  width: 100%;
  height: 242px;
  .lineThree-div1 {
    //min-width: 1365px;
    height: 100%;
    flex: 6;
  }
  .lineThree-div2 {
    min-width: 330px;
    flex: 1;
    height: 100%;
  }
}
.demo {
  position: absolute;
  font-weight: bold;
  font-size: 50px;
  color: #cdcacae6;
  transform: rotate(-45deg);
  top: 40%;
  left: 38%;
  letter-spacing: 75px;
}
</style>