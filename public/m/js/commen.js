(function(){
  mui(".mui-scroll-wrapper").scroll({
    indicators: false,
  })
})()

function getSearch(){
  var search = location.search
  // 解码,乱码转成中文
  search = decodeURI(search)
  // 去掉最前面的?
  search = search.slice(1)
  // 以&分割成数组
  var arr = search.split('&')
  var obj = {}
  // 遍历,转成对象
  for(var i = 0; i < arr.length; i++){
  
   var key = arr[i].split('=')[0]
   var value = arr[i].split('=')[1]

  obj[key] = value
  
  }
  return obj
}
function getHistory() {
  var history = localStorage.getItem('history')
  history = JSON.parse(history) || [];
  return history
}
function render() {
  var history = getHistory();
  $('.history').html(template('tpl', { list: history }))
}