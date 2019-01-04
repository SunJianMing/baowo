import request from '@/utils/request'

const activityObjectScoreRemark = {
  state: {
    isActivityObjectScoreRemarkDetailLoading: false,
    activityObjectScoreRemarkDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_ACTIVITYOBJECTSCOREREMARK_DETAIL_LOADING: (state, data) => {
      state.isActivityObjectScoreRemarkDetailLoading = data
    },
    SET_MODULES_ACTIVITYOBJECTSCOREREMARK_DETAIL_DATA: (state, data) => {
      state.activityObjectScoreRemarkDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryActivityObjectScoreRemarkDetailData({ commit }, id) {
      commit('SET_IS_MODULES_ACTIVITYOBJECTSCOREREMARK_DETAIL_LOADING', true)
      commit('SET_MODULES_ACTIVITYOBJECTSCOREREMARK_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/activityObjectScoreRemark/activityObjectScoreRemarkDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_ACTIVITYOBJECTSCOREREMARK_DETAIL_LOADING', false)
          commit('SET_MODULES_ACTIVITYOBJECTSCOREREMARK_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_ACTIVITYOBJECTSCOREREMARK_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetActivityObjectScoreRemarkDetailData({ commit }) {
      commit('SET_MODULES_ACTIVITYOBJECTSCOREREMARK_DETAIL_DATA', {})
    }
  }
}

export default activityObjectScoreRemark
