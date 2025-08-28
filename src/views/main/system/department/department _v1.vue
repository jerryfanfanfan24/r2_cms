<template>
  <div class="department">
    <page-search
      @resetClick="resetClick"
      @queryClick="queryClick"
    ></page-search>
    <page-content
      @editClick="editClick"
      @newUserClick="newUserClick"
      ref="contentRef"
    ></page-content>
    <page-modal ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from './c-cpns/page-search.vue'
import pageContent from './c-cpns/page-content.vue'
import pageModal, { type IformData2 } from './c-cpns/page-modal.vue'
import { ref } from 'vue'

//对content组价进行操作, page-search -> department:page -> page-content:查询操作/重置操作
const contentRef = ref<InstanceType<typeof pageContent>>()
function queryClick(searchForm: object) {
  contentRef.value?.fetchPageListData(searchForm)
}
function resetClick() {
  contentRef.value?.fetchPageListData()
}
//对modal组件进行操作,page-content => department => page-modal:新建操作
const modalRef = ref<InstanceType<typeof pageModal>>()
function newUserClick() {
  modalRef.value?.setModalVisible()
}
//对modal组件进行操作,page-content => department => page-modal:编辑操作
function editClick(itemData: IformData2) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped></style>
