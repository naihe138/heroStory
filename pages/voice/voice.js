//index.js
//获取应用实例
const app = getApp()
import APIS from '../../config/server'

Page({
  data: {
    heroNav: [],
    detail: {},
    navIndex: 0,
    src: ''
  },
  fatchNav() {
    const _this = this
    wx.request({
      url: APIS.voiceNav,
      data: {},
      success: function (res) {
        if (res.data.success) {
          let r = res.data.data
          _this.setData({
            heroNav: r.dhty_e9
          })
          let id = r.dhty_e9[3].yxid_a7
          _this.fatchDetail(id)
        }
      }
    })
  },
  fatchDetail(id) {
    const _this = this
    wx.request({
      url: APIS.voiceDetail,
      data: { id },
      success: function (res) {
        console.log(res.data)
        if (res.data.success) {
          let type = Object.prototype.toString.call(res.data.data.yxpfyy_fe)
          if (/undefined/gi.test(type)) {
            _this.setData({
              detail: res.data.data || {}
            })
            return;
          }
          if (/Object/.test(type)) {
            let arr = []
            arr.push(res.data.data.yxpfyy_fe)
            res.data.data.yxpfyy_fe = arr
          }
          let r = res.data.data
          r.yxpfyy_fe.map((item) => {
            if (!/^http/.test(item.pfbanner_ed)) {
              item.pfbanner_ed = 'https:' + item.pfbanner_ed
            }
            return item
          })
          _this.setData({
            detail: r
          })
        }
      }
    })
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.setSrc('http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46')
  },
  onLoad() {
    this.fatchNav()
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
    const id = e.target.dataset.id
    this.setData({
      navIndex: index
    })
    this.fatchDetail(id)
  }
})
