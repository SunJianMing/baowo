import request from '@/utils/request'

const dict = {
  state: {
    isDictDetailLoading: false,
    dictDetailData: {}
  },

  mutations: {
    SET_IS_MODULES_DICT_DETAIL_LOADING: (state, data) => {
      state.isDictDetailLoading = data
    },
    SET_MODULES_DICT_DETAIL_DATA: (state, data) => {
      state.dictDetailData = data
    }
  },

  actions: {
    //  获取账号编辑页面数据
    queryDictDetailData({ commit }, id) {
      commit('SET_IS_MODULES_DICT_DETAIL_LOADING', true)
      commit('SET_MODULES_DICT_DETAIL_DATA', {})
      return new Promise((resolve, reject) => {
        request({
          url: '/modules/dict/dictDetail',
          method: 'post',
          data: { id: id }
        }).then(response => {
          commit('SET_IS_MODULES_DICT_DETAIL_LOADING', false)
          commit('SET_MODULES_DICT_DETAIL_DATA', response.data)
          resolve(response.data)
        }).catch(error => {
          commit('SET_IS_MODULES_DICT_DETAIL_LOADING', false)
          reject(error)
        })
      })
    },
    //  重置账号新增页面数据
    resetDictDetailData({ commit }) {
      commit('SET_MODULES_DICT_DETAIL_DATA', {})
    }
  }
}

export default dict
