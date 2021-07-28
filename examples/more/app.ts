import { AxiosError } from "../../src/helpers/error";
import axios from "../../src/index";
// import NProgress from 'nprogress'

//1.跨域
// document.cookie = 'a=b'
// axios.get('/more/get').then(res => {
//     console.log('同域', res.data)
// })

// axios.post('http://localhost:8090/more/server2', {}, {
//     withCredentials: true
// }).then(res => {
//     console.log('跨域', res.data)
// })


//2.xsrf攻击防范
// const instance = axios.create({
//     xsrfCookieName: 'XSRF-TOKEN-D',
//     xsrfHeaderName: 'Token-Header'
// })

// instance.get('/more/get').then(res => {
//     console.log(res.data)
// })

//3.上传/下载事件回调
// const instance = axios.create()

// function calculatePercentage(loaded: number, total: number) {
//     return Math.floor(loaded * 1.0) / total
// }

// (function loadProgressBar() {
//     const setupStartProgress = () => {
//         instance.interceptors.request.use(config => {
//             NProgress.start()
//             return config
//         })
//     }

//     const setupUpdateProgress = () => {
//         const update = (e: ProgressEvent) => {
//             console.log(e)
//             NProgress.set(calculatePercentage(e.loaded, e.total))
//         }

//         instance.defaults.onDownloadProgress = update
//         instance.defaults.onUploadProgress = update
//     }

//     const setupStopProgress = () => {
//         instance.interceptors.response.use(res => {
//             NProgress.done()
//             return res
//         }, rejected => {
//             NProgress.done()
//             return Promise.reject(rejected)
//         })
//     }

//     setupStartProgress()
//     setupUpdateProgress()
//     setupStopProgress()
// })()

// const downloadEl = document.querySelector('#download')

// downloadEl!.addEventListener('click', (e) => {
//     console.log('点击下载按钮')
//     instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
// })

// const uploadEl = document.getElementById('upload')

// uploadEl!.addEventListener('click', (e) => {
//     const data = new FormData()

//     const fileEl = document.getElementById('file') as HTMLInputElement

//     if (fileEl.files) {
//         data.append('file', fileEl.files[0])

//         instance.post('/more/upload', data)
//     }
// })


//4.auth配置
// axios.post('/more/post', {
//     a: 1
// }, {
//     auth: {
//         username: 'admin',
//         password: '123456'
//     }
// }).then(({ data }) => {
//     console.log(data)
// })

//5.自定义合法状态码
// axios.get('/more/304').then(({ data }) => {
//     console.log('未配置自定义规则请求304时：', data)
// }).catch((e: AxiosError) => {
//     console.log('未配置自定义规则请求304时：', e.message)
// })

// axios.get('/more/304', {
//     validateStatus(status) {
//         return status == 304
//     }
// }).then(({ data }) => {
//     console.log('配置自定义规则请求304时：', data)
// }).catch((e: AxiosError) => {
//     console.log('配置自定义规则请求304时：', e.message)
// })

//6.自定义params序列化规则
// import qs from 'qs'
// axios.get('/more/get', {
//     params: new URLSearchParams('a=b&c=d')
// }).then(({ data }) => {
//     console.log(data)
// })

// axios.get('/more/get', {
//     params: {
//         a: 1,
//         b: ['x', 'y', 'z']
//     }
// }).then(({ data }) => {
//     console.log(data)
// })

// const instance = axios.create({
//     paramsSerializer(params) {
//         return qs.stringify(params, { arrayFormat: 'brackets' })
//     }
// })

// instance.get('/more/get', {
//     params: {
//         a: 1,
//         b: ['x', 'y', 'z']
//     }
// }).then(({ data }) => {
//     console.log(data)
// })

//7.baseURL
// const instance = axios.create({
//     baseURL: 'https://img.mukewang.com'
// })

// instance.get('/5cc01a7b0001a33718720632.jpg').then(res => {
//     console.log('配置完base后的请求', res.data)
// })

// instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg').then(res => {
//     console.log('未配置base的请求', res.data)
// })

//8.静态方法
function getA() {
    return axios.get('/more/A')
}

function getB() {
    return axios.get('/more/B')
}

axios.all([getA(), getB()]).then(axios.spread((resA, resB) => {
    console.log(resA.data)
    console.log(resB.data)
}))

axios.all([getA(), getB()]).then(([resA, resB]) => {
    console.log(resA.data)
    console.log(resB.data)
})

const fackConfig = {
    baseURL: 'https://www.baidu.com',
    url: '/user/12345',
    params: {
        idClient: 1,
        idTest: 2
    }
}

console.log(axios.getUri(fackConfig))

