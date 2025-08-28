import hyRequest from '..'
import type {
  IDepartmentListResponse,
  IEntireMenusResponse,
  IRoleListResponse
} from '../type'

export function getEntireRoles() {
  return hyRequest.post<IRoleListResponse>({
    url: 'role/list'
  })
}
export function getEntireDepartments() {
  return hyRequest.post<IDepartmentListResponse>({
    url: '/department/list'
  })
}
export function getEntireMenus() {
  return hyRequest.post<IEntireMenusResponse>({
    url: '/menu/list'
  })
}
