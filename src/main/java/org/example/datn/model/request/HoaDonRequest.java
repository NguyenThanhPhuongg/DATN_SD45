package org.example.datn.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HoaDonRequest {

    private Long idDiaChiGiaoHang;
    private Long idPhuongThucVanChuyen;
    private Long idPhuongThucThanhToan;
    private Integer diemSuDung;
}
