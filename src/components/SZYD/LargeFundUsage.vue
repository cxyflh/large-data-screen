<template>
  <div class="wh-100 p-all-20 container">
    <cardTitle title="大额资金使用"/>
    <a-row v-for="(item,index) in fundList" :key="index" style="flex: 1;padding-top: 20px;">
      <a-col :span="15">
        <span class="content-css">{{ item.title }}</span>
      </a-col>
      <a-col :span="9">
        <span class="title-css" style="float: right;">{{ item.data }}</span>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, onMounted, toRefs } from 'vue'
import cardTitle from '@/components/card-title.vue'

const props = defineProps({
  largeFunds: {
    type: Object,
    default: {}
  },
  month: {
    type: String,
    default: 'x'
  }
})
const {largeFunds,month} = toRefs(props)
const fundList = ref([
  {
    title: '',
    data: '',
  }
]);
const resData = {
  fundsAmount: '100',
  largeFundsAmount: '100',
  payLargeFundsAmount: '10',
}
const list = [
  {
    title: `${month.value}月资金总额`,
    data: `${resData.fundsAmount}亿元`,
  },
  {
    title: `${month.value}月大额资金总额`,
    data: `${resData.largeFundsAmount}亿元`,
  },
  {
    title: `${month.value}月支付大额资金总额`,
    data: `${resData.payLargeFundsAmount}笔`,
  }
]
const initFundList = () => {
  fundList.value = list;
  let data1 = (Object.values(largeFunds.value)[0] / 100000000).toFixed(1)
  let data2 = (Object.values(largeFunds.value)[1] / 100000000).toFixed(1)
  let data3 = Object.values(largeFunds.value)[2]
  fundList.value[0].data = typeof Object.values(largeFunds.value)[0] === 'number' ? data1 + '亿元' : '--'
  fundList.value[1].data = typeof Object.values(largeFunds.value)[1] === 'number' ? data2 + '亿元' : '--'
  fundList.value[2].data = typeof Object.values(largeFunds.value)[2] === 'number' ? data3 + '笔' : '--'
}
onMounted(() => {
  //console.log(largeFunds,'large')
  initFundList();
})
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
  }
  .vertical-middle {
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(-50%,-50%)
  }
</style>