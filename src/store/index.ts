import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import ui from './modules/ui'
import localStorage from './modules/localStorage'
import weather from './modules/weather'
import cities from './modules/cities'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    ui,
    localStorage,
    weather,
    cities
  }
})
