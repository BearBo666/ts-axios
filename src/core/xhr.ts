import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from './dispatchRequest'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    //解构配置
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    //生成ajax对象
    const request = new XMLHttpRequest()

    //是否设置响应类型
    if (responseType) {
      request.responseType = responseType
    }

    //响应超时配置
    if (timeout) {
      request.timeout = timeout
    }

    //配置请求
    request.open(method.toUpperCase(), url!, true)

    //监听状态变化
    request.onreadystatechange = function handleLoad() {
      //状态为4表示成功
      if (request.readyState !== 4) {
        return
      }

      //网络错误,超时,都为0
      if (request.status === 0) {
        return
      }

      //获取响应头
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      //获取响应数据
      const responseData = responseType === 'text' ? request.responseText : request.response

      //构造响应对象·
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      }

      handleResponse(response)
    }

    //监听网络错误
    request.onerror = function handleError() {
      reject(createError('网络错误', config, null, request))
    }

    //监听超时
    request.ontimeout = function handleTimeout() {
      reject(createError(`超时 ${timeout}ms`, config, 'ECONNABORTED', request))
    }

    //设置请求头
    Object.keys(headers).forEach(name => {
      //如果没有data 并且 有content-type请求头则删除
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        //否则设置请求头
        request.setRequestHeader(name, headers[name])
      }
    })

    //发送请求
    request.send(data)

    //处理响应
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`请求出错,状态码:${response.status}`, config, null, request, response))
      }
    }
  })
}
