let world = require('../../store/word.js')
Page({
  data: {
    navTitle: 'https://game.gtimg.cn/images/yxzj/act/a20160510story/btn_por_origin5_hover.jpg'
  },
  onLoad() {},
  toWord() {
    wx.navigateTo({
      url: '../wordDetail/wordDetail'
    })
  }
})
