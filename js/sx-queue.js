/* 
 *@author：思贤
 *@function：提取token的值
 *@params
*/
function getToken() {
  let cookie = document.cookie;
  let reg = /;/;
  let arr = cookie.split(reg);
  let which = null;
  arr.every((current,index)=>{
    // console.log('current=',current);
    if (current.trim().slice(0, 5) === 'token') {
      which = index;
      return false;
    }
    return true;
  })
  // console.log(arr);
  // console.log(which);
  return arr[which].trim().replace('%20',' ').substr(6);
}



/*@author: 思贤
 *@funtion:获取排队信息
 *@author
*/
function getQueueMsg(callback) {
  $.ajax({
    url:  '/api/student/getStatus',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken()
    },
    success: function (data) {
      // console.log(data);
      if (data.code === 200) {
        if (data.data.message === 0) {
          $(".queue-msg").text('现在还不是排队时间哟');    
        }else if (data.data.message === 1) {
          $(".queue-msg").text('尚未排队，点击按钮排队哟');
        }else {
          $(".queue-msg").text('现在你排在' + (data.data.count + 1) + '个');
          if (callback) {
            callback();
          }
        }
      }
    },
    error: function () {
      console.log('请求出错！');
    }
  })
}

/* 
 *@author: 思贤
 *@function: 判断一下排队状态，修改按钮
 *@params
*/

/* 
 *@author: 思贤
 *@function: 把排队的按钮改成点击更新一次排队提示
 *@params:
*/

function btnReload() {
  console.log($('#queue'));
  if ($('#queue')) {
    $('#queue').text('点击刷新').attr({id: 'reload'});
  }
  $('#reload').off('click').on('click',function() {
    getQueueMsg();
  })
}


// 开始排队
$('#queue').click((e)=>{
  let event = e || window.event;
  if (!event.target.num) {
    $.ajax({
      url:  '/api/student/queueUp',
      type: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': getToken()
      },
      success: function(data) {
        console.log(data);
        if (data.code === 200) {
          getQueueMsg(btnReload);
        }
      },
      error: function() {
        console.log("请求出错");
      }
    })
    event.target.num = 1;
  }
})