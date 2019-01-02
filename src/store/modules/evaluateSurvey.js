import request from '@/utils/request'

const evaluateSurvey = {
  state: {
    isEvaluateSurveyDetailLoading: false,
    evaluateSurveyDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_EVALUATESURVEY_DETAIL_LOADING: (state, data) => {
      state.isEvaluateSurveyDetailLoading = data
    },
    SET_MODULES_EVALUATESURVEY_DETAIL_DATA: (state, data) => {
      state.evaluateSurveyDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryEvaluateSurveyDetailData({ commit }, id) {
      commit('SET_IS_MODULES_EVALUATESURVEY_DETAIL_LOADING', true)
      commit('SET_MODULES_EVALUATESURVEY_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/evaluateSurvey/evaluateSurveyDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_EVALUATESURVEY_DETAIL_LOADING', false)
          commit('SET_MODULES_EVALUATESURVEY_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_EVALUATESURVEY_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetEvaluateSurveyDetailData({ commit }) {
      commit('SET_MODULES_EVALUATESURVEY_DETAIL_DATA', {})
    }
  }
}

export default evaluateSurvey
