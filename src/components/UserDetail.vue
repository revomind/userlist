<template>
<article>
  <div class="columns">
    <div class="column is-narrow has-text-centered ">
      <figure class="image is-128x128 is-inline-block">
        <img src="https://placehold.it/128x128">
      </figure>
    </div>
    <div class="column">
      <h1
        class="title is-marginless"
        :class="{'has-text-centered': isMobile}"
      >{{ details.name }}</h1>
      <h3
        class="is-size-7"
        :class="{'has-text-centered': isMobile}"
      >{{ details.company }} - {{ details.email }}</h3>
    </div>
  </div>
  <p>
    <strong>About:</strong> {{ details.about }}
  </p>
  <hr>
  <div class="media">
    <figure class="media-left">
      <Icon name="home"/>
    </figure>
    <div class="media-content">
      <div class="content">
        <p v-html="address"></p>
      </div>
    </div>
  </div>
  <div class="media is-borderless is-marginless">
    <figure class="media-left">
      <Icon name="phone-square"/>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>{{ details.phone }}</p>
      </div>
    </div>
  </div>
</article>
</template>

<script>
import { mapGetters } from 'vuex'
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/phone-square'
import Icon from 'vue-awesome/components/Icon'

export default {
  name: 'UserDetail',
  components: {
    Icon
  },
  computed: {
    ...mapGetters(['isMobile', 'details']),
    address () {
      return this.details.address.replace(/, /g, '<br>')
    }
  }
}
</script>