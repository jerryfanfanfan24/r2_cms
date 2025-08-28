import {
  getAmountListData,
  getGoodsAddressSale,
  getGoodsCategoryCount,
  getGoodsCategoryFavor,
  getGoodsCategorySale,
  type IamountList,
  type IgoodsAddressSale,
  type IgoodsCategeryCount,
  type IgoodsCategoryFavor,
  type IgoodsCategorySale
} from '@/service/main/analysis/analysis'
import { defineStore } from 'pinia'

interface IAnalysisState {
  amountList: IamountList[]
  goodsCategeryCount: IgoodsCategeryCount[]
  goodsCategorySale: IgoodsCategorySale[]
  goodsCategoryFavor: IgoodsCategoryFavor[]
  goodsAddressSale: IgoodsAddressSale[]
}
const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: [],
    goodsCategeryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAddressSale: []
  }),
  actions: {
    async fetchAnalysisDataAction() {
      getAmountListData().then((res) => {
        this.amountList = res.data
      })

      getGoodsCategoryCount().then((res) => {
        this.goodsCategeryCount = res.data
      })

      getGoodsCategorySale().then((res) => {
        this.goodsCategorySale = res.data
      })
      getGoodsCategoryFavor().then((res) => {
        this.goodsCategoryFavor = res.data
      })

      getGoodsAddressSale().then((res) => {
        this.goodsAddressSale = res.data
      })
    }
  }
})
export default useAnalysisStore
