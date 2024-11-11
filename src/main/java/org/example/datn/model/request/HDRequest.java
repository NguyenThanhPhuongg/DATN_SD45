package org.example.datn.model.request;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class HDRequest {
    private Long idNguoiDung;
    private String ma;
    private BigDecimal tongTien;
    private Integer diemSuDung;
    private Integer trangThai;
    private LocalDateTime ngayTao;
    private LocalDateTime ngayThanhToan;
    private Long nguoiTao;
    private List<HDCTRequest> chiTietList;
}
