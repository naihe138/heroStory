let heroData = require('../../store/herodetail.js')

Page({
  data: {
    toView: 'green',
    hero: heroData
  },
  fatchData() {
    console.log('123')
  },
  testImag(str) {
    consle.log(str)
    return /https:\/\//.test(str)
  },
  showHistory() {
    wx.showModal({
      title: '历史上的狄仁杰',
      content: '狄仁杰， 字怀英， 唐代的名相之一。 他是少数几个通过明经科考试而跻身高位的人之一，《 旧唐书》 上有传。 在武则天临朝称制之时， 也被人诬告而蒙冤， 差点死掉。 如不是他机智地把消息送出， 让武则天来见他， 会跟众多蒙冤者一样早就死了。 他为官清廉正直， 敢于说实话， 因此而得到武则天的重用， 两次拜相。 为御史中丞期间， 处理成百件案件， 无一冤屈。 西方汉学家因此而创作狄公案， 特意强调其断案如神。 ',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onLoad: function (option) {
    console.log(option)
  },
})
