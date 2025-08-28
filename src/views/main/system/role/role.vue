<template>
  <div class="role">
    <page-search
      @resetClick="resetClick"
      @queryClick="queryClick"
      :searchConfig="searchConfig"
    ></page-search>
    <page-content
      :contentConfig="contentConfig"
      @editClick="editClick"
      @newUserClick="newUserClick"
      ref="contentRef"
    ></page-content>
    <page-modal
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      ref="modalRef"
    >
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import type { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-menus'

// setup相同的逻辑的抽取: hooks
//2.对content组价进行操作, page-search -> role -> page-content:查询操作/重置操作
const { contentRef, queryClick, resetClick } = usePageContent()
//3.1对modal组件进行操作,page-content => role => page-modal:新建操作
//3.2对modal组件进行操作,page-content => role => page-modal:编辑操作
const { modalRef, newUserClick, editClick } = usePageModal(
  editCallback,
  newCallback
)

//获取完整的菜单, 可以在创建角色的时候去勾选权限
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
//编辑角色 时 菜单权限的回显效果;并且 新建角色时 菜单权限要立马 为空.
const treeRef = ref<InstanceType<typeof ElTree>>()
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style lang="less" scoped></style>
