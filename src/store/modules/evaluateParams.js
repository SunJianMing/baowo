import request from '@/utils/request'

const evaluateParams = {
  state: {
    isEvaluateParamsDetailLoading: false,
    evaluateParamsDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_EVALUATEPARAMS_DETAIL_LOADING: (state, data) => {
      state.isEvaluateParamsDetailLoading = data
    },
    SET_MODULES_EVALUATEPARAMS_DETAIL_DATA: (state, data) => {
      state.evaluateParamsDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryEvaluateParamsDetailData({ commit }, id) {
      commit('SET_IS_MODULES_EVALUATEPARAMS_DETAIL_LOADING', true)
      commit('SET_MODULES_EVALUATEPARAMS_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/evaluateParams/evaluateParamsDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_EVALUATEPARAMS_DETAIL_LOADING', false)
          commit('SET_MODULES_EVALUATEPARAMS_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_EVALUATEPARAMS_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetEvaluateParamsDetailData({ commit }) {
      commit('SET_MODULES_EVALUATEPARAMS_DETAIL_DATA', {})
    }
  }
}

export default evaluateParams
