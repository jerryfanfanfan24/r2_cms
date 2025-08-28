<template>
  <div class="dashboard">
    <!-- 1.顶层数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>
    <!-- 2.中间部分的图表:放三个echart  7;10;7-->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card>
          <pieEchart :pieData="mapGoodsCategeryCount" />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card><mapEchart :mapData="showGoodsAddressSale" /></chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card>
          <roseEchart :roseData="mapGoodsCategeryCount" />
        </chart-card>
      </el-col>
    </el-row>
    <!-- 3.底部部分的图表:放两个echart 12;12-->
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card
          ><lineEchart
            :labels="mapGoodsCategorySale.labels"
            :values="mapGoodsCategorySale.values"
        /></chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card><barEchart v-bind="mapGoodsCategoryFavor" /></chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useAnalysisStore from '@/stores/main/analysis/analysis'
import countCard from './c-cpns/count-card/count-card.vue'
import chartCard from './c-cpns/chart-card/chart-card.vue'
import { storeToRefs } from 'pinia'
import {
  pieEchart,
  lineEchart,
  roseEchart,
  barEchart,
  mapEchart
} from '@/components/page-echarts'
import { computed } from 'vue'

// 1.发起数据的请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()
// 2.从store获取数据,还必须写成响应式storeToRefs
const {
  amountList,
  goodsCategeryCount,
  goodsCategorySale,
  goodsCategoryFavor,
  goodsAddressSale
} = storeToRefs(analysisStore)
// 3.获取数据pieData/roseData,要转换 => 用映射map.
const mapGoodsCategeryCount = computed(() => {
  return goodsCategeryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
//获取line-chart对应的数据: labels(X轴),values(y轴)
const mapGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)
  return { labels, values }
})
//获取bar-echart对应的数据:labels(x轴),values(y轴)
const mapGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
//获取map-echart对应的数据mapData,要转化=>用隐映射map.
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<style lang="less" scoped>
.dashboard {
  color: red;
}
.el-row {
  margin-bottom: 10px;
}
</style>
