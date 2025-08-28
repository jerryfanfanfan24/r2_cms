<template>
  <div class="model">
    <el-dialog
      v-model="DialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <!-- 1.用户名 -->
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <!-- 2.真实姓名 -->
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="formData.realname"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
          <!-- 3.密码 -->
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <!-- 4.手机号码 -->
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="formData.cellphone"
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <!-- 5.选择角色 -->
          <el-form-item label="选择角色" prop="roleId">
            <el-select
              v-model="formData.roleId"
              placeholder="请选择角色"
              style="width: 100%"
            >
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <!-- 6.选择部门 -->
          <el-form-item label="选择部门" prop="departmentId">
            <el-select
              v-model="formData.departmentId"
              placeholder="请选择部门"
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

export interface IformData {
  name: string
  realname: string
  password: string
  cellphone: string
  roleId: string
  departmentId: string
}
// 1.定义内部的属性
const DialogVisible = ref(false)
const formData = reactive<IformData>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const isNewRef = ref(true)
const editData = ref()
// 2.获取roles/departments数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)
// 2.定义设置dialogVisible方法
function setModalVisible(isNew: boolean = true, itemData?: IformData) {
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
    systemStore.editUserDataAction(editData.value.id, formData)
  } else
    //创建新的用户
    systemStore.newUserDataAction(formData)
}
// 暴露的属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
