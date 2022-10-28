import request from '@/utils/request'

/**
 * hàm gọi service tạo link rút gọn
 * createdby: nhphuong - 28/07/2022
 * @param {*} data
 * @returns
 */
export function createShortenLink(data) {
    return request({
        url: '/abcxyz',
        methods: 'post',
        data
    })
}

/**
 * hàm gọi service lấy các link rút gọn được tạo gần đây
 * nhphuong
 * @param {*} page
 * @returns
 */
export function getRecentLinks(page, filter) {
    return request({
        url: `/link/midurl?pageIndex=${page}&filter=${filter}`,
        methods: 'get'
    })
}
/**
 * hàm gọi service lấy link chi tiết
 * DPQuy
 * **/
export function getLinkDetail(pathname, option) {
    return request({
        url: `detail/${pathname}?option=${option}`,
        methods: 'get'
    })
}
/*
 *
 * hàm thêm mới 
 * pqbinh -8/8/2022
 * **/
export function addNewLink(link, deeplink) {
    return request({
        url: `http://localhost:54943/link/csurl?url=${link}`,
        method: 'post',
        data: { url: link, isdeeplink: deeplink }
    })
}
/*
 *
 * hàm chỉnh sửa
 * pqbinh -8/8/2022
 * **/
export function editLink(data) {
    return request({
        url: '/link/surl',
        method: 'put',
        data: data
    })
}