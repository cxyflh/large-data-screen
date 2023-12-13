<template>
    <div class="wh-100 p-all-20">
    <div class="list-title list-item">
      <span class="tag">未上报公司名单</span>
      <span class="tag">是否需要上报</span>
    </div>
    <div class="list-main">
      <div class="list-item item-height" v-for="(item, index) in unReportData" :key="index">
        <span class="tag">{{ item.companyName }}</span>
        <span class="tag" v-if="item.needReport === 1">是</span>
        <span class="tag" v-else></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, toRefs, defineProps, computed } from 'vue'

const prop = defineProps({
  unReportList: {
    type: Array,
    default: []
  }
})
const { unReportList } = toRefs(prop)
const unReportData = ref();
const empty = {
  companyName: '-',
  needReport: -1,
}
const initList = () => {
  let result = unReportList.value;
  const length = result.length;
  if(length < 13){
    for(let i = 0; i < 13 - length; i++){
      result.push(empty);
    }
  }
  unReportData.value = result;
};
onMounted(() => {
  initList();
});
</script>

<style scoped lang="less">
  .list-title {
    background-color: var(--deep-background-color);
    font-weight: 700 !important;
    margin-bottom: 5px;
    font-size: 14px !important;
  }
  .list-title, .list-item {
    border-radius: 12px;
    height: 50px;
    line-height: 50px;
    width: 100%;
    font-size: 12px;
    padding: 0 12px;
    font-weight: 400;
    span {
      display: inline-block;
    }
    .tag {
      width: 50%;
      text-align: center;
    }
}
.list-main {
  height: calc(100% - 50px);
  overflow-y: auto;
  .list-item {
    margin-bottom: 2px;
  }
  .item-height {
    height: 29px;
    line-height: 29px;
  }
  .list-item:nth-child(2n) {
    background-color: #F99C340D;
  }
  .list-item:nth-child(2n+1) {
  background-color: #F99C341A;
}
}
</style>