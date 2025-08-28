interface IformItems {
  type: string
  label?: string
  prop?: string
  placeholder?: string
  initialValue?: string
  options?: { label: string; value: number }[]
  slotName?: string
}
interface Iheader {
  newTitle: string
  editTitle: string
}
export interface IModalConfig {
  pageName: string
  header: Iheader
  formItems: IformItems[]
}

export interface IModalProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: IformItems[]
  }
  otherInfo?: object
}
