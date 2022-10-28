<template >
    <div class="modal" v-if="isShowModal" >
        <div class="modal-faded" @click="clickOutsideModal"></div>
        <div class="modal-dialog">
            <div class="modal-header">
                <div class="modal-title">
                    {{Title}}
                </div>
                <div class="modal-btn-close" @click="toggleModal">
                     <i class="far fa-times-circle" style="font-size: 24px;color:#A0B1BA"></i>            
                </div>
            </div>
            <div class="modal-container">
                <div class="modal-checkbox">
                    <div class="modal-checkbox-title">
                        Chọn hình thức tạo Shortlink
                    </div>
                    <div class="modal-checkbox-content">
                        <div class="modal-checkbox1 modal-checkbox-custom">
                            <input type="checkbox" checked >
                             <span class="checkbox-misa">
                                <span></span>
                            </span>
                            <label> Rút gọn đường dẫn </label>
                        </div>
                        <div class="modal-checkbox2 modal-checkbox-custom">
                            <input type="checkbox" id="checkbox-deeplink" @click="toggleContentDeepLink">
                            <span class="checkbox-misa">
                                <span></span>
                            </span>
                            <label for="checkbox-deeplink"> Đường dẫn điều hướng chợ ứng dụng </label>
                        </div>
                    </div>
                </div>
                <div class="modal-checkbox1-content"  style="margin-top: 24px" v-if="!isDeepLink">
                    <div class="input-domain" v-if="modeModal != 1">
                        <p> Tên miền</p>
                        <input type="text" name="" id="url" class="text-area text-area-domain" value = "https://mily.vn">
                    </div>
                    <div class="input-url" v-if="modeModal != 1">
                        <p> URL gốc</p>
                        <input type="text" name="" class="text-area text-area-url" id="text-area-url" @blur="validUrl" @change="validUrl" :value ="recentLink.Pathname">
                    </div>
                    <div class="input-edit-modal" v-if="modeModal == 1">
                        <div class="input-edit-left">
                            <a class="text-parent copy-modal" @click="openShortLink" style="color:#ff8500">http://localhost:54943/{{ recentLink.Pathname }}<a
                                    v-if="copying"  @click="openShortLink" style="color:#ff8500">http://localhost:54943/{{ recentLink.Pathname }}</a>
                            </a>
                             <span @click="copyUrl" id="copy-modal"><i class="far fa-copy"></i>Sao chép</span>
                             <div class="input-title-edit">
                                <p> Tiêu đề</p>
                                <textarea type="text" name="" id="original-title" class="text-area-edit text-area-domain" placeholder="Không có tiêu đề" :value="recentLink.Title"></textarea>
                            </div>
                            <div class="input-url-edit" >
                                <p> Đường dẫn</p>
                                <div class="input-url-edit-content"  id="input-url-edit-content">
                                    <span>https://mily.vn/</span>
                                    <input type="text" name=""  id="original-pathname" class="text-area text-area-url text-area-url-edit" @blur="validPathname" :value="recentLink.Pathname">
                                </div>
                            </div>
                        </div>
                         <div class="input-qr">
                            <div class="qr-modal">
                            <p> Mã QR</p>
                            <div class="qr-wrapper qr-code-modal" title="Mã QR">
                                <Qr 
                                    :pathname = recentLink.Pathname
                                    :color = recentLink.QrCode.Color 
                                />
                                <!-- <div class="btn-action"><i class="fas fa-download" title="Tải xuống" @click="downloadQrCode"></i><i class="fas fa-brush" title="Chỉnh sửa màu"></i></div> -->
                            </div>
                            <i class="label-qr-modal"> Nhấp chuột vào mã QR để chọn mẫu QR</i>
                            <div class="btn-qr">
                                <div class="btn-custom-qr">
                                    <p>Chọn màu</p>
                                    <!-- <el-color-picker v-model="colorQR"/> -->
                                    <input type = "color" id = "custom-color-qr" :value= "recentLink.QrCode.Color "/>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    </div>
                </div>
                <div class="modal-checkbox2-content" v-if="isDeepLink">
                    <div class="modal-checkbox2-url">
                        <p>Đường dẫn rút gọn dành cho bạn:</p>
                        <div class="modal-short-url">
                            mily.vn/AGti89
                        </div>
                    </div>
                    <div class="modal-deep-link">
                        <div class="modal-deep-link-row1">
                            <div class="modal-deep-content">
                                <div class="modal-deep-title">
                                    Đường dẫn tới AppStore (iPhone)
                                </div>
                                <input type="text">
                            </div>
                            <div class="modal-deep-content">
                                <div class="modal-deep-title">
                                    Đường dẫn tới AppStore (iPAD)
                                </div>
                                <input type="text">
                            </div>
                        </div>
                        <div class="modal-deep-link-row2">
                             <div class="modal-deep-content">
                                <div class="modal-deep-title">
                                    Đường dẫn tới CHPlay (Android)
                                </div>
                                <input type="text">
                            </div>
                            <div class="modal-deep-content">
                                <div class="modal-deep-title">
                                    Đường dẫn tới chợ ứng dụng khác
                                </div>
                                <input type="text">
                            </div>
                        </div>
                    </div>
                    <div class="modal-tickbox-deep-link">
                        <input type="checkbox">
                        <span class="checkbox-misa">
                            <span></span>
                        </span>
                        <p>Thêm 3 loại đường dẫn khả dụng khác</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="modal-btn">
                    <div class="modal-btn-back">
                        Quay lại
                    </div>
                    <div class="modal-btn-done" id="btnModalCreate" @click="createShortCodeNoAuthen" v-if="modeModal != 1">
                        Hoàn thành
                    </div> 
                    <div class="modal-btn-done" @click="btnEditLink" v-if="modeModal == 1">
                        Chỉnh sửa
                    </div>
                </div>
            </div>
        </div>
       
    </div>

