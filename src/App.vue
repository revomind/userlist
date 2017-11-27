<template>
  <transition name="effect-fade-in" appear>
    <div id="app" class="container">
      <div class="section">
        <div class="tile is-ancestor">
          <div class="tile is-parent is-4">
            <div
              class="tile is-child"
              :class="{'box is-radiusless': !isMobile}"
            >
              <UserList/>
            </div>
          </div>
            <div :class="userDetailClasses">
              <div
                class="modal-background"
                v-if="isMobile"
                @click="setModal(false)"
              ></div>
              <div :class="[isMobile ? 'modal-content' : 'tile is-child']">
                <div class="box is-radiusless">
                  <UserDetail/>
                </div>
              </div>
              <button
                class="modal-close is-large is-danger"
                aria-label="close"
                v-if="isMobile"
                @click.stop="setModal(false)"
              ></button>
            </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    UserList,
    UserDetail
  },
  computed: {
    ...mapGetters(['isMobile', 'modal']),
    userDetailClasses () {
      return {
        modal: this.isMobile,
        'tile is-parent': !this.isMobile,
        'is-active': this.modal
      }
    }
  },
  methods: {
    ...mapActions(['setModal'])
  }
}
</script>