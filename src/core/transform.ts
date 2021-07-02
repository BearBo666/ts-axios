import { AxiosTransformer } from '../types'

export default function transfrom(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  //执行转换函数
  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
