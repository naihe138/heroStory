let world = require('../../store/word.js')
Page({
  data: {
    world: world
  },
  onLoad() {},
  toWord() {
    wx.navigateTo({
      url: '../wordDetail/wordDetail'
    })
  }
})
