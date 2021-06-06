import { isPlainObject } from './util'

//处理大小写
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  //遍历headers的key
  Object.keys(headers).forEach(name => {
    //如果变大小写与普通名称相等,则统一一下
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

//处理请求头
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  //如果是对象,则设置请求头为json
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=urtf-8'
    }
  }
  return headers
}
