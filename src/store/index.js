import { createStore } from 'vuex'
import getters from './getters'
import link from './modules/link'
import settings from './modules/settings'
import user from './modules/user'
import app from './modules/app'
export default createStore({
    modules: {
        link,
        settings,
        user,
        app
    },
    getters
})