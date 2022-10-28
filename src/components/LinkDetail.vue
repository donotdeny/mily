<template>
    <div class="wrapper-link-detail"
        :class="{ 'h-100 align-items-center justify-content-center ms-flex': !recentLinks.length }">
        <div v-show="!recentLinks.length" class="emptyDetail">
            <h1>Chưa có dữ liệu</h1>
        </div>
        <div v-show="recentLinks.length">
            <div class="link-qr-wrapper">
                <div class="link-info">
                    <div class="text-muted"><i class="far fa-clock"></i> {{ recentLink.created }}</div>
                    <h2 id="title">{{ !recentLink.Title ? 'Chưa có tiêu đề' : recentLink.Title }}</h2>
                    <p v-bind:title="recentLink.URL">{{ recentLink.URL }}</p>
                    <div class="short-link">
                        <div class="text-link">
                            <a title="Đi tới trang web" class="text-parent" rel="noreferrer noopener" @click="openLink">http://localhost:54943/{{ recentLink.Pathname }}<a
                                    v-if="copying" href="#">http://localhost:54943/{{ recentLink.Pathname }}</a>
                            </a>
                        </div>
                        <div class="short-link-action">
                            <div @click="copyUrl" title="Sao chép đường dẫn"><i class="far fa-copy"></i><p>Sao chép</p></div>
                            <div @click="btnShowModal" title="Chỉnh sửa đường dẫn"><i class="fas fa-pencil-alt"></i><p>Sửa</p></div>
                            <div><i class="fas fa-trash-alt" title="Xóa đường dẫn"></i><p>Xóa</p></div>
                        </div>
                    </div>
                    <div v-if="closeButton" @click="closeLinkDetail" class="close-btn">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <div class="qr-code">
                    <div class="qr-wrapper" title="Tải xuống" @click="downloadQrCode">
                        <Qr id="qr" :pathname = recentLink.Pathname :color =  qrCodeColor title="Tải xuống ảnh mã QR"/>
                        <!-- <div class="btn-action"><i class="fas fa-download" title="Tải xuống" @click="downloadQrCode"></i><i class="fas fa-brush" title="Chỉnh sửa màu"></i></div> -->
                    </div>
                </div>
            </div>
            <!-- <div class="navigation-bar">
                <p class="navigation-title">Điều hướng</p>
                <div v-show="showNav">
                    <div class="navigation-item yellow-background">
                        <i class="fab fa-chrome yellow-color"></i>
                        <div>
                            <p class="navigation-title">Browser</p>
                            <div class="navigation-item-detail">
                                <a
                                    href="#">https://www.figma.com/file/AZq3s7W1ErWjfr3u4YcVOd/Mily.vn?node-id=137%3A236</a>
                                <div><i class="far fa-copy"></i>Sao chép</div>
                            </div>
                        </div>
                    </div>
                    <div class="navigation-item green-background">
                        <i class="fab fa-android green-color"></i>
                        <div>
                            <p class="navigation-title">Android</p>
                            <div class="navigation-item-detail">
                                <a
                                    href="#">https://www.figma.com/file/AZq3s7W1ErWjfr3u4YcVOd/Mily.vn?node-id=137%3A236</a>
                                <div><i class="far fa-copy"></i>Sao chép</div>
                            </div>
                        </div>
                    </div>
                    <div class="navigation-item red-background">
                        <i class="fab fa-apple red-color"></i>
                        <div>
                            <p class="navigation-title">IOS</p>
                            <div class="navigation-item-detail">
                                <a
                                    href="#">https://www.figma.com/file/AZq3s7W1ErWjfr3u4YcVOd/Mily.vn?node-id=137%3A236</a>
                                <div><i class="far fa-copy"></i>Sao chép</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- <div id="expand-collapse" @click="toggleNav">
                <i class="fas fa-angle-down"></i>
            </div> -->
            <div class="graph-statistic">
                <div class="title-option">
                    <h2>Thống kê truy cập</h2>
                    <select v-model="optionStat">
                        <option value="7">7 ngày qua</option>
                        <option value="30">30 ngày qua</option>
                    </select>
                </div>
                <div class="ibox">
                    <div class="ibox-content">
                        <canvas id="myChart" width="677" height="500"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import getDateTimeFromTimestamp, { formatDate, compareDate } from '../app/date'
