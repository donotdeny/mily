<template>
  <div class="content">
    <div class="history">
      <div class="slimScrollRail" v-if="x"><div class="slimScrollBar" :style="{top: topScroll}"></div></div>
      <ListHistory/>
      <div class="ms-pagination">
        <Paginate :page-count="pageCount" :page-range="3" :margin-pages="1" :click-handler="clickCallback"
          :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
        </Paginate>
      </div>
    </div>
    <div class="detail"><LinkDetail /></div>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate-next';
import ListHistory from './ListHistory.vue'
// import LinkHistoryNew from './Link-History-New.vue'
import LinkDetail from './LinkDetail.vue'
import { mapState,mapActions } from 'vuex'
export default {
  data() {
    return {
    }
  },
  components: {
    // LinkHistoryNew,
    Paginate,
    ListHistory,
    LinkDetail
  },
  methods: {
    ...mapActions('link', ['getRecentLinks']),
    ...mapActions('link', ['setPositionScroll']),
    clickCallback(pageNum){
      this.getRecentLinks({ page : pageNum , filter: this.filter })
      this.setPositionScroll(0 + 'px');
    }
  },
  computed: {
    ...mapState('link', ['linkDetail']),
    ...mapState('link', ['pageCount']),
    ...mapState('link', ['topScroll']),
    ...mapState('link', ['filter'])
  }
}
</script>

<style>
@import url(../css/layout/content.css);
@import url(../css/layout/link-history.css)
</style>
