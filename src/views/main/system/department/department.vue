<template>
  <div class="department">
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
    <page-modal :modalConfig="modalConfigRef" ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import { computed } from 'vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useMainStore from '@/stores/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

//1.对modalConfig进行操作,compute计算属性可以动态展示数据,map映射拿到自己想要的label,value.
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return modalConfig
})

// setup相同的逻辑的抽取: hooks
//2.对content组价进行操作, page-search -> department:page -> page-content:查询操作/重置操作
const { contentRef, queryClick, resetClick } = usePageContent()
//3.1对modal组件进行操作,page-content => department => page-modal:新建操作
//3.2对modal组件进行操作,page-content => department => page-modal:编辑操作
const { modalRef, newUserClick, editClick } = usePageModal()
</script>

<style scoped></style>
