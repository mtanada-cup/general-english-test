<template>
  <section class="question-container">
    <div class="m-4">
      <h1 class="font-extrabold text-2xl my-4" :class="{'hidden': isSubmitted}"> Test your English </h1>
      <p class="my-10">
        For the questions below, please choose the best option to complete the sentence or conversation.
      </p>

      <div class="page-text">
        Page {{ pageCount }} of {{ batchCount }}
      </div>
      <div class="bar-container">
        <div class="bar-width" :style="barWidthCalculated"></div>
      </div>

      <fieldset v-for="(item, i) in currentPageQuestions" :key="i">
        <legend class="py-4">
          <span class="question-count">
            <strong>{{ ((pageCount - 1) * questionsPerPage) + ++i }}</strong>
          </span>
          <span>
            {{ item.question }}
          </span>
        </legend>
        <div v-for="(choice, c) in item.choices" :key="c"
          class="choices"
        >
          <input
            type="radio"
            :name="setIndex(i, choice)"
            :value="choice"
            @change="addAnswers(i, choice)"
          >
          <label :for="choice">
            {{ choice }}
          </label>
        </div>
      </fieldset>
    </div>
    
    <div class="m-20">
      <span v-if="message !== ''"
        class="font-extrabold text-black"
      >
        {{ message }}
      </span>
    </div>
    <div class="m-10" :class="{'invisible': isSubmitted}">
      <button class="btn-next-submit"
        @click="submitAnswers"
      >
      <span v-if="isLastPage" >
        Get Result
      </span>
      <span v-else>
        Next
      </span>
      </button>
    </div>
  </section>
</template>

<script lang="ts">
  import { Vue } from 'nuxt-property-decorator'

  export default Vue.extend({
    props: {
      questions: {
        type: Array,
        required: true
      },
      isSubmitted: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        answers: [] as any,
        batchQuestions: [] as any,
        batchCount: 0,
        pageCount: 0,
        currentQuestionIndex: 0,
        lastQuestionIndex: 0,
        message: '',
        questionsPerPage: 5,
        isLastPage: false
      }
    },
    mounted() {
      console.log('q count: ', this.questions.length)
      if (this.questions.length > this.questionsPerPage) {        
        this.batchCount = Math.ceil(this.questions.length / this.questionsPerPage)
        console.log('this.batchCount: ', this.batchCount)
        
        // batchCount = 10 / 5 = 2
        this.batchQuestions = this.questions.slice(
          this.currentQuestionIndex,
          this.lastQuestionIndex + this.questionsPerPage)
        
        this.pageCount++
        this.lastQuestionIndex = this.batchQuestions.length
        console.log('this.pageCount: ', this.pageCount)
      }
    },
    computed: {
       // computed property to set the items visible on current page
      currentPageQuestions(): void {
        console.log('comp: ', this.batchQuestions)
        console.log('range 1: ', (this.pageCount - 1) * this.questionsPerPage)
        console.log('range 2: ', this.pageCount * this.questionsPerPage)
        return this.batchQuestions.slice(
          (this.pageCount - 1) * this.questionsPerPage,
          this.pageCount * this.questionsPerPage
        )
      },
      barWidthCalculated(): any {
        return {
          width: (this.pageCount/this.batchCount) * 100 + '%'
        }
      }
    },
    // watch: {
    //   batchQuestions(newVal) {
    //      console.log('watch: ', this.batchQuestions)
    //     this.currentPageQuestions = newVal.slice((this.currentPage - 1) * this.questionsPerPage, this.currentPage * this.questionsPerPage)
    //   }
    // },
    methods: {
      async addAnswers(index: number, answer: string): Promise<void> {
        const answerIndex = await this.setIndex(index, answer)
        this.answers[answerIndex - 1] = answer
        console.log('answers: ', this.answers)
      },
      submitAnswers(): void {
        const checkPage = this.batchCount
        this.isLastPage =  this.pageCount === checkPage-1 ? true : false
        if (this.answers.length < this.questionsPerPage) {
          this.message = 'You must answer all questions before proceeding.'
        } else {
          console.log('before this.batchQuestions: ', this.batchQuestions)
          console.log('this.lastQuestionIndex: ', this.lastQuestionIndex)
          console.log('append: ', this.lastQuestionIndex + this.questionsPerPage)

          if (this.pageCount < this.batchCount) {
            this.batchQuestions = ([] as any[]).concat( this.batchQuestions,
              this.questions.slice(
                this.lastQuestionIndex, this.lastQuestionIndex + this.questionsPerPage
              )
            )
            console.log('after this.batchQuestions: ', this.batchQuestions)
            this.lastQuestionIndex = this.batchQuestions.length
            this.pageCount++
          } else {
            this.$emit('submitAnswers', this.answers)
            this.isLastPage = true
          }
        }
      },
      setIndex(index: number, choice: string): any {
        console.log('index: ', index)
        console.log('name: ', ((this.pageCount - 1) * this.questionsPerPage) + index)
        console.log('choice: ', choice)
        return ((this.pageCount - 1) * this.questionsPerPage) + index
      }
    }
  })
</script>

<style lang="postcss" scoped>
  .question-container {
    @apply pb-10 max-w-7xl mx-auto;
  }

  .question-count {
    @apply font-bold border-black items-center leading-4 text-white;
    @apply mx-1 text-center bg-[#212121] border-8;

    border-radius: 50%;
  }

  .page-text {
    @apply mb-1 text-base font-medium justify-center;
  }

  .bar-container {
    @apply w-full bg-gray-200 rounded-full h-1.5 mb-4;
  }

  .bar-width {
    @apply bg-blue-600 h-1.5;
  }

  .choices {
    @apply p-2 m-2 rounded w-1/2 bg-[#fafafa];

    outline: solid 1px gray;

    input:hover, textarea:hover {
      @apply border-0 bg-[#0091ea];
      /* border: 0 none;
      background: blue; */
    }

    &:hover {
      outline: solid 1px #0091ea;
    }
  }

  .btn-next-submit {
    @apply font-bold text-white;
    @apply border-blue-500 bg-[#0091ea] p-2 rounded;
  }
</style>