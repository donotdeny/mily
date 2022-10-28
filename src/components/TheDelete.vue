<template>
    <div class="ms-box-popup">
        <div class="ms-popup">
            <div class="icon-popup"><i class="far fa-times-circle icon-close pointer" @click="showDelete"></i></div>
            <div class="title-popup m-b-24">
                Cảnh báo
            </div>
            <div class="content-popup m-b-24"> 
                <p>{{messageDelete}}</p>
            </div>
            <button class="btn-primary border-none btn-delete pointer">Xóa</button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    methods:{
        ...mapActions('link', ['showDelete'])
    },
    computed:{
        ...mapState('link', ['messageDelete'])
    }
}
</script>
<style>
    .ms-box-popup{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: #13191c8c;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ms-popup{
        position: relative;
        width: 440px;
        height: 192px;
        background: #FFFFFF;
        border-radius: 5px;
        padding: 12px 24px 24px;
    }
    .icon-popup{
        width: 100%;
        height: 16px;
    }
    .icon-close{
        color: #A0B1BA;
        font-size: 16px;
        position: absolute;
        right: 12px;
    }
    .title-popup{
        font-weight: 700;
        font-size: 18px;
        color: #3A4B54;
        line-height: 18px;
        width: 100%;
    }
    .content-popup{
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        width: 359px;
        height: 40px;
        color: #3A4B54;
    }
    p{
        line-height: 25px;
    }
    .btn-delete{
        width: 62px;
        height: 32px;
        border-radius: 5px;
        color: #FFFFFF;
        position: absolute;
        right: 24px;
    }
</style>