export const state = () => ({
    questions: [],
    answers: []
  });
  
  export const mutations = {
    SET_QUESTIONS(state, value) {
      state.questions = value;
    },
    SET_ANSWERS(state, value) {
      state.answers = value;
    }
  };
  
  export const actions = {
    setQuestions({ commit }, value) {
      commit('SET_QUESTIONS', value);
    },
    setAnswers({ commit }, value) {
      commit('SET_ANSWERS', value[0].answerList);
    }
  };