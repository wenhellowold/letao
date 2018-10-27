// import { template } from "handlebars";

// ;(function(){
  
// })()

$(function () {

  var page = 1
  var pageSize = 2

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
        console.log(info);
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

});