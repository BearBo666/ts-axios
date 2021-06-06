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
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

//Promise接口 继承自Promise
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

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
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

//Axios示例接口 继承自Axios
export interface AxiosInstance extends Axios {
  //重载
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
