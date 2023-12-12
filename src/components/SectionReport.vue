<template>
  <div class="p-all-20 wh-100 container">
    <div class="section-report">
      <span class="title-css block" style="font-size: 32px">{{ sectionVo.sectionReport }}</span>
      <span class="content-css">{{ month }}月上报标段</span>
    </div>
    <div class="pass-report">
      <div class="info-content">
          <a-result class="p-all-0">
            <template #icon>
              <img src="@/assets/icon/success.svg" />
            </template>
            <template #title>
              <span class="title-css" style="font-size: 32px">{{ sectionVo.pass }}</span>
            </template>
            <template #subTitle>
              <span class="content-css">通过</span>
            </template>
          </a-result>
      </div>
      <a-divider type="vertical" class="divider"/>
      <div class="info-content">
        <a-result class="p-all-0">
          <template #icon>
              <img src="@/assets/icon/error.svg" />
            </template>
            <template #title>
              <span class="title-css" style="font-size: 32px">{{ sectionVo.noPass }}</span>
            </template>
            <template #subTitle>
              <span class="content-css">不通过</span>
            </template>
          </a-result>
      </div>
      <a-divider type="vertical" class="divider"/>
      <div class="info-content">
        <a-result class="p-all-0">
          <template #icon>
              <img src="@/assets/icon/warning.svg" />
            </template>
            <template #title>
              <span class="title-css" style="font-size: 32px">{{ sectionVo.warn }}</span>
            </template>
            <template #subTitle>
              <span class="content-css">警告</span>
            </template>
          </a-result>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref,defineProps, toRefs } from 'vue'

const props = defineProps({
  sectionVo: {
    type: Object,
    default: {
      sectionReport: 0,
      pass: 0,
      noPass: 0,
      warn: 0
    }
  },
  month: {
    type: String,
    default: 'xx'
  }
})
const { sectionVo, month } = toRefs(props)

const initSectionVo = () => {
  sectionVo.value.sectionReport = 17792;
  sectionVo.value.pass = 1800;
  sectionVo.value.noPass = 1417;
  sectionVo.value.warn = 1067;
}
onMounted(() => {
  nextTick(() => {
    //initSectionVo();
  })
})
</script>

<style scoped lang="less">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
  }
  .section-report {
    width: 143px;
    height: 143px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: url('../assets/icon/circle.svg');
  }
  .pass-report {
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 30px;
    .info-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: calc(1 / 3);
  }
    .divider {
      height: 40px;
      background-color: #BFD8FC;
    }
  }

</style>