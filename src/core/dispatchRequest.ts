import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL, combineURL, isAbsoluteURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

//发送请求
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  //如果取消了请求则抛出错误
  throwIfCancellationRequested(config)
  //处理config
  processConfig(config)
  //返回xhr函数的promise
  return xhr(config).then(res => {
    //处理响应对象
    return transformResponseData(res)
  })
}

//处理config
function processConfig(config: AxiosRequestConfig): void {
  //转换url,data,headers
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  //扁平化请求头
  config.headers = flattenHeaders(config.headers, config.method!)
}

//转换url
export function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
}

//格式化headers，变成对象形式
export function parseHeaders(headers: string): any {
  //空对象
  let parsed = Object.create(null)

  //若没有请求头
  if (!headers) {
    return parsed
  }
  //请求头之间以\r\n隔开
  headers.split('\r\n').forEach(line => {
    //拿到k-v对
    let [key, val] = line.split(':')
    //key变小写
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}

//转换响应对象
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

//如果取消了请求则抛出错误
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
