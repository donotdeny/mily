<template>
  <div @scroll="handleScroll">
    <div class="b-page-default">
        <Header/>
        <div class="b-slogan">
                    <div class="carousel-caption blank">
                        <h1>MISA SHORTLINK <br></h1>
                        <p class="slogon-text-1" style="direction: ltr;">Dịch vụ rút gọn link hoàn toàn miễn phí</p>
                        <!--<h4>MISA shortlink giúp link chia sẻ gọn hơn,</br>quản lý link hiệu quả, độ an toàn cao, dễ dàng chia sẻ trên các mạng xã hội.</h4>-->
                    </div>
        </div>
    </div>
    <section class="b-timeline">
        <div class="b-timeline-container">
            <div class="b-timeline-row">
                <div class="col-lg-12 text-center">
                    <div class="navy-line"></div><br>
                    <p class="slogon-text-2" style="direction: ltr;">Kể từ ngày 22/10/2021, dịch vụ rút gọn link yêu cầu đăng nhập với MISA ID. Trân trọng!</p>
                </div>
            </div>
        </div>
        <div class="b-timeline-footer">
            <div class="line"></div>
        </div>
    </section>
    <section class="features">
        <div class="col-lg-12 text-center">
                    <div class="navy-line"></div>
                    <h1 class="feature-text" style="direction: ltr;">Tính năng nổi bật</h1>
                    <p class="tell-story-text" style="direction: ltr;">Chúng tôi sẽ kể cho bạn nghe qua những câu chuyện.</p>
        </div>
        <div class="features-content">
            <div class="features-content-left">
                   <div class="features-content-left-container">
                        <small>MISA ShortLink</small>
                        <h2 class="shorten-link-text-1" style="direction: ltr;">Rút gọn Link</h2>
                        <p class="shorten-link-text-2" style="direction: ltr;">Bạn cảm thấy mệt mỏi vì đường link quá dài trên mạng xã hội. Bạn cảm
                            thấy chán nản vì nó làm xấu content của bạn. Sếp và khách hàng không tin tưởng bạn. Bạn muốn
                            thay đổi để tốt hơn?</p>
                        <p class="shorten-link-text-3" style="direction: ltr;">Đó là lúc cần tới MISA ShortLink. Dịch vụ Rút gọn Link hàng đầu MISA!
                        </p> <br>
                   </div>
            </div>
            <div class="features-content-mid">
                <img src="../../src/assets/giaodien.png" />
            </div>
            <div class="features-content-right">
                    <div class="features-content-left-container">
                        <small>MISA ShortLink</small>
                        <h2 class="share-qrcode-text-1" style="direction: ltr;">Chia sẻ QR Code</h2>
                        <p class="share-qrcode-text-2" style="direction: ltr;">Khi công nghệ ngày càng phát triển, con người ta ngày càng hướng tới
                            những thứ hoàn mỹ, hiện đại, tân tiến. MISA chúng tôi hân hạnh mang đến cho bạn tính năng chia
                            sẻ những đường link bằng hình ảnh, mang đậm phong cách của bạn.</p>
                        <p class="share-qrcode-text-3" style="direction: ltr;">MISA ShortLink. Quét là phải đến!</p>
                    </div>
            </div>
        </div>
    </section>
    <Footer />
    </div>
