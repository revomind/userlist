import reject from 'lodash/reject'

export default {
  mediaChanged (state, value) {
    state.isMobile = value
    state.modal = false
  },
  usersUpdate (state, data) {
    state.users = data
  },
  usersRemove (state, index) {
    state.users = reject(
      state.users,
      user => index === user.index
    )
  },
  setModal (state, value) {
    state.modal = value
  },
  setDetails (state, data) {
    state.details = data
  }
}
