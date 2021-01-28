<template>
  <div class="create-article">
    <section>
      <h2 class="tit">这是我给你造的开心果乐园！</h2>
      <el-input placeholder="标题" v-model="info.title" clearable>
      </el-input>
    </section>

    <vue-tinymce v-model="info.contentHtml" :setting="setting" ref="md" />
    <section>
      <!-- <date @getDate="getDate" :originalDate="data.time" v-if="isReset"></date> -->
      <el-input placeholder="文章摘要" prefix-icon="el-icon-document" clearable v-model="info.describe">
      </el-input>

      <!-- <div class="upload-box" v-if="!uploadToggle">
        <el-upload class="upload-demo" :auto-upload="false" :show-file-list="false" :on-change="musicUpload" action="" drag>
          <template v-if="data.music && data.music.url">
            <i class="el-icon-headset"></i>
            <div class="el-upload__text">{{data['music'].name}}</div>
          </template>
          <template v-else>
            <i class="el-icon-headset"></i>
            <div class="el-upload__text">背景音乐</div>
          </template>
        </el-upload>
        <el-upload class="upload-demo" :auto-upload="false" :show-file-list="false" :on-change="imgUpload" action="" drag>
          <img v-if="data.image && data.image.url" :src="data.image.url">
          <i class="el-icon-picture-outline-round"></i>
          <div class="el-upload__text">封面图片 (680*440)</div>
        </el-upload>
      </div>
      <template v-else>
        <el-input placeholder="音乐地址" prefix-icon="el-icon-headset" clearable>
        </el-input>
        <el-input placeholder="封面图片" prefix-icon="el-icon-picture-outline-round" clearable>
        </el-input>
      </template>-->

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
      activeEditor: null,
      setting: {
        menubar: false,
        toolbar: 'undo redo | wordcount | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |',
        toolbar_drawer: 'sliding',
        quickbars_selection_toolbar: 'removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor',
        plugins: 'link image media table lists fullscreen quickbars wordcount',
        language: 'zh_CN', // 本地化设置
        height: 350,
        branding: false
      },
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
      }
    }
  },

  created () {

  },
  mounted () {
    this.activeEditor = this.$tinymce.activeEditor // 当前富文本编辑器
  },
  methods: {
    // 获取富文本编辑器内容
    getBody () {
      const editBody = this.activeEditor.getBody()
      this.activeEditor.selection.select(editBody)
      const text = this.activeEditor.selection.getContent({ format: 'text' }).replace(/\n/g, ' ') // 获取纯文本
      this.info.content = text // 文章纯文本内容
      this.info.words = text.length // 统计字数（包含空格）
      console.log(text)
    },
    async handleSubmit () {
      this.getBody()
      const res = await this.$axios.post('article', this.info)
      console.log(res)
    }
  }
}
</script>

<style lang='less'>
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
  .tox-tinymce {
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
      max-width: 360px;
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
