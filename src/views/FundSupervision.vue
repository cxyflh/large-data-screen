<template>
  <div class="picturePosition">
    <picture1 class="icon" />
    <picture2 class="icon" />
    <picture3 class="icon" />
  </div>
</template>

<script setup>
  import picture1 from '@/components/icons/FundSupervision/PictureOne.vue'
  import picture2 from '@/components/icons/FundSupervision/PictureTwo.vue'
  import picture3 from '@/components/icons/FundSupervision/PictureThree.vue'
</script>

<style lang="less" scoped>
.picturePosition {
  .icon {
    margin-bottom: 16px;
  }
}
</style>
