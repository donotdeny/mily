<template>
  <div class="link-history">
    <div class="close-dropdown" @click="closeDropFolder" v-if="isShowDropFolder | isShowDropLink"></div>
    <div class="ms-dropdown ms-dropdown-animated-downOut" :style="{top: topDropfolder, left: leftDropFolder}" v-if="isShowDropFolder">
        <ul class="menu-dropdown">
          <li>Đổi tên</li>
          <li @click="showMessDelete">Xóa</li>
        </ul>
    </div>

    <div class="ms-dropdown ms-dropdown-animated-downOut" id="ms-d-2" :style="{top: topDropfolder, left: leftDropFolder}" v-if="isShowDropLink">
        <ul class="menu-dropdown" id="m-n-2">
          <li @click="showSubMenu">Di chuyển <i class="fas fa-angle-right"></i></li>
          <li @click="ShowDeleteSubMenu">Xóa</li>
        </ul>
        <ul class="menu-dropdown ms-dropdown-animated-rotateY" id="m-p-2" v-if="isSubMenu" >
          <li><i class="fas fa-folder icon-folder"></i><span>Điều hướng trang web</span></li>
          <li><i class="fas fa-folder icon-folder"></i><span>Điều hướng chợ ứng dụng</span></li>
        </ul>
    </div>
    <!-- v-for="(link, index) in recentLinks" :key="link.Pathname" -->
    <div class="link-item m-b-8">
      <!-- :tabindex="`${index + 1}`" -->
      <div class="ms-flex align-items-center link-item-title">
        <div class="link-title-logo m-r-8px"> <i class="fas fa-folder icon-folder"></i> </div>
        <div class="link-title-content">Điều hướng trang web</div>
        <div class="link-title-dot pointer" @click="showDropdownFolder($event)"><i class="fas fa-ellipsis-h icon-dot"></i></div>
      </div>
      <div class="link-content" v-for="link in recentLinks" :key="link.Pathname">
        <div class="link-content-item" :class="{ 'item-selected': isSelectedLink[`${link.Pathname}`]}" @click="selectedLink(link)">
          <div class="link-content-title m-b-8">
          <div class="link-content-text">{{link['Title'] === '' ? 'Chưa có tiêu đề' : link['Title']}}</div>
          <div class="link-title-dot pointer" @click="showDropDownLink($event)"><i class="fas fa-ellipsis-h icon-dot"></i></div>
          </div>
          <div class="link-content-main">
            <div class="link-main m-b-4">{{link.URL}}</div>
            <div class="link-short">{{link.Hostname +'/'+link.Pathname}}</div>
          </div>
        </div>
      </div>

      <div class="link-item-footer">
        <button class="out-line-none border-none pointer btn-transparent btn-text-primary">Xem thêm 2 Shortlink
          khác</button>
      </div>
    </div>


    <div class="link-item m-b-8">
      <!-- :tabindex="`${index + 1}`" -->
      <div class="ms-flex align-items-center link-item-title">
        <div class="link-title-logo m-r-8px"> <i class="fas fa-folder icon-folder"></i> </div>
        <div class="link-title-content">Điều hướng trang web</div>
        <div class="link-title-dot pointer" @click="showDropdownFolder($event)"><i class="fas fa-ellipsis-h icon-dot"></i></div>
      </div>
      <div class="link-content">
        <div class="link-content-item">
          <div class="link-content-title m-b-8">
          <div class="link-content-text">Chưa có tiêu đề</div>
          <div class="link-title-dot pointer"><i class="fas fa-ellipsis-h icon-dot"></i></div>
          </div>
          <div class="link-content-main">
            <div class="link-main m-b-4">http://dribbblecom/shots/19016186-Dashboar...</div>
            <div class="link-short">mily.vn/aGty89</div>
          </div>
        </div>
        <div class="link-content-item">
          <div class="link-content-title m-b-8">
          <div class="link-content-text">Chưa có tiêu đề</div>
          <div class="link-title-dot pointer"><i class="fas fa-ellipsis-h icon-dot"></i></div>
          </div>
          <div class="link-content-main">
            <div class="link-main m-b-4">http://dribbblecom/shots/19016186-Dashboar...</div>
            <div class="link-short">mily.vn/aGty89</div>
          </div>
        </div>
      </div>

      <div class="link-item-footer">
        <button class="out-line-none border-none pointer btn-transparent btn-text-primary">Xem thêm 2 Shortlink
          khác</button>
      </div>
    </div>


    <div class="position-relative ms-flex align-items-center pointer">
      <button class="w-100 border-none btn-add text-left pointer">Thêm thư mục Shortlink</button>
      <i class="fas fa-folder-plus icon-add-folder"></i>
    </div>
  </div>
  <TheDelete v-if ="isShowDelete"/>
