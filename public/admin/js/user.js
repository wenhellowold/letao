; (function () {
  page = 1;
  pageSize = 5;
  render();
  function render() {
    $.ajax({
      url: '/user/queryUser',
      type: 'get',
      data: {
        page: page,
        pageSize: pageSize,
      },
      success: function (info) {
        var html = template('tpl', info)
        $('tbody').html(html)

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
  var id
  var isDelete
  $('tbody').on('click','button',function(){
    $('#userModal').modal('show')
    id = $(this).parent().data('id');
    // isDelete = $(this).hasClass('btn-success')?0:1
    isDelete = $(this).hasClass('btn-success') ? 0 : 1
  })
  $('.confirm').on('click', function() {
    // 怎么得到id和isDelete?????
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function(info) {
        // 1. 关闭模态框
        $('#userModal').modal('hide')
        //2. 渲染页面
        render()
      }
    })
  })
})()