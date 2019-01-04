import request from '@/utils/request'

const evaluateObject = {
  state: {
    isEvaluateObjectDetailLoading: false,
    evaluateObjectDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_EVALUATEOBJECT_DETAIL_LOADING: (state, data) => {
      state.isEvaluateObjectDetailLoading = data
    },
    SET_MODULES_EVALUATEOBJECT_DETAIL_DATA: (state, data) => {
      state.evaluateObjectDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryEvaluateObjectDetailData({ commit }, id) {
      commit('SET_IS_MODULES_EVALUATEOBJECT_DETAIL_LOADING', true)
      commit('SET_MODULES_EVALUATEOBJECT_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/evaluateObject/evaluateObjectDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_EVALUATEOBJECT_DETAIL_LOADING', false)
          commit('SET_MODULES_EVALUATEOBJECT_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_EVALUATEOBJECT_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetEvaluateObjectDetailData({ commit }) {
      commit('SET_MODULES_EVALUATEOBJECT_DETAIL_DATA', {})
    }
  }
}

export default evaluateObject