</template>
<script>
// import { de } from 'element-plus/es/locale'
import { mapState, mapActions } from 'vuex'
import { getDateFromTimestamp } from '../app/date'
import TheDelete from './TheDelete.vue'
import { misaResoure } from '../Enums/misaResoure'
export default {
  components :{
    TheDelete
  },
  data() {
    return {
      isSelectedLink: {},
      topDropfolder: '0',
      leftDropFolder: '0',
      isShowDropFolder: false,
      isShowDropLink: false,
      isSubMenu: false
    }
  },
  computed: {
    ...mapState('link', ['recentLinks']),
    ...mapState('link', ['pageCount']),
    ...mapState('link', ['isShowDelete'])
  },
  async mounted() {
    await this.getRecentLinks(this.pageCount)

    this.$nextTick(() => {
      this.getLinkDetail({ pathName: this.recentLinks[0].Pathname, createdDate: this.recentLinks[0].Created, url: this.recentLinks[0].URL, title: this.recentLinks[0].Title })
      //active link đầu tiên
      this.isSelectedLink[`${this.recentLinks[0].Pathname}`] = true;
      this.getLinkDetail({ pathName: this.recentLinks[0].Pathname, createdDate: this.recentLinks[0].Created, url: this.recentLinks[0].URL })
    })
  },
  methods: {
    ...mapActions('link', ['getRecentLinks']),
    ...mapActions('link', ['getLinkDetail']),
    ...mapActions('app', ['toggleModal']),
    ...mapActions('link', ['showDelete']),
    /**
     * click hiển thị chi tiết link
     * author: DPQuy (1/8/2022)
     * **/
    selectedLink(link) {
      this.isSelectedLink = {}
      //thêm class hiển thị đang selected
      //1.đang ẩn thì hiển thị
      //2.đang hiển thị thì ẩn
      if (this.isSelectedLink[`${link.Pathname}`]) {
        this.isSelectedLink[`${link.Pathname}`] = false;
      } else {
        this.isSelectedLink[`${link.Pathname}`] = true;
      }
      /* lấy link chi tiết */
      this.getLinkDetail({ pathName: link.Pathname, createdDate: link.Created, url: link.URL, title: link.Title });
      /* Kiểm tra độ phân giải màn hình để thực hiện chức năng của mobile */
      if (screen.width < 585) {
        document.querySelector('.detail').style.display = 'block';
        document.querySelector('.history').style.display = 'none';
      }
    },
    convertDateFromTimestamp(timestamp) {
      return getDateFromTimestamp(timestamp)
    },
    /**
     * hiển thị form xóa
     * author: DPQuy (12/8/2022)
     * **/
    showMessDelete(){
      this.showDelete(misaResoure.VI.msgDeleteFolder);
      this.isShowDropFolder = false;
    },
    /**
     * click nút xóa ở item link
     * author: DPQuy (12/08/2022)
     * **/
    ShowDeleteSubMenu() {
      this.showDelete(misaResoure.VI.msgDeleteLink);
      this.isShowDropLink = false;
      this.isSubMenu = false;
    },
    /**
     * Hàm show dropdown ở title thư mục
     * author: DPQuy (12/8/2022)
     * **/
    showDropdownFolder(event) {
        this.isShowDropFolder = true;
        this.isShowDropLink = false;
        this.isSubMenu = false;
        //lấy vị trí hiển thị 
        this.topDropfolder = (event.clientY + 10) + 'px';
        this.leftDropFolder = (event.clientX - 20) + 'px';
    },
    /**
     * hiển thị dropdown ở link
     * author: DPQuy (12/8/2022)
     * **/
    showDropDownLink(event) {
       this.isShowDropLink = true;
       this.isShowDropFolder = false;
        this.topDropfolder = (event.clientY + 10) + 'px';
        this.leftDropFolder = (event.clientX - 20) + 'px';
    },
    /**
     * ẩn/ hiển sub menu
     * author: DPQuy (12/08/2022)
     * **/
    showSubMenu() {
      this.isSubMenu = !this.isSubMenu;
    },
    /**
     * Đóng dropdown ở title thư mục link
     * **/
    closeDropFolder(){
      this.isShowDropFolder = false;
      this.isSubMenu = false;
      this.isShowDropLink = false;
    }
  },
  created() {

  }
}
</script>
<style scoped>
@import url(../css/layout/linkhistory-new.css);
</style>