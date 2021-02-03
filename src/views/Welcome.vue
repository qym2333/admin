<template>
  <div class="welcome">
    <h2><span class="el-icon-magic-stick"></span> {{remark || '愿所有的美好如约而至，愿所有的黑暗都能看到希望。'}}</h2>
    <p class="time">
      <span>{{time.year || '请珍惜时间'}}</span>
      <span>{{time.date || '一寸光阴一寸金'}}</span>
    </p>
    <section class="info">
      <i class="title-icon el-icon-lollipop"></i>
      <h4>Hello，你好，我是谁！</h4>
      <div>
        <p>重新认识、审视、定义一下自己吧。</p>
        <ul>
          <li><span class="el-icon-lollipop"></span>现在的你，是个怎样的人？</li>
          <li><span class="el-icon-lollipop"></span>你希望以后成为怎样的人？</li>
          <li><span class="el-icon-lollipop"></span>你心中的未来是怎样的？</li>
          <li><span class="el-icon-lollipop"></span>最想做的一件事是什么？</li>
          <li><span class="el-icon-lollipop"></span>你现在的生活，开心吗？</li>
          <li><span class="el-icon-hot-water"></span>要活成一个朝气蓬勃、勇敢热烈的人啊。</li>
        </ul>
      </div>
    </section>
    <section>
      <h3>article</h3>
      <div class="box" v-if="articleInfo">
        <p>
          <span class="total">{{articleInfo.count}}</span>
          <span>篇</span>
        </p>
        <p>{{timeFromNow(articleInfo.lastestTime)}} 发布了新的网抑云，继续加油哦！</p>
      </div>
      <div class="box" v-else>
        <p>
          <span class="total">0</span>
          <span>篇</span>
        </p>
        <p>网抑云时间到啦！</p>
      </div>
    </section>
    <section></section>
    <section>
      <h3 class="link" @click="$router.push('/envelope')">envelope</h3>
      <div class="envelope" v-if="envelopeList && envelopeList.length > 0">
        <p v-for="(item, index) in envelopeList" :key="index"><span>{{index + 1}}</span>{{item.content}}</p>
      </div>
      <div class="envelope" v-else style="display: flex;text-align: center;align-items: center;height: 80%;">
        <p>空空如也</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      remark: '', // 一言
      time: {},
      timer: null
    }
  },

  created () {

  },
  mounted () {
    this.$store.dispatch('getEnvelopeList')
    this.$store.dispatch('getArticleInfo')
    this.oneRemark()
    this.timer = setInterval(this.date, 1000)
    document.querySelector('.container').style.background = '#f9fcff'
  },
  destroyed () {
    // 清除倒计时
    clearInterval(this.timer)
    if (document.querySelector('.container')) {
      document.querySelector('.container').style.background = '#fff'
    }
  },
  computed: {
    envelopeList () {
      return this.$store.state.envelopeList.data
    },
    articleInfo () {
      return this.$store.state.articleCountInfo
    }
  },
  methods: {
    // 一言
    async oneRemark () {
      const { data: res } = await this.$axios.get('https://v1.hitokoto.cn/')
      this.remark = `${res.hitokoto}`
    },
    date () {
      const date = new Date()
      // const year = date.getFullYear()
      // const target = new Date(year, 11, 31, 23, 59, 59)
      const target = new Date('2021/4/21 00:00:00')
      const time = (target - date) / 1000

      const day = Math.floor(time / (24 * 60 * 60))
      const hour = Math.floor(time % (24 * 60 * 60) / (60 * 60))
      const minute = Math.floor(time % (24 * 60 * 60) % (60 * 60) / 60)
      const second = Math.floor(time % (24 * 60 * 60) % (60 * 60) % 60)

      this.time = {
        // year: `${year}年倒计时`,
        year: '还剩下',
        date: `${day}天${hour}时${minute}分${second}秒`
      }
    },
    timeFromNow (time) {
      const format = 'YYYY-MM-DD HH:mm:ss'
      const formatTime = 'HH:mm:ss'
      let timeStr = this.$moment(time).format(format)
      const fromNowStr = this.$moment(time).fromNow(true)
      if (fromNowStr.indexOf('小时') > 0 && parseInt(fromNowStr) > 5) {
        timeStr = '今天 ' + this.$moment(time).format(formatTime)
      } else {
        timeStr = fromNowStr + '前'
      }
      return timeStr
    }
  }
}
</script>

