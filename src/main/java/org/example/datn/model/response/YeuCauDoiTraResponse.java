package org.example.datn.model.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class YeuCauDoiTraResponse {
    Long id;
    Long idHoaDon;
    Long idNguoiDung;
    String loai;
    String lyDo;
    String ghiChu;
    Integer trangThai;
    LocalDateTime ngayYeuCau;
    LocalDateTime ngayHoanTat;

    HoaDonModel hoaDonModel;
    UserModel userModel;
}
