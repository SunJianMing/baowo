import request from '@/utils/request'

const evaluateSurveyProperty = {
  state: {
    isEvaluateSurveyPropertyDetailLoading: false,
    evaluateSurveyPropertyDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_EVALUATESURVEYPROPERTY_DETAIL_LOADING: (state, data) => {
      state.isEvaluateSurveyPropertyDetailLoading = data
    },
    SET_MODULES_EVALUATESURVEYPROPERTY_DETAIL_DATA: (state, data) => {
      state.evaluateSurveyPropertyDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryEvaluateSurveyPropertyDetailData({ commit }, id) {
      commit('SET_IS_MODULES_EVALUATESURVEYPROPERTY_DETAIL_LOADING', true)
      commit('SET_MODULES_EVALUATESURVEYPROPERTY_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/evaluateSurveyProperty/evaluateSurveyPropertyDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_EVALUATESURVEYPROPERTY_DETAIL_LOADING', false)
          commit('SET_MODULES_EVALUATESURVEYPROPERTY_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_EVALUATESURVEYPROPERTY_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetEvaluateSurveyPropertyDetailData({ commit }) {
      commit('SET_MODULES_EVALUATESURVEYPROPERTY_DETAIL_DATA', {})
    }
  }
}

export default evaluateSurveyProperty
