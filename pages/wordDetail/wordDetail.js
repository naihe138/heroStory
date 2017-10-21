import APIS from '../../config/server'
Page({
  data: {
    world: []
  },
  fatchData() {
    const _this = this
    wx.request({
      url: APIS.word,
      data: {},
      success: function (res) {
        if (res.data.success) {
          _this.setData({
            world: res.data.data
          })
        }
      }
    })
  },
  onLoad() {
    this.fatchData()
  },
  toWord(e) {
    let id = e.target.dataset.id
    wx.navigateTo({
      url: '../wordItem/wordItem?id=' + id
    })
  }
})
