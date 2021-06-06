//Axios核心实现
import Axios from './core/Axios'
//Axios实例接口
import { AxiosInstance } from './types'
//工具类,将对象的键值拷贝
import { extend } from './helpers/util'

//创建实例
function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  //拷贝原型上的方法
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
