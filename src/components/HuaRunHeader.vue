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
      <a-button class="button" @click="router.push('/')" v-if="detailMonth">返回</a-button>
      <a-select v-if="detailMonth"
        v-model:value="params.monthValue"
        :options="monthOptions"
        placeholder="月份"
        class="button"
        @change="onChange"
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
    >
      <template #suffixIcon> <img src="../assets/icon/subtract.svg"/></template>
    </a-cascader>
      <!-- <a-dropdown>
      <template #overlay>
        <a-menu>
          <a-menu-item>1st menu item</a-menu-item>
          <a-menu-item>2nd menu item</a-menu-item>
          <a-sub-menu key="sub1" title="sub menu">
            <a-menu-item>3rd menu item</a-menu-item>
            <a-menu-item>4th menu item</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2" title="disabled sub menu" disabled>
            <a-menu-item>5d menu item</a-menu-item>
            <a-menu-item>6th menu item</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </template>
      <a-button class="button">
          全集团
          <img src="../assets/icon/subtract.svg"/>
      </a-button>
      </a-dropdown> -->
    </div>
  </div>
</template>

<script setup>
  import { ref, defineProps, toRefs, onMounted, defineEmits, computed } from 'vue'
  import logo from '@/components/icons/LogoSvg.vue'
  import { getBuList } from '../api/dashboard';
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
  const params = ref({
    monthValue: String(new Date().getMonth()+1),
    buValue: ['CR000'],
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
  const monthOptions = computed(() => {
    const list = props.monthEntityList.map(item => {
      let label = ''
      if (Number(item.month) < 10) {
        label = '0' + item.month + '月'
      } else {
        label = item.month + '月'
      }
      return {
        label,
        value: item.month,
        disabled: !item.check,
    }
    })
    //console.log(list)
    return list;
  });
  const buName = ref();
  const getBuListData = () => {
    getBuList({buCode: params.value.buValue[0]}).then(res => {
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
  const handleMonthCascader = () => {
    // if(detailMonth.value === true){
    //   if(monthEntityList.value !== null && monthEntityList.value.length > 0) {
    //     for(let i = 0; i < monthEntityList.value.length; i++) {
    //       monthOptions.value[i] = {
    //         label: `${monthEntityList.value[i].month}月`,
    //         value: monthEntityList.value[i].month,
    //         disabled: !monthEntityList.value[i].check
    //       }
    //     }
    //   }
    //   // else{
    //   //   for(let i = 0; i < 12; i++) {
    //   //     monthOptions.value[i] = {
    //   //       label: `${i+1}月`,
    //   //       value: i+1,
    //   //     }
    //   //   }
    //   // }
    // }
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
    handleMonthCascader();
    getBuListData();
    emit('getMonth',params.value.monthValue);
  })
</script>

<style scoped>
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
    background-color: #E5EDF7;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .buttonGroup {
    display: flex;
    gap: 20px;
  }
</style>