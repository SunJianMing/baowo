import request from '@/utils/request'

const propertyDetail = {
  state: {
    isPropertyDetailDetailLoading: false,
    propertyDetailDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_PROPERTYDETAIL_DETAIL_LOADING: (state, data) => {
      state.isPropertyDetailDetailLoading = data
    },
    SET_MODULES_PROPERTYDETAIL_DETAIL_DATA: (state, data) => {
      state.propertyDetailDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryPropertyDetailDetailData({ commit }, id) {
      commit('SET_IS_MODULES_PROPERTYDETAIL_DETAIL_LOADING', true)
      commit('SET_MODULES_PROPERTYDETAIL_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/propertyDetail/propertyDetailDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_PROPERTYDETAIL_DETAIL_LOADING', false)
          commit('SET_MODULES_PROPERTYDETAIL_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_PROPERTYDETAIL_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetPropertyDetailDetailData({ commit }) {
      commit('SET_MODULES_PROPERTYDETAIL_DETAIL_DATA', {})
    }
  }
}

export default propertyDetail
