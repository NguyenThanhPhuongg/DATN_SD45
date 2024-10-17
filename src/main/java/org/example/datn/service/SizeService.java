package org.example.datn.service;

import org.example.datn.entity.DanhMuc;
import org.example.datn.entity.Size;

import java.util.List;

public interface SizeService {

    List<Size> findAll();
    Size findById(Long id);

    List<Size> findByCateId(Long cid);

    Size create(Size product);

    Size update(Size product);

    void delete(Long id);
}
