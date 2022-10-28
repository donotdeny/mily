<template>
  <div class="home">
    <TheHeader />
    <TheContent />
    <LinkModal 
      v-if="isShowModal"
      />
      <TheLoading v-if="isLoading"/>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
import TheContent from '../components/TheContent.vue'
import { mapState, mapActions } from 'vuex'
import LinkModal from '../components/LinkModal.vue'
import TheLoading from '../components/TheLoading.vue'
export default {
  name: 'Home',
  components: {
    TheHeader,
    TheContent,
    LinkModal,
    TheLoading
  },
  methods: {
    ...mapActions('app', ['toggleModal']),
    ...mapActions('app', ['setModeModal']),
    ...mapActions('link', ['setShowLoading']),
    /**
     * đóng popup
     * author: DPQuy (2/8/2022)
     * **/
    closePopup () {
      this.showPopup(false);
      //this.isShowPopup = false;
    }
  },
  created() {
    //show loading
     this.setShowLoading(true)
    /**
     * ấn phím m để show popup
     * author: DPQuy (2/8/2022)
     * **/
    window.addEventListener('keydown', (e) => {
      if (e.key === 'm' || e.key === 'M') {
        this.showPopup(true);
      }
    })
  },
  computed: {
    ...mapState('link', ['linkDetail']),
    ...mapState('app', ['isShowModal']),
    ...mapState('app', ['modeModal']),
    ...mapState('link', ['isLoading'])
  },
  mounted() {
   
  }
}
</script>
<style>
@import url(../css/layout/layout.css);
@import url(../css/base/icon.css);
html{
  overflow-y: hidden;
}
.home{
  position: relative;
}
</style>
