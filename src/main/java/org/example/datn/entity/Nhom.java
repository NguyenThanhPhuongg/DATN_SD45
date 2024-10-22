package org.example.datn.entity;

import javax.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

/**
 * @author hoangKhong
 */
@Entity
@Table(name = "nhom")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Nhom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ten")
    private String ten;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "trang_thai")
    private Integer trangThai;
    @Column(name = "nguoi_tao")
    private String nguoiTao;
    @Column(name = "nguoi_cap_nhat")
    private String nguoiCapNhat;
    @Column(name = "ngay_tao")
    private Date ngayTao;
    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat;
}
