

$(function(){
 
  function render(){
    // var proName = getSearch().key
  
    var parem = {
      proName:key,
      page:1,
      pageSize:100,
    }
    /**
     * 1 如何确定是否传递排序参数?  判断是否有active类
     * 2如何确定传递的是price还是num?  自定义data-type,获取有active类下的data-type值
     * 3如何确定传递1还是2?  判断是否有da-angle-down类
     */
    var $active = $('.sort a.active')
    if($active.length == 1){
      var type = $active.data('type')
      var value = $active.find('span').hasClass('fa-angle-down')?2:1
      parem[type] = value
    }

  $.ajax({
    type:'get',
    url:'/product/queryProduct',
    data:parem,
    success:function(info){
      $('.lt_product').html(template('tpl',info))
    }
  })
  }
  var key = getSearch().key
  $('.search input').val(key)
  render()

  $('.search button').on('click',function(){
    console.log('hehe');
    
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
    window.location.href = 'searchList.html?key='+val
  })

  /*
    商品排序的样式处理
    1,判断点击的a有没有active这个类
      有
          找到当前a下的span  切换箭头类
      没有
          给当前a添加active类,并移除其他兄弟元素的active类
          让所有的箭头都朝下
  */
  $('.sort a[data-type]').on('click',function(){
    if($(this).hasClass('active')){
      $(this).children().toggleClass('fa-angle-down').toggleClass('fa-angle-up')
    }else{
      $(this).addClass('active').siblings().removeClass('active')
      $('.sort').find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
    }
    render()
  })
})