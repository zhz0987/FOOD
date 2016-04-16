
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
        console.log(price);
        for (var i = 0; i < events.length; ++i) {
            if (true) {
                eventList.push(events[i]);
                priceList.push(price[i]);
            }

        }

        var list = new Vue({
            el: '#events-list',
            data: {events: eventList, prices: priceList, trclass: trclass},
            methods: {}
        });
    }
});
$('#add-existEvents').click(function () {
    var eventsList = [];
    $("input:checkbox:checked").each(function () {
        eventsList.push($(this).val());
    });
    $.ajax({
        type: 'POST',
        url: '../addEvents',
        traditional: true,
        data: {
            events: eventsList
        },
        success: function (data) {
            if (data == "success") {
                alert('添加成功');
                location.reload();
            }
            else
                alert("添加失败");
        }
    })
});