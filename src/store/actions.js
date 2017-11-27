import axios from 'axios'

export default {
  mediaChanged ({commit}, mql) {
    mql.matches
      ? commit('mediaChanged', true)
      : commit('mediaChanged', false)
  },
  async usersLoad ({commit}, url) {
    const response = await axios.get(url)
    commit('usersUpdate', response.data)
  },
  usersRemove ({commit}, index) {
    commit('usersRemove', index)
  },
  setModal ({commit}, value) {
    commit('setModal', value)
  },
  setDetails ({commit}, data) {
    commit('setDetails', data)
  }
}
