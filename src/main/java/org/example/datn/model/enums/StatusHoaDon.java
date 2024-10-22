package org.example.datn.model.enums;

public enum StatusHoaDon {
    CHO_XU_LY(0),         // Đang chờ xử lý
    DA_XAC_NHAN(1),       // Đã xác nhận
    DANG_GIAO(2),         // Đang giao
    DA_GIAO(3),           // Đã giao
    DA_HUY(4),            // Đã hủy
    DA_THANH_TOAN(5),     // Đã thanh toán
    GIAO_KHONG_THANH_CONG(6), // Giao không thành công
    DA_HOAN_TRA(7);       // Đã hoàn trả

    private final int value;

    StatusHoaDon(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
}
