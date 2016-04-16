$('#password-again').blur(function () {
    var password1 = $('#password').val();
    var password2 = $('#password-again').val();
    if(password1 != password2){
        $('#password-check').html('<div class="alert alert-danger" role="alert">两次密码输入不一致</div>');
    }else{
        $('#password-check').html('');
    }
});

$("#login").click(function () {
    $.ajax({
        type:'POST',
        data:{
            username:$('#username').val(),
            password:$('#password').val()
        },
        url:'../register',
        success: function (data) {
            if(data == "exists"){
                $('#alert').html('<div class="alert alert-danger" role="alert">用户已存在</div>');
            }else if(data == 'error'){
                $('#alert').html('<div class="alert alert-danger" role="alert">系统错误</div>');
            }else{
                $('#alert').html('<div class="alert alert-info" role="alert">注册成功</div>');

            }

        }
    })
});

