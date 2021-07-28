//Axios核心实现
import Axios from './core/Axios'
//Axios实例接口
import { AxiosRequestConfig, AxiosStatic } from './types'
//工具类,将对象的键值拷贝
import { extend } from './helpers/util'
//默认配置
import defaluts from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

//创建实例(工厂函数)
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)

  const instance = Axios.prototype.request.bind(context)

  //拷贝原型上的方法
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaluts)

axios.create = function(config) {
  return createInstance(mergeConfig(defaluts, config))
}

//扩展取消方法
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

axios.all = function all(promises) {
  return Promise.all(promises)
}

axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios

export default axios
