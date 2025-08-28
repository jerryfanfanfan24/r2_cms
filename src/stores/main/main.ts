import {
  getEntireDepartments,
  getEntireMenus,
  getEntireRoles
} from '@/service/main/main'
import type { IDepartment, IEntireMenus, IRole } from '@/service/type'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: IRole[]
  entireDepartments: IDepartment[]
  entireMenus: IEntireMenus[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const departmentsResult = await getEntireDepartments()
      const entireMenusResult = await getEntireMenus()

      // 保存数据
      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentsResult.data.list
      this.entireMenus = entireMenusResult.data.list
    }
  }
})

export default useMainStore
