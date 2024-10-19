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
            controller: "danhmuc-ctrl"
        })
        .when("/quanlydanhmuc", {
            templateUrl: "asset/danhmuc/quanlydanhmuc.html",
            controller: "danhmuc-ctrl"
        })

        /// thuong hiệu
        .when("/listthuonghieu",{
            templateUrl:"asset/thuonghieu/listthuonghieu.html",
            controller: "thuonghieu-ctrl"
        })
        .when("/quanlythuonghieu", {
            templateUrl: "asset/thuonghieu/quanlythuonghieu.html",
            controller: "thuonghieu-ctrl"
        })

        /// thuộc tính
        .when("/size",{
            templateUrl:"asset/thuoctinh/size.html",
            controller: "size-ctrl"
        })
        .when("/chatlieu",{
            templateUrl:"asset/thuoctinh/chatlieu.html",
            controller: "chatlieu-ctrl"
        })
        .when("/mausac",{
            templateUrl:"asset/thuoctinh/mausac.html",
            controller: "mausac-ctrl"
        })

        /// nhân viên
        .when("/nhom",{
            templateUrl:"asset/nhanvien/nhom.html",
            controller: "nhom-ctrl"
        })
        .when("/chucnang",{
            templateUrl:"asset/nhanvien/chucnang.html",
            controller: "chucnang-ctrl"
        })
        .when("/phanquyen",{
            templateUrl:"asset/nhanvien/phanquyen.html",
            controller: "phanquyen-ctrl"
        })

        /// sản phâm
        .when("/sanpham",{
            templateUrl:"asset/sanpham/listsanpham.html",
            controller: "sanpham-ctrl"
        })
        // .when("/spct",{
        //     templateUrl:"asset/sanpham/quanlyspct.html",
        //     controller: "spct-ctrl"
        // })
        .when("/spct", { // Thêm :id để nhận ID sản phẩm từ URL
            templateUrl: "asset/sanpham/quanlyspct.html",
            controller: "spct-ctrl"
        })

        /// hóa đơn
        .when("/hoadoncho",{
            templateUrl:"asset/hoadon/hoadoncho.html",
            controller: "hoadon-ctrl"
        })
        .when("/hoadonchovc",{
            templateUrl:"asset/hoadon/hoadonchovc.html",
            controller: "hoadon-ctrl"
        })
        .when("/hoadondone",{
            templateUrl:"asset/hoadon/hoadondone.html",
            controller: "hoadon-ctrl"
        })
        .when("/hoadonfail",{
            templateUrl:"asset/hoadon/hoadonfail.html",
            controller: "hoadon-ctrl"
        })

})
