app.controller("tongquan-ctrl", function ($scope, $http, $rootScope, $location) {
    // Hàm lọc và tính số lượng hóa đơn có trạng thái = 4
    function filterItemsByDate(dateStart, dateEnd) {
        const filteredItems = $scope.items.filter(item => {
            const statusMatches = item.trangThai === 4;

            const ngayCapNhat = new Date(item.ngayCapNhat);
            // Bỏ qua giờ, phút, giây khi so sánh
            ngayCapNhat.setHours(0, 0, 0, 0);

            return statusMatches && ngayCapNhat >= dateStart && ngayCapNhat <= dateEnd;
        });

        $scope.totalInvoicesStatus4 = filteredItems.length;
        $scope.totalAmountStatus4 = filteredItems.reduce((total, item) => total + parseFloat(item.tongTien), 0);

        const invoiceIds = filteredItems.map(item => item.id);

        $http.get('/hoa-don-chi-tiet') // API lấy tất cả hóa đơn chi tiết
            .then(function (response) {
                const allHoaDonChiTiet = response.data.data;
                const filteredItems2 = allHoaDonChiTiet.filter(item => invoiceIds.includes(item.idHoaDon));
                $scope.soLuong = filteredItems2.reduce((total, item) => total + parseFloat(item.soLuong), 0);

                // Hiển thị thông tin
                console.log("Tổng số lượng của các hóa đơn chi tiết có trạng thái 4:", $scope.soLuong);
            })
            .catch(function (error) {
                console.error('Lỗi khi lấy dữ liệu hóa đơn chi tiết:', error);
            });
    }

    // Hàm lọc theo ngày hôm nay
    $scope.ngay = function () {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây, mili giây về 0

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999); // Đặt giờ, phút, giây, mili giây đến 23:59:59.999

        filterItemsByDate(todayStart, todayEnd);
    };

    // Hàm lọc theo tuần hiện tại
    $scope.tuan = function () {
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Chủ nhật của tuần hiện tại
        firstDayOfWeek.setHours(0, 0, 0, 0);

        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        lastDayOfWeek.setHours(23, 59, 59, 999);

        filterItemsByDate(firstDayOfWeek, lastDayOfWeek);
    };

    // Hàm lọc theo tháng hiện tại
    $scope.thang = function () {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Ngày đầu tháng
        firstDayOfMonth.setHours(0, 0, 0, 0);

        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Ngày cuối tháng
        lastDayOfMonth.setHours(23, 59, 59, 999);

        filterItemsByDate(firstDayOfMonth, lastDayOfMonth);
    };

    // Hàm lọc theo năm hiện tại
    $scope.nam = function () {
        const today = new Date();
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1); // Ngày đầu năm
        firstDayOfYear.setHours(0, 0, 0, 0);

        const lastDayOfYear = new Date(today.getFullYear(), 11, 31); // Ngày cuối năm
        lastDayOfYear.setHours(23, 59, 59, 999);

        filterItemsByDate(firstDayOfYear, lastDayOfYear);
    };

    // Hàm load dữ liệu ban đầu
    $scope.loadData = function () {
        // Giả sử bạn đã có $scope.items (danh sách hóa đơn)
        $http.get('/rest/hoadon') // API lấy danh sách hóa đơn
            .then(function (response) {
                $scope.items = response.data.data; // Giả sử dữ liệu trả về là trong `data.data`
                $scope.ngay(); // Gọi hàm ngay sau khi dữ liệu được tải về
                $scope.tuan(); // Gọi hàm ngay sau khi dữ liệu được tải về
                $scope.thang(); // Gọi hàm ngay sau khi dữ liệu được tải về
                $scope.nam(); // Gọi hàm ngay sau khi dữ liệu được tải về
            })
            .catch(function (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            });
    };

    $scope.loadData(); // Gọi hàm loadData ban đầu
});
