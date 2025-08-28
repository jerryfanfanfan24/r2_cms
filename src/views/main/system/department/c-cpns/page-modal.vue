<template>
  <div class="model">
    <el-dialog
      v-model="DialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <!-- 1.部门名称 -->
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <!-- 2.部门名称 -->
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <!-- 3.选择部门 -->
          <el-form-item label="选择部门" prop="parentId">
            <el-select
              v-model="formData.parentId"
              placeholder="请选择上级部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="DialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/stores/main/main'
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

export interface IformData2 {
  name: string
  leader: string
  parentId: string
}
// 1.定义内部的属性
const DialogVisible = ref(false)
const formData = reactive<IformData2>({
  name: '',
  leader: '',
  parentId: ''
})
const isNewRef = ref(true)
const editData = ref()
// 2.获取roles/departments数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)
// 2.定义设置dialogVisible方法
function setModalVisible(isNew: boolean = true, itemData?: IformData2) {
  //先将modal组件(对话框组件)显示出来
  DialogVisible.value = true
  isNewRef.value = isNew
  // edit操作的isNew值为false,并且传参了;对应的new操作的isNew值默认就是true.
  if (!isNew && itemData) {
    //编辑用户的数据
    for (const key in formData) {
      formData[key as keyof typeof formData] =
        itemData[key as keyof typeof formData]
    }
    editData.value = itemData
  } else {
    //新建用户的数据
    for (const key in formData) {
      formData[key as keyof typeof formData] = ''
    }
    editData.value = null
  }
}
//3.点击了确定的逻辑
function handleConfirmClick() {
  DialogVisible.value = false
  // 先关闭组件,创建新的用户,记得要给newUserDataAction传入参数 formData
  // 下面判断editData是否有值 => 来选择调用 编辑 还是 新建
  if (!isNewRef.value && editData.value) {
    //编辑用户的数据,isNewRef的值是true/fasle对应是 新建/编辑  => 编辑还是编辑的值有值(才能用里面的id确定是哪一条).
    systemStore.editPageDataAction('department', editData.value.id, formData)
  }
  //创建新的用户
  else {
    systemStore.newPageDataAction('department', formData)
  }
}
// 暴露的属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
