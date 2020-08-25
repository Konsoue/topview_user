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
    let baseUrl = 'https://server1.backend.topviewclub.cn';
    $.ajax({
      url: baseUrl + '/api/login',
      type: 'post',
      data: JSON.stringify({ 'username': username, 'password': password }),
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (data) {
        console.log(JSON.stringify(data));
        if (data.code == 200) {
          $.cookie("token", data.data.token);
          $(".login").fadeOut(100);
        }
      },
      error: function () {
        console.log('请求出错！');
      }
    })
  }
})