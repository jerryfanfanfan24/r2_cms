<template>
  <div class="search" v-if="isQuery">
    <!-- 1.输入搜索关键字的表单 -->
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <!-- 表单第一行 放三个,平均分布 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="name" label="用户名">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入查询的用户名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="realname" label="真实姓名">
            <el-input
              v-model="searchForm.realname"
              placeholder="请输入查询的真实姓名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="cellphone" label="手机号码">
            <el-input
              v-model="searchForm.cellphone"
              placeholder="请输入查询的手机号码"
            />
          </el-form-item>
        </el-col>
        <!-- 表单第二行(自动) 放二个,第三个因为没有,空着 -->
        <el-col :span="8">
          <el-form-item prop="enable" label="状态">
            <el-select
              v-model="searchForm.enable"
              placeholder="请选择查询的状态"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="createAt" label="创建时间">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 2.重置和查询按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" icon="Search" @click="handleQueryClick">
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import usePermissions from '@/hooks/usePermissions'
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const isQuery = usePermissions('users:query')

// 定义自定义事件 查询和重置按钮的操作都会触发.
const emit = defineEmits(['queryClick', 'resetClick'])
// 定义form的数据
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: ''
})
//重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  // 1.form中的数据全部重置
  formRef.value?.resetFields()
  // 2.将重置事件发送出去, content内部重新发送网络请求
  emit('resetClick')
}
//查询的具体操作后面再细写
//查询操作, 会触发定义的queryClick事件,并且带参数searchForm(整个search表单的数据)
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
