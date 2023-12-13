<template>
  <div class="largeScreenContainer">
    <huarun-header @getData="getHomeDomainData" title="国资监管画像" @getBuCode="getBuCode"/>
    <div class="main-content" :key="renderKey">
      <div class="contentDiv" >
        <div class="content-title" @click="pushSupervision">采购监管</div>
        <sectionReport :sectionVo="sectionVo" :month="month" style="padding: 0"/>
        <targetNumberLineChart :reportData="lineEcharts"/>
        <div class="home-rectangle" style="background-color: #F6E6D4;">
          <span class="content-css p-all-20">{{ month }}月累计合同金额</span>
          <span class="title-css p-all-20">{{ Math.round(cumulativeContractAmount/10000) }}万</span>
        </div>
      </div>
      <div class="contentDiv">
        <div class="content-title"  @click="pushSZYD">三重一大</div>
        <div class="content-main">
          <reportBarChart :reportData="barEcharts" :month="month"/>
          <div class="home-rectangle">
            <div>
              <span class="title-css top-span">{{ month }}月决策会议数</span>
              <span class="title-css block bottom-span">{{ decisionMeeting }}</span>
            </div>
            <img src="../assets/icon/home-szyd1.svg" style="padding-right: 20px;"/>
          </div>
          <div class="home-rectangle">
            <div>
              <span class="title-css top-span">{{ month }}月决策异常数</span>
              <span class="title-css block bottom-span">{{ decisionException }}</span>
            </div>
            <img src="../assets/icon/home-szyd2.svg" style="padding-right: 20px;"/>
          </div>
          <div class="home-rectangle">
            <div>
              <span class="title-css top-span">{{ month }}月整改率</span>
              <span class="title-css block bottom-span">{{ rectificationRate }}%</span>
            </div>
            <img src="../assets/icon/home-szyd3.svg" style="padding-right: 20px;"/>
          </div>
        </div>
        <div class="demo">样例数据</div>
      </div>
      <div class="contentDiv">
        <div class="content-title" @click="toThirdPartyReport">聘用第三方服务机构</div>
        <fundSupervision />
        <div class="demo">样例数据</div>
      </div>
      <div class="contentDiv">
        <div class="content-title" @click="toExpertScore">专家评分</div>
        <enterpriseInformation />
        <div class="demo">样例数据</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import fundSupervision from './FundSupervision.vue'
  import enterpriseInformation from './EnterpriseInformation.vue'
  import sectionReport from '@/components/SectionReport.vue'
  import targetNumberLineChart from '@/components/supervision/target-number-line-chart.vue'
  import reportBarChart from '@/components/SZYD/report-bar-chart.vue'
  import router from '../router';
  import { getHomeDomain } from '../api/dashboard'
  import { useRouter } from "vue-router";

  const $router = useRouter();

  const month = new Date().getMonth() + 1;
  const decisionMeeting = ref();
  const decisionException = ref();
  const rectificationRate = ref();
  
  const renderKey = ref();
  const sectionVo = ref();
  const lineEcharts = ref();
  const barEcharts = ref();
  const cumulativeContractAmount = ref(0);
  const query = ref({
    buCode: $router.currentRoute.value.query.buCode || 'CR000',
    ldap: $router.currentRoute.value.query.ldap
  })

  const pushSupervision = () => {
    router.push({
      path: '/supervision-report',
      query: query.value
    })
  }
  const pushSZYD = () => {
    router.push({
      path: '/SZYD',
      query: query.value
    })
  }
  const toThirdPartyReport = () => {
    router.push({
      path: '/third-party-report',
      query: query.value
    })
  }
  const toExpertScore= () => {
    router.push({
      path: '/expert-score',
      query: query.value
    })
  }
  const getBuCode = (code) => {
    console.log(code,'code')
    query.value.buCode = code
  }
  const getHomeDomainData = (params) => {
    params.ldap = $router.currentRoute.value.query.ldap
    getHomeDomain(params).then(res => {
      console.log(res,'res')
      if(res.code === 200){
        if(res.data !== null){
          sectionVo.value = res.data.procurementSupervision.sectionVo;
          lineEcharts.value = res.data.procurementSupervision.lineEcharts;
          cumulativeContractAmount.value = res.data.procurementSupervision.cumulativeContractAmount;
          barEcharts.value = res.data.szyd.lineEcharts;
          decisionMeeting.value = res.data.szyd.decisionMeeting;
          decisionException.value = res.data.szyd.decisionException;
          rectificationRate.value = res.data.szyd.rectificationRate;
          renderKey.value = Math.random();
        //console.log(procurementSupervision.value);
        }
      }
    })
  }
  onMounted(() => {
    getHomeDomainData(query.value);
  })
</script>

<style scoped lang="less">
@media screen and (width < 1920px) {
  .largeScreenContainer {
    width: 1920px;
    //height: 1080px;
    //overflow: scroll;
  }
}
  .main-content {
    flex-grow: 1;
    padding: 40px;
    display: flex;
    gap: 30px;
  }
  .contentDiv {
    //min-width: 125px;
    position: relative;
    width: 425px;
    // height: 100%;
    flex:1;
    background-color: rgba(255, 255, 255,0.8);
    border-radius: 10px;
    border: 2px solid;
    border-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .content-title {
      height: 78px;
      width: 100%;
      text-align: center;
      font-family: Source Han Sans CN;
      font-size: 26px;
      font-weight: 900;
      color: #1B2A52;  
      line-height: 78px;
    }
    .content-main {
      width: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }
  .content-title:hover {
    z-index: 99;
    cursor: pointer;
  }

 .top-span , .bottom-span {
    padding: 5px 30px;
    font-size: 14px;
 }
 .bottom-span {
    font-size: 24px;
 }
 .demo {
   position: absolute;
   font-weight: bold;
   font-size: 50px;
   color: #cdcacae6;
   transform: rotate(-62deg);
   top: 50%;
   letter-spacing: 42px;
 }
</style>