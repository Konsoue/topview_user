$(function () {

  /* 
  *@author: 思贤
  *@function: 登录成功后，页面样式变化
  *@params
  */
 function styleChange() {
   $('.login').fadeOut(1000,'linear');
   window.onresize = function() {
     if (document.body.clientWidth > 765) {
       $('.sx-container').addClass('hasIn');
     }else {
       $('.sx-container').removeClass('hasIn');
     }
   }
 }
  /* 
  *@author：思贤
  *@function：欢迎语的获取数据
  *@params：status是不同阶段对应是数字 0 ~ 5
  */
  function welcome(status) {
    $.ajax({
      url: "js/welcome.json",
      async: true,
      success: (data)=>{
        whichStatus(status, data);
      },
      error: ()=> {
        console.log("请求失败");
      }
    })
  }

  /* 
  *@author: 思贤
  *@function: 手机尺寸下，点击nav切换页面
  *@params
  */
  function toggleNav() {
    $('.nav li').eq(1).data('num',0);
    $('.nav li').eq(2).data('num',1);
    console.log($('.nav li').eq(1));
    $('.nav li').click(function(){
      console.log($(this).data('num'));
      if ($(this).data('num')) {
        $('.queue').show();
        $('.user').hide();
      }else {
        $('.user').show();
        $('.queue').hide();
      }
    })
  }

  /* 
  *@author: 思贤
  *@function: 登录成功后，获取个人信息，并添加到页面上 
  *@params
  */
  function addUserMsg() {
    $.ajax({
      type: 'get',
      url: '/api/student/getStudentInfo',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': getToken()
      },
      success: function(data) {
        console.log(data);
        if(data.success) {
          $('#name').text(data.data.name);
          $('#stuNum').text(data.data.studentNumber);
          $('#groupName').text(data.data.groupName);
          welcome(data.data.status);
          if(data.data.groupNumber) {
            $('#groupNumber').text(data.data.groupNumber).css('display',);
          }
        }
      },
      error: function() {
        console.log("请求失败");
      }
    })
  }
  /* 
  *@author: 思贤
  *@function: 处理不同考核状态的信息
  *@params: status是不同阶段对应是数字 0 ~ 5  ; data是欢迎语的数据
  */
  function whichStatus(status, data) {
    console.log('data',data);
    switch(status) {
        case 0: $('#status').text('笔试阶段');$('.welcome').text(data[status]);break;
        case 1: $('#status').text('面试阶段');$('.welcome').text(data[status]);break;
        case 2: $('#status').text('已面试');$('.welcome').text(data[status]);break;
        case 3: $('#status').text('面试通过');$('.welcome').text(data[status]);break;
        case 4: $('#status').text('考核通过');$('.welcome').text(data[status]);break;
        default: $('#status').text('考核未通过');$('.welcome').text(data[status]);break;
    }
  }

  /*@author: 
   *@function: 修改密码
   *@params
  */
  function changePwd() {
    $('.change-pwd').on('click',function() {
      $('.user-pwd').show();
      
    })
    $('#new-pwd').on('click',function() {
      let pwd_data = {
        oldpassword: $('#oldPassword').val(),
        newpassword: $('#newPassword').val()
      }
      
    })
  }  
  changePwd();

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

  /* 
   *@author: 敏仪
   *@function: 登录后，执行的功能
   *@params
  */
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
    $.ajax({
      url:  '/api/login',
      type: 'POST',
      data: JSON.stringify({ 'username': username, 'password': password }),
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (data) {
        // console.log(JSON.stringify(data));
        if (data.code == 200) {
          $.cookie("token", data.data.token);
          styleChange();
          getQueueMsg();
          addUserMsg();
          toggleNav();
          changePwd();
        }
      },
      error: function () {
        console.log('请求出错！');
      }
    })
  }

 
})

