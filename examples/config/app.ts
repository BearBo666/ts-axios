import axios from '../../src/axios'
import { AxiosTransformer } from '../../src/types'
import qs from 'qs'

axios.defaults.headers.common['xb'] = 123

// axios({
//     url: '/config/post',
//     method: 'post',
//     data: qs.stringify({
//         a: 1
//     }),
//     headers: {
//         test: '321'
//     }
// }).then(res => {
//     console.log(res.data)
// })

axios({
    transformRequest: [(function (data) {
        // return {}
        return qs.stringify(data)
    }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
    transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]),
    function (data) {
        if (typeof data === 'object') {
            data.b = 2
        }
        return data
    }],
    url: '/config/post',
    method: 'post',
    data: { a: 1 }
}).then(res => {
    console.log(res.data)
})

// const instance1 = axios.create({
//     headers: {
//         'xb': "Hello xb"
//     }
// });

// instance1({
//     url: "/config/post",
//     method: "post",
//     data: qs.stringify({
//         a: 1
//     })
// }).then(res => {
//     console.log(res.data);
// });