const app = angular.module("admin-app", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        /// nhan vien
        .when("/taikhoan", {
            templateUrl: "asset/nhanvien/taikhoan.html",
            controller: "taikhoan-ctrl"
        })
        .when("/tttaikhoan", {
            templateUrl: "asset/nhanvien/tttaikhoan.html",
            controller: "tttaikhoan-ctrl"
        })
        .when("/ttcanhan", {
            templateUrl: "asset/nhanvien/ttcanhan.html",
            controller: "ttcanhan-ctrl"
        })
        .when("/phanquyen", {
            templateUrl: "asset/nhanvien/phanquyen.html",
            controller: "phanquyen-ctrl"
        })
        .when("/nhom", {
            templateUrl: "asset/nhanvien/nhom.html",
            controller: "nhom-ctrl"
        })
        .when("/chucnang", {
            templateUrl: "asset/nhanvien/chucnang.html",
            controller: "chucnang-ctrl"
        })
        ////// khach hang
        .when("/listkhachhang",{
            templateUrl:"asset/khachhang/list.html",
            controller: "listkhachhang-ctrl"
        })
        .when("/quanlykh",{
            templateUrl:"asset/khachhang/quanly.html",
            controller: "quanlykh-ctrl"
        })
        .when("/tttaikhoan_kh", {
            templateUrl: "asset/nhanvien/tttaikhoan_kh.html",
            controller: "tttaikhoan_kh-ctrl"
        })
        .when("/ttcanhan_kh", {
            templateUrl: "asset/nhanvien/ttcanhan_kh.html",
            controller: "ttcanhan_kh-ctrl"
        })

        /// danh mục
        .when("/listdanhmuc",{
            templateUrl:"asset/danhmuc/listdanhmuc.html",
            controller: "listdanhmuc-ctrl"
        })
        .when("/quanlydanhmuc", {
            templateUrl: "asset/danhmuc/quanlydanhmuc.html",
            controller: "quanlydanhmuc-ctrl"
        })
        .when("/thongtindanhmuc", {
            templateUrl: "asset/danhmuc/thongtindanhmuc.html",
            controller: "thongtindanhmuc-ctrl"
        })

        /// thuong hiệu
        .when("/listthuonghieu",{
            templateUrl:"asset/thuonghieu/listthuonghieu.html",
            controller: "listthuonghieu-ctrl"
        })
        .when("/quanlythuonghieu", {
            templateUrl: "asset/thuonghieu/quanlythuonghieu.html",
            controller: "quanlythuonghieu-ctrl"
        })
})
