package org.example.datn.service;

import org.example.datn.entity.DanhMuc;
import org.example.datn.entity.Thuonghieu;

import java.util.List;

public interface DanhMucService {

    List<DanhMuc> findAll();
    DanhMuc findById(Long id);

    List<DanhMuc> findByCateId(Long cid);

    DanhMuc create(DanhMuc product);

    DanhMuc update(DanhMuc product);

    void delete(Long id);
}
