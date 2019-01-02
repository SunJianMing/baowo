import request from '@/utils/request'

const property = {
  state: {
    isPropertyDetailLoading: false,
    propertyDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_PROPERTY_DETAIL_LOADING: (state, data) => {
      state.isPropertyDetailLoading = data
    },
    SET_MODULES_PROPERTY_DETAIL_DATA: (state, data) => {
      state.propertyDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryPropertyDetailData({ commit }, id) {
      commit('SET_IS_MODULES_PROPERTY_DETAIL_LOADING', true)
      commit('SET_MODULES_PROPERTY_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/property/propertyDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_PROPERTY_DETAIL_LOADING', false)
          commit('SET_MODULES_PROPERTY_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_PROPERTY_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetPropertyDetailData({ commit }) {
      commit('SET_MODULES_PROPERTY_DETAIL_DATA', {})
    }
  }
}

export default property
