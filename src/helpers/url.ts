import { isDate, isPlainObject, isURLSearchParams } from './util'

//url相关的辅助函数

interface URLOrigin {
  protocol: string
  host: string
}

//编码并转义特殊字符
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

//加入查询字符串
export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  if (!params) {
    return url
  }

  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []

    //遍历params的每个key
    Object.keys(params).forEach(key => {
      //获得这个值
      const val = params[key]
      //空值忽略
      if (val == null || typeof val === 'undefined') {
        return
      }

      let values = []
      //如果值是数组
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        //不是则压入数组方便统一处理
        values = [val]
      }
      //遍历数组
      values.forEach(val => {
        //如果是时间类型
        if (isDate(val)) {
          val = val.toISOString()
          //如果是对象类型
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val)
        }
        //压入数组
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })

    serializedParams = parts.join('&')
  }

  //如果序列化后的字符串非空
  if (serializedParams) {
    //判断url中是否右哈希
    const marIndex = url.indexOf('#')
    //有则裁掉
    if (marIndex != -1) {
      url = url.slice(0, marIndex)
    }

    //判断url中是否有?
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

//判断url是否是绝对地址
export function isAbsoluteURL(url: string): boolean {
  return /(^[a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

//base和相对地址的拼接
export function combineURL(baseURL: string, relativeURL?: string): string {
  //去掉base末尾的多个/和relativeURL的开头多个/
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}

export function isURLSameOrigin(requestUrl: string): boolean {
  const parseOrigin = resolveURL(requestUrl)

  return parseOrigin.protocol === currentOrigin.protocol && parseOrigin.host === currentOrigin.host
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)

  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}
