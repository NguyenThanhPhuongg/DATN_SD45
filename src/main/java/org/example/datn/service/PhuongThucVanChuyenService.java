package org.example.datn.service;

import org.example.datn.entity.DiaChiGiaHang;
import org.example.datn.entity.PhuongThucVanChuyen;

import java.util.List;

public interface PhuongThucVanChuyenService {

    List<PhuongThucVanChuyen> findAll();
    PhuongThucVanChuyen findById(Long id);

    List<PhuongThucVanChuyen> findByCateId(Long cid);

    PhuongThucVanChuyen create(PhuongThucVanChuyen product);

    PhuongThucVanChuyen update(PhuongThucVanChuyen product);

    void delete(Long id);
}
