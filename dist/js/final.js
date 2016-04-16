
var trclass = ['active', 'success', 'warning', 'danger', 'info'];
var exists = [];
var eventList = [];
var priceList = [];
var eventsLi = $("#events li a ");
for (var i = 0; i < eventsLi.length; ++i) {
    var temp = $("#events li a:eq(" + i + ")")
    exists.push(temp.text());
}
$.ajax({
    url: "../eventswithprice",
    success: function (data) {
        var data = JSON.parse(data);
        var events = data.data;
        var price = data.price;
        for(var i=0;i<exists.length;++i){
            eventList.push(exists[i]);
            priceList.push(price[events.indexOf(exists[i])]);
        }

        var total =0;
        for (var i = 0; i < priceList.length; i++) {
            total += parseInt(priceList[i]);
        }
        console.log(total);

        var list = new Vue({
            el: '#events-list',
            data: {events: eventList, totals: total, trclass: trclass},
            methods: {}
        });
    }
});

function printOrder() {
    console.log("\ntel is " + $("#tel").val());
    console.log("\naddress is " + $("#add").val());
    console.log("\nNo. is "+ $("#num").val());
    console.log(eventList);
    if($("#tel").val().length!=0 && $("#add").val().length!=0 && $("#num").val().length!=0)
    {
        alert("订餐成功，请稍候！");
    }
    else 
    {
        alert("请输入正确订餐信息！");
    }
    //document.getElementById("add-event-next").innerHtml="您的订单已提交，请稍候！";
}

/*function print(){
    console.log("\ntel is " + $("#tel").val());
    console.log("\naddress is " + $("#add").val());
    console.log("\nNo. is "+ $("#num").val();
    console.log(eventList);
}*/