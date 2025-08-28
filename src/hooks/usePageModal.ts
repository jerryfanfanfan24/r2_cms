import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CallBackFnType = (data?: any) => void

function usePageModal(
  editCallback?: CallBackFnType,
  newCallback?: CallBackFnType
) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function newUserClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function editClick(itemData: any) {
    // 1.让modal显示出来
    modalRef.value?.setModalVisible(false, itemData)
    // 2.编辑的回调
    if (editCallback) editCallback(itemData)
  }

  return { modalRef, newUserClick, editClick }
}

export default usePageModal
