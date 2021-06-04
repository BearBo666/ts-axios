//请求方法枚举类
export type Method =
  | 'get'
  | 'Get'
  | 'POST'
  | 'post'
  | 'head'
  | 'HEAD'
  | 'DELETE'
  | 'delete'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

//请求配置接口
export interface AxiosRequestConfig {
  url?: string
  data?: any
  params?: any
  headers?: any
  method?: Method
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

//服务端响应接口
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

//Promise接口 继承自Promise
export interface AxiosPromise extends Promise<AxiosResponse> {}

//Error接口 继承自Error
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

//Axios接口
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

//Axios示例接口 继承自Axios
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
}
