package org.example.datn.service;

import org.example.datn.entity.HoaDon;
import org.example.datn.entity.HoaDonChiTiet;

import java.util.List;

public interface HoaDonChiTietService {

    List<HoaDonChiTiet> findAll();
    HoaDonChiTiet findById(Long id);

    List<HoaDonChiTiet> findByCateId(Long cid);

    HoaDonChiTiet create(HoaDonChiTiet product);

    HoaDonChiTiet update(HoaDonChiTiet product);

    void delete(Long id);
}
