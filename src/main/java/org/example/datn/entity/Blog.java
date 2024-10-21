package org.example.datn.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "blog")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "tac_gia")
    private String tacGia;
    @Column(name = "title")
    private String title;
    @Column(name = "content")
    private String conten;
    @Column(name = "content_2")
    private String conten2;
    @Column(name = "content_3")
    private String conten3;
    @Column(name = "hinh_anh")
    private String hinhAnh;
    @Column(name = "hinh_anh_2")
    private String hinhAnh2;
    @Column(name = "hinh_anh_3")
    private String hinhAnh3;
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