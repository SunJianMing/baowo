import request from '@/utils/request'

const assessor = {
  state: {
    isAssessorDetailLoading: false,
    assessorDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_ASSESSOR_DETAIL_LOADING: (state, data) => {
      state.isAssessorDetailLoading = data
    },
    SET_MODULES_ASSESSOR_DETAIL_DATA: (state, data) => {
      state.assessorDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryAssessorDetailData({ commit }, id) {
      commit('SET_IS_MODULES_ASSESSOR_DETAIL_LOADING', true)
      commit('SET_MODULES_ASSESSOR_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/assessor/assessorDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_ASSESSOR_DETAIL_LOADING', false)
          commit('SET_MODULES_ASSESSOR_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_ASSESSOR_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetAssessorDetailData({ commit }) {
      commit('SET_MODULES_ASSESSOR_DETAIL_DATA', {})
    }
  }
}

export default assessor
