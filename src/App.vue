<template>
  <div class="app">
    <h2>APP</h2>
    <router-link to="/login">登录</router-link>
    <router-link to="/main">主页面</router-link>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.app {
  height: 100vh;
  width: 100vw;
  background-color: skyblue;
}
</style>
