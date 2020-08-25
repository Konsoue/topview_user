$.ajax({
    url: "js/welcome.json",
    async: true,
    success: (data)=>{
        $('.welcome').text(data.wel);
    }
})