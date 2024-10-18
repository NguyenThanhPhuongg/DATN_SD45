/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
//
// Scripts
//
window.addEventListener('DOMContentLoaded', event => {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
});

function updateImage() {
    var profileImage = document.getElementById("profileImage");
    var scope = angular.element(document.getElementById("imagePath")).scope(); // Lấy scope của Angular

    // Kiểm tra nếu file đã được chọn
    if (profileImage.files.length > 0) {
        var fileName = profileImage.files[0].name; // Lấy tên file
        scope.$apply(function() {
            scope.form.anh = fileName; // Cập nhật ng-model trong Angular
        });
    } else {
        scope.$apply(function() {
            scope.form.anh = ""; // Nếu không có file, thì xóa giá trị
        });
    }
}

function updateImage2() {
    var profileImage = document.getElementById("profileImage2");
    var scope = angular.element(document.getElementById("imagePath2")).scope(); // Lấy scope của Angular

    // Kiểm tra nếu file đã được chọn
    if (profileImage.files.length > 0) {
        var fileName = profileImage.files[0].name; // Lấy tên file
        scope.$apply(function() {
            scope.formAdd.anh = fileName; // Cập nhật ng-model trong Angular
        });
    } else {
        scope.$apply(function() {
            scope.form.anh = ""; // Nếu không có file, thì xóa giá trị
        });
    }
}