</template>
<style>
.b-page-default{
    background: url(../../src/assets/background.png) center no-repeat;
    background-size: cover;
    height:400px ;
    width: 100%;
    position: relative;
}
.b-slogan{
  position: absolute;
    top: 160px;
    left: 215px;
    bottom: auto;
    right: auto;
    text-align: left;
    height: fit-content;
    color: #fff;
    /* width: 500px; */
}
.b-slogan h1{
  font-weight: 700;
    font-size: 38px;
    text-transform: uppercase;
    text-shadow: none;
    letter-spacing: -1.5px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.b-slogan p{
  margin-bottom: 20px;
    font-size: 14px;
    line-height: 1.4;
    font-weight: 700;
    text-transform: uppercase;
    text-shadow: none;
}
.b-timeline{
    background-color: #f0f0f0;
    height: 174px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.b-timeline-row{
    display: flex;
    align-items: center;
    justify-content: center;
}
.navy-line{
    width: 60px;
    height: 1px;
    margin: 24px auto 0;
    border-bottom: 2px solid #1ab394;
}
.b-timeline-row p {
    color: #000000;
    font-size: 13px;
    margin-top: 0;
    margin-bottom: 0;
}
.b-timeline-container{
    margin-bottom: 16px;
}
.b-timeline-footer{
    background-color: #fff;
    /* width: 1110px; */
    border-radius: .3rem;
    height: 73px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.line {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
    height: 1px;
    width: 1080px;
}
.features{
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
section p {
    color: #000000;
    font-size: 13px;
}
section h1{
    margin-top: 10px;
    font-size: 30px;
    font-weight: 200;
    color: #676a6c;
    font-family: 'Open Sans', helvetica, arial, sans-serif;
}
section h2{
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: 10px;
    font-weight: 100;
    color: #676a6c;
    line-height: 1.2;
}
.col-lg-12{
    width: 1110px;
     display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.feature-text{
    margin-bottom: 10px;
}
.tell-story-text{
    margin-top: 0px;
    margin-bottom: 16px;
}
.features-content{
    margin-top: 40px;
    width: 1110px;
     display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}
.features-content div{
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
}
.features-content img{
    width: 100%;
        height: auto;
}
.features-content small{
        color: #1ab394;
        font-size: 80%;
    font-weight: 400;
}
.features-content-left{
    margin-top: 40px;
    text-align: left!important;
    box-sizing: border-box;
}
.features-content-right{
    margin-top: 40px;
    text-align: right!important;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}
.features-content-mid{
    margin-top: -30px;
    width: 50%;
    box-sizing: border-box;
}
.shorten-link-text-3{
    margin-top: 16px;
}
.features-content-left{
    display: flex;
    align-items: center;
    justify-content: center;
}
.features-content-left-container p{
    margin-bottom: 16px;
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (max-width: 768px) {
    .b-header{
        width: 70% !important; 
    }
    .b-client{
        width: 768px !important;
    }
    .b-client{
        background-color: #fff;
    }
    .features-content{
    display: flex;
    flex-direction: column;
    }
    .features-content-mid{
        margin-top: 10px;
    }
    .footer{
        width: 100%;
    }
    .b-slogan{
        top: 265px;
        left: 20px;
    }
    .b-slogan h1{
        font-size: 32px;
    }
    .b-timeline-footer{
        max-width: 720px;
    }
    .line {
        width: 690px;
    }
    .b-header-link{
        padding-top: 6px;
    }
}
@media screen and (max-width : 390px) {
    .b-nav{
        width: 390px;
    }
    
}
@media screen and (max-width: 820px) and (min-width: 800px){
    .b-nav{
        width: 720px;
    }
    .b-client{
        width: 820px;
    }
    .b-header{
        width: 100%;
    }
    .features-content{
        width: 800px;
    }
    .features-content-mid{
        width: 100%;
    }
    .col-lg-12{
        width: 800px;
    }
    .b-timeline-footer{
        width: 800px;
    }
    
}
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (max-width: 1110px) and (min-width: 1000px){
    .b-header{
        width: 80%;
    }
    .features-content {
        width: 80%;
    }
    .b-header-respon .b-header-link{
        width: 80%;
    }

    .features-content-mid{
        margin-top: 25px;
    }
    .b-slogan{
        top: 265px;
        left: 20px;
    }
    .b-timeline-footer{
        max-width: 930px;
    }
    .line {
        width: 690px;
    }
}
@media only screen and (max-width: 768px) and (min-width: 540px) {
    .b-header{
        width: 100%;
    }
    .b-header-branch{
        height: 46px;
        margin-top: 2px;
    }
    .b-slogan h1{
        font-size: 28px;
    }
    .b-slogan p{
        font-size: 13px;
    }
    .b-timeline-container{
        width: 375px;
        text-align: center;
        padding-left: 15px;
        padding-right: 15px;
    }
    .b-timeline-footer{
        width: 768px !important;
    }
    .col-lg-12{
        width: 768px !important;
    }
    .features{
        background-color: #F0F0F0;
        color: #676a6c;
    }
    .features-content{
        width: 100%;
    }
    .features-content-mid{
        width: 100%;
    }
}
@media screen and (max-width : 376px) {
    .b-nav{
        width: 375px !important;
    }
    .b-client{
        width: 375px !important;
    }
    .b-header{
        width: 100% !important;
    }
}
@media screen and (max-width: 400px) and (min-width: 380px) {
     .b-nav{
        width: 400px !important;
    }
    .b-client{
        width: 400px !important;
    }
    .b-header{
        width: 100% !important;
    }
    .features-content{
        width: 390px;
    }
    .b-timeline-row{
        width: 390px;
    }
    .b-timeline-container{
        width: 390px;
    }
    .col-lg-12{
        width: 390px;
    }
    .b-timeline-footer{
        width: 390px;
    }
    .b-timeline-container p{
        text-align: center;
    }
}
@media screen and (max-width : 420px) and (min-width: 410px){
      .b-nav{
        width: 420px !important;
    }
    .b-client{
        width: 420px !important;
    }
    .b-header{
        width: 100% !important;
    }
    .features-content{
        width: 410px;
    }
    .b-timeline-row{
        width: 410px;
    }
    .b-timeline-container{
        width: 410px;
    }
    .col-lg-12{
        width: 410px;
    }
    .b-timeline-footer{
        width: 410px;
    }
}
@media screen and (max-width : 920px) and (min-width: 900px){
   .b-header{
        width: 80%;
    }
    .b-nav{
        width: 100%;
    }
    .b-client{
        width: 900px;
    }
    .col-lg-12, .features-content, .b-timeline-footer, .b-timeline-container {
        width: 900px;
    }
}
@media screen and (max-width : 1024px) and (min-width: 1020px){
    .col-lg-12, .features-content, .b-timeline-footer, .b-timeline-container {
        width: 1024px;
    }
    .b-header{
        width: 100%;
    }
    .b-nav{
        width: 1024px !important;
    }
    .b-client{
        width: 1024px !important;
    }
}
@media screen and (max-width : 540px) and (min-width: 460px){
    .col-lg-12 {
        width: 100%;
    }
    .b-timeline-row{
        width: 100%;
    }
    .b-header{
        width: 540px;
    }
    .b-nav{
        width: 540px;
    }
    .b-client{
        width: 540px !important;
    }
    .b-timeline-container{
        width: 540px;
    }
    .b-timeline-footer{
        width: 540px !important;
    }
    .features-content{
        width: 540px;
    }
    .col-lg-12{
        width: 540px !important;
    }
}
@media screen and (max-width: 300px) and (min-width: 290px){
     .col-lg-12 {
        width: 100%;
        text-align: center;
    }
    .b-timeline-row{
        width: 280px;
    }
    .b-timeline-container{
        width: 280px;
    }
    .b-nav{
        width: 280px !important;
    }
    .b-client{
        width: 280px !important;
    }
    .b-header{
        width: 100% !important;
    }
    .col-lg-12 p{
        width: 200px;
    }

}
@media screen and (max-width: 380px) and (min-width: 350px){
    .col-lg-12{
        width: 375px !important;
    }
    .b-timeline-container{
        width: 375px;
    }
    .b-timeline-footer{
        width: 375px !important;
    }
    .features-content{
        width: 100%;
    }
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media (min-width: 1110px) {
    .features-content-left  {
        -ms-flex: 0 0 25%;
        flex: 0 0 25%;
        max-width: 25%;
    }
     .features-content-right  {
        -ms-flex: 0 0 25%;
        flex: 0 0 25%;
        max-width: 25%;
    }
     .features-content-mid  {
        -ms-flex: 0 0 50%;
        flex: 0 0 50%;
        max-width: 50%;
    }
}
/* @media (min-width: 768px){
    .features-content-left, .features-content-mid, .features-content-right {
    max-width: 720px;
}
}
@media (min-width: 576px){
    .features-content-left, .features-content-mid, .features-content-right {
    max-width: 540px;
}
} */
</style>
<script>
// @ is an alias to /src
import Header from '../../src/views/Login/Header.vue'
import Footer from '../../src/components/Footer.vue'
export default {
  name: 'Default',
  components: {
    Header,
    Footer
  }
}
</script>
