//菜单
export interface IEntireMenus {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  createAt: string
  updateAt: string
  children: Array<{
    id: number
    url: string
    name: string
    sort: number
    type: number
    children?: Array<{
      id: number
      url: string
      name: string
      sort: string
      type: number
      createAt: string
      parentId: number
      updateAt: string
      permission: string
    }>
    createAt: string
    parentId: number
    updateAt: string
  }>
}
export interface IEntireMenusResponse {
  data: {
    list: IEntireMenus[]
  }
}

// 角色
export interface IRole {
  id: number
  name: string
  // 其它字段自己加
}
export interface IRoleListResponse {
  data: {
    list: IRole[]
  }
}

// 部门
export interface IDepartment {
  id: number
  name: string
  parentId?: number
  createAt: string
  updateAt: string
  leader: string
}
export interface IDepartmentListResponse {
  data: {
    list: IDepartment[]
    totalCount: number
  }
}

//用户
export interface IUser {
  id: number
  name: string
  realname: string
  cellphone: string
  enable: number
  roleId: number
  departmentId: number
  createAt: string
  updateAt: string
}
export interface IUserListResponse {
  data: {
    list: IUser[]
    totalCount: number
  }
}
