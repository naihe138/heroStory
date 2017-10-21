//index.js
//获取应用实例

import APIS from '../../config/server'
Page({
  data: {
    skin: []
  },
  fatchData() {
    const _this = this
    wx.request({
      url: APIS.skin,
      data: {},
      success: function (res) {
        if (res.data.success) {
          _this.setData({
            skin: res.data.data
          })
        }
      }
    })
  },
  onLoad() {
    this.fatchData()
  },
  open(e) {
    let index = e.target.dataset.index
    let data = this.data.skin[index]
    wx.showModal({
      title: ' H5页面请到浏览器查看',
      content: 'https:' + data.url.trim(),
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  }
})
