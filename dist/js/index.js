var checkSessionLoad = function (position,content,callback) {
    $.ajax({
        url:"../getUserSession",
        success: function (data) {
            if(data){
                $(position).load(content,callback);
            }else{
                location.href = './login.html';
            }
        }
    })
}


var getEventsByUser = function () {
    getUserSession();
    $.ajax({
        url:'../getEventsByUser',
        success: function (data) {
                var data = JSON.parse(data);
            if(data.events.length > 0) {
                checkSessionLoad('#main-content','event.html', function () {
                    getEventByName(data.events[0]);
                });
                $('#events').html('');
                for (var i = 0; i < data.events.length; ++i) {
                    $('#events').append('<li><a href="#">' + data.events[i] + '</a></li>');
                }
            }
            $('#events li a').click(function () {
                var name = $(this).text();
                checkSessionLoad('#main-content','event.html',function(){
                    getEventByName(name);
                });

            });
        }
    });
};
var user = null;
var getUserSession = function () {
    $.ajax({
        async:false,
        url:"../getUserSession",
        success: function (data) {
            if(data){
                var obj = JSON.parse(data);
                user = obj.username;
            }else{
                location.href = './login.html';
            }
        }
    })
};


$(function () {
    getEventsByUser();
    $('#menu').metisMenu({ toggle: false });
    $('#cart').click(function () {
       // $('#main-content').load('addEvents.html');
        checkSessionLoad('#main-content','carts.html',null);
    });

    $('#select-event').click(function () {
        checkSessionLoad("#main-content","focusHot.html",null);
    });
    $('#main').click(function () {
       $("#main-content").load("main.html");
    });
});



var hotTime;
var relation;
var category;
var emotion;
function init(){
    hotTime = echarts.init(document.getElementById("hotTime"),"macarons");
    relation = echarts.init(document.getElementById("relation"),"macarons");
    category = echarts.init(document.getElementById("category"),"macarons");
    emotion = echarts.init(document.getElementById("emotion"),"macarons");
}


/**
 *
 * 每日销量配置
 */
var hotTimeOption = {
    title : {
        text: ''
    },
    tooltip : {
        trigger: 'axis'
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['2015/11/01','2015/11/03','2015/11/05','2015/11/07','2015/11/09','2015/11/11','2015/11/12']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'每日销量',
            type:'line',
            data:[11, 11, 15, 13, 12, 13, 10]/*,
         markPoint : {
         data : [
         {type : 'max', name: '最大值'},
         {type : 'min', name: '最小值'}
         ]
         },
         markLine : {
         data : [
         {type : 'average', name: '平均值'}
         ]
         }*/
        }
    ]
};
/**
 *
 * 食物关联配置
 */
var relationOption = {
    title : {
        text: '',
        x:'center',
        y:'top'
    },
    tooltip : {
        trigger: 'item',
        formatter: '{a} : {b}'
    },
    toolbox: {
        show : true,
        feature : {
            restore : {show: true},
            magicType: {show: true, type: ['force', 'chord']},
            saveAsImage : {show: true}
        }
    },
    legend: {
        x: 'left',
        data:['材料','关键词']
    },
    series : [
        {
            type:'force',
            name : "食物联系",
            ribbonType: false,
            categories : [
                {
                    name: '食物'
                },
                {
                    name: '关键词'
                },
                {
                    name:'评价'
                }
            ],
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        textStyle: {
                            color: '#333'
                        }
                    },
                    nodeStyle : {
                        brushType : 'both',
                        borderColor : 'rgba(255,215,0,0.4)',
                        borderWidth : 1
                    },
                    linkStyle: {
                        type: 'curve'
                    }
                },
                emphasis: {
                    label: {
                        show: false
                    },
                    nodeStyle : {
                        //r: 30
                    },
                    linkStyle : {}
                }
            },
            useWorker: false,
            minRadius : 15,
            maxRadius : 25,
            gravity: 1.1,
            scaling: 1.1,
            roam: 'move',
            nodes:[],
            links : []
        }
    ]
};


