//index.js
//获取应用实例
import APIS from '../../config/server'

Page({
  data: {
    toView: 'green',
    allHero: [],
    heroNav: [],
    navIndex: 0,
    herolist: []
  },
  fatchData() {
    const _this = this
    wx.request({
      url: APIS.heroList,
      data: {},
      success: function (res) {
        if (res.data.success) {
          _this.setData({
            heroNav: res.data.data.nav,
            herolist: res.data.data.heroList,
            allHero: res.data.data.heroList
          })
        }
      }
    })
  },
  onLoad() {
    this.fatchData()
  },
  toDetail(e) {
    let item = e.target.dataset.item
    let urlArr = item.infourl.split('?')
    let prams = {
      id: item.heroid,
      url: urlArr[0]
    }
    wx.navigateTo({
      url: '../heroDetail/heroDetail?prams=' + JSON.stringify(prams)
    })
  },
  scroll() {},
  selectAear(e) {
    const index = e.target.dataset.index
    const slectItem = e.target.dataset.item
    let allHero = this.data.allHero
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
