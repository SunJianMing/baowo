import request from '@/utils/request'

const activityObjectScore = {
  state: {
    isActivityObjectScoreDetailLoading: false,
    activityObjectScoreDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_ACTIVITYOBJECTSCORE_DETAIL_LOADING: (state, data) => {
      state.isActivityObjectScoreDetailLoading = data
    },
    SET_MODULES_ACTIVITYOBJECTSCORE_DETAIL_DATA: (state, data) => {
      state.activityObjectScoreDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryActivityObjectScoreDetailData({ commit }, id) {
      commit('SET_IS_MODULES_ACTIVITYOBJECTSCORE_DETAIL_LOADING', true)
      commit('SET_MODULES_ACTIVITYOBJECTSCORE_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/activityObjectScore/activityObjectScoreDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_ACTIVITYOBJECTSCORE_DETAIL_LOADING', false)
          commit('SET_MODULES_ACTIVITYOBJECTSCORE_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_ACTIVITYOBJECTSCORE_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetActivityObjectScoreDetailData({ commit }) {
      commit('SET_MODULES_ACTIVITYOBJECTSCORE_DETAIL_DATA', {})
    }
  }
}

export default activityObjectScore
