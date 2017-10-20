//index.js
//获取应用实例
const app = getApp()
let heroData = require('../../store/herolist.js')
let allHero = heroData.heroList

Page({
  data: {
    heroNav: heroData.nav,
    src: ''
  },
  fatchData() {
    consle.log('123')
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.setSrc('http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46')
  },
  onLoad() {
    // this.fatchData()
    // this.setData({
    //   motto: 123
    // })
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  tabAudio() {
    this.setData({
      src: 'http://game.gtimg.cn/images/yxzj/wtc_static_yxzj/audios/donghuangtaiyi_hall_1_7809614.wav'
    })
    this.audioCtx.play()
  },
  toDetail(e) {
    let item = e.target.dataset.item
    wx.navigateTo({
      url: '../heroDetail/heroDetail?id=' + item.heroid
    })
  },
  selectAear(e) {
    const index = e.target.dataset.index
    const slectItem = e.target.dataset.item
    if (slectItem.type === 'all') {
      this.setData({
        navIndex: 0,
        herolist: allHero
      })
    } else {
      let r = allHero.filter(item => item.camptype === slectItem.type)
      this.setData({
        navIndex: index,
        herolist: r
      })
    }
  }
})
