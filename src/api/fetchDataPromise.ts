import json from '../data/testData.json'

export interface RequisitionsDataType {
  id: string
  category: string
  name: string
  text: string
  required: string
  edit?: boolean
  isDelete?: boolean
}

export async function fetchDataPromise (): Promise<{
  data: RequisitionsDataType[]
}> {
  return await new Promise<{ data: RequisitionsDataType[] }>((resolve) =>
    setTimeout(() => { resolve({ data: json.requisition }) }, 500)
  )
}
