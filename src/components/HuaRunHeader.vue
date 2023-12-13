<template>
  <div class="header">
    <logo />
    <span v-if="detailMonth">{{ params.monthValue }}月 | {{ buName }} {{ title }}</span>
    <span v-else>{{ buName }}{{ title }}</span>
    <!-- 10月 | 华润集团 采购监管月报 -->
    <div class="buttonGroup">
      <!-- <a-dropdown v-if="detailMonth">
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="count in 12" :key="count">{{ count }}月</a-menu-item>
        </a-menu>
      </template>
      <a-button class="button">
          月份
          <img src="../assets/icon/subtract.svg"/>
      </a-button>
      </a-dropdown> -->
      <a-button class="button" @click="toPlatform" v-if="detailMonth && buttonShow">校验平台</a-button>
      <a-button class="button" @click="back" v-if="detailMonth">返回</a-button>
      <a-select v-if="detailMonth"
        v-model:value="params.monthValue"
        :options="monthOptions"
        placeholder="月份"
        class="button"
        @change="onChange"
        :allowClear="false"
    >
      <template #suffixIcon> <img src="../assets/icon/subtract.svg"/></template>
    </a-select>
    <a-cascader v-if="buShow"
        v-model:value="params.buValue"
        :options="buOptions"
        :fieldNames="buFieldNames"
        placeholder="全集团"
        class="button"
        @change="onChange"
        :allowClear="false"
        :disabled="true"
    >
      <template #suffixIcon> <img src="../assets/icon/subtract.svg"/></template>
    </a-cascader>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineProps, toRefs, onMounted, defineEmits, computed } from 'vue'
  import logo from '@/components/icons/LogoSvg.vue'
  import { getBuList, getmonthList } from '../api/dashboard';
  import router, { routes } from '../router';

  const props = defineProps({
    title: {
      type: String,
      default: '华润集团国资监管画像'
    },
    detailMonth: {
      type: Boolean,
      default: false,
    },
    monthEntityList: {
      type: Array,
      default: [],
    }
  })
  const emit = defineEmits(['getData','getMonth','getBuCode']);
  const { title,detailMonth,monthEntityList } = toRefs(props);
  let query = router.currentRoute.value.query;
  const params = ref({
    monthValue: String(new Date().getMonth()+1),
    buValue: ['CR000'],
    ldap: query.ldap
  })
  // const monthValue = ref();
  // const buValue = ref();
  const renderKey = ref()
  const buShow = ref(false);
  const buFieldNames = {
    label: 'buName',
    value: 'buCode',
  }
  const buOptions = ref([]);
  const buName = ref();
  const getBuListData = () => {
    getBuList({buCode: params.value.buValue[0], ldap: query.ldap}).then(res => {
      if(res.code === 200){
        if(res.data == null){
          buShow.value = false;
        }else {
          buShow.value = true;
          buOptions.value = res.data;
          handleBuName();
        }
        // console.log(res);
      }
    })
  }
  const handleBuName = () => {
    for(let item of buOptions.value.values()){
      if(item.buCode === params.value.buValue[0]){
        buName.value = item.buName;
        return;
      }
    }
  }
  const monthOptions = ref([]);
  const handleMonth = () => {
    const $router = router.currentRoute.value
    if ($router.path === '/supervision-report' || $router.path === '/SZYD') {
      let params = {
        buCode: $router.query.buCode,
        type: $router.path === '/supervision-report' ? 1 : 2,
      }
      getmonthList(params).then(res => {
        if (res.code === 200) {
          monthOptions.value = res.data.map(item => {
            let label = item.month + '月'
            return {
              label,
              value: item.month,
              disabled: !item.check,
            }
          })
        }
      })
    }
  }

  const buttonShow = computed(() => {
    return router.currentRoute.value.path === '/supervision-report'
  })

  const toPlatform = () => {
    window.location.href = 'https://crasys.crdigital.com.cn/#/home?fromBigScree=Y'
  }
  const back = () => {
    router.push({
      path: '/',
      query: {
        ...router.currentRoute.value.query
      }
    })
  }
  
  const onChange = () => {
    //console.log(router,routes)
    // routes
    handleBuName()
    emit('getMonth',params.value.monthValue)
    emit('getBuCode',params.value.buValue[0])
    emit('getData',{
      month: params.value.monthValue,
      buCode: params.value.buValue[0] || 'CR000'
    });
  }
  onMounted(() => {
    handleMonth();
    getBuListData();
    emit('getMonth',params.value.monthValue);
  })
</script>

<style scoped lang="less">
  .header {
    width:100%;
    height:80px;
    padding: 10px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  span {
    font-family: Source Han Sans CN;
    font-weight: 900;
    font-size: 45px;
    color: #1B2A52;
    line-height: 67.5px;
    letter-spacing: 9px;
  }
  .button {
    width: 112px;
    height: 45px;
    border: 2px solid;
    border-radius: 10px;
    border-color: #fff;
    background-color: #FFF;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .buttonGroup {
    display: flex;
    gap: 20px;
  }
  :deep(.ant-select-selector) {
    height: 45px !important;
    border: none !important;
  }
  :deep(.ant-select-selection-item) {
    line-height: 45px !important;
  }
  :deep(:where(.css-dev-only-do-not-override-1qb1s0s).ant-btn-default:not(:disabled)) {
    border: none !important;
  }
</style>