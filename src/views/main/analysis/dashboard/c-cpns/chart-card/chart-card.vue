<template>
  <div class="chart-card">
    <el-card :header="header">
      <slot>默认内容</slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  header?: string
}
withDefaults(defineProps<IProps>(), {
  header: 'echarts'
})
</script>

<style lang="less" scoped>
.chart-card {
  color: red;
}
</style>
