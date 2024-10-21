package org.example.datn.service;

import org.example.datn.entity.SanPham;
import org.example.datn.entity.SanPhamChiTiet;

import java.util.List;

public interface SanPhamChiTietService {

    List<SanPhamChiTiet> findAll();
    SanPhamChiTiet findById(Long id);

    List<SanPhamChiTiet> findByCateId(Long cid);

    SanPhamChiTiet create(SanPhamChiTiet product);

    SanPhamChiTiet update(SanPhamChiTiet product);

    void delete(Long id);
}
