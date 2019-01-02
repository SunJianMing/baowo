import request from '@/utils/request'

const activityAssessor = {
  state: {
    isActivityAssessorDetailLoading: false,
    activityAssessorDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_ACTIVITYASSESSOR_DETAIL_LOADING: (state, data) => {
      state.isActivityAssessorDetailLoading = data
    },
    SET_MODULES_ACTIVITYASSESSOR_DETAIL_DATA: (state, data) => {
      state.activityAssessorDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryActivityAssessorDetailData({ commit }, id) {
      commit('SET_IS_MODULES_ACTIVITYASSESSOR_DETAIL_LOADING', true)
      commit('SET_MODULES_ACTIVITYASSESSOR_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/activityAssessor/activityAssessorDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_ACTIVITYASSESSOR_DETAIL_LOADING', false)
          commit('SET_MODULES_ACTIVITYASSESSOR_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_ACTIVITYASSESSOR_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetActivityAssessorDetailData({ commit }) {
      commit('SET_MODULES_ACTIVITYASSESSOR_DETAIL_DATA', {})
    }
  }
}

export default activityAssessor
