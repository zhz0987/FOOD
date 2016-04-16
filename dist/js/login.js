$(function () {
    if($.cookie('rmbUser') == 'true'){
        $('#remember').attr('checked',true);
        $('#username').val($.cookie('username'));
        $('#password').val($.cookie('password'));
    }
});
function saveUser(){
    if($('#remember').is(':checked')){
        $.cookie('rmbUser','true',{expires:7});
        $.cookie('username',$('#username').val(),{expires:7});
        $.cookie('password',$('#password').val(),{expires:7});
    }else{
        $.cookie('rmbUser','false',{expires:-1});
        $.cookie('username','',{expires:-1});
        $.cookie('password','',{expires:-1});
    }
}
$("#login").click(function () {
    saveUser();
    var username = $('#username').val();
    var password = $('#password').val();
    $.ajax({
        type:'POST',
        data:{
            username:username,
            password:password
        },
        url:'../login',
        success: function (data) {
            if(data != "success"){
                $('#alert').html('<div class="alert alert-danger" role="alert">'+data+'</div>');
            }else{
                //location.href="./index.html?user="+username
                location.href = "./index.html";
            }

        }
    })
});