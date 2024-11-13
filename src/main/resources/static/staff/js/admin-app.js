const app = angular.module("admin-app", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        // tổng quan
        .when("/tongquan", {
            templateUrl: "asset/tongquan.html",
            controller: "tongquan-ctrl"
        })

        /// Nhân viên
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

        /// Khách hàng
        .when("/listkhachhang", {
            templateUrl: "asset/khachhang/list.html",
            controller: "listkhachhang-ctrl"
        })
        .when("/quanlykh", {
            templateUrl: "asset/khachhang/quanly.html",
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

        /// Danh mục
        .when("/listdanhmuc", {
            templateUrl: "asset/danhmuc/listdanhmuc.html",
            controller: "danhmuc-ctrl"
        })
        .when("/quanlydanhmuc", {
            templateUrl: "asset/danhmuc/quanlydanhmuc.html",
            controller: "danhmuc-ctrl"
        })

        /// Thương hiệu
        .when("/listthuonghieu", {
            templateUrl: "asset/thuonghieu/listthuonghieu.html",
            controller: "thuonghieu-ctrl"
        })
        .when("/quanlythuonghieu", {
            templateUrl: "asset/thuonghieu/quanlythuonghieu.html",
            controller: "thuonghieu-ctrl"
        })

        /// thuộc tính
        .when("/size", {
            templateUrl: "asset/thuoctinh/size.html",
            controller: "size-ctrl"
        })
        .when("/chatlieu", {
            templateUrl: "asset/thuoctinh/chatlieu.html",
            controller: "chatlieu-ctrl"
        })
        .when("/mausac", {
            templateUrl: "asset/thuoctinh/mausac.html",
            controller: "mausac-ctrl"
        })

        /// nhân viên
        .when("/nhom", {
            templateUrl: "asset/nhanvien/nhom.html",
            controller: "nhom-ctrl"
        })
        .when("/chucnang", {
            templateUrl: "asset/nhanvien/chucnang.html",
            controller: "chucnang-ctrl"
        })
        .when("/phanquyen", {
            templateUrl: "asset/nhanvien/phanquyen.html",
            controller: "phanquyen-ctrl"
        })

        /// sản phâm
        .when("/listsanpham", {
            templateUrl: "asset/sanpham/listsanpham.html",
            controller: "spct-ctrl"
        })
        .when("/listsanphaman", {
            templateUrl: "asset/sanpham/listsanphaman.html",
            controller: "spct-ctrl"
        })
        .when("/spct", { // Thêm :id để nhận ID sản phẩm từ URL
            templateUrl: "asset/sanpham/quanlyspct.html",
            controller: "quanlyspct-ctrl"
        })
        .when("/sanpham", {
            templateUrl: "asset/sanpham/sanpham.html",
            controller: "sanpham-ctrl"
        })
        .when("/hinhanh", {
            templateUrl: "asset/sanpham/hinhanhsp.html",
            controller: "hinhanh-ctrl"
        })


        /// Bán tại quầy
        .when("/bhtq", {
            templateUrl: "asset/banhang/banhang.html",
            controller: "banhang-ctrl"
        })

        /// hóa đơn
        .when("/hdct", {
            templateUrl: "asset/hoadon/chitiethoadon.html",
            controller: "hdct-ctrl"
        })
        .when("/choxacnhan", {
            templateUrl: "asset/hoadon/choxacnhan.html",
            controller: "hoadon-ctrl"
        })
        .when("/chogiaohang", {
            templateUrl: "asset/hoadon/chogiaohang.html",
            controller: "hoadon-ctrl"
        })
        .when("/dangvanchuyen", {
            templateUrl: "asset/hoadon/dangvanchuyen.html",
            controller: "hoadon-ctrl"
        })
        .when("/hoanthanh", {
            templateUrl: "asset/hoadon/hoanthanh.html",
            controller: "hoadon-ctrl"
        })
        .when("/dahuy", {
            templateUrl: "asset/hoadon/dahuy.html",
            controller: "hoadon-ctrl"
        })
        .when("/hoantra", {
            templateUrl: "asset/hoadon/hoantra.html",
            controller: "hoadon-ctrl"
        })

        /// khuyến mãi
        .when("/listkhuyenmai", {
            templateUrl: "asset/khuyenmai/list.html",
            controller: "khuyenmai-ctrl"
        })
        .when("/quanlykhuyenmai", {
            templateUrl: "asset/khuyenmai/quanly.html",
            controller: "khuyenmai-ctrl"
        })
        .when("/apdungkhuyenmai", {
            templateUrl: "asset/khuyenmai/apdung.html",
            controller: "apdungkhuyenmai-ctrl.js"
        })

        /// Hỗ trợ
        .when("/traloihotro", {
            templateUrl: "asset/hotro/traloihotro.html",
            controller: "traloihotro-ctrl"
        })
        .when("/doihangcho", {
            templateUrl: "asset/hotro/doihangcho.html",
            controller: "doitrahang-ctrl"
        })
        .when("/doihangthanhcong", {
            templateUrl: "asset/hotro/doihangthanhcong.html",
            controller: "doitrahang-ctrl"
        })
        .when("/doihanghuy", {
            templateUrl: "asset/hotro/doihanghuy.html",
            controller: "doitrahang-ctrl"
        })

        .when("/trahangcho", {
            templateUrl: "asset/hotro/trahangcho.html",
            controller: "doitrahang-ctrl"
        })
        .when("/trahangthanhcong", {
            templateUrl: "asset/hotro/trahangthanhcong.html",
            controller: "doitrahang-ctrl"
        })
        .when("/trahanghuy", {
            templateUrl: "asset/hotro/trahanghuy.html",
            controller: "doitrahang-ctrl"
        })
        .when("/chitietdoitra", {
            templateUrl: "asset/hotro/chitietdoitra.html",
            controller: "chitietdoitra-ctrl"
        })

        /// BLog
        .when("/blog", {
            templateUrl: "asset/blog/blog.html",
            controller: "blog-ctrl"
        })

        .when("/group", {
            templateUrl: "asset/group/group.html",
            controller: "group-ctrl"
        })

        .when("/test", {
            templateUrl: "asset/test/test.html",
            controller: "test-ctrl"
        })

        .otherwise({
            redirectTo: "/tongquan" // Chuyển hướng đến đường dẫn mặc định
        });

})
