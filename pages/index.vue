<template>
  <section class="bg-[#f2f1f0]">
    <div class="container">
      <div
        class="font-extrabold border-[#004c76] border-b-8 text-2xl mx-4"
        :class="{'border-[#e1523d]': isSubmitted}"
      >
        <h1 v-if="!isSubmitted" class="bg-[#f2f1f0] p-4"> General English </h1>
        <h1 v-if="isSubmitted" class="bg-[#f2f1f0] p-4"> Test your English - your results</h1>
      </div>
      <div v-if="!isSubmitted">
        <QuestionList
          :questions="questions"
          :isSubmitted="isSubmitted"
          @submitAnswers="submitAnswers"
        />
      </div>
      <div v-if="isSubmitted" class="grid grid-cols-1 mx-4 my-7">
        <h2 class="font-semibold text-2xl">
          Well done for completing the test!
        </h2>

        <span class="font-bold text-[25px] mb-4">
          <strong>
            Your score is {{ points }} out of 25
          </strong>
        </span>

        <button class=" text-base text-white bg-[#333]">
          Review your answers
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Vue } from 'nuxt-property-decorator'

  export default Vue.extend({
    name: 'IndexPage',
    data() {
      return {
        questions: this.$store.state.questions,
        answers: [] as any,
        correctAnswers: this.$store.state.answers,
        points: 0,
        isSubmitted: false
      }
    },
    methods: {
      submitAnswers(answers: any): void {
        this.points = 0
        this.correctAnswers.forEach((a: string) => {
          if (answers.includes(a)) {
            this.points++
          }
        })
        this.isSubmitted = true
      }
    }
  })
</script>

<style lang="postcss" scoped>
  .container {
    @apply mt-5 border-[#004c76] bg-white;
    @apply max-w-[288px] md:max-w-[736px] lg:max-w-[952px];
    @apply mx-auto;
  }
</style>