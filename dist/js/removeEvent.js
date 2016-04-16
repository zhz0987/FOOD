/**
 * Created by dean on 2016/1/22.
 */
var exists = [];
var eventsLi = $("#events li a ");
for(var i = 0;i < eventsLi.length; ++i){
    var temp = $("#events li a:eq("+i+")")
    exists.push(temp.text());
}
var removeVue = new Vue({
    el:"#focus-list",
    data:{
        eventList:exists
    }
});
$('#focus-list ul li span').click(function () {
    var removeEvent = $(this).prev().text();
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