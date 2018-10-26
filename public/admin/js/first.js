
;(function(){
  var page = 1
  var pageSize = 5
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize,
      },
      success:function(info){
        $('tbody').html(template('tpl',info))
  
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p
            render()
          }
        })
      }
    })
  }

  $('.add-btn').on('click',function(){
    $('#addModal').modal('show')
  })

  $('form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:'请输入一级分类名称'
          }
        }
      }
    }
  })
  $('form').on('success.form.bv',function(e){
    console.log(90909090);
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$('form').serialize(),
      success:function(info){
       if(info.success){
        page = 1
        render()
        $('#addModal').modal('hide')
        $('form').data('bootstrapValidator').resetForm(true)
       }
      }
    })
  })

  // $('form').on('success.form.bv', function(e) {
  //   console.log(90909090);
  //   e.preventDefault()
  //   $.ajax({
  //     type: 'post',
  //     url: '/category/addTopCategory',
  //     data: $('form').serialize(),
  //     success: function(info) {
  //       console.log(info);
        
  //       if (info.success) {
  //         // 重新渲染数据第一页
  //         page = 1
  //         render()
  //         // 关闭模态框
  //         $('#addModal').modal('hide')

  //         // 重置表单
  //         // 把表单的样式和内容全部都重置掉
  //         $('form')
  //           .data('bootstrapValidator')
  //           .resetForm(true)
  //       }
  //     }
  //   })
  // })
})();