</template>
<script>
import enumModeDetail from '../Enums/enumModeDetail'
import { mapState, mapActions } from 'vuex'
import { saveAs } from 'file-saver'
import 'react-toastify/dist/ReactToastify.css';
import Qr from './Qr.vue'
import { addNewLink, editLink } from '../api/link.js'
import axios from 'axios'

export default {
    data () {
       return {
         recentLink: {},
         IsShowListApp: false,
         Title: enumModeDetail.Add,
         isDeepLink : false,
        copying: false
       }
    },
    components: {
        Qr
    },
    methods: {
        addNewLink,
        editLink,
        ...mapActions('app', ['toggleModal']),
        //Khi thêm mới thành công sẽ load lại danh sách dữ liệu
        ...mapActions('link', ['getRecentLinks']),
        ...mapActions('link', ['setRecentLinks']),
        ...mapActions('app', ['setModeModal']),
        ...mapActions('link', ['setLinkDetail']),
        // Hàm thực hiện việc ẩn modal khi click bên ngoài modal
        clickOutsideModal () {
            var me = this
            me.toggleModal()
        },
        /// Hàm xử lý việc ẩn hiện danh sách các ứng dụng hỗ trợ
        /// PQBinh -3/8/2022
        checkSmartLink () {
            var me = this
            var ele = document.getElementById('smartLink')
            me.showListApp()
            if (me.IsShowListApp === true) {
                ele.checked = true
            }
            else ele.checked = false
        },
        // Hàm xử lý việc ẩn hiện modal content
        // PQBinh -11/8/2022
        toggleContentDeepLink () {
            var checkBoxDeepLink = document.getElementById('checkbox-deeplink')
            this.isDeepLink = checkBoxDeepLink.checked
        },
        // Hàm xử lý gán lại giá trị biến ẩn hiện danh sách các ứng dụng
        /// PQBinh -3/8/2022
        showListApp () {
            this.IsShowListApp = !this.IsShowListApp
        },
        // Hàm kiểm tra valid url 
        // @param : value: url truyền vào
        // PQBinh -23/8/2022
        isValidUrl(value) {
            var regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g
            var isValid = regex.test(value)
            return isValid
        },
        // Hàm xử lý việc valid url và nếu invalid thì thêm border đỏ vào input
        // PQBinh -23/8/2022
        validUrl() {
            // kiểm tra url có hợp lệ hay không
            // nếu url invalid thì để màu nhạt và focus vào màu nhạt
            var _url = document.getElementById('text-area-url')
            var _btn = document.getElementById('btnModalCreate')
            if (!this.isValidUrl(_url.value)) {
                _url.classList.add('error-textarea')
                _btn.classList.add('error-btn')
                return false
            }
            else {
                 _url.classList.remove('error-textarea')
                return true
            }
        },
        // Hàm kiểm tra valid pathname 
        // @param : value: pathname truyền vào
        // PQBinh -23/8/2022
        isValidPathname(value) {
            var regex = /^[\w-_]+$/
            var isValid = regex.test(value)
            return isValid
        },
        // Hàm xử lý việc valid pathname và nếu invalid thì thêm border đỏ vào input
        // PQBinh -23/8/2022
        validPathname() {
            var _url = document.getElementById('original-pathname')
            var _input = document.getElementById('input-url-edit-content')
            if (this.isValidPathname(_url.value) == false) {
                _input.classList.add('error-textarea')
                return false
            }
            else {
                 _input.classList.remove('error-textarea')
                return true
            }
        },
        // Hàm thêm mới được gọi khi bấm nút rút gọn link
        // PQBinh-8/8/2022
        createShortCodeNoAuthen() {
            var me = this
            // kiếm tra xem đường dẫn url có hợp lệ hay chưa nếu hợp lệ thực hiện thêm mới
            if (me.validUrl) {
                // lấy giá trị của _url của input
                var _link = document.getElementById('text-area-url').value
                // lấy giá trị checkbox có deeplink không
                var _isdeeplink = document.getElementById('checkbox-deeplink').checked
                me.addNewLink(_link, _isdeeplink).then(response => {
                    me.handleCreateShortCodeNoAuthen(response)
                }).catch(error => {
                    return(error)
                })
            }
        },
        /// hàm được gọi sau khi gửi request 
        /// *params: res : response trả về khi gọi api thêm mới
        // PQBinh - 8/8/2022
        handleCreateShortCodeNoAuthen(res){
            var me = this
            // kiếm tra xem mã code trả về có là 200 không nếu phải thực hiện thêm mới từ phía client
            if (res.CODE == 200) {
                 // ẩn link modal
                me.toggleModal()
                // Lấy giá trị của phần vừa thêm mới rồi mở popup chỉnh sửa
                //toast mess
                me.$toast.show('Thêm thành công')
                me.recentLink = res.Data
                // cập nhật lại giá trị của linkdetail trong local storage
                var tempLink = res.Data
                var createdDateDetail = tempLink.Created;
                // tempLink.createdDate = tempLink.Created
                tempLink.URL = tempLink.Url
                me.setLinkDetail({ linkDetail: tempLink, createdDate: createdDateDetail, url: tempLink.URL, title: tempLink.Title })
                // cập nhật lại giá trị của mảng recentLinks trong localstorge
                var _recentLinks = me.recentLinks
                _recentLinks.splice(0,0,res.Data)
                me.setRecentLinks(_recentLinks, me.totalURLs + 1)
                // me.setLinkDetail(res.data.Data)
                //hiện lại popup chỉnh sửa
                setTimeout(function () {
                    me.toggleModal()  
                }, 500)
                me.setModeModal(1)
            }
            else {
                me.toggleModal()
                me.$toast.show('Lỗi khi thêm mới')
            }
        },
        // Hàm chỉnh sửa link được gọi khi bấm vào nút lưu lại
        // PQBinh-8/8/2022
        btnEditLink() {
            var me = this
            // shortcode PathName cũ cần thay đổi
            // pathname PathName mới khách hàng lựa chọn
            // title Title khách hàng đặt cho Link tương ứng
            // changedeep Cập nhật deep link hay không
            // lấy pathname mà đã chỉnh sửa từ input 
            var _pathname = document.getElementById('original-pathname').value
            // lấy title mà đã chỉnh sửa từ input
            var _title = document.getElementById('original-title').value
            // lấy giá tri change deep true hay false
            var _isdeeplink = document.getElementById('checkbox-deeplink').checked
            // lấy màu từ input
            var color = document.getElementById('custom-color-qr').value
            var isExist = false;
            // Kiểm tra _pathname chỉnh sửa có khác với cũ không
            if (_pathname != me.recentLink.Pathname) {
                // Trước khi gọi api chỉnh sửa kiểm tra xem pathname vừa thay đổi đã có trong danh sách list history hay chưa
                var listUrls = me.recentLinks
                if (listUrls.some(listUrl => listUrl.Pathname === _pathname)) {
                    me.$toast.show('Pathname đã tồn tại')
                    isExist = true
                }
            }
            if (isExist == false) {
                var data = {
                            Pathname: _pathname,
                            Shortcode: me.recentLink.Pathname,
                            Title : _title,
                            QrCode : {
                                color : color,
                                background : '#fff',
                                logo : ''
                            },
                            Changedeep: _isdeeplink
                }
                // var res = me.editLink(data).then(res => {
                    
                // }
                me.editLink(data).then(response => {
                    me.handleModifyShortLink(response, me.recentLink.Pathname)
                }).catch(error => {
                    return(error)
                })
            }
        },
        // Hàm thực hiện việc chỉnh sửa dữ liệu
        // *param res: respon trả về khi thêm mới
        // *param pathname: pathname được chỉnh sửa
        // PQBinh - 23/8/2022
        handleModifyShortLink(res, pathname) {
            var me = this
            // kiếm tra xem mã code trả về có là 200 không nếu phải thực hiện thêm mới từ phía client
            if (res.Code == 200) {
                 // ẩn link modal
                me.toggleModal()
                //toast mess
                me.$toast.show('Chỉnh sửa thành công')
                // chỉnh sửa shortlink vừa thay đổi trong ListHistory
                // 1. Lấy shortlink chỉnh sửa từ ListHistory ra và cập nhập lại giá trị thay đổi
                var listUrls = me.recentLinks 
                // 2 Lấy ra vị trí của shortlink chỉnh sửa trong listURLs
                var index = listUrls.map(listUrl => listUrl.Pathname).indexOf(pathname)
                // 3 Lấy shortlink vị trí đó ra
                var shortLinkEdit = listUrls.splice(index, 1)[0]
                // 3.1 Cập nhật lại giá trị của thằng shortLink vừa lấy ra
                shortLinkEdit = res.Data
                shortLinkEdit.Url = res.Data.URL
                // 4 cho lại shortlink đó vào vị trị đầu tiên của ListURl
                listUrls.splice(0, 0, shortLinkEdit)
                me.setRecentLinks(listUrls)
                // chỉnh sửa link detail là cái vừa thay đổi
                var tempLink = res.Data
                tempLink.Histories = this.recentLink.Histories
                var createdDateDetail = tempLink.Created;
                // tempLink.createdDate = tempLink.Created
                me.setLinkDetail({ linkDetail: tempLink, createdDate: createdDateDetail, url: tempLink.URL, title: tempLink.Title })
            }
            else if (res.Code == 1002) {
                me.$toast.show('Lỗi khi chỉnh sửa')
            }
            else {
                me.$toast.show('Lỗi khi chỉnh sửa')
            }
        },
        // download Qr
        downloadQrCode() {
            const img = document.querySelector('#qr img')
            const imagePath = img.getAttribute('src')
            const fileName = 'Qrcode'
            saveAs(imagePath, fileName)
        },
        // copy Url
        copyUrl() {
            navigator.clipboard.writeText('http://localhost:54943/' + this.recentLink.Pathname)
            this.copying = true
            setTimeout(() => {
                this.copying = false
            }, 500)
        },
        // Chuyển trang sang URL gốc
        // PQBinh - 23/8/2022
        openShortLink () {
            window.open('http://localhost:54943/' + this.recentLink.Pathname)
        }
    },
    created () {
       if (this.modeModal === 1) {
            this.Title = enumModeDetail.Edit
            this.recentLink = this.linkDetail
            //  Taọ mặc định màu cho qr code
            if (!this.recentLink.QrCode) {
                this.recentLink.QrCode = {
                    Background : '#fff',
                    Color : '#676a6C',
                    Logo : ''
                }
            }
       }
    },
    computed: {
        ...mapState('app', ['isShowModal']),
        ...mapState('app', ['modeModal']),
        ...mapState('link',['linkDetail']),
        ...mapState('link', ['recentLinks']),
        ...mapState('link', ['totalURLs'])
    }
}
</script>
<style>
    @import url(../../src/css/layout/modal.css)
</style>