<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick"
        >新建用户
      </el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号码"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="enable"
          label="状态"
          width="100px"
        >
          <template #default="scope">
            <el-button
              :type="scope.row.enable ? 'primary' : 'danger'"
              size="small"
              plain
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
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
              v-if="isUpdate"
              @click="handleEditBtnClick(scope.row)"
              size="small"
              icon="Edit"
              type="primary"
              text
            >
              编辑
            </el-button>
            <el-button
              v-if="isDelete"
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
        :total="usersTotalCount"
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
import type { IformData } from './user-modal.vue'
import usePermissions from '@/hooks/usePermissions'

//0.没有查权限,直接不做网络请求, if (!isQuery) return
// 用户的权限判断:增删改查
const isCreate = usePermissions('users:create')
const isDelete = usePermissions('users:delete')
const isUpdate = usePermissions('users:update')
const isQuery = usePermissions('users:query')

//1.发起action,请求userList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()
//2.获取userList数据,进行展示
// const usersList = SystemStore.usersList 有问题,第一次数据为空,因为postUsersListAction是异步操作,实际的执行顺序这一句在调用函数postUsersListAction前面;而且刷新页面后也是空的
const { usersList, usersTotalCount } = storeToRefs(systemStore)
//3.分页器pagination 的页码相关逻辑
function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}
// 4.定义函数fetchUserListData, 用于发送网络请求
function fetchUserListData(searchForm: object = {}) {
  if (!isQuery) return
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  // 2.发起网络请求
  const queryInfo = { ...pageInfo, ...searchForm }
  systemStore.postUsersListAction(queryInfo)
}
defineExpose({ fetchUserListData })
//5.删除操作,新建操作,编辑操作
function handleDeleteBtnClick(id: number) {
  systemStore.deleteUserByIdAction(id)
}
const emit = defineEmits(['newUserClick', 'editClick'])
function handleNewUserClick() {
  emit('newUserClick')
}
function handleEditBtnClick(itemData: IformData) {
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
