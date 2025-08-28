import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenustoPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'

// ---------------- 类型定义 ----------------
export interface ILoginResult {
  id: number
  token: string
}

export interface IUserInfo {
  id: number
  name: string
  role: {
    id: number
    name: string
  }
}

export interface IUserMenu {
  id: number
  name: string
  url: string
  children: IUserMenu[]
}

interface ILoginState {
  token: string
  userInfo: IUserInfo | null
  userMenus: IUserMenu[]
  permissions: string[]
}

// ---------------- Store ----------------
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录
      const loginResult = (await accountLoginRequest(account)) as {
        data: ILoginResult
      }
      const { id, token } = loginResult.data
      this.token = token
      localCache.setCache(LOGIN_TOKEN, token)

      // 2.获取用户信息(根据账号登录的id,而且token都已缓存)
      const userInfoResult = (await getUserInfoById(id)) as { data: IUserInfo }
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3.获取用户菜单(根据用户信息里面的id,而且token都已缓存)
      const userMenusResult = (await getUserMenusByRoleId(
        userInfo.role.id
      )) as { data: IUserMenu[] }
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 4.缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      //5.请求所有roles/department数据: 就是entireRoles/entireDepartments.
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 重要: 获取登录用户的所有按钮的权限
      const permissions = mapMenustoPermissions(userMenus)
      this.permissions = permissions

      // 重要: 动态的添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 6.跳转
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        //1.刷新时 请求所有roles/department数据: 就是entireRoles/entireDepartments.
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 2.获取按钮的权限
        const permissions = mapMenustoPermissions(userMenus)
        this.permissions = permissions

        // 3.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