<style scoped lang='less'>
.welcome {
  margin: 0 -20px;
  color: #3b4b5a;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  h2 {
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    margin: 10px 0 30px;
    letter-spacing: 1px;
    color: #0e8dff;
    span {
      color: #0e8bff;
      font-size: 20px;
    }
  }
  .time {
    position: absolute;
    right: 0;
    top: 30px;
    color: #fff;
    background: #ff8a8a;
    padding: 4px 8px 3px;
    border-radius: 4px 0 0 4px;
    display: flex;
    text-align: right;
    flex-direction: column;
    z-index: 999;
    &::after {
      content: '';
      position: absolute;
      bottom: -7px;
      right: 0;
      border: 4px solid transparent;
      border-top-color: #c87878;
      border-right-color: #c87878;
    }
    span:first-child {
      font-size: 12px;
      margin-bottom: 2px;
    }
  }
  section {
    width: calc(50% - 15px);
    display: inline-block;
    height: 300px;
    box-shadow: 0 2px 20px #e0f0ff;
    border-radius: 20px;
    background: #fff;
    padding: 20px;
    margin-bottom: 24px;
    position: relative;
    h3 {
      font-size: 18px;
      color: #7fc3ff;
      font-weight: 400;
      text-transform: uppercase;
      position: relative;
      height: 20px;
      margin-bottom: 20px;
      &.link {
        cursor: pointer;
      }
      &::before {
        content: '';
        height: 1px;
        width: 26px;
        background: #c7dcf3;
        position: absolute;
        bottom: -2px;
      }
    }
    .total {
      font-size: 40px;
      color: #0e8bff;
      margin-right: 8px;
      font-style: oblique;
    }
    .box {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      height: calc(100% - 40px);
      & > p:last-child {
        margin-top: 30px;
        color: #c4ccd4;
      }
    }
    .envelope {
      p {
        width: 100%;
        height: 28px;
        line-height: 28px;
        color: #909399;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 13px;
        &:hover {
          color: #0e8bff;
          span {
            background: #6cb8ff;
          }
        }
        span {
          width: 16px;
          height: 16px;
          display: inline-block;
          background: #dae6fd;
          color: #fff;
          border-radius: 50%;
          text-align: center;
          line-height: 18px;
          margin-right: 6px;
          font-size: 12px;
          vertical-align: text-bottom;
        }
      }
    }
    &.info {
      .title-icon {
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        vertical-align: baseline;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: absolute;
        left: 14px;
        top: 10px;
        font-size: 30px;
        color: #7fc3ff;
      }
      h4 {
        font-size: 16px;
        font-weight: 400;
        margin: 22px 0 10px;
        color: #0e8bff;
        padding-left: 15px;
      }
      p {
        font-size: 13px;
        color: #909399;
        padding-left: 15px;
      }
      ul {
        margin: 10px 0;
        padding: 14px 15px 12px;
        border-radius: 10px;
        border: 1px solid #edf3f9;
        li {
          position: relative;
          color: #5182b3;
          line-height: 24px;
          font-size: 13px;
          letter-spacing: 1px;
          span {
            margin-right: 4px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .welcome {
    margin: 0;
    section {
      width: 100%;
      margin-bottom: 15px;
    }
    h2 {
      font-size: 14px;
      margin-bottom: 20px;
    }
    .time {
      position: static;
      flex-direction: row;
      margin-bottom: 20px;
      border-radius: 4px;
      span:first-child {
        margin-right: 4px;
      }
    }
  }
}
</style>
