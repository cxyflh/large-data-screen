<script setup>
import { onMounted, toRefs, defineProps, reactive} from "vue";

const props = defineProps({
  reportData: {
    type: Object,
    default: () => ({}),
  },
  month: {
    type: String,
    default: '01',
  },
});
const { month } = toRefs(props);

onMounted(() => {
  initData()
});

const reportInfo = reactive({
  monthRecruit: '',
  monthContract: '',
  monthHonourAgreement: '',
  yearRecruit: '',
  yearContract: '',
  yearHonourAgreement: ''
})
const initData = () => {
  Object.keys(props.reportData).forEach(key => {
    if (props.reportData[key] !== undefined) {
      reportInfo[key] = Math.round(props.reportData[key] / 10000) + '万'
    }

  })
}
</script>

<template>
    <div class="main-card grid-main-card ">
        <div class="card-title">
            <card-title title="履约情况"></card-title>
        </div>
        <div class="main-content">
            <div class="main-item">
                <div class="title">{{ month + '月' }}</div>
                <div class="item">
                    <div class="num">{{ reportInfo.monthRecruit || '--' }}</div>
                    <div class="num-tips">招采</div>
                </div>
                <div class="item">
                    <div class="num">{{ reportInfo.monthContract || '--' }}</div>
                    <div class="num-tips">合同</div>
                </div>
                <div class="item">
                    <div class="num">{{ reportInfo.monthHonourAgreement || '--' }}</div>
                    <div class="num-tips">履约</div>
                </div>
            </div>
            <div class="main-item">
                <div class="title">{{ '全年累计' }}</div>
                <div class="item">
                    <div class="num">{{ reportInfo.yearRecruit || '--' }}</div>
                    <div class="num-tips">招采</div>
                </div>
                <div class="item">
                    <div class="num">{{ reportInfo.yearContract || '--' }}</div>
                    <div class="num-tips">合同</div>
                </div>
                <div class="item">
                    <div class="num">{{ reportInfo.yearHonourAgreement || '--' }}</div>
                    <div class="num-tips">履约</div>
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
    display: flex;
}
.main-item {
    width: 50%;
    .title {
        width: 125px;
        height: 40px;
        line-height: 40px;
        font-weight: 700;
        text-align: center;
        background-color: var(--default-background-color);
        font-size: 16px;
        font-family: Source Han Sans CN;
        border-radius: 20px;
        margin: 0 auto;
        margin-top: 20px;
    }
}
.item {
    color: #1B2A52;
    height: 52px;
    text-align: center;
    margin: 25px 10px 10px;
    .num {
        font-size: 20px;
        font-family: DIN Black;
    }
    .num-tips {
        font-family: Source Han Sans CN;
        margin-top: 2px;
        font-size: 14px;
    }
}
</style>