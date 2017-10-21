import APIS from '../../config/server'
Page({
  data: {
    hero: {}
  },
  fatchData(id, url) {
    const _this = this
    wx.request({
      url: APIS.heroDetail,
      method: 'POST',
      data: { id, url },
      success: function (res) {
        if (res.data.success) {
          _this.setData({
            hero: res.data.data
          })
        }
      }
    })
  },
  testImag(str) {
    return /https:\/\//.test(str)
  },
  showHistory() {
    let _this = this;
    wx.showModal({
      title: _this.data.hero.historyTitle,
      content: _this.data.hero.historyContent.trim(),
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  onLoad: function (option) {
    let prams = JSON.parse(option.prams)
    this.fatchData(prams.id, prams.url)
  },
})
