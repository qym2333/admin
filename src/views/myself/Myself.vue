<template>
  <div class="info">
    <h2 class="tit">关于你</h2>
    <div class="content">
      <mavon-editor v-html="info.contentHtml" />
    </div>
    <el-button class="submit" type="primary" @click="$router.push('/myself/info')">Edit</el-button>
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
      },
      isVisible: false
    }
  },

  created () {
    this.renderData()
  },
  mounted () {

  },
  methods: {
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
    }
  }
}
</script>

<style scoped lang='less'>
.content {
  padding: 20px 0;
  font-size: 14px;
  ::v-deep .markdown-body {
    box-shadow: none !important;
    min-height: auto;
    p {
      line-height: 36px;
      margin: 0 0 22px;
      font-size: 16px;
      mark {
        padding: 4px 4px 0;
        line-height: 22px;
        display: inline-block;
        font-size: 16px;
      }
      strong {
        font-weight: bold;
        font-size: 16px;
      }
      ins {
        font-size: 16px;
      }
    }
    h1,
    h2,
    h3,
    h4,
    h5 {
      border: 0;
      padding: 0;
      margin: 0 0 18px;
      line-height: 28px;
    }
    blockquote {
      background: white;
      border-radius: 10px;
      padding-left: 22px;
      margin-bottom: 20px;
      p {
        margin: 10px 0;
      }
    }
    ul,
    ol {
      margin: 0 0 20px;
      li {
        margin: 10px 0;
        line-height: 28px;
      }
    }
    ul li {
      list-style: none;
      position: relative;
      &:after {
        content: '☼';
        font-size: 8px;
        position: absolute;
        top: 0px;
        left: -16px;
      }
    }
    iframe {
      width: 100%;
      height: 450px;
      margin-bottom: 20px;
    }
    pre {
      padding: 0;
      font-size: 16px;
      max-height: 500px;
      overflow: hidden;
      border-radius: 4px;
      .hljs {
        padding: 10px 0 10px 12px;
        line-height: 20px;
        overflow: hidden;
        max-height: 500px;
        box-sizing: border-box;
        & > code {
          overflow-y: auto;
          max-height: 480px;
          display: block;
          &::-webkit-scrollbar {
            width: 4px;
          }
          &::-webkit-scrollbar-thumb {
            background: #949494;
          }
          &::-webkit-scrollbar-track {
            background: #23241f;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 800px) {
  .content {
    padding: 10px 0;
    ::v-deep .markdown-body {
      p {
        line-height: 28px;
      }
      iframe {
        height: 390px;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .content {
    ::v-deep .markdown-body {
      iframe {
        height: 310px;
      }
      blockquote {
        padding-left: 16px;
      }
      p {
        font-size: 14px;
        strong,
        mark {
          font-size: 14px;
        }
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .content {
    ::v-deep .markdown-body {
      iframe {
        height: 260px;
      }
    }
  }
}
@media screen and (max-width: 414px) {
  .content {
    ::v-deep .markdown-body {
      iframe {
        height: 220px;
      }
    }
  }
}
</style>
