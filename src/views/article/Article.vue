<template>
  <div class="article">
    <h2 class="tit">文章列表 ({{total}}) <router-link to="/article/create">雅俗共赏</router-link>
    </h2>
    <el-table :data="articleList">
      <el-table-column prop="title" label="Title">
      </el-table-column>
      <el-table-column label="Date" width="240">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{$moment(scope.row.createTime).format('YYYY/MM/DD HH:mm')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="options" width=100>
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="View Article" placement="top">
            <i class="el-icon-view" @click="view(scope.row.id)"></i>
          </el-tooltip>
          <el-tooltip effect="dark" content="Edit Article" placement="top">
            <i class="el-icon-edit" @click="edit(scope.row.id)"></i>
          </el-tooltip>
          <el-tooltip effect="dark" content="Delete" placement="top">
            <i class="el-icon-delete" @click="remove(scope.row)"></i>
          </el-tooltip>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination background :page-size="queryData.count" :total="total" :current-page="queryData.page" @current-change="handleChangePage" layout="prev, pager, next">
    </el-pagination>
  </div>
</template>

<script>

export default {
  data () {
    return {
      total: 0, // 文章总数
      articleList: [], // 文章列表
      queryData: {
        page: 1, // 页码
        count: 8 // 每页数量
      }
    }
  },

  created () {
    this.getArticleList()
  },
  mounted () {
    document.querySelector('.content').style.overflow = 'hidden'
  },
  destroyed () {
    document.querySelector('.content').style.overflow = 'auto'
  },
  methods: {
    // 获取文章列表
    async getArticleList () {
      const { data: res } = await this.$axios.get('article', { params: this.queryData })
      if (res.status !== 0) return this.$message.error(res.message)
      this.articleList = res.data.data
      this.total = res.data.total
      console.log(res)
    },
    handleChangePage (val) {
      this.queryData.page = val
      this.getArticleList()
    }
  }
}
</script>

<style scoped lang='less'>
.article {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    h1 {
      border-left: 2px solid #0084ff;
      padding-left: 16px;
      font-size: 18px;
      font-weight: 400;
      margin: 20px 0 30px;
      color: #0084ff;
    }
    .info {
      display: flex;
      margin: 15px 0;
      div {
        margin-right: 10px;
      }
    }
  }
  .article-list {
    width: 100%;
    thead tr {
      height: 40px;
    }
    tbody {
      tr {
        height: 50px;
      }
    }
  }
  i[class*='el-icon-'] {
    cursor: pointer;
    margin: 2px;
    padding: 2px;
    font-size: 14px;
    color: #cfcfcf;
    transition: all 0.2s;
    &:hover {
      color: #0e8bff;
    }
    &.el-icon-delete:hover {
      color: red;
    }
  }
  ::v-deep .el-table__body-wrapper {
    height: calc(100% - 80px);
    overflow: auto;
    &::-webkit-scrollbar-track {
      background: #fff;
    }
    &::-webkit-scrollbar-thumb {
      background: #eef7ff;
    }
    &::-webkit-scrollbar {
      width: 6px;
    }
  }
}

@media screen and (max-width: 600px) {
  .article {
    padding: 0;
    box-shadow: none;
    .header h1 {
      font-size: 16px;
      margin: 10px 0 20px;
    }
  }
  ::v-deep .el-table__body-wrapper {
    height: calc(100vh - 212px) !important;
  }
  .el-table__header,
  .el-table__body {
    width: 100% !important;
    display: block;
    tbody {
      display: block;
    }
    thead {
      display: block;
      tr {
        display: flex;
        th {
          padding: 6px 0;
          &:nth-of-type(2) {
            display: none;
          }
          &:nth-of-type(1) {
            flex: 1;
          }
          &:nth-of-type(3) {
            width: 68px;
            text-align: right;
          }
          .cell {
            padding: 0;
          }
        }
      }
    }
    .el-table__row {
      display: flex;
      width: 100%;
      justify-content: space-between;
      td {
        &:nth-of-type(2) {
          display: none;
        }
        &:nth-of-type(1) {
          flex: 1;
        }
        &:nth-of-type(3) {
          width: 68px;
          text-align: right;
        }
        div {
          padding: 0;
        }
      }
    }
  }
}
</style>
