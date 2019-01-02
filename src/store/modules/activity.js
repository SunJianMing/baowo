import request from '@/utils/request'

const activity = {
  state: {
    isActivityDetailLoading: false,
    activityDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_ACTIVITY_DETAIL_LOADING: (state, data) => {
      state.isActivityDetailLoading = data
    },
    SET_MODULES_ACTIVITY_DETAIL_DATA: (state, data) => {
      state.activityDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryActivityDetailData({ commit }, id) {
      commit('SET_IS_MODULES_ACTIVITY_DETAIL_LOADING', true)
      commit('SET_MODULES_ACTIVITY_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/activity/activityDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_ACTIVITY_DETAIL_LOADING', false)
          commit('SET_MODULES_ACTIVITY_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_ACTIVITY_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetActivityDetailData({ commit }) {
      commit('SET_MODULES_ACTIVITY_DETAIL_DATA', {})
    }
  }
}

export default activity
