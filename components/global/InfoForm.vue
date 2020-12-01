<template>
  <thank-you v-if="isFinished" />
  <b-form v-else @submit.prevent="handleSubmit">
    <h4>Hi {{ userInfo.name }}</h4>
    <p class="mt-4 mb-1">
      You want to give gifts to
      <span class="font-weight-bold">{{ giftRecipients }}</span>
    </p>
    <b-button
      size="sm"
      variant="info"
      class="d-flex justify-content-center align-items-center m-auto"
      @click="$emit('go-back')"
      ><b-icon-caret-left-square-fill
        size="sm"
        class="mr-2"
        font-scale=".9"
      />Edit this list</b-button
    >

    <label for="email" class="font-weight-bold mt-5"
      >Enter your email address</label
    >
    <b-form-input id="email" v-model="email" type="email" required />

    <label for="address" class="font-weight-bold mt-4"
      >Enter your mailing address</label
    >
    <b-form-input id="address" v-model="address" required />

    <label for="stores" class="font-weight-bold mt-4"
      >What are your favorite stores to shop at?</label
    >
    <b-form-input id="stores" v-model="answers[0]" required />

    <label for="foods" class="font-weight-bold mt-4"
      >What are your favorite foods?</label
    >
    <b-form-input id="foods" v-model="answers[1]" required />

    <label for="drinks" class="font-weight-bold mt-4"
      >What is your favorite drink?</label
    >
    <b-form-input id="drinks" v-model="answers[2]" required />

    <label for="spare_time" class="font-weight-bold mt-4"
      >What do you do in your spare time?</label
    >
    <b-form-input id="spare_time" v-model="answers[3]" required />

    <label for="new" class="font-weight-bold mt-4"
      >What is something new you've been wanting to try?</label
    >
    <b-form-input id="new" v-model="answers[4]" required />

    <label for="gifts" class="font-weight-bold mt-4"
      >Which words do you associate with the best gifts?</label
    >
    <b-checkbox-group
      id="gifts"
      v-model="answers[5]"
      :options="giftOptions"
      class="d-flex justify-content-between flex-wrap px-5 mw-900 mb-4"
    />

    <b-alert
      :show="Boolean(errorMsg)"
      variant="danger"
      dismissible
      @dismissed="errorMsg = ''"
      >{{ errorMsg }}</b-alert
    >

    <b-button
      variant="danger"
      class="my-5"
      :disabled="isSubmitting"
      type="submit"
      ><b-icon-tree-fill variant="success" /> Submit
      <b-icon-tree-fill variant="success"
    /></b-button>
  </b-form>
</template>

<script>
import { BIconCaretLeftSquareFill, BIconTreeFill } from 'bootstrap-vue'
export default {
  components: { BIconCaretLeftSquareFill, BIconTreeFill },
  props: {
    userId: { type: Number, required: true },
    allUsers: { type: Array, required: true },
    deselectedUsers: { type: Array, required: true },
  },
  data: () => ({
    address: '',
    email: '',
    answers: ['', '', '', '', '', []],
    isSubmitting: false,
    isFinished: false,
    errorMsg: '',
    giftOptions: [
      'Food',
      'Cooking',
      'Clothing',
      'Gadgets',
      'Helpful',
      'Funny',
      'Unusual',
      'Reading',
      'Movies',
      'Sports',
      'Games',
      'Outdoors',
      'Pets',
      'Meaningful',
      'Homemade',
    ],
  }),
  computed: {
    userInfo() {
      return this.allUsers.find(user => user.id === this.userId)
    },
    giftRecipients() {
      const recipients = this.allUsers
        .filter(user => !this.deselectedUsers.includes(user.id))
        .filter(user => this.userId !== user.id)
        .map(user => user.name)

      if (recipients.length === 0) return 'No One'
      else if (recipients.length === 1) return recipients[0]

      const last = recipients[recipients.length - 1]
      const arrWithoutLast = recipients.slice(0, recipients.length - 1)
      return arrWithoutLast.join(', ') + ' or ' + last
    },
  },
  methods: {
    handleSubmit() {
      this.isSubmitting = true
      const payload = {
        id: this.userId,
        answers: this.answers,
        email: this.email,
        address: this.address,
        disincludes: this.deselectedUsers,
      }
      this.$http
        .$post('/api', payload)
        .then(() => {
          this.isFinished = true
        })
        .catch(() => {
          this.errorMsg = 'Something Broke. Blame Alex'
        })
        .finally(() => {
          this.isSubmitting = false
        })
    },
  },
}
</script>

<style>
.form-control {
  max-width: 800px;
  margin: auto;
  text-align: center;
}
.mw-900 {
  max-width: 900px;
  margin: auto;
}
</style>
