const app=angular.module("admin-app",["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/taikhoan",{
            templateUrl:"templates/staff/nhanvien/taikhoan.html",
            controller: "taikhoan-ctrl"
        })
        .otherwise({
            template:"<h1 class='text-center'>Ziaza Store</h1>"
        });
})