package org.example.datn.service;

import org.example.datn.entity.ChatLieu;
import org.example.datn.entity.SanPham;
import org.example.datn.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface SanPhamService {
    List<SanPham> findAll();
    SanPham findById(Long id);

    List<SanPham> findByCateId(Long cid);

    SanPham create(SanPham product);

    SanPham update(SanPham product);

    void delete(Long id);

}
