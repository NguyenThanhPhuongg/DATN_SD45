package org.example.datn.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "khuyen_mai")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class KhuyenMai extends CommonEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "ten")
    private String ten;
    @Column(name = "mo_ta")
    private String moTa;
    @Column(name = "loai")
    private Integer loai;
    @Column(name = "gia_tri")
    private BigDecimal giaTri;
    @Column(name = "ngay_bat_dau")
    private Date ngayBatDau;
    @Column(name = "ngay_ket_thuc")
    private Date ngayKetThuc;
    @Column(name = "trang_thai")
    private Integer trangThai;
}