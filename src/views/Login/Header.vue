<template>
  <nav class="b-client" ref="headRef">
    <div class="b-header">
      <div class="b-nav">
         <span class="b-header-branch">
        <img class="b-logo" src="../../assets/shortlogo.png" />
      </span>
      <div class="b-header-right">
        <ul class="b-header-link">
          <li class="b-header-link-content">
            <a class="b-header-link-item">Đăng ký </a>
          </li>
          <li class="b-header-link-content" @click="btnLogin">
            <a class="b-header-link-item">Đăng nhập </a>
          </li>
          <li class="b-header-dropdown">
            <a class="dropdown-language" @click="openLanguageList">Ngôn ngữ</a>
            <ul class="b-language dropdown" v-if="isShowOpenListLanguage">
              <li class="b-language-item">
                <img src="../../assets/en.png" />
                <p>English</p>
              </li>
              <li class="b-language-item">
                <img src="../../assets/vi.png" />
                <p>Việt Nam</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      </div>
      <div class="b-nav-respon" v-if="isShowListNav">
        <ul class="b-header-link">
          <li class="b-header-link-content">
            <a class="b-header-link-item">Đăng ký </a>
          </li>
          <li class="b-header-link-content">
            <a class="b-header-link-item">Đăng nhập </a>
          </li>
          <li class="b-header-dropdown">
            <a class="dropdown-language" @click="openLanguageList">Ngôn ngữ</a>
            <ul class="b-language dropdown" v-if="isShowOpenListLanguage">
              <li class="b-language-item">
                <img src="../../assets/en.png" />
                <p>English</p>
              </li>
              <li class="b-language-item">
                <img src="../../assets/vi.png" />
                <p>Việt Nam</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" @click="toggleListNav">
                            <i class="fa fa-bars">
                            </i>
    </button>
  </nav>
</template>
<style>
.b-client {
  width: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 1000;
}
.b-nav{
    display: flex;
  align-items: center;
  width: 1110px;
  padding-left: 15px;
  padding-right: 15px;
  justify-content: space-between;
  color: #fff;
  height: 67px;
}
.b-header-branch {
  background-color: #fff;
  color: #fff;
  height: auto;
  display: block;
  font-size: 14px;
  padding: 15px 20px 15px 20px;
  border-radius: 0 0 5px 5px;
  font-weight: 700;
  transition: all 0.3s ease-in-out 0s;
  margin-top: -16px;
  position: relative;
}
.b-logo {
  height: 25px;
}
.b-header-right {
  display: flex;
}
.b-header-link {
  display: flex;
}
.b-header-dropdown {
  display: flex;
  position: relative;
}
.b-nav-respon{
  display: flex;
  margin-top: -15px ;
  flex-direction: column;
}
.b-nav-respon li{
  list-style: none;
  height: 67px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.b-nav-respon li a{
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 14px;
    color: #676a6c;
}
.b-nav-respon li a:hover{
      color: #1ab394;
}
.b-nav-respon ul{
  display: flex;
  flex-direction: column;
}
.b-header-right li {
  list-style: none;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
}
.b-header-right li a {
    cursor: pointer;
  color: #fff;
  font-family: "Open Sans", helvetica, arial, sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 14px;
  text-decoration: none;
}
.b-header-right li a:hover {
  color: #ff8500;
  background: inherit;
}
.b-language{
    border: medium none;
    border-radius: 3px;
    box-shadow: 0 0 3px rgb(86 96 117 / 70%);
    float: left;
    font-size: 12px;
    left: 0;
    list-style: none outside none;
    padding: 0;
    position: absolute;
    text-shadow: none;
    top: 100%;
    z-index: 1000;
}
.b-header-dropdown .dropdown{
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    box-sizing: border-box;
    /* display: none; */
    min-width: 160px;
    height: 64px;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 0.25rem;
    padding-left: 10px;
}
.b-language-item{
  display: flex;
  height: 32px;
  text-align: center;
}
.b-language-item p{
  padding: 0;
  padding-left: 10px;
  padding-top: 0;
  padding-bottom: 0;
}
.b-language-item img{
  width: 32px;
  height: 32px;
}
.b-header-dropdown .dropdown-language::after{
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: "";
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
}
.scrolled{
    background-color: #fff;
    animation: 0.25s;
}
.scrolled .b-header-branch{
  margin-top: 5px;
}
.scrolled .b-header-link-item{
  color: #676a6c;
}
.scrolled .dropdown-language{
  color: #676a6c;
}
.scrolled .b-header-right li a:hover {
  color: #1ab394;
}
fa {
  display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
}
.navbar-toggler{
    background-color: #1ab394;
    color: #fff;
    padding: 6px 12px;
    font-size: 14px;
    margin: 8px;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    display: none;
    position: absolute;
    top: 4px;
    right: 20px;

}
button{
  border : 0;
  cursor: pointer;
}
.b-header-respon li{
  list-style: none;
}
@media only screen and (max-width: 768px) {
    .navbar-toggler{
      display: block;
    }
    .b-header-right{
      display: none;
    }
}
@media only screen and (min-width: 1140px) {
    .navbar-toggler{
      display: none;
    }
}
</style>
<script>
// @ is an alias to /src

import { login } from '../../api/user.js'
export default {
  name: 'Header',
  data () {
    return {
      isShowOpenListLanguage: false,
      isShowListNav : false
    }
  },
  methods: {
    vueOnScroll () {
      var prev = window.pageYOffset
      const refs = this.$refs.headRef
      window.addEventListener('scroll', () => {
        var curr = window.pageYOffset
        if (prev > 200) {
          refs.classList.add('scrolled')
          refs.classList.remove('scrollDown')
        } else {
          refs.classList.add('scrollDown')
          refs.classList.remove('scrolled')
        }
        if (curr === 0) {
          refs.classList.remove('scrollDown')
          refs.classList.remove('scrolled')
        }
        prev = curr
      })
    },
    openLanguageList () {
      this.isShowOpenListLanguage = !this.isShowOpenListLanguage
    },
    btnLogin() {
      login().then(function(res) {
        console.log(res);
          window.open(res, '_self');
      })
    },
    toggleListNav () {
      this.isShowListNav = !this.isShowListNav;
    }
  },
  mounted () {
    this.vueOnScroll()
  }
}
</script>
