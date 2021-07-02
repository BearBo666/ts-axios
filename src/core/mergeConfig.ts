import { isPlainObject, deepMerge } from '../helpers/util'
import { AxiosRequestConfig } from '../types'

//合并策略对象
const strats = Object.create(null)
//需要执行value2上合并策略的字段
const stratKeysFromVal2 = ['url', 'params', 'data']
//需要深度拷贝策略的字段
const stratsKeysDeepMerge = ['headers']

//1.默认策略
function defaultStart(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

//2.从value2上合并策略
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

//3.深拷贝合并策略
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1, val2)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

//给key指向函数引用
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

//给key指向函数引用
stratsKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

//合并配置对象
/**
 * config1 默认配置
 * config2 用户自定义配置
 */
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {} as AxiosRequestConfig
  }

  //合并后的配置
  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    /*
          如果这个配置字段config2上没有,
          则用config1(即默认配置)上的字段
        */
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    //选择合并策略函数
    const strat = strats[key] || defaultStart
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
