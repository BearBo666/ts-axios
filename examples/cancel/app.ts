import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
    cancelToken: source.token
}).catch(e => {
    if (axios.isCancel(e)) {
        console.log('取消请求发送', e.message)
    }
})

setTimeout(() => {
    source.cancel('延时0.1s取消请求发送')

    setTimeout(() => {
        //token已被使用，请求发送不出去
        axios.post('/cancel/post', { a: 1 }, {
            cancelToken: source.token
        }).catch(e => {
            if (axios.isCancel(e)) {
                console.log(e.message)
            }
        })
    }, 100)
}, 100)


//第二种方式取消
let cancel: Canceler

axios.get('/cancel/get', {
    cancelToken: new CancelToken(c => {
        cancel = c
    })
}).catch(e => {
    if (axios.isCancel(e)) {
        console.log('取消请求发送')
    }
})

setTimeout(() => {
    cancel()
}, 1500)