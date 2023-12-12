<template>
  <div class="wh-100" style="padding: 10px 30px;">
    <div class="list-title list-item">
      <span v-for="(item,index) in listTitle" :class="index === 0?'tag':'tag-num'" :key="index">{{ item }}</span>
    </div>
    <div class="list-main">
      <div class="list-item" v-for="(item, index) in decisionList" :key="index">
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
import { ref, onMounted, toRefs } from 'vue'

const props = defineProps({
  decisionList: {
    type: Array,
    default: [],
  }
})

const {decisionList} = toRefs(props)
const listTitle = ref(['企业名称','决策制度','事项清单','决策会议','决策议题','组织实施','决策异常']);
// const decisionList = ref([
//   {
//     companyName: '',
//     decisionSystem: 0,
//     item: 0,
//     decisionMeeting: 0,
//     decisionSubject: 0,
//     implement: 0,
//     decisionException: 0
//   }
// ]);
const resData = [
  {
    companyName: 'HUARUN',
    decisionSystem: 10,
    item: 20,
    decisionMeeting: 30,
    decisionSubject: 40,
    implement: 50,
    decisionException: 60,
  },
  {
    companyName: 'HUARUN',
    decisionSystem: 10,
    item: 20,
    decisionMeeting: 30,
    decisionSubject: 40,
    implement: 50,
    decisionException: 60,
  },
  {
    companyName: 'HUARUN',
    decisionSystem: 10,
    item: 20,
    decisionMeeting: 30,
    decisionSubject: 40,
    implement: 50,
    decisionException: 60,
  },
  {
    companyName: 'HUARUN',
    decisionSystem: 10,
    item: 20,
    decisionMeeting: 30,
    decisionSubject: 40,
    implement: 50,
    decisionException: 60,
  },
  {
    companyName: 'HUARUN',
    decisionSystem: 10,
    item: 20,
    decisionMeeting: 30,
    decisionSubject: 40,
    implement: 50,
    decisionException: 60,
  },
  {
    companyName: 'HUARUN',
    decisionSystem: 10,
    item: 20,
    decisionMeeting: 30,
    decisionSubject: 40,
    implement: 50,
    decisionException: 60,
  },
  {
    companyName: 'HUARUN',
    decisionSystem: 10,
    item: 20,
    decisionMeeting: 30,
    decisionSubject: 40,
    implement: 50,
    decisionException: 60,
  },
  {
    companyName: 'HUARUN',
    decisionSystem: 10,
    item: 20,
    decisionMeeting: 30,
    decisionSubject: 40,
    implement: 50,
    decisionException: 60,
  },
  {
    companyName: 'HUARUN',
    decisionSystem: 10,
    item: 20,
    decisionMeeting: 30,
    decisionSubject: 40,
    implement: 50,
    decisionException: 60,
  },
  {
    companyName: 'HUARUN',
    decisionSystem: 10,
    item: 20,
    decisionMeeting: 30,
    decisionSubject: 40,
    implement: 50,
    decisionException: 60,
  },
];
const initList = () => {
  decisionList.value = resData;
};
onMounted(() => {
  //initList();
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
    text-align: right;
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