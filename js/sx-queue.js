/* 
 *@author：思贤
 *@function：提取token的值
 *@params
*/
function getToken() {
  let cookie = document.cookie;
  let reg = /;/;
  let arr = cookie.split(reg);
//   console.log('cookie: ',cookie.replace("%20"," "));
  let which = null;
  arr.every((current,index)=>{
    if (current.slice(0, 5) === 'token') {
      which = index;
      return false;
    }
    return true;
  })
//   console.log(arr[which].replace('%20',' ').substr(6));
  return arr[which].replace('%20',' ').substr(6);
}





/*@author: 思贤
 *@funtion:获取排队信息
*/
function getQueueMsg() {
  $.ajax({
    url:  '/api/student/getStatus',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken()
    },
    success: function (data) {
      console.log(data);
      if (data.code === 200) {
        // 判断是否是排队时间
        if (data.data.message === 0) {
          $(".queue-msg").text('现在还不是排队时间哟');    
        }
        // 判断是否已经排队
        if (data.data.message === 1) {
          $(".queue-msg").text('尚未排队，点击按钮排队哟');
        }else {
          $(".queue-msg").text('现在你排在' + data.count + '个');
        }
      }
    },
    error: function () {
      console.log('请求出错！');
    }
  })
}


// 开始排队
$('#queue').click(()=>{
  $.ajax({
    url:  '/api/student/queueUp',
    type: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': getToken()
    },
    success: function(data) {
      $('.queue-msg').text(data.message);
    },
    error: function() {
      console.log("请求出错");
    }
  })
})