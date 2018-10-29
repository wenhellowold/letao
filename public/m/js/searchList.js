

$(function(){
 
  function render(){
    var proName = getSearch().key
  
  $.ajax({
    type:'get',
    url:'/product/queryProduct',
    data:{
      proName:proName,
      page:1,
      pageSize:100,
    },
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
    window.location.href = 'searchList.html?key='+val
  })
})