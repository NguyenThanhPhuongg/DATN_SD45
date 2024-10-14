const app=angular.module("admin-app",["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/taikhoan",{
            templateUrl:"asset/nhanvien/taikhoan.html",
            controller: "taikhoan-ctrl"
        })
        .when("/tttaikhoan",{
            templateUrl:"asset/nhanvien/tttaikhoan.html",
            controller: "tttaikhoan-ctrl"
        })
        .when("/ttcanhan",{
            templateUrl:"asset/nhanvien/ttcanhan.html",
            controller: "ttcanhan-ctrl"
        })
})

