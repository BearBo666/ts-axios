import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'

import { parseHeaders } from './index'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    //解构配置
    const { data = null, url, method = 'get', headers, responseType } = config

    //生成ajax对象
    const request = new XMLHttpRequest()

    //是否设置响应类型
    if (responseType) {
      request.responseType = responseType
    }

    //发送
    request.open(method.toUpperCase(), url, true)

    //监听状态变化
    request.onreadystatechange = function handleLoad() {
      //状态为4表示成功
      if (request.readyState !== 4) {
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

      resolve(response)
    }

    //设置请求头
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
