"use strict";

$.ajax({
  url: "js/welcome.json",
  async: true,
  success: function success(data) {
    // console.log()
    $('.welcome').text(data.wel);
  }
});