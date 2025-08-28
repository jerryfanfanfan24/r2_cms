<template>
  <div class="user">
    <user-search
      @queryClick="queryClick"
      @resetClick="resetClick"
    ></user-search>
    <user-content
      ref="contentRef"
      @newUserClick="newUserClick"
      @editClick="editClick"
    ></user-content>
    <user-modal ref="modalRef"></user-modal>
  </div>
</template>

<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal, { type IformData } from './c-cpns/user-modal.vue'
import { ref } from 'vue'

//对content组价进行操作, use-search -> user -> user-content:查询操作/重置操作
const contentRef = ref<InstanceType<typeof userContent>>()
function queryClick(searchForm: object) {
  contentRef.value?.fetchUserListData(searchForm)
}
function resetClick() {
  contentRef.value?.fetchUserListData()
}
//对modal组件进行操作,user-content => user =>user-modal:新建操作
const modalRef = ref<InstanceType<typeof userModal>>()
function newUserClick() {
  modalRef.value?.setModalVisible()
}
//对modal组件进行操作,user-content => user =>user-modal:编辑操作
function editClick(itemData: IformData) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
