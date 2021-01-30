<template>
  <div class="create-article">
    <section>
      <h2 class="tit">这是我给你造的开心果乐园！</h2>
      <el-input placeholder="标题" v-model="info.title" clearable>
      </el-input>
    </section>
    <mavon-editor v-model="info.content" :boxShadow="false" :subfield="false" @change="change" ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" />
    <section>
      <!-- <date @getDate="getDate" :originalDate="data.time" v-if="isReset"></date> -->
      <el-input placeholder="文章摘要" prefix-icon="el-icon-document" clearable v-model="info.describe">
      </el-input>

      <div class="upload-box" v-if="!uploadToggle">
        <el-upload class="upload-demo" :auto-upload="false" :show-file-list="false" :on-change="musicUpload" action="" drag>
          <template v-if="info.music && info.music.url">
            <i class="el-icon-headset"></i>
            <div class="el-upload__text">{{info['music'].name}}</div>
          </template>
          <template v-else>
            <i class="el-icon-headset"></i>
            <div class="el-upload__text">背景音乐</div>
          </template>
        </el-upload>
        <el-upload class="upload-demo" :auto-upload="false" :show-file-list="false" :on-change="imgUpload" action="" drag>
          <img v-if="info.image && info.image.url" :src="info.image.url">
          <i class="el-icon-picture-outline-round"></i>
          <div class="el-upload__text">封面图片 (680*440)</div>
        </el-upload>
      </div>
      <template v-else>
        <el-input placeholder="音乐地址" prefix-icon="el-icon-headset" clearable>
        </el-input>
        <el-input placeholder="封面图片" prefix-icon="el-icon-picture-outline-round" clearable>
        </el-input>
      </template>

      <el-switch active-text="输入链接" inactive-text="文件上传">
      </el-switch>

      <el-switch v-model="info.hide" inactive-text="发布文章" active-text="隐藏文章">
      </el-switch>
    </section>
    <el-button class="submit" type="primary" @click="handleSubmit">SUBMIT</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: null,
      activeEditor: null,
      // 文章内容
      info: {
        title: '', // 标题
        content: '', // 内容
        contentHtml: '', // 内容解析html
        describe: '', // 文章摘要
        time: '', // 时间
        image: {}, // 图片
        music: {}, // 音乐
        words: 0,
        hide: false // 隐藏
      },
      upload: {}, // 上传文件
      uploadToggle: false // 上传开关
    }
  },

  watch: {
    'info.image.url': {
      handler (val) {
        if (!val) {
          delete this.upload.image
        }
      }
    },
    'info.music.url': {
      handler (val) {
        if (!val) {
          delete this.upload.music
        }
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    if (this.id) this.renderData(this.id)
  },
  mounted () {
  },
  methods: {
    musicUpload (file) {
      this.uploads('music', file)
    },
    imgUpload (file) {
      this.uploads('image', file)
    },
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
      this.info.words = value.length // 字数
    },
    async renderData (id) {
      const { data: res } = await this.$axios.get(`article/${id}`)
      this.info = res.data[0]
    },
    // 发布文章
    async handleSubmit () {
      if (this.id) {
        const { data: res } = await this.$axios.put(`article/${this.id}`, this.info)
        if (res.status !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.$router.push('/article')
      } else {
        // 摘要默认内容，摘要为空时使用文本
        const describe = this.info.describe
        this.info.describe = !describe ? this.info.content.slice(0, 60) + '...' : describe
        const { data: res } = await this.$axios.post('article', this.info)
        if (res.status !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.$router.push('/article')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.create-article {
  section {
    margin: 15px 0;
    .el-switch,
    .el-input {
      width: 100%;
      height: 38px;
      margin: 8px 0;
    }
  }
  .markdown-body {
    height: 65vh;
    border: 1px solid #eee !important;
  }
  ::v-deep .tox-tinymce {
    height: 65vh;
    box-shadow: none !important;
    border: 1px solid #eee !important;
    border-radius: 4px !important;
  }
  .submit {
    width: 200px;
    height: 40px;
    font-size: 14px;
    color: #fff;
  }
  .upload-box {
    display: flex;
    margin: 10px -7px 6px;
    .upload-demo {
      width: 50%;
      max-width: 400px;
      margin: 0 7px;
      ::v-deep .el-upload {
        width: 100%;
        .el-upload-dragger {
          width: 100%;
          .el-icon-picture-outline-round,
          .el-icon-headset {
            font-size: 46px;
            color: #c0c4cc;
            margin: 42px 0 14px;
            line-height: 50px;
            transition: all 0.3s;
          }
          .el-upload__text {
            color: #98999c;
            transition: all 0.3s;
          }
          &:hover {
            .el-icon-picture-outline-round,
            .el-upload__text,
            .el-icon-headset {
              color: #409eff;
            }
          }
        }
      }
    }
    img {
      width: 100%;
    }
  }
  ::v-deep .el-switch__label {
    color: #98999c;
    font-weight: 400;
    &.is-active {
      color: #409eff;
    }
  }
  @media screen and (max-width: 600px) {
    .markdown-body {
      height: 90vh !important;
      box-shadow: none !important;
    }
    section {
      margin: 10px 0;
      box-shadow: none;
    }
    .submit {
      width: 150px;
      height: 36px;
      margin: 0 0 20px;
      line-height: 36px;
      padding: 0;
    }
    .upload-box .upload-demo ::v-deep .el-upload .el-upload-dragger {
      height: 130px;
      .el-icon-picture-outline-round,
      .el-icon-headset {
        font-size: 36px;
        margin: 22px 0 10px;
      }
    }
  }
}
</style>
