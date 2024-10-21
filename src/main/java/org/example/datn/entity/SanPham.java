package org.example.datn.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "san_pham")
public class SanPham extends CommonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "id_danh_muc")
    private Integer danhMuc;

    @Column(name = "id_thuong_hieu")
    private Integer thuongHieu;

    @Column(name = "ten")
    private String ten;

    @Column(name = "xuat_xu")
    private String xuatXu;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "gia")
    private BigDecimal gia;

    @Column(name = "anh")
    private String anh;

    @Column(name = "trang_thai")
    private Integer trangThai;
}
