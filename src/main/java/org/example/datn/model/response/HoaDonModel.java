package org.example.datn.model.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.datn.model.CommonModel;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HoaDonModel extends CommonModel {

    private Long id;

    private Long idNguoiDung;
    private Long idDiaChiGiaoHang;
    private Long idPhuongThucVanChuyen;
    private LocalDateTime ngayDatHang;
    private LocalDateTime ngayThanhToan;
    private BigDecimal tongTien;
    private Integer diemSuDung;
    private Integer trangThai;

    private UserModel userModel;
    private DiaChiGiaoHangModel diaChiGiaoHangModel;
    private PhuongThucVanChuyenModel phuongThucVanChuyenModel;


}