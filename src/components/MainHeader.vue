<template>
  <div class="row-flex header">
    <div class="div-border content1">
      <div class="p-all-20">
        <span class="title-css basic-title">{{ title }}</span>
        <span class="content-css basic-content">{{ content }}</span>
      </div>
    </div>
    <div class="div-border content2">
      <div class="info-bg">
        <div class="info-content">
          <span class="title-css">集团部室</span>
          <span class="content-css basic-content" style="padding-top: 20px">对应部室</span>
        </div>
        <a-divider type="vertical" class="divider"/>
        <div class="info-content">
          <span class="title-css">国资委厅</span>
          <span class="content-css basic-content" style="padding-top: 20px">对应厅局</span>
        </div>
        <a-divider type="vertical" class="divider"/>
        <div class="info-content">
          <span class="title-css">{{ frequency }}</span>
          <span class="content-css basic-content" style="padding-top: 20px">上报频率</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineProps, toRefs } from 'vue'

  // const informationList = ref([
  //   {
  //     title: '国资'
  //   }
  // ])
  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    frequency: {
      type: String,
      default: '',
    }
  })
  const { title, content,frequency } = toRefs(props);
</script>

<style scoped lang="less">
  .header {
    width: 100%;
    height: 126px;
    .content1 {
      /* width: 1215px; */
      width: 63%;
      height: 100%;
      flex: 2;
    }
    .content2 {
      width: 31%;
      flex: 1;
      height: 100%;
    }
  }

  .basic-title {
    display: block;
    height: 30px;
    line-height: 30px;
    font-weight: normal !important;
  }

  .basic-content {
    display: block;
    padding-top: 10px;
    height: 21px;
    line-height: 21px;
  }
  
  .info-bg {
    display: flex;
    align-items: center;
    padding: 30px 20px;
    .info-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-grow: 0.3;
    }
    .divider {
      height: 40px;
      background-color: #BFD8FC;
    }
  }


</style>