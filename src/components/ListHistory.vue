<template>
  <div :class="{'navbar': !recentLinks}" style="height: calc(100% - 40px)" class="list-scroll" @scroll="scrollFunction">
    <div class="d-flex align-items-stretch flex-wrap">
      <div v-if="!recentLinks.length" class="ms-flex justify-content-center empty-case-div">
        <button class="btn ms-flex btn-primary pointer empty-case-btn align-items-center" @click="toggleModal">
            <i class="fas fa-plus-circle icon-plus"></i>
            <div>Rút gọn link</div>
        </button>
      </div>
      <div v-else>
        <div v-for="(link, index) in recentLinks" :key="link.Pathname">
        <div class="item-link"  :tabindex="`${index + 1}`" :class="{ 'item-selected': isSelectedLink[`${link.Pathname}`], 'first-active': index ===0}"
          @click="selectedLink(link, index)" @keydown.stop.enter="selectedLink(link, index)">
          <p class="text-muted mb-2">{{ convertDateFromTimestamp(link['Created']) }}</p>
          <div class="d-inline-block link-list-title">
            <span style="font-size:14px">{{ !link['Title'] ? 'Chưa có tiêu đề' : link['Title'] }}</span>
          </div>
          <div class="m-t-xs link-origin">{{ link['Url'] }}</div>
          <div class="m-t-xs link-short">{{ link['Hostname'] + '/' + link['Pathname'] }}</div>
          <p class="text-muted"><i class="fas fa-map-marker-alt"></i> Việt Nam</p>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { de } from 'element-plus/es/locale'
import { mapState, mapActions } from 'vuex'
import { getDateFromTimestamp } from '../app/date'
export default {
  name:'ListHistory',
  data() {
    return {
        isSelectedLink: {}
    }
  },
  computed: {
    ...mapState('link', ['recentLinks']),
    ...mapState('link', ['pageCount'])
  },
  async mounted() {
    await this.getRecentLinks({ page : 1 , filter: '' })

    this.$nextTick(() => {
      if(this.recentLinks.length > 0){
        //active link đầu tiên
      this.isSelectedLink[`${this.recentLinks[0].Pathname}`] = true;
      this.getLinkDetail({ pathName: this.recentLinks[0].Pathname, createdDate: this.recentLinks[0].Created, url: this.recentLinks[0].Url, title: this.recentLinks[0].Title });
      }
    })
  },
  methods: {
    ...mapActions('link', ['getRecentLinks']),
    ...mapActions('link', ['getLinkDetail']),
    ...mapActions('app', ['toggleModal']),
    ...mapActions('link', ['setPositionScroll']),
    /**
     * click hiển thị chi tiết link
     * author: DPQuy (1/8/2022)
     * **/
    selectedLink(link, index) {
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
      this.getLinkDetail({ pathName: link.Pathname, createdDate: link.Created, url: link.Url, title: link.Title });
      /* Kiểm tra độ phân giải màn hình để thực hiện chức năng của mobile */
      if (screen.width < 585) {
        document.querySelector('.detail').style.display = 'block';
        document.querySelector('.history').style.display = 'none';
      }
    },
    /**
     * lấy vị trí scrollbar
     * **/
    scrollFunction(e) {
        this.setPositionScroll((e.target.scrollTop / 3.72) + 'px');
    },
    convertDateFromTimestamp(timestamp) {
      return getDateFromTimestamp(timestamp)
    }
  },
  created() {

  }
}
</script>
<style scoped>
@import url(../css/layout/link-history.css);
</style>