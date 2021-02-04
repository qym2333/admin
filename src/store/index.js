import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    envelopeList: [], // 信封列表
    articleCountInfo: {
      count: 0,
      lastestTime: ''
    }
  },
  mutations: {
    // 更新信封列表
    upEnvelopeList (state, payload) {
      state.envelopeList = payload
    },
    // 更新文章信息
    upArticleInfo (state, payload) {
      state.articleCountInfo = payload
    }
  },
  actions: {
    async getEnvelopeList (context) {
      const { data: res } = await axios.get('envelope')
      context.commit('upEnvelopeList', res.data)
    },
    async getArticleInfo (context) {
      const { data: res } = await axios.get('article')
      const info = {
        count: res.data.total,
        lastestTime: res.data.data[0].createTime
      }
      context.commit('upArticleInfo', info)
    }
  }
})

export default store