import Chart from 'chart.js/auto'
import QRCodeVue3 from 'qrcode-vue3'
import { saveAs } from 'file-saver'
import Qr from './Qr.vue'
export default {
    data() {
        return {
            recentLink: {},
            closeButton: true,
            labels: [],
            optionStat: '7',
            copying: false,
            showNav: false,
            qrCodeColor: '#000'
        }
    },
    components: {
        Qr
    },
    computed: {
        ...mapState('link', ['linkDetail']),
        ...mapState('link', ['recentLinks'])
    },
    watch: {
        /**
         *  Xử lý lựa chọn thống kê
         *  Created by NVDung (04/08/2022)
        **/
        optionStat: function (value) {
            if (value === '7') {
                this.getOptionStat({ pathName: this.recentLink.Pathname, createdDate: this.recentLink.createdDate, url: this.recentLink.URL, title: this.recentLink.Title, numOption: 7, option: 'week' })
            }
            else if (value === '30') {
                this.getOptionStat({ pathName: this.recentLink.Pathname, createdDate: this.recentLink.createdDate, url: this.recentLink.URL, title: this.recentLink.Title, numOption: 30, option: 'month' })
            }
        }
    },
    /**
     *  Xử lý dữ liệu Chart
     *  Watch linkDetail để cập nhật dữ liệu
     *  Created by NVDung (04/08/2022)
    **/
    mounted() {
        /* Lấy element canvas */
        const ctx = document.getElementById('myChart').getContext('2d');
        /* Khởi tạo mảng dữ liệu*/
        const dataChart = []
        const oldestDate = new Date()
        /* Lấy 7 ngày gần nhất */
        oldestDate.setDate(oldestDate.getDate() - 7)
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(oldestDate.setDate(oldestDate.getDate() + 1))
            this.labels.push(currentDate)
            dataChart.push(0)
        }
        /* Khởi tạo dữ liệu */
        const data = {
            /* Nhãn */
            labels: this.labels.map(date => formatDate(date)),
            /* Dữ liệu thống kê */
            datasets: [{
                label: 'Số lần click',
                data: dataChart,
                borderColor: 'rgba(0, 0, 0, 0)',
                backgroundColor: function (context) {
                    const chart = context.chart
                    const { ctx, chartArea } = chart
                    if (!chartArea) {
                        // This case happens on initial chart load
                        return
                    }
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                    gradient.addColorStop(0, '#1AB393');
                    gradient.addColorStop(1, 'rgba(26, 179, 147, 0)');
                    return gradient
                },
                fill: true,
                pointRadius: 4,
                color: 'black',
                pointBackgroundColor: '#1AB393'
            }]
        }
        /* Khởi tạo chart với kiểu line truyền vào canvas*/
        const myChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    filler: {
                        propagate: false
                    },
                    legend: {
                        display: false
                    }
                },
                interaction: {
                    intersect: false
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        })
        /* Watch linkDetail */
        this.unwatch = this.$store.watch((state) => state.link.linkDetail,
            (newValue, oldValue) => {
                if(newValue) {
                    this.recentLink = newValue
                    this.bindLinkDetail(myChart)
                    /* Convert timestamp to date */
                    this.recentLink.created = getDateTimeFromTimestamp(this.recentLink.createdDate)
                }
            })
        if (screen.width > 585) this.closeButton = false
    },
    /* Hủy watch để tránh memory leaks */
    beforeUnmount() {
        this.unwatch()
    },
    methods: {
        ...mapActions('link', ['getOptionStat']),
        ...mapActions('app', ['toggleModal']),
        ...mapActions('app', ['setModeModal']),
        /**
         * Cập nhật chart mỗi khi chọn link
         * Created by NVDung (05/08/2022)
        **/
        bindLinkDetail: function (myChart) {
            try {
                /* Nếu có lượt click thì cập nhật */
                /* Khởi tạo lại giá trị của nhãn và data */
                myChart.data.labels = []
                myChart.data.datasets[0].data = []
                this.labels = []
                /* Lấy ngày hiện tại */
                const oldestDate = new Date()
                /* Lấy số ngày gần nhất */
                oldestDate.setDate(oldestDate.getDate() - this.optionStat)
                /* Duyệt để thiết lập giá trị mặc định của Chart */
                for (let i = 0; i < this.optionStat; i++) {
                    const currentDate = new Date(oldestDate.setDate(oldestDate.getDate() + 1))
                    this.labels.push(currentDate)
                    myChart.data.datasets[0].data.push(0)
                }
                /* Gán giá trị ngày cho nhãn (chuỗi)*/
                myChart.data.labels = this.labels.map((date) => formatDate(date))
                /* Nếu có lượt click */
                if (this.recentLink.Histories) {
                    /* Set lại giá trị cho date về ngày xa nhất */
                    oldestDate.setDate(oldestDate.getDate() - this.optionStat - 1)
                    /* Lấy độ dài mảng history */
                    const lengthHistory = this.recentLink.Histories.length
                    for (let i = lengthHistory - 1; i >= 0; i--) {
                        /*  oldestDate.getTime() => millisecond
                            linkDetail.history[i].Date => second
                            Nếu duyệt quá số ngày từ hiện tại thì break */
                        if (oldestDate.getTime() > this.recentLink.Histories[i].Created * 1000) {
                            break
                        }
                        /* Khởi tạo tmpDate lưu giá trị phần tử hiện tại để so sánh */
                        const tmpDate = new Date(this.recentLink.Histories[i].Created * 1000)
                        /* Lặp để kiểm tra xem ngày hiện tại có trong history không */
                        for (let j = 0; j < this.optionStat; j++) {
                            /* Nếu bằng thì gán giá trị Clicks cho chart */
                            if (compareDate(this.labels[j], tmpDate)) {
                                myChart.data.datasets[0].data[j] = this.recentLink.Histories[i].Clicks
                            }
                        }
                    }
                }
                /* Nếu không có thì update lại chart như lúc đầu */
                else {
                    myChart.data.datasets[0].data = myChart.data.datasets[0].data.map(() => 0)
                }
                /* Cập nhật lại chart */
                myChart.update()
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Sao chép url vào clipboard
         * Created by NVDung (2/8/2022)
         **/
        copyUrl() {
            navigator.clipboard.writeText('http://localhost:54943/' + this.recentLink.Pathname)
            this.copying = true
            setTimeout(() => {
                this.copying = false
            }, 500)
        },
        /**
         * Đóng giao diện LinkDetail (responsive mobile)
         * Created by NVDung (2/8/2022)
         **/
        closeLinkDetail() {
            if (screen.width <= 585) {
                document.querySelector('.detail').style.display = 'none'
                document.querySelector('.history').style.display = 'block'
            }
        },
        /**
         * Download QR Code
         * Created by NVDung (06/08/2022)
        **/
        downloadQrCode() {
            const img = document.querySelector('#qr img')
            const imagePath = img.getAttribute('src')
            const fileName = 'Qrcode'
            saveAs(imagePath, fileName)
        },
        /**
         *  Ẩn hiện thanh điều hướng
         *  Created by NVDung (12/08/2022)
         **/
        toggleNav() {
            if (this.showNav === false) {
                this.showNav = true
                document.getElementById('expand-collapse').style.transform = 'rotate(180deg)'
            }
            else {
                this.showNav = false
                document.getElementById('expand-collapse').style.transform = 'none'
            }
        },
        /*
        *   Hàm xử lý việc mở modal và xét giá trị mode modal là 1 
        *   Created By PQBinh - 3/8/2022
        */
        btnShowModal() {
            // mở link modal
            this.toggleModal()
            // đặt modemodal là trạng thái sửa
            this.setModeModal(1)
        },
        /**
         *  Mở Url gốc
         *  Created by NVDung (24/08/2022)
         **/
        openLink() {
            window.open('http://localhost:54943/' + this.recentLink.Pathname)
        }
    }
}
</script>
<style scoped>
@import url(../css/layout/link-detail.css);
</style>
