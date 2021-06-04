import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(404 + e)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log('50%出错接口：')
  console.log(res)
}).catch((e) => {
  console.log('50%出错接口：', e)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log(res)
  }).catch((e) => {
    console.log(e)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log('超时2s接口：', e.message)
  console.log(e.code)
  console.log(e.config)
  console.log(e.request)
})
