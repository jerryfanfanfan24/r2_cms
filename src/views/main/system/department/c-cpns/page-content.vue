<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60px" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />
        <el-table-column
          align="center"
          prop="name"
          label="部门名称"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="leader"
          label="部门领导"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="parentId"
          label="上级部门"
          width="150px"
        />

        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">{{
            formatUTC(scope.row.createAt)
          }}</template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">{{
            formatUTC(scope.row.updateAt)
          }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150px">
          <!-- 隐式的默认插槽,连name和template #default都没有,也叫匿名插槽 -->
          <template #default="scope">
            <el-button
              @click="handleEditBtnClick(scope.row)"
              size="small"
              icon="Edit"
              type="primary"
              text
            >
              编辑
            </el-button>
            <el-button
              @click="handleDeleteBtnClick(scope.row.id)"
              size="small"
              icon="Delete"
              type="danger"
              text
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import { formatUTC } from '@/utils/formatUTC'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { IformData2 } from './page-modal.vue'

//1.发起action,请求userList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()
//2.获取userList数据,进行展示
// const usersList = SystemStore.usersList 有问题,第一次数据为空,因为postUsersListAction是异步操作,实际的执行顺序这一句在调用函数postUsersListAction前面;而且刷新页面后也是空的
const { pageList, pageTotalCount } = storeToRefs(systemStore)
//3.分页器pagination 的页码相关逻辑
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}
// 4.定义函数fetchUserListData, 用于发送网络请求
function fetchPageListData(searchForm: object = {}) {
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  // 2.发起网络请求
  const queryInfo = { ...pageInfo, ...searchForm }
  systemStore.postPageListAction('department', queryInfo)
}
defineExpose({ fetchPageListData })
//5.删除操作,新建操作,编辑操作
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction('department', id)
}
const emit = defineEmits(['newUserClick', 'editClick'])
function handleNewUserClick() {
  emit('newUserClick')
}
function handleEditBtnClick(itemData: IformData2) {
  emit('editClick', itemData)
}
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}
.el-table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: right;
  margin-top: 10px;
}
</style>