function setCategoryText(classifierName) {
    if (classifierName == '西式快餐') {
        return 6.25;
    } else if (classifierName == '汤米线粉面') {
        return 18.75;
    } else if (classifierName == '日韩料理') {
        return 31.25;
    } else if (classifierName == '三明治') {
        return 43.75;
    } else if (classifierName == '意大利粉') {
        return 56.25;
    } else if (classifierName == '中式料理') {
        return 68.75;
    } else if (classifierName == '烧味') {
        return 81.25;
    }
}
var categoryOption = {
    tooltip : {
        formatter : "{a} <br/>{b} : {c}%"
    },
    toolbox : {
        show : true,
        feature : {
            mark : { show : true },
            restore : { show : true },
            saveAsImage : { show : true }
        }
    },
    series : [{
        name : '菜系',
        type : 'gauge',
        center : ['50%', '50%'],
        radius : [0, '75%'],
        startAngle : 140,
        endAngle : -140,
        min : 0,
        max : 100,
        precision : 0,
        splitNumber : 16,
        axisLine : {
            show : true,
            lineStyle : {
                color : [
                    [0.125, '#99ff99'],
                    [0.25, '#ffbb66'],
                    [0.375, '#33ccff'],
                    [0.5, '#888800'],
                    [0.625, '#ffff33'],
                    [0.75, '#cc00ff'],
                    [0.875, '#ff5511'],
                    [1, '#444444']
                ],
                width : 30
            }
        },
        axisTick : {
            show : true,
            splitNumber : 5,
            length : 8,
            lineStyle : {
                color : '#eee',
                width : 1,
                type : 'solid'
            }
        },
        axisLabel : {
            show : true,
            formatter : function(v) {
                switch (v + '') {
                    case '6.25' : return '西式快餐';
                    case '18.75' : return '汤米线粉面';
                    case '31.25' : return '日韩料理';
                    case '43.75' : return '三明治';
                    case '56.25' : return '意大利粉';
                    case '68.75' : return '中式料理';
                    case '81.25' : return '烧味';
                    case '93.75' : return '其他';
                    default : return '';
                }
            },
            textStyle : {
                color : '#333'
            }
        },
        splitLine : {
            show : true,
            length : 30,
            lineStyle : {
                color : '#eee',
                width : 2,
                type : 'solid'
            }
        },
        pointer : {
            length : '80%',
            width : 8,
            color : 'auto'
        },
        title : {
            show : true,
            offsetCenter : ['-65%', -10],
            textStyle : {
                color : '#333',
                fontSize : 12
            }
        },
        detail : {
            show : true,
            backgroundColor : 'rgba(0,0,0,0)',
            borderWidth : 0,
            borderColor : '#ccc',
            width : 100,
            height : 40,
            offsetCenter : ['-60%', 10],
            formatter : '',
            textStyle : {
                color : 'auto',
                fontSize : 24
            }
        },
        data : [{
            value : 0,
            name : '菜系'
        }]
    }]
};
/**
 *
 * 食物评价配置
 */
var emotionOption = {
    title : {
        text: '评价变化情况'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        orient:'vertical',
        x:'left',
        y:'center',
        data:['1','2','3','4','5','6','7']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'乐',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:[10, 12, 21, 54, 260, 830, 710]
        },
        {
            name:'好',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:[30, 182, 434, 791, 390, 30, 10]
        },
        {
            name:'怒',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:[1320, 1132, 601, 234, 120, 90, 20]
        },
        {
            name:'哀',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:[1320, 1132, 601, 234, 120, 90, 20]
        },
        {
            name:'惧',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:[1320, 1132, 601, 234, 120, 90, 20]
        },
        {
            name:'恶',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:[1320, 1132, 601, 234, 120, 90, 20]
        },
        {
            name:'惊',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:[1320, 1132, 601, 234, 120, 90, 20]
        }
    ]
};


/**
 *
 * 关键词配置
 */
