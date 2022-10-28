import { getRecentLinks, getLinkDetail } from '../../api/link.js'
const state = {
    recentLinks: [],
    link: null,
    linkDetail: null,
    pageCount: 1,
    totalURLs: 0,
    messageDelete: '',
    optionStat: 7,
    isShowDelete: false,
    topScroll: '0px',
    isLoading: false,
    filter: ''
}

const mutations = {
    SET_RECENT_LINKS: (state, recentLinks, totalURLs) => {
        state.recentLinks = recentLinks
       if (!totalURLs) {
        state.totalURLs = totalURLs
       }
    },
    SET_LINK_DETAIL: (state, objectDetail) => {
        state.linkDetail = objectDetail.linkDetail
        state.linkDetail.createdDate = objectDetail.createdDate
        state.linkDetail.URL = objectDetail.url
        state.linkDetail.Title = objectDetail.title
    },
    SET_OPTION_STAT: (state, option) => {
        state.optionStat = option
    },
    SET_PAGE_COUNT: (state, pageCount) => {
        state.pageCount = pageCount
    },
    SET_TOTAL_URLS: (state, totalURLs) => {
        state.totalURLs = totalURLs
    },
    SET_SHOW_DELETE: (state, isShowDelete) => {
        state.isShowDelete = isShowDelete
    },
    SET_MESSAGE_DELETE: (state, messageDelete) => {
        state.messageDelete = messageDelete
    },
    SET_TOP_SCROLL: (state, topScroll) => {
        state.topScroll = topScroll;
    },
    SET_IS_LOADING: (state, isLoading) => {
        state.isLoading = isLoading
    },
    SET_FILTER: (state, filter) => {
        state.filter = filter
    }
}

const actions = {
    /**
     * Hàm lấy danh sách link
     * DPQuy - 08/08/2022
     **/
    getRecentLinks({ commit }, linkDetail) {
        commit('SET_IS_LOADING', true)
        //show loading
        return new Promise((resolve, reject) => {
            getRecentLinks(linkDetail.page, linkDetail.filter).then(response => {
                commit('SET_RECENT_LINKS', response.Data.ListURLs, response.Data.TotalURLs)
                    //lấy ra số lượng trang
                    //(tổng số bản ghi chia 25 bản ghi trên trang)
                    //1.Dư thì thực hiện cộng pageCount thêm 1
                commit('SET_PAGE_COUNT', ((response.Data.TotalURLs % 5) != 0) ? (Number.parseInt(response.Data.TotalURLs / 5) + 1) : (response.Data.TotalURLs / 5))
                //dừng loading
                commit('SET_IS_LOADING', false)
                resolve()
            }).catch(error => {
                console.log(state.heightScroll)
                reject(error)
            })
        })
    },
    /**
     * Hàm lấy link chi tiết
     * Created by NVDung (08/08/2022)
     **/
    getLinkDetail: ({ commit }, linkDetail) => {
        return new Promise((resolve, reject) => {
            const option = (state.optionStat === 7 ? 'week' : 'month')
            getLinkDetail(linkDetail.pathName, option).then(response => {
                commit('SET_LINK_DETAIL', { linkDetail: response, createdDate: linkDetail.createdDate, url: linkDetail.url, title: linkDetail.title })
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },    
    // hàm xét giá trị cho recentLinks và tổng số đường link
    // PQBinh - 8/8/2022
    setRecentLinks({ commit }, recentLinks, totalURLs) {
        // xét lại giá trị cho recentLinks và totalUrls
        commit('SET_RECENT_LINKS', recentLinks, totalURLs)
        // khi thay đổi tổng số đường link xét lại giá trị page_count theo tổng số bản ghi
        commit('SET_PAGE_COUNT', ((totalURLs / 25) != 1) ? (Number.parseInt(totalURLs / 25) + 1) : (totalURLs / 25))
    },
     // hàm xét giá trị cho recentLinks và tổng số đường link
    // PQBinh - 23/8/2022
    // setRecentLinksNoTotalURls({ commit }, recentLinks) {
    //     // xét lại giá trị cho recentLinks và totalUrls
    //     commit('SET_RECENT_LINKS', recentLinks)
    // },
    // hàm xét lại biến linkDetail 
    // PQBinh -8/8/2022
    setLinkDetail({ commit }, objectDetail) {
        commit('SET_LINK_DETAIL', objectDetail)
    },
    //hàm sét filter
    setFilter({ commit }, filter) {
        commit('SET_FILTER', filter)
    },
    /**
     * Hàm xử lý lựa chọn thống kê
     * Created by NVDung (08/08/2022)
     **/
    getOptionStat: ({ commit }, linkDetail) => {
        return new Promise((resolve, reject) => {
            getLinkDetail(linkDetail.pathName, linkDetail.option).then(response => {
                commit('SET_LINK_DETAIL', { linkDetail: response, createdDate: linkDetail.createdDate, url: linkDetail.url, title: linkDetail.title })
                commit('SET_OPTION_STAT', linkDetail.numOption)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    //hiển thị loading
    setShowLoading({ commit }, isLoading) {
        commit('SET_IS_LOADING', isLoading)
    },
    /**
     * sét vị trí scroll bar
     * author: DPQuy
     * **/
    setPositionScroll({ commit }, topScroll) {
        commit('SET_TOP_SCROLL', topScroll);
    },
    //ẩn hiện form xóa
    //author: DPQuy (12/8/2022)
    showDelete({ commit }, message){
        //set nội dung thông báo
        commit('SET_MESSAGE_DELETE',message);
        //ẩn hiện form
        commit('SET_SHOW_DELETE' , !state.isShowDelete);
    }
    // reSearch: ({ commit }, key) => {
    //     return new Promise((resolve, reject) => {
    //         reSearch(key).then(response => {
    //             commit('SET_RECENT_LINKS', response.Data.ListURLs)
    //                 //lấy ra số lượng trang
    //                 //(tổng số bản ghi chia 25 bản ghi trên trang)
    //                 //1.Dư thì thực hiện cộng pageCount thêm 1
    //             commit('SET_PAGE_COUNT', ((response.Data.TotalURLs / 25) !== 1) ? (Number.parseInt(response.Data.TotalURLs / 25) + 1) : (response.Data.TotalURLs / 25))
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
