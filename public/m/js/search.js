
$(function () {
  // localStorage.setItem()
  // JSON.stringify

  function getHistory() {
    var history = localStorage.getItem('history')
    history = JSON.parse(history) || [];
    return history
  }
  function render() {
    var history = getHistory();
    $('.history').html(template('tpl', { list: history }))
  }
  render()

  // 点击删除按钮,删除该条记录
  $('.history').on('click', '.btn_delete', function () {
    mui.confirm('确定删除这条记录吗?', '温馨提示', ['是', "否"], function (e) {
      if (e.index === 0) {
        var history = getHistory();
        var idx = $(this).data('idx')

        history.splice(idx, 1)
        localStorage.setItem('history', JSON.stringify(history))
        render()
      }

    })

  })
  // 点击清空历史按钮,清空搜索历史纪录
  $('.history').on('click', '.btn-empty', function () {
    mui.confirm('确定删除全部记录吗?', '温馨提示', ['是', '否'], function (e) {
      if (e.index === 0) {
        localStorage.removeItem('history')
        render()
      }
    })
  })

  $('.search button').on('click',function(){
    var val = $(this).siblings('input').val().trim()
    if(!val){
      mui.toast('请输入搜索内容')
      return
    }
    var history = getHistory()
    
    
    var idx = history.indexOf(val)
    if(idx >=0){
      history.splice(idx,1)
    }
    if(history.length >= 10){
     
      history.pop()
    }
    history.unshift(val)
    localStorage.setItem('history',JSON.stringify(history))
    render()
    location.href = 'searchList.html?key='+val
  })
})