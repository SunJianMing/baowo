import request from '@/utils/request'

const activityImportance = {
  state: {
    isActivityImportanceDetailLoading: false,
    activityImportanceDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_ACTIVITYIMPORTANCE_DETAIL_LOADING: (state, data) => {
      state.isActivityImportanceDetailLoading = data
    },
    SET_MODULES_ACTIVITYIMPORTANCE_DETAIL_DATA: (state, data) => {
      state.activityImportanceDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryActivityImportanceDetailData({ commit }, id) {
      commit('SET_IS_MODULES_ACTIVITYIMPORTANCE_DETAIL_LOADING', true)
      commit('SET_MODULES_ACTIVITYIMPORTANCE_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/activityImportance/activityImportanceDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_ACTIVITYIMPORTANCE_DETAIL_LOADING', false)
          commit('SET_MODULES_ACTIVITYIMPORTANCE_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_ACTIVITYIMPORTANCE_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetActivityImportanceDetailData({ commit }) {
      commit('SET_MODULES_ACTIVITYIMPORTANCE_DETAIL_DATA', {})
    }
  }
}

export default activityImportance
