package org.example.datn.model.enums;

public enum StatusYeuCauDoiTra {
    CHO_XAC_NHAN(0),
    XAC_NHAN(1),
    KHONG_XAC_NHAN(2) ;

    private final int value;

    StatusYeuCauDoiTra(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
}
