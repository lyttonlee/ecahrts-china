// console.log('start')

import echarts from 'echarts'
import china from 'echarts/map/js/china'
// import sichuan from 'echarts/map/js/province/sichuan'
// import anhui from 'echarts/map/js/province/anhui'

//定义全国省份的数组
let provinces = ['shanghai', 'hebei','shanxi','neimenggu','liaoning','jilin','heilongjiang','jiangsu','zhejiang','anhui','fujian','jiangxi','shandong','henan','hubei','hunan','guangdong','guangxi','hainan','sichuan','guizhou','yunnan','xizang','shanxi1','gansu','qinghai','ningxia','xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan']
 
let provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林','黑龙江',  '江苏', '浙江', '安徽', '福建', '江西', '山东','河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾']

// 初始化echarts
let map = echarts.init(document.getElementById('map'))
// console.log(map)

// 定义初始加载的地图区域,中国地图
let selected = 'china'

// 定义加载地图的方法
// 参数为要显示地图区域的名字
let loadMap = (param) => {
  map.setOption({
    geo: {
      // map: 'china' | '四川'
      // 必须要先引入了对应地图的js文件或者json文件，在这一步的时候，echarts会自动将对应的JS文件注入，地图才会显示.
      map: param
    }
  })
}

// 第一次加载地图
loadMap(selected)

// 判断当前要加载的地图是不是省？
let isProvince = (name) => {
  return provincesText.some((province) => {
    return province === name
  })
}

// 定义方法加载某个省的地图文件
let loadScriptMap = (name, callback) => {
  // 获取这个省的拼音名字 name = '四川' => pinyinName = 'sichuan'
  let pinyinName = provinces[provincesText.indexOf(name)]
  console.log(pinyinName)
  // 引入这个对应的地图JS，如果是在项目中要打包，请将这些文件提取出来，放在静态资源中
  // build的时候这些文件不会被打包，无可加载资源地图是不会显示的！！！！
  let currentMap = require(`echarts/map/js/province/${pinyinName}`)
  callback(name)
}

// 监听地图点击事件
map.on('click', (ev) => {
  // 如果点击的是一个省，那就切换到这个省的地图
  if (isProvince(ev.name)) {
    selected = ev.name
    console.log(selected)
    // 从外部加载这个省的地图文件
    loadScriptMap(ev.name, loadMap)
  } else {
    // 否则切换中国地图
    selected = 'china'
    loadMap(selected)
  }
})