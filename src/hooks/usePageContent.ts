import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  function queryClick(searchForm: object) {
    contentRef.value?.fetchPageListData(searchForm)
  }
  function resetClick() {
    contentRef.value?.fetchPageListData()
  }

  return {
    contentRef,
    queryClick,
    resetClick
  }
}

export default usePageContent
