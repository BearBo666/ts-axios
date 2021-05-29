export type Method =
  | 'get'
  | 'Get'
  | 'POST'
  | 'post'
  | 'DELETE'
  | 'delete'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

//请求配置类
export interface AxiosRequestConfig {
  url: string
  data?: any
  params?: any
  headers?: any
  method?: Method
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse {
  //服务端返回
  data: any
  //http状态码
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}
