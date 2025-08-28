import hyRequest from '@/service'

interface IamountResult {
  code: number
  data: IamountList[]
}
export interface IamountList {
  amount: string
  title: string
  tips: string
  subtitle: string
  number1: number
  number2: number
}

interface IgoodsCategeryCountResult {
  code: number
  data: IgoodsCategeryCount[]
}
export interface IgoodsCategeryCount {
  id: number
  name: string
  goodsCount: number
}

interface IgetGoodsCategorySaleResult {
  code: number
  data: IgoodsCategorySale[]
}
export interface IgoodsCategorySale {
  id: number
  name: string
  goodsCount: number
}

interface IgoodsCategoryFavorResult {
  code: number
  data: IgoodsCategoryFavor[]
}
export interface IgoodsCategoryFavor {
  id: number
  name: string
  goodsFavor: number
}

interface IgoodsAddressSaleResult {
  code: number
  data: IgoodsAddressSale[]
}

export interface IgoodsAddressSale {
  address: string
  count: number
}

export function getAmountListData() {
  return hyRequest.get<IamountResult>({
    url: 'goods/amount/list'
  })
}

export function getGoodsCategoryCount() {
  return hyRequest.get<IgoodsCategeryCountResult>({
    url: '/goods/category/count'
  })
}

export function getGoodsCategorySale() {
  return hyRequest.get<IgetGoodsCategorySaleResult>({
    url: '/goods/category/sale'
  })
}

export function getGoodsCategoryFavor() {
  return hyRequest.get<IgoodsCategoryFavorResult>({
    url: '/goods/category/favor'
  })
}

export function getGoodsAddressSale() {
  return hyRequest.get<IgoodsAddressSaleResult>({
    url: 'goods/address/sale'
  })
}
