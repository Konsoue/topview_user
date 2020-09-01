$(function () {

  /* 
  *@author: 思贤
  *@function: 登录成功后，页面样式变化
  *@params
  */
 function styleChange() {
   $('input[name="username"], input[name="password"]').val("");
   $('.login').fadeOut(1000,'linear');
   if (document.body.clientWidth > 765) {
     $('.sx-container').addClass('hasIn');
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
  *@author:创境 
  *@function: 手机尺寸下，点击nav切换页面
  *@params
  */
  function toggleNav() {
    $('.nav li').eq(0).data('num',0);
    $('.nav li').eq(1).data('num',1);
    //console.log($('.nav li').eq(1));
    $('.nav li').off('click').on('click' ,function(){
      //console.log($(this).data('num'));
      if (!$(this).data('num')) {
        $('.user').stop().animate({
          left: '100%',
          opacity: 0,
        },300);;
        $('.queue').stop().animate({
          left:0,
          opacity: 1,
        },300);
        $('.nav-active').stop().animate({
          left:0,
        },300);
      } else {
        $('.user').stop().animate({
          left:0,
          opacity: 1,
        },300);;
        $('.queue').stop().animate({
          left:'-100%',
          opacity: 0,
        },300);
        $('.nav-active').stop().animate({
          left:'50%',
        },300);
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
        if(data.success) {
          $('#name').text(data.data.name);
          $('#stuNum').text(data.data.studentNumber);
          $('#groupName').text(data.data.groupName);
          welcome(data.data.status);
          if(data.data.groupNumber) {
            $('#groupNumber').text(data.data.groupNumber).css('display',"flex");
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
    // console.log('data',data);
    switch(status) {
        case 0: $('#status').text('笔试阶段');$('.welcome').text(data[status]);$('.queue-msg,.queue-btn').show();break;
        case 1: $('#status').text('面试阶段');$('.welcome').text(data[status]);$('.queue-msg,.queue-btn').show();break;
        case 2: $('#status').text('已面试');$('.welcome').text(data[status]);$('.queue-msg,.queue-btn').show();break;
        case 3: $('#status').text('面试通过');$('.welcome').text(data[status]);$('.queue-msg,.queue-btn').hide();break;
        case 4: $('#status').text('考核通过');$('.welcome').text(data[status]);$('.queue-msg,.queue-btn').hide();break;
        default: $('#status').text('考核未通过');$('.welcome').text(data[status]);$('.queue-msg,.queue-btn').hide();break;
    }
  }

  /*@author: 思贤
   *@function: 修改密码
   *@params
  */
  function changePwd() {
    $('#new-pwd').off('click').on('click', function() {
      let pwd_data = {
        oldPassword: $('#oldPassword').val(),
        newPassword: $('#newPassword').val()
      }
      console.log(pwd_data);
      // console.log(pwd_data.newpassword.length);
      if (pwd_data.oldPassword === "") {
        showTips('旧密码不能为空');
        // console.log(111);
        return;
      }
      if (pwd_data.newPassword === "") {
        showTips('新密码不能为空');
        return;
      }
      if (pwd_data.newPassword.length < 8) {
        showTips('新密码不能少于8位');
      }else {
        $.ajax({
          url: '/api/student/updateStudentPassword',
          type: 'POST',
          data: JSON.stringify(pwd_data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
          },
          success: function (data) {
            $("#oldPassword,#newPassword").val("");
            $('.user-pwd').hide();
            if (data.code === 200) {
              showTips('密码修改成功');
            }else {
              showTips(data.message);
            }
            
          },
          error: function() {
            console.log("请求失败");
            showTips("密码修改失败");
          }
        })
      }
    })
  }  
  

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

   //显示提示
   function showTips(tips) {
    var tipBox = document.querySelector('.tip_box');
    tipBox.style.display = 'block';
    tipBox.innerText = tips;
    var timer = setTimeout(function () {
      tipBox.style.display = 'none';
      clearTimeout(timer);
    }, 1000);
  }

 

  /* 
   *@author: 思贤
   *@function: 修改密码的样式显示隐藏和功能调用
   *@params
  */
  function showChaPwd() {
    $('.change-pwd').off('click').on('click',function() {
      $('.user-pwd').show();
      changePwd();
    })
    $('.close-btn').off('click').on('click',function() {
      $('.user-pwd').hide();
      $("#oldPassword,#newPassword").val("");
    })
  }
  /* 
   *@author: 思贤
   *@function: 退出登录
   *@params
  */
  function loginOut() {
    $('.loginOut').off('click').on('click',function(){
      $('.sx-container').removeClass('hasIn');
      $('.login').fadeIn();
    })
  }
  
  /* 
   *@author: 敏仪
   *@function: 登录后，执行的功能
   *@params
  */
  function login() {
    const username = $('[name=username]').val();
    const password = $('[name=password]').val();
    if (username == '') {
      showTips('用户名不可为空');
      return false;
    }
    if (password == '') {
      showTips('密码不可为空');
      return false;
    }
    $.ajax({
      url: '/api/login',
      type: 'POST',
      data: JSON.stringify({ 'username': username, 'password': password }),
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (data) {
        if (data.code == 200) {
          $.cookie("token", data.data.token ,{
            expires: data.data.expireTime/60/60/24
          });
          styleChange();
          getQueueMsg();
          addUserMsg();
          toggleNav();
          showChaPwd();
          loginOut();
        }else {
          showTips(data.message);
        }
      },
      error: function () {
        console.log('请求出错！');
      }
    })
  }

  $('.login_btn').off('click').on('click', login);
})

