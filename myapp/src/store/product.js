import { getProdById } from "../../api/detail";

const product = {
  namespaced: true,
  state: {
    productList:[]
  },
  mutations: {
    saveProdList(state,arr){
      state.productList = [...arr]
    }
  },
  getters: {

  },
  actions: {
    // 请求商品列表
    getProdList({commit},id) {
      return new Promise(resolve => {
        getProdById({id}).then(res =>{
          commit('saveProdList',res.data.goods)
          resolve()
        })
      })

    }
  }
}
export default product