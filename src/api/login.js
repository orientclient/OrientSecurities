// import request from '@/utils/requestTest'
import request from '@/common/utils/request'

import { aut } from '@/api/public'
export const loginPath = aut + '/authUser/userLogin'
export const logoutPath = aut + '/authUser/loginOut'
export const userInfoPath = aut + '/resMenu/findMenuInfoByUserInfo'

export function loginByUsername(code, password) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        transformRequest: [function(data) {
            data = JSON.stringify(data)
            return data
        }],
        url: loginPath,
        method: 'post',
        data: {
            code,
            password
        }
    })
}

export function getUserInfo(token) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        transformRequest: [function(data) {
            data = JSON.stringify(data)
            return data
        }],
        url: userInfoPath,
        method: 'post',
        data: { token }
    })
}

export function logout() {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        transformRequest: [function(data) {
            data = JSON.stringify(data)
            return data
        }],
        url: logoutPath,
        method: 'post'
    })
}

// export function loginByUsername(username, password) {
//   const data = {
//     username,
//     password
//   }
//   return request({
//     url: '/login/login',
//     method: 'post',
//     data
//   })
// }
//
// export function logout() {
//   return request({
//     url: '/login/logout',
//     method: 'post'
//   })
// }
//
// export function getUserInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

