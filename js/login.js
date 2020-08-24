$(function () {
  $('[name=username]').on('focus', function () {
    $(this).siblings().eq(0).css('top', '-80%');
  })
  $('[name=username]').on('blur', function () {
    if ($(this).val() == '') {
      $(this).siblings().eq(0).css('top', '20%');
    }
  })
  $('[name=password]').on('focus', function () {
    $(this).siblings().eq(0).css('top', '-80%');
  })
  $('[name=password]').on('blur', function () {
    if ($(this).val() == '') {
      $(this).siblings().eq(0).css('top', '20%');
    }
  })
  $('.login_btn').on('click', login);
  function login() {
    $('.login').fadeOut(100);
    const username = $('[name=username]').val();
    const password = $('[name=password]').val();
    if (username == '') {
      alert('用户名不可为空');
      return false;
    }
    if (password == '') {
      alert('密码不可为空');
      return false;
    }
    $.ajax({
      url: '/api/login',
      type: 'post',
      data: { 'username': username, 'password': password },
      dataType: 'json',
      success: function (data) {
        console.log(data);
        $('.login').fadeOut(100);
      },
      error: function () {
        console.log('请求出错！');
      }
    })
  }
})