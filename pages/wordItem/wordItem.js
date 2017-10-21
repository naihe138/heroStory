import APIS from '../../config/server'
const mainTitleImag = {
  '482175': 'https://game.gtimg.cn/images/yxzj/act/a20160510story/btn_por_origin5_hover.jpg',
  '482168': 'https://game.gtimg.cn/images/yxzj/act/a20160510story/btn_por_origin4_hover.jpg',
  '482154': 'https://game.gtimg.cn/images/yxzj/act/a20160510story/btn_por_origin3_hover.jpg',
  '482143': 'https://game.gtimg.cn/images/yxzj/act/a20160510story/btn_por_origin2_hover.jpg',
  '482129': 'https://game.gtimg.cn/images/yxzj/act/a20160510story/btn_por_origin1_hover.jpg'
}
Page({
  data: {
    navTitle: 'https://game.gtimg.cn/images/yxzj/act/a20160510story/btn_por_origin5_hover.jpg',
    mainNav: {},
    subNav: [],
    constent: {},
    navIndex: -1
  },
  fatchNav(id) {
    const _this = this
    wx.request({
      url: APIS.wordNav,
      data: { id },
      success: function (res) {
        if (res.data.success) {
          let r = res.data.data
          let main = r.shift()
          _this.setData({
            mainNav: main,
            subNav: r
          })
          _this.fatchDetail(main.InfoId, main.infourl)
        }
      }
    })
  },
  fatchDetail(id, url) {
    const _this = this
    wx.request({
      url: APIS.wordDetail,
      method: 'POST',
      data: { id, url },
      success: function (res) {
        if (res.data.success) {
          console.log(res.data.data)
          _this.setData({
            constent: res.data.data
          })
        }
      }
    })
  },
  onLoad(option) {
    this.fatchNav(option.id)
    this.setData({
      navTitle: mainTitleImag[option.id]
    })
  },
  tapSub(e) {
    let index = e.target.dataset.index
    let id = this.data.subNav[index].InfoId
    let url = this.data.subNav[index].infourl

    this.setData({
      navIndex: index
    })
    this.fatchDetail(id, url)
  },
  tapMain() {
    let id = this.data.mainNav.InfoId
    let url = this.data.mainNav.infourl
    this.setData({
      navIndex: -1
    })
    this.fatchDetail(id, url)
  }
})
