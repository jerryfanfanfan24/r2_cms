import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData,
  type IqueryInfo
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import type { IformData } from '@/views/main/system/user/c-cpns/user-modal.vue'
import type { IformData2 } from '@/views/main/system/department/c-cpns/page-modal.vue'
import useMainStore from '../main'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: IqueryInfo) {
      const usersListResult = await postUsersListData(queryInfo)
      const { list, totalCount } = usersListResult?.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除数据操作
      const deleteReuslt = await deleteUserById(id)
      console.log(deleteReuslt)
      //2.重新请求 用户数据=>为了让页面刷新
      this.postUsersListAction({ size: 10, offset: 0 })
    },
    async newUserDataAction(formData: IformData) {
      // 1.创建新的用户
      const newResult = await newUserData(formData)
      console.log(newResult)
      // 2.重新请求新的数据=>为了让页面刷新
      this.postUsersListAction({ size: 10, offset: 0 })
    },
    async editUserDataAction(id: number, formData: IformData) {
      //1.编辑新的用户
      const editResult = await editUserData(id, formData)
      console.log(editResult)
      // 2.重新请求新的数据=>为了让页面刷新
      this.postUsersListAction({ size: 10, offset: 0 })
    },

    /** 针对页面(目前是用在department部门页面,后面也会用在菜单管理和角色管理)的网络请求: 增删改查 */
    async postPageListAction(pageName: string, queryInfo: IqueryInfo) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListResult?.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      // 1.删除数据操作
      const deleteReuslt = await deletePageById(pageName, id)
      console.log(deleteReuslt)
      //2.重新请求 部门数据=>为了让页面刷新
      this.postPageListAction(pageName, { size: 10, offset: 0 })
      //获取完整的数据,给除了用户页面的其他三个页面 在增删改 这三种操作后去 更新最新的完整数据.
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, formData: IformData2) {
      // 1.创建新的部门
      const newResult = await newPageData(pageName, formData)
      console.log(newResult)
      // 2.重新请求新的数据=>为了让页面刷新
      this.postPageListAction(pageName, { size: 10, offset: 0 })
      //获取完整的数据,给除了用户页面的其他三个页面 在增删改 这三种操作后去 更新最新的完整数据.
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(
      pageName: string,
      id: number,
      formData: IformData2
    ) {
      //1.编辑任一部门
      const editResult = await editPageData(pageName, id, formData)
      console.log(editResult)
      // 2.重新请求新的数据=>为了让页面刷新
      this.postPageListAction(pageName, { size: 10, offset: 0 })
      //获取完整的数据,给除了用户页面的其他三个页面 在增删改 这三种操作后去 更新最新的完整数据.
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})
export default useSystemStore
