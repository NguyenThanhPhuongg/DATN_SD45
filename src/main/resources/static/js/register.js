$(document).ready(function() {
    $('#registerButton').click(function(event) {
        event.preventDefault();

        const form = $('#create_customer')[0];

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const registerData = {
            name: $('input[name="customer[name]"]').val().trim(),
            email: $('input[name="customer[email]"]').val().trim(),
            phone: $('input[name="customer[phone]"]').val().trim(),
            password: $('input[name="customer[password]"]').val().trim(),
            retypePassword: $('input[name="customer[retypePassword]"]').val().trim(),
            ngaySinh: $('input[name="customer[ngaySinh]"]').val().trim()
        };

        $.ajax({
            url: '/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(registerData),
            success: function(response) {
                $('#message').html('<div class="alert alert-success">Đăng ký thành công!</div>');
                hideMessageAfterDelay();
                setTimeout(function() {
                    window.location.href = '/v1/auth/login';
                }, 500);
            },
            error: function(jqXHR) {
                const errorMsg = jqXHR.responseJSON && jqXHR.responseJSON.message
                    ? jqXHR.responseJSON.message
                    : 'Thông tin đăng ký không hợp lệ!';

                $('#message').html(`<div class="alert alert-danger">${errorMsg}</div>`);
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