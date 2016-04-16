
$('#removeEvent').click(function () {
    var removeEvent = $('#event_title').text();
    var msg = confirm('确定取消购买"' + removeEvent +'"吗?');
    if(msg == true){
        $.ajax({
            type:'POST',
            url:"../removeEvent",
            data:{event:removeEvent},
            success: function (data) {
                if(data == "success"){
                    alert("取消购买[" + removeEvent +"]成功");
                    location.reload();
                }
                else{
                    alert("取消失败");
                }
            }

        });
    }
});
