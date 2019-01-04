import request from '@/utils/request'

const activityProperty = {
  state: {
    isActivityPropertyDetailLoading: false,
    activityPropertyDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_ACTIVITYPROPERTY_DETAIL_LOADING: (state, data) => {
      state.isActivityPropertyDetailLoading = data
    },
    SET_MODULES_ACTIVITYPROPERTY_DETAIL_DATA: (state, data) => {
      state.activityPropertyDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryActivityPropertyDetailData({ commit }, id) {
      commit('SET_IS_MODULES_ACTIVITYPROPERTY_DETAIL_LOADING', true)
      commit('SET_MODULES_ACTIVITYPROPERTY_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/activityProperty/activityPropertyDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_ACTIVITYPROPERTY_DETAIL_LOADING', false)
          commit('SET_MODULES_ACTIVITYPROPERTY_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_ACTIVITYPROPERTY_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetActivityPropertyDetailData({ commit }) {
      commit('SET_MODULES_ACTIVITYPROPERTY_DETAIL_DATA', {})
    }
  }
}

export default activityProperty
