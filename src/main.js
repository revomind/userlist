import Vue from 'vue'
import App from './App'
import store from './store'
import { mapActions } from 'vuex'
import './assets/sass/main.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  template: '<App/>',
  components: { App },
  methods: {
    ...mapActions(['mediaChanged', 'usersLoad'])
  },
  async created () {
    const mql = window.matchMedia('(max-width: 768px)')

    this.mediaChanged(mql)
    mql.addListener(this.mediaChanged)

    await this.usersLoad('static/data/persons.json')
    this.$mount('#app')
  }
})
