$(function () {
  $('[name=username]').on('focus',function (){
    $(this).siblings().eq(0).css('top','-80%');
  })
  $('[name=username]').on('blur',function (){
    if ($(this).val() == '') {
      $(this).siblings().eq(0).css('top','20%');
    }
  })
  $('[name=password]').on('focus',function (){
    $(this).siblings().eq(0).css('top','-80%');
  })
  $('[name=password]').on('blur',function (){
    if ($(this).val() == '') {
      $(this).siblings().eq(0).css('top','20%');
    }
  })








  
})