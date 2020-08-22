$(function () {
  $('[name=username]').on('focus',function (){
    $(this).siblings().eq(0).css('top','-1.3vw');
  })
  $('[name=username]').on('blur',function (){
    if ($(this).val() == '') {
      $(this).siblings().eq(0).css('top','0.4vw');
    }
  })
  $('[name=password]').on('focus',function (){
    $(this).siblings().eq(0).css('top','-1.3vw');
  })
  $('[name=password]').on('blur',function (){
    if ($(this).val() == '') {
      $(this).siblings().eq(0).css('top','0.4vw');
    }
  })









  
})