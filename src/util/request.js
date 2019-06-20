import axios from 'axios'

const service = axios.create({
    baseURL: 'http://game.flyh5.cn/game/wx6158db73b114e2b2/hospital/public/index/',
    timeout: 15000,
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
    }
});

export default {
    //get请求，其他类型请求复制粘贴，修改method

    get(url, param) {
        return new Promise((clack, reject) => {
            // const service = axios.create({
            //     baseURL: 'http://game.flyh5.cn/game/wx6158db73b114e2b2/hospital/public/index/',
            //     timeout: 15000,
            // });
            service({
                method: 'get',
                url,
                params: param,
            }).then(res => {
                //axios返回的是一个promise对象
                let res_code = res.status.toString();
                if (res_code.charAt(0) === '2') {
                    clack(res);   //cback在promise执行器内部
                } else {
                    console.log(res, '异常1')
                }
            }).catch(err => {
                if (!err.response) {
                    console.log(err)
                    console.log('请求错误')
                    //Message是element库的组件，可以去掉
                } else {
                    reject(err.response);
                    console.log(err.response, '异常2')
                }
            })

        })
    },

    post(url, data) {
        return new Promise((clack, reject) => {

            service({
                method: 'post',
                url,
                data: data,
            }).then(res => {
                let res_code = res.status.toString();
                console.log(typeof res_code.charAt(0))
                if (res_code.charAt(0) === '2') {
                    clack(res);   //cback在promise执行器内部
                } else {
                    console.log(res, '异常1')
                }
            }).catch(err => {
                if (!err.response) {
                    console.log('请求错误')
                    //Message是element库的组件，可以去掉
                } else {
                    reject(err);
                    // console.log(err.response.data, '异常2')
                }
            })

        })
    }
}