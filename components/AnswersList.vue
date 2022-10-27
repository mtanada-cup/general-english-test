<template>
  <section class="answers-container">
    <div v-for="(answer, i) in answers" :key="i"
      class="m-10"
    >
      {{ answer }}
    </div>
  </section>
</template>

<script lang="ts">
  import { Vue } from 'nuxt-property-decorator'

  export default Vue.extend({
    data() {
      return {
        answers: []
      }
    },
    mounted() {
      this.answers = this.$store.state.answers
    }
  })
</script>

<style lang="postcss" scoped>
  .answers-container {
    @apply mt-10 pt-10 max-w-7xl mx-auto;
  }
</style>