

;(function(){
  var page = 1
  var pageSize = 5
  render()
 function render(){
  $.ajax({
    type:'get',
    url:'/category/querySecondCategoryPaging',
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
//  渲染一级分类列表
 $('.add-btn').on('click',function(){
   $('#addModal').modal('show')

   $.ajax({
     type:'get',
     url:'/category/queryTopCategoryPaging',
     data:{
       page:1,
       pageSize:100,
     },
     success:function(info){
      $('.dropdown-menu').html(template('tpl2',info))
     }
   })
 })
//  一级分类选择功能
$('.dropdown-menu').on('click','li',function(){
  $('.dropdown-text').html($(this).children().html());
  // 把categoryId赋值给input框
  $('[name=categoryId]').val($(this).data('id'))
  $('form')
  .data('bootstrapValidator')
  .updateStatus('categoryId', 'VALID')

})


$('#file').fileupload({
  done:function(e,data){
    // console.log(data.result.picAddr);
    $('.img-box img').attr('src',data.result.picAddr)
    $('[name=brandLogo]').val(data.result.picAddr)
    $('form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
  }
})

// 表单校验
$('form').bootstrapValidator({
  feedbackIcons: {
    valid: 'glyphicon glyphicon-thumbs-up',
    invalid: 'glyphicon glyphicon-thumbs-down',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields:{
    brandName:{
      validators:{
        notEmpty:{
          message:'二级分类的名称不能为空'
        }
      }
    },
    categoryId:{
      validators:{
        notEmpty:{
          message:'请选择一个一级分类'
        }
      }
    },
    brandLogo:{
      validators:{
        notEmpty:{
          message:'请选择一张图片'
        }
      }
    }
  },
  excluded:''
})

$('form').on('success.form.bv',function(e){
  e.preventDefault()
  $.ajax({
    type:'post',
    url:'/category/addSecondCategory',
    data:$('form').serialize(),
    success:function(info){
      console.log(info);
      page = 1
      render()
      $('#addModal').modal('hide')
      $('form').data('bootstrapValidator').resetForm(true)

      $('.dropdown-text').html('请选择一级分类')
      $('.img-box img').attr('src','./images/none.png')
    }
  })
})

})()