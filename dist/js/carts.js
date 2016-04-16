
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
        /*for (var i = 0; i < events.length; ++i) {
            if (exists.indexOf(events[i]) !== -1) {
                eventList.push(events[i]);
                priceList.push(price[i]);
            }

        }*/

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
            data: {events: eventList, prices: priceList,totals: total, trclass: trclass},
            methods: {}
        });
    }
});

function next(){
    if(eventList.length!=0)
    {
        $('#main-content').load('final.html');
    }
    else
    {
        alert("购物车为空");
    }
}