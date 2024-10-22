package org.example.datn.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum StatusGioHang {

    ACTIVE(1),               // Đang hoạt động
    INACTIVE(0),             // Không hoạt động
    DA_HOAN_TAT(2),           // Đã hoàn tất
    DA_HUY(3),                // Đã hủy
    DANG_GIAO(4),             // Đang giao
    DA_GIAO(5),               // Đã giao
    GIAO_KHONG_THANH_CONG(6), // Giao không thành công
    DANG_CHO(7);              // Đang chờ

    StatusGioHang(Integer value) {
        this.value = value;
    }

    @JsonValue
    private final Integer value;

    public Integer getValue() {
        return this.value;
    }
}
