<template>
    <div class="header">
        <div class="nav-left">
            <div class="nav-square"><i class="fas fa-th-large"></i></div>
            <div class="nav-logo"></div>
        </div>
        <div class="nav-center">       
            <div class="position-relative ms-flex align-items-center w-88">
                 <input type="text" class="ms-input-search" placeholder="Tìm kiếm" v-model="txtSearch">
                <i class="fas fa-search icon-search"></i>
            </div>
            <button class="btn-primary btn m-l-12px border-none" @click="toggleModal">Shortlink mới</button>
        </div>
        <div class="nav-right">
            <div class="text-profile m-r-8px">Chào buổi sáng, Sơn</div>
            <div><i class="fas fa-user-circle icon-user"></i></div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            txtSearch: ''
        }
    },
    methods: {
        ...mapActions('link', ['getLinkDetail']),
        ...mapActions('app', ['toggleModal']),
        ...mapActions('link', ['getRecentLinks']),
        ...mapActions('link', ['setFilter'])
    },
    computed: {
         ...mapState('link', ['filter']),
         ...mapState('link', ['recentLinks'])
    },
    mounted() {
        console.log('mounted');
    },
    watch:{
        /**
         * Hàm tìm kiếm theo key
         * author: DPQuy (24/08/2022)
         * **/
        txtSearch: function(txtSearch) {
            clearTimeout(this.debounce)
            this.debounce = setTimeout(async () => {
                //khi txtSearch rỗng
                if(this.txtSearch == ''){
                    //load dữ liệu theo trang và số bản ghi
                    await this.getRecentLinks({ page : 1 , filter: '' });
                    this.setFilter(this.txtSearch);
                }
                else{
                    //sét lại key search ở vuex
                    this.setFilter(this.txtSearch);
                    //lấy ra danh sách
                    await this.getRecentLinks({ page : 1 , filter: this.txtSearch });
                    console.log(this.recentLinks);
                    if(this.recentLinks.length > 0) {
                         //lấy ra chi tiết link đầu tiên
                    this.getLinkDetail({ pathName: this.recentLinks[0].Pathname, createdDate: this.recentLinks[0].Created, url: this.recentLinks[0].Url, title: this.recentLinks[0].Title });
                    }
                }
            },750);
        }
    }
}
</script>

<style>
@import url(../css/layout/header.css);
@import url(../css/style.css);
</style>