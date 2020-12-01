<template>
  <transition-group
    tag="ul"
    name="animation"
    class="list-unstyled d-flex flex-wrap justify-content-center align-items-center contain"
  >
    <face
      v-for="user in users"
      :key="user.id"
      :user="user"
      :disabled-users="disabledUsers"
      @face-clicked="$emit('face-clicked', $event)"
  /></transition-group>
</template>

<script>
export default {
  props: {
    users: { type: Array, required: true },
    disabledUsers: { type: Array, required: true },
  },
}
</script>

<style scoped>
.contain {
  max-width: 900px;
  margin: auto;
}

/* base */
.animation {
  backface-visibility: hidden;
  z-index: 1;
}

/* moving */
.animation-move {
  transition: all 600ms ease-in-out 50ms;
}

/* appearing */
.animation-enter-active {
  transition: all 400ms ease-out;
}

/* disappearing */
.animation-leave-active {
  transition: all 200ms ease-in;
  position: absolute;
  z-index: 0;
}

/* appear at / disappear to */
.animation-enter,
.animation-leave-to {
  opacity: 0;
}
</style>
