import request from '@/utils/request'

/**
 * api chuyển hướng đến trang login
 * **/
export function login() {
    return request({
        url: '/api/home/login',
        methods: 'get'
    })
}
