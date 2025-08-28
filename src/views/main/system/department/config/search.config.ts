// 定义表单项类型
export interface IFormItem {
  label: string
  prop: string
  placeholder?: string // 如果有占位符可以是可选的
  type: string // 可以根据具体需要，定义不同的类型，如 'input', 'date-picker' 等
  initialValue?: string
  options?: { label: string; value: number }[]
}

// 定义整个配置对象的类型
export interface ISearchConfig {
  pageName: string
  formItems: IFormItem[]
}

const searchConfig: ISearchConfig = {
  pageName: 'department',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入查询的部门名称',
      initialValue: 'aaaa'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入查询的领导名称'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}
export default searchConfig
