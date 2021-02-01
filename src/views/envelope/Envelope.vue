<template>
  <div class="envelope">
    <h2 class="tit">你的网抑云 ({{total}}) <i class="el-icon-lollipop" @click="showDialog"> 写一封过去的信</i></h2>
    <el-table :data="envelopeList">
      <el-table-column prop="content" label="Content">
      </el-table-column>
      <el-table-column label="Date" width="240">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{$moment(scope.row.createTime).format('YYYY/MM/DD HH:mm')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="options" width=100>
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="View" placement="top" :enterable="false">
            <i class="el-icon-view" @click="$router.push(`/envelope/detail/${scope.row.id}`) "></i>
          </el-tooltip>
          <el-tooltip effect="dark" content="Edit" placement="top" :enterable="false">
            <i class="el-icon-edit" @click="showDialog(scope.row)"></i>
          </el-tooltip>
          <el-tooltip effect="dark" content="Delete" placement="top" :enterable="false">
            <i class="el-icon-delete" @click="handleDelete(scope.row.id)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination background :page-size="queryData.count" :total="total" :current-page="queryData.page" @current-change="handleChangePage" layout="prev, pager, next" hide-on-single-page>
    </el-pagination>

    <div class="envelope-form" :class="isShow?'active':''">
      <div class="content">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="envelopeForm.content">
        </el-input>
        <div class="bottom-btn">
          <el-button type="primary" @click="handleSubmit">Send</el-button>
          <el-button type="info" @click="closeDialog">Cencel</el-button>
        </div>
        <!-- <i class="el-icon-circle-close" @click="isShow=false"></i> -->
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 0, // 总数
      envelopeList: [], // 列表
      queryData: {
        page: 1, // 页码
        count: 7 // 每页数量
      },
      isShow: false,
      envelopeForm: {
        id: '',
        content: ''
      }
    }
  },

  created () {
    this.getEnvelopeList()
  },

  mounted () {
    if (document.querySelector('.content')) {
      document.querySelector('.content').style.overflow = 'hidden'
    }
  },

  destroyed () {
    if (document.querySelector('.content')) {
      document.querySelector('.content').style.overflow = 'auto'
    }
  },

  methods: {
    // 获取信封列表
    async getEnvelopeList () {
      const { data: res } = await this.$axios.get('envelope', { params: this.queryData })
      if (res.status !== 0) return this.$message.error(res.message)
      this.envelopeList = res.data.data
      this.total = res.data.total
    },
    handleChangePage (val) {
      this.queryData.page = val
      this.getEnvelopeList()
    },
    handleDelete (id) {
      console.log(id)
      this.$confirm('删了吗？', '提示', {
        confirmButtonText: '嗯',
        cancelButtonText: '算了',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$axios.delete(`envelope/del/${id}`)
        this.$message({
          type: 'success',
          message: res.message
        })
        this.getEnvelopeList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '不删了嘛'
        })
      })
    },
    // 打开对话框
    async showDialog (row) {
      this.isShow = !this.isShow
      if (row.id) {
        // 编辑
        const { data: res } = await this.$axios.get(`/envelope/${row.id}`)
        this.envelopeForm.content = res[0].content
        this.envelopeForm.id = res[0].id
      }
    },
    // 关闭对话框
    closeDialog () {
      this.envelopeForm.id = ''
      this.envelopeForm.content = ''
      this.isShow = !this.isShow
    },
    // 提交表单
    async handleSubmit () {
      if (!this.envelopeForm.content) return this.$message.warning('说点什么吧……')
      if (this.envelopeForm.id) {
        // 编辑
        const { data: res } = await this.$axios.put(`/envelope/${this.envelopeForm.id}`, { content: this.envelopeForm.content })
        if (res.status !== 0) return this.$message.error('修改失败了呀。')
        this.$message.success(res.message)
      } else {
        const { data: res } = await this.$axios.post('/envelope', { content: this.envelopeForm.content })
        if (res.status !== 0) return this.$message.error('好像出错了……')
        this.$message.success('发送成功！')
      }
      this.closeDialog()
      this.getEnvelopeList()
    }
  }
}
</script>

<style scoped lang='less'>
.envelope {
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
// 弹出层
.envelope-form {
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65);
    transition: all 0.6s;
    z-index: 9;
    opacity: 0;
    visibility: hidden;
  }
  .content {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 240px;
    width: 500px;
    padding: 22px;
    background: white;
    border-radius: 22px;
    border: 1px solid #ebeef5;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.35);
    z-index: 10;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s;
    transform: translateY(20px);
  }
  ::v-deep textarea {
    height: 150px !important;
    padding: 12px !important;
    background: #f1f1f1;
    border: none;
    border-radius: 10px;
    padding-left: 16px !important;
  }
  .bottom-btn {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: flex-start;
    margin-top: 18px;
    button {
      margin-left: 10px;
      border-radius: 20px;
      height: 36px;
      padding: 0 26px;
      line-height: 36px;
    }
    p {
      font-size: 12px;
      color: #ff8282;
    }
  }
  .el-icon-circle-close {
    position: absolute;
    right: 5px;
    top: 5px;
    color: #c7c7c7;
    font-size: 22px;
    padding: 2px;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
  &.active {
    &::before {
      opacity: 1;
      visibility: visible;
    }
    .content {
      opacity: 1;
      visibility: visible;
      transform: translateY(-10px);
    }
  }
}

@media screen and (max-width: 600px) {
  .envelope-form .content {
    max-width: 90%;
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
