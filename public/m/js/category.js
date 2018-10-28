
$(function(){

  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function(info){
      $('.left ul').html( template('tpl',info) )
      renderSecond(info.rows[0].id)
    }
  })

  $('.left ul').on('click','li',function(){
    $(this).addClass('active').siblings().removeClass('active')
    var id = $(this).data('id')
    renderSecond(id);
    
  })
  function renderSecond(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{id:id},
      success:function(info){
        $('.right ul').html( template('tpl2',info) )
      }
    })
  }

})