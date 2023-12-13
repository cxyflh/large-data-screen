<script setup>

</script>

<template>
 <div class="report-main">
   <div class="demo">样例数据</div>
 </div>
</template>

<style scoped lang="less">
.report-main {
  width: 100%;
  height: 1080px;
  background-size: 100% 100%;
  background-image: url("../assets/icon/report.png");
  position: relative;
}
@media screen and (width < 1920px) {
  .report-main {
    width: 1920px;
    height: 1080px;
    overflow: scroll;
  }
}
.demo {
  position: absolute;
  font-weight: bold;
  font-size: 50px;
  color: #cdcacae6;
  transform: rotate(-45deg);
  top: 40%;
  left: 38%;
  letter-spacing: 75px;
}
</style>