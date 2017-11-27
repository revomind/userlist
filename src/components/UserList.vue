<template>
<div class="has-text-centered">
  <div class="panel is-inline-block">
    <div class="field has-addons">
      <div class="control has-icons-left">
        <input
          type="text"
          class="input is-info is-shadowless"
          placeholder="Search..."
          autofocus
          v-model="query"
        >
        <span class="icon is-small is-left">
          <Icon name="user-o"/>
        </span>
      </div>
      <div class="control">
        <button
          class="button is-info is-shadowless"
          @click="reset"
        >reset</button>
      </div>
    </div>
  </div>
  <transition-group name="effect-list">
    <div
      class="panel"
      v-for="{index, picture, name, email} in filtered"
      :key="index"
    >
      <a class="is-unselectable" @click="select(index)">
        <div
          class="panel-block"
          :class="[
            index === selected && !isMobile
              ? 'is-selected'
              : 'has-bg-white'
            ]"
        >
          <div class="media">
            <div class="media-left">
              <figure class="image is-32x32">
                <img :src="picture" :alt="name">
              </figure>
            </div>
          </div>
          <div class="media-content">
            <p class="title is-5">{{ name }}</p>
            <p class="subtitle is-7">{{ email }}</p>
          </div>
          <a
            class="has-text-danger"
            @click.stop="remove(index)"
          >
            <div class="panel-right is-flex">
              <Icon name="times"/>
            </div>
          </a>
        </div>
      </a>
    </div>
  </transition-group>
  <div class="panel"></div>
  <div class="panel">
    <button
      class="button is-info is-fullwidth"
      @click="usersLoad('static/data/persons.json')"
    >reload deleted users</button>
  </div>
</div>
</template>

<script>
import 'vue-awesome/icons/user-o'
import 'vue-awesome/icons/times'
import Icon from 'vue-awesome/components/Icon'
import { mapGetters, mapActions } from 'vuex'
import filter from 'lodash/filter'
import find from 'lodash/find'
import pick from 'lodash/pick'

export default {
  name: 'UserList',
  components: {
    Icon
  },
  data () {
    return {
      query: '',
      selected: null,
      visible: []
    }
  },
  computed: {
    ...mapGetters([
      'isMobile',
      'users'
    ]),
    filtered () {
      this.visible = []
      return filter(this.users, user =>
        find(pick(user, ['name', 'company', 'email', 'address', 'about', 'phone']),
          prop => {
            var res = new RegExp(this.query, 'i').test(prop)
            if (res) this.visible.push(user.index)
            return res
          }
        )
      )
    }
  },
  watch: {
    filtered (val) {
      if (val.length && !this.visible.includes(this.selected)) {
        this.selected = val[0].index
        this.setDetails(val[0])
      }
    }
  },
  methods: {
    ...mapActions([
      'usersLoad',
      'usersRemove',
      'setModal',
      'setDetails'
    ]),
    reset () {
      this.query = ''
    },
    select (idx) {
      this.selected = idx
      this.setDetails(filter(this.filtered, user => idx === user.index)[0])
      this.setModal(true)
    },
    remove (idx) {
      this.usersRemove(idx)
    }
  },
  created () {
    this.selected = this.filtered[0].index
    this.setDetails(this.filtered[0])
  }
}
</script>