<template>
  <div class="second-panel">
    <el-form
      :model="second"
      :rules="rules"
      size="large"
      label-width="80px"
      status-icon
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="second.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="verify-code">
          <el-input v-model="second.code" />
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { FormRules } from 'element-plus'

const second = reactive({
  phone: '',
  code: ''
})

const rules: FormRules = {
  phone: [
    { required: true, message: '必须输入手机号~', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确~', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '必须输入验证码~', trigger: 'blur' },
    { len: 6, message: '验证码必须是6位数字~', trigger: 'blur' }
  ]
}
</script>

<style lang="less" scoped>
.verify-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>
