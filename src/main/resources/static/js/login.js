$(document).ready(function() {
    $('#loginButton').click(function() {
        const form = $('#create_customer')[0];

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const loginData = {
            username: $('#username').val().trim(),
            password: $('#password').val().trim()
        };

        $.ajax({
            url: '/auth',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(loginData),
            success: function(response) {
                const token = response.token;
                localStorage.setItem('token', token);

                $('#message').html('<div class="alert alert-success">Đăng nhập thành công!</div>');
                hideMessageAfterDelay();
                setTimeout(function() {
                    window.location.href = '/';
                }, 500);
            },
            error: function(jqXHR) {
                $('#message').html('<div class="alert alert-danger">Thông tin đăng nhập không chính xác!</div>');
                hideMessageAfterDelay();
            }
        });
    });

    function hideMessageAfterDelay() {
        setTimeout(function() {
            $('#message').fadeOut('slow', function() {
                $(this).empty().show();
            });
        }, 2000);
    }
});
