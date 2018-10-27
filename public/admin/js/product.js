// import { template } from "handlebars";

// ;(function(){
  
// })()

$(function () {

  var page = 1
  var pageSize = 2
  var img = []

  render()
  function render(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:page,
        pageSize:pageSize
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
          },
          itemTexts:function(type,page,current){
            switch (type){
              case 'first':
              return '首页'
              case 'prev':
              return '上一页'
              case 'page':
              return page
              case 'next':
              return '下一页'
              case 'last':
              return '尾页'
            }
          },
          tooltipTitles:function(type,page){
            switch (type){
              case 'first':
              return '首页'
              case 'prev':
              return '上一页'
              case 'page':
              return page
              case 'next':
              return '下一页'
              case 'last':
              return '尾页'
            }
          }
        })
      }
  
    })
  }

  $('.add-btn').on('click',function(){
    $('#addModal').modal('show')

    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        $('.dropdown-menu').html(template('tpl2',info))
      }
    })
  })
  $('.dropdown-menu').on('click','li',function(){
    $('.dropdown-text').html($(this).children().html())
    $('[name=brandId]').val($(this).data('id'))
    $('form').data('bootstrapValidator').updateStatus('brandId','VALID')
  })

  $('#file').fileupload({
    done:function(e,data){
      if(img.length === 3){
        alert('不要再上传了哟')
        return
      }
      $('.img-box').append('<img width=100 height=100 src='+data.result.picAddr+'>')
      img.push(data.result)
      if(img.length === 3){
        $('form').data('bootstrapValidator').updateStatus('picStatus','VALID')
      }else{
        $('form').data('bootstrapValidator').updateStatus('picStatus','INVALID')
      }
      
    }
  })
$('form').bootstrapValidator({
  excluded:[],
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields:{
    proName:{
      validators:{
        notEmpty:{
          message:'商品名称不能为空'
        }
      }
    },
    brandId:{
      validators:{
        notEmpty:{
          message:'二级分类不能为空'
        }
      }
    },
    proDesc:{
      validators:{
        notEmpty:{
          message:'商品描述不能为空'
        }
      }
    },
    num: {
      // 必须是1-99999之间的有效数字
      validators: {
        notEmpty: {
          message: '商品库存不能为空'
        },
        // 正则校验
        regexp: {
          regexp: /^[1-9]\d{0,4}$/,
          message: '请输入有效的库存(1-99999)'
        }
      }
    },
    size: {
      validators: {
        notEmpty: {
          message: '商品尺码不能为空'
        },
        //
        regexp: {
          regexp: /^\d{2}-\d{2}$/,
          message: '请输入正确的尺码格式(xx-xx)'
        }
      }
    },
    oldPrice: {
      validators: {
        notEmpty: {
          message: '商品原价不能为空'
        }
      }
    },
    price: {
      validators: {
        notEmpty: {
          message: '商品价格不能为空'
        }
      }
    },
    picStatus: {
      validators: {
        notEmpty: {
          message: '请上传3张商品图片'
        }
      }
    }
  }
})
$('form').on('success.form.bv',function(e){
  var parem = $('form').serialize()
    parem += "&picName1="+img[0].picName+"&picAddr1="+img[0].picAddr
    parem += "&picName2="+img[1].picName+"&picAddr2="+img[1].picAddr
    parem += "&picName3="+img[2].picName+"&picAddr3="+img[2].picAddr
    
  e.preventDefault()
  $.ajax({
    type:'post',
    url:'/product/addProduct',
    data:parem,
    success:function(info){
      if(info.success){
        $('#addModal').modal('hide')
        page = 1
        render()
        $('form').data('bootstrapValidator').resetForm(true)
        $('.dropdown-text').html('请输入二级分类')
        $('.img-box img').remove()
        img = []
      }
    }
  })
})
});