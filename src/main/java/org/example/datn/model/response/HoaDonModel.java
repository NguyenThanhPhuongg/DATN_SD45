package org.example.datn.model.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.datn.model.CommonModel;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HoaDonModel extends CommonModel {

    private Long id;
    private Long idUser;
    private Long idDiaChiGiaHang;  // Chuyển quan hệ sang kiểu Long
    private Long idPhuongThucVanChuyen;  // Chuyển quan hệ sang kiểu Long
    private Date ngayDatHang;
    private Date ngayThanhToan;
    private Double tongTien;
    private Integer diemSuDung;
    private Integer trangThai;

    UserModel userModel;

}