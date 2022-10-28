<template lang="">
    <div>
         <QRCodeVue3 id='qr-modal' v-if="true" :width="120" :height="120" 
                                    :value="'https://test-mily.misa.com.vn/' + pathname"
                                    :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
                                    :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }" :dotsOptions="{
                                        type: 'squares',
                                        color: color,
                                        gradient: {
                                            type: 'linear',
                                            rotation: 0,
                                            colorStops: [
                                                { offset: 0, color: color },
                                                { offset: 1, color: color},
                                            ],
                                        },
                                    }" :backgroundOptions="{ color: '#ffffff' }"
                                    :cornersSquareOptions="{ type: 'square', color:  color }"
                                    :cornersDotOptions="{ type: 'square', color: '#1ab394' }" fileExt="png" myclass="my-qur"
                                    imgclass="img-qr" />
    </div>
</template>
<script>
import QRCodeVue3 from 'qrcode-vue3'
export default {
    components: {
        QRCodeVue3
    },
    props : {
        pathname: String,
        color : String
    }
}
</script>
<style>
    
</style>