import { isPlainObject } from './util'

//转换data为字符串
export function transformRequest(data: any): any {
  //是普通对象则序列化
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  //否则直接返回
  return data
}

//转换响应数据
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      //do something...
    }
  }
  return data
}
