<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isExpand ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
    <div class="content">
      <headerCrumb />
      <headerInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import headerInfo from './c-cpns/header-info.vue'
import headerCrumb from './c-cpns/header-crumb.vue'
import { ref } from 'vue'
// 0.内部自定义事件
const emit = defineEmits(['ExpandChange'])
// 1.记录状态
const isExpand = ref(true)
function handleMenuIconClick() {
  // 1.内部改变状态
  isExpand.value = !isExpand.value
  // 2.将事件和状态传递给父组件
  emit('ExpandChange', isExpand.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
