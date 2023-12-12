<script setup>
import { defineProps, toRefs } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
})

const { title } = toRefs(props);
</script>

<template>
    <div class="card-title">
        <span class="circle-outter">
            <span class="circle-inner"></span>
        </span>
        <span>{{ title }}</span>
    </div>
</template>

<style lang="less" scoped>
.card-title {
    width: 100%;
    color: #1B2A52;
    font-size: 20px;
    //font-weight: 900;
    font-family: DIN Black;
}
.circle-outter {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #F99C3480;
    display: inline-block;
    margin-right: 6px;
}
.circle-inner {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #F99C3480;
    display: inline-block;
    margin-left: 4px;
    transform: translateY(-2px);
}
</style>