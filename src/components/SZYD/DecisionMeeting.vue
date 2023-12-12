<template>
  <div class="wh-100 p-all-20">
  <a-row v-for="(item,index) in decisionList" :key="index" style="height: 20%;">
    <a-col :span="3">
      <img :src="item.src" class="vertical-middle"/>
    </a-col>
    <a-col :span="17">
      <span class="title-css vertical-middle">{{ item.title }}:</span>
    </a-col>
    <a-col :span="4">
      <span class="title-css vertical-middle" style="font-size:32px">{{ item.data }}</span>
    </a-col>
  </a-row>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, toRefs } from 'vue'
import decisionMeeting from '@/assets/icon/decisionMeeting.svg'
import decisionError from '@/assets/icon/decisionError.svg'
import meetingQuestion from '@/assets/icon/meetingQuestion.svg'
import itemList from '@/assets/icon/itemList.svg'
import modifyPer from '@/assets/icon/modifyPer.svg'

const props = defineProps({
  decisionMeetingData:{
    type: Object,
    default: () => ({})
  }
})
const { decisionMeetingData } = toRefs(props)

const decisionList = ref([])

const initList = () => {
  decisionList.value = [
  {
    src: decisionMeeting,
    title: '决策会议数',
    data: decisionMeetingData.value.decisionMeetingAmount
  },
  {
    src: decisionError,
    title: '决策异常数',
    data: decisionMeetingData.value.decisionExceptionAmount
  },
  {
    src: meetingQuestion,
    title: '会议议题数',
    data: decisionMeetingData.value.meetingSubjectAmount
  },
  {
    src: itemList,
    title: '事项清单数',
    data: decisionMeetingData.value.itemAmount
  },
  {
    src: modifyPer,
    title: '整改率',
    data: `${decisionMeetingData.value.rectificationRate}%`
  },

  ]
}
onMounted(() => {
  initList();
})
</script>

<style scoped>
  .vertical-middle {
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(-50%,-50%)
  }
</style>