<template>
  <li>
    <b-img
      :src="imgSrc"
      class="img m-1"
      :class="isDisabled && 'disabled'"
      @click="$emit('face-clicked', user.id)"
    />
  </li>
</template>

<script>
export default {
  props: {
    user: { type: Object, required: true },
    disabledUsers: { type: Array, required: true },
  },
  computed: {
    imgSrc() {
      return `/people/${this.user.name}.png`
    },
    isDisabled() {
      return this.disabledUsers.includes(this.user.id)
    },
  },
}
</script>

<style scoped>
.img {
  max-width: 140px;
  height: auto;
  border-radius: 15px;
  transition: opacity 0.2s ease-out;
  cursor: pointer;
}

.disabled {
  opacity: 0.4;
}
</style>
