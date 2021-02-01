<template>
  <div class="articleId">

    <!-- Content -->
    <section>
      <h1 class="title">{{articleInfo.title}}</h1>
      <div class="content">
        <mavon-editor v-html="articleInfo.contentHtml">
        </mavon-editor>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  data () {
    return {
      articleInfo: {}
    }
  },

  created () {
    this.getArticle()
  },
  mounted () {
    document.body.style.overflow = 'auto'
  },
  destroyed () {
    document.body.style.overflow = 'hidden'
  },
  methods: {
    async getArticle () {
      const articleId = this.$route.params.id
      const { data: res } = await this.$axios.get(`article/${articleId}`)
      if (res.status !== 0) return this.$message.error('网络错误或网页资源不存在')
      this.articleInfo = res.data[0]
    }
  }
}
</script>

<style scoped lang='less'>
.articleId {
  position: absolute;
  width: 100%;
  section {
    width: 800px;
    margin: auto;
    transition: all 0.3s;
  }
  h1.title {
    font-size: 30px;
    padding: 130px 0 22px;
    color: #333;
  }
  .content {
    padding: 100px 0;
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
}
@media screen and (max-width: 800px) {
  .articleld {
    section {
      width: 90%;
    }
    h1.title {
      font-size: 20px;
      padding: 90px 0 15px;
    }
    .content {
      padding: 60px 0;
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
}

@media screen and (max-width: 600px) {
  .articleld {
    ::v-deep header {
      &.isUp {
        position: fixed;
        box-shadow: 0 1px 8px #f0f9ff;
        background: rgba(255, 255, 255, 0.9);
        animation: headShow 0.6s both;
      }
      .myself {
        display: none;
      }
    }
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
}
@media screen and (max-width: 500px) {
  .articleld {
    .content {
      ::v-deep .markdown-body {
        iframe {
          height: 260px;
        }
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
