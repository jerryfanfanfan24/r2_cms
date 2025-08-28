export interface IpropsList {
  type?: string
  label: string
  width?: string
  prop?: string
  slotName?: string
}
interface Iheader {
  title: string
  btnTitle: string
}
interface IcontentConfig {
  pageName: string
  header: Iheader
  propsList: IpropsList[]
}

const contentConfig: IcontentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  propsList: [
    // 1.selection 2.index
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '部门名称', prop: 'name', width: '150px' },
    { type: 'normal', label: '部门领导', prop: 'leader', width: '150px' },
    { type: 'normal', label: '上级部门', prop: 'parentId', width: '150px' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '150px' }
  ]
}
export default contentConfig
