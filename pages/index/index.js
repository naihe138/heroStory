//index.js
//获取应用实例
const app = getApp()
let heroData = require('../../store/herolist.js')
let allHero = heroData.heroList

Page({
  data: {
    toView: 'green',
    heroNav: heroData.nav,
    navIndex: 0,
    herolist: allHero
  },
  fatchData() {
    consle.log('123')
  },
  onLoad: function () {
    // this.fatchData()
    this.setData({
      motto: 123
    })
  },
  scroll: function (e) {
    console.log(e)
  },
  toDetail: function (event) {
    console.log(event)
  },
  selectAear(e) {
    const index = e.target.dataset.index
    const slectItem = e.target.dataset.item

    let r = allHero.filter(item => item.camptype === slectItem.type)
    this.setData({
      navIndex: index,
      herolist: r
    })
  }
})
