<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">{{
        contentConfig?.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop!]) }}
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'handler'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  size="small"
                  type="primary"
                  text
                  icon="Edit"
                  @click="handleEditClick(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  v-if="isDelete"
                  size="small"
                  type="danger"
                  text
                  icon="Delete"
                  @click="handleDeleteClick(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>

          <template v-else>
            <el-table-column v-bind="item" align="center"></el-table-column>
          </template>
        </template>
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
import type { IformData2 } from '../page-modal/page-modal.vue'
import type { IpropsList } from '@/views/main/system/department/config/content.config'
import usePermissions from '@/hooks/usePermissions'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: IpropsList[]
    childrenTree?: object
  }
}
const props = defineProps<IProps>()

//0.获取是否有对应的增删改查的按钮权限,动态判断,要求适用于部门管理,菜单管理,角色管理三个页面
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

//1.发起action,请求userList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      'newPageDataAction' ||
      'editPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})
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
  if (!isQuery) return
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  // 2.发起网络请求
  const queryInfo = { ...pageInfo, ...searchForm }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}
//5.删除操作,新建操作,编辑操作
function handleDeleteClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
const emit = defineEmits(['newUserClick', 'editClick'])
function handleNewUserClick() {
  emit('newUserClick')
}
function handleEditClick(itemData: IformData2) {
  emit('editClick', itemData)
}
// 6.监听systemStore中的actions被执行
defineExpose({ fetchPageListData })
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
