<template>
  <div class="model">
    <el-dialog
      v-model="DialogVisible"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <!-- 1.部门名称 -->
          <!-- 2.部门名称 -->
          <!-- 3.选择部门 -->
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :prop="item.prop" :label="item.label">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop!]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop!]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop!]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>

              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
import useSystemStore from '@/stores/main/system/system'
import { reactive, ref } from 'vue'
import type { IModalProps } from './type'

const props = defineProps<IModalProps>()

export interface IformData2 {
  name: string
  leader: string
  parentId: number
}

// 1.定义内部的属性
const DialogVisible = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop!] = ''
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formData = reactive<any>(initialData)
const isNewRef = ref(true)
const editData = ref()
// 2.获取departments数据,其实已经在department.vue里面映射了想要的options数据,可以注释mainStore
const systemStore = useSystemStore()
// 2.定义设置dialogVisible方法
function setModalVisible(isNew: boolean = true, itemData?: IformData2) {
  //先将modal组件(对话框组件)显示出来
  DialogVisible.value = true
  isNewRef.value = isNew
  // edit操作的isNew值为false,并且传参了;对应的new操作的isNew值默认就是true.
  if (!isNew && itemData) {
    //编辑用户的数据
    for (const key in formData) {
      const typedKey = key as keyof IformData2
      formData[typedKey] = itemData[typedKey]
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
  // 先关闭组件,创建新的用户,记得要给newUserDataAction传入参数 formData
  DialogVisible.value = false
  //分两种情况,otherInfo是否有值.
  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  // 下面判断editData是否有值 => 来选择调用 编辑 还是 新建
  if (!isNewRef.value && editData.value) {
    //编辑用户的数据,isNewRef的值是true/fasle对应是 新建/编辑  => 编辑,编辑的值有值(才能用里面的id确定是哪一条).
    systemStore.editPageDataAction(
      props.modalConfig.pageName,
      editData.value.id,
      infoData
    )
  }
  //创建新的用户
  else {
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
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
