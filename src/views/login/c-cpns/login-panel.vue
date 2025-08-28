<template>
  <div class="login-panel">
    <!-- 1.顶部的标题 -->
    <h1 class="title">JF后台管理系统</h1>
    <!-- 2.中间的tabs切换 -->
    <div class="tabs">
      <el-tabs v-model="activeName" type="border-card" stretch>
        <!-- 2.1账号登录的Pane -->
        <el-tab-pane name="first">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <panel-first ref="firstPanelRef" />
        </el-tab-pane>

        <!-- 2.2密码登录的Pane -->
        <el-tab-pane name="second">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <panel-second />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 3.底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <!-- 4.立即登录按钮-->
    <el-button
      type="primary"
      size="large"
      class="login-btn"
      @click="handleLoginBtnClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import panelFirst from './panel-first.vue'
import panelSecond from './panel-second.vue'
import { localCache } from '@/utils/cache'

const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newVal) => {
  // 监听记住密码的状态变化
  localCache.setCache('isRemPwd', newVal)
})
const activeName = ref('first')
const firstPanelRef = ref<InstanceType<typeof panelFirst>>()
function handleLoginBtnClick() {
  // 登录按钮的点击事件
  // 在点击立即登录按钮时 记录目前到底tabs选中的的是 账号登录还是手机登录.(默认是账号登录)
  //后续还会有逻辑改进,目前先写成console打印提示.->打印组件<panel-first />里面的账号和密码(first.username和first.password)
  if (activeName.value === 'first') {
    firstPanelRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
