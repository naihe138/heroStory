//index.js
//获取应用实例
import APIS from '../../config/server'
Page({
  data: {
    music: {},
    poster: '',
    name: '王者荣耀语音',
    author: ' naice',
    src: '',
  },
  fatchData() {
    const _this = this
    wx.request({
      url: APIS.music,
      data: {},
      success: function (res) {
        if (res.data.success) {
          _this.setData({
            music: res.data.data
          })
        }
      }
    })
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  play(e) {
    const _this = this
    let url = e.target.dataset.url
    if (!/^http/.test(url)) {
      url = 'https:' + url
    }
    this.setData({
      src: url
    })
    setTimeout(() => {
      _this.audioCtx.play()
    }, 10)
  },
  playMain() {
    const _this = this
    let url = this.data.music.yllb_38[0].gq_db
    if (!/^http/.test(url)) {
      url = 'https:' + url
    }
    this.setData({
      src: url
    })
    setTimeout(() => {
      _this.audioCtx.play()
    }, 10)
  },
  onLoad() {
    this.fatchData()
  },
})
