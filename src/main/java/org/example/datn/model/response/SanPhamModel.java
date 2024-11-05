package org.example.datn.model.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.example.datn.entity.*;
import org.example.datn.model.CommonModel;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SanPhamModel extends CommonModel {

     Long id;

     Long idDanhMuc;

     Long idThuongHieu;

     Long idChatLieu;

     String ten;

     String ma;

     String xuatXu;

     String moTa;

     BigDecimal gia;

     String anh;

     Integer trangThai;

     DanhMuc danhMuc;
     Thuonghieu thuonghieu;
     ChatLieu chatLieu;

    private List<Size> listSize ;
    private List<MauSac> listMauSac ;

}
