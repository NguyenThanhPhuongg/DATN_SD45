package org.example.datn.service;

import org.example.datn.entity.ChatLieu;
import org.example.datn.entity.HoaDon;

import java.util.List;

public interface HoaDonService {

    List<HoaDon> findAll();
    HoaDon findById(Long id);

    List<HoaDon> findByCateId(Long cid);

    HoaDon create(HoaDon product);

    HoaDon update(HoaDon product);

    void delete(Long id);
}
