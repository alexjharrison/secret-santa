<template>
  <div>
    <h1 class="h3 mt-3">White, Karlovic, Harrison Secret Santa</h1>
    <transition name="fade" mode="out-in">
      <info-form
        v-if="isShowingForm"
        :user-id="personChoosing"
        :all-users="allUsers"
        :deselected-users="disabledUsers"
        @go-back="
          isShowingForm = false
          scrollToTop()
        " />
      <div v-else>
        <p class="h5">{{ instruction }}</p>
        <face-grid
          :users="users"
          :disabled-users="disabledUsers"
          @face-clicked="handleFaceClicked"
        />
        <b-button
          v-if="personChoosing"
          class="mt-3 mb-4"
          size="lg"
          variant="outline-danger"
          @click="
            isShowingForm = true
            scrollToTop()
          "
        >
          <b-icon-tree-fill variant="success" />
          Confirm
          <b-icon-tree-fill variant="success" />
        </b-button></div
    ></transition>
  </div>
</template>

<script>
import { BIconTreeFill } from 'bootstrap-vue'
export default {
  components: { BIconTreeFill },
  async asyncData({ $http }) {
    const users = await $http.$get('/api')
    return { users, allUsers: users }
  },
  data: () => ({
    disabledUsers: [],
    isShowingForm: false,
    personChoosing: null,
    instruction: 'Who are you?',
  }),
  beforeMount() {
    this.disabledUsers = this.users
      .filter(user => !!user.address)
      .map(user => user.id)
  },
  methods: {
    handleFaceClicked(faceId) {
      if (!this.personChoosing && !this.disabledUsers.includes(faceId)) {
        this.users = this.users.filter(user => user.id !== faceId)
        this.personChoosing = faceId
        this.disabledUsers = []

        this.instruction =
          'Click to gray out the people you want excluded from your secret santa giftees then hit confirm below'

        this.scrollToTop()
      } else if (this.personChoosing && this.disabledUsers.includes(faceId)) {
        this.disabledUsers = this.disabledUsers.filter(id => id !== faceId)
      } else if (this.personChoosing) {
        this.disabledUsers = [...this.disabledUsers, faceId]
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
