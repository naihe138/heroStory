# heroStory
王者荣耀故事站--小程序

### 前言
一直想学习开发一款小程序，无奈拖延至今，恰逢王者荣耀周年庆，然后本人对王者英雄的人物、配音比较感兴趣，就有开发一款王者荣耀故事站的小程序的念头。想要了解故事背景就直接打开小程序就好了。

ps: 因为是业余时间做的，所以 pc 端的爬虫数据展示方面就有点粗糙。

### 技术栈
> 小程序 + nuxt + koa2 + vue2.0 + vuex + nginx + pm2

### 小程序效果图

![WechatIMG2252.jpeg][1]

#### 线上体验
![WechatIMG2252.jpeg][2]


### pc 爬虫效果图
![44][3]
![44][4]
![44][5]
![44][6]

#### 线上地址

[https://story.naice.me/][7]

### 首先说下爬虫数据

小程序后台爬虫： [https://github.com/naihe138/hero-story-crawer][13]

数据爬虫都是从王者荣耀故事站官网来爬取的，然后直接用 next/koa 作为后台，用`cheerio`模块和`request-promise`模块基本就可以爬到我们想要的数据了，有时候爬取出来的数据回事乱码（非 utf-8的）我们就借助`iconv`模块去转成我们想要的中文字符。这些模块说明文档在相应的 gihub中都说的很详细。就不一一介绍。
下面举例一下爬虫英雄列表首页的过程，都注释在代码里面

```
// 引入相应的模块
import rp from 'request-promise'
import cheerio from 'cheerio'
import { writeFileSync } from 'fs'

const Iconv = require('iconv').Iconv
const iconv = new Iconv('GBK', 'UTF-8')

// request 国外网站的时候使用本地的 VPN
// import Agent from 'socks5-http-client/lib/Agent'

// 爬取英雄列表
const getHeroStory = async() => {
  // request-promise的配置
  const options = {
    uri: 'https://pvp.qq.com/act/a20160510story/herostory.htm',
    // agentClass: Agent,
    // agentOptions: {
    //   socksHost: 'localhost',
    //   socksPort: 1080 // 本地 VPN 的端口，这里用的 shadowsocks
    // },
    transform: body => cheerio.load(body) // 转成相应的爬虫
  }
  // 爬取导航复制给cheerio的$对象
  const $ = await rp(options)
  let navArr = []
  let heroList = []
  $('#campNav li').each(function () {
    // 分析节点拿到数据
    const type = $(this).attr('data-camptype')
    const text = $(this).find('a').text()
    // push 到navArr数组中
    navArr.push({ type, text })
  })
  // 爬取英雄列表
  const hreodata = await rp({
    uri: 'https://pvp.qq.com/webplat/info/news_version3/15592/18024/23901/24397/24398/m17330/list_1.shtml'
  })
  // 数据处理
  let str = hreodata.replace('createHeroList(', '')
  str = str.substr(0, str.length - 1)
  let r = JSON.parse(str)
  heroList = r.data.filter(item => item)

  let result = {
    nav: navArr,
    heroList
  }
  // 写入文件
  writeFileSync('./server/crawerdb/heroList.json', JSON.stringify(result, null, 2), 'utf-8')

  return result
}

// 跟去英雄 id，和 url 爬取英雄的详细介绍
const getHeroDatail = async(url, _id) => {
  // 配置
  const option = {
    encoding: null,
    url
  }
  // 爬取英雄详情
  const $ = await rp(option).then(body => {
    // 字符乱码处理
    var result = iconv.convert(new Buffer(body, 'binary')).toString()
    return cheerio.load(result)
  })
  // 这里拿到$之后就像 jq那样子，根据文档就可以进行爬虫的数据处理了
  // 下面都是数据处理
  let heroName = ''
  let heroDetail = []
  let ht = ''
  let hc = ''
  if ($('#heroStory').length) {
    heroName = $('.hero_name pf').text()
    $('#heroStory p').each(function () {
      let text = $(this).text().trim()
      heroDetail.push({
        type: 'text',
        text: text
      })
    })
  } else if ($('.textboxs').length) {
    $('.textboxs p').each(function () {
      if ($(this).find('img').length) {
        let src = $(this).find('img').attr('src')
        heroDetail.push({
          type: 'img',
          text: 'https:' + src
        })
      } else {
        let text = $(this).text().trim()
        heroDetail.push({
          type: 'text',
          text: text
        })
      }
    })
  }
  let hStr = ($('#history_content').text()).replace(/(^\s+)|(\s+$)/g, '');

  if (hStr.length > 0) {
    ht = $('.history_story h3').text()
    hc = $('#history_content').text()
  }
  let result = {
    heroName,
    heroDetail,
    historyTitle: ht,
    historyContent: hc
  }
  // 写入文件
  writeFileSync('./server/crawerdb/herodetail' + _id + '.json', JSON.stringify(result, null, 2), 'utf-8')
  return result
}

export default {
  getHeroStory,
  getHeroDatail
}

```
然后在 koa里面配置好路由就可以一步步爬取数据了

### nuxt

>Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。我们的目标是创建一个灵活的应用框架，你可以基于它初始化新项目的基础结构代码，或者在已有 Node.js 项目中使用 Nuxt.js。Nuxt.js 预设了利用Vue.js开发服务端渲染的应用所需要的各种配置。

根据文档 page 下面的结构就是对应的 vue 的路由结构，然后配置好`nuxt.config.js`你所需要模块、插件、webpack 配置等等都有很好的[中文文档][8]说明。会 vue的同学，去看一下官网就可以大概有个很好的了解了。
下面是整个项目的目录结构
````
.nuxt/
build/  ---打包发布
components/ ---组件
layout/   ---布局
pages/    ---对应的路由
--| about.vue/
--| music.vue/
--| word.vue/
--| skin/
--| index.vue
--| ....
server/  --对应的koa 后台
static/  ---静态资源
store/  --vuex
````

### 小程序

这是我第一个小程序。所以一开始看文档，写起数据绑定的时候，会有种跟 vue 的异曲同工的感觉.
下面是官荒的小例子

demo.wxml
```
<view> Hello {{name}}! </view>
<view wx:for="{{array}}">
  {{index}}: {{item.message}}
</view>
```
demo.js
```
Page({
  data: {
    name: '小程序',
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }]
  }
})
```

是不是太熟悉了？？？？当然里面实现的技术还是想差别很大的，想去详细的了解，我觉得《[一起脱去小程序的外套 - 微信小程序架构解析][9]》这篇文章，很是不错，我初学的时候，是先体验一番[小程序的demo][10],然后直接动手（光看不动瞎扯淡），再去深入了解原理、pages 的生命周期，逻辑处理、框架、组件、api 等等，理解了这些之后，后面就很容易啦！！

附一张小程序的运行生命周期图(来源于遇见大神的文章)
![44][11]


### github
小程序：[https://github.com/naihe138/heroStory][12]
小程序后台爬虫： [https://github.com/naihe138/hero-story-crawer][13]

如果大家觉得有用的话，求一个闪晶晶的 start 谢谢各位大佬

  [1]: https://user-gold-cdn.xitu.io/2017/10/27/ae84c74eeba752a3337d9e3b685d6a56
  [2]: https://user-gold-cdn.xitu.io/2017/10/27/64a10e01a2e69da5686ca06ad7437c0c
  [3]: https://user-gold-cdn.xitu.io/2017/10/27/d2d9c1e0e2a432dfcacfad4643067123
  [4]: https://user-gold-cdn.xitu.io/2017/10/27/f1a7815f16c7faaf18eea8a4bae41e25
  [5]: https://user-gold-cdn.xitu.io/2017/10/27/1ae9f01dde00b271ba5245d965d257d8
  [6]: https://user-gold-cdn.xitu.io/2017/10/27/7e6ab1cd8a66fc5e495e32820c4ed0e6
  [7]: https://story.naice.me/
  [8]: https://zh.nuxtjs.org/guide/configuration
  [9]: https://zhuanlan.zhihu.com/p/25105936?utm_medium=social&utm_source=weibo
  [10]: https://mp.weixin.qq.com/debug/wxadoc/dev/demo.html
  [11]: https://user-gold-cdn.xitu.io/2017/10/27/3ca5cfd6120bbdce619bd9da1219f4e1
  [12]: https://github.com/naihe138/heroStory
  [13]: https://github.com/naihe138/hero-story-crawer
