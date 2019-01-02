import request from '@/utils/request'

const activityObject = {
  state: {
    isActivityObjectDetailLoading: false,
    activityObjectDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_ACTIVITYOBJECT_DETAIL_LOADING: (state, data) => {
      state.isActivityObjectDetailLoading = data
    },
    SET_MODULES_ACTIVITYOBJECT_DETAIL_DATA: (state, data) => {
      state.activityObjectDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryActivityObjectDetailData({ commit }, id) {
      commit('SET_IS_MODULES_ACTIVITYOBJECT_DETAIL_LOADING', true)
      commit('SET_MODULES_ACTIVITYOBJECT_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/activityObject/activityObjectDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_ACTIVITYOBJECT_DETAIL_LOADING', false)
          commit('SET_MODULES_ACTIVITYOBJECT_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_ACTIVITYOBJECT_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetActivityObjectDetailData({ commit }) {
      commit('SET_MODULES_ACTIVITYOBJECT_DETAIL_DATA', {})
    }
  }
}

export default activityObject
