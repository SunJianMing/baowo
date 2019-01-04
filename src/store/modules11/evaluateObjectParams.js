import request from '@/utils/request'

const evaluateObjectParams = {
  state: {
    isEvaluateObjectParamsDetailLoading: false,
    evaluateObjectParamsDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_EVALUATEOBJECTPARAMS_DETAIL_LOADING: (state, data) => {
      state.isEvaluateObjectParamsDetailLoading = data
    },
    SET_MODULES_EVALUATEOBJECTPARAMS_DETAIL_DATA: (state, data) => {
      state.evaluateObjectParamsDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryEvaluateObjectParamsDetailData({ commit }, id) {
      commit('SET_IS_MODULES_EVALUATEOBJECTPARAMS_DETAIL_LOADING', true)
      commit('SET_MODULES_EVALUATEOBJECTPARAMS_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/evaluateObjectParams/evaluateObjectParamsDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_EVALUATEOBJECTPARAMS_DETAIL_LOADING', false)
          commit('SET_MODULES_EVALUATEOBJECTPARAMS_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_EVALUATEOBJECTPARAMS_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetEvaluateObjectParamsDetailData({ commit }) {
      commit('SET_MODULES_EVALUATEOBJECTPARAMS_DETAIL_DATA', {})
    }
  }
}

export default evaluateObjectParams
