$.ajax({
    url: "js/welcome.json",
    async: true,
    success: (data)=>{
        // console.log()
        $('.welcome').text(data.wel);
    }
})