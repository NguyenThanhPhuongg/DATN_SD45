package org.example.datn.service;

import org.example.datn.entity.ChatLieu;
import org.example.datn.entity.KhuyenMai;

import java.util.List;

public interface KhuyenMaiService {

    List<KhuyenMai> findAll();
    KhuyenMai findById(Long id);

    List<KhuyenMai> findByCateId(Long cid);

    KhuyenMai create(KhuyenMai product);

    KhuyenMai update(KhuyenMai product);

    void delete(Long id);
}
