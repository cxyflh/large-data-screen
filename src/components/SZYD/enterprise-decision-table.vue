<template>
  <div class="wh-100" style="padding: 10px 30px;">
    <div class="list-title list-item">
      <span v-for="(item,index) in listTitle" :class="index === 0?'tag':'tag-num'" :key="index">{{ item }}</span>
    </div>
    <div class="list-main">
      <div class="list-item" v-for="(item, index) in decisionData" :key="index">
        <span class="tag">{{ item.companyName }}</span>
        <span class="tag-num">{{ item.decisionSystem }}</span>
        <span class="tag-num">{{ item.item }}</span>
        <span class="tag-num">{{ item.decisionMeeting }}</span>
        <span class="tag-num">{{ item.decisionSubject }}</span>
        <span class="tag-num">{{ item.implement }}</span>
        <span class="tag-num">{{ item.decisionException }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, toRefs, computed } from 'vue'

const props = defineProps({
  decisionList: {
    type: Array,
    default: [],
  }
})

const {decisionList} = toRefs(props)
const decisionData = ref()
const listTitle = ref(['企业名称','决策制度','事项清单','决策会议','决策议题','组织实施','决策异常']);
const empty = {
    companyName: '-',
    decisionSystem: '-',
    item: '-',
    decisionMeeting: '-',
    decisionSubject: '-',
    implement: '-',
    decisionException: '-',
};

const initList = () => {
  let result = decisionList.value;
  const length = result.length;
  if(length < 8){
    for(let i = 0; i < 8 - length; i++){
      result.push(empty);
    }
  }
  decisionData.value = result;
};
onMounted(() => {
  initList();
});
</script>

<style scoped lang="less">
.list-title {
  background-color: rgba(255, 255, 255,0.6);
  font-weight: 700 !important;
  margin-bottom: 5px;
}
  .list-title, .list-item {
  border-radius: 12px;
  height: 22px;
  line-height: 22px;
  width: 100%;
  font-size: 12px;
  padding: 0 12px;
  font-weight: 400;
  span {
    display: inline-block;
  }
  .tag {
    width: 20%;
    text-align: left;
  }
  .tag-num {
    text-align: center;
    width: calc(80% / 6);
  }
}
.list-main {
  height: calc(100% - 27px);
  overflow-y: auto;
  .list-item {
    margin-bottom: 2px;
  }
  .list-item:nth-child(2n) {
    background-color: #5678FF0D;
  }
  .list-item:nth-child(2n+1) {
  background-color: #5678FF1A;
}
}
</style>