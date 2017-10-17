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
  onLoad: function (option) {
    console.log(option)
  },
})
