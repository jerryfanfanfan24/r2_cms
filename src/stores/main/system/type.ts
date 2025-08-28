import type { IDepartment, IUser } from '@/service/type'

export interface ISystemState {
  usersList: IUser[]
  usersTotalCount: number
  pageList: IDepartment[]
  pageTotalCount: number
}
