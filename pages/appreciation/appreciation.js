//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World'
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad() {
    console.log(123)
  },
  toGo(e) {
    const str = e.target.dataset.url
    if (str === '') {
      wx.showModal({
        content: "敬请期待",
        confirmText: "确定",
        cancelText: "取消"
      })
    } else {
      wx.navigateTo({
        url: `../${str}/${str}`
      })
    }
  }
})
