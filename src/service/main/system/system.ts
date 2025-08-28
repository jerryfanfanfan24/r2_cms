import hyRequest from '@/service'
import {
  type IDepartmentListResponse,
  type IUserListResponse
} from '@/service/type'
import type { IformData2 } from '@/views/main/system/department/c-cpns/page-modal.vue'

import type { IformData } from '@/views/main/system/user/c-cpns/user-modal.vue'
export interface IqueryInfo {
  offset: number
  size: number
}
/** 用户的网络请求 => 用户管理页面 */

export function postUsersListData(queryInfo: IqueryInfo) {
  return hyRequest.post<IUserListResponse>({
    url: '/users/list',
    data: queryInfo
  })
}
export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}
export function newUserData(formData: IformData) {
  return hyRequest.post({
    url: '/users',
    data: formData
  })
}
export function editUserData(id: number, formData: IformData) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: formData
  })
}
/** 针对页面(目前是用在department部门页面,后面也会用在菜单管理和角色管理)的网络请求: 增删改查 */
export function postPageListData(pageName: string, queryInfo: IqueryInfo) {
  return hyRequest.post<IDepartmentListResponse>({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageById(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, formData: IformData2) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: formData
  })
}
export function editPageData(
  pageName: string,
  id: number,
  formData: IformData2
) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: formData
  })
}
