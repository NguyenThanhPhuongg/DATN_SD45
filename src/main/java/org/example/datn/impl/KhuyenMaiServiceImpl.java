package org.example.datn.impl;

import org.example.datn.entity.ChatLieu;
import org.example.datn.entity.KhuyenMai;
import org.example.datn.repository.ChatLieuRepository;
import org.example.datn.repository.KhuyenMaiRepository;
import org.example.datn.service.ChatLieuService;
import org.example.datn.service.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhuyenMaiServiceImpl implements KhuyenMaiService {

    @Autowired
    KhuyenMaiRepository khuyenMaiRepository;

    @Override
    public List<KhuyenMai> findAll() {
        return khuyenMaiRepository.findAll();
    }

    @Override
    public KhuyenMai findById(Long id) {
        return khuyenMaiRepository.findById(id).get();
    }

    @Override
    public List<KhuyenMai> findByCateId(Long cid) {
        return khuyenMaiRepository.findByCateId(cid);
    }
    @Override
    public KhuyenMai create(KhuyenMai product) {
        return khuyenMaiRepository.save(product);
    }

    @Override
    public KhuyenMai update(KhuyenMai product) {
        return khuyenMaiRepository.save(product);
    }

    @Override
    public void delete(Long id) {
        khuyenMaiRepository.deleteById(id);
    }

}
