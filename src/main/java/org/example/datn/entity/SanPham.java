package org.example.datn.entity;


import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.util.Date;

/**
 * @author hoangKhong
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "san_pham")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SanPham extends CommonEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_danh_muc")
    private DanhMuc idDanhMuc;
    @ManyToOne
    @JoinColumn(name = "id_thuong_hieu")
    private Thuonghieu idThuongHieu;
    @Column(name = "ten")
    private String ten;
    @Column(name = "gia")
    private Double gia;
    @Column(name = "xuat_xu")
    private String xuatXu;
    @Column(name = "mo_ta")
    private String moTa;
    @Column(name = "anh")
    private String anh;
    @Column(name = "trang_thai")
    private Integer trangThai;

}
