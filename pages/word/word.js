//index.js
//获取应用实例

let world = require('../../store/word.js')
Page({
  data: {
    world: world
  },
  onLoad() {},
  toWord(e) {
    const isto = e.target.dataset.to
    if (isto) {
      wx.showModal({
        content: "敬请期待",
        confirmText: "确定",
        cancelText: "取消"
      })
    } else {
      wx.navigateTo({
        url: '../wordDetail/wordDetail'
      })
    }
  }
})