var so = new SWFObject("images/tagcloud.swf", "tagcloud", "460", "280", "7", "#ffffff");
// uncomment next line to enable transparency
so.addParam("wmode", "transparent");
so.addVariable("tcolor", "0x333333");
so.addVariable("mode", "tags");
so.addVariable("distr", "true");
so.addVariable("tspeed", "100");
function getEventByName(name){
    init();
    $("#event_title").html(name);
    var functionName = "getEventByName";
    var event = {};
    $.ajax(
        {
            url:"../"+functionName+"?name="+name,
            type:'get',
            success: function (data) {
                event = JSON.parse(data);
                console.log();
                /* 热度配置*/
                hotTimeOption.xAxis[0].data = [];
                hotTimeOption.series[0].data = [];
                hotTimeOption.title.text = event.name +"每日销量";
                for(var i = 0;i < event.hotTime.length; ++i){
                    hotTimeOption.xAxis[0].data.push(event.hotTime[i].eventDate);
                    hotTimeOption.series[0].data.push(event.hotTime[i].hotValue);
                }
                hotTime.setOption(hotTimeOption);
                /*类别配置*/
                //if(!flag) {
                categoryOption.series[0].detail.formatter = event.type;
                categoryOption.series[0].data = [];
                categoryOption.series[0].data.push({value: setCategoryText(event.type), name: '菜系'});
                category.setOption(categoryOption);
                //}else{
                //    categoryOption.series[0].data = [];
                //    category.setOption(categoryOption);
                //}
                /*联系配置*/

                relationOption.title.text = event.name + "关键词分析";
                relationOption.series[0].nodes = [];
                relationOption.series[0].links = [];
                relationOption.series[0].nodes.push({category:0,name:event.name});
                for(var i = 0;i < event.relateAddress.length; ++i){
                    relationOption.series[0].nodes.push({category:1,name:event.relateAddress[i]});
                    relationOption.series[0].links.push({source:event.relateAddress[i],target:event.name,weight:1});
                }
                for(var i = 0;i < event.relatePeople.length; ++i){
                    relationOption.series[0].nodes.push({category:2,name:event.relatePeople[i]});
                    relationOption.series[0].links.push({source:event.relatePeople[i],target:event.name,weight:1});
                }

                relation.setOption(relationOption);
                /*评价配置*/
                for(var i = 0;i < 7; ++i){
                    emotionOption.series[i].data = [];
                }
                emotionOption.xAxis[0].data = [];
                emotionOption.title.text = event.name + "评价变化情况";
                for (var i = 0; i < event.emotion.length; ++i) {
                    emotionOption.xAxis[0].data.push(event.emotion[i].emotionDate);
                    for(var j = 0;j < 7; ++j){
                        emotionOption.series[j].data.push(event.emotion[i].emotionValue[j]);
                    }
                }

                emotion.setOption(emotionOption);
                /*关键词配置*/
                var tags = "<tags>"
                for(var i = 0;i < event.keyWords.length; ++i){
                    tags += "<a href='#' color='"+randomColor()+"' style='12' >"+event.keyWords[i]+"</a>";
                }
                tags += "</tags>"
                so.addVariable("tagcloud",tags);
                so.write("keyWords");

            },
            error: function (error) {
                alert("数据获取失败");
            }
        }

    )
}

/*产生关键字颜色的随机值*/
function randomColor(){
    var resource = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e'];
    var color = "0x";
    for(var i = 0;i < 6; ++i){
        color += resource[Math.floor((Math.random()*15))];
    }
    return color;
}


/*时间轴设置*/
function addTimeLine(relateNews){
    var timeline = $("#timeline");
    var timelineHtml = '<br class="clear">';
    for(var i = 0;i　< relateNews.length; ++i){
        // console.log(relateNews[i].newsDate);
        timelineHtml += '<div class="timeline-wrapper">'+
            '<h2 class="timeline-time">'+'<span>'+relateNews[i].newsDate+'</span></h2>'+
            '<dl class="timeline-series">'+
            '<dt class="timeline-event" id="'+relateNews[i].newsId+'"'+'><a>'+relateNews[i].newstitle+'</a></dt>'+
            '<dd id="'+relateNews[i].newsId+'EX" class="timeline-event-content">'+
            '<p><a target="_blank" href = "./news_datail.html?newsId='+relateNews[i].newsId+'">'+relateNews[i].newsAbstract+'</a></p>'+
            '<br class="clear"></dd></dl></div><br class="clear">';
    }
    timelineHtml += '<br class="clear">';
    // console.log(timelineHtml);
    timeline.html(timelineHtml);
    $.timeliner({

    });
}

//echarts响应式

/*(function(charts)
{
    window.addEventListener('resize', function () {
        for(var i = 0,len = charts.length;i < len; ++i) {
            charts[i].resize();
        }
    });

})([hotTime,category,emotion,relation]);*/
/*
window.addEventListener('resize', function () {
   emotion.resize();
});
*/









/**
 * 根据url获取对应的请求参数
 * @param param
 * @returns {*}
 */
function getParam (param) {
    var params = (window.location.search.length > 0 ? window.location.search.substring(1):"");
    var obj = {};
    var items = params.length ? params.split("&"):[];
    var item = null,name = null,value = null;
    for(var i = 0;i < items.length; ++i){
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if(name.length)
            obj[name] = value;
    }
    return obj[param]
}
