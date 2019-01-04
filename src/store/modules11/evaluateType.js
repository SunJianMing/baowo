import request from '@/utils/request'

const evaluateType = {
  state: {
    isEvaluateTypeDetailLoading: false,
    evaluateTypeDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_EVALUATETYPE_DETAIL_LOADING: (state, data) => {
      state.isEvaluateTypeDetailLoading = data
    },
    SET_MODULES_EVALUATETYPE_DETAIL_DATA: (state, data) => {
      state.evaluateTypeDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryEvaluateTypeDetailData({ commit }, id) {
      commit('SET_IS_MODULES_EVALUATETYPE_DETAIL_LOADING', true)
      commit('SET_MODULES_EVALUATETYPE_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/evaluateType/evaluateTypeDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_EVALUATETYPE_DETAIL_LOADING', false)
          commit('SET_MODULES_EVALUATETYPE_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_EVALUATETYPE_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetEvaluateTypeDetailData({ commit }) {
      commit('SET_MODULES_EVALUATETYPE_DETAIL_DATA', {})
    }
  }
}

export default evaluateType
