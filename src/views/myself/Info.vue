<template>
  <div>
    <h2 class="tit">关于你</h2>
    <mavon-editor v-model="info.content" :boxShadow="false" :subfield="false" @change="change" ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" />
    <el-button class="submit" type="primary" @click="handleSubmit">SUBMIT</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      info: {
        content: '',
        contentHtml: ''
      }
    }
  },

  created () {
    this.renderData()
  },
  mounted () {

  },
  methods: {
    async $imgAdd (pos, $file) {
      // 将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', $file)
      const { data: res } = await this.$axios({
        url: '/upload',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (res.status !== 0) return console.log(res.message)
      this.$refs.md.$img2Url(pos, 'http://localhost:3000' + res.data.url)
    },
    async $imgDel (pos) {
      const url = pos[0].replace('http://localhost:3000', '')
      const { data: res } = await this.$axios.post('/upload/del', { url })
      if (res.status !== 0) return this.$message.error(res.msg)
    },
    change (value, render) {
      this.info.contentHtml = render // 解析的html
      this.info.content = value // 输入的内容
    },
    async renderData () {
      const { data: res } = await this.$axios.get('myself')
      if (res.data) {
        this.id = res.data._id
        setTimeout(() => {
          this.info = res.data
          this.isReset = false
          this.$nextTick(() => { this.isReset = true })
        }, 500)
      }
    },
    async handleSubmit () {
      const map = {
        content: '请输入内容'
        // time: '请选择时间'
      }
      for (const i in map) {
        if (!this.info[i]) {
          this.$message.error(`${map[i]}`)
          return
        }
      }
      if (this.id) {
        const { data: res } = await this.$axios.post('myself', {
          id: this.id,
          content: this.info.content,
          contentHtml: this.info.contentHtml
        })
        if (res.status !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.$router.push('/myself')
      } else {
        const { data: res } = await this.$axios.post('myself', this.info)
        console.log(res)
        if (res.status !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.$router.push('/myself')
      }
    }
  }
}
</script>

<style scoped lang='less'>
section {
  margin: 15px 0;
  .el-input {
    width: 100%;
    height: 38px;
    margin: 5px 0;
    ::v-deep input {
      border-color: #eee !important;
    }
  }
}
.markdown-body {
  height: 70vh;
  box-shadow: none !important;
  border: 1px solid #eee !important;
}
.submit {
  width: 200px;
  height: 40px;
  font-size: 14px;
  color: #fff;
  margin-top: 15px;
}
@media screen and (max-width: 600px) {
  .markdown-body {
    height: 100vh !important;
    box-shadow: none !important;
  }
  section {
    margin: 10px 0;
    box-shadow: none;
  }
  .submit {
    width: 150px;
    height: 36px;
    margin: 20px 0 20px;
    line-height: 36px;
    padding: 0;
  }
}
</style>
