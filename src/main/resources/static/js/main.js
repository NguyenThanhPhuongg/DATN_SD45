//chuyen huong logo den trang Home
document.addEventListener('DOMContentLoaded', function () {
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.addEventListener('click', function () {
        window.location.href = '/home';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const overLay = document.createElement('div');
    overLay.classList.add('over_lay');
    document.body.appendChild(overLay);
    const navBtnMb = document.querySelector('.nav_btn_mb');
    const btnSearch = document.querySelector('.icon_search');
    const headerSearch = document.querySelector('.header_search');
    const btnCart = document.querySelector('.icon_card');
    const overLayCart = document.querySelector('.over_lay_cart');
    const closeCart = document.querySelector('.close-cart');

    if (navBtnMb) {
        navBtnMb.addEventListener('click', function() {
            document.body.classList.toggle('open');
        });
        overLay.addEventListener('click', function() {
            document.body.classList.remove('open');
        });
    }
    if (btnSearch && headerSearch) {
        btnSearch.addEventListener('click', function () {
            headerSearch.classList.toggle('open_search');
        });

        document.addEventListener('click', function (event) {
            if (!headerSearch.contains(event.target) && !btnSearch.contains(event.target)) {
                headerSearch.classList.remove('open_search');
            }
        });
    }
    if (btnCart) {
        btnCart.addEventListener('click', function() {
            document.body.classList.toggle('open-cart');
        });
        overLayCart.addEventListener('click', function() {
            document.body.classList.remove('open-cart');
        });
        closeCart.addEventListener('click', function() {
            document.body.classList.remove('open-cart');
        });
    }
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $('header').addClass('fixed-header');
    } else {
        $('header').removeClass('fixed-header');
    }
})