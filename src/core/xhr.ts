import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from './dispatchRequest'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/util'
import cookie from '../helpers/cookie'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    //解构配置,默认为get方法
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    //生成ajax对象
    const request = new XMLHttpRequest()

    //配置请求 !表断言
    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    request.send(data)

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      //如果withCredentials或者同源
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      if (auth) {
        headers['Authorizetion'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
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
    }

    function configureRequest(): void {
      //是否设置响应类型
      if (responseType) {
        request.responseType = responseType
      }

      //响应超时配置
      if (timeout) {
        request.timeout = timeout
      }

      //是否携带跨域cookie
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }

      //监听网络错误
      request.onerror = function handleError() {
        reject(createError('网络错误', config, null, request))
      }

      //监听超时
      request.ontimeout = function handleTimeout() {
        reject(createError(`超时 ${timeout}ms`, config, 'ECONNABORTED', request))
      }

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
        //处理响应
        handleResponse(response)
      }
    }

    //处理响应
    function handleResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response)
      } else {
        reject(createError(`请求出错,状态码:${response.status}`, config, null, request, response))
      }
    }
  })
}
