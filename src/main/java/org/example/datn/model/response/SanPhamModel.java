package org.example.datn.model.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.example.datn.entity.ChatLieu;
import org.example.datn.entity.DanhMuc;
import org.example.datn.entity.Thuonghieu;
import org.example.datn.model.CommonModel;

import java.math.BigDecimal;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SanPhamModel extends CommonModel {

    private Long id;

    private Long idDanhMuc;

    private Long idThuongHieu;

    private Long idChatLieu;

    private String ten;

    private String ma;

    private String xuatXu;

    private String moTa;

    private BigDecimal gia;

    private String anh;

    private Integer trangThai;

    private DanhMuc danhMuc;
    private Thuonghieu thuonghieu;
    private ChatLieu chatLieu;

}
