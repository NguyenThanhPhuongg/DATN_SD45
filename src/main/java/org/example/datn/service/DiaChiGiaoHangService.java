package org.example.datn.service;

import org.example.datn.entity.DiaChiGiaHang;

import java.util.List;

public interface DiaChiGiaoHangService {

    List<DiaChiGiaHang> findAll();
    DiaChiGiaHang findById(Long id);

    List<DiaChiGiaHang> findByCateId(Long cid);

    DiaChiGiaHang create(DiaChiGiaHang product);

    DiaChiGiaHang update(DiaChiGiaHang product);

    void delete(Long id);
}
